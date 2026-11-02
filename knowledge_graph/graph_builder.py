"""
Graph Builder Module.
Constructs and persists knowledge graph nodes and edges from structured database records.
"""
from typing import Dict, Any, List
from knowledge_graph.networkx_graph import RegulatoryKnowledgeGraph

class GraphBuilder:
    def __init__(self):
        self.kg = RegulatoryKnowledgeGraph()

    def add_objection_resolution(
        self,
        objection_id: str,
        statute_id: str,
        response_id: str
    ):
        self.kg.graph.add_node(objection_id, type="Objection")
        self.kg.graph.add_node(response_id, type="Response")
        self.kg.graph.add_edge(objection_id, statute_id, relation="CITES")
        self.kg.graph.add_edge(objection_id, response_id, relation="RESOLVED_BY")

    def export_graph_json(self) -> Dict[str, Any]:
        return {
            "nodes": [{"id": n, **self.kg.graph.nodes[n]} for n in self.kg.graph.nodes],
            "edges": [{"source": u, "target": v, **self.kg.graph.edges[u, v]} for u, v in self.kg.graph.edges]
        }
