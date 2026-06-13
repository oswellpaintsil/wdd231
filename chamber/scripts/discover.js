import { attractions } from "../data/attractions.mjs";

const discoverGrid = document.querySelector("#discover-grid");

attractions.forEach((place, index) => {
  const card = document.createElement("article");

  card.classList.add("discover-card");
  card.classList.add(`card${index + 1}`);

  card.innerHTML = `
    <h2>${place.name}</h2>

    <figure>
      <img
        src="${place.image}"
        alt="${place.name}"
        loading="lazy"
        width="300"
        height="200"
      >
    </figure>

    <address>${place.address}</address>

    <p>${place.description}</p>

    <button type="button">Learn More</button>
  `;

  discoverGrid.appendChild(card);
});

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent =
    "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor(
    (now - Number(lastVisit)) / 86400000
  );

  if (daysBetween < 1) {
    visitMessage.textContent =
      "Back so soon! Awesome!";
  } else {
    visitMessage.textContent =
      `You last visited ${daysBetween} ${
        daysBetween === 1 ? "day" : "days"
      } ago.`;
  }
}

localStorage.setItem("lastVisit", now);

