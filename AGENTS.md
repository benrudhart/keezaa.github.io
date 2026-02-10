# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project Overview

- Repo type: static marketing website
- Core stack: plain HTML, CSS, and JavaScript
- Key entry point: `index.html`
- Supporting pages: `privacy.html`, `imprint.html`, `appPrivacy.html`, `appTOS.html`

## Repository Structure

- `index.html` and other root `.html` files: page markup and content
- `css/`: styling (`base.css`, `main.css`, `vendor.css`, icon/font assets)
- `js/`: client-side scripts (`main.js`, `plugins.js`, vendor scripts)
- `images/` and root icons/favicons: static media assets

## Editing Guidelines

- Keep dependencies minimal; prefer vanilla HTML/CSS/JS over introducing frameworks.
- Preserve existing file organization and naming conventions.
- Make focused, small changes; avoid broad refactors unless explicitly requested.
- Keep compatibility in mind for static hosting (no build step assumptions).
- Do not modify generated/vendor assets unless the task explicitly requires it.

## HTML Conventions

- Use semantic tags where possible.
- Keep indentation and formatting consistent with surrounding code.
- Preserve existing metadata, SEO, and social tags unless updating them is part of the task.

## CSS Conventions

- Prefer extending `css/main.css` for site-specific styling.
- Reuse existing utility/pattern classes before adding new ones.
- Avoid aggressive global overrides that can affect unrelated sections.

## JavaScript Conventions

- Prefer small, defensive DOM updates.
- Avoid introducing heavy runtime dependencies.
- Keep behavior progressive: page should remain usable if scripts fail.

## Verification Checklist

After changes, agents should:

1. Review changed files for accidental formatting or unrelated edits.
2. Verify links, image paths, and asset references are still correct.
3. Sanity-check key pages in a browser (`index.html` plus any touched page).
4. Confirm no secrets or environment-specific values were introduced.

## Git Hygiene

- Do not rewrite history unless explicitly requested.
- Keep commit messages concise and outcome-oriented when commits are requested.
- Do not commit unrelated local changes.
