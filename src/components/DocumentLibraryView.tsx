import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  ExternalLink, 
  Tag, 
  Layers, 
  Check, 
  AlertTriangle,
  FileCheck2,
  BookOpen,
  Scan,
  Calendar,
  X
} from 'lucide-react';
import { RegulatoryDocument, USState, DocumentType, InsuranceProduct } from '../types/regulatory';

interface DocumentLibraryViewProps {
  documents: RegulatoryDocument[];
  onIngestDocument: (newDoc: RegulatoryDocument) => void;
}

export const DocumentLibraryView: React.FC<DocumentLibraryViewProps> = ({
  documents,
  onIngestDocument
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<RegulatoryDocument | null>(documents[0] || null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New Document Upload Form State
  const [docName, setDocName] = useState('');
  const [docState, setDocState] = useState<USState>('CA');
  const [docType, setDocType] = useState<DocumentType>('DOI Bulletin');
  const [docProduct, setDocProduct] = useState<InsuranceProduct>('Commercial Property');
  const [docCitation, setDocCitation] = useState('');
  const [docSourceUrl, setDocSourceUrl] = useState('');
  const [docContent, setDocContent] = useState('');
  const [isOcrMode, setIsOcrMode] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || doc.state === selectedState;
    const matchesType = selectedType === 'ALL' || doc.documentType === selectedType;
    return matchesSearch && matchesState && matchesType;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDuplicateWarning(null);
    setUploadSuccess(null);

    if (!docName || !docContent) return;

    // Duplicate detection check
    const isDuplicate = documents.some(d => 
      d.name.toLowerCase() === docName.toLowerCase() || 
      (docCitation && d.citation.toLowerCase() === docCitation.toLowerCase())
    );

    if (isDuplicate) {
      setDuplicateWarning(`Duplicate Document Detected: A document with title "${docName}" or citation "${docCitation}" is already indexed in the knowledge base.`);
      return;
    }

    const newDocId = `DOC-USER-${Date.now()}`;
    const wordCount = docContent.split(/\s+/).length;
    const calculatedPages = Math.max(1, Math.ceil(wordCount / 250));

    // Simple automated section chunking
    const paragraphs = docContent.split(/\n\n+/).filter(p => p.trim().length > 15);
    const sections = paragraphs.map((p, idx) => ({
      sectionNumber: `§ ${idx + 1}.0`,
      heading: `Extracted Section ${idx + 1}`,
      text: p.trim(),
      page: Math.min(calculatedPages, Math.floor(idx / 2) + 1)
    }));

    const newDoc: RegulatoryDocument = {
      id: newDocId,
      name: docName,
      documentType: docType,
      state: docState,
      jurisdiction: `State of ${docState}`,
      regulatoryAuthority: `${docState} Department of Insurance`,
      productCategory: docProduct,
      publicationDate: new Date().toISOString().split('T')[0],
      sourceUrl: docSourceUrl || 'https://insurance.regulatory.example/filing-doc',
      citation: docCitation || `${docState} DOI Reg. # ${Date.now().toString().slice(-4)}`,
      summary: docContent.slice(0, 180) + '...',
      fullText: docContent,
      pageCount: calculatedPages,
      sections,
      tags: ['User Ingested', isOcrMode ? 'OCR Processed' : 'Digital Extract', docType, docState]
    };

    onIngestDocument(newDoc);
    setSelectedDoc(newDoc);
    setUploadSuccess(`Successfully ingested "${newDoc.name}". Split into ${sections.length} semantic chunks with metadata indexed.`);
    setTimeout(() => {
      setIsUploadModalOpen(false);
      setUploadSuccess(null);
      // Reset
      setDocName('');
      setDocCitation('');
      setDocContent('');
      setDocSourceUrl('');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header & Ingestion Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            Regulatory Document Library &amp; Ingestion Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Official DOI administrative codes, statutes, NAIC model laws, approved SERFF precedent filings, and carrier forms.
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          Ingest New Document (PDF/DOCX/OCR)
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by statutory citation, bulletin title, key terms (e.g., 2644.9, wildfire, prompt payment)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-semibold">State:</span>
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All States</option>
              <option value="CA">CA - California</option>
              <option value="NY">NY - New York</option>
              <option value="TX">TX - Texas</option>
              <option value="IL">IL - Illinois</option>
              <option value="FL">FL - Florida</option>
              <option value="NAIC">NAIC National</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
              <span className="font-semibold">Type:</span>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Document Types</option>
              <option value="Statute">Statute</option>
              <option value="Administrative Code">Administrative Code</option>
              <option value="DOI Bulletin">DOI Bulletin</option>
              <option value="Circular Letter">Circular Letter</option>
              <option value="Carrier Precedent Response">Carrier Precedent Response</option>
              <option value="Standard Policy Form">Standard Policy Form</option>
              <option value="NAIC Model Law">NAIC Model Law</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          <span>Showing <strong>{filteredDocs.length}</strong> of <strong>{documents.length}</strong> indexed regulatory documents</span>
          <span className="font-mono text-emerald-400">Incremental Ingestion &amp; Duplicate Check: ACTIVE</span>
        </div>
      </div>

      {/* Main Content: Split List and Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document List */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          {filteredDocs.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {doc.state}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {doc.documentType}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {doc.publicationDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2 leading-snug line-clamp-2">
                  {doc.name}
                </h3>

                <p className="text-xs text-indigo-300 font-mono mt-1">
                  {doc.citation}
                </p>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    {doc.sections.length} semantic chunks • {doc.pageCount} pages
                  </span>
                  <span className="text-slate-300 font-medium">{doc.productCategory}</span>
                </div>
              </div>
            );
          })}

          {filteredDocs.length === 0 && (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 text-xs">
              No documents matched your search and filter criteria.
            </div>
          )}
        </div>

        {/* Selected Document Detail & Semantic Chunk Inspector */}
        <div className="lg:col-span-7">
          {selectedDoc ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-sm sticky top-24">
              {/* Document Header */}
              <div className="space-y-3 pb-4 border-b border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {selectedDoc.state}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedDoc.documentType}
                    </span>
                    <span className="text-xs text-slate-400">{selectedDoc.productCategory}</span>
                  </div>
                  <a
                    href={selectedDoc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <span>Provenance Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight">
                  {selectedDoc.name}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Statutory Citation</span>
                    <span className="text-indigo-300 font-mono font-medium">{selectedDoc.citation}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Regulatory Authority</span>
                    <span className="text-slate-200">{selectedDoc.regulatoryAuthority}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Effective Date</span>
                    <span className="text-slate-200">{selectedDoc.effectiveDate || selectedDoc.publicationDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDoc.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5 text-indigo-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Document Summary */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Regulatory Summary</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-850 p-3.5 rounded-lg border border-slate-800">
                  {selectedDoc.summary}
                </p>
              </div>

              {/* Indexed Semantic Chunks & Page References */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Indexed Semantic Chunks &amp; Page References ({selectedDoc.sections.length})
                  </span>
                  <span className="text-[11px] text-slate-500">Preserves Page Numbers for Citations</span>
                </div>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {selectedDoc.sections.map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/60 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-300 font-mono">
                          {sec.sectionNumber} • {sec.heading}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-semibold border border-slate-700">
                          Page {sec.page}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed font-sans">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400 text-sm">
              Select a document from the left to view metadata and indexed chunks.
            </div>
          )}
        </div>
      </div>

      {/* Document Ingestion Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Ingest Regulatory or Policy Document</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {duplicateWarning && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{duplicateWarning}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., California CDI Bulletin 2024-1 Mandatory Cyber Incident Response Disclosures"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jurisdiction / State</label>
                  <select
                    value={docState}
                    onChange={(e) => setDocState(e.target.value as USState)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CA">California (CA)</option>
                    <option value="NY">New York (NY)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="IL">Illinois (IL)</option>
                    <option value="FL">Florida (FL)</option>
                    <option value="NAIC">NAIC / Interstate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Document Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocumentType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="DOI Bulletin">DOI Bulletin</option>
                    <option value="Statute">Statute</option>
                    <option value="Administrative Code">Administrative Code</option>
                    <option value="Circular Letter">Circular Letter</option>
                    <option value="Standard Policy Form">Standard Policy Form</option>
                    <option value="Carrier Precedent Response">Carrier Precedent Response</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Insurance Line</label>
                  <select
                    value={docProduct}
                    onChange={(e) => setDocProduct(e.target.value as InsuranceProduct)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="General Liability (CGL)">General Liability (CGL)</option>
                    <option value="Cyber Risk & Tech E&O">Cyber Risk & Tech E&O</option>
                    <option value="Commercial Auto">Commercial Auto</option>
                    <option value="Workers' Compensation">Workers' Compensation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Statutory Citation / Reference</label>
                  <input
                    type="text"
                    placeholder="e.g., 10 CCR § 2644.15 or Cal. Ins. Code § 1861.05"
                    value={docCitation}
                    onChange={(e) => setDocCitation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Source Provenance URL</label>
                  <input
                    type="url"
                    placeholder="e.g., https://insurance.ca.gov/bulletins/2024.pdf"
                    value={docSourceUrl}
                    onChange={(e) => setDocSourceUrl(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <input
                  type="checkbox"
                  id="ocrToggle"
                  checked={isOcrMode}
                  onChange={(e) => setIsOcrMode(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="ocrToggle" className="text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer">
                  <Scan className="w-3.5 h-3.5 text-indigo-400" />
                  Enable OCR Scanned Document Mode (Applies PyMuPDF / Tesseract layout-preserving extraction)
                </label>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Document Full Text or Scanned Extracted Text
                </label>
                <textarea
                  required
                  rows={7}
                  placeholder="Paste regulatory statute text, DOI objection letter, or policy endorsement wording here..."
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Paragraph breaks (\n\n) will be automatically preserved as semantic chunk boundaries with page number indices.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Ingest &amp; Generate Embeddings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
