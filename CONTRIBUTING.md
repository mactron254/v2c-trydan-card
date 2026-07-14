# Contributing

Thanks for improving V2C Trydan Card.

## Development setup

Use Node.js 20+ and pnpm 11.5.1:

```powershell
corepack pnpm@11.5.1 install --frozen-lockfile
corepack pnpm@11.5.1 check
```

Run `corepack pnpm@11.5.1 docs:capture` after visual/editor changes. It requires Edge or Chrome and FFmpeg; both are development-only tools.

## Pull requests

- Branch from `main` and keep changes focused.
- Add tests for behavior changes.
- Preserve the public YAML contract unless a migration is explicitly designed.
- Update English and Spanish documentation together.
- Never commit Home Assistant tokens, entity exports, SSIDs or private IPs.
- Confirm CI and HACS validation pass.

## Project structure

- `src/`: card, editor, localization, services and canonical SVG assets.
- `tests/`: unit and DOM contracts.
- `demo/`: privacy-safe visual laboratory.
- `docs/`: configuration, media, release and support material.
- `specs/`: product specifications and implementation records.

Technical attribution order used by this repository: Codex first, Marco `@mactron254` second.