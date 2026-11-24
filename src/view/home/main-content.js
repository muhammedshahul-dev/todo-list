// src/view/home/main-content.js
import { format, parseISO, isValid } from "date-fns";

function formatDueDate(dueDate) {
  if (!dueDate) return "No due date";
  const parsed = parseISO(dueDate);
  return isValid(parsed) ? format(parsed, "MMM d, yyyy") : dueDate;
}

export function mainContent({
  project,
  onToggleTodo,
  onInspectTodo,
  onDeleteTodo,
  onQuickAddTodo,
}) {
  const main = document.createElement("main");
  main.className = "main-content";

  if (!project) {
    main.textContent = "No project selected.";
    return main;
  }

  const topBar = document.createElement("div");
  topBar.className = "project-header";

  const heading = document.createElement("h2");
  heading.textContent = project.title;

  const desc = document.createElement("p");
  desc.className = "project-desc";
  desc.textContent = project.description || "Manage tasks in this project.";

  topBar.append(heading, desc);

  const quickForm = document.createElement("form");
  quickForm.className = "quick-todo-form";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "input";
  titleInput.placeholder = "Todo title...";
  titleInput.required = true;

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "input";

  const prioritySelect = document.createElement("select");
  prioritySelect.className = "input";
  ["low", "medium", "high"].forEach((level) => {
    const opt = document.createElement("option");
    opt.value = level;
    opt.textContent = level[0].toUpperCase() + level.slice(1);
    prioritySelect.appendChild(opt);
  });

  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.className = "btn btn-primary";
  addBtn.textContent = "Add Todo";

  quickForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!titleInput.value.trim()) return;
    onQuickAddTodo({
      title: titleInput.value,
      dueDate: dateInput.value,
      priority: prioritySelect.value,
    });
    titleInput.value = "";
    dateInput.value = "";
    prioritySelect.value = "low";
  });

  quickForm.append(titleInput, dateInput, prioritySelect, addBtn);

  const list = document.createElement("ul");
  list.className = "todo-list";

  if (project.entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No todos yet. Add one above.";
    list.appendChild(empty);
  } else {
    project.entries.forEach((todo) => {
      const item = document.createElement("li");
      item.className = `todo-item priority-${todo.priority} ${todo.completed ? "is-completed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => onToggleTodo(todo.id));

      const titleBtn = document.createElement("button");
      titleBtn.type = "button";
      titleBtn.className = "todo-title-btn";
      titleBtn.textContent = todo.title;
      titleBtn.addEventListener("click", () => onInspectTodo(todo.id));

      const dateSpan = document.createElement("span");
      dateSpan.className = "todo-date";
      dateSpan.textContent = formatDueDate(todo.dueDate);

      const badge = document.createElement("span");
      badge.className = `priority-badge priority-${todo.priority}`;
      badge.textContent = todo.priority;

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn btn-ghost";
      editBtn.textContent = "Details / Edit";
      editBtn.addEventListener("click", () => onInspectTodo(todo.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "icon-btn";
      deleteBtn.title = "Delete todo";
      deleteBtn.textContent = "×";
      deleteBtn.addEventListener("click", () => onDeleteTodo(todo.id));

      item.append(checkbox, titleBtn, dateSpan, badge, editBtn, deleteBtn);
      list.appendChild(item);
    });
  }

  main.append(topBar, quickForm, list);
  return main;
}