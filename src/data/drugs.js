/**
 * Drug reference data. Canonical ids are lowercase INN/generic names.
 * `aliases` covers common brand names (US/EU) and abbreviations.
 *
 * `classes` drive the rule engine (src/rules.js). Keep class names stable —
 * rules reference them by string.
 */

export const DRUGS = {
  warfarin: { name: 'Warfarin', aliases: ['coumadin', 'jantoven'], classes: ['anticoagulant-vka', 'cyp2c9-substrate'] },
  apixaban: { name: 'Apixaban', aliases: ['eliquis'], classes: ['doac'] },
  rivaroxaban: { name: 'Rivaroxaban', aliases: ['xarelto'], classes: ['doac'] },
  dabigatran: { name: 'Dabigatran', aliases: ['pradaxa'], classes: ['doac'] },

  aspirin: { name: 'Aspirin', aliases: ['asa', 'acetylsalicylic acid', 'acetylsalicylsäure'], classes: ['antiplatelet', 'nsaid'] },
  ibuprofen: { name: 'Ibuprofen', aliases: ['advil', 'motrin', 'brufen'], classes: ['nsaid'] },
  naproxen: { name: 'Naproxen', aliases: ['aleve', 'naprosyn'], classes: ['nsaid'] },
  diclofenac: { name: 'Diclofenac', aliases: ['voltaren'], classes: ['nsaid'] },
  celecoxib: { name: 'Celecoxib', aliases: ['celebrex'], classes: ['nsaid'] },

  sertraline: { name: 'Sertraline', aliases: ['zoloft'], classes: ['ssri', 'serotonergic'] },
  citalopram: { name: 'Citalopram', aliases: ['celexa'], classes: ['ssri', 'serotonergic', 'qt-prolonging'] },
  escitalopram: { name: 'Escitalopram', aliases: ['lexapro', 'cipralex'], classes: ['ssri', 'serotonergic', 'qt-prolonging'] },
  fluoxetine: { name: 'Fluoxetine', aliases: ['prozac'], classes: ['ssri', 'serotonergic', 'cyp2d6-inhibitor', 'cyp2c9-inhibitor'] },
  paroxetine: { name: 'Paroxetine', aliases: ['paxil', 'seroxat'], classes: ['ssri', 'serotonergic', 'cyp2d6-inhibitor'] },
  trazodone: { name: 'Trazodone', aliases: ['desyrel'], classes: ['serotonergic'] },
  amitriptyline: { name: 'Amitriptyline', aliases: ['elavil', 'saroten'], classes: ['serotonergic', 'qt-prolonging'] },
  phenelzine: { name: 'Phenelzine', aliases: ['nardil'], classes: ['maoi', 'serotonergic'] },

  tramadol: { name: 'Tramadol', aliases: ['ultram', 'tramal'], classes: ['opioid', 'serotonergic'] },
  codeine: { name: 'Codeine', aliases: [], classes: ['opioid', 'cyp2d6-substrate'] },
  oxycodone: { name: 'Oxycodone', aliases: ['oxycontin'], classes: ['opioid', 'cyp3a4-substrate'] },
  morphine: { name: 'Morphine', aliases: ['ms contin'], classes: ['opioid'] },
  fentanyl: { name: 'Fentanyl', aliases: ['duragesic'], classes: ['opioid'] },

  diazepam: { name: 'Diazepam', aliases: ['valium'], classes: ['benzodiazepine', 'cyp3a4-substrate'] },
  alprazolam: { name: 'Alprazolam', aliases: ['xanax'], classes: ['benzodiazepine', 'cyp3a4-substrate'] },
  lorazepam: { name: 'Lorazepam', aliases: ['ativan', 'tafrol'], classes: ['benzodiazepine'] },

  simvastatin: { name: 'Simvastatin', aliases: ['zocor'], classes: ['statin', 'statin-cyp3a4', 'cyp3a4-substrate'] },
  atorvastatin: { name: 'Atorvastatin', aliases: ['lipitor', 'sortis'], classes: ['statin', 'statin-cyp3a4', 'cyp3a4-substrate'] },
  rosuvastatin: { name: 'Rosuvastatin', aliases: ['crestor'], classes: ['statin'] },

  clarithromycin: { name: 'Clarithromycin', aliases: ['biaxin', 'klacid'], classes: ['macrolide', 'cyp3a4-inhibitor-strong', 'qt-prolonging'] },
  erythromycin: { name: 'Erythromycin', aliases: [], classes: ['macrolide', 'cyp3a4-inhibitor-strong', 'qt-prolonging'] },
  azithromycin: { name: 'Azithromycin', aliases: ['zithromax'], classes: ['macrolide', 'qt-prolonging'] },
  fluconazole: { name: 'Fluconazole', aliases: ['diflucan'], classes: ['cyp2c9-inhibitor', 'cyp3a4-inhibitor-moderate'] },
  ketoconazole: { name: 'Ketoconazole', aliases: ['nizoral'], classes: ['cyp3a4-inhibitor-strong'] },
  ciprofloxacin: { name: 'Ciprofloxacin', aliases: ['cipro'], classes: ['fluoroquinolone', 'cyp1a2-inhibitor', 'qt-prolonging'] },
  levofloxacin: { name: 'Levofloxacin', aliases: ['tavanic'], classes: ['fluoroquinolone', 'qt-prolonging'] },
  'trimethoprim-sulfamethoxazole': { name: 'Trimethoprim/Sulfamethoxazole', aliases: ['bactrim', 'septra', 'cotrimoxazole', 'tmp-smx'], classes: ['cyp2c9-inhibitor'] },
  metronidazole: { name: 'Metronidazole', aliases: ['flagyl'], classes: ['cyp2c9-inhibitor', 'cyp3a4-inhibitor-moderate'] },
  rifampin: { name: 'Rifampin', aliases: ['rifampicin', 'rifadin'], classes: ['cyp3a4-inducer', 'cyp2c9-inducer'] },
  carbamazepine: { name: 'Carbamazepine', aliases: ['tegretol'], classes: ['cyp3a4-inducer', 'cyp2c9-inducer'] },
  tizanidine: { name: 'Tizanidine', aliases: ['zanaflex'], classes: ['cyp1a2-substrate'] },

  amiodarone: { name: 'Amiodarone', aliases: ['cordarone'], classes: ['cyp3a4-inhibitor-moderate', 'cyp2c9-inhibitor', 'cyp2d6-inhibitor', 'qt-prolonging'] },
  digoxin: { name: 'Digoxin', aliases: ['lanoxin'], classes: ['pgp-substrate'] },
  metoprolol: { name: 'Metoprolol', aliases: ['lopressor', 'toprol-xl', 'beloc'], classes: ['beta-blocker', 'cyp2d6-substrate'] },
  bisoprolol: { name: 'Bisoprolol', aliases: ['concor'], classes: ['beta-blocker'] },
  amlodipine: { name: 'Amlodipine', aliases: ['norvasc'], classes: ['cyp3a4-inhibitor-weak'] },
  verapamil: { name: 'Verapamil', aliases: ['isoptin', 'calan'], classes: ['nondhp-ccb', 'cyp3a4-inhibitor-moderate', 'pgp-inhibitor'] },
  diltiazem: { name: 'Diltiazem', aliases: ['cardizem', 'dilzem'], classes: ['nondhp-ccb', 'cyp3a4-inhibitor-moderate'] },

  lisinopril: { name: 'Lisinopril', aliases: ['zestril', 'prinivil'], classes: ['acei', 'raas'] },
  enalapril: { name: 'Enalapril', aliases: ['vasotec'], classes: ['acei', 'raas'] },
  ramipril: { name: 'Ramipril', aliases: ['altace', 'tritace'], classes: ['acei', 'raas'] },
  losartan: { name: 'Losartan', aliases: ['cozaar'], classes: ['arb', 'raas'] },
  valsartan: { name: 'Valsartan', aliases: ['diovan'], classes: ['arb', 'raas'] },
  spironolactone: { name: 'Spironolactone', aliases: ['aldactone'], classes: ['potassium-sparing-diuretic'] },
  furosemide: { name: 'Furosemide', aliases: ['lasix'], classes: ['loop-diuretic', 'diuretic'] },
  hydrochlorothiazide: { name: 'Hydrochlorothiazide', aliases: ['hctz', 'hydrodiuril'], classes: ['thiazide', 'diuretic'] },

  lithium: { name: 'Lithium', aliases: ['lithobid'], classes: [] },
  methotrexate: { name: 'Methotrexate', aliases: ['trexall', 'mtx'], classes: [] },
  allopurinol: { name: 'Allopurinol', aliases: ['zyloprim'], classes: ['xanthine-oxidase-inhibitor'] },
  azathioprine: { name: 'Azathioprine', aliases: ['imuran'], classes: ['thiopurine'] },
  levothyroxine: { name: 'Levothyroxine', aliases: ['synthroid', 'eltroxin'], classes: [] },
  metformin: { name: 'Metformin', aliases: ['glucophage'], classes: [] },
  prednisone: { name: 'Prednisone', aliases: ['deltasone', 'cortancyl'], classes: ['corticosteroid'] },
  montelukast: { name: 'Montelukast', aliases: ['singulair'], classes: [] },

  clopidogrel: { name: 'Clopidogrel', aliases: ['plavix', 'iscover'], classes: ['antiplatelet', 'cyp2c19-prodrug'] },
  ticagrelor: { name: 'Ticagrelor', aliases: ['brilinta', 'brilique'], classes: ['antiplatelet'] },
  omeprazole: { name: 'Omeprazole', aliases: ['prilosec', 'antra'], classes: ['ppi', 'cyp2c19-inhibitor'] },
  pantoprazole: { name: 'Pantoprazole', aliases: ['protonix', 'pantozol'], classes: ['ppi'] },

  gabapentin: { name: 'Gabapentin', aliases: ['neurontin'], classes: ['gabapentinoid'] },
  pregabalin: { name: 'Pregabalin', aliases: ['lyrica'], classes: ['gabapentinoid'] },
  ondansetron: { name: 'Ondansetron', aliases: ['zofran'], classes: ['qt-prolonging'] },

  sildenafil: { name: 'Sildenafil', aliases: ['viagra'], classes: ['pde5-inhibitor'] },
  tadalafil: { name: 'Tadalafil', aliases: ['cialis'], classes: ['pde5-inhibitor'] },
  nitroglycerin: { name: 'Nitroglycerin', aliases: ['nitro', 'nitrostat', 'glyceryl trinitrate'], classes: ['nitrate'] },
  'isosorbide-mononitrate': { name: 'Isosorbide mononitrate', aliases: ['imdur', 'isosorbide'], classes: ['nitrate'] },
};

/** @returns {Map<string, string>} lowercase alias/brand/id → canonical id */
export function buildAliasIndex() {
  const index = new Map();
  for (const [id, drug] of Object.entries(DRUGS)) {
    index.set(id, id);
    index.set(drug.name.toLowerCase(), id);
    for (const alias of drug.aliases) index.set(alias.toLowerCase(), id);
  }
  return index;
}
