import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import { useTodos } from './hooks/useTodos';

/**
 * App entrypoint for the To-do application UI.
 * Renders header, input, list, and filters with Ocean Professional theme.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const {
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
  } = useTodos();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <div className="container">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <TodoInput onAdd={addTodo} />

        {error ? (
          <div role="alert" style={{ color: 'var(--error)', marginTop: 12 }}>
            {error}
          </div>
        ) : null}
        {loading ? (
          <div role="status" aria-live="polite" style={{ marginTop: 12, color: 'var(--muted)' }}>
            Loading...
          </div>
        ) : null}

        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />

        <Filters
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          itemsLeft={itemsLeft}
        />
      </div>
    </div>
  );
}

export default App;
