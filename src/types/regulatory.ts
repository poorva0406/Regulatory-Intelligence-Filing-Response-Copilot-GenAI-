/**
 * Data structures and types for the Regulatory Intelligence & Filing Response Copilot.
 */

export type USState = 'CA' | 'NY' | 'TX' | 'IL' | 'FL' | 'NAIC' | 'FEDERAL';

export type InsuranceProduct = 
  | 'Commercial Property'
  | 'General Liability (CGL)'
  | 'Cyber Risk & Tech E&O'
  | 'Workers\' Compensation'
  | 'Commercial Auto'
  | 'Directors & Officers (D&O)'
  | 'Businessowners Policy (BOP)';

export type DocumentType = 
  | 'Statute'
  | 'Administrative Code'
  | 'DOI Bulletin'
  | 'Circular Letter'
  | 'Historical Filing Objection'
  | 'Carrier Precedent Response'
  | 'Standard Policy Form'
  | 'NAIC Model Law';

export interface RegulatoryDocument {
  id: string;
  name: string;
  documentType: DocumentType;
  state: USState;
  jurisdiction: string;
  regulatoryAuthority: string;
  productCategory: InsuranceProduct;
  publicationDate: string;
  effectiveDate?: string;
  sourceUrl: string;
  citation: string;
  summary: string;
  fullText: string;
  pageCount: number;
  sections: {
    sectionNumber: string;
    heading: string;
    text: string;
    page: number;
  }[];
  tags: string[];
}

export interface DocumentChunk {
  chunkId: string;
  documentId: string;
  documentName: string;
  state: USState;
  productCategory: InsuranceProduct;
  documentType: DocumentType;
  citation: string;
  sourceUrl: string;
  pageNumber: number;
  sectionNumber?: string;
  sectionHeading?: string;
  content: string;
  tokenCount: number;
  embedding?: number[];
}

export interface ObjectionExtraction {
  state: USState;
  insuranceProduct: InsuranceProduct;
  objectionCategory: string;
  filingNumber?: string;
  regulatoryAuthority: string;
  examinerName?: string;
  objectionDate: string;
  responseDeadline: string;
  contestedPolicyClauses: string[];
  regulatoryProvisionsCited: string[];
  clarificationsRequested: string[];
  evidenceRequired: string[];
  severity: 'Critical / Disapproval Risk' | 'Moderate / Amendment Required' | 'Informational / Clarification';
  rawObjectionSummary: string;
}

export interface PolicyComparisonResult {
  clauseName: string;
  carrierWording: string;
  regulatoryRequirement: string;
  statutoryReference: string;
  complianceGap: 'Compliant' | 'Substantial Discrepancy' | 'Missing Mandatory Language' | 'Ambiguous Terminology';
  gapAnalysis: string;
  recommendedAdjustment: string;
}

export interface AgentStepLog {
  agentName: string;
  status: 'pending' | 'running' | 'completed' | 'skipped' | 'flagged';
  timestamp: string;
  executionTimeMs: number;
  inputSummary: string;
  outputSummary: string;
  evidenceRetrievedCount?: number;
  decisionNote?: string;
}

export interface ValidationReport {
  overallValid: boolean;
  faithfulnessScore: number; // 0 - 100
  citationAccuracyScore: number; // 0 - 100
  unsupportedClaims: string[];
  verifiedCitations: {
    citation: string;
    verified: boolean;
    sourceDocument: string;
    pageNumber: number;
  }[];
  hallucinationRisk: 'Low' | 'Medium' | 'High';
  missingEvidenceAlerts: string[];
  responsibleAiGuardrailsPassed: boolean;
  legalDisclaimerIncluded: boolean;
}

export interface DraftResponseDossier {
  id: string;
  objectionId: string;
  filingReference: string;
  state: USState;
  insuranceProduct: InsuranceProduct;
  objectionSummary: string;
  applicableProvisions: {
    code: string;
    title: string;
    relevance: string;
    sourceDoc: string;
    page: number;
  }[];
  similarPrecedents: {
    filingId: string;
    state: USState;
    year: number;
    carrier: string;
    objectionSummary: string;
    resolutionOutcome: string;
    acceptedWording: string;
  }[];
  policyComparisons: PolicyComparisonResult[];
  draftResponseLetter: string;
  amendedEndorsementWording: string;
  supportingEvidenceRequired: string[];
  unresolvedQuestions: string[];
  confidenceScore: number; // 0-100
  evidenceCoverageScore: number; // 0-100
  validationReport: ValidationReport;
  agentLogs: AgentStepLog[];
  humanReviewStatus: 'Pending Review' | 'Approved' | 'Revision Requested' | 'Rejected';
  humanReviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'State' | 'Authority' | 'Regulation' | 'Product' | 'Clause' | 'Objection' | 'Response';
  properties: Record<string, string | number>;
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'REGULATES' | 'ENFORCES' | 'APPLIES_TO' | 'CONTAINS_CLAUSE' | 'CHALLENGES' | 'RESOLVED_BY' | 'CITES';
  weight?: number;
}

export interface BenchmarkCase {
  id: string;
  category: 'Clear Regulatory Answer' | 'Cross-Document Multi-Hop' | 'Cross-State Jurisdictional Nuance' | 'Insufficient Evidence / Out-of-Scope' | 'Adversarial / Misleading Context';
  query: string;
  state: USState;
  product: InsuranceProduct;
  groundTruthAnswer: string;
  relevantDocIds: string[];
  relevantCitations: string[];
  mustRefuseToAssert?: boolean;
}

export interface BenchmarkMetricResult {
  architectureName: string;
  recallAtK: number; // e.g. 0.88
  precisionAtK: number; // e.g. 0.82
  mrr: number; // Mean Reciprocal Rank e.g. 0.85
  contextRelevance: number; // 0-1
  faithfulness: number; // 0-1
  citationAccuracy: number; // 0-1
  unsupportedClaimRate: number; // lower is better e.g. 0.04
  averageLatencyMs: number;
  totalTestCases: number;
}
