import "./styles/dummy.scss";

import Pages from "./src/Pages";

const pages = new Pages({
    container: document.querySelector(".pages"),
    scroll: window,
    onPageChange: (instance) => console.log(instance.index)
});


const buttons = [...document.querySelectorAll(".direction-picker button")];
const cont = document.querySelector(".pages");

function checkActive() {

    const map = ["p-down", "p-up", "p-left", "p-right"];

    const current = map.find(dir => typeof cont.getAttribute(dir) === "string" );

    for (const button of buttons) {
        button.classList.remove("active");

        if (button.getAttribute("dir") === current)
            button.classList.add("active");
    }

}

for (const button of buttons) {
    button.addEventListener("click", e => {
        const map = ["p-down", "p-up", "p-left", "p-right"];
        
        for (const a of map)
            cont.removeAttribute(a);
        
        cont.setAttribute(e.currentTarget.getAttribute("dir"), true);

        checkActive();

    });

}

document.addEventListener("DOMContentLoaded", checkActive);