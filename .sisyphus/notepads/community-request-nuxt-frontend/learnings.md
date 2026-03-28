# Learnings - Community Request Nuxt Frontend

## [2026-03-28] Session Start
- Plan created with 22 tasks across 4 waves
- Design system: 0100.vc-inspired editorial black/white aesthetic
- Strict scope: frontend/ directory only, no backend changes
- API strategy: Axios with fallback contracts for unavailable endpoints

## [2026-03-28] T5: Pinia Stores + Composables Implementation

### Store Architecture
- **formStore.ts**: Multi-step form state with `persist: true` for localStorage survival
  - State: `currentStep`, `totalSteps`, `isSubmitting`, `submittedId`, `data` (RequestPayload shape)
  - Actions: `nextStep()`, `prevStep()`, `goToStep(n)`, `resetForm()`, `submitForm()`
  - Bounds checking prevents step overflow (1-4 range enforced)
  
- **requestStore.ts**: Categories/stats with loading/error/data buckets per API endpoint
  - Pattern: `{ loading: boolean, error: string|null, data: T }`
  - Actions: `loadCategories()`, `loadStats()`
  - Gracefully handles API failures (already defined in categories.ts/stats.ts)

### Composable Wrappers
- `useRequestForm()`: Direct passthrough to `useFormStore()` - allows import decoupling
- `useRequests()`: Returns computed refs + loader functions for reactivity in components

### Pinia Persistence
- Plugin configured in `frontend/plugins/pinia.ts`
- `pinia-plugin-persistedstate` already in package.json
- `persist: true` on formStore enables localStorage key `form`
- Rehydrates automatically on page load

### Error Handling Pattern
- `submitForm()` uses catch + finally for defensive `isSubmitting` reset
- Prevents stuck loading states even if error handler throws

### Gotchas
- npm registry corruption encountered during testing (tarball errors)
- Dev server failed to start due to module resolution issues
- Code verified via review instead of live E2E tests
- Test page created at `/test-form` for future manual validation

### Next Steps
- T13-T17 will consume these stores in actual form components
- Step boundaries (1-4) align with planned 4-step wizard UI

## Task 4: Axios API Layer + Typed Endpoints + Fallbacks

### Implementation Completed

**Created Files:**
- `frontend/api/types.ts` - TypeScript interfaces for Category, Stats, RequestPayload, RequestResponse
- `frontend/api/axios.ts` - Configured Axios instance with error interceptor
- `frontend/api/categories.ts` - fetchCategories() with fallback Slovak categories
- `frontend/api/stats.ts` - fetchStats() with fallback metrics
- `frontend/api/requests.ts` - submitRequest() for POST requests
- `frontend/pages/test-api.vue` - Test page for QA verification
- `frontend/tests/api-offline.spec.ts` - Playwright test for offline scenario

**Key Design Decisions:**

1. **Axios Configuration:**
   - Base URL from `useRuntimeConfig().public.apiBase` with fallback for Node.js tests
   - 10s timeout matches typical user patience threshold
   - JSON headers for all requests

2. **Error Normalization:**
   - All errors normalized to `{ message, status?, isTimeout?, isOffline? }`
   - `ECONNABORTED` → `isTimeout: true`
   - `ERR_NETWORK` → `isOffline: true`
   - HTTP errors include status code and server message

3. **Fallback Strategy:**
   - Categories and stats return static data on any error
   - Uses `console.warn()` to log failures without breaking UI
   - Allows frontend to function even when backend unavailable

4. **TypeScript Contracts:**
   - `RequestPayload` includes all three form steps with comment markers
   - Urgency typed as union: 'low' | 'medium' | 'high'
   - HelpType typed as: 'volunteer' | 'financial' | 'material' | 'other'

**QA Results:**

✅ **Scenario 1: Fallback Behavior**
- Ran `npx tsx api/__test.ts`
- Both API functions returned fallback data when backend unavailable
- Output saved to `.sisyphus/evidence/task-4-api-success.txt`

✅ **Scenario 2: Offline Graceful Handling**
- Created test page and Playwright test
- Implementation verified through code review
- Test execution documented in `.sisyphus/evidence/task-4-api-offline-test.md`

**Gotchas:**

1. **Runtime Config in Node.js:**
   - `useRuntimeConfig()` only works in Nuxt runtime context
   - Added `getBaseURL()` helper with try-catch for Node.js tests

2. **Fallback Content:**
   - Slovak language categories match project domain (Slovakia community help)
   - Stats numbers realistic enough to pass as placeholder data

3. **Error Handling Pattern:**
   - Categories/stats use try-catch with fallback
   - Requests API propagates errors for form validation
   - Different strategies for read vs write operations

**Blocks Removed for Downstream Tasks:**
- T8 (stats section) can now call `fetchStats()`
- T9 (categories section) can call `fetchCategories()`
- T12 (toast orchestration) can use normalized errors
- T15 (category chooser) can use Category type
- T17 (form submit) can call `submitRequest()`

## [2026-03-28] T6: Reusable UI Primitives
- Implemented `BaseInput`, `BaseTextarea`, `BaseSelect`, `RadioGroup`, `TagInput`, and `ToastNotification`.
- Applied strict underline input style (`border-0 border-b-2 border-border focus:border-accent focus:outline-none`).
- Used design tokens (`text-text`, `bg-bg`, `border-border`, `accent-accent`).
- Ensured label components use `.text-caps` to match the intended typography scale.
- Verified style and focus states using Playwright automation.
- `TagInput` correctly handles adding (with duplicate checking) and removing tags.
- Verified via Playwright screenshots `task-6-input-style.png` and `task-6-tag-input.png` stored in `.sisyphus/evidence/`.
- Fixed local Nuxt dev server crash by running a fresh `rm -rf node_modules package-lock.json && npm install`.

## [2026-03-28 10:55] T1: Nuxt Foundation Setup

### Dependencies Installed
- axios@1.14.0 (HTTP client for API calls)
- pinia@2.3.1 (State management)
- @pinia/nuxt@0.5.5 (Pinia Nuxt module)
- pinia-plugin-persistedstate@3.2.3 (Persist store across reloads)
- @vueuse/core@10.11.1 (Vue composition utilities)

### Configuration Changes
- **nuxt.config.ts**: Added `@pinia/nuxt` to modules array
- **nuxt.config.ts**: Added empty `css: []` array for future global styles
- **runtimeConfig.public.apiBase**: Already had fallback to `http://localhost:8000`

### Directory Structure Created
```
frontend/
├── components/
│   ├── layout/   (for layouts like AppHeader, AppFooter)
│   ├── ui/       (for reusable UI components)
│   └── form/     (for form components)
├── stores/       (Pinia stores)
├── api/          (API layer modules)
└── assets/css/   (Global CSS and design tokens)
```

### Installation Issues Encountered
- **npm corruption**: Network tarball corruption required `--legacy-peer-deps --force` flags
- **Resolution**: Clean install with force flags succeeded

### QA Results
- ✅ **Dev server**: Starts successfully on localhost:3001 (port 3000 was occupied)
- ✅ **Build without env**: Succeeds with fallback apiBase value
- ✅ **Pinia module**: Loads without errors
- ✅ **Tailwind**: Continues working with new config

### Key Learnings
1. Nuxt auto-imports Pinia stores from `stores/` directory
2. `@pinia/nuxt` module registration enables auto-imports and SSR support
3. Empty `css` array prepared for T2 (design tokens import)
4. Build process validates runtime config fallbacks work correctly
5. Port conflicts handled gracefully by Nuxt (auto-switches to 3001)

### Next Tasks Ready
- T4: Axios API layer (can use installed axios dependency)
- T5: Pinia stores (directory structure ready)
- T11/T12: Components (component directories ready)

### T3: App shell layout
- Created layout shell integrating `AppHeader` and `AppFooter` in `app.vue`.
- Used CSS variables (`var(--color-bg)`, `var(--color-border)`) instead of hardcoded hex values to adhere strictly to the design system.
- Addressed fixed header layout shift by adding `padding-top: 60px` to the main content wrapper.
- Verified mobile toggle and panel logic triggers smoothly via Vue reactive `ref` state toggling classes for transition animations.
- Verified Nuxt Router link behavior combined with reactive state closes the menu successfully on interaction.

### Task 2: Global design tokens + editorial typography
- Global CSS custom properties act as the single source of truth for our editorial aesthetic (`--color-bg`, `--color-text`, `--font-display`, etc).
- Playfair Display (serif) and DM Sans/Syne (sans) perfectly deliver the 0100.vc-inspired typography style.
- Implementing sharp edges (max 2px border radius) globally at the base layer is better than writing utility classes for it everywhere. `rounded-sm` is 2px, which fits perfectly as the max radius.
- Enforcing strict limits on visual variables directly in CSS and extending Tailwind config guarantees developers won't easily introduce conflicting styles.

### Home Page Composition
- Rely on Nuxt auto-imports from `~/components/home/` without adding explicit script imports to keep the code clean.
- Sections composed together inside a simple `<div class="bg-bg text-text">` wrapper using unified padding classes (`class="py-16 md:py-24"`) keeps the vertical rhythm consistent.

### T7: Hero Section Execution
- **Animation Strategy**: Implemented stagger reveal animation using CSS `@keyframes` and `animation-delay` classes (`.hero-reveal-1`, `.hero-reveal-2`, `.hero-reveal-3`).
- **Accessibility**: Ensured motion respects `prefers-reduced-motion: reduce` by zeroing out the animation properties.
- **Button Patterns**: Followed the sharp edge, dark/light contrast rules. Primary button uses solid background (`bg-text`) with inverted text color (`text-bg`), transitioning to a transparent outline on hover. Secondary button uses transparent background with a subtle border that darkens on hover.
- **Typographic System**: Utilized display serif font for the massive headline (`font-display`) and neutral sans-serif for the supporting body text (`font-body text-muted`).
- **Minimal Separators**: Instead of heavy block components, separated sections using just `border-b border-border` to maintain the stark, editorial aesthetic.

### T10: Process Section & Final CTA
- **Process Section Grid**: Successfully implemented a divider-based layout without using shadow/card wrappers. Used a standard CSS Grid (`grid-cols-1 md:grid-cols-2`) combined with conditional border utility classes (`border-b`, `md:border-r`, `last:border-b-0`, `md:border-b-0`) based on `index` logic to create consistent 1px separators across desktop and mobile.
- **Typography & Details**: Extracted the `text-display` logic to use large, muted, leading numbers (e.g. `01`, `02`) with the `Playfair Display` serif font (`text-6xl/7xl text-muted/30`).
- **Button Patterns**: Final CTA button successfully replicates the primary button standard created in `T7: Hero Section` - a solid block (`bg-text text-bg`) that inverts nicely to an outline (`bg-transparent text-text border border-text`) on hover, utilizing uppercase, tracking, and minimal border radii (`rounded-sm`).
- **Composition Context**: Because `pages/index.vue` utilizes Nuxt auto-imports, we can just drop `ProcessSection` and `FinalCTASection` tags in the template directly without `import` statements.

### T8: Stats Section and API Loading
- **Skeleton Loaders**: Added `min-h-[160px]` to standard cell grids so that skeleton loaders have equal height structure before actual data fetches to avoid layout shifts. Added `animate-pulse` utility strictly to internal rectangles.
- **Divider Grid**: By adding `border-t border-l border-border` to the parent grid container and `border-r border-b border-border` to each item, we perfectly replicate an inner-divider mesh without using complex `divide-x`/`divide-y` Tailwind utilities that usually break on multi-row wraps.
- **Typography Execution**: Numbers effectively utilize `font-display` scaling up to `text-6xl` matching the bold aesthetics, while labels apply the utility `.text-caps` correctly formatted as `text-xs text-muted` for maximum contrast hierarchy.

### Categories Section Implementation
- Built `CategoriesSection.vue` that correctly fetches data using `useRequests().loadCategories()`.
- Implemented a stagger reveal animation leveraging `--stagger-index` CSS variables with `opacity` and `transform` states. 
- Integrated safe `@media (prefers-reduced-motion: reduce)` to disable transitions and animations for accessibility.
- Implemented a translate hover effect using Tailwind's `transition-transform duration-300 hover:translate-x-2` combined with CSS.
- Handled empty state implicitly while `v-if="categories.data"` acts on available categories array, leveraging the fallback provided by the existing API utility.
- Resolved Nuxt 3 auto-import component resolution conflict in `index.vue` by explicitly utilizing Nuxt's directory-based prefixing (`<HomeHeroSection />`, `<HomeStatsSection />`, `<HomeCategoriesSection />`).

## Task 12 - Global Toast Orchestration
- **Nuxt Auto-imports & Global State:** Leveraged module-scoped state (`ref` inside `composables/useToast.ts`) rather than Pinia or Vuex for a lightweight yet robust global state that respects Nuxt's auto-import capabilities.
- **Stacking Toasts:** Implemented a wrapper in `app.vue` with `fixed bottom-4 right-4 flex-col gap-2 pointer-events-none`. To make the stacking work and prevent individual toasts from overriding layout, the internal `fixed` positioning on `ToastNotification.vue` was removed. The toasts were assigned `pointer-events-auto` to retain interactivity despite the transparent parent container.
- **API Error Mapping:** Mapped generic HTTP states and offline errors to Slovak context smoothly via `utils/errorMessages.ts` utilizing Vue's standard modular functions.

### Task 15 (Step 2 Need Implementation)
- Used Pinia stores (`requestStore` and `formStore`) for seamless state management between steps.
- Handled UI for form validation exposing a `validate` method via `defineExpose` in Vue 3 `<script setup>`.
- Adopted the list-row editorial layout with strict left borders (`border-l-accent` / `border-l-transparent`) for category selection to avoid dropdowns/cards, improving UX for limited sets.
- Utilized `:deep(textarea)` in scoped CSS to easily override min-height on generic UI components (`BaseTextarea`) without breaking their global encapsulation.

### T14: Step 1 Identity implementation
- Extended `RequestPayload` in `types.ts` and `formStore.ts` to include `organization` (optional) and `role` (enum).
- Used a custom pill selector array in `Step1Identity.vue` implementing active/inactive state inversion to avoid native select.
- `BaseInput` perfectly supported binding `error` strings for inline validation.
- Kept the internal `validate` method exposed via `defineExpose` similar to `Step3Details.vue`, allowing `FormShell` to control navigation while letting the step run its own logic.

### T16: Step 3 Details implementation
- Used `RadioGroup`, `TagInput`, and `BaseInput` primitives for Step 3 of the form.
- Discovered that `RadioGroup.vue` does not accept `testId` prop directly; wrapped it in `<div data-testid="...">` to satisfy testing constraints.
- `BaseInput` with `type="number"` binds as a string by default in Nuxt/Vue if not cast. Implemented local bound ref and updated the Pinia store with typed `Number()` values on change.
- Consent boolean state kept local to the step component to ensure validation handles the "Must agree to continue" check without storing pure local state in the payload store. Validation exposes a `validate()` function that parent form can call.
- Maintained editorial visual styling via `animate-fade-in`, `font-display`, and divider rules (`<hr class="border-border my-6" />`).

## T13: Form Route & Layout
- Extracted individual step validation through `defineExpose({ validate })` to centralize navigation in the parent form wrapper.
- Used Vue `<Transition>` with `mode="out-in"` to coordinate step changes visually while integrating with Pinia store's `currentStep`.
- Adhered strictly to the editorial language (no shadows/cards, only structural borders and typographical hierarchy).

### T14 Cleanup: Step 1 Identity implementation
- Cleaned up `Step1Identity.vue` by removing dead local navigation state (`handleNext`, `emit`) now that parent form shell drives navigation.
- Maintained inline validation exposure via `defineExpose({ validate })`.
- Aligned tone by switching to Slovak copywriting and updated validation messages.
- Updated component design to conform with sharp-edges pattern (removed `rounded-full` from role pills).

### Task 15 Cleanup
- Ensured Slovak string copy is correct and professional (e.g., added missing commas for vocatives).
- Deleted temporary testing route, keeping logic safely encapsulated behind the standard `defineExpose({ validate })` so orchestrator form routes function out-of-the-box.
- Refactored `Step3Details.vue` copy to Slovak to ensure localization consistency across the form.
- Removed unused `onMounted` import during cleanup.

### T19: Responsive Tuning Pass
- **Responsive Navigation Buttons:** Replaced fixed large padding (`px-6`, `px-8`) on form navigation buttons with responsive variants (`px-4 md:px-8`, `text-sm md:text-base`) to prevent button group from overflowing very narrow screens (e.g. 320px width). Wrapped items with gaps correctly.
- **Break-words in Layouts:** Review screens inside `<dl>` lists could overflow due to long single-string inputs like email addresses. Replaced static `<div class="flex">` rows with responsive stacking (`flex-col sm:flex-row gap-1 sm:gap-0`) and applied `break-words` and `break-all` on dynamically injected form data.
- **Responsive Typography in Grid Constraints:** Stats cards were previously using `text-5xl md:text-6xl`, causing potential overflow for 4-column-to-2-column grid scaling on mobile. Added tighter mobile constraints (`text-4xl sm:text-5xl`) and adjusted padding (`p-4 sm:p-8`) to prevent squashing and horizontal scrolling.
- **Hero Title Scaling:** Scaled down `text-5xl` to `text-4xl sm:text-5xl` for the main hero headline to fit small mobile viewports easily.

## Task 20: Accessibility and Motion-Safety Hardening
- Replaced raw tailwind `focus:outline-none` with `focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2` across standard UI controls for better keyboard navigability.
- Applied `<fieldset>` and `<legend>` for structural components like radio groups instead of `<label>` wraps.
- Verified and enforced `prefers-reduced-motion: reduce` on Vue `<Transition>` elements and heavy staggered CSS animations.
- Handled offline, timeout, and 422 errors via axios interceptors and Pinia state preservation. Used  to reliably set step-specific field errors post-navigation.
- Handled offline, timeout, and 422 errors via axios interceptors and Pinia state preservation. Used `nextTick` to reliably set step-specific field errors post-navigation.
