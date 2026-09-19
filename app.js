const storageKey = "offline-todo-list";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const filterButtons = document.querySelectorAll("[data-filter]");

// 從瀏覽器儲存空間載入待辦資料，資料損壞時回到空清單。
let todos = loadTodos();
let currentFilter = "all";
const themeStorageKey = "offline-todo-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

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

function getActiveTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  return savedTheme || (systemThemeQuery.matches ? "dark" : "light");
}

function applyTheme() {
  const isDark = getActiveTheme() === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function renderTodos() {
  todoList.innerHTML = "";

  getFilteredTodos().forEach((todo) => {
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
  emptyMessage.textContent = todos.length === 0
    ? "還沒有任何待辦事項,新增一個吧!"
    : currentFilter === "active"
      ? "目前沒有未完成的事項,其他項目仍在清單中。"
      : currentFilter === "completed"
        ? "目前沒有已完成的事項,項目仍在清單中,只是被目前的篩選條件過濾。"
        : "還沒有任何待辦事項,新增一個吧!";
  emptyMessage.hidden = getFilteredTodos().length > 0;
}

themeToggle.addEventListener("click", () => {
  const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
      filterButton.setAttribute("aria-pressed", filterButton === button);
    });
    renderTodos();
  });
});

// 沒有手動選擇主題時，作業系統設定變更也會同步更新畫面。
systemThemeQuery.addEventListener("change", () => {
  if (!localStorage.getItem(themeStorageKey)) {
    applyTheme();
  }
});

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

applyTheme();
renderTodos();