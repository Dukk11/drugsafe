/**
 * drugsafe — drug interaction engine.
 *
 * Combines two evidence layers:
 *   1. Curated pairwise interactions (data/interactions.js)
 *   2. Class- and group-based rules (rules.js) — e.g. FDA's opioid+benzodiazepine
 *      boxed warning as a class pair, or the "triple whammy" AKI triad as a group.
 *
 * ⚠️ Decision support, not a medical device. Verify against a full drug
 * information system (micromedex/UpToDate/Lexicomp) for patient care.
 */

import { DRUGS, buildAliasIndex } from './data/drugs.js';
import { INTERACTIONS, SEVERITY_ORDER, SEVERITY_LABEL } from './data/interactions.js';
import { CLASS_RULES, GROUP_RULES } from './rules.js';

const aliasIndex = buildAliasIndex();

const pairKey = (a, b) => [a, b].sort().join('+');

/** Sorted explicit interaction lookup: "a+b" → entry */
const explicitPairs = new Map();
for (const entry of INTERACTIONS) {
  explicitPairs.set(pairKey(entry.a, entry.b), entry);
}

/**
 * Resolve user input (generic, brand, alias) to canonical drug id.
 * @param {string} input
 * @returns {{id: string, drug: object}|{input: string, unknown: true}}
 */
export function resolve(input) {
  if (typeof input !== 'string' || !input.trim()) {
    throw new TypeError('drug name must be a non-empty string');
  }
  const key = input.trim().toLowerCase();
  const id = aliasIndex.get(key);
  if (id) return { id, drug: DRUGS[id] };
  return { input, unknown: true };
}

/**
 * Check a medication list for interactions.
 * @param {string[]} meds Drug names (generic, brand, or alias).
 * @returns {{
 *   resolved: {id: string, name: string, aliases: string[]}[],
 *   unknown: string[],
 *   pairs: {a: string, b: string, severity: string, mechanism: string, effect: string, management: string, source: string, refs?: string}[],
 *   groupHits: object[],
 *   maxSeverity: 'none'|'minor'|'moderate'|'major'|'contraindicated',
 *   summary: string
 * }}
 */
export function checkInteractions(meds) {
  if (!Array.isArray(meds)) throw new TypeError('meds must be an array of strings');

  const resolved = [];
  const unknown = [];
  for (const m of meds) {
    const r = resolve(m);
    if (r.unknown) unknown.push(r.input);
    else resolved.push({ id: r.id, name: r.drug.name, aliases: r.drug.aliases, drug: r.drug });
  }

  const pairs = [];

  // Layer 1: explicit curated pairs.
  for (let i = 0; i < resolved.length; i++) {
    for (let j = i + 1; j < resolved.length; j++) {
      const key = pairKey(resolved[i].id, resolved[j].id);
      const hit = explicitPairs.get(key);
      if (hit) {
        pairs.push({ ...hit, source: 'curated pair', a: resolved[i].name, b: resolved[j].name });
      }
    }
  }

  // Layer 2: class-pair rules.
  const covered = new Set(pairs.map((p) => pairKey(p.a.toLowerCase(), p.b.toLowerCase())));
  for (const rule of CLASS_RULES) {
    for (let i = 0; i < resolved.length; i++) {
      for (let j = i + 1; j < resolved.length; j++) {
        const A = resolved[i];
        const B = resolved[j];
        const key = pairKey(A.id, B.id);
        if (covered.has(key)) continue;
        const forward = A.drug.classes.includes(rule.classA) && B.drug.classes.includes(rule.classB);
        const reverse = B.drug.classes.includes(rule.classA) && A.drug.classes.includes(rule.classB);
        if (forward || reverse) {
          covered.add(key);
          pairs.push({
            a: A.name,
            b: B.name,
            severity: rule.severity,
            mechanism: rule.mechanism,
            effect: rule.effect,
            management: rule.management,
            source: `rule: ${rule.id}`,
            refs: rule.refs,
          });
        }
      }
    }
  }

  // Layer 3: group rules across the whole list.
  const groupHits = [];
  const groupList = resolved.map((r) => ({ name: r.name, classes: r.drug.classes }));
  for (const rule of GROUP_RULES) {
    const hits = rule.match(groupList);
    if (hits) {
      groupHits.push({
        drugs: hits.map((d) => d.name),
        severity: rule.severity,
        rule: rule.id,
        description: rule.description,
        mechanism: rule.mechanism,
        effect: rule.effect,
        management: rule.management,
        refs: rule.refs,
      });
    }
  }

  const severities = [...pairs.map((p) => p.severity), ...groupHits.map((g) => g.severity)];
  const maxSeverity = severities.length
    ? severities.reduce((max, s) => (SEVERITY_ORDER[s] > SEVERITY_ORDER[max] ? s : max), 'minor')
    : 'none';

  const summary =
    maxSeverity === 'none'
      ? `No known interactions among ${resolved.length} medication(s).`
      : `${pairs.length} interaction pair(s), ${groupHits.length} group warning(s) — highest severity: ${maxSeverity.toUpperCase()}`;

  return { resolved, unknown, pairs, groupHits, maxSeverity, summary };
}

export { DRUGS, SEVERITY_ORDER, SEVERITY_LABEL };

/** Alphabetical list of all supported drugs with their aliases. */
export function listDrugs() {
  return Object.values(DRUGS)
    .map((d) => ({ name: d.name, aliases: d.aliases }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
