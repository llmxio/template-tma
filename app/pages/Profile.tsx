import { openLink } from "@telegram-apps/sdk-react";
import { Avatar, Cell, List, Placeholder, Section, Text, Title } from "tmaui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

export function Profile() {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <Placeholder
        className=""
        header="TON Connect"
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required to
              connect your wallet
            </Text>
            <TonConnectButton />
          </>
        }
      />
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <List>
      {"imageUrl" in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar src={wallet.imageUrl} alt="Provider logo" size={48} />
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
          <TonConnectButton />
        </>
      )}
      <Section header="Account">
        <Cell subtitle="Address">
          <Text>{address}</Text>
        </Cell>
        <Cell subtitle="Chain">
          <Text>{chain}</Text>
        </Cell>
        <Cell subtitle="Public Key">
          <Text>{publicKey}</Text>
        </Cell>
      </Section>

      <Section header="Device">
        <Cell subtitle="App Name">
          <Text>{appName}</Text>
        </Cell>
        <Cell subtitle="App Version">
          <Text>{appVersion}</Text>
        </Cell>
        <Cell subtitle="Max Protocol Version">
          <Text>{maxProtocolVersion.toString()}</Text>
        </Cell>
        <Cell subtitle="Platform">
          <Text>{platform}</Text>
        </Cell>
        <Cell subtitle="Features">
          <Text>
            {features
              .map((f) => (typeof f === "object" ? f.name : undefined))
              .filter((v) => v)
              .join(", ")}
          </Text>
        </Cell>
      </Section>
    </List>
  );
}
