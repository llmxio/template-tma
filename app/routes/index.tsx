import type { Route } from "./+types/index";
import { Index } from "@/pages/Index";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TMA Template - Index" },
    { name: "description", content: "Welcome to Telegram Mini App Template!" },
  ];
}

export const loader = async ({ context }: Route.LoaderArgs) => {
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
};

export const clientLoader = async ({
  serverLoader,
}: Route.ClientLoaderArgs) => {
  try {
    const serverParams = await serverLoader();
    const launchParams = retrieveLaunchParams();

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
};

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  return <Index />;
}
