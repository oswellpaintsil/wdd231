// ============================================================
//  main.js — Accra Chamber of Commerce
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // DARK MODE
  // =========================
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');

      const isDark = document.body.classList.contains('dark');
      themeToggle.textContent = isDark ? '☀' : '◐';

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // =========================
  // HAMBURGER MENU
  // =========================
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');

      hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================
  // ACTIVE NAV LINK
  // =========================
  const page = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // =========================
  // FOOTER DATES
  // =========================
  const yearEl = document.getElementById('copyright-year');
  const modEl = document.getElementById('last-modified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;

  // =========================
  // DIRECTORY VIEW TOGGLE
  // =========================
  const gridBtn = document.getElementById('btn-grid');
  const listBtn = document.getElementById('btn-list');
  const membersContainer = document.getElementById('members-container');

  function setView(view) {
    if (!membersContainer) return;

    membersContainer.classList.remove('grid-view', 'list-view');
    membersContainer.classList.add(view + '-view');

    if (gridBtn && listBtn) {
      const isGrid = view === 'grid';

      gridBtn.classList.toggle('active', isGrid);
      listBtn.classList.toggle('active', !isGrid);

      gridBtn.setAttribute('aria-pressed', isGrid);
      listBtn.setAttribute('aria-pressed', !isGrid);
    }

    localStorage.setItem('memberView', view);
  }

  if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));

    setView(localStorage.getItem('memberView') || 'grid');
  }

  // =========================
  // BADGE
  // =========================
  function badge(level) {
    switch (Number(level)) {
      case 3:
        return { label: 'Gold Member', cls: 'badge-gold' };
      case 2:
        return { label: 'Silver Member', cls: 'badge-silver' };
      default:
        return { label: 'Member', cls: 'badge-member' };
    }
  }

  // =========================
  // LOAD MEMBERS
  // =========================
  async function loadMembers() {
    if (!membersContainer) return;

    membersContainer.innerHTML = `
      <div class="loading-state" style="grid-column:1/-1">
        <p>Loading members...</p>
      </div>
    `;

    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error('Failed to load data');

      const data = await res.json();
      renderMembers(data.members);

    } catch (err) {
      console.error(err);
      membersContainer.innerHTML = `
        <div class="loading-state" style="grid-column:1/-1">
          <p>Unable to load members.</p>
        </div>
      `;
    }
  }

  // =========================
  // RENDER MEMBERS
  // =========================
  function renderMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
      const b = badge(member.membershipLevel);

      const card = document.createElement('article');
      card.className = 'member-card';

      card.innerHTML = `
        <div class="card-header">
          <p class="card-name">${member.name}</p>
          <p class="card-tagline">${member.tagline}</p>
        </div>

        <div class="card-body">
          <div class="card-img-wrap">
            <span class="card-emoji">🏢</span>
          </div>

          <div class="card-info">
            <div class="card-info-row">
              <span class="lbl">Email:</span>
              <a href="mailto:${member.email}">${member.email}</a>
            </div>

            <div class="card-info-row">
              <span class="lbl">Phone:</span>
              <a href="tel:${member.phone.replace(/\s/g,'')}">
                ${member.phone}
              </a>
            </div>

            <div class="card-info-row">
              <span class="lbl">Website:</span>
              <a href="${member.website}" target="_blank">Visit Site</a>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <span class="membership-badge ${b.cls}">
            ${b.label}
          </span>
        </div>
      `;

      membersContainer.appendChild(card);
    });
  }

  loadMembers();
  
});












const tempEl = document.getElementById("current-temp");
const descEl = document.getElementById("weather-desc");
const forecastEl = document.getElementById("forecast-list");

if (tempEl && descEl && forecastEl) {

  function loadWeather() {

    // 🔥 TEMP FAKE DATA (guaranteed to work)
    const currentTemp = 28;
    const description = "Partly cloudy";

    const forecast = [
      { day: "Today", temp: 28 },
      { day: "Tomorrow", temp: 30 },
      { day: "Day 3", temp: 29 }
    ];

    // CURRENT WEATHER
    tempEl.textContent = currentTemp;
    descEl.textContent = description;

    // FORECAST
    forecastEl.innerHTML = "";

    forecast.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.day}: ${item.temp}°C`;
      forecastEl.appendChild(li);
    });
  }

  loadWeather();
}

const spotlightEl = document.getElementById("spotlight-container");

if (spotlightEl) {

  async function loadSpotlights() {
    const res = await fetch("data/members.json");
    const data = await res.json();

    const premium = data.members.filter(m => m.membershipLevel >= 2);

    const selected = [...premium]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    spotlightEl.innerHTML = "";

    selected.forEach(m => {
      const div = document.createElement("div");

      div.classList.add("spotlight-card");

      div.innerHTML = `
        <h3>${m.name}</h3>
        <p>${m.tagline}</p>
        <p>${m.phone}</p>
        <p>${m.address}</p>
        <a href="${m.website}" target="_blank">Visit Site</a>
      `;

      spotlightEl.appendChild(div);
    });
  }

  loadSpotlights();
}
