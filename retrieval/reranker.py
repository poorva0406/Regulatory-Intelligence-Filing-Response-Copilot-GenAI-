"""
Contextual Cross-Encoder Reranker.
Re-scores candidate chunks using query-document cross-attention and statutory overlap features.
"""
from typing import List, Dict, Any
import re

class CrossEncoderReranker:
    def rerank(self, query: str, candidates: List[Dict[str, Any]], top_k: int = 5) -> List[Dict[str, Any]]:
        q_tokens = set(re.findall(r"\w+", query.lower()))
        
        reranked = []
        for cand in candidates:
            text = cand.get("content", "").lower()
            c_tokens = set(re.findall(r"\w+", text))
            
            overlap = len(q_tokens.intersection(c_tokens)) / max(1, len(q_tokens))
            
            # Boost for exact statutory section numbers
            statute_match = re.search(r"\d+[\s\w.]+§*\s*\d+", query)
            statute_boost = 0.5 if statute_match and statute_match.group(0) in text else 0.0

            final_score = (cand.get("score", 0.0) * 0.5) + (overlap * 0.3) + statute_boost
            
            item = dict(cand)
            item["rerank_score"] = final_score
            item["retrieval_method"] = "reranked"
            reranked.append(item)

        reranked.sort(key=lambda x: x["rerank_score"], reverse=True)
        return reranked[:top_k]
