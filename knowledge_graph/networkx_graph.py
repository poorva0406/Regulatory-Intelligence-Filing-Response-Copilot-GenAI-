"""
Knowledge Graph topology using NetworkX.
Represents relationships between:
State -> Regulatory Authority -> Regulation -> Product -> Policy Clause -> Objection -> Historical Response
"""
from typing import List, Dict, Any, Set
import networkx as nx

class RegulatoryKnowledgeGraph:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._bootstrap_graph()

    def _bootstrap_graph(self):
        # 1. State nodes
        self.graph.add_node("STATE_CA", label="California", type="State")
        self.graph.add_node("STATE_NY", label="New York", type="State")
        self.graph.add_node("STATE_TX", label="Texas", type="State")
        self.graph.add_node("STATE_IL", label="Illinois", type="State")
        self.graph.add_node("STATE_FL", label="Florida", type="State")
        self.graph.add_node("STATE_NAIC", label="NAIC National", type="State")

        # 2. Authority nodes
        self.graph.add_node("AUTH_CDI", label="California Dept of Insurance", type="Authority")
        self.graph.add_node("AUTH_NYDFS", label="New York Dept of Financial Services", type="Authority")
        self.graph.add_node("AUTH_TDI", label="Texas Dept of Insurance", type="Authority")
        self.graph.add_node("AUTH_IDOI", label="Illinois Dept of Insurance", type="Authority")
        self.graph.add_node("AUTH_FLOIR", label="Florida Office of Insurance Regulation", type="Authority")
        self.graph.add_node("AUTH_NAIC", label="NAIC Regulatory Action", type="Authority")

        # 3. Regulations
        self.graph.add_node("REG_10CCR2644_9", label="10 CCR § 2644.9 (Wildfire Credits)", type="Regulation")
        self.graph.add_node("REG_NY_CL2021_01", label="NY DFS Circular Letter No. 1 (2021)", type="Regulation")
        self.graph.add_node("REG_TX_542_055", label="Tex. Ins. Code § 542.055 (Prompt Pay)", type="Regulation")
        self.graph.add_node("REG_IL_ADMIN_919", label="50 Ill. Adm. Code 919", type="Regulation")
        self.graph.add_node("REG_FL_627_4133", label="F.S. § 627.4133 (120-Day Notice)", type="Regulation")
        self.graph.add_node("REG_NAIC_880", label="NAIC Model #880 & AI Bulletin", type="Regulation")

        # 4. Edges
        self.graph.add_edge("STATE_CA", "AUTH_CDI", relation="REGULATES")
        self.graph.add_edge("AUTH_CDI", "REG_10CCR2644_9", relation="ENFORCES")
        self.graph.add_edge("STATE_NY", "AUTH_NYDFS", relation="REGULATES")
        self.graph.add_edge("AUTH_NYDFS", "REG_NY_CL2021_01", relation="ENFORCES")
        self.graph.add_edge("STATE_TX", "AUTH_TDI", relation="REGULATES")
        self.graph.add_edge("AUTH_TDI", "REG_TX_542_055", relation="ENFORCES")
        self.graph.add_edge("STATE_IL", "AUTH_IDOI", relation="REGULATES")
        self.graph.add_edge("AUTH_IDOI", "REG_IL_ADMIN_919", relation="ENFORCES")
        self.graph.add_edge("STATE_FL", "AUTH_FLOIR", relation="REGULATES")
        self.graph.add_edge("AUTH_FLOIR", "REG_FL_627_4133", relation="ENFORCES")

    def get_context_expansion(self, state: str) -> List[str]:
        target_state = f"STATE_{state}"
        if not self.graph.has_node(target_state):
            return []

        authorities = list(self.graph.successors(target_state))
        regulations = []
        for auth in authorities:
            regulations.extend(list(self.graph.successors(auth)))

        return regulations
