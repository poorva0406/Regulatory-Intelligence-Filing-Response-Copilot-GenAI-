"""
Hybrid Retrieval Engine.
Combines Vector Search and BM25 using Reciprocal Rank Fusion (RRF) and Cross-Encoder Reranking.
"""
from typing import List, Dict, Any, Optional
from retrieval.vector_search import VectorSearchIndex
from retrieval.bm25_search import BM25Index
from retrieval.reranker import CrossEncoderReranker

class HybridRetriever:
    def __init__(self, chunks: List[Dict[str, Any]]):
        self.chunks = chunks
        self.vector_index = VectorSearchIndex(chunks)
        self.bm25_index = BM25Index(chunks)
        self.reranker = CrossEncoderReranker()
        self.rrf_k = 60

    def search(
        self,
        query: str,
        state: Optional[str] = None,
        top_k: int = 5,
        use_reranker: bool = True
    ) -> List[Dict[str, Any]]:
        vec_candidates = self.vector_index.search(query, state=state, top_k=top_k * 3)
        bm25_candidates = self.bm25_index.search(query, state=state, top_k=top_k * 3)

        rrf_scores: Dict[str, float] = {}
        chunk_map: Dict[str, Dict[str, Any]] = {}

        for rank, res in enumerate(vec_candidates):
            cid = res["chunk_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + 1.0 / (self.rrf_k + rank + 1)
            chunk_map[cid] = res

        for rank, res in enumerate(bm25_candidates):
            cid = res["chunk_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + 1.0 / (self.rrf_k + rank + 1)
            chunk_map[cid] = res

        sorted_cids = sorted(rrf_scores.keys(), key=lambda x: rrf_scores[x], reverse=True)
        candidates = [chunk_map[cid] for cid in sorted_cids[:top_k * 2]]

        if use_reranker and len(candidates) > 0:
            return self.reranker.rerank(query, candidates, top_k=top_k)

        return candidates[:top_k]
