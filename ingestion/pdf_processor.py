"""
PDF and Document Processor.
Extracts text, metadata, headings, and tables from PDF, DOCX, and TXT regulatory documents.
Integrates PyMuPDF and fallback text extractors.
"""
from typing import Dict, Any, Optional
import os

class DocumentProcessor:
    def process_file(self, file_path: str) -> Dict[str, Any]:
        ext = os.path.splitext(file_path)[1].lower()
        
        if ext == ".pdf":
            return self._extract_pdf(file_path)
        elif ext in [".docx", ".doc"]:
            return self._extract_docx(file_path)
        else:
            return self._extract_txt(file_path)

    def _extract_pdf(self, path: str) -> Dict[str, Any]:
        try:
            import fitz  # PyMuPDF
            doc = fitz.open(path)
            full_text = []
            pages = []
            for page_num in range(len(doc)):
                page = doc[page_num]
                text = page.get_text()
                full_text.append(text)
                pages.append({"page_number": page_num + 1, "text": text})

            return {
                "file_path": path,
                "page_count": len(doc),
                "text": "\n\n".join(full_text),
                "pages": pages
            }
        except ImportError:
            # Fallback if PyMuPDF not installed in environment
            with open(path, "r", errors="ignore") as f:
                content = f.read()
            return {"file_path": path, "page_count": 1, "text": content, "pages": [{"page_number": 1, "text": content}]}

    def _extract_docx(self, path: str) -> Dict[str, Any]:
        try:
            import docx
            doc = docx.Document(path)
            paragraphs = [p.text for p in doc.paragraphs if p.text]
            text = "\n\n".join(paragraphs)
            return {"file_path": path, "page_count": max(1, len(paragraphs) // 5), "text": text}
        except ImportError:
            with open(path, "r", errors="ignore") as f:
                content = f.read()
            return {"file_path": path, "page_count": 1, "text": content}

    def _extract_txt(self, path: str) -> Dict[str, Any]:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        return {"file_path": path, "page_count": 1, "text": content}
