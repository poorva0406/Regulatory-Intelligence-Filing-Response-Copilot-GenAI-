import unittest
from retrieval.vector_search import VectorSearchIndex
from retrieval.bm25_search import BM25Index
from retrieval.hybrid_retriever import HybridRetriever

class TestRetrieval(unittest.TestCase):
    def setUp(self):
        self.chunks = [
            {
                "chunk_id": "CHK-CA-1",
                "document_id": "DOC-CA-1",
                "state": "CA",
                "content": "California Insurance Code 10 CCR § 2644.9 requires commercial wildfire mitigation discounts."
            },
            {
                "chunk_id": "CHK-TX-1",
                "document_id": "DOC-TX-1",
                "state": "TX",
                "content": "Texas Insurance Code Chapter 542 prompt payment mandates 15 calendar days acknowledgment."
            },
            {
                "chunk_id": "CHK-FL-1",
                "document_id": "DOC-FL-1",
                "state": "FL",
                "content": "Florida Statutes § 627.4133 requires 120 days advance notice of commercial property non-renewal."
            }
        ]

    def test_state_isolation_in_retrieval(self):
        retriever = HybridRetriever(self.chunks)
        results = retriever.search("non-renewal notice period", state="FL", top_k=3)
        self.assertGreater(len(results), 0)
        self.assertEqual(results[0]["state"], "FL")
        self.assertIn("627.4133", results[0]["content"])

    def test_bm25_statute_match(self):
        bm25 = BM25Index(self.chunks)
        res = bm25.search("2644.9 wildfire discount", state="CA")
        self.assertGreater(len(res), 0)
        self.assertEqual(res[0]["chunk_id"], "CHK-CA-1")

if __name__ == "__main__":
    unittest.main()
