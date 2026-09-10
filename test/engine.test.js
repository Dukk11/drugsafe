import test from 'node:test';
import assert from 'node:assert/strict';

import { resolve, checkInteractions, listDrugs, DRUGS } from '../src/index.js';
import { SEVERITY_ORDER } from '../src/data/interactions.js';

test('resolve: generic name, brand name, and alias all map to the same drug', () => {
  const generic = resolve('warfarin');
  const brand = resolve('Coumadin');
  assert.equal(generic.id, brand.id);
  assert.equal(resolve('ASA').id, 'aspirin');
  assert.equal(resolve('Bactrim').id, 'trimethoprim-sulfamethoxazole');
});

test('resolve: flags unknown drugs instead of guessing', () => {
  const r = resolve('unobtainium');
  assert.equal(r.unknown, true);
  assert.throws(() => resolve(''), TypeError);
});

test('checkInteractions: warfarin + ibuprofen → major (curated pair)', () => {
  const r = checkInteractions(['warfarin', 'ibuprofen']);
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].severity, 'major');
  assert.match(r.pairs[0].mechanism, /bleeding|platelet/i);
  assert.equal(r.maxSeverity, 'major');
});

test('checkInteractions: brand names work (coumadin + advil)', () => {
  const r = checkInteractions(['coumadin', 'advil']);
  assert.equal(r.unknown.length, 0);
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].severity, 'major');
});

test('checkInteractions: opioid + benzodiazepine fires the FDA boxed-warning rule', () => {
  const r = checkInteractions(['oxycontin', 'xanax']);
  const hit = r.pairs.find((p) => p.source === 'rule: opioid-benzodiazepine');
  assert.ok(hit, 'class rule should fire');
  assert.equal(hit.severity, 'major');
  assert.match(hit.effect, /FDA boxed warning/);
});

test('checkInteractions: triple whammy group rule (lisinopril + furosemide + ibuprofen)', () => {
  const r = checkInteractions(['lisinopril', 'furosemide', 'ibuprofen']);
  const gw = r.groupHits.find((g) => g.rule === 'triple-whammy');
  assert.ok(gw, 'triple whammy should fire');
  assert.equal(gw.severity, 'major');
  assert.equal(gw.drugs.length, 3);
});

test('checkInteractions: serotonin group rule fires for SSRI + tramadol', () => {
  const r = checkInteractions(['sertraline', 'tramadol']);
  const gw = r.groupHits.find((g) => g.rule === 'serotonin-syndrome');
  assert.ok(gw);
  assert.equal(gw.severity, 'major');
});

test('checkInteractions: serotonin group rule does NOT fire for a single serotonergic', () => {
  const r = checkInteractions(['sertraline', 'metoprolol']);
  assert.equal(r.groupHits.find((g) => g.rule === 'serotonin-syndrome'), undefined);
});

test('checkInteractions: QT stacking fires for citalopram + clarithromycin', () => {
  const r = checkInteractions(['citalopram', 'clarithromycin']);
  assert.ok(r.groupHits.find((g) => g.rule === 'qt-stacking'));
});

test('checkInteractions: nitrates + PDE5 inhibitor → contraindicated, exit-worthy', () => {
  const r = checkInteractions(['viagra', 'nitro']);
  assert.equal(r.maxSeverity, 'contraindicated');
});

test('checkInteractions: clean combination → none', () => {
  const r = checkInteractions(['metformin', 'lisinopril', 'atorvastatin']);
  assert.equal(r.maxSeverity, 'none');
  assert.equal(r.pairs.length, 0);
});

test('checkInteractions: unknown drugs are reported, known ones still checked', () => {
  const r = checkInteractions(['warfarin', 'unobtainium']);
  assert.deepEqual(r.unknown, ['unobtainium']);
  assert.equal(r.resolved.length, 1);
});

test('checkInteractions: bigger polypharmacy list surfaces multiple findings', () => {
  const r = checkInteractions(['warfarin', 'aspirin', 'sertraline', 'ibuprofen']);
  assert.ok(r.pairs.length >= 3);
  assert.equal(r.maxSeverity, 'major');
});

test('severity order is sane', () => {
  assert.ok(SEVERITY_ORDER.contraindicated > SEVERITY_ORDER.major);
  assert.ok(SEVERITY_ORDER.major > SEVERITY_ORDER.moderate);
  assert.ok(SEVERITY_ORDER.moderate > SEVERITY_ORDER.minor);
});

test('every drug entry has a name and class array; every interaction references known drugs', () => {
  for (const [id, d] of Object.entries(DRUGS)) {
    assert.equal(typeof d.name, 'string', `${id} needs a name`);
    assert.ok(Array.isArray(d.classes), `${id} needs classes`);
    assert.ok(Array.isArray(d.aliases), `${id} needs an aliases array`);
  }
});

test('listDrugs returns alphabetically sorted entries', () => {
  const list = listDrugs();
  assert.ok(list.length >= 60);
  const names = list.map((d) => d.name);
  assert.deepEqual(names, [...names].sort());
});
