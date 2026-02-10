/* ==========================================
   JHESLY ROMERO BEAUTY SALON - JAVASCRIPT
   ========================================== */

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initNavbar();
    initMobileMenu();
    initBookingForm();
    initContactForm();
    initTimeSlots();
    setMinDate();
});

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
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
    
    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
    
    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/* ==========================================
   BOOKING FORM
   ========================================== */
let currentStep = 1;
let selectedTimeValue = '';

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBooking();
    });
}

function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Update steps
    document.getElementById('step' + currentStep).classList.remove('active');
    document.getElementById('step' + step).classList.add('active');
    
    // Update step indicators
    updateStepIndicators(step);
    
    // If going to step 3, update summary
    if (step === 3) {
        updateBookingSummary();
    }
    
    currentStep = step;
    lucide.createIcons();
}

function prevStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    document.getElementById('step' + step).classList.add('active');
    
    updateStepIndicators(step);
    currentStep = step;
    lucide.createIcons();
}

function validateStep(step) {
    if (step === 1) {
        const service = document.getElementById('serviceSelect').value;
        if (!service) {
            alert('Por favor selecciona un servicio');
            return false;
        }
    }
    
    if (step === 2) {
        const date = document.getElementById('dateInput').value;
        if (!date) {
            alert('Por favor selecciona una fecha');
            return false;
        }
        if (!selectedTimeValue) {
            alert('Por favor selecciona una hora');
            return false;
        }
    }
    
    return true;
}

function updateStepIndicators(activeStep) {
    const steps = document.querySelectorAll('.booking-steps .step');
    const lines = document.querySelectorAll('.booking-steps .step-line');
    
    steps.forEach((step, index) => {
        if (index + 1 <= activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    lines.forEach((line, index) => {
        if (index + 1 < activeStep) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

function updateBookingSummary() {
    const service = document.getElementById('serviceSelect');
    const date = document.getElementById('dateInput').value;
    const serviceName = service.options[service.selectedIndex].text;
    
    const dateObj = new Date(date + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('es-ES', options);
    
    const summary = document.getElementById('bookingSummary');
    summary.innerHTML = `
        <p>Resumen de tu cita:</p>
        <p class="summary-service">${serviceName}</p>
        <p class="summary-datetime">${formattedDate} a las ${selectedTimeValue}</p>
    `;
}

function submitBooking() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;
    
    if (!name || !phone || !email) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Show success message
    document.getElementById('step3').classList.remove('active');
    document.getElementById('stepSuccess').classList.add('active');
    
    const service = document.getElementById('serviceSelect');
    const date = document.getElementById('dateInput').value;
    const serviceName = service.options[service.selectedIndex].text;
    
    const dateObj = new Date(date + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('es-ES', options);
    
    document.getElementById('successText').innerHTML = `
        Hemos recibido tu solicitud de cita para el <strong>${formattedDate}</strong> a las <strong>${selectedTimeValue}</strong>.
    `;
    
    lucide.createIcons();
}

function resetForm() {
    // Reset form
    document.getElementById('bookingForm').reset();
    selectedTimeValue = '';
    
    // Reset time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Reset steps
    document.getElementById('stepSuccess').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    
    // Reset indicators
    currentStep = 1;
    updateStepIndicators(1);
    
    lucide.createIcons();
}

/* ==========================================
   TIME SLOTS
   ========================================== */
function initTimeSlots() {
    const slots = document.querySelectorAll('.time-slot');
    
    slots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected from all
            slots.forEach(s => s.classList.remove('selected'));
            
            // Add selected to clicked
            this.classList.add('selected');
            selectedTimeValue = this.dataset.time;
            document.getElementById('selectedTime').value = selectedTimeValue;
        });
    });
}

/* ==========================================
   DATE INPUT
   ========================================== */
function setMinDate() {
    const dateInput = document.getElementById('dateInput');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        alert('¡Mensaje enviado! Te contactaremos pronto.');
        form.reset();
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
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
