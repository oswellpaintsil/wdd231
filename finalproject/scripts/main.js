// import { getMistakes } from "./data.js";

// document.getElementById("lastModified").textContent =
// `Last Modified: ${document.lastModified}`;

// if (document.querySelector("#mistakes-container")) {
//     getMistakes();
// }

import { getMistakes } from "./data.js";
import { initNavigation } from "./navigation.js";
import { initTheme } from "./storage.js";
import { initModal } from "./modal.js";

const modified = document.querySelector("#lastModified");

if (modified) {
    modified.textContent =
    `Last Modified: ${document.lastModified}`;
}

initNavigation();
initTheme();
initModal();

if (document.querySelector("#mistakes-container")) {
    getMistakes();
}