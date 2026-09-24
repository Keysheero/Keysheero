# Profile design

The profile lives in `README.md`. All artwork is stored in `assets/`; it makes no third-party image requests and needs no scheduled workflows.

- Graphite `#101715`, mint `#C5F277`, warm white `#F3F5ED`, paper `#E9EDDF`.
- Desktop and mobile artwork use native `<picture>` sources at a 600px breakpoint.
- The hero illustrates a request, application logic, data, and response in a 12-second cycle. It remains legible when motion is disabled and respects `prefers-reduced-motion`.
- Each project's disclosure contains a four-step animated flow. These illustrate workflows; they are not live activity or telemetry.
- Reduced-motion sources precede mobile sources. `PROFILE-STATIC.md` offers a separate view with static artwork for readers who want to disable motion manually.
- Project anchors, next-project links, and contextual email subjects use native links. Opening a disclosure does not necessarily restart an already-loaded SVG animation.
- Project details use native disclosures. Core text and contact links work without images.
- Text and metrics come from the profile before the redesign; update them when the underlying project changes.

## Editing

Edit prose in `README.md`. Regenerate artwork and the static mirror with:

```sh
node scripts/build-assets.cjs
node scripts/build-tours.cjs
node scripts/build-static-profile.cjs
```

Node.js is the only requirement; no packages are needed. The architecture diagram `assets/schoolpro.svg` is edited directly. Keep alt text in sync with artwork. Do not edit `PROFILE-STATIC.md` independently; it is generated from `README.md`.

## Rollback

The original profile is preserved at `backup/profile-before-2026-09-24` (commit `bdf1875`). The approved first redesign is preserved at `backup/profile-before-interactions-2026-09-24` (commit `a58e6b9`). The interaction upgrade is tagged `release/profile-interactions-2026-09-24`.

To remove only the new interactions and restore the first redesign, run these commands from a clean checkout:

```sh
git fetch origin --tags
git switch main
git pull --ff-only
git revert --no-edit release/profile-interactions-2026-09-24
git push origin main
```

To also return to the original profile, then revert `release/profile-design-2026-09-24` and push. Revert the interaction upgrade first. If later commits change the same files, review any conflicts before pushing. Do not force-push or reset the branch. Separate Git bundles of both earlier versions were saved locally.
