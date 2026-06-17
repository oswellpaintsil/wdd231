const modal = document.querySelector("#mistake-modal");
const modalContent = document.querySelector("#modal-content");
const closeButton = document.querySelector("#close-modal");

export function initModal() {

    if (!modal) return;

    closeButton.addEventListener("click", () => {
        modal.close();
    });
}

export function openModal(item) {

    modalContent.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Problem:</strong> ${item.problem}</p>
        <p><strong>Solution:</strong> ${item.solution}</p>
    `;

    modal.showModal();
}