"""
Response Drafting Agent.
Synthesizes a structured formal response letter to the state insurance commissioner
and crafts state-specific amendatory endorsement contract language.
"""
from typing import Dict, Any, List

class ResponseDrafterAgent:
    def run(
        self,
        extraction: Dict[str, Any],
        policy_gaps: List[Dict[str, Any]],
        retrieved_statutes: List[Dict[str, Any]],
        precedents: List[Dict[str, Any]]
    ) -> Dict[str, str]:
        state = extraction.get("state", "CA")
        filing_no = extraction.get("filing_number", "SERFF-2024-FILING")
        authority = extraction.get("regulatory_authority", f"{state} Department of Insurance")
        product = extraction.get("insurance_product", "Commercial Lines")

        letter = f"""VIA ELECTRONIC FILING (SERFF)

To: {authority}
Re: Filing Reference: {filing_no}
Product: {product} ({state})
Subject: Carrier Response to Regulatory Objection Notice

Dear Insurance Department Examiner:

On behalf of the filing carrier, we submit this response and revised amendatory endorsement addressing each item raised in the Department's objection letter.

1. EXECUTIVE SUMMARY:
The carrier has amended the contested provisions to strictly comply with the governing statutes and administrative rules of {authority}.

2. STATUTORY JUSTIFICATION & AMENDMENTS:
{chr(10).join([f"• Clause: {g['clause_name']}{chr(10)}  Statutory Authority: {g['statutory_reference']}{chr(10)}  Action Taken: {g['recommended_adjustment']}" for g in policy_gaps])}

3. PRECEDENT CONFORMANCE:
The proposed amendments mirror language approved by the Department in precedent filing {precedents[0]['filing_id'] if precedents else 'SERFF-APPROVED-STD'}.

Respectfully submitted,
Regulatory Affairs & Filing Compliance Group"""

        endorsement = f"""STATE OF {state} AMENDATORY ENDORSEMENT
In compliance with {state} insurance code and regulatory bulletins:
1. All policy provisions contrary to state law are hereby amended to conform to minimum statutory mandates.
2. Mandatory statutory cancellation notice and policyholder appeal rights are expressly incorporated.
3. This endorsement supersedes any contrary wording in the policy form."""

        return {
            "letter": letter,
            "endorsement": endorsement
        }
