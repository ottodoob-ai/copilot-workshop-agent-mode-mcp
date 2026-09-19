const storageKey = "offline-todo-list";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");

// 從瀏覽器儲存空間載入待辦資料，資料損壞時回到空清單。
let todos = loadTodos();

function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}

function createTodoId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成「${todo.text}」`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    listItem.append(checkbox, text, deleteButton);
    todoList.append(listItem);
  });

  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${incompleteCount} 項`;
  emptyMessage.hidden = todos.length > 0;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  // 空白內容不建立待辦事項。
  if (!text) {
    return;
  }

  todos.push({
    id: createTodoId(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

renderTodos();