# 💊 drugsafe

[![CI](https://github.com/Dukk11/drugsafe/actions/workflows/ci.yml/badge.svg)](https://github.com/Dukk11/drugsafe/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)

**Drug interaction checking from the command line.** Curated major interactions +
a rule engine for class-level hazards (FDA boxed warnings, "triple whammy" AKI,
serotonin syndrome, QT stacking). Brand names welcome. Zero dependencies.

> ⚠️ **Disclaimer** — Decision *support* for education, research, and prototyping.
> Not a medical device, not a substitute for a full drug information system
> (Micromedex / Lexicomp / UpToDate). Always verify before patient care.

## Install

```bash
npm install -g drugsafe
```

## CLI

```bash
$ drugsafe warfarin ibuprofen aspirin
Checked: Warfarin + Ibuprofen + Aspirin
────────────────────────────────────────────────────────────────

[MAJOR] Ibuprofen + Warfarin
  Mechanism : Pharmacodynamic (platelet inhibition + gastric mucosal injury)
  Effect    : Additive bleeding risk, GI hemorrhage
  Management: Prefer acetaminophen/paracetamol; gastroprotection + INR monitoring

[MAJOR · triple-whammy] RAAS blocker + diuretic + NSAID — acute kidney injury
  ...

────────────────────────────────────────────────────────────────
2 interaction pair(s), 1 group warning(s) — highest severity: MAJOR
```

```bash
$ drugsafe --json oxycontin xanax     # machine-readable output
$ drugsafe --list                     # all 70 supported drugs + aliases
$ echo $?                             # 1 = moderate/major found, 2 = contraindicated
```

Brand names resolve automatically: `coumadin`, `advil`, `bactrim`, `viagra`,
`zocor`, `prozac`, `lasix`, … (~150 aliases).

## Library API

```js
import { checkInteractions } from 'drugsafe';

const r = checkInteractions(['warfarin', 'sertraline', 'ibuprofen']);
r.maxSeverity;   // 'major'
r.pairs;         // [{ a, b, severity, mechanism, effect, management, source, refs }]
r.groupHits;     // [{ rule: 'triple-whammy', drugs: [...], management, refs }]
r.unknown;       // inputs that could not be resolved — always check this
```

## How the engine thinks

Three evidence layers, most specific wins:

1. **Curated pairs** (~45) — hand-picked, high-confidence interactions with
   mechanism, effect, and management. E.g. warfarin × amiodarone (CYP2C9/3A4),
   nitrates × PDE5 inhibitors (contraindicated), simvastatin × clarithromycin.
2. **Class rules** (10) — hazard patterns like opioid + benzodiazepine
   (FDA boxed warning 2017), DOAC + NSAID bleeding, SSRI + MAOI, RAAS-blocker +
   spironolactone hyperkalemia.
3. **Group rules** (3) — whole-list hazards: **serotonin syndrome** (≥ 2
   serotonergic drugs, Hunter-criteria reference), **QT stacking** (≥ 2
   QT-prolongers, CredibleMeds), and the **triple whammy** (RAAS blocker +
   diuretic + NSAID → AKI, Lapi BMJ 2013).

Each finding carries its mechanism, clinical effect, and management note —
and where possible a citation to the primary source.

## Scope & honest limits

This is a **starter dataset**: 70 well-known drugs, only high-confidence
findings, no dose dependence, no pharmacogenomics yet. Contributions that add
cited pairs are the whole point — see [CONTRIBUTING.md](CONTRIBUTING.md).

## Testing

```bash
npm test    # engine rules, alias resolution, exit-code behavior
```

CI matrix: Linux/macOS/Windows × Node 18/20/22.

---

Built by Duk · [dukdev.com](https://dukdev.com) · MIT licensed
