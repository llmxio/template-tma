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

  return <DisplayData header="TMA Template - Launch Parameters" rows={rows} />;
}
