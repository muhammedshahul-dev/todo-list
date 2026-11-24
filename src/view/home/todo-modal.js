// src/view/home/todo-modal.js
export function todoModal({ todo, onSave, onClose }) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";

  const dialog = document.createElement("div");
  dialog.className = "modal-card";

  const heading = document.createElement("h3");
  heading.textContent = "Todo Details & Edit";

  const form = document.createElement("form");
  form.className = "modal-form";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "input";
  titleInput.value = todo.title;
  titleInput.required = true;
  titleLabel.appendChild(titleInput);

  const descLabel = document.createElement("label");
  descLabel.textContent = "Description";
  const descInput = document.createElement("textarea");
  descInput.className = "input";
  descInput.rows = 3;
  descInput.value = todo.description;
  descLabel.appendChild(descInput);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Due Date";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "input";
  dateInput.value = todo.dueDate;
  dateLabel.appendChild(dateInput);

  const prioLabel = document.createElement("label");
  prioLabel.textContent = "Priority";
  const prioSelect = document.createElement("select");
  prioSelect.className = "input";
  ["low", "medium", "high"].forEach((level) => {
    const opt = document.createElement("option");
    opt.value = level;
    opt.textContent = level[0].toUpperCase() + level.slice(1);
    opt.selected = todo.priority === level;
    prioSelect.appendChild(opt);
  });
  prioLabel.appendChild(prioSelect);

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes";
  const notesInput = document.createElement("textarea");
  notesInput.className = "input";
  notesInput.rows = 2;
  notesInput.value = todo.notes;
  notesLabel.appendChild(notesInput);

  const actions = document.createElement("div");
  actions.className = "modal-actions";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn btn-ghost";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", onClose);

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.className = "btn btn-primary";
  saveBtn.textContent = "Save Changes";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!titleInput.value.trim()) return;
    onSave(todo.id, {
      title: titleInput.value,
      description: descInput.value,
      dueDate: dateInput.value,
      priority: prioSelect.value,
      notes: notesInput.value,
    });
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) onClose();
  });

  actions.append(cancelBtn, saveBtn);
  form.append(titleLabel, descLabel, dateLabel, prioLabel, notesLabel, actions);
  dialog.append(heading, form);
  backdrop.appendChild(dialog);
  return backdrop;
}