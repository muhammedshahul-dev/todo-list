export function headerfn(){
    const headerTag = document.createElement('h2');
    headerTag.textContent= " What-ToDo"
    headerTag.classList.add("header-tag")
    const header = document.createElement('header');
    header.appendChild(headerTag);

    return header
}

