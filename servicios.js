/* ==========================================
   JHESLY ROMERO BEAUTY SALON - SERVICIOS JS
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
    initNavbar();
    initMobileMenu();
    initFilterTabs();
    initContactForm();
    initScrollAnimations();
});

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const links = menu.querySelectorAll('a');

    toggle.addEventListener('click', function () {
        menu.classList.toggle('active');

        if (menu.classList.contains('active')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    links.forEach(link => {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/* ==========================================
   FILTER TABS
   ========================================== */
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const categories = document.querySelectorAll('.service-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter categories
            categories.forEach(cat => {
                if (filter === 'all' || cat.dataset.category === filter) {
                    cat.classList.remove('hidden');
                    // Re-trigger animation
                    const cards = cat.querySelectorAll('.service-card, .package-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 60);
                    });
                } else {
                    cat.classList.add('hidden');
                }
            });

            // Scroll to first visible category
            const firstVisible = document.querySelector('.service-category:not(.hidden)');
            if (firstVisible && filter !== 'all') {
                setTimeout(() => {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // offset for navbar
                    window.scrollBy(0, -100);
                }, 100);
            } else if (filter === 'all') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.service-card, .package-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index % 4 * 0.08}s, transform 0.5s ease ${index % 4 * 0.08}s`;
        observer.observe(card);
    });

    // Observe category headers
    document.querySelectorAll('.category-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(15px)';
        header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(header);
    });
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('¡Mensaje enviado! Te contactaremos pronto.');
        form.reset();
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 100;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});