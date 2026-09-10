/**
 * Curated, high-confidence pairwise interactions. Only pairs with strong,
 * well-documented evidence (FDA labels, Stockley's Drug Interactions, peer-
 * reviewed reviews) belong here. Class-level interactions live in rules.js.
 *
 * Severity: 'contraindicated' | 'major' | 'moderate' | 'minor'
 */

export const SEVERITY_ORDER = { minor: 1, moderate: 2, major: 3, contraindicated: 4 };

export const SEVERITY_LABEL = {
  contraindicated: 'CONTRAINDICATED — do not combine',
  major: 'MAJOR — avoid combination, needs specific management',
  moderate: 'MODERATE — use with monitoring/dose adjustment',
  minor: 'MINOR — clinically usually not relevant',
};

export const INTERACTIONS = [
  // ---- Warfarin (CYP2C9/CYP3A4 substrate, narrow therapeutic index) ----
  { a: 'warfarin', b: 'ibuprofen', severity: 'major', mechanism: 'Pharmacodynamic (platelet inhibition + gastric mucosal injury)', effect: 'Additive bleeding risk, GI hemorrhage', management: 'Prefer acetaminophen/paracetamol; if NSAID unavoidable, gastroprotection + INR monitoring' },
  { a: 'warfarin', b: 'naproxen', severity: 'major', mechanism: 'Pharmacodynamic (platelet inhibition + gastric mucosal injury)', effect: 'Additive bleeding risk, GI hemorrhage', management: 'Avoid; use acetaminophen instead' },
  { a: 'warfarin', b: 'diclofenac', severity: 'major', mechanism: 'Pharmacodynamic bleeding risk; minor CYP2C9 component', effect: 'Additive bleeding risk', management: 'Avoid combination' },
  { a: 'warfarin', b: 'celecoxib', severity: 'major', mechanism: 'Pharmacodynamic bleeding risk; celecoxib inhibits CYP2C9', effect: 'Rising INR + bleeding risk', management: 'Avoid; monitor INR closely if unavoidable' },
  { a: 'warfarin', b: 'aspirin', severity: 'major', mechanism: 'Additive antithrombotic effect + gastric injury', effect: 'Major bleeding risk (often intentional in mechanical valves — specialist decision)', management: 'Only combine with explicit specialist indication' },
  { a: 'warfarin', b: 'amiodarone', severity: 'major', mechanism: 'CYP2C9/CYP3A4 inhibition', effect: 'INR rises within days–weeks; bleeding', management: 'Reduce warfarin dose ~30–50%, intensified INR monitoring' },
  { a: 'warfarin', b: 'fluconazole', severity: 'major', mechanism: 'CYP2C9 inhibition', effect: 'INR elevation, bleeding', management: 'Reduce dose, INR every 2–3 days during course' },
  { a: 'warfarin', b: 'trimethoprim-sulfamethoxazole', severity: 'major', mechanism: 'CYP2C9 inhibition + gut flora suppression', effect: 'Marked INR elevation', management: 'Avoid if possible; otherwise dose reduction + INR monitoring' },
  { a: 'warfarin', b: 'metronidazole', severity: 'major', mechanism: 'CYP2C9 inhibition', effect: 'INR elevation, bleeding', management: 'Reduce warfarin dose, monitor INR' },
  { a: 'warfarin', b: 'clarithromycin', severity: 'major', mechanism: 'CYP3A4 inhibition + gut flora', effect: 'INR elevation, bleeding', management: 'Prefer azithromycin; else INR monitoring + dose adjust' },
  { a: 'warfarin', b: 'erythromycin', severity: 'major', mechanism: 'CYP3A4 inhibition', effect: 'INR elevation', management: 'Prefer alternative antibiotic, monitor INR' },
  { a: 'warfarin', b: 'rifampin', severity: 'major', mechanism: 'CYP2C9/CYP3A4 induction', effect: 'Warfarin effect collapses → thrombosis risk', management: 'Very frequent INR checks, expect large dose increase' },
  { a: 'warfarin', b: 'carbamazepine', severity: 'major', mechanism: 'Enzyme induction (CYP2C9/3A4)', effect: 'Reduced anticoagulation', management: 'Monitor INR, adjust dose upward' },
  { a: 'warfarin', b: 'levothyroxine', severity: 'moderate', mechanism: 'Increased catabolism of clotting factors (hyperthyroid state)', effect: 'INR may rise', management: 'Check INR after thyroid dose changes' },

  // ---- Digoxin (P-gp substrate, narrow index) ----
  { a: 'digoxin', b: 'amiodarone', severity: 'major', mechanism: 'P-gp inhibition', effect: 'Digoxin levels ~2×, toxicity (arrhythmia, visual changes)', management: 'Halve digoxin dose, check levels' },
  { a: 'digoxin', b: 'verapamil', severity: 'major', mechanism: 'P-gp inhibition + additive AV-node suppression', effect: 'Digoxin toxicity, bradycardia, AV block', management: 'Reduce digoxin dose, monitor HR/levels' },
  { a: 'digoxin', b: 'clarithromycin', severity: 'major', mechanism: 'P-gp inhibition', effect: 'Digoxin toxicity', management: 'Prefer azithromycin; else level monitoring' },
  { a: 'digoxin', b: 'furosemide', severity: 'major', mechanism: 'Diuretic-induced hypokalemia/hypomagnesemia', effect: 'Digoxin toxicity at "normal" levels', management: 'Monitor K⁺/Mg²⁺, replace aggressively' },

  // ---- Beta-blockers ----
  { a: 'metoprolol', b: 'fluoxetine', severity: 'moderate', mechanism: 'CYP2D6 inhibition', effect: 'Metoprolol levels ↑ → bradycardia, hypotension', management: 'Monitor HR/BP; consider CYP2D6-neutral beta-blocker (bisoprolol)' },
  { a: 'metoprolol', b: 'verapamil', severity: 'major', mechanism: 'Additive AV-node suppression + CYP2D6 inhibition', effect: 'Severe bradycardia, heart block, HF exacerbation', management: 'Avoid combination; alternative CCB (amlodipine)' },
  { a: 'metoprolol', b: 'diltiazem', severity: 'major', mechanism: 'Additive AV-node suppression', effect: 'Severe bradycardia, heart block', management: 'Avoid combination' },

  // ---- RAAS + potassium ----
  { a: 'lisinopril', b: 'spironolactone', severity: 'major', mechanism: 'Dual suppression of potassium excretion', effect: 'Hyperkalemia → arrhythmia', management: 'Check K⁺/creatinine at 1 week, then regularly' },
  { a: 'ramipril', b: 'spironolactone', severity: 'major', mechanism: 'Dual suppression of potassium excretion', effect: 'Hyperkalemia', management: 'Monitor K⁺/creatinine' },

  // ---- Lithium (narrow index, renal clearance) ----
  { a: 'lithium', b: 'ibuprofen', severity: 'major', mechanism: 'Reduced renal lithium clearance (prostaglandin-mediated)', effect: 'Lithium toxicity (tremor, confusion, seizures)', management: 'Avoid NSAIDs; use acetaminophen; check lithium level' },
  { a: 'lithium', b: 'naproxen', severity: 'major', mechanism: 'Reduced renal lithium clearance', effect: 'Lithium toxicity', management: 'Avoid NSAIDs; monitor levels' },
  { a: 'lithium', b: 'lisinopril', severity: 'major', mechanism: 'RAAS blockade increases lithium reabsorption', effect: 'Lithium toxicity', management: 'Level monitoring after starting/adjusting' },
  { a: 'lithium', b: 'hydrochlorothiazide', severity: 'major', mechanism: 'Volume contraction + proximal lithium reabsorption', effect: 'Lithium toxicity', management: 'Avoid thiazides if possible; level monitoring' },

  // ---- Methotrexate ----
  { a: 'methotrexate', b: 'trimethoprim-sulfamethoxazole', severity: 'major', mechanism: 'Additive antifolate effect (trimethoprim = DHFR inhibitor)', effect: 'Severe myelosuppression, mucositis', management: 'Contraindicated in practice — avoid combination' },
  { a: 'methotrexate', b: 'ibuprofen', severity: 'moderate', mechanism: 'Reduced renal MTX clearance', effect: 'MTX toxicity (mainly a high-dose concern; low-dose RA data mixed)', management: 'Caution; monitor CBC; many patients tolerate it — local protocol decides' },
  { a: 'methotrexate', b: 'diclofenac', severity: 'moderate', mechanism: 'Reduced renal MTX clearance', effect: 'MTX toxicity risk', management: 'Caution, monitor CBC' },

  // ---- Purine metabolism ----
  { a: 'azathioprine', b: 'allopurinol', severity: 'major', mechanism: 'Xanthine oxidase blocks 6-MP inactivation', effect: 'Severe myelosuppression', management: 'Reduce azathioprine to 25–33% of dose, CBC monitoring' },

  // ---- Antiplatelet + PPI ----
  { a: 'clopidogrel', b: 'omeprazole', severity: 'moderate', mechanism: 'CYP2C19 inhibition (clopidogrel is a prodrug)', effect: 'Reduced antiplatelet effect; clinical impact debated', management: 'Prefer pantoprazole if PPI needed' },

  // ---- Nitrates + PDE5 inhibitors (absolute) ----
  { a: 'sildenafil', b: 'nitroglycerin', severity: 'contraindicated', mechanism: 'Additive NO/cGMP pathway activation', effect: 'Profound, potentially fatal hypotension', management: 'Absolute contraindication; separate ≥ 24 h (sildenafil)' },
  { a: 'sildenafil', b: 'isosorbide-mononitrate', severity: 'contraindicated', mechanism: 'Additive NO/cGMP pathway activation', effect: 'Profound hypotension', management: 'Absolute contraindication' },
  { a: 'tadalafil', b: 'nitroglycerin', severity: 'contraindicated', mechanism: 'Additive NO/cGMP pathway activation', effect: 'Profound hypotension', management: 'Absolute contraindication; tadalafil washout ≥ 48 h' },
  { a: 'tadalafil', b: 'isosorbide-mononitrate', severity: 'contraindicated', mechanism: 'Additive NO/cGMP pathway activation', effect: 'Profound hypotension', management: 'Absolute contraindication' },

  // ---- CYP1A2 ----
  { a: 'ciprofloxacin', b: 'tizanidine', severity: 'contraindicated', mechanism: 'CYP1A2 inhibition', effect: 'Tizanidine levels ↑ 10× → severe hypotension, profound sedation', management: 'Contraindicated per FDA label; alternative antibiotic' },

  // ---- Statins + CYP3A4 ----
  { a: 'simvastatin', b: 'clarithromycin', severity: 'major', mechanism: 'CYP3A4 inhibition', effect: 'Simvastatin levels ↑ ~10× → rhabdomyolysis', management: 'Suspend statin during antibiotic course' },
  { a: 'simvastatin', b: 'ketoconazole', severity: 'major', mechanism: 'CYP3A4 inhibition', effect: 'Rhabdomyolysis risk', management: 'Avoid combination' },
  { a: 'atorvastatin', b: 'clarithromycin', severity: 'major', mechanism: 'CYP3A4 inhibition', effect: 'Statin levels ↑ → myopathy/rhabdomyolysis', management: 'Suspend or switch statin during course' },
  { a: 'simvastatin', b: 'amlodipine', severity: 'moderate', mechanism: 'Weak CYP3A4 inhibition', effect: 'Exposure ↑ ~1.5×; myopathy risk', management: 'Limit simvastatin to 20 mg/day (FDA label)' },
  { a: 'simvastatin', b: 'amiodarone', severity: 'moderate', mechanism: 'CYP3A4 inhibition', effect: 'Myopathy risk', management: 'Limit simvastatin to 20 mg/day' },

  // ---- Serotonin syndrome (explicit highest-signal pairs) ----
  { a: 'fluoxetine', b: 'tramadol', severity: 'major', mechanism: 'Serotonergic additivity + CYP2D6 inhibition raises tramadol exposure', effect: 'Serotonin syndrome (agitation, hyperreflexia, hyperthermia), seizures', management: 'Avoid; if combined, watch for early serotonergic signs' },
  { a: 'phenelzine', b: 'sertraline', severity: 'contraindicated', mechanism: 'MAO-A inhibition blocks serotonin breakdown', effect: 'Life-threatening serotonin syndrome', management: 'Absolute contraindication; ≥ 2-week (SSRI) / 5-week (fluoxetine) washout' },
  { a: 'phenelzine', b: 'tramadol', severity: 'contraindicated', mechanism: 'MAO inhibition + serotonin reuptake inhibition', effect: 'Serotonin syndrome, seizures', management: 'Absolute contraindication' },

  // ---- CYP2D6 efficacy loss ----
  { a: 'codeine', b: 'fluoxetine', severity: 'major', mechanism: 'CYP2D6 inhibition blocks codeine → morphine activation', effect: 'Analgesia fails (plus serotonergic additivity)', management: 'Use a non-CYP2D6-dependent analgesic' },

  // ---- QT stacking (explicit high-signal pair) ----
  { a: 'ondansetron', b: 'amiodarone', severity: 'moderate', mechanism: 'Additive QT prolongation', effect: 'Torsades de pointes risk (especially with electrolyte shifts)', management: 'ECG + K⁺/Mg²⁺ check; consider alternative antiemetic' },
];
