// Centralized navigation logic for tabbed navigation and swipe gestures

export const tabRoutes = ["/", "/profile"];

export function getActiveTab(pathname: string): number {
  if (pathname === "/" || pathname.startsWith("/index")) return 0;
  if (pathname.startsWith("/profile")) return 1;
  // For non-tab routes like track, return -1
  return -1;
}

export function getNextTab(currentTab: number): number {
  return currentTab < tabRoutes.length - 1 ? currentTab + 1 : currentTab;
}

export function getPrevTab(currentTab: number): number {
  return currentTab > 0 ? currentTab - 1 : currentTab;
}

export function getTabRoute(tabIndex: number): string {
  return tabRoutes[tabIndex] || "/";
}
