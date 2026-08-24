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
const navbar = document.querySelector('.navbar');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navbar) {
            navbar.classList.toggle('menu-open', isOpen);
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            if (navbar) {
                navbar.classList.remove('menu-open');
            }
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            if (navbar) {
                navbar.classList.remove('menu-open');
            }
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
// Phone Contact Action
// ========================================
const phoneCard = document.querySelector('.contact-card[href^="tel:"]');
if (phoneCard) {
    phoneCard.addEventListener('click', (e) => {
        const phone = '+998 (90) 123-45-67';
        navigator.clipboard.writeText(phone).then(() => {
            const currentLang = localStorage.getItem('portfolio_lang') || 'en';
            const msg = currentLang === 'uz' ? 'Telefon raqam nusxalandi!' : 'Phone number copied to clipboard!';
            showToast(msg);
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
// Telegram Bot Modal Gallery Logic
// ========================================
const botModal = document.getElementById('bot-gallery-modal');
const openModalBtns = document.querySelectorAll('.open-bot-modal');
const closeModalBtn = document.querySelector('.modal-close');
const modalTabs = document.querySelectorAll('.modal-tab');
const modalSlides = document.querySelectorAll('.modal-slide');

function openBotModal() {
    if (botModal) {
        botModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBotModal() {
    if (botModal) {
        botModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBotModal();
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBotModal);
}

if (botModal) {
    botModal.addEventListener('click', (e) => {
        if (e.target === botModal) {
            closeBotModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && botModal && botModal.classList.contains('active')) {
        closeBotModal();
    }
});

modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetIndex = tab.getAttribute('data-target');
        
        modalTabs.forEach(t => t.classList.remove('active'));
        modalSlides.forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        if (modalSlides[targetIndex]) {
            modalSlides[targetIndex].classList.add('active');
        }
    });
});

// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Bilingual Internationalization (EN / UZ)
// ========================================
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        nav_cta: "Let's Talk",
        hero_role: "SOFTWARE DEVELOPER",
        hero_title_1: "Building digital",
        hero_title_2: "experiences that",
        hero_title_3: "make an impact",
        hero_desc: "I'm Abdulg'affor Azimov, a passionate developer crafting modern web applications with clean code and creative solutions. Based in Tashkent, Uzbekistan.",
        hero_view_projects: "View Projects",
        hero_consultation: "Get Free Consultation",
        stat_projects: "Projects",
        stat_student: "Year Student",
        stat_tech: "Technologies",
        status_available: "Available for work",
        about_label: "ABOUT ME",
        about_title_1: "Passionate about creating",
        about_title_2: "digital excellence",
        about_years: "Years of Learning",
        about_lead: "Hey! I'm a software developer who loves turning complex problems into elegant solutions.",
        about_p1: "Currently pursuing my degree at Tashkent University of Information Technology, I specialize in building modern web applications using React, Node.js, and Python. I believe in writing code that's not just functional, but beautiful and maintainable.",
        about_p2: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or diving into the latest AI developments.",
        skills_label: "SKILLS & TECHNOLOGIES",
        skills_title_1: "Technologies & tools",
        skills_title_2: "I work with",
        skills_more: "Also experienced with:",
        skill_react: "Building interactive user interfaces",
        skill_node: "Server-side JavaScript runtime",
        skill_python: "Versatile programming language",
        skill_ts: "Type-safe JavaScript",
        skill_tailwind: "Utility-first CSS framework",
        skill_next: "React framework for production",
        skill_mongo: "NoSQL database",
        skill_git: "Version control system",
        projects_label: "FEATURED PROJECTS",
        projects_title_1: "Some things I've",
        projects_title_2: "built recently",
        cat_webapp: "Web Application",
        cat_indev: "In Development",
        badge_coming_soon: "Coming Soon",
        proj_new_title: "New Project",
        proj_new_desc: "Exciting new project currently in development. Stay tuned for more innovative solutions and creative implementations.",
        second_smile_desc: "Second Smile is a B2B SaaS CRM that provides dental clinics with their own complete management system through a subscription-based service. It brings patient records, appointments, treatment planning, services, payments, staff management, and clinic operations into one centralized platform, with different access levels for doctors, receptionists, administrators, and other staff.",
        bot_desc: "A powerful Node.js Telegram bot that simplifies document creation by converting multiple images into customizable PDF files. Users can reorder, rotate, remove, and configure pages, choose output quality and page size, merge existing PDFs, and interact with the bot in English, Uzbek, or Russian.",
        btn_screenshots: "More Screenshots (3)",
        btn_try_telegram: "Try on Telegram",
        btn_view_github: "View All on GitHub",
        contact_label: "GET IN TOUCH",
        contact_title_1: "Let's work together on",
        contact_title_2: "your next project",
        contact_desc: "I'm currently open to new opportunities and interesting projects. Feel free to reach out if you want to collaborate or just say hello!",
        contact_phone: "Phone",
        footer_brand: "Building digital experiences with passion and precision.",
        footer_rights: "© 2026 Abdulg'affor Azimov. All rights reserved.",
        modal_badge: "Telegram Bot Showcase",
        modal_title: "Img2PDF Bot Screenshots",
        tab_1: "1. Features Overview",
        tab_2: "2. Bot Profile",
        tab_3: "3. Converting PDF in Action",
        caption_1: "Bot Welcome Screen & Feature Capabilities",
        caption_2: "Bot Telegram Profile & Handle (@I_hate_Pdf_bot)",
        caption_3: "Image to PDF Conversion & Interactive Menu Options",
        btn_open_bot: "Open Bot in Telegram"
    },
    uz: {
    nav_home: "Bosh sahifa",
    nav_about: "Men haqimda",
    nav_skills: "Ko‘nikmalar",
    nav_projects: "Loyihalar",
    nav_contact: "Bog‘lanish",
    nav_cta: "Bog‘lanish",

    hero_role: "DASTURCHI",
    hero_title_1: "Zamonaviy veb",
    hero_title_2: "ilovalar va saytlar",
    hero_title_3: "yarataman",
    hero_desc: "Men Abdulg‘affor Azimov — Toshkentda faoliyat yurituvchi dasturchiman. Zamonaviy veb-ilovalarni toza kod va amaliy yechimlar asosida yarataman.",
    hero_view_projects: "Loyihalarni ko‘rish",
    hero_consultation: "Bepul maslahat",

    stat_projects: "Loyiha",
    stat_student: "Oylik ta’lim",
    stat_tech: "Texnologiya",
    status_available: "Yangi loyihalar uchun ochiq",

    about_label: "MEN HAQIMDA",
    about_title_1: "Kod yozaman,",
    about_title_2: "muammo yechaman",
    about_years: "Yil tajriba",
    about_lead: "Men Abdulg‘affor — dasturchiman. Asosan web dasturlash bilan shug‘ullanaman va turli g‘oyalarni ishlaydigan loyihalarga aylantiraman.",
    about_p1: "Hozir TATUda o‘qiyman. React va Node.js bilan ishlayman, turli loyihalar yaratish orqali amaliy tajribamni oshirib boryapman.",
    about_p2: "Hozirgi maqsadim — real loyihalar ustida ko‘proq ishlash, yangi texnologiyalarni o‘rganish va dasturlash bo‘yicha tajribamni yanada rivojlantirish.",

    skills_label: "KO‘NIKMALAR",
    skills_title_1: "Ishlaydigan",
    skills_title_2: "texnologiyalar",
    skills_more: "Yana ishlataman:",
    skill_react: "Interaktiv interfeyslar",
    skill_node: "Backend ishlab chiqish",
    skill_python: "Backend va avtomatlashtirish",
    skill_ts: "Tiplangan JavaScript",
    skill_tailwind: "Zamonaviy UI yaratish",
    skill_next: "Production web-ilovalar",
    skill_mongo: "NoSQL ma’lumotlar bazasi",
    skill_git: "Versiya nazorati",

    projects_label: "LOYIHALAR",
    projects_title_1: "Ishlagan",
    projects_title_2: "loyihalarim",
    cat_webapp: "Veb-ilova",
    cat_indev: "Ishlanmoqda",
    badge_coming_soon: "Tez orada",

    proj_new_title: "Yangi loyiha",
    proj_new_desc: "Hozir yangi loyiha ustida ishlayapman. Yaqinda bu yerda batafsil ma’lumot bo‘ladi.",

    second_smile_desc: "Second Smile — stomatologiya klinikalari uchun B2B SaaS CRM tizimi. Klinikalar obuna asosida tizimdan foydalanib, bemorlar, qabullar, davolash jarayonlari, xizmatlar, to‘lovlar va xodimlarni bitta platformadan boshqarishi mumkin.",

    bot_desc: "Rasmlarni PDF faylga aylantiruvchi Telegram bot. Foydalanuvchilar sahifalarni tartiblashi, aylantirishi, o‘chirishi, sifat va formatni sozlashi hamda bir nechta PDF faylni birlashtirishi mumkin. Bot o‘zbek, ingliz va rus tillarida ishlaydi.",

    btn_screenshots: "Skrinshotlar (3)",
    btn_try_telegram: "Telegramda sinab ko‘rish",
    btn_view_github: "GitHub’da ko‘rish",

    contact_label: "BOG‘LANISH",
    contact_title_1: "Keyingi loyihada",
    contact_title_2: "birga ishlaymiz",
    contact_desc: "Hozir yangi loyihalar, hamkorlik va qiziqarli takliflar uchun ochiqman. Bog‘lanish uchun istalgan qulay kanal orqali yozishingiz mumkin.",
    contact_phone: "Telefon",

    footer_brand: "Zamonaviy va foydali raqamli mahsulotlar yarataman.",
    footer_rights: "© 2026 Abdulg‘affor Azimov. Barcha huquqlar himoyalangan.",

    modal_badge: "Telegram bot",
    modal_title: "Img2PDF Bot — skrinshotlar",
    tab_1: "1. Asosiy sahifa",
    tab_2: "2. Bot profili",
    tab_3: "3. PDF yaratish",
    caption_1: "Botning asosiy oynasi va mavjud imkoniyatlar",
    caption_2: "Telegram’dagi bot profili (@I_hate_Pdf_bot)",
    caption_3: "Rasmni PDF’ga aylantirish jarayoni va sozlamalar",
    btn_open_bot: "Botni ochish"
}
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    // Update active button state
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update element texts with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Persist language choice
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
}

// Language button event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Initialize saved language on load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('portfolio_lang') || 'en';
    setLanguage(savedLang);
});
