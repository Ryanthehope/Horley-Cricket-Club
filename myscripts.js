// ===== INIT =====
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

// ===== SMOOTH SCROLL =====
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore empty or dummy links
            if (!href || href === "#" || href.length <= 1) return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CAROUSEL =====
function initCarousel() {
    const carousel = document.querySelector('.sponsors-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const cards = document.querySelectorAll('.sponsor-card');

    if (!carousel || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;

    function updateCarousel() {
        const cardOffset = cards[currentIndex].offsetLeft - carousel.offsetLeft;

        carousel.scrollTo({
            left: cardOffset,
            behavior: 'smooth'
        });
    }

    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });
}

// ===== FADE-IN =====
function initFadeInObserver() {
    const elements = document.querySelectorAll(
        '.page-content, .carousel-wrapper, .contact-container'
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
}

// ===== PAGE TRANSITIONS (SAFE VERSION) =====
function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    document.querySelectorAll('a.nav-link, a.dropdown-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // 🚨 SAFETY CHECKS (this fixes your error)
            if (
                !href ||
                href.startsWith('#') ||
                href.startsWith('http') ||
                href.startsWith('mailto') ||
                href.startsWith('tel') ||
                !href.endsWith('.html')
            ) {
                return; // let browser handle it normally
            }

            e.preventDefault();

            overlay.classList.add('active');

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}