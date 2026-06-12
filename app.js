document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // ==========================================================================
  // TYPING ANIMATION ENGINE
  // ==========================================================================
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    "Software Intern",
    "Full-Stack Web Developer",
    "MERN Stack Developer",
    "Problem Solver"
  ];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000; // Delay between words
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (typedTextSpan) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (typedTextSpan) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      }
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Start typing animation
  if (textArray.length && typedTextSpan) {
    setTimeout(type, 1000);
  }

  // ==========================================================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================================================
  // Add animation class to sections dynamically
  const sections = document.querySelectorAll('section, .project-showcase, .timeline-item');
  
  // Apply initial hidden styles programmatically to avoid issues if JS is disabled
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  });

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15 // Reveal when 15% of the element is visible
  });

  sections.forEach(section => {
    revealOnScroll.observe(section);
  });

  // ==========================================================================
  // CONTACT FORM INTERACTION
  // ==========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;
      
      // Loader state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      formFeedback.style.display = 'none';

      // Send message via Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'fabd361f-74fc-4507-b557-3e4ef7611720',
          name: name,
          email: email,
          message: message,
          subject: 'New Contact Form Submission from Portfolio'
        })
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback-msg form-success';
          formFeedback.textContent = '🎉 Thank you! Your message has been sent successfully. I will get back to you shortly.';
          contactForm.reset();
        } else {
          console.log(response);
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback-msg form-error';
          formFeedback.textContent = json.message || '⚠️ Something went wrong. Please try again.';
        }
      })
      .catch((error) => {
        console.log(error);
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback-msg form-error';
        formFeedback.textContent = '⚠️ Failed to connect to server. Please check your internet connection and try again.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }
});
