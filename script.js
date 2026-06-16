document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // 2. Typing Animation
    const roles = ["Full Stack Developer", "AI Enthusiast", "Machine Learning Engineer"];
    const typingText = document.querySelector(".typing-text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingText) {
        setTimeout(type, 1000);
    }

    // 3. Scroll Intersection Observer for Fade-up animations
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Animated Stats Counters
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                stats.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    const duration = 2000;
                    let start = null;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = Math.min((timestamp - start) / duration, 1);
                        
                        // easeOutQuad
                        const easeProgress = progress * (2 - progress);
                        const currentVal = (easeProgress * target).toFixed(target % 1 === 0 ? 0 : 2);
                        
                        stat.innerText = currentVal;
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            stat.innerText = target;
                        }
                    }
                    window.requestAnimationFrame(step);
                });
                counted = true;
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        statsObserver.observe(document.querySelector('.about-stats'));
    }

    // 5. Back to Top Button & Navbar Scroll effect
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 7. Hero Spotlight Effect
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    const heroGlow = document.querySelector('.hero-glow');

    if (heroImageWrapper && heroGlow) {
        heroImageWrapper.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroGlow.style.left = `${x}px`;
            heroGlow.style.top = `${y}px`;
            heroGlow.style.opacity = '0.6';
        });

        heroImageWrapper.addEventListener('mouseleave', () => {
            heroGlow.style.left = '50%';
            heroGlow.style.top = '50%';
            heroGlow.style.opacity = '0.2';
        });
    }
});

// Global Lightbox functions
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
