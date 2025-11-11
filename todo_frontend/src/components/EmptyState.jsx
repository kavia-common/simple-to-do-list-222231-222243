import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Visual empty state for when no tasks exist. */
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="icon">📝</div>
      <p className="msg">No tasks yet. Add your first task above.</p>
    </div>
  );
}
