import React from "react";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

// PUBLIC_INTERFACE
export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  /** Renders the list of todos or an EmptyState when none are present. */
  if (!todos?.length) {
    return <EmptyState />;
  }

  return (
    <ul className="todo-list" role="list" aria-label="Todo items">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
