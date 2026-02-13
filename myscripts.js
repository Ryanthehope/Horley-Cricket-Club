// ===== COPYRIGHT YEAR =====
function updateCopyright() {
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.textContent = `© ${new Date().getFullYear()} Head-start Web Development. All rights reserved.`;
    }
}

// Run immediately and on DOMContentLoaded
updateCopyright();
document.addEventListener("DOMContentLoaded", function () {
    updateCopyright();

    // ===== SMOOTH SCROLLING =====
    enableSmoothScroll();

    // ===== LOAD SOCIAL MEDIA FEEDS =====
    loadSocialMediaFeeds();
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                // Prevent placeholder links from jumping to top
                e.preventDefault();
            } else if (document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== LOAD SOCIAL MEDIA FEEDS =====
function loadSocialMediaFeeds() {
    const instagramFeed = document.getElementById('instagram-feed');
    const facebookFeed = document.getElementById('facebook-feed');

    if (instagramFeed) {
        // Load Instagram Feed
        loadInstagramFeed();
    }

    if (facebookFeed) {
        // Load Facebook Feed
        loadFacebookFeed();
    }
}

// Load Instagram Feed
function loadInstagramFeed() {
    const container = document.getElementById('instagram-feed');
    if (!container) return;

    try {
        // Create Instagram embed script
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        // Add Instagram embed link
        const embed = document.createElement('blockquote');
        embed.className = 'instagram-media';
        embed.setAttribute('data-instgrm-permalink', 'https://www.instagram.com/horleycc/');
        embed.setAttribute('data-instgrm-version', '14');
        embed.style.width = '100%';
        embed.innerHTML = '<a href="https://www.instagram.com/horleycc/" target="_blank">Horley Cricket Club (@horleycc)</a>';
        
        container.innerHTML = '';
        container.appendChild(embed);

        // Re-process Instagram embeds
        if (window.instgrm) {
            window.instgrm.Embed.process(embed);
        }
    } catch (error) {
        console.log('Instagram feed could not be loaded');
    }
}

// Load Facebook Feed
function loadFacebookFeed() {
    const container = document.getElementById('facebook-feed');
    if (!container) return;

    try {
        // Create Facebook SDK script if not already loaded
        if (!window.FB) {
            const script = document.createElement('script');
            script.innerHTML = `
                window.fbAsyncInit = function() {
                    FB.init({
                        xfbml: true,
                        version: 'v18.0'
                    });
                };
            `;
            document.body.appendChild(script);

            const sdkScript = document.createElement('script');
            sdkScript.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
            sdkScript.async = true;
            sdkScript.defer = true;
            document.body.appendChild(sdkScript);
        }

        // Add Facebook embed
        const fbEmbed = document.createElement('div');
        fbEmbed.className = 'fb-page';
        fbEmbed.setAttribute('data-href', 'https://www.facebook.com/Horleycc');
        fbEmbed.setAttribute('data-tabs', 'timeline');
        fbEmbed.setAttribute('data-width', '500');
        fbEmbed.setAttribute('data-height', '500');
        fbEmbed.setAttribute('data-small-header', 'false');
        fbEmbed.setAttribute('data-adapt-container-width', 'true');
        fbEmbed.setAttribute('data-hide-cover', 'false');
        fbEmbed.setAttribute('data-show-facepile', 'true');

        container.innerHTML = '';
        container.appendChild(fbEmbed);

        // Re-process Facebook embeds
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    } catch (error) {
        console.log('Facebook feed could not be loaded');
    }
}

// ===== SPONSORS CAROUSEL =====
// Carousel navigation with scroll-snap
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.sponsors-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const cards = document.querySelectorAll('.sponsor-card');
    
    if (carousel && prevBtn && nextBtn && cards.length > 0) {
        let currentIndex = 0;
        
        function updateCarousel() {
            // Scroll to the current card
            cards[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
        
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // ===== FADE-IN ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections that should fade in
    const fadeElements = document.querySelectorAll('.page-content, .carousel-wrapper, .contact-container, .glass');
    fadeElements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});

// ===== PAGE TRANSITION OVERLAY =====
document.addEventListener('DOMContentLoaded', function() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // Add transition to internal links
    const navLinks = document.querySelectorAll('a.nav-link, a.dropdown-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply to internal navigation links, not # anchors
            if (href && !href.startsWith('#') && href.endsWith('.html')) {
                e.preventDefault();
                
                // Show overlay
                overlay.classList.add('active');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});
