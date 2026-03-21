/* ============================================
   ProAir Zimbabwe — Contact Form JavaScript
   WhatsApp Integration (Clean Format)
   ============================================ */

// WhatsApp number for receiving enquiries
// TEST NUMBER — change to 263779840840 or 263717840840 for production
const WHATSAPP_NUMBER = '263779840840';

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formContent = document.querySelector('.form-content');
    const formSuccess = document.querySelector('.form-success');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form fields
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');
        const service = form.querySelector('#service');
        const message = form.querySelector('#message');

        // Basic validation
        let isValid = true;

        [name, email, phone, message].forEach(field => {
            if (field && !field.value.trim()) {
                field.style.borderColor = 'var(--accent)';
                isValid = false;
            } else if (field) {
                field.style.borderColor = 'var(--gray-200)';
            }
        });

        // Email validation
        if (email && email.value && !isValidEmail(email.value)) {
            email.style.borderColor = 'var(--accent)';
            isValid = false;
        }

        if (!isValid) return;

        // Build WhatsApp message
        const selectedService = service?.value || 'General Enquiry';
        const whatsappMessage = buildWhatsAppMessage(
            name.value,
            email.value,
            phone.value,
            selectedService,
            message.value
        );

        // Show success UI
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Opening WhatsApp...
    `;

        setTimeout(() => {
            if (formContent) formContent.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('show');

            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        }, 500);
    });

    // Reset validation on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => {
            field.style.borderColor = 'var(--gray-200)';
        });
    });
}

/**
 * Generate a unique lead reference number
 * Format: PA-YYYYMMDD-XXXX
 */
function generateLeadRef() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    return `PA-${y}${m}${d}-${seq}`;
}

/**
 * Format timestamp for the message
 */
function formatTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} at ${hours}:${mins}`;
}

/**
 * Get the priority label for a service (helps business team triage)
 */
function getServiceCategory(service) {
    const s = service.toLowerCase();
    if (s.includes('car')) return 'Automotive';
    if (s.includes('home') || s.includes('residential')) return 'Residential';
    if (s.includes('office') || s.includes('commercial')) return 'Commercial';
    if (s.includes('portable') || s.includes('hire') || s.includes('heater')) return 'Equipment Hire';
    if (s.includes('whirlybird') || s.includes('extractor') || s.includes('ventilation')) return 'Ventilation';
    return 'General';
}

/**
 * Build a clean, professional WhatsApp message
 * Uses only WhatsApp-safe formatting (no emojis to avoid encoding issues)
 */
function buildWhatsAppMessage(name, email, phone, service, message) {
    const ref = generateLeadRef();
    const ts = formatTimestamp();
    const category = getServiceCategory(service);

    return [
        `*PROAIR ZIMBABWE*`,
        `*New Customer Enquiry*`,
        `________________________________`,
        ``,
        `*Customer Details*`,
        `> Name: ${name}`,
        `> Email: ${email}`,
        `> Phone: ${phone}`,
        ``,
        `*Service Requested*`,
        `> ${service}`,
        `> Category: ${category}`,
        ``,
        `*Message*`,
        `> ${message}`,
        ``,
        `________________________________`,
        `Ref: ${ref}`,
        `Received: ${ts}`,
        `Source: proairzw.co.zw`,
    ].join('\n');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

