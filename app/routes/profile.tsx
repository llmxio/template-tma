import type { Route } from "./+types/profile";
import { Profile } from "@/pages/Profile";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export const meta = ({}: Route.MetaArgs) => [
  { title: "Profile - Hot Shop Radio" },
  { name: "description", content: "Profile - Hot Shop Radio" },
];

export const loader = async ({ context }: Route.LoaderArgs) => {
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
};

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
