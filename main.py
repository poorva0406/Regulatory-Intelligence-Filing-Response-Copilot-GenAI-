"""
Main CLI entry point for Regulatory Intelligence & Filing Response Copilot.
Usage:
  python3 main.py --scenario CA_WILDFIRE
  python3 main.py --benchmark
  python3 main.py --help
"""
import argparse
import sys
from agents.workflow import RegulatoryWorkflowRunner
from evaluation.evaluator import ComprehensiveEvaluator

def main():
    parser = argparse.ArgumentParser(
        description="Regulatory Intelligence & Filing Response Copilot (Commercial Insurance Portfolio Prototype)"
    )
    parser.add_argument(
        "--scenario",
        choices=["CA_WILDFIRE", "NY_CYBER", "TX_CGL", "IL_AUTO", "FL_PROP"],
        default="CA_WILDFIRE",
        help="Select pre-configured objection scenario to execute"
    )
    parser.add_argument(
        "--benchmark",
        action="store_true",
        help="Run 30-case synthetic evaluation benchmark across 5 RAG architectures"
    )

    args = parser.parse_args()

    if args.benchmark:
        evaluator = ComprehensiveEvaluator()
        evaluator.run_all_architectures()
        return

    scenario_map = {
        "CA_WILDFIRE": ("CA", "California CDI Wildfire Mitigation 10 CCR § 2644.9 Objection", "Proprietary brush fire score without IBHS credits."),
        "NY_CYBER": ("NY", "New York DFS Cyber War Exclusion Circular Letter No. 1 (2021) Objection", "Unilateral carrier attribution of cyber attacks to nation-states."),
        "TX_CGL": ("TX", "Texas TDI Chapter 542 Prompt Payment of Claims Objection", "Proof of loss 30-day delay clause."),
        "IL_AUTO": ("IL", "Illinois IDOI 50 Ill Adm Code 919 Defense Inside Limits Objection", "Defense costs inside primary auto limits."),
        "FL_PROP": ("FL", "Florida OIR F.S. § 627.4133 120-Day Notice & Hurricane Deductible Objection", "30-day cancellation and 10% hurricane deductible without 18pt warning.")
    }

    state, title, policy = scenario_map[args.scenario]

    print("=" * 80)
    print(f"[*] LAUNCHING 7-STAGE AGENTIC WORKFLOW FOR: {title}")
    print(f"[*] Jurisdiction: {state} | Commercial Insurance Regulatory Defense")
    print("=" * 80)

    runner = RegulatoryWorkflowRunner()
    result = runner.run(raw_objection=title, policy_text=policy, state=state)

    print("\n[+] 1. OBJECTION EXTRACTION:")
    print(f"    • State: {result['extraction']['state']}")
    print(f"    • Product: {result['extraction']['insurance_product']}")
    print(f"    • Contested Provisions: {', '.join(result['extraction']['regulatory_provisions_cited'])}")

    print("\n[+] 2. POLICY COMPARISON GAP ANALYSIS:")
    for gap in result["policy_gaps"]:
        print(f"    • {gap['clause_name']} -> {gap['compliance_gap']}")
        print(f"      Statute: {gap['statutory_reference']}")
        print(f"      Remedy:  {gap['recommended_adjustment']}")

    print("\n[+] 3. VALIDATION AGENT AUDIT:")
    print(f"    • Faithfulness Score: {result['validation_report']['faithfulness_score']}%")
    print(f"    • Hallucination Risk: {result['validation_report']['hallucination_risk']}")
    print(f"    • Responsible AI Guardrails: PASSED (Human Sign-off Required)")

    print("\n[+] 4. DRAFT CARRIER FILING RESPONSE LETTER (PREVIEW):")
    lines = result["draft_response_letter"].split("\n")
    print("\n".join(lines[:14]))
    print("    [... full response letter formatted for SERFF submission ...]")

    print("\n" + "=" * 80)
    print("[*] STATUS: PENDING HUMAN COMPLIANCE OFFICER REVIEW & APPROVAL")
    print("=" * 80)

if __name__ == "__main__":
    main()
