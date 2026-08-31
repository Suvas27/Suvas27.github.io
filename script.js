document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CONSTELLATION NETWORK CANVAS ANIMATION
  // ==========================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    
    // Adjust particle count based on screen width for performance
    const getParticleCount = () => window.innerWidth < 768 ? 40 : 80;
    const CONNECT_DIST = 150;
    const MOUSE_RADIUS = 200;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 1;
        // Rose or Violet
        this.isAccent = Math.random() > 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;

        // Bounce off walls
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Subtle mouse attraction/repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
            this.vx += dx * force;
            this.vy += dy * force;
          }
        }

        // Dampen velocity to prevent infinite speed buildup
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
          this.vx *= 0.95;
          this.vy *= 0.95;
        } else if (speed < 0.2) {
          this.vx *= 1.05;
          this.vy *= 1.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Rose: 244, 63, 94 | Violet: 139, 92, 246
        const r = this.isAccent ? 244 : 139;
        const g = this.isAccent ? 63 : 92;
        const b = this.isAccent ? 94 : 246;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.baseAlpha})`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    
    initParticles();

    // Re-init on significant resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (particles.length !== getParticleCount()) {
           initParticles();
        }
      }, 250);
    });

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const p1 = particles[a];
          const p2 = particles[b];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.2;
            
            // Create gradient line between the two points
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const rgb1 = p1.isAccent ? '244,63,94' : '139,92,246';
            const rgb2 = p2.isAccent ? '244,63,94' : '139,92,246';
            gradient.addColorStop(0, `rgba(${rgb1}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${rgb2}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.4;
            const rgb = particles[a].isAccent ? '244,63,94' : '139,92,246';
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach(p => {
        p.update();
      });
      
      // Draw connections first so they appear behind dots
      connectParticles();
      
      // Draw dots on top
      particles.forEach(p => {
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }


  // ==========================================
  // 2. NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ==========================================
  // 3. MOBILE MENU
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.innerHTML = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });
  }

  // ==========================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // 5. SKILL BAR FILL
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-fill');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ==========================================
  // 6. MEDIA LIGHTBOX MODAL
  // ==========================================
  const mediaBtns = document.querySelectorAll('.view-media-btn');
  const modal = document.getElementById('media-modal');

  if (modal) {
    const modalClose = modal.querySelector('.modal-close');
    const modalImages = modal.querySelector('.modal-images');
    let scrollPos = 0;

    mediaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollPos = window.scrollY;

        const data = JSON.parse(btn.getAttribute('data-images'));
        modalImages.innerHTML = '';

        data.forEach(img => {
          const wrap = document.createElement('div');
          wrap.className = 'modal-image-container';

          const imgEl = document.createElement('img');
          imgEl.src = img.src;
          imgEl.alt = img.caption;

          const cap = document.createElement('div');
          cap.className = 'modal-caption';
          cap.innerHTML = img.caption;

          wrap.appendChild(imgEl);
          wrap.appendChild(cap);
          modalImages.appendChild(wrap);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPos);
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // ==========================================
  // 7. CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-success');
      if (msg) {
        msg.classList.add('show');
        contactForm.reset();
        setTimeout(() => msg.classList.remove('show'), 5000);
      }
    });
  }
});
