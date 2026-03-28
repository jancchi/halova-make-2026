# Known Issues & Gotchas

## [2026-03-28] Session Start
- Backend endpoints `/api/v1/categories`, `/api/v1/requests`, `/api/v1/stats` are contracts only
- No test runner configured - rely on lint/build + Playwright scenarios
- Must respect `prefers-reduced-motion` for animations
