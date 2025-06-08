import "tmaui/dist/styles.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { tonConnectOptions } from "./utils/ton-connect";

import {
  isMiniAppDark,
  retrieveLaunchParams,
  useLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";

import { AppRoot } from "tmaui";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./root.css";
import { Navigator } from "./components/Navigator";
import { main } from "./main";
import { mockEnv } from "./mock";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// export const loader = async ({
//   request,
//   params,
//   context,
// }: Route.LoaderArgs) => {
//   console.log("root.loader()");

//   return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
// };

export const clientLoader = async ({
  request,
  serverLoader,
  params,
}: Route.ClientLoaderArgs) => {
  try {
    await mockEnv();

    const launchParams = retrieveLaunchParams();
    const { tgWebAppPlatform: platform } = launchParams;

    const debug =
      (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
      import.meta.env.DEV;

    const opts = {
      debug,
      eruda: debug && ["ios", "android"].includes(platform),
      mockForMacOS: import.meta.env.TELEGRAM_PLATFORM === "macOS",
    };

    await main(opts);
    return { lp: launchParams };
  } catch (error) {
    console.error("root", error);
  }
  return { lp: {} };
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Only access Telegram SDK on client side
  let isDark = false;
  let platform: "ios" | "base" = "base";

  try {
    const isDarkSignal = useSignal(isMiniAppDark);
    isDark = isDarkSignal || false;

    const launchParams = useLaunchParams();
    platform = ["macos", "ios"].includes(launchParams.tgWebAppPlatform)
      ? "ios"
      : "base";
  } catch (error) {
    console.warn("Could not access Telegram SDK:", error);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TonConnectUIProvider {...tonConnectOptions}>
          <AppRoot appearance={isDark ? "dark" : "light"} platform={platform}>
            {children}
            <Navigator />
          </AppRoot>
        </TonConnectUIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // Use isRouteErrorResponse to check for 404/NotFound
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}
