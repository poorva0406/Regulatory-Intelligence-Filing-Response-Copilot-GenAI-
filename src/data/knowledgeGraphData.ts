import { KnowledgeGraphNode, KnowledgeGraphEdge } from '../types/regulatory';

export const INITIAL_GRAPH_NODES: KnowledgeGraphNode[] = [
  // States
  { id: 'STATE_CA', label: 'California', type: 'State', properties: { code: 'CA', region: 'West', jurisdiction: 'State' } },
  { id: 'STATE_NY', label: 'New York', type: 'State', properties: { code: 'NY', region: 'Northeast', jurisdiction: 'State' } },
  { id: 'STATE_TX', label: 'Texas', type: 'State', properties: { code: 'TX', region: 'South', jurisdiction: 'State' } },
  { id: 'STATE_IL', label: 'Illinois', type: 'State', properties: { code: 'IL', region: 'Midwest', jurisdiction: 'State' } },
  { id: 'STATE_FL', label: 'Florida', type: 'State', properties: { code: 'FL', region: 'Southeast', jurisdiction: 'State' } },
  { id: 'STATE_NAIC', label: 'NAIC National', type: 'State', properties: { code: 'NAIC', region: 'National', jurisdiction: 'Interstate' } },

  // Authorities
  { id: 'AUTH_CDI', label: 'California Dept of Insurance (CDI)', type: 'Authority', properties: { commissioner: 'Ricardo Lara', scope: 'State DOI' } },
  { id: 'AUTH_NYDFS', label: 'New York Dept of Financial Services (DFS)', type: 'Authority', properties: { superintendent: 'Adrienne A. Harris', scope: 'Banking & Insurance' } },
  { id: 'AUTH_TDI', label: 'Texas Dept of Insurance (TDI)', type: 'Authority', properties: { commissioner: 'Cassie Brown', scope: 'State DOI' } },
  { id: 'AUTH_IDOI', label: 'Illinois Dept of Insurance (IDOI)', type: 'Authority', properties: { director: 'Dana Popish Severinghaus', scope: 'State DOI' } },
  { id: 'AUTH_FLOIR', label: 'Florida Office of Insurance Regulation (OIR)', type: 'Authority', properties: { commissioner: 'Michael Yaworsky', scope: 'State OIR' } },
  { id: 'AUTH_NAIC', label: 'National Assoc. of Insurance Commissioners', type: 'Authority', properties: { role: 'Standard Setting Organization', scope: 'National' } },

  // Regulations
  { id: 'REG_10CCR2644_9', label: '10 CCR § 2644.9 (Wildfire Mitigation Credits)', type: 'Regulation', properties: { citation: '10 CCR § 2644.9', year: 2022, topic: 'Wildfire Mitigation & Surcharges' } },
  { id: 'REG_CAL_678_5', label: 'Cal. Ins. Code § 678.5 (Wildfire Non-Renewal Moratorium)', type: 'Regulation', properties: { citation: 'Cal. Ins. Code § 678.5', year: 2018, topic: '1-Year Non-Renewal Moratorium' } },
  { id: 'REG_NY_23NYCRR500', label: '23 NYCRR 500 (Cyber Risk Standards)', type: 'Regulation', properties: { citation: '23 NYCRR 500', year: 2021, topic: 'Cybersecurity & Ransomware Framework' } },
  { id: 'REG_NY_CL2021_01', label: 'NY DFS Circular Letter No. 1 (2021)', type: 'Regulation', properties: { citation: 'NY DFS CL 2021-01', year: 2021, topic: 'Cyber Insurance War Exclusion Attribution' } },
  { id: 'REG_NY_3426', label: 'NY Ins. Law § 3426 (Commercial Cancellation/Nonrenewal)', type: 'Regulation', properties: { citation: 'NY Ins. Law § 3426', year: 2020, topic: '60-120 Day Notice' } },
  { id: 'REG_TX_542_055', label: 'Tex. Ins. Code § 542.055 (15-Day Claim Acknowledgment)', type: 'Regulation', properties: { citation: 'Tex. Ins. Code § 542.055', year: 2003, topic: 'Prompt Payment - Receipt & Acknowledgment' } },
  { id: 'REG_TX_542_056', label: 'Tex. Ins. Code § 542.056 (15-Day Acceptance/Rejection)', type: 'Regulation', properties: { citation: 'Tex. Ins. Code § 542.056', year: 2003, topic: 'Prompt Payment - Acceptance Deadlines' } },
  { id: 'REG_TX_542_060', label: 'Tex. Ins. Code § 542.060 (18% Statutory Delay Interest)', type: 'Regulation', properties: { citation: 'Tex. Ins. Code § 542.060', year: 2003, topic: 'Penalty Interest 18% + Atty Fees' } },
  { id: 'REG_IL_ADMIN_919', label: '50 Ill. Adm. Code 919 (Improper Claims Practices)', type: 'Regulation', properties: { citation: '50 Ill. Adm. Code 919.50', year: 2022, topic: 'Claims Practices & Defense Inside Limits' } },
  { id: 'REG_IL_143_17A', label: '215 ILCS 5/143.17a (60-Day Commercial Non-Renewal)', type: 'Regulation', properties: { citation: '215 ILCS 5/143.17a', year: 2021, topic: '60-Day Advance Written Notice' } },
  { id: 'REG_FL_627_4133', label: 'F.S. § 627.4133 (120-Day Commercial Property Notice)', type: 'Regulation', properties: { citation: 'F.S. § 627.4133', year: 2023, topic: '120-Day Notice of Non-Renewal' } },
  { id: 'REG_FL_627_701', label: 'F.S. § 627.701 (18-Pt Hurricane Deductible Warning)', type: 'Regulation', properties: { citation: 'F.S. § 627.701', year: 2023, topic: '18-Pt Bold Hurricane Disclosure' } },
  { id: 'REG_NAIC_880', label: 'NAIC Model #880 (Unfair Trade Practices & AI Bulletin)', type: 'Regulation', properties: { citation: 'NAIC Model #880', year: 2023, topic: 'Proxy Discrimination & AI Governance' } },

  // Products
  { id: 'PROD_PROP', label: 'Commercial Property', type: 'Product', properties: { line: 'Commercial Lines', category: 'Property & Inland Marine' } },
  { id: 'PROD_CYBER', label: 'Cyber Risk & Tech E&O', type: 'Product', properties: { line: 'Specialty Casualty', category: 'Cyber Liability' } },
  { id: 'PROD_CGL', label: 'General Liability (CGL)', type: 'Product', properties: { line: 'Commercial Lines', category: 'Casualty' } },
  { id: 'PROD_AUTO', label: 'Commercial Auto', type: 'Product', properties: { line: 'Commercial Lines', category: 'Automobile Fleet' } },

  // Policy Clauses
  { id: 'CLAUSE_WF_SCORE', label: 'Endorsement CP-WF-01 (Proprietary Wildfire Surcharge)', type: 'Clause', properties: { clauseType: 'Rating Endorsement', issues: 'No IBHS discount; no appeal' } },
  { id: 'CLAUSE_CY_WAR', label: 'Clause III.8 (Unilateral Nation-State War Exclusion)', type: 'Clause', properties: { clauseType: 'Exclusion', issues: 'Unilateral insurer discretion' } },
  { id: 'CLAUSE_CGL_PROOF', label: 'CGL Condition 2 (30-Day Proof of Loss Delay)', type: 'Clause', properties: { clauseType: 'Condition', issues: 'Delays investigation until proof of loss' } },
  { id: 'CLAUSE_IL_DEF_EROSION', label: 'Endorsement CGL-IL-DEF (Defense Inside Limits)', type: 'Clause', properties: { clauseType: 'Limit Endorsement', issues: 'Erodes mandatory auto limits' } },
  { id: 'CLAUSE_FL_HURR_DED', label: '10% Hurricane Deductible (Missing 18-Pt Notice)', type: 'Clause', properties: { clauseType: 'Deductible', issues: 'Missing 18pt bold disclosure' } },
  { id: 'CLAUSE_GENERIC_30D', label: 'Generic 30-Day Cancellation Clause', type: 'Clause', properties: { clauseType: 'General Condition', issues: 'Conflicts with FL 120d, IL 60d, CA moratorium' } },

  // Objections
  { id: 'OBJ_CA_WF', label: 'CDI Wildfire Discount & Transparency Objection', type: 'Objection', properties: { filing: 'SERFF CA-2024-04921', status: 'Pending Filing Response' } },
  { id: 'OBJ_NY_CY', label: 'NY DFS Cyber War Attribution Objection', type: 'Objection', properties: { filing: 'SERFF NY-2024-11890', status: 'Pending Filing Response' } },
  { id: 'OBJ_TX_CGL', label: 'TDI Prompt Payment Discrepancy Objection', type: 'Objection', properties: { filing: 'SERFF TX-2024-08241', status: 'Pending Filing Response' } },
  { id: 'OBJ_IL_AUTO', label: 'IDOI Defense Erosion & 60-Day Notice Objection', type: 'Objection', properties: { filing: 'SERFF IL-2024-02319', status: 'Pending Filing Response' } },
  { id: 'OBJ_FL_PROP', label: 'FL OIR 120-Day Notice & Hurricane Disclosure Objection', type: 'Objection', properties: { filing: 'SERFF FL-2024-09923', status: 'Pending Filing Response' } },
  { id: 'OBJ_NAIC_AI', label: 'NAIC Multi-State Algorithmic Bias Objection', type: 'Objection', properties: { filing: 'SERFF MS-2024-01055', status: 'Pending Filing Response' } },

  // Responses / Precedent Filings
  { id: 'RESP_CA_APPROVED', label: 'Approved CA Precedent Filing (SERFF CA-2023-08912)', type: 'Response', properties: { outcome: 'Approved', keyChange: 'Added IBHS 15% discount schedule & 30d appeal' } },
  { id: 'RESP_NY_APPROVED', label: 'Approved NY Precedent Filing (SERFF NY-2022-5412)', type: 'Response', properties: { outcome: 'Approved', keyChange: 'Added US Govt formal attribution carveout' } },
  { id: 'RESP_TX_AMENDATORY', label: 'Texas Amendatory Endorsement CG 01 03 Standard', type: 'Response', properties: { outcome: 'Standard Approved', keyChange: 'Incorporates Chapter 542 15-day rules' } },
  { id: 'RESP_IL_AMENDATORY', label: 'Illinois Amendatory Endorsement IL-02-14 Standard', type: 'Response', properties: { outcome: 'Standard Approved', keyChange: 'Preserves defense outside limits; 60-day notice' } },
  { id: 'RESP_FL_AMENDATORY', label: 'Florida Amendatory Endorsement FL-01-24 Standard', type: 'Response', properties: { outcome: 'Standard Approved', keyChange: '120-day notice & 18pt bold hurricane warning' } }
];

export const INITIAL_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  // Authority ENFORCES State Law
  { id: 'e1', source: 'STATE_CA', target: 'AUTH_CDI', type: 'REGULATES' },
  { id: 'e2', source: 'AUTH_CDI', target: 'REG_10CCR2644_9', type: 'ENFORCES' },
  { id: 'e3', source: 'AUTH_CDI', target: 'REG_CAL_678_5', type: 'ENFORCES' },

  { id: 'e4', source: 'STATE_NY', target: 'AUTH_NYDFS', type: 'REGULATES' },
  { id: 'e5', source: 'AUTH_NYDFS', target: 'REG_NY_23NYCRR500', type: 'ENFORCES' },
  { id: 'e6', source: 'AUTH_NYDFS', target: 'REG_NY_CL2021_01', type: 'ENFORCES' },
  { id: 'e7', source: 'AUTH_NYDFS', target: 'REG_NY_3426', type: 'ENFORCES' },

  { id: 'e8', source: 'STATE_TX', target: 'AUTH_TDI', type: 'REGULATES' },
  { id: 'e9', source: 'AUTH_TDI', target: 'REG_TX_542_055', type: 'ENFORCES' },
  { id: 'e10', source: 'AUTH_TDI', target: 'REG_TX_542_056', type: 'ENFORCES' },
  { id: 'e11', source: 'AUTH_TDI', target: 'REG_TX_542_060', type: 'ENFORCES' },

  { id: 'e12', source: 'STATE_IL', target: 'AUTH_IDOI', type: 'REGULATES' },
  { id: 'e13', source: 'AUTH_IDOI', target: 'REG_IL_ADMIN_919', type: 'ENFORCES' },
  { id: 'e14', source: 'AUTH_IDOI', target: 'REG_IL_143_17A', type: 'ENFORCES' },

  { id: 'e15', source: 'STATE_FL', target: 'AUTH_FLOIR', type: 'REGULATES' },
  { id: 'e16', source: 'AUTH_FLOIR', target: 'REG_FL_627_4133', type: 'ENFORCES' },
  { id: 'e17', source: 'AUTH_FLOIR', target: 'REG_FL_627_701', type: 'ENFORCES' },

  { id: 'e18', source: 'STATE_NAIC', target: 'AUTH_NAIC', type: 'REGULATES' },
  { id: 'e19', source: 'AUTH_NAIC', target: 'REG_NAIC_880', type: 'ENFORCES' },

  // Regulation APPLIES_TO Product
  { id: 'e20', source: 'REG_10CCR2644_9', target: 'PROD_PROP', type: 'APPLIES_TO' },
  { id: 'e21', source: 'REG_CAL_678_5', target: 'PROD_PROP', type: 'APPLIES_TO' },
  { id: 'e22', source: 'REG_NY_CL2021_01', target: 'PROD_CYBER', type: 'APPLIES_TO' },
  { id: 'e23', source: 'REG_TX_542_055', target: 'PROD_CGL', type: 'APPLIES_TO' },
  { id: 'e24', source: 'REG_TX_542_056', target: 'PROD_CGL', type: 'APPLIES_TO' },
  { id: 'e25', source: 'REG_IL_ADMIN_919', target: 'PROD_AUTO', type: 'APPLIES_TO' },
  { id: 'e26', source: 'REG_IL_143_17A', target: 'PROD_AUTO', type: 'APPLIES_TO' },
  { id: 'e27', source: 'REG_FL_627_4133', target: 'PROD_PROP', type: 'APPLIES_TO' },
  { id: 'e28', source: 'REG_FL_627_701', target: 'PROD_PROP', type: 'APPLIES_TO' },
  { id: 'e29', source: 'REG_NAIC_880', target: 'PROD_PROP', type: 'APPLIES_TO' },

  // Policy CONTAINS_CLAUSE
  { id: 'e30', source: 'PROD_PROP', target: 'CLAUSE_WF_SCORE', type: 'CONTAINS_CLAUSE' },
  { id: 'e31', source: 'PROD_CYBER', target: 'CLAUSE_CY_WAR', type: 'CONTAINS_CLAUSE' },
  { id: 'e32', source: 'PROD_CGL', target: 'CLAUSE_CGL_PROOF', type: 'CONTAINS_CLAUSE' },
  { id: 'e33', source: 'PROD_AUTO', target: 'CLAUSE_IL_DEF_EROSION', type: 'CONTAINS_CLAUSE' },
  { id: 'e34', source: 'PROD_PROP', target: 'CLAUSE_FL_HURR_DED', type: 'CONTAINS_CLAUSE' },
  { id: 'e35', source: 'PROD_PROP', target: 'CLAUSE_GENERIC_30D', type: 'CONTAINS_CLAUSE' },

  // Objection CHALLENGES Clause & CITES Regulation
  { id: 'e36', source: 'OBJ_CA_WF', target: 'CLAUSE_WF_SCORE', type: 'CHALLENGES' },
  { id: 'e37', source: 'OBJ_CA_WF', target: 'REG_10CCR2644_9', type: 'CITES' },
  { id: 'e38', source: 'OBJ_CA_WF', target: 'REG_CAL_678_5', type: 'CITES' },

  { id: 'e39', source: 'OBJ_NY_CY', target: 'CLAUSE_CY_WAR', type: 'CHALLENGES' },
  { id: 'e40', source: 'OBJ_NY_CY', target: 'REG_NY_CL2021_01', type: 'CITES' },
  { id: 'e41', source: 'OBJ_NY_CY', target: 'REG_NY_3426', type: 'CITES' },

  { id: 'e42', source: 'OBJ_TX_CGL', target: 'CLAUSE_CGL_PROOF', type: 'CHALLENGES' },
  { id: 'e43', source: 'OBJ_TX_CGL', target: 'REG_TX_542_055', type: 'CITES' },
  { id: 'e44', source: 'OBJ_TX_CGL', target: 'REG_TX_542_056', type: 'CITES' },

  { id: 'e45', source: 'OBJ_IL_AUTO', target: 'CLAUSE_IL_DEF_EROSION', type: 'CHALLENGES' },
  { id: 'e46', source: 'OBJ_IL_AUTO', target: 'REG_IL_ADMIN_919', type: 'CITES' },
  { id: 'e47', source: 'OBJ_IL_AUTO', target: 'REG_IL_143_17A', type: 'CITES' },

  { id: 'e48', source: 'OBJ_FL_PROP', target: 'CLAUSE_FL_HURR_DED', type: 'CHALLENGES' },
  { id: 'e49', source: 'OBJ_FL_PROP', target: 'CLAUSE_GENERIC_30D', type: 'CHALLENGES' },
  { id: 'e50', source: 'OBJ_FL_PROP', target: 'REG_FL_627_4133', type: 'CITES' },
  { id: 'e51', source: 'OBJ_FL_PROP', target: 'REG_FL_627_701', type: 'CITES' },

  // Objection RESOLVED_BY Response
  { id: 'e52', source: 'OBJ_CA_WF', target: 'RESP_CA_APPROVED', type: 'RESOLVED_BY' },
  { id: 'e53', source: 'OBJ_NY_CY', target: 'RESP_NY_APPROVED', type: 'RESOLVED_BY' },
  { id: 'e54', source: 'OBJ_TX_CGL', target: 'RESP_TX_AMENDATORY', type: 'RESOLVED_BY' },
  { id: 'e55', source: 'OBJ_IL_AUTO', target: 'RESP_IL_AMENDATORY', type: 'RESOLVED_BY' },
  { id: 'e56', source: 'OBJ_FL_PROP', target: 'RESP_FL_AMENDATORY', type: 'RESOLVED_BY' }
];
