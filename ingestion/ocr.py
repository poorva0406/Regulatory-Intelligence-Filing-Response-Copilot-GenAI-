"""
OCR Processing Engine.
Extracts text from scanned regulatory bulletins and legacy insurance filings
using pytesseract and image pre-processing.
"""
from typing import Dict, Any

class OCREngine:
    def __init__(self):
        pass

    def extract_scanned_image(self, image_path: str) -> Dict[str, Any]:
        try:
            from PIL import Image
            import pytesseract
            img = Image.open(image_path)
            extracted_text = pytesseract.image_to_string(img)
            return {
                "success": True,
                "text": extracted_text,
                "method": "Tesseract OCR"
            }
        except Exception as e:
            return {
                "success": False,
                "text": "",
                "error": str(e),
                "fallback": "Standard PDF text extraction recommended"
            }
