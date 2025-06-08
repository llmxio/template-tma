import { openLink } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Cell,
  Skeleton,
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
            >
              <Title level="3">{wallet.name}</Title>
            </Cell>
          </Section>
          <TonConnectButton className={e("button-connected")} />
        </>
      )}
      <DisplayData
        header="Account"
        rows={[
          { title: "Address", value: address },
          { title: "Chain", value: chain },
          { title: "Public Key", value: publicKey },
        ]}
      />

      <DisplayData
        header="Device"
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

      {/* Test section for slide transitions */}
      <div
        style={{
          padding: "20px",
          borderTop:
            "1px solid var(--tg-theme-section-separator-color, #e5e5e5)",
          marginTop: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>🎵 Your Music</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            to="/track/Pink%20Floyd/Wish%20You%20Were%20Here"
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
            🌙 Play "Wish You Were Here" by Pink Floyd
          </Link>

          <Link
            to="/track/Radiohead/Paranoid%20Android"
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
            🎭 Play "Paranoid Android" by Radiohead
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
          Swipe left/right to navigate between tabs, or tap links to test page
          transitions!
        </p>
      </div>
    </>
  );
}
