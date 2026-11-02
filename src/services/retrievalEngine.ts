import { DocumentChunk, USState, InsuranceProduct } from '../types/regulatory';
import { INITIAL_GRAPH_NODES, INITIAL_GRAPH_EDGES } from '../data/knowledgeGraphData';

export interface RetrievalResult {
  chunk: DocumentChunk;
  score: number;
  retrievalType: 'vector' | 'bm25' | 'hybrid' | 'reranked' | 'graph_assisted';
  relevanceBreakdown: {
    vectorScore?: number;
    bm25Score?: number;
    rrfRank?: number;
    crossEncoderScore?: number;
    graphExpansionBoost?: number;
  };
}

export interface RetrievalOptions {
  state?: USState;
  product?: InsuranceProduct;
  topK?: number;
  strictStateIsolation?: boolean;
}

/**
 * Tokenizer & text normalizer for regulatory & legal documents.
 */
export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s§.-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'are', 'was',
  'were', 'will', 'been', 'which', 'their', 'there', 'about', 'such', 'into',
  'shall', 'may', 'under', 'upon', 'any', 'all', 'than', 'other'
]);

/**
 * Deterministic bag-of-words / pseudo-dense embedding vector generator
 * for semantic similarity search without requiring cloud API keys.
 */
export function computePseudoEmbedding(text: string): number[] {
  const DIM = 64;
  const vec = new Array(DIM).fill(0);
  const tokens = tokenizeText(text);
  
  if (tokens.length === 0) return vec;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let hash = 0;
    for (let c = 0; c < token.length; c++) {
      hash = (hash << 5) - hash + token.charCodeAt(c);
      hash |= 0;
    }
    const idx = Math.abs(hash) % DIM;
    vec[idx] += 1;
    // Cross feature
    const nextIdx = (idx * 7 + 13) % DIM;
    vec[nextIdx] += 0.5;
  }

  // Normalize
  let norm = 0;
  for (let i = 0; i < DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < DIM; i++) vec[i] /= norm;
  }

  return vec;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return Math.max(0, Math.min(1, dot));
}

/**
 * BM25 Search Engine
 */
export class BM25Engine {
  private chunks: DocumentChunk[];
  private docTokens: string[][];
  private docLengths: number[];
  private avgDocLength: number;
  private df: Map<string, number>;
  private k1: number;
  private b: number;

  constructor(chunks: DocumentChunk[], k1 = 1.5, b = 0.75) {
    this.chunks = chunks;
    this.k1 = k1;
    this.b = b;
    this.docTokens = chunks.map(c => tokenizeText(`${c.documentName} ${c.citation} ${c.content}`));
    this.docLengths = this.docTokens.map(toks => toks.length);
    const totalLen = this.docLengths.reduce((acc, l) => acc + l, 0);
    this.avgDocLength = this.docLengths.length > 0 ? totalLen / this.docLengths.length : 1;

    this.df = new Map();
    for (const toks of this.docTokens) {
      const unique = new Set(toks);
      for (const t of unique) {
        this.df.set(t, (this.df.get(t) || 0) + 1);
      }
    }
  }

  public search(query: string, filterState?: USState, filterProduct?: InsuranceProduct): { chunk: DocumentChunk; score: number }[] {
    const qTokens = tokenizeText(query);
    const N = this.chunks.length;
    const scores: { chunk: DocumentChunk; score: number }[] = [];

    for (let i = 0; i < N; i++) {
      const chunk = this.chunks[i];

      // Metadata filter
      if (filterState && filterState !== 'NAIC' && filterState !== 'FEDERAL') {
        if (chunk.state !== filterState && chunk.state !== 'NAIC' && chunk.state !== 'FEDERAL') {
          continue;
        }
      }

      if (filterProduct && chunk.productCategory !== filterProduct && chunk.productCategory !== 'Commercial Property') {
        // Soft match or keep
      }

      const dTokens = this.docTokens[i];
      const dLen = this.docLengths[i];
      let score = 0;

      // Count term frequencies in this document
      const tfMap = new Map<string, number>();
      for (const t of dTokens) {
        tfMap.set(t, (tfMap.get(t) || 0) + 1);
      }

      for (const q of qTokens) {
        const tf = tfMap.get(q) || 0;
        if (tf === 0) continue;

        const dfVal = this.df.get(q) || 0;
        // IDF formula
        const idf = Math.log(1 + (N - dfVal + 0.5) / (dfVal + 0.5));
        const num = tf * (this.k1 + 1);
        const den = tf + this.k1 * (1 - this.b + this.b * (dLen / this.avgDocLength));
        score += idf * (num / den);
      }

      // Exact statutory citation regex boost (e.g. 542.055, 2644.9, 627.4133)
      const statuteMatch = query.match(/\d+[\s\w.]+§*\s*\d+(\.\d+)*/g);
      if (statuteMatch) {
        for (const m of statuteMatch) {
          if (chunk.citation.toLowerCase().includes(m.toLowerCase()) || chunk.content.toLowerCase().includes(m.toLowerCase())) {
            score += 4.5;
          }
        }
      }

      scores.push({ chunk, score });
    }

    scores.sort((a, b) => b.score - a.score);
    return scores;
  }
}

/**
 * Hybrid Retriever with Vector Semantic Search + BM25 Keyword Search
 * + Reciprocal Rank Fusion + Cross-Encoder Reranker + Knowledge Graph Context Expansion.
 */
export class HybridRetriever {
  private chunks: DocumentChunk[];
  private bm25: BM25Engine;
  private chunkEmbeddings: Map<string, number[]>;

  constructor(chunks: DocumentChunk[]) {
    this.chunks = chunks;
    this.bm25 = new BM25Engine(chunks);
    this.chunkEmbeddings = new Map();
    for (const c of chunks) {
      this.chunkEmbeddings.set(c.chunkId, computePseudoEmbedding(`${c.documentName} ${c.citation} ${c.content}`));
    }
  }

  /**
   * 1. Basic Vector Search
   */
  public vectorSearch(query: string, opts: RetrievalOptions = {}): RetrievalResult[] {
    const qVec = computePseudoEmbedding(query);
    const results: RetrievalResult[] = [];
    const topK = opts.topK || 5;

    for (const chunk of this.chunks) {
      if (opts.strictStateIsolation && opts.state && opts.state !== 'NAIC' && opts.state !== 'FEDERAL') {
        if (chunk.state !== opts.state && chunk.state !== 'NAIC' && chunk.state !== 'FEDERAL') {
          continue;
        }
      }

      const cVec = this.chunkEmbeddings.get(chunk.chunkId) || computePseudoEmbedding(chunk.content);
      const sim = cosineSimilarity(qVec, cVec);

      results.push({
        chunk,
        score: sim,
        retrievalType: 'vector',
        relevanceBreakdown: { vectorScore: sim }
      });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  /**
   * 2. BM25 Search
   */
  public bm25Search(query: string, opts: RetrievalOptions = {}): RetrievalResult[] {
    const topK = opts.topK || 5;
    const bm25Res = this.bm25.search(query, opts.strictStateIsolation ? opts.state : undefined, opts.product);
    return bm25Res.slice(0, topK).map(r => ({
      chunk: r.chunk,
      score: r.score,
      retrievalType: 'bm25',
      relevanceBreakdown: { bm25Score: r.score }
    }));
  }

  /**
   * 3. Hybrid RAG (Reciprocal Rank Fusion)
   */
  public hybridSearch(query: string, opts: RetrievalOptions = {}): RetrievalResult[] {
    const topK = opts.topK || 5;
    const vecResults = this.vectorSearch(query, { ...opts, topK: 15 });
    const bm25Results = this.bm25Search(query, { ...opts, topK: 15 });

    const rrfScores = new Map<string, { chunk: DocumentChunk; score: number; vecScore?: number; bm25Score?: number; rrfRank: number }>();
    const RRF_CONSTANT = 60;

    vecResults.forEach((res, rank) => {
      const id = res.chunk.chunkId;
      const rrf = 1 / (RRF_CONSTANT + rank + 1);
      rrfScores.set(id, {
        chunk: res.chunk,
        score: rrf,
        vecScore: res.score,
        rrfRank: rank + 1
      });
    });

    bm25Results.forEach((res, rank) => {
      const id = res.chunk.chunkId;
      const rrf = 1 / (RRF_CONSTANT + rank + 1);
      if (rrfScores.has(id)) {
        const item = rrfScores.get(id)!;
        item.score += rrf;
        item.bm25Score = res.score;
      } else {
        rrfScores.set(id, {
          chunk: res.chunk,
          score: rrf,
          bm25Score: res.score,
          rrfRank: rank + 1
        });
      }
    });

    const combined = Array.from(rrfScores.values()).map(item => ({
      chunk: item.chunk,
      score: item.score,
      retrievalType: 'hybrid' as const,
      relevanceBreakdown: {
        vectorScore: item.vecScore,
        bm25Score: item.bm25Score,
        rrfRank: item.rrfRank
      }
    }));

    combined.sort((a, b) => b.score - a.score);
    return combined.slice(0, topK);
  }

  /**
   * 4. Hybrid Search + Cross-Encoder Reranker
   */
  public hybridRerankedSearch(query: string, opts: RetrievalOptions = {}): RetrievalResult[] {
    const topK = opts.topK || 5;
    // Step 1: Candidate generation via Hybrid Search (retrieve 12 candidates)
    const candidates = this.hybridSearch(query, { ...opts, topK: 12 });
    const qTokens = new Set(tokenizeText(query));

    // Step 2: Cross-Encoder Heuristic Scoring
    const reranked = candidates.map(cand => {
      const text = `${cand.chunk.documentName} ${cand.chunk.citation} ${cand.chunk.content}`;
      const cTokens = tokenizeText(text);
      
      let tokenOverlap = 0;
      for (const t of cTokens) {
        if (qTokens.has(t)) tokenOverlap++;
      }
      const overlapRatio = qTokens.size > 0 ? tokenOverlap / qTokens.size : 0;

      // Exact phrase match bonus
      let phraseBonus = 0;
      const cleanQ = query.toLowerCase().replace(/[^\w\s]/g, '');
      if (text.toLowerCase().includes(cleanQ.slice(0, 25))) {
        phraseBonus = 0.35;
      }

      // Jurisdiction relevance alignment
      let stateBonus = 0;
      if (opts.state && (cand.chunk.state === opts.state || cand.chunk.state === 'NAIC')) {
        stateBonus = 0.25;
      }

      // Pinpoint statute match bonus
      let statuteBonus = 0;
      const statuteMatch = query.match(/\d+[\s\w.]+§*\s*\d+/);
      if (statuteMatch && text.includes(statuteMatch[0])) {
        statuteBonus = 0.45;
      }

      const crossEncoderScore = (cand.score * 12) + (overlapRatio * 0.4) + phraseBonus + stateBonus + statuteBonus;

      return {
        ...cand,
        score: crossEncoderScore,
        retrievalType: 'reranked' as const,
        relevanceBreakdown: {
          ...cand.relevanceBreakdown,
          crossEncoderScore
        }
      };
    });

    reranked.sort((a, b) => b.score - a.score);
    return reranked.slice(0, topK);
  }

  /**
   * 5. Hybrid Search + Knowledge Graph Assisted Expansion
   */
  public graphAssistedSearch(query: string, opts: RetrievalOptions = {}): RetrievalResult[] {
    const topK = opts.topK || 5;
    // Base candidates
    const baseResults = this.hybridRerankedSearch(query, { ...opts, topK: 8 });
    
    // Find matching graph nodes
    const matchedNodeIds = new Set<string>();
    const qLower = query.toLowerCase();

    for (const node of INITIAL_GRAPH_NODES) {
      if (qLower.includes(node.label.toLowerCase()) || 
          (node.properties.citation && qLower.includes(String(node.properties.citation).toLowerCase())) ||
          (node.properties.code && qLower.includes(String(node.properties.code).toLowerCase()))) {
        matchedNodeIds.add(node.id);
      }
    }

    // Traverse 1-hop in Knowledge Graph
    const expandedNodeIds = new Set<string>(matchedNodeIds);
    for (const edge of INITIAL_GRAPH_EDGES) {
      if (matchedNodeIds.has(edge.source)) {
        expandedNodeIds.add(edge.target);
      }
      if (matchedNodeIds.has(edge.target)) {
        expandedNodeIds.add(edge.source);
      }
    }

    // Boost chunks that align with traversed graph entities
    const graphEnhanced = baseResults.map(res => {
      let graphBoost = 0;
      const chunkText = `${res.chunk.documentName} ${res.chunk.citation} ${res.chunk.content}`.toLowerCase();

      for (const nodeId of expandedNodeIds) {
        const node = INITIAL_GRAPH_NODES.find(n => n.id === nodeId);
        if (!node) continue;

        if (chunkText.includes(node.label.toLowerCase())) {
          graphBoost += 0.35;
        }
        if (node.properties.citation && chunkText.includes(String(node.properties.citation).toLowerCase())) {
          graphBoost += 0.5;
        }
      }

      const totalScore = res.score + graphBoost;
      return {
        ...res,
        score: totalScore,
        retrievalType: 'graph_assisted' as const,
        relevanceBreakdown: {
          ...res.relevanceBreakdown,
          graphExpansionBoost: graphBoost
        }
      };
    });

    graphEnhanced.sort((a, b) => b.score - a.score);
    return graphEnhanced.slice(0, topK);
  }
}
