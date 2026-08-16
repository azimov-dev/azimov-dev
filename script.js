// ========================================
// Cursor Glow Effect
// ========================================
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.5';
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Animated Counter for Stats
// ========================================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

const statNumbers = document.querySelectorAll('.stat-number[data-count]');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].closest('.hero-stats'));
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, [data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// Skill Cards Animation
// ========================================
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
});

// ========================================
// Project Cards Animation
// ========================================
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// Contact Cards Animation
// ========================================
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
});

// ========================================
// Copy Email to Clipboard
// ========================================
const emailCard = document.querySelector('.contact-card[href^="mailto:"]');
if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        const email = emailCard.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(() => {});
    });
}

// ========================================
// Toast Notification
// ========================================
function showToast(message, duration = 3000) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--accent);
        color: var(--bg-primary);
        padding: 16px 32px;
        border-radius: var(--radius-md);
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ========================================
// Highlight Items Animation
// ========================================
document.querySelectorAll('.highlight-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c azymv %c Software Developer
`,
    'background: #84cc16; color: #0a0a0f; padding: 10px 20px; font-size: 20px; font-weight: bold; border-radius: 5px 0 0 5px;',
    'background: #1a1a25; color: #a1a1aa; padding: 10px 20px; font-size: 14px; border-radius: 0 5px 5px 0;'
);

console.log('%c Hey there, fellow developer!', 'font-size: 16px; color: #84cc16;');
console.log('%c Looking for a developer? Let\'s connect!', 'font-size: 14px; color: #a3e635;');
console.log('%c azimovabdugaffor17@gmail.com', 'font-size: 12px; color: #84cc16;');
