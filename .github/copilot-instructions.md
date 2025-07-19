# GitHub Copilot Instructions

## Project Overview

This is a **Telegram Mini App (TMA)** built with React Router v7 and deployed on Cloudflare Workers. The architecture follows a dual-runtime pattern: client-side React app + server-side worker for SSR and edge deployment.

## Key Architecture Patterns

### Routing & Layouts

- **File-based routing** in `app/routes.ts` using React Router v7 helpers (`route()`, `layout()`, `index()`)
- **Dual layout system**: `RootNoBack.tsx` (main pages) vs `RootWithBack.tsx` (detail pages) - controls Telegram back button behavior
- **Route structure**: Main routes use `RootNoBack`, future detail routes like `/track/:artist/:title` use `RootWithBack`

### Cloudflare Workers Integration

- **Entry point**: `workers/app.ts` creates React Router request handler
- **Type augmentation**: Extends `AppLoadContext` to include Cloudflare `env` and `ctx`
- **SSR enabled**: React Router SSR with Cloudflare Workers runtime

### Telegram Mini App Patterns

- **SDK initialization**: `app/main.ts` mounts Telegram components (theme, viewport, back button)
- **Platform detection**: Handles iOS vs base platform styling
- **Development mocking**: `app/mock.ts` provides realistic Telegram environment for local dev
- **Theme integration**: CSS variables bound to Telegram theme parameters

## Critical Commands & Workflows

```bash
# Type generation (run before development)
npm run typegen  # Generates Cloudflare types + React Router types

# Development with network access (for mobile testing)
npm run dev  # Vite dev server with host: true

# Deployment pipeline
npm run deploy  # Builds + deploys to Cloudflare Workers
```

## Component Conventions

### UI Library Priority

1. **tmaui components** (primary) - `Tabbar`, `Cell`, `Button`, `AppRoot`, etc.
2. **VK Icons** - `Icon20Stars`, `Icon28User` with filled/outline variants
3. **Avoid HTML elements** - Use tmaui components instead of `<button>`, `<input>`, etc.

### CSS Methodology

- **BEM pattern**: Use `bem()` helper from `app/css/bem.ts`

```tsx
const [block, elem] = bem("component-name");
// Creates: .component-name, .component-name__element
```

### TON Connect Integration

- **Wallet provider**: `TonConnectUIProvider` wraps entire app in `root.tsx`
- **Manifest URL**: `https://static.llmx.io/tonconnect/tma-cf.llmx.io.json`
- **Usage**: `useTonWallet()` hook provides wallet state

## Project-Specific Patterns

### Path Mapping

- Use `@/` prefix for imports (configured in `tsconfig.json` + `vite-tsconfig-paths`)
- Example: `import { bem } from "@/css/bem"`

### Type Safety

- **Strict TypeScript**: Multiple tsconfig files for different environments
- **Route types**: Auto-generated in `.react-router/types/` via `npm run typegen`
- **Cloudflare types**: Auto-generated in `worker-configuration.d.ts`

### Development Environment

- **Network access**: Vite dev server runs with `host: true` for mobile device testing
- **Mock environment**: Telegram SDK automatically mocked in development
- **Hot reload**: Supports CSS, components, and route changes

## File Organization Principles

- **Components**: Reusable UI in `app/components/` with co-located CSS
- **Pages**: Route-specific components in `app/pages/`
- **Routes**: Route handlers in `app/routes/` (match file-based routing structure)
- **Utils**: Shared utilities in `app/utils/` (Telegram, TON Connect configs)
- **Types**: TypeScript definitions in `app/types/` with barrel exports

## Integration Points

- **Telegram SDK**: Theme sync, back button, platform detection via `@telegram-apps/sdk-react`
- **TON Blockchain**: Wallet connection via `@tonconnect/ui-react`
- **Cloudflare Workers**: SSR runtime with environment access
- **Build pipeline**: Vite + React Router + Cloudflare plugin coordination
