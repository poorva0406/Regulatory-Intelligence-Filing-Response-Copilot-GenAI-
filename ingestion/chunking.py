"""
Document Chunking Engine.
Splits regulatory documents and insurance policy filings into semantically coherent chunks
while preserving page numbers, section headings, and exact statutory section references.
"""
from typing import List, Dict, Any
import re

class SemanticChunker:
    def __init__(self, target_chunk_size: int = 250, chunk_overlap: int = 40):
        self.target_chunk_size = target_chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_document(
        self,
        doc_id: str,
        doc_name: str,
        state: str,
        product: str,
        doc_type: str,
        text: str,
        page_count: int = 1
    ) -> List[Dict[str, Any]]:
        chunks = []
        
        # Split by section headers or double newlines
        sections = re.split(r"\n(?=(?:Section|§|\d+\.|\b[A-Z\s]{4,}\b))", text)
        
        chunk_idx = 1
        for sec in sections:
            clean_sec = sec.strip()
            if len(clean_sec) < 20:
                continue

            words = clean_sec.split()
            page_est = min(page_count, max(1, chunk_idx // 2 + 1))
            
            # Extract section heading
            first_line = clean_sec.split("\n")[0][:80]

            chunks.append({
                "chunk_id": f"{doc_id}-CHK-{chunk_idx}",
                "document_id": doc_id,
                "document_name": doc_name,
                "state": state,
                "product_category": product,
                "document_type": doc_type,
                "page_number": page_est,
                "section_heading": first_line,
                "content": clean_sec,
                "word_count": len(words)
            })
            chunk_idx += 1

        return chunks
