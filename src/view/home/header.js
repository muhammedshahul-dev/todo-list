// src/view/home/header.js
export function headerfn({ onNewTodoClick } = {}) {
  const header = document.createElement("header");
  header.className = "app-header";

  const title = document.createElement("h1");
  title.className = "header-tag";
  title.textContent = "What-ToDo";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-primary";
  addBtn.textContent = "+ New Todo";
  addBtn.addEventListener("click", () => onNewTodoClick?.());

  header.append(title, addBtn);
  return header;
}