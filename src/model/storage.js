// src/model/storage.js
import { Project } from "./project.js";

const STORAGE_KEY = "what_todo_state_v1";

export function createDefaultState() {
  const inbox = new Project({
    title: "Inbox",
    description: "Default project for all todos",
  });
  return {
    projects: [inbox],
    activeProjectId: inbox.id,
  };
}

export function saveState(state) {
  try {
    const payload = JSON.stringify({
      projects: state.projects,
      activeProjectId: state.activeProjectId,
    });
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.warn("Failed to save state to localStorage:", err);
  }
}

export function loadState() {
  try {
    const rawText = localStorage.getItem(STORAGE_KEY);
    if (!rawText) return createDefaultState();

    const parsed = JSON.parse(rawText);
    const projects = Array.isArray(parsed?.projects)
      ? parsed.projects.map(Project.fromJSON)
      : [];

    if (projects.length === 0) {
      return createDefaultState();
    }

    const activeExists = projects.some((p) => p.id === parsed.activeProjectId);
    return {
      projects,
      activeProjectId: activeExists ? parsed.activeProjectId : projects[0].id,
    };
  } catch (err) {
    console.warn("Corrupt storage data; resetting to default project:", err);
    return createDefaultState();
  }
}