//
// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns parsed feature flags object from REACT_APP_FEATURE_FLAGS. */
  try {
    const raw = process.env.REACT_APP_FEATURE_FLAGS || "";
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Invalid REACT_APP_FEATURE_FLAGS JSON. Falling back to {}.", e);
    return {};
  }
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Resolves API base URL using env precedence and window origin as fallback. */
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return base?.replace(/\/+$/, "") || "";
}

// PUBLIC_INTERFACE
export function isApiEnabled() {
  /** Determines if API is enabled via feature flags. */
  const flags = getFeatureFlags();
  return Boolean(flags.useApi === true);
}

// PUBLIC_INTERFACE
export function getSiteUrl() {
  /** Returns the frontend site URL if provided, else window origin. */
  return (
    process.env.REACT_APP_FRONTEND_URL ||
    (typeof window !== "undefined" ? window.location.origin : "")
  );
}
