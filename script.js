const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const galleryTrack = document.querySelector("[data-gallery-track]");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenu(open) {
  if (!menuToggle || !primaryNav) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  primaryNav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 899) setMenu(false);
  });
}

function galleryStep() {
  const item = galleryTrack?.querySelector(".gallery-item");
  if (!item || !galleryTrack) return 0;

  const gap = Number.parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
  return item.getBoundingClientRect().width + gap;
}

function updateGalleryControls() {
  if (!galleryTrack || !galleryPrev || !galleryNext) return;

  const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
  galleryPrev.disabled = galleryTrack.scrollLeft <= 2;
  galleryNext.disabled = galleryTrack.scrollLeft >= maxScroll - 2;
}

function moveGallery(direction) {
  if (!galleryTrack) return;

  galleryTrack.scrollBy({
    left: galleryStep() * direction,
    behavior: reduceMotion.matches ? "auto" : "smooth",
  });
}

galleryPrev?.addEventListener("click", () => moveGallery(-1));
galleryNext?.addEventListener("click", () => moveGallery(1));
galleryTrack?.addEventListener("scroll", updateGalleryControls, { passive: true });
window.addEventListener("resize", updateGalleryControls);
updateGalleryControls();

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  document.body.classList.add("reveal-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
