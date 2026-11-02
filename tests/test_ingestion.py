import unittest
from ingestion.chunking import SemanticChunker
from ingestion.metadata_extractor import RegulatoryMetadataExtractor

class TestIngestion(unittest.TestCase):
    def test_semantic_chunker(self):
        chunker = SemanticChunker(target_chunk_size=100)
        sample_text = """Section 1. Mandatory Wildfire Mitigation Factors.
Every commercial property insurer must provide rate discounts for IBHS building hardening.

Section 2. Consumer Transparency.
Insurers must disclose wildfire scores within 15 days."""
        
        chunks = chunker.chunk_document(
            doc_id="DOC-TEST-1",
            doc_name="Test Wildfire Bulletin",
            state="CA",
            product="Commercial Property",
            doc_type="DOI Bulletin",
            text=sample_text,
            page_count=2
        )

        self.assertGreaterEqual(len(chunks), 2)
        self.assertEqual(chunks[0]["state"], "CA")
        self.assertIn("Section 1", chunks[0]["content"])

    def test_metadata_extractor(self):
        extractor = RegulatoryMetadataExtractor()
        meta = extractor.extract_metadata("california_wildfire_scoring.pdf", "California Department of Insurance (CDI) Bulletin 2022-5 on commercial property.")
        self.assertEqual(meta["state"], "CA")
        self.assertEqual(meta["product_category"], "Commercial Property")

if __name__ == "__main__":
    unittest.main()
