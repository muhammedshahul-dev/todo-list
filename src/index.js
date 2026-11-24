// src/index.js
import "./styles.css";
import { AppController } from "./controller/app-controller.js";

const appRoot = document.getElementById("app");

if (appRoot) {
  const controller = new AppController(appRoot);
  controller.init();
}