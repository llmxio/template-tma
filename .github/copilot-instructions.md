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

## Essential Code Patterns

### Route Component Structure
```tsx
import type { Route } from "./+types/component-name";

export default function ComponentName({ loaderData }: Route.ComponentProps) {
  // Use tmaui components, avoid HTML elements
  return (
    <AppRoot>
      {/* Component content */}
    </AppRoot>
  );
}
```

### Telegram Back Button Handling
```tsx
import { hideBackButton, showBackButton, onBackButtonClick } from "@telegram-apps/sdk-react";

// In RootNoBack layout: hideBackButton()
// In RootWithBack layout: showBackButton() + onBackButtonClick handler
```

### Component Development Guidelines
1. **Always use tmaui components**: `Button`, `Cell`, `Section`, `Tabbar`, etc.
2. **Never use HTML form elements**: `<button>`, `<input>`, `<form>`, `<select>`
3. **Use VK Icons**: `Icon20Stars`, `Icon28User` with filled/outline variants
4. **Apply BEM methodology**: Use `bem()` helper for CSS classes
5. **Handle theme changes**: CSS variables automatically sync with Telegram theme

### Mobile-First Considerations
- Network-accessible dev server (`host: true`) for device testing
- Platform-specific behavior handling (especially macOS quirks)
- Responsive design within Telegram's viewport constraints
- Performance optimization for mobile devices

## Workflow Integration for AI Agents

### Before Development
1. Run `npm run typegen` to generate types
2. Check if new dependencies require installation
3. Verify build works: `npm run build`

### During Development
1. Use `npm run dev` for development server
2. Test on mobile devices using network access
3. Validate types with `npm run typecheck`
4. Follow existing component patterns in `app/components/`

### Component Creation Checklist
- [ ] Use tmaui components only (no HTML elements)
- [ ] Apply proper TypeScript typing with Route types
- [ ] Use `@/` path imports with vite-tsconfig-paths
- [ ] Implement BEM CSS methodology with `bem()` helper
- [ ] Handle Telegram theme integration
- [ ] Consider mobile viewport and performance

### Data Loading Patterns
```tsx
// Server loader with Cloudflare environment access
export const loader = async ({ context }: Route.LoaderArgs) => {
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
};

// Client loader with Telegram launch parameters
export const clientLoader = async ({ serverLoader }: Route.ClientLoaderArgs) => {
  const serverData = await serverLoader();
  const launchParams = retrieveLaunchParams();
  return { ...serverData, ...launchParams };
};
```

### Meta Data & SEO
```tsx
export function meta({}: Route.MetaArgs) {
  return [
    { title: "TMA Template - Page Title" },
    { name: "description", content: "Page description for Telegram Mini App" },
  ];
}
```

## Common Gotchas for AI Agents

### Telegram SDK Availability
- Always check if Telegram features are available before using them
- Use `.ifAvailable()` methods for mounting components
- Handle development vs production environment differences

### Platform-Specific Behavior  
- macOS Telegram client has known bugs requiring special mocking
- iOS vs Android platform detection affects styling
- Development environment automatically mocks Telegram environment

### Type Generation Dependencies
- Run `npm run typegen` before development to generate route types
- Cloudflare types are auto-generated in `worker-configuration.d.ts`
- React Router types are auto-generated in `.react-router/types/`

### Performance Considerations
- Bundle size matters for mobile Telegram clients
- Use dynamic imports for code splitting when appropriate
- SSR is enabled for faster initial load times
- Consider edge deployment constraints for data fetching
