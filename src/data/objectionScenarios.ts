import { USState, InsuranceProduct } from '../types/regulatory';

export interface ObjectionScenario {
  id: string;
  title: string;
  state: USState;
  product: InsuranceProduct;
  filingNumber: string;
  regulatoryAuthority: string;
  examinerName: string;
  dateReceived: string;
  responseDeadline: string;
  severity: 'Critical / Disapproval Risk' | 'Moderate / Amendment Required' | 'Informational / Clarification';
  rawObjectionText: string;
  submittedPolicyText: string;
  keyIssues: string[];
}

export const OBJECTION_SCENARIOS: ObjectionScenario[] = [
  {
    id: 'SCENARIO-CA-WILDFIRE-01',
    title: 'California CDI: Commercial Property Wildfire Score & Mandatory Mitigation Credits',
    state: 'CA',
    product: 'Commercial Property',
    filingNumber: 'SERFF CA-2024-04921',
    regulatoryAuthority: 'California Department of Insurance (CDI) - Rate Regulation Branch',
    examinerName: 'E. Vasquez, Senior Rate Analyst',
    dateReceived: '2024-04-12',
    responseDeadline: '2024-05-12',
    severity: 'Critical / Disapproval Risk',
    keyIssues: [
      'Failure to include mandatory rate credits for IBHS Wildfire Prepared Commercial standards under 10 CCR § 2644.9',
      'Proprietary scoring algorithm lacks required consumer disclosure and 30-day appeal mechanism',
      'Common policy condition specifies 30-day non-renewal notice instead of statutory post-emergency moratorium protections (Cal. Ins. Code § 678.5)'
    ],
    rawObjectionText: `STATE OF CALIFORNIA DEPARTMENT OF INSURANCE
RATE REGULATION BRANCH - SERFF FILING OBJECTION NOTICE
Filing Company: Pacific Commercial Insurance Underwriters
SERFF Tracking Number: CA-2024-04921
Line of Business: 05.0 Commercial Multi-Peril / Commercial Property
Date: April 12, 2024
Examiner: E. Vasquez, Rate Analyst

RE: OBJECTION LETTER REGARDING COMMERCIAL PROPERTY WILDFIRE RATING ENDORSEMENT CP-WF-01

Dear Filing Representative:
The California Department of Insurance has reviewed your proposed rate and rule filing for commercial property insurance. We have identified substantial non-compliance with California insurance statutes and administrative regulations:

1. FAILURE TO INCORPORATE MANDATORY MITIGATION DISCOUNTS (10 CCR § 2644.9(a)):
Your proposed Endorsement CP-WF-01 imposes up to a 35% surcharge on commercial properties in designated brush fire hazard zones based upon a proprietary vegetation score. However, your filing completely omits the mandatory rate credits required under 10 CCR § 2644.9 for policyholders who undertake building-hardening (Class A roof, ember-resistant vents, non-combustible siding) and defensible space clearing conforming to PRC 4291 or IBHS Wildfire Prepared Commercial standards. Rates that fail to reflect demonstrable loss mitigation are unfairly discriminatory under California Insurance Code § 1861.05.

2. ABSENCE OF RISK SCORE DISCLOSURE AND APPEAL PROCEDURE (10 CCR § 2644.9(d)):
The filing explicitly states that the underwriter's score determination is "final and not subject to insured contestation." This is in direct violation of 10 CCR § 2644.9(d), which mandates that every insurer utilizing wildfire scoring must provide policyholders their score, the underlying contributing factors, and a formal 30-day appeal process to submit proof of structural mitigation.

3. CONFLICTING NON-RENEWAL PROVISIONS (Cal. Ins. Code § 678.5):
Your Common Policy Conditions reflect a generic 30-day non-renewal clause. Please amend the filing to certify that the carrier will strictly adhere to the mandatory one-year non-renewal moratorium enacted under Cal. Ins. Code § 678.5 for commercial properties within or adjacent to Governor-declared wildfire emergency disaster areas.

REQUIRED ACTION:
Submit an amended filing, revised rating rules, and endorsement wording resolving all three objections within 30 days of this notice. Failure to respond adequately will result in formal disapproval of filing CA-2024-04921.`,
    submittedPolicyText: `CARRIER COMMERCIAL PROPERTY POLICY FORM CP-2024 (SUBMITTED DRAFT)
Perils Insured Against - Endorsement CP-WF-01:
"Coverage for loss caused by wildfire or brush fire shall be subject to carrier proprietary hazard score Tier 1 through Tier 5. Surcharges up to 35% shall be levied based upon satellite vegetation density. Underwriter determination of score shall be final and not subject to insured contestation."
Common Policy Conditions - Section A (Cancellation / Non-Renewal):
"The company may cancel or non-renew this policy by mailing written notice to the first Named Insured at least 30 days prior to the effective date."`
  },
  {
    id: 'SCENARIO-NY-CYBER-02',
    title: 'New York DFS: Cyber Policy Hostile Acts & War Exclusion Overbreadth',
    state: 'NY',
    product: 'Cyber Risk & Tech E&O',
    filingNumber: 'SERFF NY-2024-11890',
    regulatoryAuthority: 'New York Department of Financial Services (DFS) - Property Bureau',
    examinerName: 'C. Henderson, Supervising Examiner',
    dateReceived: '2024-03-20',
    responseDeadline: '2024-04-19',
    severity: 'Critical / Disapproval Risk',
    keyIssues: [
      'Overly broad war exclusion permitting unilateral insurer attribution of cyber attacks to nation-states violates NY DFS Circular Letter No. 1 (2021)',
      'Lack of objective evidentiary standard (e.g. US Government / CISA attribution declaration)',
      '60-day cancellation provision conflicts with New York Insurance Law § 3426 notice standards'
    ],
    rawObjectionText: `NEW YORK STATE DEPARTMENT OF FINANCIAL SERVICES
ONE STATE STREET, NEW YORK, NY 10004
PROPERTY & CASUALTY BUREAU - FORM FILING OBJECTION
Filing Entity: Metro Cyber Specialty Indemnity Company
SERFF Tracking Number: NY-2024-11890
Line of Business: 17.0 Other Liability - Cyber Enterprise Risk
Date: March 20, 2024

SUBJECT: OBJECTION TO WAR AND HOSTILE ACTS EXCLUSION SECTION III.8

Dear Underwriting Counsel:
The Department has completed its initial review of Form CY-2024-ENTERPRISE. The filing cannot be approved in its present form based upon the following regulatory defects:

1. UNREASONABLY BROAD CYBER WAR EXCLUSION (NY DFS Circular Letter No. 1 (2021) Section 4):
Section III, Paragraph 8(b) of your submitted policy form seeks to exclude any cyber incident or electronic intrusion that is "deemed by the insurer, in its sole discretion, to have originated from, or been supported, aided, or conducted by a foreign government, sovereign state, military agency, or state-sponsored advanced persistent threat (APT) actor."
This language directly breaches DFS Circular Letter No. 1 (2021). The Department explicitly instructed cyber insurers that war exclusions must not be structured to allow unilateral insurer attribution of cyber activity. Standard commercial policyholders cannot reasonably anticipate coverage denial based upon informal insurer assertions of foreign nation-state nexus.

2. REQUIREMENT FOR OBJECTIVE EVIDENTIARY ATTRIBUTION STANDARD:
Any exclusion of state-sponsored cyber warfare must incorporate an objective attribution standard. In previous approved filings (e.g., SERFF NY-2022-5412), the Department accepted exclusions conditioned upon formal attribution published by the US Government (e.g., Office of the Director of National Intelligence or CISA) and restricted to cyber attacks occurring in concert with kinetic military actions.

3. NY INSURANCE LAW § 3426 COMPLIANCE:
The cancellation section of your general conditions references standard 30-day termination. Please certify that NY policies are governed by NY Ins. Law § 3426, requiring 60 to 120 days advance notice of non-renewal with specific statutory reasons stated.

Please provide a formal written response and a revised endorsement within 30 days.`,
    submittedPolicyText: `COMMERCIAL ENTERPRISE CYBER POLICY FORM CY-2024-ENTERPRISE
SECTION III - EXCLUSIONS
8. Hostile Acts & Sovereign Cyber Warfare:
"This policy does not cover any loss, damage, liability, cost, or expense directly or indirectly caused by, contributed to by, or arising out of:
(a) War, hostile or warlike action in time of peace or war;
(b) Any cyber attack, malware release, or electronic intrusion that is deemed by the insurer, in its sole discretion, to have originated from, or been supported, aided, or conducted by a foreign government, sovereign state, military agency, or state-sponsored advanced persistent threat (APT) actor."`
  },
  {
    id: 'SCENARIO-TX-CGL-03',
    title: 'Texas TDI: Commercial Liability Proof of Loss & Prompt Payment Conflicting Clause',
    state: 'TX',
    product: 'General Liability (CGL)',
    filingNumber: 'SERFF TX-2024-08241',
    regulatoryAuthority: 'Texas Department of Insurance (TDI) - Commercial P&C Division',
    examinerName: 'M. Gutierrez, Regulatory Specialist',
    dateReceived: '2024-05-02',
    responseDeadline: '2024-06-01',
    severity: 'Moderate / Amendment Required',
    keyIssues: [
      'Proof of loss requirement conflicts with Texas Insurance Code § 542.055 and § 542.056 prompt payment timelines',
      'Omission of mandatory 15-day statutory acknowledgment and 15-business-day acceptance/rejection deadlines',
      'Failure to acknowledge 18% statutory interest damages under Tex. Ins. Code § 542.060'
    ],
    rawObjectionText: `TEXAS DEPARTMENT OF INSURANCE
COMMERCIAL PROPERTY & CASUALTY DIVISION - AUSTIN, TEXAS
SERFF Filing Reference: TX-2024-08241
Company: Lone Star Commercial Casualty Co.
Form: CGL-2024-STD (Commercial General Liability)
Date: May 2, 2024

ATTN: REGULATORY COMPLIANCE DEPARTMENT
RE: DISCREPANCY WITH TEXAS PROMPT PAYMENT STATUTE (TEX. INS. CODE CH. 542)

The Department has reviewed Section IV of your submitted Commercial General Liability Policy Form CGL-2024-STD. We note the following statutory deficiency:

1. CONFLICTING PROOF OF LOSS REQUIREMENT (Tex. Ins. Code §§ 542.055, 542.056):
Section IV, Condition 2 provides that "final proof of loss must be provided within 30 calendar days of demand" and attempts to condition carrier investigation commencement on receipt of executed forms.
Under Texas Insurance Code § 542.055, an insurer must acknowledge the claim, commence investigation, and request all necessary items not later than the 15th calendar day after notice of claim. Furthermore, under § 542.056, the insurer must accept or reject the claim within 15 business days after receiving requested proof items.

2. MANDATORY TEXAS AMENDATORY ENDORSEMENT REQUIRED:
Because national standard CGL forms often contain generic claims handling clauses, Texas requires an amendatory endorsement (e.g. Endorsement CG 01 03 - Texas Changes) confirming that statutory interest under § 542.060 (18% per annum plus attorney's fees) and statutory timelines supersede any contrary policy provisions.

Please submit a Texas Amendatory Endorsement rectifying these provisions.`,
    submittedPolicyText: `FORM CGL-2024-STD (ED. 01/24)
SECTION IV - COMMERCIAL GENERAL LIABILITY CONDITIONS
Condition 2. Duties In The Event Of Occurrence, Offense, Claim Or Suit:
"The insured must see to it that we are notified in writing as soon as practicable of an occurrence. Written notice must contain details of how, when and where the occurrence took place. Final proof of loss must be provided within 30 calendar days of demand. Investigation of the claim shall commence upon receipt of satisfactory executed proof of loss."`
  },
  {
    id: 'SCENARIO-IL-AUTO-04',
    title: 'Illinois DOI: Commercial Auto Defense Costs Inside Limits & Cancellation Notice',
    state: 'IL',
    product: 'Commercial Auto',
    filingNumber: 'SERFF IL-2024-02319',
    regulatoryAuthority: 'Illinois Department of Insurance (IDOI) - P&C Division',
    examinerName: 'R. Kowalski, Regulatory Examiner',
    dateReceived: '2024-04-28',
    responseDeadline: '2024-05-28',
    severity: 'Critical / Disapproval Risk',
    keyIssues: [
      'Inclusion of Defense Costs Inside Limits on primary commercial auto liability violates 50 Ill. Adm. Code 919.80(c)',
      '30-day non-renewal clause violates 215 ILCS 5/143.17a mandatory 60-day notice requirement for commercial P&C',
      'Missing prominent declarations disclosure regarding defense erosion'
    ],
    rawObjectionText: `ILLINOIS DEPARTMENT OF INSURANCE
SPRINGFIELD, ILLINOIS
SERFF TRACKING: IL-2024-02319
Carrier: Midwest Transportation & Commercial Fleet Insurers
Product: Commercial Automobile Fleet Policy
Date: April 28, 2024

OBJECTION NOTICE REGARDING DEFENSE EXPENSE LIMITATION AND CANCELLATION NOTICE

The Department has scrutinized filing IL-2024-02319 and issues the following formal objections:

1. DEFENSE COSTS INSIDE LIMITS RESTRICTION (50 Ill. Adm. Code 919.80(c)):
Endorsement CGL-IL-DEF-01 proposes to include legal defense and claim investigation expenses within the primary liability policy limit. Under Illinois regulatory guidelines, primary commercial automobile liability coverages mandated by financial responsibility laws cannot erode statutory minimum liability limits through defense cost containment. Defense outside limits must be preserved for primary auto liability.

2. MANDATORY 60-DAY NON-RENEWAL AND RATE INCREASE NOTICE (215 ILCS 5/143.17a):
Your submitted policy conditions provide for 30 days notice of cancellation or non-renewal. Illinois statute 215 ILCS 5/143.17a explicitly requires 60 days advance written notice of non-renewal or premium increase exceeding 30% on all commercial automobile and commercial liability contracts.

Carrier must withdraw Endorsement CGL-IL-DEF-01 for primary auto forms and attach Illinois Amendatory Endorsement IL-02-14 certifying 60-day non-renewal notice.`,
    submittedPolicyText: `COMMERCIAL AUTO FLEET FORM CA-2024
Endorsement CGL-IL-DEF-01:
"Payment of defense expenses by the insurer shall reduce the applicable Each Occurrence and General Aggregate Limits of Liability. Upon exhaustion of the Limit of Liability by payment of settlements, judgments, or legal defense costs, our duty to defend terminates."
Cancellation Condition:
"The company may cancel or non-renew this policy by giving 30 days written notice."`
  },
  {
    id: 'SCENARIO-FL-PROP-05',
    title: 'Florida OIR: Commercial Property 120-Day Notice & Hurricane Deductible Disclosures',
    state: 'FL',
    product: 'Commercial Property',
    filingNumber: 'SERFF FL-2024-09923',
    regulatoryAuthority: 'Florida Office of Insurance Regulation (OIR) - Property & Casualty',
    examinerName: 'T. Delancy, Regulatory Specialist',
    dateReceived: '2024-05-10',
    responseDeadline: '2024-06-09',
    severity: 'Critical / Disapproval Risk',
    keyIssues: [
      '30-day commercial property non-renewal clause is unlawful under F.S. § 627.4133(2)(b) requiring 120 days notice',
      'Proposed 10% hurricane deductible omits mandatory 18-point boldface statutory warning under F.S. § 627.701(4)(a)',
      'Omission of statutory alternative dispute resolution and mediation notice under F.S. § 627.7015'
    ],
    rawObjectionText: `FLORIDA OFFICE OF INSURANCE REGULATION
TALLAHASSEE, FLORIDA
SERFF Tracking Number: FL-2024-09923
Carrier: Atlantic Commercial & Coastal Property Syndicate
Subject: Form Filing Review - Commercial Property Form CP-2024 (FL)
Date: May 10, 2024

FORM DISAPPROVAL WARNING AND OBJECTION LETTER

Examiner review of Form CP-2024 reveals two non-negotiable statutory violations under the Florida Insurance Code:

1. 120-DAY NOTICE OF NON-RENEWAL / CANCELLATION MANDATE (F.S. § 627.4133(2)(b)):
Section A of your Common Policy Conditions specifies a 30-day notice of cancellation or non-renewal. Under Florida Statutes § 627.4133(2)(b), insurers writing commercial property coverage in Florida MUST give the first-named insured at least 120 days advance written notice of cancellation or non-renewal. A 30-day notice provision in Florida commercial property is void as a matter of law.

2. HURRICANE DEDUCTIBLE BOLDFACE DISCLOSURE (F.S. § 627.701(4)(a)):
The filing includes an optional 10% hurricane deductible. However, the declarations page and schedule lack the mandatory statutory warning printed in not less than 18-point boldface type: "THIS POLICY CONTAINS A SEPARATE DEDUCTIBLE FOR HURRICANE LOSSES, WHICH MAY RESULT IN HIGH OUT-OF-POCKET EXPENSES TO YOU."

Carrier must file Florida Amendatory Endorsement FL-01-24 incorporating the 120-day notice and 18-pt warning within 30 days.`,
    submittedPolicyText: `COMMERCIAL PROPERTY POLICY FORM CP-2024
Hurricane Deductible Clause:
"For loss or damage caused by the peril of Windstorm during a Hurricane declared by the National Hurricane Center, an optional deductible of 10% of the insured building value shall apply."
Common Policy Conditions:
"Cancellation or Non-Renewal: The company may cancel or non-renew this policy by giving 30 days written notice to the insured."`
  },
  {
    id: 'SCENARIO-NAIC-AI-06',
    title: 'Multi-State NAIC Committee: Algorithmic Underwriting Bias & Model Governance',
    state: 'NAIC',
    product: 'Commercial Property',
    filingNumber: 'SERFF MS-2024-01055',
    regulatoryAuthority: 'NAIC Multi-State Review Working Group / Collaborative Action',
    examinerName: 'Dr. L. Sterling, Model Risk Specialist',
    dateReceived: '2024-05-15',
    responseDeadline: '2024-06-15',
    severity: 'Moderate / Amendment Required',
    keyIssues: [
      'Rating algorithm incorporates unverified external machine learning risk scores without proxy bias testing',
      'Inadequate explainability of adverse underwriting decisions violates NAIC Model Law #880 and 2023 AI Bulletin',
      'Lack of documentation demonstrating actuarial validity and auditable data lineage'
    ],
    rawObjectionText: `NATIONAL ASSOCIATION OF INSURANCE COMMISSIONERS (NAIC)
MULTI-STATE COLLABORATIVE REVIEW TEAM
SERFF Filing Reference: MS-2024-01055
Subject: Underwriting Model Governance & Algorithmic Transparency Inquiry
Date: May 15, 2024

Dear Carrier Governance Committee:
In connection with your multi-state commercial rating filing incorporating automated predictive models, the reviewing state insurance departments submit the following inquiry:

1. COMPLIANCE WITH NAIC MODEL BULLETIN ON AI SYSTEMS IN INSURANCE:
The carrier's actuarial memorandum references an automated "Commercial Catastrophe & Property Vulnerability Score" generated by a third-party AI vendor. Under Section 3 of the NAIC 2023 Model Bulletin on AI, the carrier retains ultimate legal accountability for verifying that external predictive models do not function as proxies for protected characteristics (e.g. redlining or geographic unfair discrimination prohibited under NAIC Model Law #880 § 4(G)).

2. EXPLAINABILITY AND CONSUMER ADVERSE ACTION NOTICES:
Provide documentation detailing the carrier's AI Governance Framework, including:
(a) Methods utilized to test for disparate impact and proxy variables;
(b) Specific adverse reason codes provided to commercial applicants subjected to premium surcharges or underwriting declinations;
(c) Audit logging procedures maintained for regulatory examination.

Failure to provide satisfactory model risk documentation will result in coordinated state suspensions of the rating tool.`,
    submittedPolicyText: `ACTUARIAL RATING MEMORANDUM SECTION 9:
"Underwriting scores are generated via proprietary neural network trained on commercial geospatial data. Due to proprietary trade secret protections, internal algorithmic weights are confidential and cannot be disassembled into individual linear factor discounts."`
  }
];
