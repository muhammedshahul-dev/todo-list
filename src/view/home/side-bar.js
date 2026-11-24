// src/view/home/side-bar.js
export function sideBar({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}) {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";

  const heading = document.createElement("h2");
  heading.className = "sidebar-title";
  heading.textContent = "Projects";

  const list = document.createElement("ul");
  list.className = "project-list";

  projects.forEach((project) => {
    const li = document.createElement("li");
    li.className = `project-item ${project.id === activeProjectId ? "is-active" : ""}`;

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "project-select-btn";
    selectBtn.textContent = `${project.title} (${project.entries.length})`;
    selectBtn.addEventListener("click", () => onSelectProject(project.id));

    li.appendChild(selectBtn);

    if (projects.length > 1) {
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "icon-btn";
      delBtn.title = "Delete project";
      delBtn.textContent = "×";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onDeleteProject(project.id);
      });
      li.appendChild(delBtn);
    }

    list.appendChild(li);
  });

  const form = document.createElement("form");
  form.className = "project-form";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.placeholder = "New project name...";
  input.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-primary";
  submitBtn.textContent = "Add";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    onCreateProject(val);
    input.value = "";
  });

  form.append(input, submitBtn);
  sidebar.append(heading, list, form);
  return sidebar;
}