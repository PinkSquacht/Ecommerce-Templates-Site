# Bootstrap Studio Setup Guide

## Goal
Use Bootstrap Studio for visual design while keeping this codebase as the React/Vite production app.

## Current Integration
- Bootstrap CSS/JS is loaded globally in the app entrypoint.
- Studio handoff route is available at `/studio`.
- Design assets folder exists at `src/design/bootstrap-studio/`.

## Folder Convention
- `src/design/bootstrap-studio/css/`:
  - Put exported Studio stylesheets here.
  - Start with `studio-overrides.css` and add more files as needed.
- `src/design/bootstrap-studio/js/`:
  - Place optional Studio-side helper scripts for reference.
- `src/design/bootstrap-studio/assets/`:
  - Place exported images/fonts/icons used by Studio layouts.

## Recommended Workflow
1. Build page visually in Bootstrap Studio.
2. Export HTML/CSS/assets.
3. Copy CSS and assets into the folders above.
4. Convert exported HTML blocks into JSX inside `src/veiws/StudioDesign.tsx`.
5. Split stable sections into reusable components under `src/components/`.
6. Reuse the same classes from Studio CSS to preserve design fidelity.

## Important Notes
- Scope Studio-specific styles under `.studio-root` where possible.
- Avoid editing generated Studio CSS directly after major exports; append overrides in a separate file.
- Keep interactive behavior in React handlers rather than raw inline scripts.

## Next Step
When your Studio layout is finalized, move the best sections from `/studio` into the primary routes and component library.
