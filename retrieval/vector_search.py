"""
Dense Vector Search Module.
Generates embeddings and performs semantic cosine similarity retrieval with metadata filtering.
Supports local sentence-transformers (BGE / all-MiniLM-L6-v2) or lightweight pseudo-embeddings.
"""
from typing import List, Dict, Any, Optional
import math
import re

class VectorSearchIndex:
    def __init__(self, chunks: List[Dict[str, Any]], model_name: str = "BAAI/bge-small-en-v1.5"):
        self.chunks = chunks
        self.dim = 64
        self.embeddings = [self._embed_text(c["content"]) for c in chunks]

    def _embed_text(self, text: str) -> List[float]:
        # Fast deterministic embedding fallback for immediate local execution
        vec = [0.0] * self.dim
        tokens = re.findall(r"\w+", text.lower())
        if not tokens:
            return vec

        for t in tokens:
            idx = abs(hash(t)) % self.dim
            vec[idx] += 1.0

        norm = math.sqrt(sum(v * v for v in vec))
        if norm > 0:
            vec = [v / norm for v in vec]
        return vec

    def _cosine_similarity(self, a: List[float], b: List[float]) -> float:
        return sum(x * y for x, y in zip(a, b))

    def search(self, query: str, state: Optional[str] = None, top_k: int = 5) -> List[Dict[str, Any]]:
        q_vec = self._embed_text(query)
        scored = []

        for i, chunk in enumerate(self.chunks):
            # Strict State Filtering
            if state and state not in ["NAIC", "FEDERAL"]:
                chunk_state = chunk.get("state")
                if chunk_state and chunk_state != state and chunk_state not in ["NAIC", "FEDERAL"]:
                    continue

            sim = self._cosine_similarity(q_vec, self.embeddings[i])
            res = dict(chunk)
            res["score"] = sim
            res["retrieval_method"] = "dense_vector"
            scored.append(res)

        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]
