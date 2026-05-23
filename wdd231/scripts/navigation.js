const menuButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#navMenu');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('show');
  navMenu.classList.toggle('show');
});