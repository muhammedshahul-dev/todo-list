// src/controller/app-controller.js
import { ProjectManager } from "../model/project-manager.js";
import { headerfn } from "../view/home/header.js";
import { main } from "../view/home/main.js";
import { todoModal } from "../view/home/todo-modal.js";

export class AppController {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.manager = new ProjectManager();
    this.editingTodoId = null;
  }

  init() {
    this.render();
  }

  render() {
    this.rootEl.replaceChildren();

    const activeProject = this.manager.getActiveProject();

    const headerEl = headerfn({
      onNewTodoClick: () => {
        const titleInput = this.rootEl.querySelector(".quick-todo-form input[type='text']");
        titleInput?.focus();
      },
    });

    const mainEl = main({
      projects: this.manager.projects,
      activeProject,
      onSelectProject: (projectId) => {
        this.manager.setActiveProject(projectId);
        this.render();
      },
      onCreateProject: (title) => {
        this.manager.addProject(title);
        this.render();
      },
      onDeleteProject: (projectId) => {
        this.manager.removeProject(projectId);
        this.render();
      },
      onQuickAddTodo: (todoData) => {
        if (!activeProject) return;
        this.manager.addTodoToProject(activeProject.id, todoData);
        this.render();
      },
      onToggleTodo: (todoId) => {
        if (!activeProject) return;
        this.manager.toggleTodoComplete(activeProject.id, todoId);
        this.render();
      },
      onInspectTodo: (todoId) => {
        this.editingTodoId = todoId;
        this.render();
      },
      onDeleteTodo: (todoId) => {
        if (!activeProject) return;
        this.manager.deleteTodo(activeProject.id, todoId);
        this.render();
      },
    });

    this.rootEl.append(headerEl, mainEl);

    if (this.editingTodoId && activeProject) {
      const todo = activeProject.getTodo(this.editingTodoId);
      if (todo) {
        const modalEl = todoModal({
          todo,
          onClose: () => {
            this.editingTodoId = null;
            this.render();
          },
          onSave: (todoId, updates) => {
            this.manager.updateTodo(activeProject.id, todoId, updates);
            this.editingTodoId = null;
            this.render();
          },
        });
        this.rootEl.appendChild(modalEl);
      }
    }
  }
}