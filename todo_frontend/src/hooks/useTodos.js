import { useCallback, useEffect, useMemo, useState } from "react";
import { isApiEnabled } from "../utils/env";
import {
  apiCreateTodo,
  apiDeleteTodo,
  apiListTodos,
  apiUpdateTodo,
} from "../services/api";

const STORAGE_KEY = "todos:v1";
const FILTER_KEY = "todos:filter:v1";

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota or private mode errors
  }
}

// PUBLIC_INTERFACE
export function useTodos() {
  /**
   * A complete to-do state manager with:
   * - CRUD operations
   * - Filters: all | active | completed
   * - LocalStorage persistence when API disabled
   * - API-ready mode toggled via feature flag
   */
  const [todos, setTodos] = useState(() => safeLoad(STORAGE_KEY, []));
  const [filter, setFilter] = useState(() => safeLoad(FILTER_KEY, "all"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiMode = isApiEnabled();

  // Load from API if enabled
  useEffect(() => {
    let active = true;
    async function load() {
      if (!apiMode) return;
      setLoading(true);
      setError("");
      try {
        const list = await apiListTodos();
        if (!active) return;
        setTodos(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!active) return;
        setError(e?.message || "Failed to load todos");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [apiMode]);

  // Persist to localStorage when api is disabled
  useEffect(() => {
    if (!apiMode) {
      safeSave(STORAGE_KEY, todos);
    }
  }, [apiMode, todos]);

  useEffect(() => {
    safeSave(FILTER_KEY, filter);
  }, [filter]);

  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const itemsLeft = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const addTodo = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed) return;
      const newTodo = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      if (apiMode) {
        setLoading(true);
        setError("");
        try {
          const created = await apiCreateTodo({ text: trimmed });
          setTodos((prev) => [created, ...prev]);
        } catch (e) {
          setError(e?.message || "Failed to create todo");
        } finally {
          setLoading(false);
        }
      } else {
        setTodos((prev) => [newTodo, ...prev]);
      }
    },
    [apiMode]
  );

  const toggleTodo = useCallback(
    async (id) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      if (apiMode) {
        try {
          const updated = todos.find((t) => t.id === id);
          await apiUpdateTodo(id, { completed: !updated?.completed });
        } catch (e) {
          setError(e?.message || "Failed to update todo");
        }
      }
    },
    [apiMode, todos]
  );

  const editTodo = useCallback(
    async (id, text) => {
      const trimmed = (text || "").trim();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
      );
      if (apiMode) {
        try {
          await apiUpdateTodo(id, { text: trimmed });
        } catch (e) {
          setError(e?.message || "Failed to update todo");
        }
      }
    },
    [apiMode]
  );

  const deleteTodo = useCallback(
    async (id) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      if (apiMode) {
        try {
          await apiDeleteTodo(id);
        } catch (e) {
          setError(e?.message || "Failed to delete todo");
        }
      }
    },
    [apiMode]
  );

  const clearCompleted = useCallback(async () => {
    const toDelete = todos.filter((t) => t.completed).map((t) => t.id);
    setTodos((prev) => prev.filter((t) => !t.completed));
    if (apiMode) {
      try {
        await Promise.all(toDelete.map((id) => apiDeleteTodo(id)));
      } catch (e) {
        setError(e?.message || "Failed to clear completed");
      }
    }
  }, [apiMode, todos]);

  return {
    todos,
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    itemsLeft,
    loading,
    error,
    apiMode,
  };
}
