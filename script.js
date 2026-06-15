/**
 * Mohammed Abdul Afnan - Portfolio Script
 * Updated to match Katkam Likitha Reference Structure
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    /* ==========================================================================
       Sticky Navbar & Active Nav Link on Scroll
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar styling
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; // default shadow
        }

        // Highlight Active Nav Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Contact Form Submission (Formspree)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                        btn.style.backgroundColor = '#10b981'; // Success Green
                        btn.style.borderColor = '#10b981';
                        contactForm.reset();

                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = '';
                            btn.style.borderColor = '';
                            btn.style.opacity = '1';
                            btn.style.pointerEvents = 'all';
                        }, 3000);
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                                alert("Formspree Error: " + errorMsg);
                            } else {
                                alert("Oops! There was a problem submitting your form");
                            }
                        }).catch(e => console.log(e));

                        btn.innerHTML = '<span>Error Sending</span> <i class="fas fa-times"></i>';
                        btn.style.backgroundColor = '#EF4444'; // Red
                        btn.style.borderColor = '#EF4444';

                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = '';
                            btn.style.borderColor = '';
                            btn.style.opacity = '1';
                            btn.style.pointerEvents = 'all';
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    btn.innerHTML = '<span>Error Sending</span> <i class="fas fa-times"></i>';
                    btn.style.backgroundColor = '#EF4444'; // Red
                    btn.style.borderColor = '#EF4444';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.style.opacity = '1';
                        btn.style.pointerEvents = 'all';
                    }, 3000);
                });
        });
    }
});

/* ==========================================================================
   Lightbox Global Functions
   ========================================================================== */
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling in background
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Ensure clicking outside the image also closes it
document.addEventListener('DOMContentLoaded', () => {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click on image from triggering closeLightbox via parent
        });
    }
});

/* ==========================================================================
   Content Protection (Disable Right-Click, Selection, Screenshots)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Disable text selection and dragging
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Disable common screenshot / copy keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent PrintScreen
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            e.preventDefault();
        }

        // Prevent Ctrl+P (Print), Ctrl+S (Save), Ctrl+C (Copy), Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'P' || e.key === 'S' || e.key === 'C' || e.key === 'U')) {
            e.preventDefault();
        }

        // Prevent Mac Cmd+Shift+3 or 4 (Screenshots)
        if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) {
            e.preventDefault();
        }
    });

    // Detect Developer Tools and Flicker Screen
    let reloadTimeout = null;

    setInterval(() => {
        const threshold = 160; // Common devtools panel size
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            // DevTools is open

            // Start the 7-second reload timer if it hasn't started yet
            if (!reloadTimeout) {
                reloadTimeout = setTimeout(() => {
                    window.location.reload(true); // Hard reload
                }, 70);
            }
        } else {
            // DevTools is closed

            // Cancel the reload timer if they close DevTools before 7 seconds
            if (reloadTimeout) {
                clearTimeout(reloadTimeout);
                reloadTimeout = null;
            }
        }
    }, 200);
});
