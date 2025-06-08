import { useNavigate, Outlet } from "react-router";
import {
  showBackButton,
  onBackButtonClick,
  isBackButtonMounted,
} from "@telegram-apps/sdk-react";
import { useSwipeNavigation } from "@/hooks";

import { useEffect } from "react";

export default function RootWithBack() {
  const navigate = useNavigate();
  const { swipeHandlers } = useSwipeNavigation({
    minSwipeDistance: 120,
    minSwipeVelocity: 0.6,
  });

  useEffect(() => {
    if (isBackButtonMounted() && showBackButton.isAvailable()) {
      showBackButton();
    }

    return onBackButtonClick(() => {
      // Add backward direction class for CSS animations
      document.documentElement.classList.remove(
        "slide-direction-forward",
        "slide-direction-backward"
      );
      document.documentElement.classList.add("slide-direction-backward");

      // Navigate back with view transition (use history back)
      window.history.back();

      // Clean up direction class after transition
      setTimeout(() => {
        document.documentElement.classList.remove("slide-direction-backward");
      }, 250);
    });
  }, [navigate]);

  return (
    <div
      {...swipeHandlers}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        touchAction: "pan-y", // Allow vertical scrolling but handle horizontal swipes
      }}
    >
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
