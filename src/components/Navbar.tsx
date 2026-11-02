import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Share2, 
  BarChart3, 
  Code2, 
  Sparkles,
  Layers
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard' 
  | 'documents' 
  | 'analysis' 
  | 'review' 
  | 'knowledge_graph' 
  | 'evaluation' 
  | 'python_codebase';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  documentCount: number;
  hasActiveDossier: boolean;
  geminiActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  documentCount,
  hasActiveDossier,
  geminiActive
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'documents', label: 'Document Library', icon: <FileText className="w-4 h-4" />, badge: `${documentCount}` },
    { id: 'analysis', label: 'Regulatory Copilot', icon: <Cpu className="w-4 h-4" /> },
    { id: 'review', label: 'Human Review', icon: <CheckCircle2 className="w-4 h-4" />, badge: hasActiveDossier ? 'Ready' : undefined },
    { id: 'knowledge_graph', label: 'Knowledge Graph', icon: <Share2 className="w-4 h-4" /> },
    { id: 'evaluation', label: 'RAG Benchmark (30 Cases)', icon: <Layers className="w-4 h-4" /> },
    { id: 'python_codebase', label: 'Python Engine & Architecture', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-base">
                  REGULATORY INTELLIGENCE
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Copilot v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Commercial Insurance Filing &amp; Objection Response AI Engine
              </p>
            </div>
          </div>

          {/* AI Studio & Model Badges */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">
                {geminiActive ? 'Gemini 3.8 Flash Hybrid Engine' : 'Local Deterministic RAG & Graph Engine'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 ml-1" />
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-400 font-mono">
              Hybrid RAG + LangGraph + NetworkX
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-indigo-900 text-indigo-200'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
