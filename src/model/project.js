// src/model/project.js
import { Todo } from "./todo.js";

export class Project {
  constructor({
    id = crypto.randomUUID(),
    title,
    description = "",
    entries = [],
  }) {
    if (!title || !title.trim()) {
      throw new Error("Project title is required.");
    }
    this.id = id;
    this.title = title.trim();
    this.description = description.trim();
    this.entries = entries.map((item) => (item instanceof Todo ? item : Todo.fromJSON(item)));
  }

  addTodo(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("Project.addTodo(): expected a Todo instance.");
    }
    this.entries.push(todo);
  }

  removeTodo(todoId) {
    const index = this.entries.findIndex((t) => t.id === todoId);
    if (index === -1) return false;
    this.entries.splice(index, 1);
    return true;
  }

  getTodo(todoId) {
    return this.entries.find((t) => t.id === todoId) ?? null;
  }

  static fromJSON(raw) {
    return new Project({
      id: raw.id,
      title: raw.title,
      description: raw.description ?? raw.desc ?? "",
      entries: Array.isArray(raw.entries) ? raw.entries.map(Todo.fromJSON) : [],
    });
  }
}