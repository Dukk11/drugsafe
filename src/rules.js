/**
 * Class-based interaction rules. A rule fires when one drug carries `classA`
 * and another carries `classB` (or the same class twice for group rules).
 * Explicit pair data (interactions.js) always takes precedence.
 */

export const CLASS_RULES = [
  {
    id: 'ssri-nsaid',
    classA: 'ssri',
    classB: 'nsaid',
    severity: 'moderate',
    mechanism: 'SSRI-impaired platelet serotonin uptake + NSAID gastric mucosal injury',
    effect: 'Upper GI bleeding risk roughly doubles vs. either alone',
    management: 'Add PPI gastroprotection; warn about melena',
    refs: 'Anglin R et al. Am J Gastroenterol. 2014;109:811–819',
  },
  {
    id: 'ssri-antiplatelet',
    classA: 'ssri',
    classB: 'antiplatelet',
    severity: 'moderate',
    mechanism: 'Additive platelet function impairment',
    effect: 'Increased bleeding risk',
    management: 'Monitor for bleeding signs',
  },
  {
    id: 'doac-nsaid',
    classA: 'doac',
    classB: 'nsaid',
    severity: 'major',
    mechanism: 'Pharmacodynamic additivity (anticoagulation + mucosal injury)',
    effect: 'Major GI bleeding risk',
    management: 'Avoid routine NSAIDs on a DOAC; acetaminophen preferred',
    refs: 'FDA DOAC labeling; Cheung KS et al. Am J Gastroenterol. 2018;113:328–336',
  },
  {
    id: 'doac-antiplatelet',
    classA: 'doac',
    classB: 'antiplatelet',
    severity: 'major',
    mechanism: 'Additive antithrombotic effect',
    effect: 'Major bleeding risk (sometimes intentional after ACS — specialist decision)',
    management: 'Only combine with explicit indication and planned duration',
  },
  {
    id: 'opioid-benzodiazepine',
    classA: 'opioid',
    classB: 'benzodiazepine',
    severity: 'major',
    mechanism: 'Additive CNS/respiratory depression (mu-opioid + GABA-A)',
    effect: 'Respiratory depression, sedation, death — FDA boxed warning',
    management: 'Avoid; if unavoidable, lowest doses, warn patient, ensure naloxone access',
    refs: 'FDA Drug Safety Communication, 2017 (boxed warning opioid+benzodiazepine)',
  },
  {
    id: 'statin-cyp3a4-strong',
    classA: 'statin-cyp3a4',
    classB: 'cyp3a4-inhibitor-strong',
    severity: 'major',
    mechanism: 'Strong CYP3A4 inhibition of simvastatin/atorvastatin',
    effect: 'Exposure ↑ up to 10-fold → myopathy/rhabdomyolysis',
    management: 'Suspend statin during inhibitor course or switch to rosuvastatin/pravastatin',
    refs: 'FDA simvastatin label, dose-limit table',
  },
  {
    id: 'statin-cyp3a4-moderate',
    classA: 'statin-cyp3a4',
    classB: 'cyp3a4-inhibitor-moderate',
    severity: 'moderate',
    mechanism: 'Moderate CYP3A4 inhibition',
    effect: 'Statin exposure ↑ → myopathy risk',
    management: 'Cap simvastatin at 20 mg/day; monitor CK if myalgia',
  },
  {
    id: 'ssri-maoi',
    classA: 'ssri',
    classB: 'maoi',
    severity: 'contraindicated',
    mechanism: 'Serotonin reuptake inhibition + MAO inhibition',
    effect: 'Life-threatening serotonin syndrome',
    management: 'Absolute contraindication; observe washout periods',
    refs: 'FDA antidepressant labeling',
  },
  {
    id: 'gabapentinoid-opioid',
    classA: 'gabapentinoid',
    classB: 'opioid',
    severity: 'moderate',
    mechanism: 'Additive CNS depression',
    effect: 'Sedation, respiratory depression (esp. reduced clearance in elderly)',
    management: 'Start low, warn about driving; consider dose reduction',
  },
  {
    id: 'raas-potassium-sparing',
    classA: 'raas',
    classB: 'potassium-sparing-diuretic',
    severity: 'major',
    mechanism: 'Dual suppression of renal potassium excretion',
    effect: 'Hyperkalemia → arrhythmia risk',
    management: 'Check K⁺/creatinine 1 week after start/change, then per protocol',
  },
];

/**
 * Group rules — fire across N drugs in the medication list, not just pairs.
 * `match` receives all resolved drugs and returns hit descriptors or null.
 */
export const GROUP_RULES = [
  {
    id: 'serotonin-syndrome',
    description: '≥ 2 serotonergic agents — serotonin syndrome risk',
    match: (drugs) => {
      const hits = drugs.filter((d) => d.classes.includes('serotonergic'));
      return hits.length >= 2 ? hits : null;
    },
    severity: 'major',
    mechanism: 'Additive serotonin receptor agonism / reuptake inhibition',
    effect: 'Serotonin syndrome: agitation, hyperreflexia, clonus, hyperthermia',
    management: 'Review the combination; educate on early symptoms; Hunter criteria if symptomatic',
    refs: 'Dunkley EJC et al. QJM. 2003;96:635–642 (Hunter Serotonin Toxicity Criteria)',
  },
  {
    id: 'qt-stacking',
    description: '≥ 2 QT-prolonging agents — torsades risk',
    match: (drugs) => {
      const hits = drugs.filter((d) => d.classes.includes('qt-prolonging'));
      return hits.length >= 2 ? hits : null;
    },
    severity: 'moderate',
    mechanism: 'Additive delayed rectifier K⁺-current blockade (hERG)',
    effect: 'QT prolongation → torsades de pointes, especially with hypokalemia/bradycardia',
    management: 'Baseline ECG + K⁺/Mg²⁺; minimize QT-prolonging load where possible',
    refs: 'CredibleMeds QT-drug lists (AZCERT)',
  },
  {
    id: 'triple-whammy',
    description: 'RAAS blocker + diuretic + NSAID — acute kidney injury ("triple whammy")',
    match: (drugs) => {
      const has = (c) => drugs.some((d) => d.classes.includes(c));
      if (!has('raas') || !has('diuretic') || !has('nsaid')) return null;
      return drugs.filter((d) => ['raas', 'diuretic', 'nsaid'].some((c) => d.classes.includes(c)));
    },
    severity: 'major',
    mechanism: 'Glomerular pressure dropped (RAAS) + volume depleted (diuretic) + afferent vasoconstriction (NSAID)',
    effect: 'Acute kidney injury — major share of drug-related AKI cases in cohort data',
    management: 'Avoid the NSAID leg; check creatinine/eGFR promptly',
    refs: 'Lapi F et al. BMJ. 2013;346:e8525',
  },
];
