import { useState } from "react";

function ToDoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleSubmit(event) {
    event.preventDefault();

    setTodos((prev) => [
      ...prev,
      {
        createdAt: Date.now(),
        input: newTodo,
        completed: false,
      },
    ]);

    setNewTodo("");
  }

  // Filter logic
  const filteredTodos =
    filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  // Toggle completed
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.createdAt === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <>
      <h1>To Do List</h1>

      <div className="filter-button">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Enter the Todo:</label>

        <input
          type="text"
          id="todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.createdAt}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.createdAt)}
            />

            <span
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.input}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;