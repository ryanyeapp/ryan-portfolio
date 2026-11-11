const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");
const filterStatus = document.querySelector(".filter-status");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const emailLink = document.querySelector("#email-link");
const year = document.querySelector("#year");

const PLACEHOLDER_EMAIL = "you@example.com";

function setScrolled() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function closeNav() {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

function applyFilter(filter) {
  let visible = 0;

  projects.forEach((project) => {
    const tags = project.dataset.tags.split(" ");
    const show = filter === "all" || tags.includes(filter);
    project.hidden = !show;
    if (show) visible += 1;
  });

  const label = filter === "all" ? "all" : filter;
  filterStatus.textContent =
    visible === 1
      ? `Showing 1 ${label} project.`
      : `Showing ${visible} ${label} projects.`;
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    applyFilter(button.dataset.filter);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in every field.";
    return;
  }

  const owner = emailLink.textContent.trim();
  if (!owner || owner === PLACEHOLDER_EMAIL) {
    formStatus.textContent =
      "Replace you@example.com in index.html with your address, then try again.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio note from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
  formStatus.textContent = "Your email app should open with a draft.";
});

year.textContent = String(new Date().getFullYear());
setScrolled();
applyFilter("all");
window.addEventListener("scroll", setScrolled, { passive: true });
