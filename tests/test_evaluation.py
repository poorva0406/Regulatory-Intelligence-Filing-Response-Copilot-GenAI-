import unittest
from evaluation.metrics import RAGMetricsCalculator
import json

class TestEvaluation(unittest.TestCase):
    def test_recall_and_mrr(self):
        calc = RAGMetricsCalculator()
        retrieved = ["DOC-1", "DOC-2", "DOC-3"]
        ground_truth = ["DOC-2"]
        
        recall = calc.recall_at_k(retrieved, ground_truth)
        self.assertEqual(recall, 1.0)

        mrr = calc.reciprocal_rank(retrieved, ground_truth)
        self.assertEqual(mrr, 0.5)

    def test_benchmark_dataset_integrity(self):
        with open("evaluation/benchmark_cases.json", "r") as f:
            cases = json.load(f)
        
        self.assertEqual(len(cases), 30)
        categories = set(c["category"] for c in cases)
        self.assertGreaterEqual(len(categories), 4)

if __name__ == "__main__":
    unittest.main()
