import "./styles.css"
import { headerfn } from "./view/home/header.js";
import { main } from "./view/home/main.js";

const app = document.getElementById('app')

app.appendChild(headerfn())
app.appendChild(main())