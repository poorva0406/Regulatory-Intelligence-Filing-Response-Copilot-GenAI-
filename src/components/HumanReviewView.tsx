import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  BookOpen, 
  Clock, 
  Layers, 
  Sparkles,
  ExternalLink,
  MessageSquare,
  Check,
  Printer
} from 'lucide-react';
import { DraftResponseDossier } from '../types/regulatory';

interface HumanReviewViewProps {
  dossier: DraftResponseDossier | null;
  onUpdateDossier: (updated: DraftResponseDossier) => void;
  onNavigateToAnalysis: () => void;
}

export const HumanReviewView: React.FC<HumanReviewViewProps> = ({
  dossier,
  onUpdateDossier,
  onNavigateToAnalysis
}) => {
  if (!dossier) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto my-12 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">No Filing Response Dossier Active</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Launch a regulatory objection analysis or select a pre-configured scenario in the <strong>Regulatory Copilot</strong> tab to generate an evidence-backed draft response.
        </p>
        <button
          onClick={onNavigateToAnalysis}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <span>Go to Regulatory Copilot</span>
        </button>
      </div>
    );
  }

  const [activeSubTab, setActiveSubTab] = useState<'letter' | 'policy_diff' | 'citations' | 'precedents'>('letter');
  const [editedLetter, setEditedLetter] = useState(dossier.draftResponseLetter);
  const [editedEndorsement, setEditedEndorsement] = useState(dossier.amendedEndorsementWording);
  const [reviewerNotes, setReviewerNotes] = useState(dossier.humanReviewNotes || '');
  const [reviewerName, setReviewerName] = useState(dossier.reviewedBy || 'Regulatory Compliance Counsel');
  const [reviewActionSuccess, setReviewActionSuccess] = useState<string | null>(null);

  // Compliance checklist items
  const [checklist, setChecklist] = useState({
    statutoryTimelinesVerified: true,
    stateJurisdictionIsolated: true,
    actuarialExhibitAttached: false,
    endorsementLanguageApproved: true,
    noAbsoluteLegalImmunityClaimed: true
  });

  const handleReviewAction = (status: 'Approved' | 'Revision Requested' | 'Rejected') => {
    const updated: DraftResponseDossier = {
      ...dossier,
      draftResponseLetter: editedLetter,
      amendedEndorsementWording: editedEndorsement,
      humanReviewStatus: status,
      humanReviewNotes: reviewerNotes,
      reviewedBy: reviewerName,
      reviewedAt: new Date().toISOString()
    };
    onUpdateDossier(updated);
    setReviewActionSuccess(`Filing Dossier marked as ${status.toUpperCase()} by ${reviewerName}. Audit timestamp recorded.`);
    setTimeout(() => setReviewActionSuccess(null), 4000);
  };

  const handleExportText = () => {
    const exportContent = `================================================================================
SERFF FILING RESPONSE PACKAGE
Filing Reference: ${dossier.filingReference}
State Jurisdiction: ${dossier.state}
Insurance Product: ${dossier.insuranceProduct}
Review Status: ${dossier.humanReviewStatus}
Reviewed By: ${dossier.reviewedBy || 'Pending'} (${dossier.reviewedAt || 'N/A'})
Confidence Score: ${dossier.confidenceScore}% | Evidence Coverage: ${dossier.evidenceCoverageScore}%
================================================================================

1. FORMAL CARRIER RESPONSE LETTER TO INSURANCE COMMISSIONER:
--------------------------------------------------------------------------------
${editedLetter}

2. AMENDED POLICY ENDORSEMENT WORDING:
--------------------------------------------------------------------------------
${editedEndorsement}

3. STATUTORY PROVISIONS CITED:
--------------------------------------------------------------------------------
${dossier.applicableProvisions.map(p => `• ${p.code}: ${p.title} (Doc: ${p.sourceDoc}, Page ${p.page})`).join('\n')}

4. POLICY GAP ANALYSIS:
--------------------------------------------------------------------------------
${dossier.policyComparisons.map(c => `• Clause: ${c.clauseName}\n  Gap: ${c.complianceGap} (${c.statutoryReference})\n  Action: ${c.recommendedAdjustment}`).join('\n\n')}

5. AUDIT NOTES:
--------------------------------------------------------------------------------
${reviewerNotes || 'Approved with full regulatory compliance verification.'}
`;

    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SERFF-RESPONSE-${dossier.filingReference.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {dossier.state}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {dossier.insuranceProduct}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
              dossier.humanReviewStatus === 'Approved'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : dossier.humanReviewStatus === 'Rejected'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {dossier.humanReviewStatus}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight mt-2">
            Filing Response Dossier: {dossier.filingReference}
          </h1>

          <p className="text-xs text-slate-400 mt-1 max-w-2xl line-clamp-1">
            {dossier.objectionSummary}
          </p>
        </div>

        {/* Scores & Badges */}
        <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Confidence</span>
            <span className="text-xl font-extrabold text-white">{dossier.confidenceScore}%</span>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Coverage</span>
            <span className="text-xl font-extrabold text-emerald-400">{dossier.evidenceCoverageScore}%</span>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Citations</span>
            <span className="text-xl font-extrabold text-sky-400">{dossier.applicableProvisions.length}</span>
          </div>
        </div>
      </div>

      {reviewActionSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{reviewActionSuccess}</span>
          </div>
        </div>
      )}

      {/* Main Review Cockpit Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Draft Editor & Tabs */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            {/* Sub Tabs */}
            <div className="flex space-x-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveSubTab('letter')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === 'letter'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Response Letter Draft
              </button>
              <button
                onClick={() => setActiveSubTab('policy_diff')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === 'policy_diff'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Amended Endorsement &amp; Gaps ({dossier.policyComparisons.length})
              </button>
              <button
                onClick={() => setActiveSubTab('citations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === 'citations'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Verified Citations ({dossier.applicableProvisions.length})
              </button>
              <button
                onClick={() => setActiveSubTab('precedents')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === 'precedents'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Historical Precedents ({dossier.similarPrecedents.length})
              </button>
            </div>

            {/* Sub Tab 1: Response Letter Editor */}
            {activeSubTab === 'letter' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold">Interactive Carrier Response Letter (Editable Draft)</span>
                  <span className="font-mono text-[11px]">Word Count: ~{editedLetter.split(/\s+/).length}</span>
                </div>
                <textarea
                  rows={18}
                  value={editedLetter}
                  onChange={(e) => setEditedLetter(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-4 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>
            )}

            {/* Sub Tab 2: Policy Comparison & Amended Endorsement */}
            {activeSubTab === 'policy_diff' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Policy Clause Discrepancies &amp; Regulatory Gap Matrix
                  </span>
                  {dossier.policyComparisons.map((c, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/60 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{c.clauseName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {c.complianceGap}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block font-semibold">Carrier Original Text:</span>
                          <span className="text-slate-300">{c.carrierWording}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-indigo-400 block font-semibold">Statutory Mandate ({c.statutoryReference}):</span>
                          <span className="text-slate-300">{c.regulatoryRequirement}</span>
                        </div>
                      </div>
                      <div className="pt-1 text-[11px]">
                        <span className="text-emerald-400 font-semibold">Remedy: </span>
                        <span className="text-slate-200">{c.recommendedAdjustment}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Amended Endorsement Wording (To Be Attached in SERFF)
                  </span>
                  <textarea
                    rows={8}
                    value={editedEndorsement}
                    onChange={(e) => setEditedEndorsement(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Sub Tab 3: Verified Citations */}
            {activeSubTab === 'citations' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Authoritative Statutory Citations &amp; Evidence Grounding
                </span>
                <div className="space-y-2">
                  {dossier.applicableProvisions.map((prov, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/60 flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-indigo-300 font-mono">{prov.code}</span>
                        <h4 className="font-semibold text-white">{prov.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{prov.relevance}</p>
                        <span className="text-[10px] text-slate-500 block">Source Document: {prov.sourceDoc}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-bold border border-slate-700 whitespace-nowrap">
                        Page {prov.page}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub Tab 4: Historical Precedents */}
            {activeSubTab === 'precedents' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Historical SERFF Precedent Filings &amp; Approved Language
                </span>
                <div className="space-y-3">
                  {dossier.similarPrecedents.map((prec, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-800/70 border border-slate-700/60 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-300 font-mono">{prec.filingId}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {prec.resolutionOutcome}
                        </span>
                      </div>
                      <p className="text-slate-300 font-medium">{prec.objectionSummary}</p>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        <span className="text-slate-500 block font-semibold">Accepted Precedent Wording:</span>
                        <span className="text-slate-300 italic">"{prec.acceptedWording}"</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Human Review Sign-Off & Checklist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Human Reviewer Audit Cockpit
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Mandatory human legal counsel sign-off before electronic transmission to insurance commissioner.
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Reviewer Name / Title</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Compliance Review Notes</label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Record justification, actuarial exhibits attached, or instructions for underwriting..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* Mandatory Compliance Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-slate-300 block text-[11px] uppercase tracking-wider">
                Regulatory Compliance Verification Checklist
              </span>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.statutoryTimelinesVerified}
                  onChange={(e) => setChecklist({ ...checklist, statutoryTimelinesVerified: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <span>Statutory deadlines verified against state code</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.stateJurisdictionIsolated}
                  onChange={(e) => setChecklist({ ...checklist, stateJurisdictionIsolated: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <span>Strict state isolation enforced (no out-of-state rules)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.endorsementLanguageApproved}
                  onChange={(e) => setChecklist({ ...checklist, endorsementLanguageApproved: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <span>Amendatory endorsement wording legally vetted</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.noAbsoluteLegalImmunityClaimed}
                  onChange={(e) => setChecklist({ ...checklist, noAbsoluteLegalImmunityClaimed: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <span>Responsible AI: No unsupported legal immunity conclusions</span>
              </label>
            </div>

            {/* Sign-off Actions */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => handleReviewAction('Approved')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve Filing Response Package
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleReviewAction('Revision Requested')}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Request Revision
                </button>
                <button
                  onClick={() => handleReviewAction('Rejected')}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject Draft
                </button>
              </div>

              <button
                onClick={handleExportText}
                className="w-full mt-2 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export Official SERFF Submission Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
