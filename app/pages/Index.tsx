import {
  Text,
  Title,
  Card,
  Cell,
  Image,
  Avatar,
  Button,
  Placeholder,
} from "tmaui";

// Import TON logo
import tonLogoUrl from "../assets/ton.svg";

interface IndexPageProps {
  loaderData?: {
    message?: string;
    tgWebAppPlatform?: string;
    tgWebAppColorScheme?: string;
  };
}

export function Index({ loaderData }: IndexPageProps) {
  console.log("Index page data:", loaderData);

  return (
    <>
      <Placeholder
        header={
          <Avatar size={96}>
            <Image src={tonLogoUrl} alt="TON Logo" />
          </Avatar>
        }
        description="Welcome to your Telegram Mini App template! This is built with React Router v7, Vite, and deployed on Cloudflare Workers."
      >
        <Title weight="2">TMA Template</Title>
      </Placeholder>

      <Card>
        <Cell
          before={
            <Avatar size={40}>
              <Image src={tonLogoUrl} alt="TON" />
            </Avatar>
          }
          subtitle="Environment message"
        >
          <Text>{loaderData?.message}</Text>
        </Cell>
      </Card>

      <Card>
        <Cell subtitle="Launch parameters">
          <Text>Platform: {loaderData?.tgWebAppPlatform || "Unknown"}</Text>
        </Cell>
        <Cell subtitle="Theme">
          <Text>
            Color Scheme: {loaderData?.tgWebAppColorScheme || "Unknown"}
          </Text>
        </Cell>
      </Card>
    </>
  );
}
