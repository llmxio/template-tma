import { useNavigate, Outlet } from "react-router";
import {
  showBackButton,
  onBackButtonClick,
  isBackButtonMounted,
} from "@telegram-apps/sdk-react";

import { useEffect } from "react";

export default function RootWithBack() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isBackButtonMounted() && showBackButton.isAvailable()) {
      showBackButton();
    }

    return onBackButtonClick(() => {
      navigate(-1);
    });
  }, [navigate]);

  return <Outlet />;
}
