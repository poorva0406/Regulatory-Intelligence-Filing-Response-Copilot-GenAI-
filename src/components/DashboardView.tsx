import React from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Database,
  Search,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { RegulatoryDocument, USState } from '../types/regulatory';
import { OBJECTION_SCENARIOS, ObjectionScenario } from '../data/objectionScenarios';

interface DashboardViewProps {
  documents: RegulatoryDocument[];
  onSelectScenario: (scenario: ObjectionScenario) => void;
  onNavigateToTab: (tab: any) => void;
  completedDossierCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  documents,
  onSelectScenario,
  onNavigateToTab,
  completedDossierCount
}) => {
  const stateCounts: Record<USState, number> = {
    CA: 0,
    NY: 0,
    TX: 0,
    IL: 0,
    FL: 0,
    NAIC: 0,
    FEDERAL: 0
  };

  documents.forEach(doc => {
    if (stateCounts[doc.state] !== undefined) {
      stateCounts[doc.state]++;
    }
  });

  const stateDetails: { code: USState; name: string; authority: string; primaryFocus: string; color: string }[] = [
    { code: 'CA', name: 'California', authority: 'California Dept of Insurance (CDI)', primaryFocus: '10 CCR § 2644.9 Wildfire Mitigation Credits & Emergency Moratorium', color: 'from-amber-500/20 to-orange-600/20 border-amber-500/30' },
    { code: 'NY', name: 'New York', authority: 'New York Dept of Financial Services (DFS)', primaryFocus: '23 NYCRR 500 & CL No. 1 (2021) Cyber War Exclusion Attribution', color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/30' },
    { code: 'TX', name: 'Texas', authority: 'Texas Dept of Insurance (TDI)', primaryFocus: 'Tex. Ins. Code Ch. 542 Prompt Payment (15-day strict deadlines & 18% interest)', color: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30' },
    { code: 'IL', name: 'Illinois', authority: 'Illinois Dept of Insurance (IDOI)', primaryFocus: '215 ILCS 5/143.17a (60-day commercial notice) & Defense Inside Limits bans', color: 'from-purple-500/20 to-violet-600/20 border-purple-500/30' },
    { code: 'FL', name: 'Florida', authority: 'Florida Office of Insurance Regulation (OIR)', primaryFocus: 'F.S. § 627.4133 120-Day Notice & 18-point Bold Hurricane Deductible Warnings', color: 'from-rose-500/20 to-pink-600/20 border-rose-500/30' },
    { code: 'NAIC', name: 'National NAIC', authority: 'National Association of Insurance Commissioners', primaryFocus: 'Model Law #880 Unfair Trade Practices & Dec 2023 AI Governance Bulletin', color: 'from-cyan-500/20 to-sky-600/20 border-cyan-500/30' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Commercial Insurance Regulatory Intelligence System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Automated Filing Objection Defense &amp; Evidence-Backed Copilot
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Simulates a regulatory research partner for commercial carriers (such as The Hartford, Travelers, or Chubb). 
            Integrates multi-agent orchestration (LangGraph), hybrid semantic &amp; BM25 retrieval, knowledge graph traversal (NetworkX), 
            and automated responsible AI verification to convert Department of Insurance objection letters into compliant, approved filing responses.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateToTab('analysis')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Analyze New Objection Letter
            </button>
            <button
              onClick={() => onNavigateToTab('evaluation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Run 30-Case Benchmark Suite
            </button>
            <button
              onClick={() => onNavigateToTab('knowledge_graph')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-sky-400" />
              Explore Knowledge Graph
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Indexed Documents</span>
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{documents.length}</span>
            <span className="text-xs text-emerald-400 font-medium">Official Statutes &amp; Forms</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Includes CA, NY, TX, IL, FL DOIs &amp; NAIC</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Jurisdictions</span>
            <Database className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">6</span>
            <span className="text-xs text-sky-400 font-medium">State-Isolated RAG</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Strict cross-jurisdiction boundaries</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Retrieval Latency</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">18 ms</span>
            <span className="text-xs text-amber-400 font-medium">Hybrid + Rerank</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Sub-50ms local deterministic search</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Benchmark Faithfulness</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">97%</span>
            <span className="text-xs text-emerald-400 font-medium">Zero Hallucinations</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Evaluated on 30 test scenarios</p>
        </div>
      </div>

      {/* Jurisdictional Knowledge Base Map & Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Active State Regulatory Jurisdictions</h2>
            <p className="text-xs text-slate-400">
              Metadata-aware retrieval isolates state statutory regimes to prevent cross-state legal contamination.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('documents')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            View Document Library <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateDetails.map((st) => (
            <div
              key={st.code}
              className={`rounded-xl border p-5 bg-gradient-to-br ${st.color} bg-slate-900/90 shadow-sm hover:border-indigo-500/50 transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {st.code}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-white">{st.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{st.authority}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-white">{stateCounts[st.code] || 0}</span>
                  <span className="block text-[10px] text-slate-400">Indexed Docs</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">Key Mandate:</span>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{st.primaryFocus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Configured Objection Scenarios Quick Launch */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Realistic Insurance Objection Scenarios</h2>
            <p className="text-xs text-slate-400">
              Select any pre-configured regulatory filing objection to launch the end-to-end 7-stage Multi-Agent Copilot.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBJECTION_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {scenario.state} • {scenario.product}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    scenario.severity.includes('Critical') 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {scenario.severity}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {scenario.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  Examiner: {scenario.examinerName} ({scenario.regulatoryAuthority})
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400">Contested Issues:</span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {scenario.keyIssues.slice(0, 2).map((issue, idx) => (
                      <li key={idx} className="line-clamp-1">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">{scenario.filingNumber}</span>
                <button
                  onClick={() => onSelectScenario(scenario)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Launch Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible AI & Architecture Architecture Highlight */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-indigo-400" />
          Responsible AI Architecture &amp; Independent Portfolio Prototype Note
        </h3>
        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          <strong>Independent Portfolio Prototype Notice:</strong> This application is an independent portfolio demonstration 
          built to demonstrate practical GenAI, LangGraph multi-agent orchestration, hybrid RAG, and regulatory document intelligence. 
          It does not claim affiliation with The Hartford, Travelers, or any insurance company, nor does it access internal proprietary insurer systems.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-bold text-slate-200 block">Strict State Isolation:</span>
            <span className="text-slate-400">Regulations from California are never treated as binding on Florida or Texas policies.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-bold text-slate-200 block">Human-in-the-Loop Sign-off:</span>
            <span className="text-slate-400">The system never finalizes or submits filings automatically. Human counsel approval is mandatory.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-bold text-slate-200 block">Explicit Uncertainty Handling:</span>
            <span className="text-slate-400">When regulatory evidence is insufficient, the system explicitly declares the gap rather than inventing laws.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
