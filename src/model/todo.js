// src/model/todo.js
export class Todo {
  constructor({
    id = crypto.randomUUID(),
    title,
    description = "",
    dueDate = "",
    priority = "low", // "low" | "medium" | "high"
    notes = "",
    completed = false,
  }) {
    if (!title || !title.trim()) {
      throw new Error("Todo title is required.");
    }
    this.id = id;
    this.title = title.trim();
    this.description = description.trim();
    this.dueDate = dueDate;
    this.priority = ["low", "medium", "high"].includes(priority) ? priority : "low";
    this.notes = notes.trim();
    this.completed = Boolean(completed);
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  update({ title, description, dueDate, priority, notes, completed }) {
    if (title !== undefined) {
      if (!title.trim()) throw new Error("Todo title cannot be empty.");
      this.title = title.trim();
    }
    if (description !== undefined) this.description = description.trim();
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (priority !== undefined) this.priority = priority;
    if (notes !== undefined) this.notes = notes.trim();
    if (completed !== undefined) this.completed = Boolean(completed);
  }

  static fromJSON(raw) {
    return new Todo({
      id: raw.id,
      title: raw.title,
      description: raw.description ?? raw.desc ?? "",
      dueDate: raw.dueDate ?? "",
      priority: raw.priority ?? "low",
      notes: raw.notes ?? "",
      completed: Boolean(raw.completed),
    });
  }
}