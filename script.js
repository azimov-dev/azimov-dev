// ========================================
// Typing Animation
// ========================================
const typingText = document.querySelector('.typing-text');
const roles = ['Software Developer', 'Frontend Enthusiast', 'Problem Solver', 'Tech Explorer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 1000);
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
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
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-card, .stat').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========================================
// Skill Level Animation
// ========================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const levelBar = entry.target.querySelector('.level-bar');
            if (levelBar) {
                const level = levelBar.style.getPropertyValue('--level');
                levelBar.style.width = level;
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    const levelBar = card.querySelector('.level-bar');
    if (levelBar) {
        levelBar.style.width = '0%';
    }
    skillObserver.observe(card);
});

// ========================================
// Parallax Effect for Background Orbs
// ========================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ========================================
// Code Window Typing Effect
// ========================================
const codeContent = document.querySelector('.window-content code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;

    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                codeContent.style.opacity = '1';
                codeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    codeObserver.observe(codeContent);
}

// ========================================
// Form Validation (if you add a contact form later)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// Copy Email to Clipboard
// ========================================
const emailCard = document.querySelector('.contact-card[href^="mailto:"]');
if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        // Allow default mailto behavior, but also copy to clipboard
        const email = emailCard.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Optional: Show a toast notification
            showToast('Email copied to clipboard!');
        }).catch(err => {
            // Clipboard write failed, let mailto handle it
        });
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
        background: var(--accent-gradient);
        color: white;
        padding: 16px 32px;
        border-radius: var(--radius-md);
        font-weight: 500;
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
// Preloader (optional enhancement)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Easter Egg - Konami Code
// ========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showToast('You found the easter egg! 🎉');
            document.body.style.animation = 'rainbow 2s linear';
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c Abdulg'affor Azimov %c Software Developer
`,
    'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold; border-radius: 5px 0 0 5px;',
    'background: #1a1a25; color: #a1a1aa; padding: 10px 20px; font-size: 14px; border-radius: 0 5px 5px 0;'
);

console.log('%c👋 Hey there, fellow developer!', 'font-size: 16px; color: #6366f1;');
console.log('%c💼 Looking for a developer? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 azimovabdugaffor17@gmail.com', 'font-size: 12px; color: #a855f7;');
