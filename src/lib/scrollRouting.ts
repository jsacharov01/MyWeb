// Minimal path-based section routing for a SPA without a router
// Supports deep links like /portfolio, /services, /contact, /certifikace

const pathToId: Record<string, string> = {
  "/": "",
  "/about": "about",
  "/services": "services",
  "/portfolio": "portfolio",
  "/contact": "contact",
  "/certifikace": "certifikace",
};

function scrollToId(id: string) {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function resolveIdFromPath(pathname: string, hash: string): string | undefined {
  // Prefer hash if present (e.g., /#portfolio)
  if (hash && hash.startsWith("#")) {
    return hash.slice(1);
  }
  return pathToId[pathname] || undefined;
}

function handleScrollForLocation() {
  const { pathname, hash } = window.location;
  const id = resolveIdFromPath(pathname, hash);
  if (id) {
    // Delay to ensure initial paint
    setTimeout(() => scrollToId(id), 0);
  }
}

export function navigateTo(path: string) {
  if (typeof window === "undefined") return;
  if (window.location.pathname === path) {
    handleScrollForLocation();
    return;
  }
  window.history.pushState({}, "", path);
  handleScrollForLocation();
}

export function useSectionRouting() {
  if (typeof window === "undefined") return;
  // Run on first load
  handleScrollForLocation();
  const onPop = () => handleScrollForLocation();
  window.addEventListener("popstate", onPop);
  // Return cleanup function in case used in React effect
  return () => window.removeEventListener("popstate", onPop);
}
