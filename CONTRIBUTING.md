# Contributing to drugsafe

Drug-safety data lives or dies by its evidence quality. The rules below are strict on purpose.

## Ground rules

1. **Zero dependencies.** Runtime and devDependencies stay at `0`. Tests run on `node:test`.
2. **Only high-confidence findings.** Every new pair needs at least one solid
   source: FDA/EMA label, Stockley's, or a peer-reviewed review. Anecdotal case
   reports alone don't qualify.
3. **Every entry carries mechanism + effect + management.** "Don't combine" is
   not enough — say why and what to do instead.
4. **Class rules over copy-paste.** If 5 statins behave the same with a CYP3A4
   inhibitor, extend `CLASS_RULES` instead of writing 5 near-identical pairs.
5. **Brands are aliases, not new drugs.** Add alias strings to the existing entry.
6. **Severity discipline:** `contraindicated` only for absolute label
   contraindications. When in doubt, `major`.

## Workflow

```bash
npm test
```

- One drug or one interaction family per PR.
- Run `npm run start -- --list` to confirm aliases resolve.
- Add a test in `test/engine.test.js` for any new rule (fires when expected,
  does NOT fire for unrelated drugs).

## Reporting a wrong entry

Open an issue labeled `data-error` with the pair, what we claim, and the
correcting source. Data errors are triaged before features.

## License

By contributing you agree your contributions are licensed under the MIT License.
