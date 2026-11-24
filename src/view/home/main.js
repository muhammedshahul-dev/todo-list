import { sideBar } from "./side-bar.js";
import { mainContent } from "./main-content.js";

export function main(){
    const main = document.createElement('div');
    main.classList.add("main");
    
    main.appendChild(sideBar())
    main.appendChild(mainContent())
    
    return main
}