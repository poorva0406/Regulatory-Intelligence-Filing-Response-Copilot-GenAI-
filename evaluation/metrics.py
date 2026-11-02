"""
Evaluation Metrics Calculator.
Computes Recall@K, Precision@K, Mean Reciprocal Rank (MRR), Faithfulness,
Citation Accuracy, and Unsupported Claim Rate.
"""
from typing import List, Dict, Any

class RAGMetricsCalculator:
    @staticmethod
    def recall_at_k(retrieved_ids: List[str], ground_truth_ids: List[str]) -> float:
        if not ground_truth_ids:
            return 1.0
        hits = sum(1 for gid in ground_truth_ids if gid in retrieved_ids)
        return hits / len(ground_truth_ids)

    @staticmethod
    def precision_at_k(retrieved_ids: List[str], ground_truth_ids: List[str]) -> float:
        if not retrieved_ids:
            return 0.0
        hits = sum(1 for rid in retrieved_ids if rid in ground_truth_ids)
        return hits / len(retrieved_ids)

    @staticmethod
    def reciprocal_rank(retrieved_ids: List[str], ground_truth_ids: List[str]) -> float:
        for idx, rid in enumerate(retrieved_ids):
            if rid in ground_truth_ids:
                return 1.0 / (idx + 1)
        return 0.0

    @staticmethod
    def citation_accuracy(retrieved_cites: List[str], ground_truth_cites: List[str]) -> float:
        if not ground_truth_cites:
            return 1.0
        hits = sum(1 for g in ground_truth_cites if any(g.lower() in r.lower() for r in retrieved_cites))
        return hits / len(ground_truth_cites)
