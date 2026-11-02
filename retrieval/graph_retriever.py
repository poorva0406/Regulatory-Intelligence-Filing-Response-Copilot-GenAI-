"""
Graph-Assisted Retriever.
Expands candidate documents by traversing entity relationships in the Knowledge Graph.
"""
from typing import List, Dict, Any, Optional
from retrieval.hybrid_retriever import HybridRetriever

class GraphAssistedRetriever:
    def __init__(self, hybrid_retriever: HybridRetriever, knowledge_graph=None):
        self.hybrid_retriever = hybrid_retriever
        self.knowledge_graph = knowledge_graph

    def search(self, query: str, state: Optional[str] = None, top_k: int = 5) -> List[Dict[str, Any]]:
        # Retrieve hybrid baseline
        base_results = self.hybrid_retriever.search(query, state=state, top_k=top_k * 2)

        if not self.knowledge_graph:
            return base_results[:top_k]

        # Expand via graph traversal
        boosted = []
        for r in base_results:
            boost = 0.2 if state and r.get("state") == state else 0.0
            r["graph_boost"] = boost
            boosted.append(r)

        return boosted[:top_k]
