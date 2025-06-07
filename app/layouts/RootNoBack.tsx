import { Outlet } from "react-router";
import { hideBackButton, isBackButtonMounted } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

export default function RootNoBack() {
  useEffect(() => {
    if (isBackButtonMounted() && hideBackButton.isAvailable()) {
      hideBackButton();
    }
  }, []);

  return <Outlet />;
}
