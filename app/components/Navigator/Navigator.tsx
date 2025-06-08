import { Tabbar, Navigation } from "tmaui";
import { useTonWallet } from "@tonconnect/ui-react";
import {
  Icon28Music,
  Icon28MusicOutline,
  Icon20Stars,
  Icon20StarsFilled,
  Icon28User,
  Icon28UserOutline,
} from "@vkontakte/icons";

import { useLocation, useNavigate } from "react-router";
import { bem } from "@/css/bem";

import { getActiveTab, getTabRoute, getNextTab, getPrevTab } from "./shared";
import "./Navigator.css";

const [_, elem] = bem("navigator");

/**
 * Main application navigation component that displays a persistent bottom tab bar
 * on every page of the application with view transition support
 */
export function Navigator() {
  const location = useLocation();
  const navigate = useNavigate();
  const wallet = useTonWallet();

  const activeTab = getActiveTab(location.pathname);

  const handleTabClick = (targetTab: number) => {
    if (targetTab !== activeTab && targetTab >= 0 && targetTab < 2) {
      const direction = targetTab > activeTab ? "forward" : "backward";

      // Add direction class for CSS animations
      document.documentElement.classList.remove(
        "slide-direction-forward",
        "slide-direction-backward"
      );
      document.documentElement.classList.add(`slide-direction-${direction}`);

      // Navigate with view transition
      navigate(getTabRoute(targetTab), {
        viewTransition: true,
      });

      // Clean up direction class after transition
      setTimeout(() => {
        document.documentElement.classList.remove(
          `slide-direction-${direction}`
        );
      }, 250); // Match animation duration
    }
  };

  return (
    <>
      <Tabbar className={elem("tabbar")}>
        <Tabbar.Item
          text="Main"
          selected={activeTab === 0}
          className={elem("item", { active: activeTab === 0 })}
          onClick={() => handleTabClick(0)}
        >
          <Navigation>
            {activeTab === 0 ? (
              <Icon20StarsFilled width={28} height={28} />
            ) : (
              <Icon20Stars width={28} height={28} />
            )}
          </Navigation>
        </Tabbar.Item>
        <Tabbar.Item
          text="Profile"
          selected={activeTab === 1}
          className={elem("item", { active: activeTab === 1 })}
          onClick={() => handleTabClick(1)}
        >
          <Navigation>
            {activeTab === 1 ? <Icon28User /> : <Icon28UserOutline />}
          </Navigation>
        </Tabbar.Item>
      </Tabbar>
    </>
  );
}
