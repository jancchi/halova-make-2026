# Community Request System Frontend (Nuxt 3) — Editorial 0100.vc Style

## TL;DR

> **Quick Summary**: Build a production-ready Nuxt 3 frontend (frontend/ only) for a community help-request system with strict black/white editorial design, 4-step form flow, API-contract integration, and resilient fallback behavior while backend endpoints are still pending.
>
> **Deliverables**:
> - Complete Nuxt page flow: Home → Request Form (4 steps) → Thank You
> - Reusable UI/form components, Pinia state flow, Axios API layer, toast/error system
> - Fully responsive, animation-polished, accessible experience with agent-executed QA evidence
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 execution waves + final verification wave
> **Critical Path**: T1 → T4 → T5 → T13 → T17 → T18 → T22 → F1-F4

---

## Context

### Original Request
User requested a full frontend plan inspired by 0100.vc visual language (black/white, serif display typography, minimal dividers, no rounded cards), implemented with Vue/Nuxt, and scoped strictly to `frontend/`. Backend may be referenced but is not yet built for target endpoints.

### Interview Summary
**Key Discussions**:
- Planning-only request confirmed (no implementation in this step).
- Execution must be constrained to `frontend/` changes.
- Nuxt 3 + Vue 3 was explicitly requested.

**Research Findings**:
- Existing frontend is a minimal Nuxt starter (`app.vue`, `pages/index.vue`, `composables/useApi.ts`, `nuxt.config.ts`, Tailwind module).
- Existing backend currently exposes template endpoints only (`/api/ping`, auth example), so `/api/v1/categories|requests|stats` must be treated as contract-first with graceful fallbacks.

### Gap Review (self-resolved)
**Identified Gaps**:
- No test infrastructure currently configured in frontend package.
- Existing composable uses `$fetch`; requested design specifies Axios-style API module pattern.
- No route/page structure yet for form multi-step flow.

**How resolved in this plan**:
- Keep automated-test setup optional (not mandatory), but enforce detailed agent-executed QA scenarios for every task.
- Introduce Axios-based API layer while preserving Nuxt runtime-config conventions.
- Define Nuxt-native route/component layout equivalent to requested Vue structure.

---

## Work Objectives

### Core Objective
Deliver an editorial-grade Nuxt 3 frontend that can run immediately in dev mode, integrates against planned backend contracts, and remains usable when backend endpoints are unavailable.

### Concrete Deliverables
- Nuxt application shell with fixed minimalist header/footer and mobile nav.
- Home page with hero, stats, category list, process section, CTA.
- Multi-step request form with persistent state, validation, review/submit flow.
- Success/thank-you flow with request-id rendering.
- API modules (`axios`, `categories`, `requests`, `stats`) and robust error-to-toast UX.
- Responsive behavior (desktop/tablet/mobile), motion system, accessibility baseline.

### Definition of Done
- [ ] `npm install && npm run lint && npm run build` succeeds in `frontend/`.
- [ ] All required pages render with specified editorial visual system.
- [ ] Form flow works end-to-end with both simulated success and failure paths.
- [ ] API loading/error/fallback states are present for categories/stats/submit.
- [ ] Evidence files for each task scenario exist in `.sisyphus/evidence/`.

### Must Have
- Strict black/white editorial style and typography pairing (serif display + sans UI/body).
- No rounded-card SaaS look; divider-based layout language.
- Underline-style inputs and outlined/inverted button interactions.
- 4-step form with step indicator, validations, review/edit, and submit feedback.
- Frontend-only scope.

### Must NOT Have (Guardrails)
- No backend implementation or backend schema changes.
- No admin/auth dashboards, AI categorization logic, integrations (Notion/email), or matching engine.
- No bright colorful UI theme, gradients, glassmorphism, heavy shadow cards, or rounded components.
- No dependency on live backend availability for basic UI operability.

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — all verifications are agent-executed with tool-driven assertions and evidence capture.

### Test Decision
- **Infrastructure exists**: NO dedicated frontend test runner currently configured.
- **Automated tests**: Tests-after/minimal (optional extension); required baseline is lint + build + scenario QA.
- **Framework**: Nuxt build/lint commands + Playwright/CLI scenarios for behavior verification.

### QA Policy
Each task includes at least:
- 1 happy-path scenario
- 1 error/edge scenario
- concrete selectors/data/assertions
- evidence output path under `.sisyphus/evidence/task-{N}-...`

Execution tools:
- **UI verification**: Playwright skill (DOM assertions, interactions, screenshots)
- **CLI/build verification**: Bash (install, lint, build, logs)
- **API behavior verification**: Browser network assertions / mocked route assertions / offline fallback behavior

---

## Execution Strategy

### Parallel Execution Waves

```text
Wave 1 (Foundation — start immediately)
├── T1: Nuxt dependency/config baseline
├── T2: Global design tokens + typography + base styles
├── T3: App shell + header/footer + responsive nav
├── T4: Axios API layer + endpoint modules + fallback contracts
├── T5: Pinia stores + composables for form/request lifecycle
└── T6: Reusable UI primitives (inputs, pills, tags, toast)

Wave 2 (Home experience — after foundation)
├── T7: Hero section + reveal animation
├── T8: Stats section with API + skeleton + placeholder fallback
├── T9: Categories section with API list + stagger + hover shift
├── T10: “Ako to funguje” + CTA section components
├── T11: Home page composition + route-level integration
└── T12: Global toast orchestration + API error mapping

Wave 3 (Form flow — after stores/UI/api foundation)
├── T13: Request form page layout + step container + transitions
├── T14: Step 1 Identity component
├── T15: Step 2 Need component (category chooser + text fields)
├── T16: Step 3 Details component (urgency/deadline/budget/help/tags)
├── T17: Step 4 Review + submit flow + loading/success/error handling
└── T18: SuccessScreen + ThankYou route + reset/new request flow

Wave 4 (Cross-cutting hardening)
├── T19: Responsive typography/layout tuning across breakpoints
├── T20: Accessibility + keyboard/focus + reduced-motion support
├── T21: Offline/timeout/422 fallback hardening end-to-end
└── T22: Final integration polish + lint/build/dev QA pass + frontend README note

Wave FINAL (parallel audits, then user approval)
├── F1: Plan compliance audit
├── F2: Code quality review
├── F3: Real scenario QA replay
└── F4: Scope fidelity check
→ Present findings → wait for explicit user OKAY
```

### Dependency Matrix (all tasks)

- **T1**: blocked by — none | blocks T4, T5, T6, T11, T12
- **T2**: blocked by — none | blocks T3, T6, T7, T8, T9, T10, T19
- **T3**: blocked by T2 | blocks T11, T13, T19, T20
- **T4**: blocked by T1 | blocks T8, T9, T12, T15, T17, T21
- **T5**: blocked by T1 | blocks T13, T14, T15, T16, T17
- **T6**: blocked by T1, T2 | blocks T7, T9, T13, T14, T15, T16, T17, T18
- **T7**: blocked by T2, T6 | blocks T11, T19
- **T8**: blocked by T2, T4 | blocks T11, T19
- **T9**: blocked by T2, T4, T6 | blocks T11, T15, T19
- **T10**: blocked by T2 | blocks T11, T19
- **T11**: blocked by T1, T3, T7, T8, T9, T10 | blocks T22
- **T12**: blocked by T1, T4 | blocks T17, T21
- **T13**: blocked by T3, T5, T6 | blocks T14, T15, T16, T17
- **T14**: blocked by T5, T6, T13 | blocks T17
- **T15**: blocked by T4, T5, T6, T9, T13 | blocks T17
- **T16**: blocked by T5, T6, T13 | blocks T17
- **T17**: blocked by T4, T5, T6, T12, T13, T14, T15, T16 | blocks T18, T21
- **T18**: blocked by T6, T17 | blocks T22
- **T19**: blocked by T2, T3, T7, T8, T9, T10 | blocks T22
- **T20**: blocked by T3 | blocks T22
- **T21**: blocked by T4, T12, T17 | blocks T22
- **T22**: blocked by T11, T18, T19, T20, T21 | blocks FINAL WAVE

### Agent Dispatch Summary

- **Wave 1 (6 tasks)**: T1/T4/T5 `unspecified-high`, T2/T3/T6 `visual-engineering`
- **Wave 2 (6 tasks)**: T7/T8/T9/T10/T11 `visual-engineering`, T12 `unspecified-high`
- **Wave 3 (6 tasks)**: T13/T17 `unspecified-high`, T14/T15/T16/T18 `visual-engineering`
- **Wave 4 (4 tasks)**: T19/T20 `visual-engineering`, T21/T22 `unspecified-high`
- **Final (4 tasks)**: F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [x] 1. Nuxt foundation + dependencies + runtime contracts

  **What to do**:
  - Add/align Nuxt dependencies for requested stack (`axios`, `pinia`, `@pinia/nuxt`, `pinia-plugin-persistedstate`, optional `@vueuse/core`).
  - Update `frontend/nuxt.config.ts` with modules, runtime public API base (`NUXT_PUBLIC_API_BASE`), and global CSS registration.
  - Create baseline project folders for Nuxt-native architecture: `components/{layout,ui,form}`, `stores`, `api`, `composables`, `assets/css`, `pages`.

  **Must NOT do**:
  - Do not introduce Vue Router manual setup (Nuxt file-based routing only).
  - Do not modify anything outside `frontend/`.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: touches Nuxt configuration, dependencies, and architecture bootstrap.
  - **Skills**: `[]`
    - No specialized skill required; standard Nuxt setup.
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed until UI verification tasks.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T2, T3, T4, T5, T6)
  - **Blocks**: T4, T5, T6, T11, T12
  - **Blocked By**: None

  **References**:
  - `frontend/package.json` - current dependency baseline to extend.
  - `frontend/nuxt.config.ts` - runtime config pattern and module registration point.
  - `README.md` - confirms frontend runtime expectations (`make dev-frontend`, Nuxt 3 baseline).
  - Nuxt docs: `https://nuxt.com/docs/getting-started/configuration` - canonical config structure.

  **Acceptance Criteria**:
  - [ ] `frontend/package.json` contains required frontend dependencies.
  - [ ] `frontend/nuxt.config.ts` includes Pinia module and public API base config.
  - [ ] New directory scaffold exists for all target concerns.
  - [ ] `cd frontend && npm install` completes successfully.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Foundation boots with new Nuxt config
    Tool: Bash
    Preconditions: frontend dependencies installed
    Steps:
      1. Run `cd frontend && npm run dev`
      2. Wait until Nuxt shows local URL in terminal
      3. Confirm process exits cleanly after stop signal (Ctrl+C)
    Expected Result: Dev server starts without module/config errors
    Failure Indicators: startup exception, missing module, runtimeConfig parse error
    Evidence: .sisyphus/evidence/task-1-nuxt-foundation.txt

  Scenario: Missing API env falls back safely
    Tool: Bash
    Preconditions: no `NUXT_PUBLIC_API_BASE` exported in shell
    Steps:
      1. Run `cd frontend && npm run build`
      2. Inspect output for successful build
    Expected Result: Build succeeds and fallback API base is compiled
    Failure Indicators: build fails due to undefined config/env access
    Evidence: .sisyphus/evidence/task-1-env-fallback.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-1-nuxt-foundation.txt`
  - [ ] `.sisyphus/evidence/task-1-env-fallback.txt`

  **Commit**: NO (groups with T2-T6 in Commit A)

- [x] 2. Global design tokens + editorial typography system

  **What to do**:
  - Implement global CSS tokens exactly as specified (`--color-bg`, `--color-text`, etc.) and spacing/typography scales.
  - Add Google font imports (`Playfair Display` + `DM Sans` or `Syne`) and utility classes for display/body/caps text roles.
  - Add base rules for sharp edges, divider language, link/button transitions, reduced color usage, and motion defaults.

  **Must NOT do**:
  - No colorful gradients/shadows.
  - No default rounded card system.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: typography hierarchy and visual language are core success criteria.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `writing`: not documentation work.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T3, T6, T7, T8, T9, T10, T19
  - **Blocked By**: None

  **References**:
  - `frontend/tailwind.config.js` - current theme extension entry point.
  - `frontend/pages/index.vue` - baseline page to replace with new type/layout system.
  - `https://www.0100.vc/` - visual reference for editorial contrast and spacing.
  - Google Fonts docs for chosen families.

  **Acceptance Criteria**:
  - [ ] Global style file(s) define all requested CSS variables.
  - [ ] Serif display + sans body fonts are loaded and used by class system.
  - [ ] Body defaults match muted text and line-height requirements.
  - [ ] Buttons/inputs default to sharp, minimal style and transition behavior.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Global tokens and typography render correctly
    Tool: Playwright
    Preconditions: dev server running
    Steps:
      1. Open `/`
      2. Evaluate computed style of `body` and `[data-testid="hero-title"]`
      3. Assert body font-family includes selected sans and hero includes selected serif
      4. Assert root CSS vars `--color-bg` and `--color-text` resolve to expected values
    Expected Result: Fonts + token values are active globally
    Failure Indicators: fallback fonts only, missing CSS vars, wrong color values
    Evidence: .sisyphus/evidence/task-2-typography.png

  Scenario: Sharp-edge guardrail is enforced
    Tool: Playwright
    Preconditions: home page rendered
    Steps:
      1. Query primary CTA and sample input selector
      2. Assert computed `border-radius` <= 2px
    Expected Result: No rounded SaaS styling appears
    Failure Indicators: border radius above allowed threshold
    Evidence: .sisyphus/evidence/task-2-sharp-edges.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-typography.png`
  - [ ] `.sisyphus/evidence/task-2-sharp-edges.png`

  **Commit**: NO (groups with T1, T3-T6)

- [x] 3. App shell layout with fixed header/footer + mobile menu

  **What to do**:
  - Build `components/layout/AppHeader.vue` and `AppFooter.vue` with thin divider system and fixed/sticky header behavior.
  - Implement desktop caps nav and mobile hamburger → slide-down navigation.
  - Wire app shell in `app.vue` (or Nuxt layout) so all pages inherit consistent chrome.

  **Must NOT do**:
  - No decorative icons/avatars/marketing illustrations.
  - No colored nav backgrounds beyond configured black/near-black palette.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: layout implementation with responsive behavior and visual precision.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `playwright`: reserved for verification, not implementation.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T11, T13, T19, T20
  - **Blocked By**: T2

  **References**:
  - `frontend/app.vue` - root composition entry for global shell.
  - `frontend/pages/index.vue` - currently page-only structure requiring shell wrapping.
  - `https://www.0100.vc/` - reference for sparse nav with thin separators.

  **Acceptance Criteria**:
  - [ ] Header height is 60px with divider and translucent/blurred dark background.
  - [ ] Desktop nav links are uppercase with opacity hover behavior.
  - [ ] Mobile menu toggles and closes on route click.
  - [ ] Footer exists and follows same divider language.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Desktop header behavior
    Tool: Playwright
    Preconditions: viewport 1440x900
    Steps:
      1. Open `/`
      2. Assert `[data-testid="app-header"]` has height `60px`
      3. Hover `[data-testid="nav-link-about"]` and assert opacity decreases
    Expected Result: Header style and hover behavior match spec
    Failure Indicators: wrong height, missing divider, no hover opacity change
    Evidence: .sisyphus/evidence/task-3-header-desktop.png

  Scenario: Mobile nav slide-down
    Tool: Playwright
    Preconditions: viewport 390x844
    Steps:
      1. Open `/`
      2. Tap `[data-testid="nav-toggle"]`
      3. Assert `[data-testid="mobile-nav-panel"]` becomes visible
      4. Tap first nav link and assert panel closes
    Expected Result: Mobile nav opens/closes correctly
    Failure Indicators: panel not visible, stuck open, unclickable links
    Evidence: .sisyphus/evidence/task-3-header-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-3-header-desktop.png`
  - [ ] `.sisyphus/evidence/task-3-header-mobile.png`

  **Commit**: NO (groups with T1, T2, T4-T6)

- [x] 4. Axios API layer + typed endpoint modules + contract fallbacks

  **What to do**:
  - Create `frontend/api/axios.ts` with timeout, JSON headers, and normalized error mapping (`message`, `status`, timeout/offline awareness).
  - Add endpoint modules: `frontend/api/categories.ts`, `frontend/api/requests.ts`, `frontend/api/stats.ts`.
  - Define shared types/interfaces for request payload and API responses; include fallback adapters for missing backend routes.

  **Must NOT do**:
  - Do not hard-fail the UI when `/api/v1/categories` or `/api/v1/stats` are unavailable.
  - Do not call non-existent backend-only features.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: API abstraction + resiliency contracts require careful error handling.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `visual-engineering`: task is service layer centric.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T8, T9, T12, T15, T17, T21
  - **Blocked By**: T1

  **References**:
  - `frontend/composables/useApi.ts` - existing API abstraction to evolve/replace.
  - `frontend/nuxt.config.ts` - runtime API base source.
  - `backend/main.py` - confirms current backend route reality.
  - Axios docs: `https://axios-http.com/docs/instance` - interceptor and timeout patterns.

  **Acceptance Criteria**:
  - [ ] Axios instance exists with base URL + timeout + interceptors.
  - [ ] Categories/requests/stats modules expose dedicated functions.
  - [ ] Timeout/offline/422 errors are normalized for UI consumption.
  - [ ] Category/stats requests can return fallback static data if API fails.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: API success mapping works
    Tool: Bash
    Preconditions: endpoint mocking or temporary local JSON server available
    Steps:
      1. Start app with API base pointing to mocked endpoints
      2. Trigger categories and stats fetch from UI
      3. Assert data appears in UI and no error toast is shown
    Expected Result: Axios modules parse and expose data correctly
    Failure Indicators: unhandled promise, malformed response usage, blank section
    Evidence: .sisyphus/evidence/task-4-api-success.txt

  Scenario: Timeout/offline maps to graceful error
    Tool: Playwright
    Preconditions: API base points to unreachable host
    Steps:
      1. Open `/`
      2. Wait for categories load attempt
      3. Assert toast `[data-testid="toast-root"]` appears with offline/timeout message
      4. Assert fallback category list is rendered
    Expected Result: User sees recoverable error + content fallback
    Failure Indicators: uncaught error overlay, empty section, crash
    Evidence: .sisyphus/evidence/task-4-api-offline.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-4-api-success.txt`
  - [ ] `.sisyphus/evidence/task-4-api-offline.png`

  **Commit**: NO (groups with T1-T3, T5-T6)

- [x] 5. Pinia stores + composables for request workflow state

  **What to do**:
  - Create `frontend/stores/formStore.ts` with requested `currentStep`, `totalSteps`, `isSubmitting`, `submittedId`, and `data` payload shape.
  - Implement actions: `nextStep`, `prevStep`, `goToStep`, `resetForm`, `submitForm`.
  - Add `frontend/stores/requestStore.ts` for category/stats/request listing state (loading/error/data buckets).
  - Add `frontend/composables/useRequestForm.ts` + `frontend/composables/useRequests.ts` wrappers for components.

  **Must NOT do**:
  - Do not keep critical form state as component-local-only refs.
  - Do not couple UI directly to raw axios calls.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: state lifecycle and submit orchestration are cross-cutting foundations.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `visual-engineering`: state logic first, not visual styling.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T13, T14, T15, T16, T17
  - **Blocked By**: T1

  **References**:
  - Prompt store contract section (`formStore.js` blueprint).
  - `frontend/composables/useApi.ts` - style of composable exposure currently used.
  - Pinia docs: `https://pinia.vuejs.org/core-concepts/`

  **Acceptance Criteria**:
  - [ ] Store state matches requested field keys and defaults.
  - [ ] All step navigation actions work with bounds checks.
  - [ ] `submitForm()` toggles `isSubmitting` and stores returned `id`.
  - [ ] Persisted state survives page reload.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Step data persists after refresh
    Tool: Playwright
    Preconditions: form route exists
    Steps:
      1. Fill name/email in step 1 and move to step 2
      2. Reload page
      3. Assert step remains 2 and entered values are still present
    Expected Result: persisted Pinia state rehydrates correctly
    Failure Indicators: step reset to 1, inputs cleared
    Evidence: .sisyphus/evidence/task-5-store-persist.png

  Scenario: Submit failure resets loading state
    Tool: Playwright
    Preconditions: submit endpoint unavailable
    Steps:
      1. Complete required fields and click submit
      2. Assert button text changes to submitting state then returns
      3. Assert error toast appears
    Expected Result: `isSubmitting` does not remain stuck true
    Failure Indicators: perpetual loading UI, missing error feedback
    Evidence: .sisyphus/evidence/task-5-submit-reset.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-5-store-persist.png`
  - [ ] `.sisyphus/evidence/task-5-submit-reset.png`

  **Commit**: NO (groups with T1-T4, T6)

- [x] 6. Reusable UI primitives (input/textarea/select/pills/tags/toast)

  **What to do**:
  - Implement `frontend/components/ui/BaseInput.vue`, `BaseTextarea.vue`, `BaseSelect.vue`, `RadioGroup.vue`, `TagInput.vue`, `ToastNotification.vue`.
  - Add strict underline input style and caps label formatting.
  - Add consistent error rendering (red underline + muted-to-error text below field).
  - Provide shared prop contracts for `modelValue`, `error`, `disabled`, `placeholder`.

  **Must NOT do**:
  - No rounded card wrappers, no shadow-heavy form controls.
  - No dependency on external UI kits that conflict with style system.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: component-level style consistency is central to visual fidelity.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `unspecified-high`: less service logic, mostly presentational components.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T7, T9, T13, T14, T15, T16, T17, T18
  - **Blocked By**: T1, T2

  **References**:
  - Prompt component list + component styling rules.
  - `https://www.0100.vc/` for interaction subtlety and sparse controls.

  **Acceptance Criteria**:
  - [ ] All six UI primitives exist and are consumed by form/home features.
  - [ ] Underline-only input style applied by default.
  - [ ] Toast supports dismiss and optional retry callback.
  - [ ] TagInput supports Enter-to-add and remove tag action.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Base input styling and focus state
    Tool: Playwright
    Preconditions: form page rendered
    Steps:
      1. Select `[data-testid="base-input-name"]`
      2. Assert top/left/right borders are absent and bottom border exists
      3. Focus input and assert bottom border color brightens
    Expected Result: underline aesthetic behaves per spec
    Failure Indicators: boxed input, no focus visual feedback
    Evidence: .sisyphus/evidence/task-6-input-style.png

  Scenario: Tag input add/remove edge handling
    Tool: Playwright
    Preconditions: step with tags control visible
    Steps:
      1. Type `fundraising` and press Enter
      2. Assert tag appears as pill with remove `×`
      3. Click remove and assert tag disappears
    Expected Result: tags mutate correctly with keyboard/mouse
    Failure Indicators: duplicated empty tags, non-removable tag
    Evidence: .sisyphus/evidence/task-6-tag-input.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-6-input-style.png`
  - [ ] `.sisyphus/evidence/task-6-tag-input.png`

  **Commit**: YES (Commit A)
  - Message: `feat(frontend-foundation): establish nuxt architecture, design system, api/store/ui primitives`
  - Files: `frontend/package.json`, `frontend/nuxt.config.ts`, `frontend/assets/**`, `frontend/api/**`, `frontend/stores/**`, `frontend/composables/**`, `frontend/components/ui/**`
  - Pre-commit: `cd frontend && npm run lint && npm run build`

- [x] 7. Home hero section with editorial headline and reveal motion

  **What to do**:
  - Build hero with 2-3 line oversized serif heading, muted subtitle, outline CTA, and trust microcopy.
  - Ensure section height is approximately 90vh with vertical centering.
  - Add one-time reveal animation at load (`translateY`, `opacity`, 0.8s ease-out).

  **Must NOT do**:
  - No hero image/video or decorative artwork.
  - No spring/bouncy animation easing.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: high-impact typography and animation timing.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T19
  - **Blocked By**: T2, T6

  **References**:
  - Prompt hero requirements.
  - `https://www.0100.vc/` for typography rhythm and whitespace cadence.

  **Acceptance Criteria**:
  - [ ] Hero is ~90vh and centered.
  - [ ] Title uses serif display class with large desktop sizing.
  - [ ] CTA text and trust microcopy match spec content.
  - [ ] Reveal animation executes smoothly on initial page load.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Hero layout and content correctness
    Tool: Playwright
    Preconditions: desktop viewport 1440x900
    Steps:
      1. Open `/`
      2. Assert `[data-testid="hero-section"]` min-height >= 85vh
      3. Assert `[data-testid="hero-cta"]` text equals `Zadať žiadosť →`
    Expected Result: hero hierarchy and CTA are correct
    Failure Indicators: compressed hero, missing CTA
    Evidence: .sisyphus/evidence/task-7-hero-layout.png

  Scenario: Reveal motion runs with expected final state
    Tool: Playwright
    Preconditions: cold load with animations enabled
    Steps:
      1. Sample hero title transform/opacity at ~0ms
      2. Wait 900ms
      3. Assert opacity is 1 and transform indicates no Y offset
    Expected Result: reveal transition completes
    Failure Indicators: title remains hidden or offset
    Evidence: .sisyphus/evidence/task-7-hero-motion.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-7-hero-layout.png`
  - [ ] `.sisyphus/evidence/task-7-hero-motion.png`

  **Commit**: NO (groups with T8-T12)

- [x] 8. Stats section with API load, skeletons, and fallback metrics

  **What to do**:
  - Implement stats section with caps label (“NAŠA KOMUNITA”), 4 metric cells desktop / 2 mobile.
  - Fetch from `/api/v1/stats`; display pulse skeleton while pending.
  - Render static placeholder metrics if endpoint fails or returns incompatible shape.

  **Must NOT do**:
  - No card components; maintain divider-only table-like appearance.
  - No hard dependency on backend readiness.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: strong typography + data state UI handling.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T19
  - **Blocked By**: T2, T4

  **References**:
  - Prompt stats section blueprint and typography scale.
  - `frontend/api/stats.ts` contract from T4.

  **Acceptance Criteria**:
  - [ ] 4 stat items render with big serif numbers and small muted labels.
  - [ ] Skeleton appears during load.
  - [ ] Placeholder data appears when API fails.
  - [ ] Divider layout adapts per breakpoint.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Stats render from successful API response
    Tool: Playwright
    Preconditions: mock/stub stats endpoint returns 4 entries
    Steps:
      1. Open `/`
      2. Wait for `[data-testid="stats-grid"]`
      3. Assert 4 children with number + label pattern
    Expected Result: data-driven stats show correctly
    Failure Indicators: wrong item count, missing labels
    Evidence: .sisyphus/evidence/task-8-stats-success.png

  Scenario: Stats endpoint fails and fallback appears
    Tool: Playwright
    Preconditions: stats endpoint returns 500/timeout
    Steps:
      1. Open `/`
      2. Assert loading skeleton appears first
      3. Assert fallback metrics are displayed after error handling
    Expected Result: section remains usable with fallback content
    Failure Indicators: blank section, crash, endless loader
    Evidence: .sisyphus/evidence/task-8-stats-fallback.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-8-stats-success.png`
  - [ ] `.sisyphus/evidence/task-8-stats-fallback.png`

  **Commit**: NO (groups with T7, T9-T12)

- [x] 9. Categories section with list rows, stagger reveal, hover translation

  **What to do**:
  - Implement “Ako ti môžeme pomôcť” section with list-row layout (order number, title, description, arrow).
  - Fetch categories via `/api/v1/categories`; show skeleton while loading.
  - Add staggered reveal delays and hover translateX(8px) effect.
  - On failure, render static fallback categories and muted “(offline režim)” text.

  **Must NOT do**:
  - Do not use card grid layout for categories.
  - Do not hide errors silently when fallback activates.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: list interaction and animation-driven section.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T15, T19
  - **Blocked By**: T2, T4, T6

  **References**:
  - Prompt categories section details (row anatomy + hover behavior).
  - `frontend/api/categories.ts` from T4.

  **Acceptance Criteria**:
  - [ ] Categories render as divider-separated rows with sequence numbers.
  - [ ] Loading skeleton is visible during API fetch.
  - [ ] Hover shift and staggered reveal animations are present.
  - [ ] Offline fallback list + hint text are displayed on API failure.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Categories rows render from API response
    Tool: Playwright
    Preconditions: categories endpoint returns at least 3 rows
    Steps:
      1. Open `/`
      2. Assert first row contains `01`, title text, description, and arrow marker
      3. Assert all rows are separated by top/bottom divider lines
    Expected Result: editorial list layout is correct
    Failure Indicators: card styling, missing metadata, no separators
    Evidence: .sisyphus/evidence/task-9-categories-success.png

  Scenario: Categories offline fallback and hover behavior
    Tool: Playwright
    Preconditions: categories endpoint unavailable
    Steps:
      1. Open `/`
      2. Assert `(offline režim)` muted note appears
      3. Hover fallback first row and assert transform includes +8px X translation
    Expected Result: fallback data remains interactive and styled
    Failure Indicators: empty state without fallback, no hover interaction
    Evidence: .sisyphus/evidence/task-9-categories-offline.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-9-categories-success.png`
  - [ ] `.sisyphus/evidence/task-9-categories-offline.png`

  **Commit**: NO (groups with T7, T8, T10-T12)

- [x] 10. “Ako to funguje” and final CTA sections

  **What to do**:
  - Add 3-step explanation section with large serif numeric markers and concise copy.
  - Add final centered CTA section with divider and outline button (“Začať →”).
  - Ensure no iconography and strict text-first composition.

  **Must NOT do**:
  - No decorative icon sets or illustrations.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: layout and typographic hierarchy section work.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T19
  - **Blocked By**: T2

  **References**:
  - Prompt “Ako to funguje” + CTA section specs.

  **Acceptance Criteria**:
  - [ ] 3-step block displays as 3 columns on desktop and 1 column on mobile.
  - [ ] CTA section includes divider, serif headline, and outline button with hover inversion.
  - [ ] Route navigation from CTA points to request form route.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Explainer section responsive behavior
    Tool: Playwright
    Preconditions: home page loaded
    Steps:
      1. Set viewport 1366x768 and assert 3 step columns in one row
      2. Set viewport 390x844 and assert single-column stack
    Expected Result: responsive layout follows spec
    Failure Indicators: desktop layout collapsing incorrectly, mobile overflow
    Evidence: .sisyphus/evidence/task-10-explainer-responsive.png

  Scenario: CTA hover and navigation
    Tool: Playwright
    Preconditions: final CTA visible
    Steps:
      1. Hover CTA and assert background/text invert
      2. Click CTA and assert URL changes to request-form route
    Expected Result: button interaction and routing are correct
    Failure Indicators: no invert effect, broken route
    Evidence: .sisyphus/evidence/task-10-cta-navigation.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-10-explainer-responsive.png`
  - [ ] `.sisyphus/evidence/task-10-cta-navigation.png`

  **Commit**: NO (groups with T7-T9, T11-T12)

- [x] 11. Compose complete Home route from section components

  **What to do**:
  - Replace placeholder `frontend/pages/index.vue` with fully composed home page sections in required order.
  - Integrate header/footer shell spacing and section dividers.
  - Ensure route-level loading and toast channels are wired for stats/categories fetch failures.

  **Must NOT do**:
  - Do not keep legacy starter “Hackathon Template” hero content.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: final visual assembly and flow continuity.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 integration task
  - **Blocks**: T22
  - **Blocked By**: T1, T3, T7, T8, T9, T10

  **References**:
  - `frontend/pages/index.vue` - current file to replace.
  - Sections from T7-T10 and global shell from T3.

  **Acceptance Criteria**:
  - [ ] Home route includes all required sections in exact order.
  - [ ] Section transitions/dividers maintain editorial rhythm.
  - [ ] No placeholder hackathon starter copy remains.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Home page contains all five required sections
    Tool: Playwright
    Preconditions: app running
    Steps:
      1. Open `/`
      2. Assert presence/order of test IDs: hero, stats, categories, how-it-works, final-cta
    Expected Result: complete page structure in correct sequence
    Failure Indicators: missing section or wrong order
    Evidence: .sisyphus/evidence/task-11-home-order.png

  Scenario: Legacy placeholder content removed
    Tool: Playwright
    Preconditions: app running
    Steps:
      1. Search page text for `Hackathon Template`
      2. Assert zero matches
    Expected Result: starter content fully replaced
    Failure Indicators: old scaffold text remains visible
    Evidence: .sisyphus/evidence/task-11-placeholder-removed.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-11-home-order.png`
  - [ ] `.sisyphus/evidence/task-11-placeholder-removed.png`

  **Commit**: NO (groups with T7-T10, T12)

- [x] 12. Global toast orchestration and API error mapping policy

  **What to do**:
  - Create centralized toast state mechanism (store/composable) consumed by `ToastNotification`.
  - Map common API failures to localized user messages:
    - backend unavailable
    - timeout with retry affordance
    - 422 validation with field mapping
  - Ensure toasts are minimal bottom anchored with close action.

  **Must NOT do**:
  - No modal/pop-up blocking error UX for these cases.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: cross-route error policy and interaction between service/store/UI.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T17, T21
  - **Blocked By**: T1, T4

  **References**:
  - Prompt error-handling section.
  - API normalization outputs from T4.
  - Toast component from T6.

  **Acceptance Criteria**:
  - [ ] Toast can show message, close action, and optional retry action.
  - [ ] Backend-unavailable and timeout states map to expected Slovak copy.
  - [ ] 422 responses map field-level messages to form controls.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Timeout toast with retry option
    Tool: Playwright
    Preconditions: API host intentionally delayed/unavailable
    Steps:
      1. Trigger categories fetch
      2. Assert toast text indicates timeout
      3. Click retry action and assert fetch is retried once
    Expected Result: retry-capable minimal toast appears and works
    Failure Indicators: no retry control, duplicate uncontrolled retries
    Evidence: .sisyphus/evidence/task-12-timeout-toast.png

  Scenario: 422 validation maps to inline field errors
    Tool: Playwright
    Preconditions: submit endpoint returns 422 with field details
    Steps:
      1. Submit invalid form payload
      2. Assert corresponding fields display red inline messages
      3. Assert no generic blocking modal appears
    Expected Result: field-scoped validation errors are visible
    Failure Indicators: errors only in console/toast, missing field mapping
    Evidence: .sisyphus/evidence/task-12-validation-mapping.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-12-timeout-toast.png`
  - [ ] `.sisyphus/evidence/task-12-validation-mapping.png`

  **Commit**: YES (Commit B)
  - Message: `feat(frontend-home): implement editorial landing page sections with api-driven states`
  - Files: `frontend/pages/index.vue`, `frontend/components/layout/**`, `frontend/components/home/**` (or equivalent), `frontend/stores/**`, `frontend/composables/**`, `frontend/components/ui/ToastNotification.vue`
  - Pre-commit: `cd frontend && npm run lint && npm run build`

- [x] 13. Form route scaffold + split layout + step indicator + transitions

  **What to do**:
  - Create request form route page in Nuxt (`frontend/pages/request.vue` or equivalent slug) and assemble form shell.
  - Implement 40/60 desktop layout with sticky left info panel, hidden panel on tablet/mobile.
  - Add `components/form/StepIndicator.vue` with 4 line segments (active/inactive styles).
  - Add step transition animation (`translateX + opacity`, 300ms ease).

  **Must NOT do**:
  - Do not use circular progress dots.
  - Do not keep left panel visible below tablet breakpoint.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: combines route composition, responsiveness, and state-linked transitions.
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `visual-engineering`: used in sub-step components, but this task is layout/state glue.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T14, T15, T16, T17
  - **Blocked By**: T3, T5, T6

  **References**:
  - Prompt RequestFormView layout spec.
  - `frontend/components/layout/AppHeader.vue` and shell spacing from T3.
  - Store step state from T5.

  **Acceptance Criteria**:
  - [ ] Form route is reachable from hero/CTA buttons.
  - [ ] Desktop: two-column layout; tablet/mobile: single-column form.
  - [ ] Step indicator renders exactly four bars and reacts to current step.
  - [ ] Step transition animates on next/back.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Layout responsiveness for form route
    Tool: Playwright
    Preconditions: request route implemented
    Steps:
      1. Open `/request` at 1440x900 and assert left panel visible + sticky
      2. Switch to 900x1000 and assert left panel hidden
      3. Switch to 390x844 and assert form fields wrap cleanly
    Expected Result: breakpoint behavior matches spec
    Failure Indicators: sticky panel appears on mobile, horizontal overflow
    Evidence: .sisyphus/evidence/task-13-form-layout.png

  Scenario: Step transition effect works
    Tool: Playwright
    Preconditions: step 1 rendered
    Steps:
      1. Click next
      2. Assert container transition duration around 300ms
      3. Click back and assert reverse animation
    Expected Result: slide/fade transitions in both directions
    Failure Indicators: hard cuts with no animation
    Evidence: .sisyphus/evidence/task-13-step-motion.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-13-form-layout.png`
  - [ ] `.sisyphus/evidence/task-13-step-motion.png`

  **Commit**: NO (groups with T14-T18)

- [x] 14. Step 1 Identity implementation

  **What to do**:
  - Build `components/form/Step1Identity.vue` with fields: name, email, organization, role pills.
  - Role options: startup / investor / service_provider / member.
  - Validate required inputs (name/email/role) and block progression until valid.

  **Must NOT do**:
  - No native select for role.
  - No boxed error alerts.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: field interaction + visual state correctness.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T17
  - **Blocked By**: T5, T6, T13

  **References**:
  - Prompt Krok 1 spec and role mapping.
  - UI primitives from T6.

  **Acceptance Criteria**:
  - [ ] Inputs are underline-styled and bound to store.
  - [ ] Role pills invert when active.
  - [ ] Validation messages appear inline on invalid attempts.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Step 1 happy path
    Tool: Playwright
    Preconditions: on step 1
    Steps:
      1. Fill `Meno a priezvisko` with `Test User`
      2. Fill email with `test@example.com`
      3. Select `Startup` role pill
      4. Click next
    Expected Result: transitions to step 2
    Failure Indicators: role not saved or blocked despite valid fields
    Evidence: .sisyphus/evidence/task-14-step1-happy.png

  Scenario: Step 1 missing required fields
    Tool: Playwright
    Preconditions: empty step 1 fields
    Steps:
      1. Click next immediately
      2. Assert inline errors under name/email/role
    Expected Result: stays on step 1 with clear red validation hints
    Failure Indicators: progresses anyway or no field errors
    Evidence: .sisyphus/evidence/task-14-step1-error.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-14-step1-happy.png`
  - [ ] `.sisyphus/evidence/task-14-step1-error.png`

  **Commit**: NO (groups with T13, T15-T18)

- [x] 15. Step 2 Need implementation (categories + title + description)

  **What to do**:
  - Build `components/form/Step2Need.vue` with API/fallback category rows (not dropdown).
  - Implement title field and detail textarea with min-height 200px.
  - Add live character counter for description and selected-row left accent.

  **Must NOT do**:
  - No category dropdown.
  - No box-style textarea borders.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: dynamic list selection + form interactions.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T17
  - **Blocked By**: T4, T5, T6, T9, T13

  **References**:
  - Prompt Krok 2 spec.
  - `frontend/api/categories.ts` and fallback policy from T4/T9.

  **Acceptance Criteria**:
  - [ ] Category list works with loading skeleton + fallback + offline hint.
  - [ ] Selected category sets `category_id` in store.
  - [ ] Title and description bind/store correctly.
  - [ ] Description character counter updates live.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Step 2 happy path with API categories
    Tool: Playwright
    Preconditions: categories available
    Steps:
      1. Open step 2
      2. Select category row 1
      3. Fill title `Potrebujem pomoc s fundraisingom`
      4. Fill description with 120+ chars and confirm counter
    Expected Result: can proceed to next step with data saved
    Failure Indicators: category not marked, counter not updating
    Evidence: .sisyphus/evidence/task-15-step2-happy.png

  Scenario: Step 2 offline fallback behavior
    Tool: Playwright
    Preconditions: categories endpoint unavailable
    Steps:
      1. Open step 2
      2. Assert `(offline režim)` is visible
      3. Select fallback category and continue
    Expected Result: step remains functional despite API failure
    Failure Indicators: empty category area or blocked navigation
    Evidence: .sisyphus/evidence/task-15-step2-offline.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-15-step2-happy.png`
  - [ ] `.sisyphus/evidence/task-15-step2-offline.png`

  **Commit**: NO (groups with T13, T14, T16-T18)

- [x] 16. Step 3 Details implementation (urgency/deadline/budget/type/tags/consent)

  **What to do**:
  - Build `components/form/Step3Details.vue` with urgency pills, date input, budget pills, help type pills, tags, and custom consent checkbox.
  - Ensure critical urgency active state uses red border.
  - Normalize tags (trim, dedupe) before storing.

  **Must NOT do**:
  - No default browser checkbox styling.
  - No skipping consent validation.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: control-rich UI with multiple nuanced states.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T17
  - **Blocked By**: T5, T6, T13

  **References**:
  - Prompt Krok 3 spec.
  - `components/ui/TagInput.vue` from T6.

  **Acceptance Criteria**:
  - [ ] All controls map to store keys (`urgency`, `deadline`, `budget_range`, `help_type`, `tags`, `consent`).
  - [ ] Critical urgency style appears correctly.
  - [ ] Tag add/remove works with Enter + remove icon.
  - [ ] Cannot proceed with consent unchecked.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Step 3 happy path interactions
    Tool: Playwright
    Preconditions: step 3 visible
    Steps:
      1. Select urgency `Kritická`
      2. Set deadline to `2026-05-01`
      3. Select budget `500-2000€` and help type option
      4. Add tags `marketing`, `sales`
      5. Check consent and continue
    Expected Result: proceeds to step 4 with values retained
    Failure Indicators: missing persistence, critical style absent
    Evidence: .sisyphus/evidence/task-16-step3-happy.png

  Scenario: Consent unchecked negative path
    Tool: Playwright
    Preconditions: all fields valid except consent unchecked
    Steps:
      1. Click next
      2. Assert consent inline error appears and step does not advance
    Expected Result: explicit validation for consent
    Failure Indicators: reaches step 4 without consent
    Evidence: .sisyphus/evidence/task-16-step3-consent-error.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-16-step3-happy.png`
  - [ ] `.sisyphus/evidence/task-16-step3-consent-error.png`

  **Commit**: NO (groups with T13-T15, T17-T18)

- [ ] 17. Step 4 Review + submit orchestration

  **What to do**:
  - Build `components/form/Step4Review.vue` rendering grouped summary blocks for steps 1–3 with “Upraviť” actions.
  - Implement submit button full-width outline style with loading label (“Odosielam...”) and subtle pulse while submitting.
  - On success: capture returned request ID and route to thank-you screen.
  - On error: keep user on review step with toast + field messages when applicable.

  **Must NOT do**:
  - Do not lose form data on submit failure.
  - Do not navigate away before submit promise resolves.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: critical integration of stores, API calls, error handling, and navigation.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 integration task
  - **Blocks**: T18, T21
  - **Blocked By**: T4, T5, T6, T12, T13, T14, T15, T16

  **References**:
  - Prompt Krok 4 review/submit spec.
  - `frontend/api/requests.ts` from T4.
  - Form store actions from T5.

  **Acceptance Criteria**:
  - [ ] Review step lists data from prior steps with edit shortcuts.
  - [ ] Submit button switches text/state during request.
  - [ ] Success path stores submitted ID and routes to thank-you view.
  - [ ] Error path shows feedback and preserves entered data.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Successful submit navigates to thank-you with request ID
    Tool: Playwright
    Preconditions: submit endpoint returns `{ id: 123 }`
    Steps:
      1. Complete steps 1-3 and open review
      2. Click submit button
      3. Assert button text becomes `Odosielam...` during request
      4. Assert route changes to thank-you page and `123` appears
    Expected Result: end-to-end happy submit flow works
    Failure Indicators: no navigation, missing ID, stuck loading
    Evidence: .sisyphus/evidence/task-17-submit-success.png

  Scenario: Submit failure keeps user on review with feedback
    Tool: Playwright
    Preconditions: submit endpoint returns 500/timeout
    Steps:
      1. Click submit on review
      2. Assert route remains on form review step
      3. Assert toast with failure message appears
      4. Assert review content still populated
    Expected Result: graceful failure with no data loss
    Failure Indicators: route changes despite failure, data reset
    Evidence: .sisyphus/evidence/task-17-submit-failure.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-17-submit-success.png`
  - [ ] `.sisyphus/evidence/task-17-submit-failure.png`

  **Commit**: NO (groups with T13-T16, T18)

- [ ] 18. Success screen + thank-you route + new-request reset loop

  **What to do**:
  - Implement `components/form/SuccessScreen.vue` and `pages/thank-you.vue` (or equivalent) with centered editorial layout.
  - Display request ID and estimated response time copy.
  - Add CTA “Zadať ďalšiu žiadosť →” that resets store and returns to form step 1.
  - Add subtle bottom-up reveal animation.

  **Must NOT do**:
  - Do not hide request ID when available.
  - Do not retain stale form data after starting a new request.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: final UX state with typographic emphasis and animation.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T22
  - **Blocked By**: T6, T17

  **References**:
  - Prompt SuccessScreen/ThankYou specs.
  - Submit result handling from T17.

  **Acceptance Criteria**:
  - [ ] Thank-you view shows large serif headline and muted supporting text.
  - [ ] Submitted request ID renders when present.
  - [ ] “New request” CTA resets form state and routes to step 1.
  - [ ] Reveal animation runs on mount.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Thank-you page displays request metadata
    Tool: Playwright
    Preconditions: submit success with known ID
    Steps:
      1. Complete submit flow
      2. Assert headline `Žiadosť prijatá.` appears
      3. Assert request ID text is visible
    Expected Result: success context clearly communicated
    Failure Indicators: missing ID or incorrect copy
    Evidence: .sisyphus/evidence/task-18-thankyou-metadata.png

  Scenario: New-request CTA resets state
    Tool: Playwright
    Preconditions: on thank-you page after successful submit
    Steps:
      1. Click `Zadať ďalšiu žiadosť →`
      2. Assert route moves to request form
      3. Assert form starts at step 1 with empty fields
    Expected Result: clean restart path works
    Failure Indicators: stale data persists or wrong step
    Evidence: .sisyphus/evidence/task-18-reset-loop.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-18-thankyou-metadata.png`
  - [ ] `.sisyphus/evidence/task-18-reset-loop.png`

  **Commit**: YES (Commit C)
  - Message: `feat(frontend-form): deliver multi-step request workflow with review and success routes`
  - Files: `frontend/pages/request.vue`, `frontend/pages/thank-you.vue`, `frontend/components/form/**`, `frontend/stores/formStore.ts`, `frontend/composables/useRequestForm.ts`
  - Pre-commit: `cd frontend && npm run lint && npm run build`

- [ ] 19. Responsive tuning pass for typography, spacing, and controls

  **What to do**:
  - Tune typographic scale and spacing across home/form/thank-you views for desktop/tablet/mobile.
  - Ensure pills wrap cleanly on small screens.
  - Verify max content width, section paddings, and readable line lengths.

  **Must NOT do**:
  - Do not reduce typography to generic tiny SaaS sizes.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: cross-view responsive visual quality pass.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: T22
  - **Blocked By**: T2, T3, T7, T8, T9, T10

  **References**:
  - Prompt responsiveness section with explicit breakpoints.
  - Existing section components and form controls.

  **Acceptance Criteria**:
  - [ ] Desktop/tablet/mobile breakpoints satisfy spec behavior.
  - [ ] No horizontal overflow on major routes.
  - [ ] Typography scales down ~25% on mobile while preserving hierarchy.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Multi-route responsive audit
    Tool: Playwright
    Preconditions: home, request, thank-you routes implemented
    Steps:
      1. Check each route at 1440x900, 1024x768, 390x844
      2. Assert no horizontal scrollbar and no clipped text/buttons
    Expected Result: layouts are stable and readable on all breakpoints
    Failure Indicators: overflow, wrapped labels overlapping controls
    Evidence: .sisyphus/evidence/task-19-responsive-audit.png

  Scenario: Mobile pill wrapping behavior
    Tool: Playwright
    Preconditions: form step with multiple pill groups
    Steps:
      1. On 390px viewport, inspect urgency/budget/help-type pills
      2. Assert pills wrap to new lines without overlap
    Expected Result: controls remain tappable and legible
    Failure Indicators: clipped pills or overlap
    Evidence: .sisyphus/evidence/task-19-pill-wrap.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-19-responsive-audit.png`
  - [ ] `.sisyphus/evidence/task-19-pill-wrap.png`

  **Commit**: NO (groups with T20-T22)

- [ ] 20. Accessibility and motion-safety hardening

  **What to do**:
  - Add semantic labels/aria attributes, keyboard focus states, and tab order consistency.
  - Ensure buttons/links are keyboard-operable and visible on focus.
  - Add `prefers-reduced-motion` fallback to disable non-essential motion.

  **Must NOT do**:
  - Do not remove focus outlines without accessible replacement.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI accessibility and motion policy implementation.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: T22
  - **Blocked By**: T3

  **References**:
  - WCAG quick refs for focus visibility and keyboard interaction.
  - Existing component library from T6.

  **Acceptance Criteria**:
  - [ ] Form controls are reachable and operable via keyboard.
  - [ ] Focus states are visible and high-contrast.
  - [ ] Reduced-motion setting suppresses reveal/slide transitions.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Keyboard-only form navigation
    Tool: Playwright
    Preconditions: request route loaded
    Steps:
      1. Use Tab/Shift+Tab to move through header links and form controls
      2. Activate role pill via keyboard
      3. Submit step navigation with Enter/Space where relevant
    Expected Result: no keyboard traps and visible focus on each control
    Failure Indicators: unreachable control or invisible focus
    Evidence: .sisyphus/evidence/task-20-keyboard-flow.png

  Scenario: Reduced motion preference disables major transitions
    Tool: Playwright
    Preconditions: emulate `prefers-reduced-motion: reduce`
    Steps:
      1. Load home and request routes
      2. Assert hero/step transitions are removed or minimized
    Expected Result: reduced motion mode respected
    Failure Indicators: full animations still running
    Evidence: .sisyphus/evidence/task-20-reduced-motion.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-20-keyboard-flow.png`
  - [ ] `.sisyphus/evidence/task-20-reduced-motion.png`

  **Commit**: NO (groups with T19, T21-T22)

- [ ] 21. Failure-mode hardening (offline, timeout, 422)

  **What to do**:
  - Validate and harden all failure channels across home and form submit:
    - backend unavailable
    - request timeout
    - 422 validation
  - Ensure each has deterministic user feedback and recovery path.
  - Confirm categories/stats fallback data stays available under failures.

  **Must NOT do**:
  - No silent failures.
  - No global crash screen for recoverable endpoint errors.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: cross-module reliability and edge-case handling.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: T22
  - **Blocked By**: T4, T12, T17

  **References**:
  - Prompt error-handling requirements.
  - Axios error mapping from T4 and toast policy from T12.

  **Acceptance Criteria**:
  - [ ] Offline + timeout toasts are shown consistently.
  - [ ] 422 field errors appear under correct controls.
  - [ ] Home sections still render fallback content under endpoint failures.
  - [ ] Submit flow remains retry-capable after failures.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Backend unavailable end-to-end
    Tool: Playwright
    Preconditions: API base points to unreachable host
    Steps:
      1. Open home and assert fallback stats/categories appear
      2. Open form and attempt submit
      3. Assert backend unavailable toast and preserved form data
    Expected Result: graceful degradation throughout app
    Failure Indicators: crash, blank sections, data loss
    Evidence: .sisyphus/evidence/task-21-backend-unavailable.png

  Scenario: 422 response field mapping after submit
    Tool: Playwright
    Preconditions: submit endpoint mocked to return field-level 422
    Steps:
      1. Submit review step
      2. Assert mapped errors appear under affected fields
      3. Assert user can edit and retry submit
    Expected Result: actionable field errors with retry path
    Failure Indicators: generic non-specific error only
    Evidence: .sisyphus/evidence/task-21-422-mapping.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-21-backend-unavailable.png`
  - [ ] `.sisyphus/evidence/task-21-422-mapping.png`

  **Commit**: NO (groups with T19, T20, T22)

- [ ] 22. Final integration polish + commands verification + frontend docs note

  **What to do**:
  - Run final pass to align naming, route links, and visual consistency across all pages.
  - Verify `npm install`, `npm run lint`, `npm run build`, and `npm run dev` on frontend.
  - Add concise frontend README/update note (inside `frontend/`) describing setup, env var, and fallback behavior.

  **Must NOT do**:
  - Do not add unrelated feature expansions.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: broad integration and quality gate task.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 final integration
  - **Blocks**: FINAL WAVE
  - **Blocked By**: T11, T18, T19, T20, T21

  **References**:
  - All prior tasks and success criteria command list.
  - `frontend/package.json` scripts.

  **Acceptance Criteria**:
  - [ ] All required commands run successfully.
  - [ ] Route flow home → request → thank-you works without dead links.
  - [ ] Frontend-local docs include env config and fallback notes.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Full app smoke run with build/lint
    Tool: Bash
    Preconditions: final implementation state
    Steps:
      1. Run `cd frontend && npm install`
      2. Run `npm run lint`
      3. Run `npm run build`
      4. Run `npm run dev` and confirm server boots
    Expected Result: all quality gate commands pass
    Failure Indicators: lint/build errors or runtime startup failure
    Evidence: .sisyphus/evidence/task-22-quality-gates.txt

  Scenario: Route integration smoke via browser
    Tool: Playwright
    Preconditions: dev server running
    Steps:
      1. Open home and click CTA to request form
      2. Navigate through sample completed flow to thank-you
      3. Click new-request CTA and confirm return to step 1
    Expected Result: end-to-end route loop is stable
    Failure Indicators: dead routes, broken navigation state
    Evidence: .sisyphus/evidence/task-22-route-smoke.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-22-quality-gates.txt`
  - [ ] `.sisyphus/evidence/task-22-route-smoke.png`

  **Commit**: YES (Commit D)
  - Message: `chore(frontend-quality): responsive accessibility and fallback hardening with verification`
  - Files: `frontend/**`
  - Pre-commit: `cd frontend && npm run lint && npm run build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Validate each Must Have/Must NOT Have and all deliverables against actual implementation + evidence files.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run lint/build, inspect changed files for anti-patterns (`any`, dead code, console noise, over-abstraction).
  Output: `Lint [PASS/FAIL] | Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA Replay** — `unspecified-high` (+ `playwright` skill)
  Replay all task-level QA scenarios exactly; collect screenshots/logs in `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N] | Integration [PASS/FAIL] | Edge Cases [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare planned scope vs final diff and detect overbuild/underbuild and cross-task contamination.
  Output: `Scope [N/N] | Overbuild [0/N] | Missing [0/N] | VERDICT`

---

## Commit Strategy

- **Commit A (Foundation)**: T1–T6
  - Message: `feat(frontend-foundation): establish nuxt architecture, design system, api/store/ui primitives`
- **Commit B (Home)**: T7–T12
  - Message: `feat(frontend-home): implement editorial landing page sections with api-driven states`
- **Commit C (Form Flow)**: T13–T18
  - Message: `feat(frontend-form): deliver multi-step request workflow with review and success routes`
- **Commit D (Hardening)**: T19–T22
  - Message: `chore(frontend-quality): responsive accessibility and fallback hardening with verification`

---

## Success Criteria

### Verification Commands
```bash
cd frontend
npm install
npm run lint
npm run build
npm run dev
```

### Final Checklist
- [ ] All Must Have items implemented
- [ ] All Must NOT Have constraints respected
- [ ] UI style aligns with 0100.vc-inspired editorial system
- [ ] Multi-step form fully functional with persisted state
- [ ] API loading/error/offline/success paths validated
- [ ] Evidence artifacts available for each task and final wave
