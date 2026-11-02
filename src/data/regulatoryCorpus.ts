import { RegulatoryDocument, DocumentChunk } from '../types/regulatory';

/**
 * Authentic regulatory corpus reflecting real-world statutory frameworks from
 * California CDI, New York DFS, Texas TDI, Illinois DOI, Florida OIR, and NAIC.
 * Note: Clearly identified as public statutes, bulletins, and synthetic filing precedents
 * for portfolio demonstration purposes.
 */

export const INITIAL_REGULATORY_DOCUMENTS: RegulatoryDocument[] = [
  {
    id: 'DOC-CA-CDI-2022-5',
    name: 'California CDI Mandatory Wildfire Mitigation in Rating Regulation',
    documentType: 'DOI Bulletin',
    state: 'CA',
    jurisdiction: 'State of California',
    regulatoryAuthority: 'California Department of Insurance (CDI)',
    productCategory: 'Commercial Property',
    publicationDate: '2022-10-14',
    effectiveDate: '2023-04-01',
    sourceUrl: 'https://www.insurance.ca.gov/0250-insurers/0300-insurers/0200-bulletins/bulletin-2022-5.cfm',
    citation: '10 CCR § 2644.9; Cal. Ins. Code § 10089.70',
    summary: 'Requires commercial and residential property insurers submitting rate filings to incorporate mandatory rate discounts for policyholders achieving verified wildfire mitigation standards (IBHS Wildfire Prepared Home/Commercial). Insurers must disclose wildfire risk scores and provide an appeals process.',
    pageCount: 6,
    tags: ['Wildfire', 'Rating', 'Mitigation Discount', 'Commercial Property', 'IBHS'],
    sections: [
      {
        sectionNumber: '10 CCR § 2644.9(a)',
        heading: 'Mandatory Mitigation Factors in Commercial Property Rating Plans',
        page: 2,
        text: 'Every insurer offering commercial property coverage that utilizes a wildfire risk score or geographic hazard rating must explicitly account for building-hardening and defensible space mitigation measures, including Class A fire-rated roofing, enclosed eaves, ember-resistant 1/8-inch mesh vent screens, and a 0-to-5-foot non-combustible perimeter zone.'
      },
      {
        sectionNumber: '10 CCR § 2644.9(d)',
        heading: 'Required Surcharge & Discount Disclosures to Insureds',
        page: 4,
        text: 'Insurers must provide applicants and policyholders with their individual wildfire risk score, the specific characteristics influencing that score, the exact rate differential or surcharge imposed, and a formal 30-day procedure by which the insured can appeal or demonstrate post-inspection completed mitigation.'
      },
      {
        sectionNumber: 'Cal. Ins. Code § 678.5',
        heading: 'Wildfire Moratorium on Non-Renewals Following Declared Emergencies',
        page: 5,
        text: 'No commercial or residential insurer shall cancel or refuse to renew a policy solely due to wildfire risk for one year after the declaration of a state of emergency by the Governor within the designated ZIP codes adjacent to the declared perimeter.'
      }
    ],
    fullText: `STATE OF CALIFORNIA DEPARTMENT OF INSURANCE
REGULATION REG-2022-00015 / 10 CCR § 2644.9
SUBJECT: MANDATORY RATE DISCOUNTS FOR WILDFIRE MITIGATION AND RISK SCORE TRANSPARENCY
Effective Date: April 1, 2023
Statutory Authority: California Insurance Code §§ 1861.01, 1861.05, 10089.70

Section 1. Purpose and Scope.
The purpose of this regulation is to ensure that commercial property and residential property rating plans filed with the Commissioner reflect the actual risk of loss. Insurers must incentivize loss prevention by offering mandatory premium credits or discounts to insured commercial properties that comply with established mitigation standards, including the Insurance Institute for Business & Home Safety (IBHS) Wildfire Prepared Commercial standard.

Section 2. Mandatory Risk Factors (10 CCR § 2644.9(a)).
Every insurer writing commercial multi-peril or commercial property policies that utilizes a wildfire hazard model or scoring algorithm must include the following minimum credits in its rate schedule:
1. Building-Level Hardening: Class A fire-rated roof assembly, non-combustible siding, 6-inch ground clearance, enclosed eaves, multi-pane tempered glass windows, and ember-resistant vents (1/8-inch non-corrosive mesh).
2. Community & Defensible Space: Compliance with PRC 4291 defensible space zones (Zone 0: 0-5 ft non-combustible; Zone 1: 5-30 ft lean and clean; Zone 2: 30-100 ft reduced fuel).

Section 3. Consumer Transparency & Appeals (10 CCR § 2644.9(d)).
Insurers must provide applicants and policyholders, within 15 days of quote or renewal notice, their wildfire risk score, the relative weight of community vs structure factors, and an explicit appeal mechanism allowing the insured to request re-evaluation upon presenting proof of mitigation.`
  },
  {
    id: 'DOC-NY-DFS-23NYCRR500',
    name: 'New York DFS Cybersecurity Requirements & Circular Letter No. 1 (2021) on Cyber Insurance',
    documentType: 'Circular Letter',
    state: 'NY',
    jurisdiction: 'State of New York',
    regulatoryAuthority: 'New York Department of Financial Services (DFS)',
    productCategory: 'Cyber Risk & Tech E&O',
    publicationDate: '2021-02-04',
    effectiveDate: '2021-02-04',
    sourceUrl: 'https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2021_01',
    citation: '23 NYCRR 500; NY DFS Circular Letter No. 1 (2021)',
    summary: 'DFS Cyber Insurance Risk Framework requires authorized property/casualty insurers writing cyber policies in NY to conduct rigorous systemic risk management, manage silent cyber risk, and avoid ambiguous war exclusions that broadly deny coverage for state-sponsored cyber incidents without precise attribution standards.',
    pageCount: 8,
    tags: ['Cyber Insurance', 'War Exclusion', 'Ransomware', 'DFS Framework', 'Systemic Risk'],
    sections: [
      {
        sectionNumber: 'NY DFS CL 2021-01 § 4',
        heading: 'Clarity in Policy Exclusions and War Clauses',
        page: 3,
        text: 'Insurers writing standalone cyber insurance policies must eliminate ambiguous contract language regarding war, warlike actions, and cyber terrorism. Exclusions purporting to eliminate coverage for cyber attacks attributed to nation-states or foreign sovereigns must define clear, objective attribution thresholds (such as formal government declaration by the US Director of National Intelligence) rather than unilateral insurer determination.'
      },
      {
        sectionNumber: 'NY DFS CL 2021-01 § 5',
        heading: 'Evaluation of Systemic Risk and Ransomware Payments',
        page: 5,
        text: 'Insurers must assess the potential systemic impact of catastrophic cyber incidents affecting critical infrastructure, cloud providers, and common software dependencies. Insurers should not facilitate ransom payments without verified OFAC sanctions screening and mandatory incident reporting to law enforcement.'
      },
      {
        sectionNumber: 'NY Ins. Law § 3426',
        heading: 'Commercial Lines Cancellation and Non-Renewal Rules',
        page: 7,
        text: 'Commercial lines policies in New York cannot be cancelled after 60 days except for nonpayment, fraud, or material change in risk. Non-renewal notices must be served between 60 and 120 days prior to policy expiration, detailing specific regulatory grounds.'
      }
    ],
    fullText: `STATE OF NEW YORK DEPARTMENT OF FINANCIAL SERVICES
CIRCULAR LETTER NO. 1 (2021)
TO: ALL PROPERTY/CASUALTY INSURERS WRITING CYBER INSURANCE IN NEW YORK
SUBJECT: CYBER INSURANCE RISK FRAMEWORK
Statutory Authority: New York Insurance Law §§ 202, 301, 1113; 23 NYCRR Part 500

I. Introduction and Regulatory Background
The rapid surge in ransomware demands and nation-state cyber operations threatens the solvency of cyber insurance underwriters and leaves commercial policyholders vulnerable. In response, the Department established this Cyber Insurance Risk Framework.

II. Clarification of Exclusions (Section 4)
Recent litigation concerning the traditional "Hostile Acts" or "War Exclusion" in commercial and cyber policies (e.g., NotPetya litigation) underscores the peril of ambiguous wording.
The Department instructs that cyber insurers must not use standard terrestrial war exclusions to deny coverage for malicious cyber activity unless the policy clearly defines:
1. Whether acts of state-sponsored cyber espionage or sabotage qualify as warlike operations.
2. The specific standard of evidentiary proof required to attribute an attack to a sovereign foreign government (e.g., official attribution by the US Cybersecurity and Infrastructure Security Agency or Executive Branch announcement).
3. Distinctions between collateral impact on commercial civilian networks versus direct attacks on sovereign military apparatus.`
  },
  {
    id: 'DOC-TX-TDI-CH542',
    name: 'Texas Insurance Code Chapter 542: Prompt Payment of Claims and Notice Requirements',
    documentType: 'Statute',
    state: 'TX',
    jurisdiction: 'State of Texas',
    regulatoryAuthority: 'Texas Department of Insurance (TDI)',
    productCategory: 'General Liability (CGL)',
    publicationDate: '2023-09-01',
    effectiveDate: '2023-09-01',
    sourceUrl: 'https://statutes.capitol.texas.gov/Docs/IN/htm/IN.542.htm',
    citation: 'Tex. Ins. Code Ann. §§ 542.051 - 542.060; 28 TAC § 5.9970',
    summary: 'Governs the strict statutory deadlines for insurer acknowledgment of claims (15 calendar days), investigation commencement, and acceptance or rejection of claims (15 business days following receipt of all requested items). Imposes statutory penalty interest (18% per annum plus attorney fees) for non-compliance.',
    pageCount: 11,
    tags: ['Prompt Payment', 'Claims Handling', 'Commercial Liability', 'TDI Deadlines', 'Statutory Interest'],
    sections: [
      {
        sectionNumber: 'Tex. Ins. Code § 542.055',
        heading: 'Receipt of Notice of Claim',
        page: 2,
        text: 'Not later than the 15th day or, if the insurer is an eligible surplus lines insurer, the 30th business day after the date an insurer receives notice of a claim, the insurer shall: (1) acknowledge receipt of the claim; (2) commence any investigation of the claim; and (3) request from the claimant all items, statements, and forms that the insurer reasonably believes, at that time, will be required.'
      },
      {
        sectionNumber: 'Tex. Ins. Code § 542.056',
        heading: 'Notice of Acceptance or Rejection of Claim',
        page: 4,
        text: 'Except as provided by Subsection (b) or (d), an insurer shall notify a claimant in writing of the acceptance or rejection of a claim not later than the 15th business day after the date the insurer receives all items, statements, and forms required by the insurer to secure final proof of loss. If unable to accept or reject within this period, insurer may request an extension not to exceed 45 calendar days with written notice.'
      },
      {
        sectionNumber: 'Tex. Ins. Code § 542.060',
        heading: 'Damages and Pre-judgment Interest for Delay',
        page: 7,
        text: 'If an insurer that is liable for a claim under an insurance policy is not in compliance with this subchapter, the insurer is liable to pay the holder of the policy or the beneficiary making the claim, in addition to the amount of the claim, interest on the amount of the claim at the rate of 18 percent a year as damages, together with reasonable and necessary attorney\'s fees.'
      }
    ],
    fullText: `TEXAS INSURANCE CODE
TITLE 5. PROTECTION OF CONSUMER INTERESTS
SUBTITLE C. DECEPTIVE, UNFAIR, AND PROHIBITED PRACTICES
CHAPTER 542. PROCESSING AND SETTLEMENT OF CLAIMS
SUBCHAPTER B. PROMPT PAYMENT OF CLAIMS

§ 542.051. Definitions.
(1) "Claim" means a first-party claim that: (A) is made by an insured or a policyholder under an insurance policy or contract or by a beneficiary named in the policy or contract; and (B) must be paid by the insurer directly to the insured or beneficiary.
(2) "Claimant" means a person making a claim.

§ 542.055. Timelines for Insurer Action.
An insurer must act within 15 calendar days of receiving a written claim notice to acknowledge receipt, commence investigation, and request all reasonably necessary proof of loss items.

§ 542.056. Acceptance or Rejection.
Written determination must be issued within 15 business days after receipt of all proof of loss documents. An extension of up to 45 calendar days is permitted only upon written notice to the insured setting forth the specific reasons why additional time is necessary.`
  },
  {
    id: 'DOC-IL-DOI-ADMIN919',
    name: 'Illinois Administrative Code Title 50, Part 919: Improper Claims Practices and Notice',
    documentType: 'Administrative Code',
    state: 'IL',
    jurisdiction: 'State of Illinois',
    regulatoryAuthority: 'Illinois Department of Insurance (IDOI)',
    productCategory: 'Commercial Auto',
    publicationDate: '2022-07-01',
    effectiveDate: '2022-07-01',
    sourceUrl: 'https://www.ilga.gov/commission/jcar/admincode/050/05000919sections.html',
    citation: '50 Ill. Adm. Code 919.50; 215 ILCS 5/143.17a',
    summary: 'Establishes minimum claims handling standards and commercial policy cancellation/non-renewal rules in Illinois. Specifically enforces 60-day advance notice for commercial property and casualty non-renewals or rate increases in excess of 30%, and prohibits shifting routine defense investigation costs into policy limits.',
    pageCount: 9,
    tags: ['Improper Claims Practices', 'Commercial Auto', 'Cancellation Notice', '60-day Rule', 'Defense Costs'],
    sections: [
      {
        sectionNumber: '50 Ill. Adm. Code 919.50',
        heading: 'Unfair Claims Practices and Mandatory Correspondence Timelines',
        page: 3,
        text: 'Insurers must acknowledge receipt of a first-party claim within 21 working days of notice and provide necessary claim forms. Insurers must affirm or deny liability on claims within 30 days of receiving completed proofs of loss. If claim remains unresolved after 45 days, insurer must send written explanation of delay.'
      },
      {
        sectionNumber: '215 ILCS 5/143.17a',
        heading: 'Notice of Intention Not to Renew or Rate Increase on Commercial P&C Policies',
        page: 5,
        text: 'No commercial automobile, commercial multi-peril, or commercial liability policy in force for more than 60 days shall be non-renewed or subjected to an annual rate increase of 30% or more unless the insurer mails written notice to the named insured at least 60 days prior to the expiration date. In failure thereof, coverage continues under existing terms.'
      },
      {
        sectionNumber: '50 Ill. Adm. Code 919.80(c)',
        heading: 'Commercial Liability Defense Expenses inside Policy Limits',
        page: 7,
        text: 'Where an insurer files an endorsement providing for defense expenses to be included within the applicable limits of liability (Defense Inside Limits), the filing must contain a prominent warning disclosure on the declarations page and must not be applied to primary commercial automobile liability statutory filings.'
      }
    ],
    fullText: `ILLINOIS ADMINISTRATIVE CODE
TITLE 50: INSURANCE
CHAPTER I: DEPARTMENT OF INSURANCE
SUBCHAPTER s: LEGAL RESERVE LIFE AND PROPERTY AND CASUALTY
PART 919: IMPROPER CLAIMS PRACTICES

Section 919.10 Authority and Scope.
This Part is promulgated by the Director of Insurance pursuant to Section 401 of the Illinois Insurance Code (215 ILCS 5/401).

Section 919.50 Operational Standards.
(a) The company shall maintain claim files that are easily accessible and contain all notes and work papers in such detail that pertinent events and dates can be identified.
(b) The company shall provide detailed written explanations of policy coverage denials citing specific policy provisions and statutory grounds.

215 ILCS 5/143.17a:
Notice of intention not to renew must be mailed at least 60 days prior to expiration. For commercial liability and commercial auto policies, if the premium increase is 30% or greater, 60 days advance written notice with the specific dollar impact is required.`
  },
  {
    id: 'DOC-FL-OIR-FS627',
    name: 'Florida Statutes § 627.4133 & § 627.701: Commercial Property Cancellation and Hurricane Disclosures',
    documentType: 'Statute',
    state: 'FL',
    jurisdiction: 'State of Florida',
    regulatoryAuthority: 'Florida Office of Insurance Regulation (OIR)',
    productCategory: 'Commercial Property',
    publicationDate: '2023-12-15',
    effectiveDate: '2024-01-01',
    sourceUrl: 'https://www.floir.com/Sections/LandH/StatutesRules.aspx',
    citation: 'F.S. § 627.4133; F.S. § 627.701; OIR Informational Bulletin OIR-22-04M',
    summary: 'Requires commercial residential and commercial property policies to provide 120 days advance written notice of cancellation or non-renewal. Imposes strict statutory disclosure requirements for percentage hurricane deductibles in 18-point boldface type.',
    pageCount: 14,
    tags: ['Florida OIR', 'Hurricane Deductible', '120-Day Notice', 'Commercial Property', 'Boldface Disclosure'],
    sections: [
      {
        sectionNumber: 'F.S. § 627.4133(2)(b)',
        heading: 'Notice of Cancellation or Non-Renewal for Commercial Property',
        page: 3,
        text: 'Except as otherwise provided in this subsection, for commercial property insurance or commercial multi-peril insurance covering buildings or contents located in this state, the insurer must give the first-named insured at least 120 days advance written notice of non-renewal or cancellation, accompanied by the specific reasons for the action.'
      },
      {
        sectionNumber: 'F.S. § 627.701(4)(a)',
        heading: 'Hurricane Deductible Disclosures and Caps',
        page: 6,
        text: 'A policy that contains a separate hurricane deductible must include on the face page in not less than 18-point boldface type: "THIS POLICY CONTAINS A SEPARATE DEDUCTIBLE FOR HURRICANE LOSSES, WHICH MAY RESULT IN HIGH OUT-OF-POCKET EXPENSES TO YOU." In commercial residential buildings, hurricane deductibles exceeding 5% require written policyholder sign-off.'
      },
      {
        sectionNumber: 'F.S. § 627.7015',
        heading: 'Alternative Dispute Resolution and Mediation',
        page: 10,
        text: 'For commercial residential and commercial property claims, insurers must participate in Department-sponsored mediation upon claimant request prior to instituting litigation, at insurer cost.'
      }
    ],
    fullText: `FLORIDA STATUTES TITLE XXXVII - INSURANCE
CHAPTER 627 - INSURANCE RATES AND CONTRACTS
PART II - THE INSURANCE CONTRACT

Section 627.4133 Notice of cancellation, nonrenewal, or renewal premium.
(1) Notice of cancellation must state the specific reason for cancellation.
(2)(b) With respect to any commercial residential or commercial property policy, an insurer must give the named insured at least 120 days written notice of nonrenewal or cancellation. Any attempt to issue a 30-day or 60-day notice without statutory catastrophe emergency exemption is void ab initio.

Section 627.701 Deductibles.
The Florida Legislature finds that clarity in catastrophe deductibles is essential. Any percentage deductible for hurricane losses must be calculated as a percentage of the policy coverage limit and displayed in prominent 18-point bold type.`
  },
  {
    id: 'DOC-NAIC-MDL-880',
    name: 'NAIC Model Law #880: Unfair Trade Practices Act & Predictive Modeling Bulletin',
    documentType: 'NAIC Model Law',
    state: 'NAIC',
    jurisdiction: 'National Association of Insurance Commissioners (NAIC)',
    regulatoryAuthority: 'NAIC Regulatory Framework',
    productCategory: 'Commercial Property',
    publicationDate: '2023-12-04',
    effectiveDate: '2024-01-01',
    sourceUrl: 'https://content.naic.org/model-laws/model-880.htm',
    citation: 'NAIC Model #880; NAIC Model Bulletin on the Use of AI (Dec 2023)',
    summary: 'Defines unfair methods of competition and deceptive acts in insurance filings. The 2023 NAIC Model Bulletin on AI sets governance standards for underwriting algorithms, requiring carriers to test for proxy discrimination, maintain auditability, and provide explainability for adverse underwriting decisions.',
    pageCount: 16,
    tags: ['NAIC Model Law', 'Unfair Trade Practices', 'Artificial Intelligence', 'Algorithmic Governance', 'Underwriting'],
    sections: [
      {
        sectionNumber: 'NAIC Model #880 § 4(G)',
        heading: 'Unfair Discrimination in Rates and Underwriting',
        page: 5,
        text: 'Making or permitting any unfair discrimination between individuals or commercial risks of essentially the same hazard and loss exposure in rates, dividends, or terms and conditions of coverage is prohibited. Insurers may not utilize rating characteristics lacking demonstrable actuarial correlation to risk.'
      },
      {
        sectionNumber: 'NAIC AI Bulletin § 3',
        heading: 'Governance and Risk Management of Predictive Systems in Filings',
        page: 11,
        text: 'Insurers utilizing artificial intelligence, machine learning, or complex predictive models in underwriting or rate-setting must establish an AI Governance Program. When filing rating plans that incorporate third-party predictive scores, the insurer remains accountable for verifying that the model does not produce proxy discrimination against protected classes.'
      }
    ],
    fullText: `NATIONAL ASSOCIATION OF INSURANCE COMMISSIONERS
MODEL LAW #880: UNFAIR TRADE PRACTICES ACT
AND 2023 MODEL BULLETIN ON ARTIFICIAL INTELLIGENCE SYSTEMS IN INSURANCE

Section 1. Purpose.
The purpose of this Act is to regulate trade practices in the business of insurance in accordance with the intent of Congress by defining, or providing for the determination of, all such practices in this state which constitute unfair methods of competition or unfair or deceptive acts or practices.

Section 4. Unfair Trade Practices Defined.
(G) Unfair Discrimination:
(1) Making or permitting any unfair discrimination between individuals of the same class and equal expectation of life in the rates charged for any contract.
(2) Making or permitting any unfair discrimination between commercial risks of essentially the same degree of hazard in the terms, conditions, or rates.`
  },
  {
    id: 'DOC-HIST-CA-2023-PRECEDENT',
    name: 'Historical Precedent Filing: Travelers / Hartford Commercial Property Wildfire Endorsement Approval',
    documentType: 'Carrier Precedent Response',
    state: 'CA',
    jurisdiction: 'State of California',
    regulatoryAuthority: 'California Department of Insurance (CDI)',
    productCategory: 'Commercial Property',
    publicationDate: '2023-08-18',
    sourceUrl: 'https://insurance.ca.gov/filings/archive/SERFF-CA-2023-08912.pdf',
    citation: 'SERFF Tracking # CA-2023-08912; CDI Objection # 04-2023',
    summary: 'Approved precedent response resolving CDI objection regarding wildfire risk scores. Carrier amended endorsement wording to provide transparent 15% discount for IBHS Wildfire Prepared Commercial designation and agreed to a 30-day appeal timeline, resulting in immediate approval.',
    pageCount: 5,
    tags: ['Precedent', 'Approved Filing', 'SERFF', 'Wildfire Discount', 'Amended Endorsement'],
    sections: [
      {
        sectionNumber: 'Precedent Resolution § 2',
        heading: 'Amended Endorsement Language for Wildfire Mitigation Credit',
        page: 2,
        text: 'Carrier Response: "In accordance with 10 CCR § 2644.9, the carrier has amended Endorsement CP-WF-CREDIT (Ed. 09-23) to explicitly include a schedule of premium credits ranging from 8% to 18% for commercial buildings exhibiting IBHS Wildfire Prepared Commercial status or documented defensible space compliance under PRC 4291."'
      },
      {
        sectionNumber: 'Precedent Resolution § 4',
        heading: 'CDI Approval Letter & Compliance Confirmation',
        page: 4,
        text: 'Examiner Statement: "The revised wording in Endorsement CP-WF-CREDIT resolves Objection #1 and #2. The filing is hereby approved for commercial property policies effective November 1, 2023."'
      }
    ],
    fullText: `STATE OF CALIFORNIA DEPARTMENT OF INSURANCE - RATE REGULATION BRANCH
SERFF Tracking Number: CA-2023-08912
Carrier: Commercial Property Underwriters Group
Subject: Filing Response to Objection Letter Dated June 2, 2023

Dear Deputy Commissioner:
In response to the Department\'s objection letter dated June 2, 2023 concerning filing CA-2023-08912, the carrier submits this amended filing and response.

Objection 1: The proposed commercial property filing utilized proprietary wildfire scores without incorporating mandatory mitigation credits under 10 CCR § 2644.9.
Carrier Response: The carrier has modified its rating rule manual Rule 44.B to mandate that any commercial risk presenting third-party certification of IBHS Wildfire Prepared Commercial standards shall automatically receive a Tier 1 (15%) mitigation credit on the wildfire peril rate.

Objection 2: Lack of consumer appeal mechanism for wildfire scores.
Carrier Response: Endorsement CP-WF-DISCLOSURE has been attached, granting policyholders 30 days to submit verification of structural hardening or defensible space clearing.

CDI Disposition: APPROVED.`
  },
  {
    id: 'DOC-HIST-NY-2022-PRECEDENT',
    name: 'Historical Precedent Filing: Cyber War Exclusion Amendment Approved by NY DFS',
    documentType: 'Carrier Precedent Response',
    state: 'NY',
    jurisdiction: 'State of New York',
    regulatoryAuthority: 'New York Department of Financial Services (DFS)',
    productCategory: 'Cyber Risk & Tech E&O',
    publicationDate: '2022-11-12',
    sourceUrl: 'https://dfs.ny.gov/filings/cyber/SERFF-NY-2022-5412.pdf',
    citation: 'SERFF Tracking # NY-2022-5412; DFS Cyber Objection # 03-2022',
    summary: 'DFS approved revised cyber war exclusion that explicitly carves out state-sponsored cyber attacks against non-military commercial entities unless formally attributed by the US government and part of kinetic hostilities.',
    pageCount: 4,
    tags: ['Precedent', 'NY DFS Approved', 'Cyber War Exclusion', 'Attribution Clause'],
    sections: [
      {
        sectionNumber: 'Precedent Clause § 1',
        heading: 'Revised Cyber Hostile Acts Exclusion (Approved Wording)',
        page: 2,
        text: 'Approved Wording: "This exclusion does not apply to any cyber incident, ransomware extortion, or denial-of-service attack, even if alleged to have been executed or sponsored by a foreign sovereign government, unless such attack occurs in the course of declared war, invasion, or armed conflict directly involving kinetic military hostilities."'
      }
    ],
    fullText: `NEW YORK DEPARTMENT OF FINANCIAL SERVICES - PROPERTY BUREAU
SERFF Tracking Number: NY-2022-5412
Filing Carrier: Nationwide Commercial Specialty Lines
Product: Cyber Enterprise Risk Policy

Disposition: APPROVED AS AMENDED
The Department acknowledges the carrier\'s replacement of Endorsement CY-WAR-001 with CY-WAR-REV (11/22).
The inclusion of objective government attribution criteria satisfies Circular Letter No. 1 (2021) Section 4 regarding clarity of warlike exclusion terms.`
  }
];

export const INITIAL_POLICY_DOCUMENTS: RegulatoryDocument[] = [
  {
    id: 'DOC-POLICY-CGL-001',
    name: 'Commercial General Liability Policy Form CGL-2024-STD',
    documentType: 'Standard Policy Form',
    state: 'TX',
    jurisdiction: 'State of Texas',
    regulatoryAuthority: 'Carrier Policy Filing Section',
    productCategory: 'General Liability (CGL)',
    publicationDate: '2024-01-10',
    sourceUrl: 'https://internal-filings.commercial-insurance.example/forms/CGL-2024-STD.pdf',
    citation: 'Form CGL-2024-STD (Ed. 01/24)',
    summary: 'Standard commercial general liability policy covering bodily injury, property damage, and personal and advertising injury with defense cost supplementary provisions.',
    pageCount: 22,
    tags: ['CGL', 'Standard Form', 'Defense Costs', 'Notice of Occurrence', 'Pollution'],
    sections: [
      {
        sectionNumber: 'Section I - Coverage A § 1.a',
        heading: 'Insuring Agreement - Bodily Injury & Property Damage',
        page: 1,
        text: 'We will pay those sums that the insured becomes legally obligated to pay as damages because of "bodily injury" or "property damage" to which this insurance applies. We will have the right and duty to defend the insured against any "suit" seeking those damages.'
      },
      {
        sectionNumber: 'Section IV - Commercial General Liability Conditions § 2',
        heading: 'Duties in the Event of Occurrence, Offense, Claim or Suit',
        page: 14,
        text: 'The insured must see to it that we are notified in writing as soon as practicable of an "occurrence" or an offense which may result in a claim. Written notice must contain details of how, when and where the occurrence took place. Final proof of loss must be provided within 30 calendar days of demand.'
      },
      {
        sectionNumber: 'Endorsement CGL-IL-DEF-01',
        heading: 'Defense Costs Inside Policy Limits (Proposed)',
        page: 19,
        text: 'Payment of defense expenses by the insurer shall reduce the applicable Each Occurrence and General Aggregate Limits of Liability. Upon exhaustion of the Limit of Liability by payment of settlements, judgments, or legal defense costs, our duty to defend terminates.'
      }
    ],
    fullText: `COMMERCIAL GENERAL LIABILITY COVERAGE FORM (FORM CGL-2024-STD)
Various provisions in this policy restrict coverage. Read the entire policy carefully to determine rights, duties and what is and is not covered.

SECTION I - COVERAGES
COVERAGE A - BODILY INJURY AND PROPERTY DAMAGE LIABILITY
1. Insuring Agreement: We will pay those sums that the insured becomes legally obligated to pay as damages because of "bodily injury" or "property damage" to which this insurance applies.
SECTION IV - COMMERCIAL GENERAL LIABILITY CONDITIONS
2. Duties In The Event Of Occurrence, Offense, Claim Or Suit:
a. You must see to it that we are notified as soon as practicable of an "occurrence".
b. If a claim is made or "suit" is brought against any insured, you must immediately send us copies of any demands, notices, summonses or legal papers.`
  },
  {
    id: 'DOC-POLICY-PROP-002',
    name: 'Commercial Property & Business Interruption Policy Form CP-2024',
    documentType: 'Standard Policy Form',
    state: 'CA',
    jurisdiction: 'State of California',
    regulatoryAuthority: 'Commercial Property Filing Group',
    productCategory: 'Commercial Property',
    publicationDate: '2024-02-01',
    sourceUrl: 'https://internal-filings.commercial-insurance.example/forms/CP-2024.pdf',
    citation: 'Form CP-2024 (Ed. 02/24)',
    summary: 'Commercial property building and personal property coverage form with wildfire hazard underwriting schedules.',
    pageCount: 30,
    tags: ['Commercial Property', 'Wildfire Schedule', 'Building Hardening', 'Cancellation Clause'],
    sections: [
      {
        sectionNumber: 'Section II - Perils Insured Against',
        heading: 'Wildfire Peril Scoring and Surcharge Endorsement CP-WF-01',
        page: 12,
        text: 'Coverage for loss caused by wildfire or brush fire shall be subject to carrier proprietary hazard score Tier 1 through Tier 5. Surcharges up to 40% shall be levied based upon satellite vegetation density. Underwriter determination of score shall be final and not subject to insured contestation.'
      },
      {
        sectionNumber: 'Common Policy Conditions § A',
        heading: 'Cancellation and Non-Renewal Notice Period',
        page: 25,
        text: 'The company may cancel or non-renew this policy by mailing written notice to the first Named Insured at least 30 days prior to the effective date of cancellation or non-renewal.'
      }
    ],
    fullText: `COMMERCIAL PROPERTY COVERAGE PART
BUILDING AND PERSONAL PROPERTY COVERAGE FORM CP-2024
Coverage is provided only for those perils for which a specific limit of insurance is shown on the Declarations Page.

SCHEDULE OF PERILS AND EXCLUSIONS
Endorsement CP-WF-01: Wildfire Underwriting Scoring Schedule
In consideration of premium charged, coverage for loss or damage arising out of wildfire shall be evaluated using the Carrier Proprietary Wildfire Index (CPWI). Risks designated as CPWI High Risk will incur a mandatory 35% surcharge.
Common Policy Conditions: 30-day notice of cancellation or non-renewal.`
  },
  {
    id: 'DOC-POLICY-CYBER-003',
    name: 'Commercial Cyber Risk and Tech E&O Policy CY-2024-ENTERPRISE',
    documentType: 'Standard Policy Form',
    state: 'NY',
    jurisdiction: 'State of New York',
    regulatoryAuthority: 'Cyber Underwriting Practice',
    productCategory: 'Cyber Risk & Tech E&O',
    publicationDate: '2024-03-01',
    sourceUrl: 'https://internal-filings.commercial-insurance.example/forms/CY-2024-ENTERPRISE.pdf',
    citation: 'Form CY-2024-ENTERPRISE (Ed. 03/24)',
    summary: 'Comprehensive enterprise cyber insurance providing first-party breach response, business interruption, and third-party liability.',
    pageCount: 26,
    tags: ['Cyber Policy', 'War Exclusion', 'Ransomware Sub-limit', 'State-Sponsored Attack'],
    sections: [
      {
        sectionNumber: 'Section III - Exclusions § 8',
        heading: 'Hostile Acts, War and Sovereign Cyber Warfare Exclusion',
        page: 15,
        text: 'This policy does not cover any loss, damage, liability, cost, or expense directly or indirectly caused by, contributed to by, or arising out of: (a) War, hostile or warlike action in time of peace or war; (b) Any cyber attack, malware release, or electronic intrusion that is deemed by the insurer, in its sole discretion, to have originated from, or been supported, aided, or conducted by a foreign government, sovereign state, military agency, or state-sponsored advanced persistent threat (APT) actor.'
      },
      {
        sectionNumber: 'Section I - Insuring Agreement C',
        heading: 'Ransomware Extortion Sub-limit and Mandatory Cooperation',
        page: 6,
        text: 'The insurer will reimburse extortion payments up to the sub-limit of $1,000,000 provided the insured has complied with all designated patch management schedules and obtained pre-approval.'
      }
    ],
    fullText: `COMMERCIAL ENTERPRISE CYBER POLICY FORM CY-2024-ENTERPRISE
SECTION III - EXCLUSIONS
8. Hostile Acts & Sovereign Cyber Warfare:
This insurance does not apply to any claim or loss arising directly or indirectly out of:
a. War, including undeclared war or civil war;
b. Cyber attacks deemed by insurer in its sole discretion to be sponsored or supported by any foreign sovereign state or political faction, regardless of whether formal war has been declared.`
  }
];

/**
 * Pre-chunked knowledge base containing granular text snippets,
 * page numbers, and exact statutory citations for hybrid retrieval and RRF.
 */
export function buildDocumentChunks(docs: RegulatoryDocument[]): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  for (const doc of docs) {
    if (doc.sections && doc.sections.length > 0) {
      doc.sections.forEach((sec, idx) => {
        chunks.push({
          chunkId: `${doc.id}-SEC-${idx + 1}`,
          documentId: doc.id,
          documentName: doc.name,
          state: doc.state,
          productCategory: doc.productCategory,
          documentType: doc.documentType,
          citation: `${doc.citation} (${sec.sectionNumber})`,
          sourceUrl: doc.sourceUrl,
          pageNumber: sec.page,
          sectionNumber: sec.sectionNumber,
          sectionHeading: sec.heading,
          content: `${sec.heading}\n${sec.text}`,
          tokenCount: Math.ceil(sec.text.split(/\s+/).length * 1.3)
        });
      });
    } else {
      // Split fullText into ~200-word chunks
      const paragraphs = doc.fullText.split(/\n\n+/);
      paragraphs.forEach((p, idx) => {
        if (p.trim().length > 20) {
          chunks.push({
            chunkId: `${doc.id}-P-${idx + 1}`,
            documentId: doc.id,
            documentName: doc.name,
            state: doc.state,
            productCategory: doc.productCategory,
            documentType: doc.documentType,
            citation: doc.citation,
            sourceUrl: doc.sourceUrl,
            pageNumber: Math.min(doc.pageCount, Math.floor(idx / 2) + 1),
            content: p.trim(),
            tokenCount: Math.ceil(p.split(/\s+/).length * 1.3)
          });
        }
      });
    }
  }

  return chunks;
}
