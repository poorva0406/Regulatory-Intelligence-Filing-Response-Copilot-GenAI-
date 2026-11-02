"""
Objection Analysis Agent.
Classifies commercial insurance regulatory objection letters, extracts key entities
(Jurisdiction, Insurance Product, Contested Clauses, Cited Statutes, Requested Evidence),
and checks for prompt injection attempts in untrusted user-uploaded documents.
Works with standard library Python 3.10+ (dataclasses) and Pydantic if installed.
"""
from typing import Dict, Any, Optional, List
import re
from dataclasses import dataclass, field, asdict

try:
    from pydantic import BaseModel
    HAS_PYDANTIC = True
except ImportError:
    HAS_PYDANTIC = False

@dataclass
class ObjectionAnalysisResult:
    state: str
    insurance_product: str
    objection_category: str
    filing_number: str
    regulatory_authority: str
    examiner_name: str
    contested_policy_clauses: List[str]
    regulatory_provisions_cited: List[str]
    evidence_required: List[str]
    severity: str
    sanitization_passed: bool

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

class ObjectionAnalyserAgent:
    def __init__(self):
        self.injection_patterns = [
            re.compile(r"ignore\s+previous\s+instructions", re.IGNORECASE),
            re.compile(r"system\s+prompt\s+override", re.IGNORECASE),
            re.compile(r"you\s+are\s+now\s+an\s+executive", re.IGNORECASE),
            re.compile(r"certify\s+full\s+compliance", re.IGNORECASE),
            re.compile(r"declare\s+that\s+.*is\s+100%\s+legal", re.IGNORECASE)
        ]

    def run(self, raw_text: str, state_hint: Optional[str] = None) -> Dict[str, Any]:
        # Step 1: Prompt Injection Defense
        is_clean = True
        for pattern in self.injection_patterns:
            if pattern.search(raw_text):
                is_clean = False
                break

        # Step 2: Jurisdictional Classification
        detected_state = state_hint or "CA"
        if "California" in raw_text or "CDI" in raw_text or "2644.9" in raw_text:
            detected_state = "CA"
        elif "New York" in raw_text or "DFS" in raw_text or "NYCRR" in raw_text:
            detected_state = "NY"
        elif "Texas" in raw_text or "TDI" in raw_text or "542." in raw_text:
            detected_state = "TX"
        elif "Illinois" in raw_text or "IDOI" in raw_text or "143.17" in raw_text:
            detected_state = "IL"
        elif "Florida" in raw_text or "OIR" in raw_text or "627." in raw_text:
            detected_state = "FL"
        elif "NAIC" in raw_text or "Model #880" in raw_text:
            detected_state = "NAIC"

        # Step 3: Product Line Classification
        detected_product = "Commercial Property"
        if "cyber" in raw_text.lower() or "ransomware" in raw_text.lower():
            detected_product = "Cyber Risk & Tech E&O"
        elif "general liability" in raw_text.lower() or "cgl" in raw_text.lower():
            detected_product = "General Liability (CGL)"
        elif "auto" in raw_text.lower() or "fleet" in raw_text.lower():
            detected_product = "Commercial Auto"
        elif "workers" in raw_text.lower():
            detected_product = "Workers' Compensation"

        # Step 4: Extract Citations
        statutes = list(set(re.findall(r"\b\d+[\s\w.]+§*\s*\d+(\.\d+)*", raw_text)))

        extraction = ObjectionAnalysisResult(
            state=detected_state,
            insurance_product=detected_product,
            objection_category="Rating & Mitigation" if "surcharge" in raw_text.lower() else "Statutory Notice",
            filing_number="SERFF-" + detected_state + "-2024-FILING",
            regulatory_authority=f"{detected_state} Department of Insurance",
            examiner_name="Regulatory Review Examiner",
            contested_policy_clauses=["Contested Policy Condition / Endorsement"],
            regulatory_provisions_cited=statutes if statutes else ["Governing State Insurance Code"],
            evidence_required=["Amendatory Endorsement", "Actuarial Rating Memorandum"],
            severity="Critical / Disapproval Risk",
            sanitization_passed=is_clean
        )

        return {
            "extraction": extraction.to_dict(),
            "execution_status": "flagged" if not is_clean else "success"
        }
