// Navigation Toggle
const navButton = document.querySelector('#nav-button');
const navLinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});

// Footer Dates
const currentYear = new Date().getFullYear();
document.querySelector('#year').textContent = currentYear;

const lastMod = document.lastModified;
document.querySelector('#lastModified').textContent = `Last Modified: ${lastMod}`;