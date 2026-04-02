// ===== COPYRIGHT YEAR =====
function updateCopyright() {
    const year = new Date().getFullYear();
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.textContent = `© ${year} Horley Cricket Club.`;
    }
    const credit = document.getElementById("developer-credit");
    if (credit) {
        credit.textContent = "Website developed by Head-start Web Development.";
    }
}

function initSite() {
    updateCopyright();
    enableSmoothScroll();
    initCarousel();
    initFadeInObserver();
    initPageTransitions();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite);
} else {
    initSite();
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ===== SPONSORS CAROUSEL =====
function initCarousel() {
    const carousel = document.querySelector('.sponsors-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const cards = document.querySelectorAll('.sponsor-card');

    if (!carousel || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;

    function updateCarousel() {
        const cardOffset = cards[currentIndex].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: cardOffset, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });
}

// ===== FADE-IN ON SCROLL =====
function initFadeInObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.page-content, .carousel-wrapper, .contact-container, .glass');
    fadeElements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
}

// ===== PAGE TRANSITION OVERLAY =====
function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    document.querySelectorAll('a.nav-link, a.dropdown-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && href.endsWith('.html')) {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}
