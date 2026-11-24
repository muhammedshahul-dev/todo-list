// src/view/home/main.js
import { sideBar } from "./side-bar.js";
import { mainContent } from "./main-content.js";

export function main({
  projects,
  activeProject,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
  onToggleTodo,
  onInspectTodo,
  onDeleteTodo,
  onQuickAddTodo,
}) {
  const container = document.createElement("div");
  container.className = "main-shell";

  container.append(
    sideBar({
      projects,
      activeProjectId: activeProject?.id,
      onSelectProject,
      onCreateProject,
      onDeleteProject,
    }),
    mainContent({
      project: activeProject,
      onToggleTodo,
      onInspectTodo,
      onDeleteTodo,
      onQuickAddTodo,
    })
  );

  return container;
}