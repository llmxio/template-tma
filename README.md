# Telegram Mini App - Cloudflare Worker Template

A modern Telegram Mini App built with React Router v7 and deployed on Cloudflare Workers. TON Blockchain ready with integrated wallet connections and cryptocurrency interactions.

🤖 **Try the live example**: [@tma_cfbot](https://t.me/tma_cfbot)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/llmxio/template-tma)

## 🚀 Features

- **React Router v7** with file-based routing and SSR
- **Telegram Mini App SDK** integration with theme support
- **TON Connect** for blockchain interactions
- **Cloudflare Workers** deployment with edge computing
- **Tailwind CSS v4** for modern styling
- **TypeScript** with strict configuration

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers
- **Build Tool**: Vite with React Router
- **Deployment**: Wrangler
- **Mobile**: Telegram Mini App SDK

## 📦 Getting Started

### Prerequisites

- Node.js 20+
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
├── css/                # CSS utilities
├── layouts/            # Layout components
├── pages/              # Legacy page components
├── routes/             # React Router v7 route files
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├──
├── app.css             # Global styles
├── entry.server.tsx    # Server-side rendering entry
├── main.ts             # Telegram SDK initialization
├── mock.ts             # Development environment mocking
├── root.tsx            # App root component
└── routes.ts           # Route configuration

workers/
└── app.ts              # Cloudflare Worker entry point

public/                 # Static assets
```

## 🔧 Configuration

- `wrangler.jsonc` - Cloudflare Worker configuration
- `react-router.config.ts` - React Router configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.*.json` - TypeScript configurations

## 📱 Telegram Integration

The app integrates with Telegram's Mini App platform:

- Theme synchronization with Telegram client
- Back button navigation
- Platform-specific optimizations
- Development environment mocking

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
