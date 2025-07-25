import { openLink } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Cell,
  Divider,
  Placeholder,
  Section,
  Text,
  Title,
} from "tmaui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { DisplayData } from "@/components/DisplayData";
import { Link } from "@/components/Link";
import { bem } from "@/css/bem";
import "./Profile.css";

const [, e] = bem("ton-connect-page");

export function Profile() {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <>
        <Placeholder
          className={e("placeholder")}
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required
                to connect your wallet
              </Text>
              <TonConnectButton className={e("button")} />
            </>
          }
        />
      </>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <>
      {"imageUrl" in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar
                  src={wallet.imageUrl}
                  alt="Provider logo"
                  width={60}
                  height={60}
                />
              }
              // after={<Navigation>About wallet</Navigation>}
              subtitle={wallet.appName}
              onClick={(e) => {
                e.preventDefault();
                openLink(wallet.aboutUrl);
              }}
              after={<TonConnectButton className={e("button-connected")} />}
            >
              <Title level="3">{wallet.name}</Title>
            </Cell>
          </Section>
        </>
      )}
      <DisplayData
        rows={[
          { title: "Address", value: address },
          { title: "Chain", value: chain },
          { title: "Public Key", value: publicKey },
        ]}
      />
      <Divider />
      <DisplayData
        rows={[
          { title: "App Name", value: appName },
          { title: "App Version", value: appVersion },
          { title: "Max Protocol Version", value: maxProtocolVersion },
          { title: "Platform", value: platform },
          {
            title: "Features",
            value: features
              .map((f) => (typeof f === "object" ? f.name : undefined))
              .filter((v) => v)
              .join(", "),
          },
        ]}
      />
    </>
  );
}
