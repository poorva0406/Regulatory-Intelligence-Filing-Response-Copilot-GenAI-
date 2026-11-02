"""
LangGraph Multi-Agent Workflow Engine for Insurance Regulatory Filing Defense.
Orchestrates:
1. Objection Analysis Agent
2. Regulatory Research Agent
3. Historical Precedent Agent
4. Policy Comparison Agent
5. Response Drafting Agent
6. Validation Agent
7. Human Review Stage (Interrupt / Approval Gate)
"""
from typing import TypedDict, List, Dict, Any, Optional
import time

class RegulatoryWorkflowState(TypedDict):
    raw_objection_text: str
    submitted_policy_text: str
    jurisdiction_state: str
    insurance_product: str
    extraction: Dict[str, Any]
    retrieved_statutes: List[Dict[str, Any]]
    precedents: List[Dict[str, Any]]
    policy_gaps: List[Dict[str, Any]]
    draft_response_letter: str
    amended_endorsement: str
    validation_report: Dict[str, Any]
    human_approved: bool

def objection_analysis_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.objection_analyser import ObjectionAnalyserAgent
    agent = ObjectionAnalyserAgent()
    res = agent.run(state["raw_objection_text"], state.get("jurisdiction_state"))
    return {"extraction": res["extraction"], "jurisdiction_state": res["extraction"]["state"]}

def regulatory_research_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.regulatory_researcher import RegulatoryResearcherAgent
    agent = RegulatoryResearcherAgent()
    statutes = agent.run(state["extraction"])
    return {"retrieved_statutes": statutes}

def precedent_search_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.precedent_retriever import PrecedentRetrieverAgent
    agent = PrecedentRetrieverAgent()
    precedents = agent.run(state["extraction"])
    return {"precedents": precedents}

def policy_comparison_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.policy_comparator import PolicyComparatorAgent
    agent = PolicyComparatorAgent()
    gaps = agent.run(state["extraction"], state["submitted_policy_text"], state["retrieved_statutes"])
    return {"policy_gaps": gaps}

def response_drafting_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.response_drafter import ResponseDrafterAgent
    agent = ResponseDrafterAgent()
    draft = agent.run(state["extraction"], state["policy_gaps"], state["retrieved_statutes"], state["precedents"])
    return {
        "draft_response_letter": draft["letter"],
        "amended_endorsement": draft["endorsement"]
    }

def validation_node(state: RegulatoryWorkflowState) -> Dict[str, Any]:
    from agents.validator import ValidationAgent
    agent = ValidationAgent()
    report = agent.run(state["draft_response_letter"], state["retrieved_statutes"])
    return {"validation_report": report}

class RegulatoryWorkflowRunner:
    def __init__(self):
        pass

    def run(self, raw_objection: str, policy_text: str, state: str = "CA") -> Dict[str, Any]:
        curr_state: RegulatoryWorkflowState = {
            "raw_objection_text": raw_objection,
            "submitted_policy_text": policy_text,
            "jurisdiction_state": state,
            "insurance_product": "Commercial Lines",
            "extraction": {},
            "retrieved_statutes": [],
            "precedents": [],
            "policy_gaps": [],
            "draft_response_letter": "",
            "amended_endorsement": "",
            "validation_report": {},
            "human_approved": False
        }

        # Step-by-step pipeline execution
        curr_state.update(objection_analysis_node(curr_state))
        curr_state.update(regulatory_research_node(curr_state))
        curr_state.update(precedent_search_node(curr_state))
        curr_state.update(policy_comparison_node(curr_state))
        curr_state.update(response_drafting_node(curr_state))
        curr_state.update(validation_node(curr_state))

        return curr_state
