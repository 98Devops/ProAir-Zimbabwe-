/* ============================================
   ProAir Zimbabwe — Effects & Animations
   Handles: particles, counter, tilt, weather,
            scroll progress, typing, ripple
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initCounterAnimation();
    initTiltCards();
    initParticles();
    initWeatherWidget();
    initTypingEffect();
    initButtonRipple();
    initMagneticButtons();
    initEnhancedReveals();
});

// ---- Scroll Progress Bar ----
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.classList.add('scroll-progress');
    document.body.prepend(bar);

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ---- Counter Animation ----
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const text = el.textContent.trim();
    // Extract number and suffix (e.g., "500+" → 500, "+")
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 2000;
    const startTime = performance.now();

    // Store original HTML structure
    const accentSpan = el.querySelector('.accent');

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);

        if (accentSpan) {
            // Preserve the accent span structure
            el.childNodes.forEach(node => {
                if (node.nodeType === 3) { // text node
                    node.textContent = current + '';
                }
            });
            accentSpan.textContent = suffix;
        } else {
            el.textContent = current + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (accentSpan) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) {
                        node.textContent = target + '';
                    }
                });
                accentSpan.textContent = suffix;
            } else {
                el.textContent = target + suffix;
            }
        }
    }

    // Start from 0
    if (accentSpan) {
        el.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                node.textContent = '0';
            }
        });
        accentSpan.textContent = suffix;
    } else {
        el.textContent = '0' + suffix;
    }

    requestAnimationFrame(step);
}

// ---- 3D Tilt Cards ----
function initTiltCards() {
    const cards = document.querySelectorAll('.service-card, .value-card, .feature-card');
    if (!cards.length) return;

    // Skip on touch devices
    if ('ontouchstart' in window) return;

    cards.forEach(card => {
        card.classList.add('tilt-card');

        // Add glare element
        const glare = document.createElement('div');
        glare.classList.add('tilt-glare');
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            // Move glare
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ---- Cool Air Particle System ----
function initParticles() {
    // Run on both homepage hero and inner page-hero sections
    const heroSections = document.querySelectorAll('.hero, .page-hero');
    if (!heroSections.length) return;

    heroSections.forEach(hero => createParticleSystem(hero));
}

function createParticleSystem(hero) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = Math.random() * -0.5 - 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.life = 0;
            this.maxLife = Math.random() * 300 + 200;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;

            // Fade in and out based on life
            if (this.life < 30) {
                this.currentOpacity = this.opacity * (this.life / 30);
            } else if (this.life > this.maxLife - 30) {
                this.currentOpacity = this.opacity * ((this.maxLife - this.life) / 30);
            } else {
                this.currentOpacity = this.opacity;
            }

            if (this.life >= this.maxLife || this.x < -10 || this.x > canvas.width + 10 || this.y < -10) {
                this.reset();
                this.y = canvas.height + 10;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
            ctx.fill();
        }
    }

    // Fewer particles on smaller page-hero sections
    const isPageHero = hero.classList.contains('page-hero');
    const count = isPageHero
        ? Math.min(35, Math.floor(canvas.width / 30))
        : Math.min(60, Math.floor(canvas.width / 20));

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    // Only animate when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animate();
        } else {
            cancelAnimationFrame(animationId);
        }
    });
    heroObserver.observe(hero);
}

// ---- Live Weather Widget ----
function initWeatherWidget() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    // Insert weather widget placeholder before the hero label
    const widget = document.createElement('div');
    widget.classList.add('weather-widget');
    widget.id = 'weather-widget';
    widget.style.display = 'none';

    const heroLabel = heroContent.querySelector('.hero-label');
    if (heroLabel) {
        heroLabel.insertAdjacentElement('afterend', widget);
    } else {
        heroContent.prepend(widget);
    }

    // Fetch weather (OpenWeatherMap free tier)
    const API_KEY = ''; // Free API — user can add their own key
    const CITY = 'Harare,ZW';

    // Use a free no-key API as fallback
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=-17.83&longitude=31.05&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            if (data && data.current_weather) {
                const temp = Math.round(data.current_weather.temperature);
                const weatherCode = data.current_weather.weathercode;
                const icon = getWeatherIcon(weatherCode);

                widget.innerHTML = `
                    <span class="weather-icon">${icon}</span>
                    <span>It's <span class="weather-temp">${temp}°C</span> in Harare — let ProAir fix that.</span>
                `;
                widget.style.display = 'inline-flex';
            }
        })
        .catch(() => {
            // Silently fail — widget stays hidden
        });
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 49) return '☁️';
    if (code <= 69) return '🌧️';
    if (code <= 79) return '❄️';
    if (code <= 99) return '⛈️';
    return '🌡️';
}

// ---- Typing Effect ----
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const fullText = tagline.textContent.trim();
    tagline.textContent = '';
    tagline.style.visibility = 'visible';

    // Add cursor
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    tagline.appendChild(cursor);

    let i = 0;
    const speed = 60;

    function type() {
        if (i < fullText.length) {
            tagline.insertBefore(document.createTextNode(fullText.charAt(i)), cursor);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after a delay
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
                cursor.style.transition = 'opacity 0.5s';
            }, 2000);
        }
    }

    // Start typing after a brief delay
    setTimeout(type, 800);
}

// ---- Button Ripple Effect ----
function initButtonRipple() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        btn.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

// ---- Magnetic Buttons ----
function initMagneticButtons() {
    if ('ontouchstart' in window) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-outline-white');

    buttons.forEach(btn => {
        btn.classList.add('btn-magnetic');

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ---- Enhanced Scroll Reveals ----
function initEnhancedReveals() {
    const clipElements = document.querySelectorAll('.clip-reveal-left, .clip-reveal-right, .reveal-scale');
    if (!clipElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    clipElements.forEach(el => observer.observe(el));
}
