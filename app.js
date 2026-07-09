/* ==========================================================================
   Ekta Bakers - Interactive JavaScript Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Sticky Navigation & Active Section Highlighter
  // ==========================================================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // Toggle sticky header class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active nav item based on scroll position
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset for sticky header
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on load

  // ==========================================================================
  // 2. Mobile Responsive Menu
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ==========================================================================
  // 3. Dynamic Custom Cake Preview & WhatsApp Inquiry Builder
  // ==========================================================================
  const cakeForm = document.getElementById('cake-builder-form');
  const flavorSelect = document.getElementById('cake-flavor');
  const weightSelect = document.getElementById('cake-weight');
  const themeSelect = document.getElementById('cake-theme');
  const messageInput = document.getElementById('cake-message');
  const dateInput = document.getElementById('cake-date');
  
  // Preview elements
  const valFlavor = document.getElementById('val-flavor');
  const valWeight = document.getElementById('val-weight');
  const valTheme = document.getElementById('val-theme');
  const valDiet = document.getElementById('val-eggless');
  const valMessage = document.getElementById('val-message');
  const valDate = document.getElementById('val-date');

  // Set default date in date input (today + 2 days for preparation time)
  const today = new Date();
  const prepDate = new Date(today);
  prepDate.setDate(prepDate.getDate() + 2); // Minimum 48 hours prep
  const year = prepDate.getFullYear();
  const month = String(prepDate.getMonth() + 1).padStart(2, '0');
  const day = String(prepDate.getDate()).padStart(2, '0');
  dateInput.value = `${year}-${month}-${day}`;
  valDate.textContent = prepDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  // Update preview function
  const updatePreview = () => {
    valFlavor.textContent = flavorSelect.options[flavorSelect.selectedIndex].text;
    valWeight.textContent = weightSelect.options[weightSelect.selectedIndex].text;
    valTheme.textContent = themeSelect.options[themeSelect.selectedIndex].text;
    
    // Diet Option
    const selectedDiet = document.querySelector('input[name="diet"]:checked');
    if (selectedDiet) {
      valDiet.textContent = selectedDiet.value;
    }
    
    // Message
    if (messageInput.value.trim() === '') {
      valMessage.textContent = 'None';
      valMessage.classList.add('italic');
    } else {
      valMessage.textContent = `"${messageInput.value.trim()}"`;
      valMessage.classList.remove('italic');
    }

    // Delivery Date
    if (dateInput.value) {
      const selectedDate = new Date(dateInput.value);
      valDate.textContent = selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      valDate.textContent = 'Select date';
    }
  };

  // Add event listeners for preview updates
  flavorSelect.addEventListener('change', updatePreview);
  weightSelect.addEventListener('change', updatePreview);
  themeSelect.addEventListener('change', updatePreview);
  messageInput.addEventListener('input', updatePreview);
  dateInput.addEventListener('change', updatePreview);
  
  const dietRadios = document.querySelectorAll('input[name="diet"]');
  dietRadios.forEach(radio => {
    radio.addEventListener('change', updatePreview);
  });

  // Handle visual builder form submission (Launch WhatsApp)
  cakeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('client-name').value.trim();
    const flavor = flavorSelect.options[flavorSelect.selectedIndex].text;
    const weight = weightSelect.options[weightSelect.selectedIndex].text;
    const theme = themeSelect.options[themeSelect.selectedIndex].text;
    const diet = document.querySelector('input[name="diet"]:checked').value;
    const colorPreference = document.getElementById('cake-color').value.trim() || 'No specific color preference';
    const message = messageInput.value.trim() || 'No message';
    const date = dateInput.value;
    const notes = document.getElementById('cake-notes').value.trim() || 'None';

    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified';

    // Structured message template for Chef Ekta
    const waMessage = `🎂 *NEW CUSTOM CAKE INQUIRY* 🎂\n` +
                      `-----------------------------\n` +
                      `👤 *Customer Name:* ${clientName}\n` +
                      `🍰 *Flavor Selected:* ${flavor}\n` +
                      `⚖️ *Cake Weight:* ${weight}\n` +
                      `🎉 *Occasion / Theme:* ${theme}\n` +
                      `🌱 *Diet Preference:* ${diet}\n` +
                      `🎨 *Colors & Icing:* ${colorPreference}\n` +
                      `✍️ *Message on Cake:* "${message}"\n` +
                      `📅 *Preferred Delivery:* ${formattedDate}\n` +
                      `📝 *Special Requests:* ${notes}\n\n` +
                      `_Sent from Ekta Bakers Custom Cake Designer_`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/917888901847?text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(waUrl, '_blank');
  });

  // ==========================================================================
  // 4. Contact Form Submission (Launch WhatsApp)
  // ==========================================================================
  const contactForm = document.getElementById('direct-contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim() || 'Not provided';
    const message = document.getElementById('contact-msg').value.trim();

    const contactWaMsg = `👋 *HELLO EKTA BAKERS* 👋\n` +
                         `-----------------------------\n` +
                         `I have a general inquiry from your website contact page:\n\n` +
                         `👤 *Name:* ${name}\n` +
                         `📞 *Phone Number:* ${phone}\n` +
                         `✉️ *Email Address:* ${email}\n\n` +
                         `💬 *Message:* \n${message}\n\n` +
                         `_Please get back to me. Thank you!_`;

    const encodedMsg = encodeURIComponent(contactWaMsg);
    const waUrl = `https://wa.me/917888901847?text=${encodedMsg}`;

    window.open(waUrl, '_blank');
  });

  // ==========================================================================
  // 5. Filterable Masonry Gallery
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let activeVisibleItems = [...galleryItems]; // Tracks currently filtered items for lightbox navigation

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active filter button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      activeVisibleItems = [];

      galleryItems.forEach(item => {
        // Simple elegant display transition
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          // Small delay for fade effect
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
          activeVisibleItems.push(item);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          // Wait for transition before display none
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 6. Lightbox Preview Module
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  let currentImgIndex = 0;

  // Open Lightbox
  const openLightbox = (index) => {
    currentImgIndex = index;
    const targetItem = activeVisibleItems[currentImgIndex];
    const imgEl = targetItem.querySelector('img');
    
    lightboxImg.src = imgEl.src;
    lightboxCaption.textContent = targetItem.getAttribute('data-title') || imgEl.alt;
    lightbox.classList.add('active');
    
    // Disable body scroll when open
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // Navigate Lightbox
  const showPrevImg = (e) => {
    e.stopPropagation();
    let prevIndex = currentImgIndex - 1;
    if (prevIndex < 0) prevIndex = activeVisibleItems.length - 1;
    openLightbox(prevIndex);
  };

  const showNextImg = (e) => {
    e.stopPropagation();
    let nextIndex = currentImgIndex + 1;
    if (nextIndex >= activeVisibleItems.length) nextIndex = 0;
    openLightbox(nextIndex);
  };

  // Add click listeners to gallery elements
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Find current item's index in the filtered active items list
      const index = activeVisibleItems.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  // Lightbox control events
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevImg);
  lightboxNext.addEventListener('click', showNextImg);
  
  // Close when clicking outside the content image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevImg(e);
    } else if (e.key === 'ArrowRight') {
      showNextImg(e);
    }
  });

  // ==========================================================================
  // 7. FAQ Accordion Module
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close other opened FAQs (Accordion Style)
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-body').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        // Calculate and set max height
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ==========================================================================
  // 8. Intersection Observer for Scroll Reveal Animations
  // ==========================================================================
  const elementsToAnimate = document.querySelectorAll(
    '.category-card, .why-us-item, .stat-item, .review-card, .faq-item, .custom-order-info, .custom-order-form-wrapper, .contact-info-panel, .contact-form-panel, .course-card, .c-feature'
  );

  // Add scroll class setup
  elementsToAnimate.forEach(el => el.classList.add('animate-on-scroll'));

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
  });

  elementsToAnimate.forEach(el => {
    animationObserver.observe(el);
  });


  // ==========================================================================
    // ==========================================================================
  // 9. Course Enrollment & Inline Checkout Handler
  // ==========================================================================
  const enrollmentForm = document.getElementById('enrollment-form');
  const courseSelect = document.getElementById('enroll-course-select');
  const inlinePriceDisplay = document.getElementById('inline-checkout-price');
  const enrollButtons = document.querySelectorAll('.btn-enroll-trigger');

  // Handle course button click (select course and scroll to form)
  enrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseKey = btn.getAttribute('data-course-key');
      
      // Update dropdown selection
      if (courseSelect) {
        courseSelect.value = courseKey;
        
        // Update price display
        const selectedOption = courseSelect.options[courseSelect.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        inlinePriceDisplay.textContent = price;
      }

      // Smooth scroll to the checkout card
      const checkoutBlock = document.getElementById('checkout-block');
      if (checkoutBlock) {
        checkoutBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Dynamic price update when select dropdown changes manually
  if (courseSelect) {
    courseSelect.addEventListener('change', () => {
      const selectedOption = courseSelect.options[courseSelect.selectedIndex];
      inlinePriceDisplay.textContent = selectedOption.getAttribute('data-price');
    });
  }

  // Handle enrollment submit (Simulate PayU checkout, Auto-register student, Dispatch WhatsApp/Email, Redirect)
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('student-name').value.trim();
      const studentEmail = document.getElementById('student-email').value.trim().toLowerCase();
      const studentPhone = document.getElementById('student-phone').value.trim();
      const courseKey = courseSelect.value;
      const courseName = courseSelect.options[courseSelect.selectedIndex].text.split(' — ')[0];

      // Show processing state on button
      const submitBtn = document.getElementById('btn-submit-enroll');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Secure PayU Transaction...';

      // Simulate payment loading
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-envelope"></i> Sending credentials to Email & WhatsApp...';
        
        // Auto-Register student in Local Database
        const studentsList = JSON.parse(localStorage.getItem('studentsList') || '{}');
        
        if (!studentsList[studentEmail]) {
          studentsList[studentEmail] = {
            name: studentName,
            email: studentEmail,
            phone: studentPhone,
            password: "password123",
            purchasedCourses: [courseKey]
          };
        } else {
          if (!studentsList[studentEmail].purchasedCourses.includes(courseKey)) {
            studentsList[studentEmail].purchasedCourses.push(courseKey);
          }
        }
        
        localStorage.setItem('studentsList', JSON.stringify(studentsList));
        localStorage.setItem('activeStudent', JSON.stringify(studentsList[studentEmail]));
        localStorage.setItem('courseKey', courseKey);

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Course Unlocked!';
          alert(`Order Successful!\n\nCourse details, tutorial video links, and PDF cookbooks have been dispatched to:\n📧 Email: ${studentEmail}\n💬 WhatsApp: ${studentPhone}\n\nYour login password is: password123\n\nClick OK to open your student classroom portal.`);
          
          window.location.href = 'classroom.html';
        }, 1500);
      }, 2000);
    });
  }

  // 10. Student Authentication & Session Management
  // ==========================================================================
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');
  const btnLoginTrigger = document.getElementById('btn-login-trigger');
  const btnTabSignin = document.getElementById('btn-tab-signin');
  const btnTabSignup = document.getElementById('btn-tab-signup');
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const signinError = document.getElementById('signin-error');
  const signupError = document.getElementById('signup-error');
  
  // Navbar states
  const guestStateNav = document.getElementById('btn-login-trigger');
  const studentProfileNav = document.getElementById('student-profile-nav');
  const studentNameNav = document.getElementById('student-name-nav');
  const btnLogout = document.getElementById('btn-logout');

  // Mobile navbar elements
  const btnLoginTriggerMobile = document.getElementById('btn-login-trigger-mobile');
  const btnLogoutMobile = document.getElementById('btn-logout-mobile');
  const mobileLoginLi = document.getElementById('mobile-login-li');
  const mobileProfileLi = document.getElementById('mobile-profile-li');
  const studentNameNavMobile = document.getElementById('student-name-nav-mobile');

  // Check auth session on page load (Syncs both Desktop and Mobile viewports)
  const initNavbarAuth = () => {
    const activeStudent = localStorage.getItem('activeStudent');
    if (activeStudent) {
      const student = JSON.parse(activeStudent);
      const firstName = student.name.split(' ')[0];
      
      // Desktop state
      if (studentNameNav) studentNameNav.textContent = firstName;
      if (guestStateNav) guestStateNav.style.display = 'none';
      if (studentProfileNav) studentProfileNav.style.display = 'flex';
      
      // Mobile state
      if (studentNameNavMobile) studentNameNavMobile.textContent = firstName;
      if (mobileLoginLi) mobileLoginLi.style.display = 'none';
      if (mobileProfileLi) mobileProfileLi.style.display = 'block';
    } else {
      // Desktop state
      if (guestStateNav) guestStateNav.style.display = 'inline-flex';
      if (studentProfileNav) studentProfileNav.style.display = 'none';
      
      // Mobile state
      if (mobileLoginLi) mobileLoginLi.style.display = 'block';
      if (mobileProfileLi) mobileProfileLi.style.display = 'none';
    }
  };

  // Open Auth Modal (Desktop & Mobile)
  const openAuthModal = () => {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    signinError.style.display = 'none';
    signupError.style.display = 'none';
    // Close mobile menu if open
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  };

  if (btnLoginTrigger) {
    btnLoginTrigger.addEventListener('click', openAuthModal);
  }
  if (btnLoginTriggerMobile) {
    btnLoginTriggerMobile.addEventListener('click', openAuthModal);
  }

  // Close Auth Modal
  const closeAuthModal = () => {
    authModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (authClose) {
    authClose.addEventListener('click', closeAuthModal);
  }

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
  });

  // Switch tabs
  btnTabSignin.addEventListener('click', () => {
    btnTabSignin.classList.add('active');
    btnTabSignup.classList.remove('active');
    signinForm.style.display = 'flex';
    signupForm.style.display = 'none';
  });

  btnTabSignup.addEventListener('click', () => {
    btnTabSignup.classList.add('active');
    btnTabSignin.classList.remove('active');
    signupForm.style.display = 'flex';
    signinForm.style.display = 'none';
  });

  // Student Sign Up
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;

    const studentsList = JSON.parse(localStorage.getItem('studentsList') || '{}');

    if (studentsList[email]) {
      signupError.textContent = "Email is already registered! Please Sign In.";
      signupError.style.display = 'block';
      return;
    }

    // Register User
    studentsList[email] = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      purchasedCourses: [] // Initially empty
    };

    localStorage.setItem('studentsList', JSON.stringify(studentsList));
    // Log them in
    localStorage.setItem('activeStudent', JSON.stringify(studentsList[email]));
    
    initNavbarAuth();
    closeAuthModal();
    signupForm.reset();
  });

  // Student Sign In
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value.trim().toLowerCase();
    const password = document.getElementById('signin-password').value;

    const studentsList = JSON.parse(localStorage.getItem('studentsList') || '{}');
    const user = studentsList[email];

    if (user && user.password === password) {
      signinError.style.display = 'none';
      localStorage.setItem('activeStudent', JSON.stringify(user));
      initNavbarAuth();
      closeAuthModal();
      signinForm.reset();
    } else {
      signinError.textContent = "Invalid email address or password!";
      signinError.style.display = 'block';
    }
  });

  // Student Log Out (Desktop & Mobile)
  const handleLogout = () => {
    localStorage.removeItem('activeStudent');
    initNavbarAuth();
    // Close mobile menu if open
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  };

  if (btnLogout) {
    btnLogout.addEventListener('click', handleLogout);
  }
  if (btnLogoutMobile) {
    btnLogoutMobile.addEventListener('click', handleLogout);
  }

  // Initialize navbar on load
  initNavbarAuth();

});
