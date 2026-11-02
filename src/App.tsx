import React, { useState, useMemo, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DocumentLibraryView } from './components/DocumentLibraryView';
import { AnalysisView } from './components/AnalysisView';
import { HumanReviewView } from './components/HumanReviewView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { EvaluationView } from './components/EvaluationView';
import { PythonCodebaseView } from './components/PythonCodebaseView';

import { 
  INITIAL_REGULATORY_DOCUMENTS, 
  INITIAL_POLICY_DOCUMENTS, 
  buildDocumentChunks 
} from './data/regulatoryCorpus';
import { OBJECTION_SCENARIOS, ObjectionScenario } from './data/objectionScenarios';
import { RegulatoryDocument, DraftResponseDossier } from './types/regulatory';
import { HybridRetriever } from './services/retrievalEngine';
import { RegulatoryAgentWorkflow } from './services/agentWorkflow';
import { BenchmarkEvaluator } from './services/benchmarkEvaluator';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Combine official regulatory documents and standard policy forms
  const [documents, setDocuments] = useState<RegulatoryDocument[]>([
    ...INITIAL_REGULATORY_DOCUMENTS,
    ...INITIAL_POLICY_DOCUMENTS
  ]);

  const [activeScenario, setActiveScenario] = useState<ObjectionScenario | null>(OBJECTION_SCENARIOS[0]);
  const [activeDossier, setActiveDossier] = useState<DraftResponseDossier | null>(null);
  const [geminiActive, setGeminiActive] = useState<boolean>(false);

  // Check backend health & Gemini status
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data && data.geminiConfigured) {
          setGeminiActive(true);
        }
      })
      .catch(() => {
        // Local mode fallback
        setGeminiActive(false);
      });
  }, []);

  // Compute chunks and instantiate search & agent engines
  const chunks = useMemo(() => buildDocumentChunks(documents), [documents]);
  const retriever = useMemo(() => new HybridRetriever(chunks), [chunks]);
  const workflowEngine = useMemo(() => new RegulatoryAgentWorkflow(retriever), [retriever]);
  const evaluator = useMemo(() => new BenchmarkEvaluator(retriever), [retriever]);

  const handleIngestDocument = (newDoc: RegulatoryDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleSelectScenarioFromDashboard = (scenario: ObjectionScenario) => {
    setActiveScenario(scenario);
    setActiveTab('analysis');
  };

  const handleDossierGenerated = (dossier: DraftResponseDossier) => {
    setActiveDossier(dossier);
    setActiveTab('review');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentCount={documents.length}
        hasActiveDossier={activeDossier !== null}
        geminiActive={geminiActive}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            documents={documents}
            onSelectScenario={handleSelectScenarioFromDashboard}
            onNavigateToTab={setActiveTab}
            completedDossierCount={activeDossier ? 1 : 0}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentLibraryView
            documents={documents}
            onIngestDocument={handleIngestDocument}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisView
            workflowEngine={workflowEngine}
            activeScenario={activeScenario}
            onScenarioChange={setActiveScenario}
            onDossierGenerated={handleDossierGenerated}
          />
        )}

        {activeTab === 'review' && (
          <HumanReviewView
            dossier={activeDossier}
            onUpdateDossier={setActiveDossier}
            onNavigateToAnalysis={() => setActiveTab('analysis')}
          />
        )}

        {activeTab === 'knowledge_graph' && (
          <KnowledgeGraphView />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationView evaluator={evaluator} />
        )}

        {activeTab === 'python_codebase' && (
          <PythonCodebaseView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>Regulatory Intelligence &amp; Filing Response Copilot</strong> • Production GenAI &amp; Agentic RAG Portfolio Prototype
          </span>
          <span className="text-[11px] text-slate-400">
            Independent demonstration prototype — not affiliated with or utilizing internal systems of The Hartford or Travelers.
          </span>
        </div>
      </footer>
    </div>
  );
}
