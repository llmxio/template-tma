# Telegram Mini App - Cloudflare Worker Template

[![Test](https://github.com/llmxio/template-tma/actions/workflows/test.yml/badge.svg)](https://github.com/llmxio/template-tma/actions/workflows/test.yml) [![Dependabot Updates](https://github.com/llmxio/template-tma/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/llmxio/template-tma/actions/workflows/dependabot/dependabot-updates)

A modern Telegram Mini App built with React Router v7 and deployed on Cloudflare Workers. TON Blockchain ready with integrated wallet connections and cryptocurrency interactions.

🤖 **Try the live example**: [@tma_cfbot](https://t.me/tma_cfbot)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/llmxio/template-tma)

## 🚀 Features

- **React Router v7** with file-based routing and SSR
- **Telegram Mini App SDK** integration with theme support
- **TON Connect 2.2.0** for blockchain interactions
- **Cloudflare Workers** deployment with edge computing
- **Tailwind CSS v4** for modern styling with custom CSS variables
- **TypeScript** with strict configuration
- **VKontakte Icons** for UI components
- **TMAUI** for Telegram-native UI components

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, TypeScript 5.8.3, Tailwind CSS 4.1.11
- **Backend**: Cloudflare Workers
- **Build Tool**: Vite 7.0.5 with React Router 7.7.0
- **Deployment**: Wrangler 4.24.3
- **Mobile**: Telegram Mini App SDK 3.3.6

## 📦 Getting Started

### Prerequisites

- Node.js 22+ (aligned with CI/CD pipeline)
- npm or yarn
- Cloudflare account (for deployment)

### Development

```bash
# Install dependencies
npm install

# Generate types
npm run typegen

# Start development server
npm run dev
```

### Deployment

```bash
# Build and deploy to Cloudflare
npm run deploy

# Or dry run to test
npx wrangler deploy --dry-run
```

## 📁 Project Structure

```text
app/
├── assets/             # SVG assets (TON logos)
├── components/         # Reusable UI components
│   ├── DisplayData/    # Key-value pair display component
│   ├── Link/          # External link component
│   ├── Navigator/     # Bottom navigation component
│   └── RGB/           # Color display component
├── css/                # CSS utilities (BEM, classnames)
├── layouts/            # Layout components (RootNoBack, RootWithBack)
├── pages/              # Page components (Index, Profile, NotFound)
├── routes/             # React Router v7 route files
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── entry.server.tsx    # Server-side rendering entry
├── main.ts             # Telegram SDK initialization
├── mock.ts             # Development environment mocking
├── root.css            # Global styles
├── root.tsx            # App root component
└── routes.ts           # Route configuration

workers/
└── app.ts              # Cloudflare Worker entry point

public/                 # Static assets
```

## 🔧 Configuration

- `wrangler.jsonc` - Cloudflare Worker configuration
- `react-router.config.ts` - React Router v7 configuration with SSR
- `vite.config.ts` - Vite 7.0.5 build configuration
- `tsconfig.*.json` - TypeScript configurations (node, cloudflare)
- `tailwind.config.js` - Tailwind CSS v4 configuration

## 📱 Telegram Integration

The app integrates with Telegram's Mini App platform:

- Theme synchronization with Telegram client (light/dark mode)
- Back button navigation handling
- Platform-specific optimizations (iOS, Android, desktop)
- Development environment mocking with realistic data
- Launch parameters parsing and display
- Safe area and viewport management
- CSS variables binding for theme integration

## 🚢 Deployment

Deploy to Cloudflare Workers for global edge distribution:

```bash
npm run deploy
```

The app will be available at your Cloudflare Workers domain and can be integrated into Telegram bots.

## 🙏 Credits

This template builds upon the excellent work of:

- [TMA React.js Template](https://github.com/Telegram-Mini-Apps/reactjs-template/) - Base foundation for Telegram Mini App development
- [TMAUI](https://github.com/tophackr/tmaui) - Beautiful UI components for Telegram Mini Apps following native Telegram UI
