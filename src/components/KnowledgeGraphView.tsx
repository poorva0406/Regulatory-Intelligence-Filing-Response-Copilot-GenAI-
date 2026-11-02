import React, { useState } from 'react';
import { 
  Share2, 
  Search, 
  Filter, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Zap,
  Globe,
  Shield,
  BookOpen,
  FileCode,
  Tag
} from 'lucide-react';
import { KnowledgeGraphNode, KnowledgeGraphEdge } from '../types/regulatory';
import { INITIAL_GRAPH_NODES, INITIAL_GRAPH_EDGES } from '../data/knowledgeGraphData';

export const KnowledgeGraphView: React.FC = () => {
  const [nodes] = useState<KnowledgeGraphNode[]>(INITIAL_GRAPH_NODES);
  const [edges] = useState<KnowledgeGraphEdge[]>(INITIAL_GRAPH_EDGES);
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(nodes[0] || null);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const nodeTypeColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    State: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/40', text: 'text-indigo-300', icon: 'State' },
    Authority: { bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-300', icon: 'DOI' },
    Regulation: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300', icon: 'Law' },
    Product: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300', icon: 'Line' },
    Clause: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-amber-300', icon: 'Clause' },
    Objection: { bg: 'bg-rose-500/20', border: 'border-rose-500/40', text: 'text-rose-300', icon: 'Obj' },
    Response: { bg: 'bg-teal-500/20', border: 'border-teal-500/40', text: 'text-teal-300', icon: 'Resp' }
  };

  const filteredNodes = nodes.filter(n => {
    const matchesType = typeFilter === 'ALL' || n.type === typeFilter;
    const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate connected edges and nodes for selectedNode
  const connectedEdges = selectedNode ? edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id) : [];
  const neighborNodeIds = new Set<string>();
  connectedEdges.forEach(e => {
    neighborNodeIds.add(e.source);
    neighborNodeIds.add(e.target);
  });
  if (selectedNode) neighborNodeIds.delete(selectedNode.id);

  const neighborNodes = nodes.filter(n => neighborNodeIds.has(n.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="w-6 h-6 text-indigo-400" />
            Insurance Regulatory Knowledge Graph Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            NetworkX-style semantic graph: State → Regulatory Authority → Regulation → Insurance Product → Policy Clause → Objection → Precedent Response.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
          <span className="font-bold text-white">{nodes.length}</span>
          <span className="text-slate-400">Nodes</span>
          <span className="text-slate-600">•</span>
          <span className="font-bold text-indigo-400">{edges.length}</span>
          <span className="text-slate-400">Typed Relations</span>
        </div>
      </div>

      {/* Graph vs Hybrid RAG Explanation Box */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-5 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-indigo-400" />
          Why Graph-Assisted Retrieval Outperforms Ordinary Vector RAG
        </div>
        <p className="leading-relaxed">
          Standard vector RAG matches queries based purely on token embeddings, which can easily confuse similar wording across states 
          (e.g., retrieving a California non-renewal moratorium for a Florida commercial filing). 
          Our <strong>Knowledge Graph</strong> enforces structural topology: an objection node connects only to its enforcing state authority, 
          which in turn restricts traversal to binding state statutes and SERFF precedent filings. 
          Traversing 1-hop and 2-hop edges provides multi-hop context without hallucinating cross-state legal applicability.
        </p>
      </div>

      {/* Search & Type Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search graph entities (e.g., CDI, 2644.9, War Exclusion)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['ALL', 'State', 'Authority', 'Regulation', 'Product', 'Clause', 'Objection', 'Response'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                typeFilter === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Grid: Interactive Visual Canvas + Node Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Node Explorer Canvas */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Graph Entity Topology ({filteredNodes.length} visible)
            </span>
            <span className="text-[11px] text-slate-500">Click any node to inspect connected relationships</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const style = nodeTypeColors[node.type] || nodeTypeColors.State;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/40 shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${style.bg} ${style.border} ${style.text}`}>
                      {node.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{node.id}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2 leading-snug">
                    {node.label}
                  </h4>
                  <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex flex-wrap gap-1 text-[10px] text-slate-400">
                    {Object.entries(node.properties).slice(0, 2).map(([k, v]) => (
                      <span key={k} className="bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Inspection & Graph Neighborhood */}
        <div className="lg:col-span-5 space-y-4">
          {selectedNode ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5 sticky top-24">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${nodeTypeColors[selectedNode.type]?.bg} ${nodeTypeColors[selectedNode.type]?.border} ${nodeTypeColors[selectedNode.type]?.text}`}>
                    {selectedNode.type} Node
                  </span>
                  <span className="text-xs font-mono text-slate-400">{selectedNode.id}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {selectedNode.label}
                </h3>
              </div>

              {/* Node Properties */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Node Properties
                </span>
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1.5 text-xs">
                  {Object.entries(selectedNode.properties).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold">{key}:</span>
                      <span className="text-slate-200 font-mono text-[11px]">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Hop Connected Relations */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Connected Graph Relations ({connectedEdges.length})</span>
                  <span className="text-indigo-400 font-normal">1-Hop Traversal</span>
                </span>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {connectedEdges.map((edge) => {
                    const isOutbound = edge.source === selectedNode.id;
                    const otherNodeId = isOutbound ? edge.target : edge.source;
                    const otherNode = nodes.find(n => n.id === otherNodeId);

                    return (
                      <div
                        key={edge.id}
                        onClick={() => otherNode && setSelectedNode(otherNode)}
                        className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/60 transition-all cursor-pointer flex items-center justify-between text-xs group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-indigo-400 font-mono">
                              {edge.type}
                            </span>
                            <span className="text-slate-500 text-[10px]">
                              {isOutbound ? '➔' : '⬅'}
                            </span>
                          </div>
                          <span className="text-slate-200 font-semibold group-hover:text-indigo-300">
                            {otherNode?.label || otherNodeId}
                          </span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                          {otherNode?.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400 text-xs">
              Select any graph entity to inspect properties and connected edges.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
