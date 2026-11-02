"""
BM25 Keyword Retrieval Module.
Implements Okapi BM25 scoring with term frequency, inverse document frequency,
and document length normalization.
"""
from typing import List, Dict, Any, Optional
import math
import re

class BM25Index:
    def __init__(self, chunks: List[Dict[str, Any]], k1: float = 1.5, b: float = 0.75):
        self.chunks = chunks
        self.k1 = k1
        self.b = b
        self.corpus_tokens = [self._tokenize(c["content"]) for c in chunks]
        self.doc_lengths = [len(toks) for toks in self.corpus_tokens]
        self.avg_dl = sum(self.doc_lengths) / max(1, len(self.doc_lengths))
        
        # Calculate Document Frequency (DF)
        self.df: Dict[str, int] = {}
        for toks in self.corpus_tokens:
            for t in set(toks):
                self.df[t] = self.df.get(t, 0) + 1

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r"\w+", text.lower())

    def search(self, query: str, state: Optional[str] = None, top_k: int = 5) -> List[Dict[str, Any]]:
        q_tokens = self._tokenize(query)
        N = len(self.chunks)
        scored = []

        for i, chunk in enumerate(self.chunks):
            if state and state not in ["NAIC", "FEDERAL"]:
                chunk_state = chunk.get("state")
                if chunk_state and chunk_state != state and chunk_state not in ["NAIC", "FEDERAL"]:
                    continue

            d_tokens = self.corpus_tokens[i]
            d_len = self.doc_lengths[i]
            tf_map: Dict[str, int] = {}
            for t in d_tokens:
                tf_map[t] = tf_map.get(t, 0) + 1

            score = 0.0
            for q in q_tokens:
                tf = tf_map.get(q, 0)
                if tf == 0:
                    continue
                df_val = self.df.get(q, 0)
                idf = math.log(1.0 + (N - df_val + 0.5) / (df_val + 0.5))
                num = tf * (self.k1 + 1.0)
                den = tf + self.k1 * (1.0 - self.b + self.b * (d_len / self.avg_dl))
                score += idf * (num / den)

            res = dict(chunk)
            res["score"] = score
            res["retrieval_method"] = "bm25"
            scored.append(res)

        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]
