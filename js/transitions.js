/* ============================================
   ProAir Zimbabwe — Smooth Page Transitions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
});

function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.classList.add('page-transition-overlay');
    overlay.innerHTML = `
        <div class="page-transition-bar">
            <img src="./assets/images/logo.jpg" alt="Loading...">
        </div>
    `;
    document.body.appendChild(overlay);

    // Fade in current page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Only intercept internal page links (not anchors, external, WhatsApp, tel, etc.)
        const isInternal = href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('https://wa.me');
        const isNewTab = link.getAttribute('target') === '_blank';

        if (!isInternal || isNewTab) return;

        e.preventDefault();

        // Trigger transition
        overlay.classList.add('active');
        document.body.style.opacity = '0.3';

        setTimeout(() => {
            window.location.href = href;
        }, 350);
    });
}
