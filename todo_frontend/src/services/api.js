import { getApiBaseUrl, isApiEnabled } from "../utils/env";

/**
 * Lightweight API client abstraction for todos.
 * If feature flag useApi=true, it will use fetch to call the API.
 * Otherwise, it will no-op and let caller use local state path.
 */

const BASE = getApiBaseUrl();
const API_ENABLED = isApiEnabled();

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`API ${resp.status}: ${text || resp.statusText}`);
  }
  const contentType = resp.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return resp.json();
  }
  return resp.text();
}

// PUBLIC_INTERFACE
export async function apiListTodos() {
  /** Lists todos from API when enabled; throws if not enabled. */
  if (!API_ENABLED) {
    throw new Error("API mode disabled");
  }
  return request("/api/todos", { method: "GET" });
}

// PUBLIC_INTERFACE
export async function apiCreateTodo(todo) {
  /** Creates a todo via API when enabled; throws if not enabled. */
  if (!API_ENABLED) {
    throw new Error("API mode disabled");
  }
  return request("/api/todos", { method: "POST", body: JSON.stringify(todo) });
}

// PUBLIC_INTERFACE
export async function apiUpdateTodo(id, patch) {
  /** Updates a todo via API when enabled; throws if not enabled. */
  if (!API_ENABLED) {
    throw new Error("API mode disabled");
  }
  return request(`/api/todos/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

// PUBLIC_INTERFACE
export async function apiDeleteTodo(id) {
  /** Deletes a todo via API when enabled; throws if not enabled. */
  if (!API_ENABLED) {
    throw new Error("API mode disabled");
  }
  return request(`/api/todos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
