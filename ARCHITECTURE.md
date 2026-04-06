# Architecture

## Layers and dependency direction

- **core**: HTTP client, query keys/options, API modules, auth/i18n/analytics/cookies stubs, global stores, shared utilities. Imports only from `core` (and optionally shared types from `mocks` if you add contracts there; runtime code avoids importing `mocks`).
- **ui**: Design-system primitives (CVA, Tailwind, Base UI). No domain or feature concepts.
- **pattern**: Reusable composition (form wiring, data grid, error boundaries). Builds on `ui` + `core`.
- **layouts**: Structural shells only (`children`, optional cross-cutting props like `appVersion`).
- **features**: Self-contained modules (hooks, schemas, feature UI). May import other features deliberately.
- **routes**: Thin route definitions: guards (`beforeLoad`), prefetch (`loader`), URL validation (`validateSearch`), layout + feature composition.
- **mocks**: MSW handlers and worker/server setup for dev and tests.

Dependency arrows must follow: `routes → layouts | features | pattern | ui | core`, `features → pattern | ui | core`, `pattern → ui | core`, `layouts → ui | core`, `ui → ui`, `core → core`, `mocks → features | core`.

ESLint `eslint-plugin-boundaries` enforces this (see `eslint.config.js`).

## Conventions

- No barrel (`index.ts`) exports; import concrete files via path aliases (`@core/...`, `@ui/...`, etc.).
- Prefer `type` over `interface` for object types.
- Prefer functions over classes.
- Centralize TanStack Query keys in `src/core/keys.ts` (`@lukemorales/query-key-factory`) and reusable `queryOptions` in `src/core/queries.ts`.
- All HTTP goes through `src/core/http-resource.ts` (no raw `fetch` elsewhere).
- Forms: Valibot schemas as source of truth; TanStack Form in features/routes, shared field UI via `pattern/form` + `ui/form`.
- Route tree is generated into `src/routeTree.gen.ts` by the TanStack Router Vite plugin; do not edit by hand.

## Bootstrap order (`src/main.tsx`)

1. Optional MSW in development when `VITE_USE_MSW=true`.
2. `initializeAuth()` (refresh registration, session hydration).
3. Load i18n messages from persisted locale (`app-store` + `bootstrapI18n`).
4. `initRouteTracking(router)` (stub; extend for real analytics).
5. Render: `StrictMode` → `I18nProvider` → `QueryClientProvider` → `RouterProvider`.

## Tooling notes

- This repo pins **Vite 5** and **Tailwind CSS 3** with PostCSS for compatibility with **Node 18** in local/CI environments. The intended production stack per product requirements is **Vite 7+** and **Tailwind v4** (`@tailwindcss/vite`); upgrade Node to **20.19+** and swap the toolchain when your environment allows.
