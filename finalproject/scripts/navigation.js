const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#main-nav");

export function initNavigation() {

    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}