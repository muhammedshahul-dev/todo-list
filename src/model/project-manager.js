// src/model/project-manager.js
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { loadState, saveState, createDefaultState } from "./storage.js";

export class ProjectManager {
  constructor() {
    const initial = loadState();
    this.projects = initial.projects;
    this.activeProjectId = initial.activeProjectId;
  }

  persist() {
    saveState({
      projects: this.projects,
      activeProjectId: this.activeProjectId,
    });
  }

  getActiveProject() {
    return (
      this.projects.find((p) => p.id === this.activeProjectId) ??
      this.projects[0] ??
      null
    );
  }

  setActiveProject(projectId) {
    if (this.projects.some((p) => p.id === projectId)) {
      this.activeProjectId = projectId;
      this.persist();
    }
  }

  addProject(title, description = "") {
    const project = new Project({ title, description });
    this.projects.push(project);
    this.activeProjectId = project.id;
    this.persist();
    return project;
  }

  removeProject(projectId) {
    if (this.projects.length <= 1) {
      throw new Error("At least one project must remain.");
    }
    const index = this.projects.findIndex((p) => p.id === projectId);
    if (index === -1) return;
    this.projects.splice(index, 1);
    if (this.activeProjectId === projectId) {
      this.activeProjectId = this.projects[0].id;
    }
    this.persist();
  }

  addTodoToProject(projectId, todoData) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return null;
    const todo = new Todo(todoData);
    project.addTodo(todo);
    this.persist();
    return todo;
  }

  toggleTodoComplete(projectId, todoId) {
    const project = this.projects.find((p) => p.id === projectId);
    const todo = project?.getTodo(todoId);
    if (!todo) return;
    todo.toggleComplete();
    this.persist();
  }

  updateTodo(projectId, todoId, updates) {
    const project = this.projects.find((p) => p.id === projectId);
    const todo = project?.getTodo(todoId);
    if (!todo) return;
    todo.update(updates);
    this.persist();
  }

  deleteTodo(projectId, todoId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return;
    project.removeTodo(todoId);
    this.persist();
  }

  resetAll() {
    const fresh = createDefaultState();
    this.projects = fresh.projects;
    this.activeProjectId = fresh.activeProjectId;
    this.persist();
  }
}