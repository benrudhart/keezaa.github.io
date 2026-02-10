# Legacy JS/Vendor Upgrade Follow-up (Optional)

This follow-up is intentionally separated from legal/content updates to keep risk low.

## Goal

Safely modernize legacy JavaScript/vendor assets while preserving current landing-page behavior.

## Current Legacy Assets In Scope

- `js/jquery-3.2.1.min.js`
- `js/plugins.js` (bundled third-party plugins)
- `js/modernizr.js` (3.3.1 custom build)
- `js/pace.min.js` (1.0.0)

## Known Runtime Dependencies

`js/main.js` currently depends on plugin behavior from `plugins.js`, including:

- `waypoint` section activation
- `slick` sliders (`.about-desc__slider`, `.testimonials__slider`)
- `AOS` scroll animations
- `ajaxChimp` newsletter form behavior
- additional utility/lightbox/parallax behavior bundled in `plugins.js`

## Safe Upgrade Strategy

1. **Baseline capture**
   - Open `index.html` and record behavior with short screen capture or screenshots.
   - Record browser console output as baseline (expected: no uncaught errors).
2. **Upgrade one dependency group at a time**
   - Start with `jQuery` minor/patch-safe upgrade path first.
   - Re-test after each change before touching other vendor bundles.
3. **Handle bundle compatibility**
   - Verify `plugins.js` compatibility against upgraded `jQuery`.
   - If incompatibilities appear, replace only affected plugins with maintained versions rather than rewriting all at once.
4. **Re-evaluate `modernizr` and `pace`**
   - Keep only if still needed by current UX.
   - If removed/replaced, do so in separate PR-sized changes with smoke checks.
5. **Preserve rollback safety**
   - Keep each upgrade as isolated commit(s) so regressions can be reverted quickly.

## Smoke Test Checklist (Run After Each Step)

- Page loads fully; preloader completes and content is visible.
- No uncaught errors in browser console on initial load and basic interaction.
- Header menu toggle opens/closes correctly on narrow viewport.
- Smooth-scroll navigation works and active section highlighting updates while scrolling.
- About and testimonials sliders initialize and can slide without layout breakage.
- AOS animations still trigger on scroll.
- Newsletter form still validates/submits and failure/success messages render.
- "Back to top" button visibility and click behavior still work.
- Any lightbox/video trigger still opens and closes correctly.
- Final sanity check on latest Chrome and Safari.

## Suggested Execution Order

1. Upgrade `jQuery` only and run smoke checks.
2. Resolve plugin incompatibilities in `plugins.js` (targeted replacements if needed).
3. Reassess/remove/replace `modernizr` and `pace`.
4. Final full smoke pass and deploy verification.
