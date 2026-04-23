# Preview Page Fix Playbook

## Goal
Make the Preview page feel clearly different for each template and confirm it is stable across desktop and mobile.

## Scope
This playbook focuses on:
- Template layout selection and rendering logic
- Template metadata wiring
- Preview page styling coverage
- Validation and acceptance checks

## Files to Touch
- src/veiws/ClientPreview.tsx
- src/config/storeTemplates.ts
- src/index.css
- src/contexts/StorefrontContext.tsx
- src/App.tsx

## Step-by-Step

### 1. Confirm the Preview route is active
1. Open src/App.tsx.
2. Verify there is a route for /preview.
3. Verify it renders ClientPreview.
4. If missing, add the route and import.

Expected result:
- Navigating to /preview loads the preview screen.

### 2. Confirm template state is shared correctly
1. Open src/contexts/StorefrontContext.tsx.
2. Verify activeTemplateId and setActiveTemplateId are exposed by context.
3. Verify CSS variables and data-store-template are applied in the effect.
4. In src/veiws/ClientPreview.tsx, verify the template select uses activeTemplateId and setActiveTemplateId.

Expected result:
- Changing template from the Preview select updates the page immediately.

### 3. Validate template metadata coverage
1. Open src/config/storeTemplates.ts.
2. For each template, confirm these fields are present and unique enough:
   - previewLayout
   - productCardStyle
   - designDirection
   - templateHighlights
   - proofSignals
3. Make sure no two templates accidentally share the same previewLayout unless intentional.

Expected result:
- Every template maps to a clear layout intent.

### 4. Verify render logic covers all layouts
1. Open src/veiws/ClientPreview.tsx.
2. In renderPreviewLayout, verify there is a case for every previewLayout value.
3. Confirm each case returns noticeably different structure, not only different text.
4. Confirm default case is safe.

Expected result:
- No layout value falls through without a matching visual block.

### 5. Verify CSS classes exist for each layout
1. Open src/index.css.
2. Confirm class coverage for each layout block, including:
   - client-preview-layout variants
   - client-preview section blocks used in each case
   - responsive behavior inside the mobile media query
3. Confirm desktop and mobile grid definitions are intentional and not collapsing everything to one identical stack.

Expected result:
- The Preview page keeps distinct structure per template at all breakpoints.

### 6. Increase differentiation where needed
If templates still feel too similar, apply one or more changes per template:
1. Change section composition, not only color or typography.
2. Vary count and shape of content blocks.
3. Use template-specific hierarchy for hero, proof, and gallery sections.
4. Introduce template-specific spacing rhythm and card density.
5. Keep interactions meaningful and sparse.

Expected result:
- A side-by-side screenshot comparison clearly shows different layouts.

### 7. Keep product snapshot behavior stable
1. In src/veiws/ClientPreview.tsx, verify previewProducts is filtered by featuredCategories.
2. Confirm the capped list still renders when templates change.
3. If data is sparse, keep fallback-friendly behavior from ProductContext intact.

Expected result:
- Preview gallery always renders a reliable product sample.

### 8. Run validation
1. Run npm run build.
2. Start dev server and test /preview manually.
3. Cycle through every template in the preview select.
4. Verify no console errors and no broken sections.

Expected result:
- Build passes and all template previews render correctly.

### 9. Final acceptance checklist
- Preview route loads from navigation and direct URL.
- Template switch updates layout immediately.
- All previewLayout values have unique structure.
- Responsive layout remains usable on mobile.
- Product gallery and proof blocks always render.
- Build completes without errors.

## Quick Triage Map
- Preview page not loading: check route wiring in src/App.tsx.
- Template switch not updating: check Storefront context usage in ClientPreview.
- Layouts look identical: check previewLayout uniqueness and structural CSS.
- Cards look right but page still similar: revise section composition per template.
- Mobile looks broken: review media query rules for client-preview classes.

## Notes
Use this as the source of truth when updating Preview behavior, so future edits keep the same verification flow.