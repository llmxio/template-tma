import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router";
import {
  getActiveTab,
  getNextTab,
  getPrevTab,
  getTabRoute,
} from "@/components/Navigator/shared";

interface SwipeNavigationOptions {
  /** Minimum distance in pixels to trigger navigation */
  minSwipeDistance?: number;
  /** Minimum velocity to trigger navigation */
  minSwipeVelocity?: number;
}

/**
 * Custom hook for handling horizontal swipe navigation between tabs
 * Integrates with React Router's view transitions for smooth animations
 */
export function useSwipeNavigation(options: SwipeNavigationOptions = {}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { minSwipeDistance = 50, minSwipeVelocity = 0.3 } = options;

  const currentTab = getActiveTab(location.pathname);

  const navigateToTab = (
    direction: "forward" | "backward",
    targetTab: number
  ) => {
    if (targetTab !== currentTab && targetTab >= 0 && targetTab < 2) {
      // Ensure valid tab range
      // Add direction class to document for CSS animations
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // Swipe left = navigate forward (next tab)
      if (
        eventData.absX >= minSwipeDistance &&
        eventData.velocity >= minSwipeVelocity
      ) {
        const nextTab = getNextTab(currentTab);
        if (nextTab !== currentTab) {
          navigateToTab("forward", nextTab);
        }
      }
    },
    onSwipedRight: (eventData) => {
      // Swipe right = navigate backward (previous tab)
      if (
        eventData.absX >= minSwipeDistance &&
        eventData.velocity >= minSwipeVelocity
      ) {
        const prevTab = getPrevTab(currentTab);
        if (prevTab !== currentTab) {
          navigateToTab("backward", prevTab);
        }
      }
    },
    delta: 10, // Min distance before recognizing swipe
    preventScrollOnSwipe: false, // Allow vertical scrolling
    trackTouch: true,
    trackMouse: false, // Only track touch events for mobile
    swipeDuration: 500, // Max swipe duration
    touchEventOptions: { passive: false }, // Allow preventDefault for better control
  });

  return {
    swipeHandlers,
    currentTab,
    navigateToTab,
  };
}
