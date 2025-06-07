import type { Route } from "./+types/index";
import { Index } from "@/pages/Index";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TMA Template" },
    { name: "description", content: "Welcome to Telegram Mini App Template!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  try {
    return {
      message:
        context.cloudflare.env.VALUE_FROM_CLOUDFLARE || "Hello from Cloudflare",
    };
  } catch (error) {
    console.error("Server-side error:", error);
    return {
      message: "Hello World",
    };
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  try {
    const serverParams = await serverLoader();
    const launchParams = retrieveLaunchParams();

    console.log("Launch params:", launchParams);

    return {
      ...launchParams,
      ...serverParams,
    };
  } catch (error) {
    console.error("Client loader error:", error);
    return {
      message: "Hello World",
    };
  }
}

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  return <Index loaderData={loaderData} />;
}
