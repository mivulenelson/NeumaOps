/**
 * NeumaOps Master JS - Global Edition
 * Stabilized Motion, Text Entrance, and Universal Scroll-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       1. Global Footer Year
    ========================== */
    const initGlobal = () => {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear() + ' ';
        }
    };
    initGlobal();

    /* =========================
       2. Universal Scroll-to-Top (FAB)
       Ensures the button appears on all pages after 600px scroll.
    ========================== */
    const initScrollTop = () => {
        // Create the button element
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Return to top');
        btn.className = 'back-to-top-btn';
        
        // Comprehensive styling to match NeumaOps branding
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(9, 25, 62, 0.9)',
            border: '1px solid #22d3ee',
            color: '#22d3ee',
            cursor: 'pointer',
            zIndex: '2000',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            opacity: '0',
            transform: 'scale(0)',
            backdropFilter: 'blur(10px)',
            fontSize: '22px',
            fontWeight: 'bold',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });

        document.body.appendChild(btn);

        // Visibility Logic
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
            } else {
                btn.style.opacity = '0';
                btn.style.transform = 'scale(0)';
            }
        });
        
        // Scroll Action
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

        // Hover States
        btn.onmouseenter = () => {
            btn.style.backgroundColor = '#22d3ee';
            btn.style.color = '#09193e';
            btn.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.6)';
        };
        btn.onmouseleave = () => {
            btn.style.backgroundColor = 'rgba(9, 25, 62, 0.9)';
            btn.style.color = '#22d3ee';
            btn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
        };
    };
    initScrollTop();

    /* =========================
       3. Matrix Navbar Animation
    ========================== */
    const initMatrix = () => {
        const canvas = document.getElementById('matrix-mini');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = 40 * dpr;
        canvas.height = 48 * dpr;
        ctx.scale(dpr, dpr);

        const particles = Array.from({ length: 18 }, () => ({
            x: Math.random() * 40,
            y: Math.random() * 48,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.4 + 0.2,
            opacity: Math.random()
        }));

        const animate = () => {
            ctx.clearRect(0, 0, 40, 48);
            particles.forEach(p => {
                ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.y -= p.speed;
                if (p.y < 0) p.y = 48;
            });
            requestAnimationFrame(animate);
        };
        animate();
    };
    initMatrix();

    /* =========================
       4. Staggered Text & Content Reveal
    ========================== */
    const initScrollReveal = () => {
        const revealTargets = document.querySelectorAll(`
            h1, h2, .tagline, .hero p, .container p, 
            .service-card, .work-item, .logo-display-card,
            .technical-specs, .about-text, .contact-info p, .reviews
        `);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.filter = 'blur(0px)';
                    }, index * 60); 
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.filter = 'blur(4px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            revealObserver.observe(el);
        });
    };
    initScrollReveal();

    /* =========================
       5. STABLE INTERACTION: In & Out Motion
       Zero-rotation scaling to keep links clickable.
    ========================== */
    const initStableHover = () => {
        const interactiveCards = document.querySelectorAll('.service-card, .logo-display-card, .work-item');

        interactiveCards.forEach(card => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.04)';
                card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 211, 238, 0.15)';
                card.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'none';
                card.style.zIndex = '1';
            });
        });
    };
    initStableHover();

    /* =========================
       6. Navigation & Navbar Logic
    ========================== */
    const initNavigation = () => {
        // Smooth Scroll with Offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === "#") return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({ 
                        top: target.offsetTop - navHeight, 
                        behavior: 'smooth' 
                    });
                }
            });
        });

        // Navbar Styling on Scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(9, 19, 43, 0.98)';
                    navbar.style.borderBottom = '1px solid rgba(34, 211, 238, 0.1)';
                } else {
                    navbar.style.background = '#09132b';
                    navbar.style.borderBottom = 'none';
                }
            });
        }
    };
    initNavigation();
});
