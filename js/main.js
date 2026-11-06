// Bootstrap 6 is an ES module: importing the bundle registers its data API
// (collapse toggling, etc.) and exposes the component classes.
import { Collapse } from "./bootstrap.bundle.min.js";

// Highlight the navbar link for the section currently in view
const navLinks = [...document.querySelectorAll("#navbarMain .nav-link")];
const linkBySection = new Map(
    navLinks.map((a) => [a.getAttribute("href").slice(1), a])
);
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const link = linkBySection.get(entry.target.id);
            if (!link) return;
            navLinks.forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
        });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// Games carousel: shows 1 card on mobile, 2 on tablet, 3 on desktop
const track = document.getElementById("gamesTrack");
const slides = track.querySelectorAll(".game-slide");
const prevBtn = document.getElementById("prevGame");
const nextBtn = document.getElementById("nextGame");
let index = 0;

function itemsPerView() {
    if (window.matchMedia("(min-width: 992px)").matches) return 3;
    if (window.matchMedia("(min-width: 768px)").matches) return 2;
    return 1;
}

function updateCarousel() {
    const perView = itemsPerView();
    const maxIndex = Math.max(0, slides.length - perView);
    index = Math.min(Math.max(index, 0), maxIndex);
    track.style.transform = `translateX(-${index * (100 / perView)}%)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxIndex;
    prevBtn.style.opacity = index === 0 ? "0.4" : "";
    nextBtn.style.opacity = index === maxIndex ? "0.4" : "";
}

prevBtn.addEventListener("click", () => {
    index--;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    index++;
    updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();

// Close the mobile navbar after choosing a link
const navCollapse = document.getElementById("navbarMain");
navCollapse.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        const collapse = Collapse.getInstance(navCollapse);
        if (collapse && window.innerWidth < 992) collapse.hide();
    });
});

// Contact form demo handler
const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }
    formAlert.classList.remove("d-none");
    contactForm.reset();
    setTimeout(() => formAlert.classList.add("d-none"), 5000);
});