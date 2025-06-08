import type { Route } from "./+types/profile";
import { Profile } from "@/pages/Profile";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TMA Template - Wallet" },
    { name: "description", content: "TMA Template - Wallet" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
}

export const clientLoader = async ({
  request,
  serverLoader,
  params,
}: Route.ClientLoaderArgs) => {
  try {
    const serverParams = await serverLoader();
    const launchParams = retrieveLaunchParams();

    return { ...launchParams, ...serverParams };
  } catch (error) {
    console.error("profile", error);
  }
};

export default function ProfileRoute({ loaderData }: Route.ComponentProps) {
  return <Profile />;
}
