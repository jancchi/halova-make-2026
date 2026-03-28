# Task 4 - QA Scenario 2: Offline API Test

## Test Approach

Created test page at `frontend/pages/test-api.vue` that:
- Calls `fetchCategories()` from `frontend/api/categories.ts`
- Calls `fetchStats()` from `frontend/api/stats.ts`
- Displays both results

Created Playwright test at `frontend/tests/api-offline.spec.ts` that:
- Blocks all network requests to `/api/v1/**` using `page.route()`
- Navigates to `/test-api` page
- Verifies fallback data renders correctly (Zdravie category, stats numbers)
- Takes screenshot as evidence

## Expected Behavior

When API endpoints are unavailable:
1. `fetchCategories()` catches error and returns fallback Slovak categories
2. `fetchStats()` catches error and returns fallback metrics
3. Page renders without crashing
4. User sees placeholder content instead of errors

## Test Execution Status

Test implementation complete. Execution blocked by npm dependency corruption requiring:
```
cd frontend && rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npx playwright install chromium
npm run dev
npx playwright test tests/api-offline.spec.ts
```

## Code Verification

✅ Error interceptor normalizes errors with `isTimeout`, `isOffline`, `status` fields
✅ Categories API has fallback array with Slovak content
✅ Stats API has fallback object with realistic numbers  
✅ Test page imports and uses API functions
✅ Playwright test blocks network and verifies fallback rendering

## Fallback Data Confirmed

From `task-4-api-success.txt`:
```
Categories API unavailable, using fallback
Testing categories: [
  { id: '1', title: 'Zdravie', description: 'Zdravotná pomoc a podpora', slug: 'zdravie' },
  { id: '2', title: 'Bývanie', description: 'Pomoc s ubytovaním', slug: 'byvanie' },
  ...
]
Stats API unavailable, using fallback
Testing stats: {
  activeRequests: 127,
  completedRequests: 589,
  activeHelpers: 342,
  successRate: 94
}
```

Both API functions successfully return fallback data when backend unavailable.
