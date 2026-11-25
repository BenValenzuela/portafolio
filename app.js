/* ================================================================
   app.js — Benjamín Valenzuela
   Basado en el código de Lorenzo Teixido
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. Año en footer =====
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ===== 2. Tema oscuro/claro =====
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ===== 3. GSAP Animaciones =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        gsap.registerPlugin(ScrollTrigger);

        const ease = 'power3.out';

        // Hero
        gsap.set('nav', { y: -10, autoAlpha: 0 });
        gsap.set('.status-pill, .hero-name, .hero-desc, .hero-ctas, .hero-meta', { y: 28, autoAlpha: 0 });
        gsap.set('.hero-right', { x: 32, autoAlpha: 0 });

        gsap.timeline({ defaults: { ease: ease, duration: 0.75 } })
            .to('nav', { autoAlpha: 1, y: 0, duration: 0.5, clearProps: 'transform' })
            .to('.status-pill', { autoAlpha: 1, y: 0, clearProps: 'transform' }, '-=0.2')
            .to('.hero-name', { autoAlpha: 1, y: 0, clearProps: 'transform' }, '-=0.55')
            .to('.hero-desc', { autoAlpha: 1, y: 0, clearProps: 'transform' }, '-=0.5')
            .to('.hero-ctas', { autoAlpha: 1, y: 0, clearProps: 'transform' }, '-=0.5')
            .to('.hero-meta', { autoAlpha: 1, y: 0, clearProps: 'transform' }, '-=0.5')
            .to('.hero-right', { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power4.out', clearProps: 'transform' }, '-=0.6');

        // Función para revelar elementos al hacer scroll
        function revealOnScroll(targets, opts = {}) {
            gsap.utils.toArray(targets).forEach(function(el, i) {
                gsap.fromTo(el,
                    { autoAlpha: 0, y: opts.y || 28, x: opts.x || 0 },
                    {
                        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                        autoAlpha: 1, y: 0, x: 0,
                        duration: opts.duration || 0.65,
                        delay: (opts.stagger || 0.08) * i,
                        ease: ease,
                        clearProps: 'transform'
                    }
                );
            });
        }

        revealOnScroll('.eyebrow', { y: 14, duration: 0.45, stagger: 0 });
        revealOnScroll('.section-title', { y: 18, duration: 0.6, stagger: 0 });
        revealOnScroll('.section-sub', { y: 14, duration: 0.55, stagger: 0 });
        revealOnScroll('.about-prose p', { stagger: 0.09 });
        revealOnScroll('.feature-row', { x: -14, y: 0, stagger: 0.09 });
        revealOnScroll('.stack-block', { stagger: 0.09 });
        revealOnScroll('.proj-card', { stagger: 0.08 });
        revealOnScroll('.cert-card', { stagger: 0.08 });
        revealOnScroll('.contact-link-row', { x: -12, y: 0, stagger: 0.09 });
        revealOnScroll('.contact-form', { y: 22 });

        // Efecto hover con GSAP
        function addLift(selector, yAmount, xAmount) {
            yAmount = yAmount || -4;
            xAmount = xAmount || 0;
            gsap.utils.toArray(selector).forEach(function(el) {
                var qy = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power2.out' });
                var qx = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power2.out' });
                el.addEventListener('mouseenter', function() {
                    qy(yAmount);
                    if (xAmount) qx(xAmount);
                });
                el.addEventListener('mouseleave', function() {
                    qy(0);
                    qx(0);
                });
            });
        }

        setTimeout(function() {
            addLift('.proj-card', -5);
            addLift('.stack-block', -3);
            addLift('.cert-card', -4);
            addLift('.btn', -2);
            addLift('.form-submit', -2);
            addLift('.profile-card', -4);
            addLift('.feature-row', 0, 4);
            addLift('.contact-link-row', 0, 4);
        }, 100);

        // Navegación activa
        var navAs = document.querySelectorAll('.nav-links a');
        document.querySelectorAll('section[id], div[id]').forEach(function(sec) {
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 50%',
                end: 'bottom 50%',
                onToggle: function(self) {
                    if (self.isActive) {
                        navAs.forEach(function(a) {
                            a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
                        });
                    }
                }
            });
        });

    } else {
        // Fallback si GSAP no carga
        document.querySelectorAll('.gsap-init').forEach(function(el) {
            el.style.opacity = 1;
        });
    }

    // ===== 4. Botón volver arriba =====
    var upBtn = document.getElementById('up-btn');
    if (upBtn) {
        window.addEventListener('scroll', function() {
            upBtn.classList.toggle('show', window.scrollY > 400);
        }, { passive: true });
    }

    // ===== 5. Formulario de contacto =====
    var form = document.getElementById('contact-form');
    if (form) {
        var btn = document.getElementById('form-btn');
        var fb = document.getElementById('form-feedback');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            btn.disabled = true;
            btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Enviando...';
            fb.className = 'form-feedback';

            try {
                var res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });

                if (res.ok) {
                    fb.className = 'form-feedback success';
                    fb.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Mensaje enviado. Te respondo pronto.';
                    form.reset();
                    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Enviado';
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (err) {
                fb.className = 'form-feedback error';
                fb.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Hubo un error. Escríbeme directamente a bvalenzuelacevedo@gmail.com';
                btn.disabled = false;
                btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Enviar mensaje';
            }
        });
    }

    console.log('🚀 Portafolio de Benjamín Valenzuela cargado correctamente.');
});