import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  FileText, 
  ShieldAlert, 
  Search, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';
import { USState, InsuranceProduct, DraftResponseDossier, AgentStepLog } from '../types/regulatory';
import { OBJECTION_SCENARIOS, ObjectionScenario } from '../data/objectionScenarios';
import { RegulatoryAgentWorkflow } from '../services/agentWorkflow';

interface AnalysisViewProps {
  workflowEngine: RegulatoryAgentWorkflow;
  activeScenario: ObjectionScenario | null;
  onScenarioChange: (scenario: ObjectionScenario) => void;
  onDossierGenerated: (dossier: DraftResponseDossier) => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  workflowEngine,
  activeScenario,
  onScenarioChange,
  onDossierGenerated
}) => {
  const defaultScenario = activeScenario || OBJECTION_SCENARIOS[0];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(defaultScenario.id);
  const [state, setState] = useState<USState>(defaultScenario.state);
  const [product, setProduct] = useState<InsuranceProduct>(defaultScenario.product);
  const [objectionText, setObjectionText] = useState<string>(defaultScenario.rawObjectionText);
  const [policyText, setPolicyText] = useState<string>(defaultScenario.submittedPolicyText);

  const [isRunning, setIsRunning] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState<number>(-1);
  const [agentLogs, setAgentLogs] = useState<AgentStepLog[]>([]);
  const [completedDossier, setCompletedDossier] = useState<DraftResponseDossier | null>(null);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    const scen = OBJECTION_SCENARIOS.find(s => s.id === scenarioId);
    if (scen) {
      onScenarioChange(scen);
      setState(scen.state);
      setProduct(scen.product);
      setObjectionText(scen.rawObjectionText);
      setPolicyText(scen.submittedPolicyText);
      setCompletedDossier(null);
      setAgentLogs([]);
      setCurrentAgentIndex(-1);
    }
  };

  const agentSteps = [
    { name: 'Objection Analysis Agent', description: 'Extracts jurisdiction, contested clauses, and checks prompt injection defense' },
    { name: 'Regulatory Research Agent', description: 'Retrieves state-isolated statutes, DOI bulletins, and administrative codes' },
    { name: 'Historical Precedent Agent', description: 'Finds approved SERFF filings and accepted wording patterns' },
    { name: 'Policy Comparison Agent', description: 'Audits submitted policy wording against retrieved regulatory requirements' },
    { name: 'Response Drafting Agent', description: 'Formulates formal carrier response letter & amendatory endorsement' },
    { name: 'Validation Agent', description: 'Audits citations, checks faithfulness, and flags unsupported legal declarations' },
    { name: 'Human Review Stage', description: 'Packages dossier for compliance officer review and sign-off' },
  ];

  const runWorkflow = async () => {
    if (!objectionText.trim()) return;

    setIsRunning(true);
    setAgentLogs([]);
    setCompletedDossier(null);

    try {
      // Step 1: Objection Analysis
      setCurrentAgentIndex(0);
      await new Promise(r => setTimeout(r, 450));
      const { extraction, log: log1 } = await workflowEngine.runObjectionAnalysisAgent(objectionText, state, product);
      setAgentLogs(prev => [...prev, log1]);

      // Step 2: Regulatory Research
      setCurrentAgentIndex(1);
      await new Promise(r => setTimeout(r, 550));
      const { retrievedChunks, log: log2 } = await workflowEngine.runRegulatoryResearchAgent(extraction);
      setAgentLogs(prev => [...prev, log2]);

      // Step 3: Historical Precedents
      setCurrentAgentIndex(2);
      await new Promise(r => setTimeout(r, 450));
      const { precedents, log: log3 } = await workflowEngine.runHistoricalPrecedentAgent(extraction);
      setAgentLogs(prev => [...prev, log3]);

      // Step 4: Policy Comparison
      setCurrentAgentIndex(3);
      await new Promise(r => setTimeout(r, 500));
      const { comparisons, log: log4 } = await workflowEngine.runPolicyComparisonAgent(extraction, policyText, retrievedChunks);
      setAgentLogs(prev => [...prev, log4]);

      // Step 5: Response Drafting
      setCurrentAgentIndex(4);
      await new Promise(r => setTimeout(r, 650));
      const { draftResponseLetter, amendedEndorsementWording, log: log5 } = await workflowEngine.runResponseDraftingAgent(
        extraction,
        comparisons,
        retrievedChunks,
        precedents
      );
      setAgentLogs(prev => [...prev, log5]);

      // Step 6: Validation
      setCurrentAgentIndex(5);
      await new Promise(r => setTimeout(r, 450));
      const { validationReport, log: log6 } = await workflowEngine.runValidationAgent(
        draftResponseLetter,
        amendedEndorsementWording,
        retrievedChunks,
        extraction
      );
      setAgentLogs(prev => [...prev, log6]);

      // Step 7: Human Review Stage
      setCurrentAgentIndex(6);
      const log7: AgentStepLog = {
        agentName: 'Human Review Stage',
        status: 'pending',
        timestamp: new Date().toISOString(),
        executionTimeMs: 12,
        inputSummary: 'Evidence dossier and draft response ready for regulatory compliance officer review.',
        outputSummary: 'Awaiting human sign-off.',
        decisionNote: 'Mandatory responsible AI rule: Human sign-off required before filing response is finalized.'
      };
      setAgentLogs(prev => [...prev, log7]);

      const confidenceScore = Math.round((validationReport.faithfulnessScore * 0.5) + (validationReport.citationAccuracyScore * 0.5));
      const evidenceCoverageScore = Math.min(100, Math.round((retrievedChunks.length / 4) * 100));

      const finalDossier: DraftResponseDossier = {
        id: `DOSSIER-${Date.now()}`,
        objectionId: extraction.filingNumber || 'SERFF-2024-FILING',
        filingReference: extraction.filingNumber || 'SERFF-2024-FILING',
        state: extraction.state,
        insuranceProduct: extraction.insuranceProduct,
        objectionSummary: extraction.rawObjectionSummary,
        applicableProvisions: retrievedChunks.map(c => ({
          code: c.sectionNumber || c.citation || 'Statutory Code',
          title: c.sectionHeading || c.documentName || 'Regulatory Provision',
          relevance: c.content.slice(0, 160) + '...',
          sourceDoc: c.documentName,
          page: c.pageNumber
        })),
        similarPrecedents: precedents,
        policyComparisons: comparisons,
        draftResponseLetter,
        amendedEndorsementWording,
        supportingEvidenceRequired: extraction.evidenceRequired,
        unresolvedQuestions: [
          `Verify that actuarial pricing team has confirmed rate adequacy with the amended discount table.`,
          `Confirm whether state-specific policy declaration page requires boldface font formatting.`
        ],
        confidenceScore,
        evidenceCoverageScore,
        validationReport,
        agentLogs: [log1, log2, log3, log4, log5, log6, log7],
        humanReviewStatus: 'Pending Review'
      };

      setCompletedDossier(finalDossier);
      onDossierGenerated(finalDossier);
    } catch (err) {
      console.error('Workflow error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-400" />
            Regulatory Analysis &amp; Multi-Agent Copilot
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Execute 7-stage LangGraph workflow: classify objection, retrieve state-isolated statutes, inspect policy wording, and synthesize evidence-backed filing response.
          </p>
        </div>

        <button
          onClick={runWorkflow}
          disabled={isRunning || !objectionText.trim()}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer ${
            isRunning || !objectionText.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isRunning ? (
            <>
              <Clock className="w-4 h-4 animate-spin text-white" />
              <span>Orchestrating Agents...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Multi-Agent Research Workflow</span>
            </>
          )}
        </button>
      </div>

      {/* Input Configuration & Scenario Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Text Areas & Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Select Objection Scenario or Enter Custom Letter
              </span>

              <select
                value={selectedScenarioId}
                onChange={(e) => handleScenarioSelect(e.target.value)}
                disabled={isRunning}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                {OBJECTION_SCENARIOS.map((scen) => (
                  <option key={scen.id} value={scen.id}>
                    {scen.state}: {scen.title.slice(0, 42)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction & Product Metadata */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Jurisdiction / State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value as USState)}
                  disabled={isRunning}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="CA">California (CDI)</option>
                  <option value="NY">New York (DFS)</option>
                  <option value="TX">Texas (TDI)</option>
                  <option value="IL">Illinois (IDOI)</option>
                  <option value="FL">Florida (OIR)</option>
                  <option value="NAIC">NAIC Collaborative Action</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Insurance Product Line
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value as InsuranceProduct)}
                  disabled={isRunning}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="General Liability (CGL)">General Liability (CGL)</option>
                  <option value="Cyber Risk & Tech E&O">Cyber Risk & Tech E&O</option>
                  <option value="Commercial Auto">Commercial Auto</option>
                  <option value="Workers' Compensation">Workers' Compensation</option>
                </select>
              </div>
            </div>

            {/* Objection Text Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Department of Insurance (DOI) Objection Letter
              </label>
              <textarea
                rows={9}
                value={objectionText}
                onChange={(e) => setObjectionText(e.target.value)}
                disabled={isRunning}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
                placeholder="Paste the regulatory examiner objection letter..."
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Includes automated prompt injection filtering and statutory citation parsing.
              </span>
            </div>

            {/* Submitted Policy Text Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Submitted Commercial Policy Wording / Contested Endorsement
              </label>
              <textarea
                rows={4}
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                disabled={isRunning}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
                placeholder="Paste the carrier's proposed policy wording or clause under review..."
              />
            </div>
          </div>
        </div>

        {/* Right: Multi-Agent Pipeline Visualization (LangGraph Style) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                LangGraph Multi-Agent Pipeline
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Conditional Routing
              </span>
            </div>

            <div className="space-y-3">
              {agentSteps.map((step, idx) => {
                const isCurrent = currentAgentIndex === idx;
                const isFinished = currentAgentIndex > idx || (completedDossier && !isRunning);
                const stepLog = agentLogs.find(l => l.agentName === step.name);

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                        : isFinished
                        ? 'bg-slate-850 border-slate-750'
                        : 'bg-slate-900/60 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isFinished
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isCurrent
                            ? 'bg-indigo-600 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {isFinished ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-indigo-300' : 'text-slate-200'}`}>
                            {step.name}
                          </h4>
                          <p className="text-[10px] text-slate-400">{step.description}</p>
                        </div>
                      </div>

                      {stepLog && (
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                          {stepLog.executionTimeMs} ms
                        </span>
                      )}
                    </div>

                    {stepLog && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] space-y-1">
                        <p className="text-slate-300 line-clamp-2">{stepLog.outputSummary}</p>
                        {stepLog.decisionNote && (
                          <p className="text-indigo-300/80 text-[10px] italic">
                            ↳ {stepLog.decisionNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {completedDossier && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Agentic Workflow Execution Complete
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    Confidence: {completedDossier.confidenceScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Evidence-backed filing response dossier synthesized. Ready for human compliance officer review and sign-off.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => onDossierGenerated(completedDossier)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <span>Proceed to Human Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
