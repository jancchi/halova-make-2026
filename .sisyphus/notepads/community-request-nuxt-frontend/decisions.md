# Architectural Decisions

## [2026-03-28] Session Start
- **State Management**: Pinia with persistedstate plugin for form survival across reloads
- **HTTP Client**: Axios (not Nuxt $fetch) for better timeout/error handling
- **Design Tokens**: CSS custom properties for strict black/white palette
- **Typography**: Playfair Display (serif display) + DM Sans/Syne (sans body)
- **API Fallback**: Static JSON for categories/stats when endpoints unavailable
