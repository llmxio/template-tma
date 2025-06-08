# Copilot Instructions for Template TMA

## Project Overview

This is a **Telegram Mini App (TMA)** built with **React Router v7**, deployed on **Cloudflare Workers**. The app appears to be a music-related application with radio, profile, jam, and bands features.

## Tech Stack & Architecture

- **Frontend**: React 19.1.0 with TypeScript
- **Routing**: React Router v7 (file-based routing with layouts)
- **Build System**: Vite 6.3.5 with React Router integration
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Deployment**: Cloudflare Workers with Wrangler v4.19.1
- **Development**: Hot reload, TypeScript path mapping, SCSS support
- **Telegram Integration**: @telegram-apps/sdk-react v3.3.0
- **TON Integration**: @tonconnect/ui-react v2.1.0

## Project Structure

### Key Directories

- `app/` - Main application code (React Router v7 structure)
  - `layouts/` - Layout components (RootNoBack.tsx, RootWithBack.tsx)
  - `types/` - TypeScript type definitions (apiTypes.ts, appTypes.ts)
  - `utils/` - Utility functions (telegram-env.ts, ton-connect.ts, public-url.ts)
  - `routes.ts` - Route configuration with nested layouts
  - `main.ts` - Telegram SDK initialization
  - `mock.ts` - Development environment mocking
  - `root.tsx` - App root component
  - `entry.server.tsx` - SSR entry point
- `workers/` - Cloudflare Worker entry point (app.ts)
- `public/` - Static assets (favicon.ico, logobot.png)

### Important Configuration Files

- `vite.config.ts` - Vite build configuration with React Router, Cloudflare, Tailwind plugins
- `react-router.config.ts` - React Router SSR and future flags configuration
- `wrangler.jsonc` - Cloudflare Worker deployment configuration
- `tsconfig.*.json` - TypeScript configurations for different environments
- `worker-configuration.d.ts` - Auto-generated Cloudflare types

## Coding Patterns & Conventions

### React Router v7 Patterns

- Use file-based routing defined in `app/routes.ts`
- Two main layouts: `RootNoBack` (for main pages) and `RootWithBack` (for detail pages)
- Route parameters: `/track/:trackArtist/:trackTitle` pattern
- Use `Route.LoaderArgs`, `Route.ClientLoaderArgs` for data loading
- Use `Route.LinksFunction` for document head management
- Routes referenced: radio, profile, jam, bands, track (some not yet implemented)

### Vite Build System Patterns

- Modern Vite 6.3.5 configuration with multiple plugins
- React Router integration via `@react-router/dev/vite`
- Cloudflare Workers support via `@cloudflare/vite-plugin`
- Tailwind CSS v4 integration via `@tailwindcss/vite`
- TypeScript path mapping via `vite-tsconfig-paths`
- SCSS preprocessor support with modern API
- Development server configured for network access (mobile testing)
- SSR enabled through React Router config

### Telegram Mini App Patterns

- Initialize SDK in `main.ts` with proper platform detection
- Use `@telegram-apps/sdk-react` hooks: `useSignal`, theme management
- Handle back button with `showBackButton`, `hideBackButton`, `onBackButtonClick`
- Mock environment for development in `mock.ts`
- Use Telegram theme parameters for styling

### Cloudflare Workers Integration

- Worker entry point in `workers/app.ts`
- Use `AppLoadContext` for Cloudflare environment access
- Type definitions in `worker-configuration.d.ts` (auto-generated)
- Environment variables defined in `wrangler.jsonc`

### TypeScript Conventions

- Strict TypeScript configuration with multiple tsconfig files
- Types organized in `app/types/` directory
- Use `satisfies` operator for type checking
- Export types from barrel file `app/types/index.ts`

### Styling Patterns

- Tailwind CSS v4 with modern configuration
- CSS custom properties for Telegram theme integration
- Responsive design considerations for mobile Telegram interface
- **Use `tmaui` library components for all UI elements** (buttons, inputs, cards, etc.)
- **Avoid HTML tags like `<button>`, `<input>`, `<form>`, `<select>`, etc.**
- **Only use `<div>` and `<span>` for layout and text containers**

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server (background task)
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to Cloudflare
- `npm run typegen` - Generate Cloudflare types
- `npm run typecheck` - Type checking

### Key Dependencies

- `@telegram-apps/sdk-react` - Telegram SDK
- `@tonconnect/ui-react` - TON Connect integration
- `react-swipeable` - Touch gesture support
- `tmaui` - Telegram Mini App UI components (primary UI library)

## Coding Guidelines

### When suggesting React components:

1. Use functional components with hooks
2. Implement proper TypeScript typing
3. Consider Telegram Mini App constraints (mobile-first, limited viewport)
4. **Use `tmaui` components instead of HTML tags** (avoid `<button>`, `<input>`, etc.)
5. **Only use `<div>` and `<span>` for layout/containers when necessary**
6. Use Tailwind classes for styling
7. Handle back button navigation appropriately
8. Consider theme switching (light/dark mode)

### When working with routes:

1. Follow the two-layout pattern (with/without back button)
2. Use proper route parameter typing
3. Implement error boundaries
4. Consider loading states and fallbacks

### When integrating Telegram features:

1. Check SDK availability before using features
2. Handle platform-specific behavior (especially macOS)
3. Use proper theme parameter integration
4. Consider haptic feedback and native UI elements

### When working with Cloudflare Workers:

1. Use proper environment variable typing
2. Handle request context appropriately
3. Consider edge computing constraints
4. Use proper error handling for worker execution

## Common Patterns to Follow

### Component Structure

```typescript
import { useSignal } from "@telegram-apps/sdk-react";
import type { Route } from "./+types/component-name";

export default function ComponentName({ loaderData }: Route.ComponentProps) {
  // Component logic
}
```

### Route Configuration

```typescript
route("path/:param", "routes/file.tsx");
```

### Environment Handling

```typescript
if (import.meta.env.DEV) {
  // Development-only code
}
```

### Telegram SDK Usage

```typescript
import {
  showBackButton,
  hideBackButton,
  onBackButtonClick,
} from "@telegram-apps/sdk-react";
```

## Performance Considerations

- SSR is enabled for better initial load times
- Code splitting with dynamic imports
- Cloudflare edge deployment for global performance
- Mobile-optimized bundling for Telegram clients

## Security Considerations

- Validate Telegram init data
- Use proper CORS configuration
- Handle user authentication securely
- Validate environment variables in production
