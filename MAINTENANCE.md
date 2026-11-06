# Profile maintenance

`README.md` is the source. `PROFILE-STATIC.md` is generated from it.

## Content

The profile describes SchoolPro, hh_mogger and ANOMIA using information already present in the public profile. SchoolPro's 100+ paying subscribers and production start in May 2025 were reconfirmed by the owner in November 2026. These business figures are edited manually; the GitHub workflow does not estimate them.

The number of database migrations was removed: it describes an implementation detail rather than a product result. The prose uses short project descriptions instead of slogans.

## Artwork

The SVGs use graphite and green with matching light and dark palettes. `<picture>` selects phone layouts below 600px and the appropriate color theme. All fonts are system fonts and every asset is committed to this repository.

Two illustrations animate: the header and the SchoolPro request flow. They describe a sequence, not live traffic. CSS honors `prefers-reduced-motion`; the static profile links to separate SVGs with no keyframes or moving objects. Text and contact links remain readable without images.

## GitHub activity

`.github/workflows/profile.yml` refreshes activity daily at 05:17 UTC (10:17 in Almaty), on relevant pushes, and on manual dispatch. GitHub can delay scheduled workflows.

The updater reads the same public contribution calendar visible at <https://github.com/users/Keysheero/contributions>. It does not read private repositories or require a personal access token. If private contribution counts are already visible on the public profile, they are included exactly as GitHub displays them; repository names are never collected.

`data/activity.json` holds the date range, daily counts, monthly totals and snapshot date. Contributions are counted over the past year ending on the UTC snapshot date. The first and last monthly bars may represent partial months. Active days are dates with at least one contribution.

The parser checks every date and count. Unexpected HTML, a missing tooltip, duplicate dates or a failed request stop the job before any new snapshot is committed. The last successful artwork stays visible. GitHub may disable scheduled workflows after extended repository inactivity; if needed, re-enable this workflow in Actions and run it manually.

## Build and verify

Node.js 24 is used in CI. No npm dependencies are required.

```sh
node --test scripts/activity.test.cjs
node scripts/update-activity.cjs
node scripts/build-assets.cjs
node scripts/build-static-profile.cjs
node scripts/check-profile.cjs
```

To change only the design offline, skip `update-activity.cjs` and build from the saved snapshot. Do not edit generated SVGs or the static profile directly. Keep the `alt="GitHub activity:…"` prefix in the README; the generator updates its totals.

Browser verification covers both themes at desktop and phone widths, source selection, loaded images, text bounds inside SVGs and reduced-motion behavior.

## History and rollback

The previous complete design is commit `bb63f3e`. Earlier versions remain under the existing `backup/profile-before-2026-09-24`, `backup/profile-before-interactions-2026-09-24`, `release/profile-design-2026-09-24` and `release/profile-interactions-2026-09-24` tags.

To undo this redesign, revert its commit on `main` and push the revert. Do not reset or force-push shared history. Reverting it also removes the scheduled activity workflow.
