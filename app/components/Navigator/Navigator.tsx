import { Tabbar, Navigation } from "tmaui";

import { useTonWallet } from "@tonconnect/ui-react";
import {
  Icon28Music,
  Icon28MusicOutline,
  Icon28User,
  Icon28UserOutline,
} from "@vkontakte/icons";

import { useLocation } from "react-router";
import { Link } from "@/components/Link";
import { bem } from "@/css/bem";

import { getActiveTab, getTabRoute } from "./shared";
import "./Navigator.css";

const [block, elem] = bem("navigator");

/**
 * Main application navigation component that displays a persistent bottom tab bar
 * on every page of the application
 */
export function Navigator() {
  const location = useLocation();
  const wallet = useTonWallet();

  const activeTab = getActiveTab(location.pathname);

  return (
    <div className={block()}>
      <Tabbar className={elem("tabbar")}>
        <Link to={getTabRoute(0)} viewTransition className={elem("link")}>
          <Tabbar.Item
            text="Main"
            selected={activeTab === 0}
            className={elem("item", { active: activeTab === 0 })}
          >
            <Navigation>
              {activeTab === 0 ? <Icon28Music /> : <Icon28MusicOutline />}
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
    </div>
  );
}
