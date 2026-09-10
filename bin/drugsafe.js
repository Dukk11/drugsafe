#!/usr/bin/env node
/**
 * drugsafe CLI — check a medication list for interactions in one command:
 *
 *   drugsafe warfarin ibuprofen aspirin
 *   drugsafe --json zocor biaxin
 *   drugsafe --list
 *
 * Exit codes: 0 = no significant interaction, 1 = moderate/major found,
 *             2 = contraindicated found, 64 = usage error.
 */

import { checkInteractions, listDrugs } from '../src/index.js';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const listAll = args.includes('--list') || args.includes('-l');
const meds = args.filter((a) => !a.startsWith('--') && a !== '-l');

const colors = {
  contraindicated: '\x1b[1;91m',
  major: '\x1b[1;31m',
  moderate: '\x1b[33m',
  minor: '\x1b[36m',
  none: '\x1b[32m',
};
const reset = '\x1b[0m';

if (listAll) {
  console.log(`drugsafe — ${listDrugs().length} supported drugs (generic [aliases]):\n`);
  for (const d of listDrugs()) {
    console.log(`  ${d.name.toLowerCase()}${d.aliases.length ? ` (${d.aliases.join(', ')})` : ''}`);
  }
  process.exit(0);
}

if (meds.length < 2) {
  console.error(`drugsafe — drug interaction checker (decision support, not a medical device)

Usage:
  drugsafe <medication> <medication> [more...]
  drugsafe --json <medication> <medication>
  drugsafe --list

Examples:
  drugsafe warfarin ibuprofen
  drugsafe coumadin advil aspirin      # brand names work
  drugsafe --json oxycontin xanax

Exit codes: 0 none · 1 moderate/major · 2 contraindicated`);
  process.exit(64);
}

const result = checkInteractions(meds);

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  if (result.unknown.length) {
    console.log(`⚠️  Unknown medication(s), not checked: ${result.unknown.join(', ')}`);
    console.log('   Run `drugsafe --list` for supported drugs.\n');
  }
  console.log(`Checked: ${result.resolved.map((r) => r.name).join(' + ')}`);
  console.log('─'.repeat(64));

  if (result.pairs.length) {
    for (const p of result.pairs) {
      const c = colors[p.severity] ?? colors.minor;
      console.log(`\n${c}[${p.severity.toUpperCase()}] ${p.a} + ${p.b}${reset}`);
      console.log(`  Mechanism : ${p.mechanism}`);
      console.log(`  Effect    : ${p.effect}`);
      console.log(`  Management: ${p.management}`);
      console.log(`  Source    : ${p.source}${p.refs ? ` — ${p.refs}` : ''}`);
    }
  } else {
    console.log('\nNo curated pair interactions found.');
  }

  for (const g of result.groupHits) {
    const c = colors[g.severity] ?? colors.minor;
    console.log(`\n${c}[${g.severity.toUpperCase()} · ${g.rule}] ${g.description}${reset}`);
    console.log(`  Drugs     : ${g.drugs.join(', ')}`);
    console.log(`  Mechanism : ${g.mechanism}`);
    console.log(`  Effect    : ${g.effect}`);
    console.log(`  Management: ${g.management}`);
    if (g.refs) console.log(`  Source    : ${g.refs}`);
  }

  console.log('\n' + '─'.repeat(64));
  const c = colors[result.maxSeverity] ?? colors.none;
  console.log(`${c}${result.summary}${reset}`);
  console.log('Decision support only — verify against a full drug information system.');
}

process.exit(
  result.maxSeverity === 'contraindicated' ? 2 : result.maxSeverity === 'major' || result.maxSeverity === 'moderate' ? 1 : 0
);
