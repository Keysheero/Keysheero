# Profile design

The profile lives in `README.md`. All artwork is stored in `assets/`; it makes no third-party image requests and needs no scheduled workflows.

- Graphite `#101715`, mint `#C5F277`, warm white `#F3F5ED`, paper `#E9EDDF`.
- Desktop and mobile artwork use native `<picture>` sources at a 600px breakpoint.
- The hero uses CSS inside the SVG for slow signal motion. It remains legible when motion is disabled and respects `prefers-reduced-motion`.
- Project details use native disclosures. Core text and contact links work without images.
- Text and metrics come from the profile before the redesign; update them when the underlying project changes.

## Editing

Edit prose in `README.md`. Most artwork can be regenerated with `node scripts/build-assets.cjs` (Node.js, no packages required). The architecture diagram `assets/schoolpro.svg` is edited directly. Keep alt text in sync with artwork.

## Rollback

The original profile is preserved at `backup/profile-before-2026-09-24` (commit `bdf1875`). The redesign is tagged `release/profile-design-2026-09-24`.

From a clean checkout of this repository, revert the redesign without rewriting history:

```sh
git fetch origin --tags
git switch main
git pull --ff-only
git revert --no-edit release/profile-design-2026-09-24
git push origin main
```

If later commits change the same files, review any conflicts before pushing. Do not force-push or reset the branch. A separate Git bundle of the original history was also saved locally when the redesign was prepared.
