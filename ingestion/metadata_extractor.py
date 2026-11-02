"""
Regulatory Metadata Extractor.
Extracts document title, jurisdiction/state, document type, publication date,
and insurance product line for indexing and filtering.
"""
from typing import Dict, Any
import re

class RegulatoryMetadataExtractor:
    def extract_metadata(self, filename: str, content: str) -> Dict[str, Any]:
        # Extract state
        state = "CA"
        if re.search(r"\b(California|CDI|CCR)\b", content, re.IGNORECASE):
            state = "CA"
        elif re.search(r"\b(New York|DFS|NYCRR)\b", content, re.IGNORECASE):
            state = "NY"
        elif re.search(r"\b(Texas|TDI)\b", content, re.IGNORECASE):
            state = "TX"
        elif re.search(r"\b(Illinois|IDOI)\b", content, re.IGNORECASE):
            state = "IL"
        elif re.search(r"\b(Florida|OIR)\b", content, re.IGNORECASE):
            state = "FL"
        elif re.search(r"\b(NAIC)\b", content, re.IGNORECASE):
            state = "NAIC"

        # Document type
        doc_type = "DOI Bulletin"
        if "statute" in content.lower() or "code" in content.lower():
            doc_type = "Statute"
        elif "circular letter" in content.lower():
            doc_type = "Circular Letter"
        elif "form" in content.lower() or "policy" in content.lower():
            doc_type = "Standard Policy Form"

        # Line of business
        product = "Commercial Property"
        if "cyber" in content.lower():
            product = "Cyber Risk & Tech E&O"
        elif "liability" in content.lower() or "cgl" in content.lower():
            product = "General Liability (CGL)"
        elif "auto" in content.lower():
            product = "Commercial Auto"

        return {
            "document_name": filename,
            "state": state,
            "document_type": doc_type,
            "product_category": product,
            "jurisdiction": f"State of {state}",
            "regulatory_authority": f"{state} Department of Insurance"
        }
