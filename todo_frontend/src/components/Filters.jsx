import React from "react";

// PUBLIC_INTERFACE
export default function Filters({
  filter,
  setFilter,
  clearCompleted,
  itemsLeft,
}) {
  /** Filter controls and items-left count. */
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      <div className="left">
        <span aria-live="polite">{itemsLeft} item{itemsLeft === 1 ? "" : "s"} left</span>
      </div>
      <div className="center">
        <button
          className={`chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          aria-label="Show all tasks"
        >
          All
        </button>
        <button
          className={`chip ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
          aria-label="Show active tasks"
        >
          Active
        </button>
        <button
          className={`chip ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
          aria-label="Show completed tasks"
        >
          Completed
        </button>
      </div>
      <div className="right">
        <button
          className="btn subtle"
          onClick={clearCompleted}
          aria-label="Clear completed tasks"
          title="Clear completed"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
