import React, { useState } from 'react';
import { 
  Award, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  Search,
  Filter,
  Check,
  Zap
} from 'lucide-react';
import { BenchmarkEvaluator, ComprehensiveBenchmarkReport, TestCaseEvaluationDetail } from '../services/benchmarkEvaluator';
import { BENCHMARK_CASES } from '../data/benchmarkCases';

interface EvaluationViewProps {
  evaluator: BenchmarkEvaluator;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({ evaluator }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<ComprehensiveBenchmarkReport>(() => evaluator.runBenchmark());
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedCase, setSelectedCase] = useState<TestCaseEvaluationDetail | null>(null);

  const handleRunEvaluation = async () => {
    setIsRunning(true);
    await new Promise(r => setTimeout(r, 650));
    const newReport = evaluator.runBenchmark();
    setReport(newReport);
    setIsRunning(false);
  };

  const categories = [
    'ALL',
    'Clear Regulatory Answer',
    'Cross-Document Multi-Hop',
    'Cross-State Jurisdictional Nuance',
    'Insufficient Evidence / Out-of-Scope',
    'Adversarial / Misleading Context'
  ];

  const filteredCaseDetails = report.caseDetails.filter(c => {
    const matchesCat = filterCategory === 'ALL' || c.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            30-Case Regulatory RAG Benchmark &amp; Architecture Evaluation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Empirical evaluation across 5 architectures: Vector RAG, BM25, Hybrid RRF, Cross-Encoder Reranker, and Knowledge Graph.
          </p>
        </div>

        <button
          onClick={handleRunEvaluation}
          disabled={isRunning}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
            isRunning
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isRunning ? (
            <>
              <Clock className="w-4 h-4 animate-spin text-white" />
              <span>Running 30 Test Scenarios...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Re-Run Benchmark Experiments</span>
            </>
          )}
        </button>
      </div>

      {/* Architecture Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Comparative Retrieval &amp; Generation Performance Matrix
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Tested on 30 synthetic commercial insurance scenarios across CA, NY, TX, IL, FL, and NAIC.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Real In-Memory Experiment Measurements
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-3">Architecture</th>
                <th className="py-3 px-3 text-center">Recall@3</th>
                <th className="py-3 px-3 text-center">Precision@3</th>
                <th className="py-3 px-3 text-center">MRR</th>
                <th className="py-3 px-3 text-center">Faithfulness</th>
                <th className="py-3 px-3 text-center">Citation Acc.</th>
                <th className="py-3 px-3 text-center">Unsupported %</th>
                <th className="py-3 px-3 text-center">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {report.resultsByArchitecture.map((res, idx) => {
                const isBest = res.architectureName.includes('Knowledge Graph');
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isBest ? 'bg-indigo-950/40 font-semibold text-white' : 'hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <td className="py-3.5 px-3 font-medium flex items-center gap-2">
                      {isBest && <Award className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{res.architectureName}</span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${res.recallAtK >= 0.9 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300'}`}>
                        {(res.recallAtK * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      {(res.precisionAtK * 100).toFixed(0)}%
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-sky-400">
                      {res.mrr.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${res.faithfulness >= 0.9 ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-amber-300'}`}>
                        {(res.faithfulness * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      {(res.citationAccuracy * 100).toFixed(0)}%
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${res.unsupportedClaimRate === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {(res.unsupportedClaimRate * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400">
                      {res.averageLatencyMs} ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Benchmark Case Inspector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Benchmark Test Case Drilldown (30 Cases)
            </h3>
            <p className="text-[11px] text-slate-400">
              Inspect test questions, ground truth citations, refusal verifications, and agent responses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PASSED">Passed</option>
              <option value="REFUSAL_VERIFIED">Refusal Verified</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>

        {/* Test Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[550px] overflow-y-auto pr-1">
          {filteredCaseDetails.map((tc) => {
            const rawBench = BENCHMARK_CASES.find(b => b.id === tc.testCaseId);
            return (
              <div
                key={tc.testCaseId}
                onClick={() => setSelectedCase(tc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  tc.status === 'PASSED'
                    ? 'bg-slate-800/60 border-slate-700/60 hover:border-emerald-500/50'
                    : tc.status === 'REFUSAL_VERIFIED'
                    ? 'bg-slate-800/60 border-slate-700/60 hover:border-sky-500/50'
                    : 'bg-rose-950/20 border-rose-500/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-400">{tc.testCaseId}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      {tc.expectedState}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    tc.status === 'PASSED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : tc.status === 'REFUSAL_VERIFIED'
                      ? 'bg-sky-500/20 text-sky-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {tc.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-white mt-2 leading-snug">
                  {tc.query}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{tc.category}</span>
                  <span className="font-mono text-[10px] text-indigo-300">
                    {tc.retrievedCitations[0] || 'No Citation'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Inspector for Selected Case */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-mono">{selectedCase.testCaseId}</span>
                <span className="text-xs text-slate-400">({selectedCase.category})</span>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Query Evaluated:</span>
                <p className="text-white bg-slate-800 p-2.5 rounded-lg border border-slate-700 font-medium">
                  {selectedCase.query}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Ground Truth Legal Assertion:</span>
                <p className="text-slate-300 bg-slate-850 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                  {BENCHMARK_CASES.find(b => b.id === selectedCase.testCaseId)?.groundTruthAnswer}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Retrieved Citations (Knowledge Graph Hybrid):</span>
                <div className="space-y-1">
                  {selectedCase.retrievedCitations.map((cite, i) => (
                    <div key={i} className="text-indigo-300 font-mono text-[11px] bg-slate-800 p-2 rounded border border-slate-700">
                      • {cite}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <strong>Evaluation Assessment: </strong>
                {selectedCase.notes}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
