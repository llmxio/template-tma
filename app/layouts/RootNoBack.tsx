import { Outlet } from "react-router";
import { hideBackButton, isBackButtonMounted } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useSwipeNavigation } from "@/hooks";

export default function RootNoBack() {
  const { swipeHandlers } = useSwipeNavigation({
    minSwipeDistance: 100,
    minSwipeVelocity: 0.5,
  });

  useEffect(() => {
    if (isBackButtonMounted() && hideBackButton.isAvailable()) {
      hideBackButton();
    }
  }, []);

  return (
    <div
      {...swipeHandlers}
      style={{
        width: "100%",
        height: "100vh",
        touchAction: "pan-y", // Allow vertical scrolling but handle horizontal swipes
        position: "relative",
      }}
    >
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
