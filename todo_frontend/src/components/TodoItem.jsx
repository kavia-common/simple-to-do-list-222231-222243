import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  /** A single todo row with editable text and actions. */
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    const trimmed = (text || "").trim();
    onEdit?.(todo.id, trimmed);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      save();
    } else if (e.key === "Escape") {
      setText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          id={`toggle-${todo.id}`}
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => onToggle?.(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`}
        />
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={save}
            aria-label="Edit task text"
            autoFocus
          />
        ) : (
          <label
            htmlFor={`toggle-${todo.id}`}
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="actions">
        <button
          className="btn subtle"
          onClick={() => setIsEditing((v) => !v)}
          aria-label={isEditing ? "Save task" : "Edit task"}
          title={isEditing ? "Save" : "Edit"}
        >
          {isEditing ? "💾" : "✏️"}
        </button>
        <button
          className="btn danger"
          onClick={() => onDelete?.(todo.id)}
          aria-label="Delete task"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
