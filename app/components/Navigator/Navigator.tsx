import { Tabbar, Navigation } from "tmaui";
import { useTonWallet } from "@tonconnect/ui-react";
import {
  Icon20Stars,
  Icon20StarsFilled,
  Icon28User,
  Icon28UserOutline,
} from "@vkontakte/icons";

import { useLocation, useNavigate } from "react-router";
import "./Navigator.css";
import { bem } from "@/css/bem";

import { getActiveTab, getTabRoute } from "./shared";
import { Link } from "@/components/Link";
const [_, elem] = bem("navigator");

/**
 * Main application navigation component that displays a persistent bottom tab bar
 * on every page of the application with view transition support
 */
export function Navigator() {
  const location = useLocation();
  const wallet = useTonWallet();

  const activeTab = getActiveTab(location.pathname);

  return (
    <>
      <Tabbar className={elem("tabbar")}>
        <Link to={getTabRoute(0)} viewTransition className={elem("link")}>
          <Tabbar.Item
            text="Index"
            selected={activeTab === 0}
            className={elem("item", { active: activeTab === 0 })}
          >
            <Navigation>
              {activeTab === 0 ? (
                <Icon20StarsFilled width={28} height={28} />
              ) : (
                <Icon20Stars width={28} height={28} />
              )}
            </Navigation>
          </Tabbar.Item>
        </Link>
        <Link to={getTabRoute(1)} viewTransition className={elem("link")}>
          <Tabbar.Item
            text="Profile"
            selected={activeTab === 1}
            className={elem("item", { active: activeTab === 1 })}
          >
            <Navigation>
              {activeTab === 1 ? <Icon28User /> : <Icon28UserOutline />}
            </Navigation>
          </Tabbar.Item>
        </Link>
      </Tabbar>
    </>
  );
}
