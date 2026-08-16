// Base URL for all our backend API calls.
// Since the HTML page is served BY Spring Boot itself (same origin, same port 8080),
// a relative path like this works — no need for the full http://localhost:8080 part.
const API_URL = "/api/todos";

// Grab references to the HTML elements we'll need to read from or update.
// These match the id="..." attributes we added in index.html.
const todoListEl = document.getElementById("todo-list");
const emptyStateEl = document.getElementById("empty-state");
const remainingCountEl = document.getElementById("remaining-count");
const addFormEl = document.getElementById("add-form");
const titleInputEl = document.getElementById("title-input");
const categoryInputEl = document.getElementById("category-input");
const dueDateInputEl = document.getElementById("due-date-input");
const priorityInputEl = document.getElementById("priority-input");

// ---- Fetching todos from the backend ----

async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
}

// ---- Turning the data into HTML on the page ----

function renderTodos(todos) {
  // Clear whatever is currently shown, then rebuild from scratch.
  todoListEl.innerHTML = "";

  emptyStateEl.hidden = todos.length > 0;

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCountEl.textContent = remaining;

  todos.forEach((todo) => {
    todoListEl.appendChild(createTodoElement(todo));
  });
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.completed ? " todo-item--done" : "");

  li.innerHTML = `
    <div class="todo-item__main">
      <label class="todo-item__label">
        <input type="checkbox" class="todo-item__checkbox" ${todo.completed ? "checked" : ""}>
        <span class="todo-item__text">${escapeHtml(todo.title)}</span>
      </label>
      <button class="todo-item__delete" aria-label="Delete task">&times;</button>
    </div>
    <div class="todo-item__meta">
      <span class="badge badge--${todo.priority.toLowerCase()}">${todo.priority}</span>
      <span class="tag">${escapeHtml(todo.category)}</span>
      <span class="due-date">Due ${formatDate(todo.dueDate)}</span>
    </div>
  `;

  // Wire up this specific item's checkbox and delete button.
  const checkbox = li.querySelector(".todo-item__checkbox");
  checkbox.addEventListener("change", () => toggleComplete(todo, checkbox.checked));

  const deleteButton = li.querySelector(".todo-item__delete");
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  return li;
}

// Basic protection against task titles that contain HTML-like text
// (so someone typing "<b>hi</b>" doesn't actually create bold text or break the page).
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// ---- Adding a new todo ----

addFormEl.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the browser's default "reload the page" form behavior

  const newTodo = {
    title: titleInputEl.value.trim(),
    category: categoryInputEl.value.trim(),
    dueDate: dueDateInputEl.value, // already in YYYY-MM-DD format from the date input
    priority: priorityInputEl.value,
    completed: false,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Failed to add todo");
    }

    // Success — clear the form and refresh the list from the server.
    addFormEl.reset();
    loadTodos();
  } catch (error) {
    console.error("Failed to add todo:", error);
    alert("Couldn't add that task: " + error.message);
  }
});

// ---- Toggling completed state ----

async function toggleComplete(todo, isCompleted) {
  const updatedTodo = { ...todo, completed: isCompleted };

  try {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    loadTodos();
  } catch (error) {
    console.error("Failed to update todo:", error);
  }
}

// ---- Deleting a todo ----

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    loadTodos();
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

// ---- Run once when the page first loads ----

loadTodos();