
// ================= SMOOTH SCROLL (SAFE + SMOOTH OFFSET FIX) =================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const targetId = a.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const yOffset = -70; // fix navbar che content
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    });
});


// ================= SCROLL ANIMATION (OPTIMIZED) =================
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // tối ưu performance
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(
    ".card, .task, .stat, .skills div, .timeline-item, .about-card, .contact-card"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// ================= TYPEWRITER (CLEAN + NO BUG) =================
const typeEl = document.getElementById("typewriter");

const text =
    "Sinh viên Khoa học Máy tính đam mê công nghệ, lập trình và trí tuệ nhân tạo.";

let i = 0;

function type() {
    if (!typeEl) return;

    if (i < text.length) {
        typeEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 30);
    }
}

window.addEventListener("load", () => {
    if (typeEl) {
        typeEl.innerHTML = "";
        type();
    }
});


// ================= COUNTER ANIMATION (FIX + SMOOTH) =================
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = +el.getAttribute("data-target");

        let current = 0;
        const speed = Math.max(1, Math.floor(target / 50));

        const update = () => {
            current += speed;

            if (current >= target) {
                el.innerText = target;
            } else {
                el.innerText = current;
                requestAnimationFrame(update);
            }
        };

        update();
        obs.unobserve(el);
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ================= NAV ACTIVE STATE (CLEAN + STABLE) =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
        if (
            scrollPos >= sec.offsetTop &&
            scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
            navLinks.forEach(a => {
                a.classList.remove("active");

                if (a.getAttribute("href") === "#" + sec.id) {
                    a.classList.add("active");
                }
            });
        }
    });
});


// ================= SMALL UX FIX (PREVENT JANK) =================
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.scrollBehavior = "smooth";
});