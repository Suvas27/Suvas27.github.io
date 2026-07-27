document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu .nav-links a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });
  }

  // 3. Skill Bars Animation (IntersectionObserver)
  const skillBars = document.querySelectorAll('.skill-fill');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width');
          entry.target.style.width = targetWidth;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }

  // 4. Modal Gallery functionality
  const mediaBtns = document.querySelectorAll('.view-media-btn');
  const modal = document.getElementById('media-modal');
  
  if (modal) {
    const modalClose = modal.querySelector('.modal-close');
    const modalImagesContainer = modal.querySelector('.modal-images');
    let scrollPos = 0;

    mediaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Save scroll position for accessibility/UX
        scrollPos = window.scrollY;
        
        // Populate modal based on data attributes
        const imagesData = JSON.parse(btn.getAttribute('data-images'));
        modalImagesContainer.innerHTML = '';
        
        imagesData.forEach(img => {
          const container = document.createElement('div');
          container.className = 'modal-image-container';
          
          const imgEl = document.createElement('img');
          imgEl.src = img.src;
          imgEl.alt = img.caption;
          
          // Lightbox zoom effect
          imgEl.addEventListener('click', (e) => {
            e.stopPropagation();
            imgEl.classList.toggle('zoomed');
          });
          
          const caption = document.createElement('div');
          caption.className = 'modal-caption';
          caption.innerHTML = img.caption;
          
          container.appendChild(imgEl);
          container.appendChild(caption);
          modalImagesContainer.appendChild(container);
        });

        // Show modal and trap focus (simplified)
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
    });

    // Close Modal functions
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPos); // Restore scroll position
      
      // Remove zoom on all images
      const images = modal.querySelectorAll('img');
      images.forEach(img => img.classList.remove('zoomed'));
    };

    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-images')) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 5. Contact Form Simulation (Static Site)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const successMsg = document.getElementById('form-success');
      successMsg.classList.add('show');
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 5000);
    });
  }
});
