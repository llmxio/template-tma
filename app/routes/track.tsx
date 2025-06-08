import type { Route } from "./+types/track";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.trackArtist} - ${params.trackTitle}` },
    {
      name: "description",
      content: `Playing ${params.trackTitle} by ${params.trackArtist}`,
    },
  ];
}

export async function loader({ context, params }: Route.LoaderArgs) {
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    trackArtist: params.trackArtist,
    trackTitle: params.trackTitle,
  };
}

export async function clientLoader({
  request,
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  try {
    const serverParams = await serverLoader();
    const launchParams = retrieveLaunchParams();

    return {
      ...launchParams,
      ...serverParams,
      trackArtist: params.trackArtist,
      trackTitle: params.trackTitle,
    };
  } catch (error) {
    console.error("track", error);
    return {
      trackArtist: params.trackArtist,
      trackTitle: params.trackTitle,
    };
  }
}

export default function TrackRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
        🎵 Now Playing
      </h1>
      <h2 style={{ marginBottom: "5px", textAlign: "center" }}>
        {loaderData?.trackTitle}
      </h2>
      <h3 style={{ marginBottom: "20px", textAlign: "center", opacity: 0.7 }}>
        by {loaderData?.trackArtist}
      </h3>
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "var(--tg-theme-button-color, #3390ec)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        🎼
      </div>
      <p style={{ textAlign: "center", opacity: 0.6 }}>
        Swipe or use the back button to return
      </p>
    </div>
  );
}
