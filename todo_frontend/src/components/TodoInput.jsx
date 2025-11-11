import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Input bar for adding a new todo item. */
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd?.(text);
    setText("");
  };

  return (
    <form className="todo-input" onSubmit={submit} aria-label="Add new task">
      <label htmlFor="new-todo" className="sr-only">
        New task
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task"
      />
      <button type="submit" className="btn primary" aria-label="Add task">
        Add
      </button>
    </form>
  );
}
