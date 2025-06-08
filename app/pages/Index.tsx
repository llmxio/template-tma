import { DisplayData } from "@/components/DisplayData";
import type { DisplayDataRow } from "@/components/DisplayData/DisplayData";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Link } from "@/components/Link";
import "./Index.css";

export function Index() {
  const launchParams = useLaunchParams() as any; // Type assertion needed due to Telegram SDK typing
  // Transform launchParams into DisplayDataRow format
  const rows: DisplayDataRow[] = [];

  if (launchParams && Object.keys(launchParams).length > 0) {
    // Add Telegram-specific data
    if ("tgWebAppPlatform" in launchParams && launchParams.tgWebAppPlatform) {
      rows.push({
        title: "Platform",
        value: launchParams.tgWebAppPlatform,
      });
    }

    if (
      "tgWebAppColorScheme" in launchParams &&
      launchParams.tgWebAppColorScheme
    ) {
      rows.push({
        title: "Color Scheme",
        value: launchParams.tgWebAppColorScheme,
      });
    }

    if ("tgWebAppVersion" in launchParams && launchParams.tgWebAppVersion) {
      rows.push({
        title: "WebApp Version",
        value: launchParams.tgWebAppVersion,
      });
    }

    if (
      "tgWebAppStartParam" in launchParams &&
      launchParams.tgWebAppStartParam
    ) {
      rows.push({
        title: "Start Parameter",
        value: launchParams.tgWebAppStartParam,
      });
    }

    // Add theme parameters if available
    if (
      "tgWebAppThemeParams" in launchParams &&
      launchParams.tgWebAppThemeParams
    ) {
      Object.entries(launchParams.tgWebAppThemeParams).forEach(
        ([key, value]) => {
          rows.push({
            title: `Theme: ${key}`,
            value: String(value),
          });
        }
      );
    }

    // Add any other launch parameters
    Object.entries(launchParams).forEach(([key, value]) => {
      if (!key.startsWith("tgWebApp") && value !== undefined) {
        rows.push({
          title: key,
          value:
            typeof value === "object" ? JSON.stringify(value) : String(value),
        });
      }
    });
  }

  // If no data, show a message
  if (rows.length === 0) {
    rows.push({
      title: "Status",
      value: "No launch data available",
    });
  }

  return (
    <div>
      <DisplayData header="TMA Template - Launch Parameters" rows={rows} />

      {/* Test links for slide transitions */}
      <div
        style={{
          padding: "20px",
          borderTop:
            "1px solid var(--tg-theme-section-separator-color, #e5e5e5)",
          marginTop: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>🎵 Test Slide Transitions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            to="/track/The%20Beatles/Yesterday"
            viewTransition
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--tg-theme-button-color, #3390ec)",
              color: "var(--tg-theme-button-text-color, white)",
              borderRadius: "8px",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
          >
            🎼 Play "Yesterday" by The Beatles
          </Link>

          <Link
            to="/track/Queen/Bohemian%20Rhapsody"
            viewTransition
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--tg-theme-button-color, #3390ec)",
              color: "var(--tg-theme-button-text-color, white)",
              borderRadius: "8px",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
          >
            🎸 Play "Bohemian Rhapsody" by Queen
          </Link>

          <Link
            to="/track/Daft%20Punk/Around%20the%20World"
            viewTransition
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--tg-theme-button-color, #3390ec)",
              color: "var(--tg-theme-button-text-color, white)",
              borderRadius: "8px",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
          >
            🤖 Play "Around the World" by Daft Punk
          </Link>
        </div>

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Try swiping horizontally between Main and Profile tabs!
        </p>
      </div>
    </div>
  );
}
