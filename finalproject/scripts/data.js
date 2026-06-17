import { openModal } from "./modal.js";


const container = document.querySelector("#mistakes-container");

export async function getMistakes() {
    try {

        const response = await fetch("./data/hvac-mistakes.json");

        if (!response.ok) {
            throw new Error("Failed to load data.");
        }

        const data = await response.json();

        displayMistakes(data);

    } catch (error) {
        console.error(error);
    }
}

function displayMistakes(data) {

    data.forEach(item => {

        const card = document.createElement("section");

        card.classList.add("mistake-card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Problem:</strong> ${item.problem}</p>
            <p><strong>Solution:</strong> ${item.solution}</p>
        `;

        container.appendChild(card);

        card.addEventListener("click", () => {
    openModal(item);
});
        
    });
}