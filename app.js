// // DOM Content Loaded
// // import { Analytics } from "@vercel/analytics/react"
// document.addEventListener('DOMContentLoaded', function() {
//   // Initialize all functionality
//   initThemeToggle();
//   initSmoothScrolling();
//   initSkillsAnimation();
//   initContactForm();
//   setCurrentYear();
//   initIntersectionObserver();
//   initFloating3D();
// });

// // Theme Toggle Functionality
// function initThemeToggle() {
//   const themeToggle = document.getElementById('theme-toggle');
//   const html = document.documentElement;
//   const themeIcon = themeToggle.querySelector('i');
  
//   // Check for saved theme preference or default to light mode
//   const savedTheme = localStorage.getItem('theme') || 'light';
//   html.setAttribute('data-color-scheme', savedTheme);
//   updateThemeIcon(savedTheme, themeIcon);
  
//   themeToggle.addEventListener('click', function() {
//     const currentTheme = html.getAttribute('data-color-scheme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
//     html.setAttribute('data-color-scheme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     updateThemeIcon(newTheme, themeIcon);
//   });
// }

// function updateThemeIcon(theme, icon) {
//   if (theme === 'dark') {
//     icon.className = 'fa-solid fa-sun';
//   } else {
//     icon.className = 'fa-solid fa-moon';
//   }
// }

// // Smooth Scrolling for Navigation
// function initSmoothScrolling() {
//   const navLinks = document.querySelectorAll('.nav-link');
  
//   navLinks.forEach(link => {
//     link.addEventListener('click', function(e) {
//       e.preventDefault();
//       const targetId = this.getAttribute('href');
//       const targetSection = document.querySelector(targetId);
      
//       if (targetSection) {
//         const headerHeight = document.querySelector('.header').offsetHeight;
//         const targetPosition = targetSection.offsetTop - headerHeight;
        
//         window.scrollTo({
//           top: targetPosition,
//           behavior: 'smooth'
//         });
//       }
//       // Collapse menu on click (for mobile)
// if (window.innerWidth < 768) {
//   document.querySelector('.nav-links').classList.remove('active');
//   const toggle = document.querySelector('.mobile-menu-toggle');
//   if (toggle) toggle.classList.remove('active');
// }

//     });
//   });
// }

// // Skills Progress Bar Animation
// function initSkillsAnimation() {
//   const skillCategories = document.querySelectorAll('.skill-category');
  
//   const animateSkills = () => {
//     skillCategories.forEach(category => {
//       const rect = category.getBoundingClientRect();
//       const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
//       if (isVisible) {
//         const percentage = category.getAttribute('data-percentage');
//         const progressBar = category.querySelector('.progress-bar');
        
//         if (progressBar && !progressBar.classList.contains('animated')) {
//           progressBar.style.width = percentage + '%';
//           progressBar.classList.add('animated');
//         }
//       }
//     });
//   };
  
//   // Initial check
//   animateSkills();
  
//   // Check on scroll
//   window.addEventListener('scroll', animateSkills);
// }

// // Contact Form Functionality
// function initContactForm() {
//   const contactForm = document.getElementById('contact-form');
//   const formStatus = document.getElementById('form-status');
  
//   contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const message = document.getElementById('message').value.trim();
    
//     // Basic validation
//     if (!name || !email || !message) {
//       showFormStatus('Please fill in all fields.', 'error');
//       return;
//     }
    
//     if (!isValidEmail(email)) {
//       showFormStatus('Please enter a valid email address.', 'error');
//       return;
//     }
    
//     // Simulate form submission
//     showFormStatus('Sending message...', 'info');
    
//     // Simulate API call delay
//     setTimeout(() => {
//       showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
//       contactForm.reset();
//     }, 1500);
//   });
// }

// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function showFormStatus(message, type) {
//   const formStatus = document.getElementById('form-status');
//   formStatus.textContent = message;
//   formStatus.className = `mt-8 ${type}`;
//   formStatus.classList.remove('hidden');
  
//   if (type === 'success') {
//     setTimeout(() => {
//       formStatus.classList.add('hidden');
//     }, 5000);
//   }
// }

// // Set Current Year in Footer
// function setCurrentYear() {
//   const yearElement = document.getElementById('year');
//   const currentYear = new Date().getFullYear();
//   yearElement.textContent = currentYear;
// }

// // Intersection Observer for Animations
// function initIntersectionObserver() {
//   const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
//   };
  
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('fade-in-up');
//       }
//     });
//   }, observerOptions);
  
//   // Observe elements for animation
//   const elementsToObserve = document.querySelectorAll('.card, .achievement-item, .section-title');
//   elementsToObserve.forEach(el => {
//     observer.observe(el);
//   });
// }

// // Header scroll effect
// window.addEventListener('scroll', function() {
//   const header = document.querySelector('.header');
//   if (window.scrollY > 50) {
//     // header.style.backgroundColor = 'rgba(67, 64, 64, 0.9)';
//     header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//   } else {
//     header.style.backgroundColor = 'var(--color-surface)';
//     header.style.boxShadow = 'none';
//   }
// });

// // Smooth reveal animations for project cards
// function initProjectCardAnimations() {
//   const projectCards = document.querySelectorAll('.project-card');
  
//   projectCards.forEach((card, index) => {
//     card.style.animationDelay = `${index * 0.1}s`;
//   });
// }

// // Active navigation link highlighting
// function updateActiveNavLink() {
//   const sections = document.querySelectorAll('section[id]');
//   const navLinks = document.querySelectorAll('.nav-link');
  
//   let currentSection = '';
  
//   sections.forEach(section => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.clientHeight;
//     const headerHeight = document.querySelector('.header').offsetHeight;
    
//     if (window.scrollY >= sectionTop - headerHeight - 50) {
//       currentSection = section.getAttribute('id');
//     }
//   });
  
//   navLinks.forEach(link => {
//     link.classList.remove('active');
//     if (link.getAttribute('href') === `#${currentSection}`) {
//       link.classList.add('active');
//     }
//   });
// }

// // Initialize active nav link tracking
// window.addEventListener('scroll', updateActiveNavLink);

// // Add click analytics (placeholder for future implementation)
// function trackClick(element, action) {
//   // This would integrate with analytics service
//   console.log(`Clicked: ${element} - ${action}`);
// }

// // Add event listeners for tracking clicks
// document.addEventListener('click', function(e) {
//   if (e.target.matches('.btn--primary')) {
//     trackClick('Primary Button', e.target.textContent);
//   }
//   if (e.target.matches('.project-card')) {
//     trackClick('Project Card', e.target.querySelector('h3').textContent);
//   }
//   if (e.target.matches('.social-links a')) {
//     trackClick('Social Link', e.target.getAttribute('href'));
//   }
// });

// // Performance optimization: Debounce scroll events
// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// // Apply debouncing to scroll events
// const debouncedScrollHandler = debounce(function() {
//   updateActiveNavLink();
// }, 10);

// window.addEventListener('scroll', debouncedScrollHandler);

// // Preload critical resources
// function preloadResources() {
//   const criticalResources = [
//     'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
//     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
//   ];
  
//   criticalResources.forEach(url => {
//     const link = document.createElement('link');
//     link.rel = 'preload';
//     link.as = 'style';
//     link.href = url;
//     document.head.appendChild(link);
//   });
// }

// // Initialize preloading
// preloadResources();

// // Add loading state management
// function showLoading() {
//   document.body.classList.add('loading');
// }

// function hideLoading() {
//   document.body.classList.remove('loading');
// }

// // Initialize project card animations on load
// document.addEventListener('DOMContentLoaded', function() {
//   initProjectCardAnimations();
//   hideLoading();
// });

// // Error handling for failed resource loads
// window.addEventListener('error', function(e) {
//   console.error('Resource failed to load:', e.target.src || e.target.href);
// });

// // Add keyboard navigation support
// document.addEventListener('keydown', function(e) {
//   if (e.key === 'Tab') {
//     document.body.classList.add('using-keyboard');
//   }
// });

// document.addEventListener('mousedown', function() {
//   document.body.classList.remove('using-keyboard');
// });

// // Mobile menu toggle (for future mobile menu implementation)
// function initMobileMenu() {
//   const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
//   const navLinks = document.querySelector('.nav-links');
  
//   if (mobileMenuToggle) {
//     mobileMenuToggle.addEventListener('click', function() {
//       navLinks.classList.toggle('active');
//       this.classList.toggle('active');
//     });
//   }
// }

// // Fade-in on scroll
// const fadeEls = document.querySelectorAll('.fade-in');
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(e => {
//     if (e.isIntersecting) e.target.classList.add('visible');
//   });
// }, { threshold: 0.1 });
// fadeEls.forEach(el => observer.observe(el));

// const backToTop = document.getElementById('backToTop');
// window.onscroll = function() {
//   backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
// };
// backToTop.onclick = function() {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// };

// // Get the button:
// let mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }

// function initFloating3D() {
//   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//   const floatingEl = document.createElement('div');
//   floatingEl.id = 'floating-3d';
//   floatingEl.className = 'floating-3d';
//   floatingEl.innerHTML = '<div class="orb"></div>';
//   document.body.appendChild(floatingEl);

//   if (prefersReducedMotion) {
//     return;
//   }

//   let frameId = null;

//   window.addEventListener('mousemove', (event) => {
//     if (frameId) {
//       cancelAnimationFrame(frameId);
//     }

//     frameId = requestAnimationFrame(() => {
//       const x = (event.clientX / window.innerWidth - 0.5) * 24;
//       const y = (event.clientY / window.innerHeight - 0.5) * 18;
//       floatingEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
//     });
//   });
// }


//  // Example JSON data (replace this with your actual JSON import or fetch)
// const certifications = [
//   {
//     "title": "R Programming - R Programming Language Beginners to Pro",
//     "issuer": "Udemy",
//     "issued": "Jun 2025",
//     "credential_id": "UC-96714476-5206-430e-b69e-dd1c8da8caa9",
//     "skills": [
//       "R (Programming Language)",
//       "Data Analysis",
//       "Data Visualization",
//       "Statistical Programming"
//     ]
//   },
//   {
//     "title": "Blockchain and its Applications",
//     "issuer": "NPTEL",
//     "issued": "May 2025",
//     "credential_id": "NPTEL25CS08S553703455",
//     "skills": [
//       "Blockchain"
//     ]
//   },
//   {
//     "title": "Building LLM Applications With Prompt Engineering",
//     "issuer": "NVIDIA",
//     "issued": "May 2025",
//     "credential_id": "v4rq1bLWQO-q2Ymc5WeYfw"
//   },
//   {
//     "title": "DLA Piper - Global Cyber with Data Privacy Job Simulation",
//     "issuer": "Forage",
//     "issued": "May 2025",
//     "credential_id": "jPdQR9hkxZi2xnByu"
//   },
//   {
//     "title": "Foundations of AI and Machine Learning",
//     "issuer": "Coursera",
//     "issued": "May 2025",
//     "credential_id": "6UGSKTVUYF21"
//   },
//   {
//     "title": "Fundamentals of digital marketing",
//     "issuer": "Google Digital Garage",
//     "issued": "May 2025",
//     "credential_id": "385511428"
//   },
//   {
//     "title": "Google AI Essentials",
//     "issuer": "Coursera",
//     "issued": "May 2025",
//     "skills": [
//       "Artificial Intelligence (AI)",
//       "Machine Learning",
//       "Prompt Engineering",
//       "Emerging Technologies",
//       "Generative AI",
//       "Data Ethics",
//       "Critical Thinking",
//       "Strategic Thinking"
//     ]
//   },
//   {
//     "title": "Google IT Support",
//     "issuer": "Google",
//     "issued": "May 2025",
//     "credential_id": "L6N954SVI6KW"
//   },
//   {
//     "title": "Introducing Generative AI with AWS",
//     "issuer": "Udacity",
//     "issued": "May 2025",
//     "credential_id": "e443737a-3c52-11f0-b3a3-e7d3d7b94855",
//     "skills": [
//       "Machine Learning",
//       "Prompt Engineering"
//     ]
//   },
//   {
//     "title": "MLOps | Machine Learning Operations",
//     "issuer": "Duke University",
//     "issued": "May 2025",
//     "credential_id": "JUBMWZWC9X30",
//     "skills": [
//       "Microsoft Azure"
//     ]
//   },
//   {
//     "title": "Practical Quantum Computing with IBM Qiskit for Beginners",
//     "issuer": "Packt",
//     "issued": "May 2025",
//     "credential_id": "TMC5KZ0ILM1T",
//     "skills": [
//       "Theoretical Computer Science",
//       "Jupyter",
//       "Physics",
//       "Computer Science",
//       "Cryptography"
//     ]
//   },
//   {
//     "title": "Prompt Engineering for Everyone (Tool-Agnostic)",
//     "issuer": "Udemy",
//     "issued": "May 2025",
//     "credential_id": "UC-11de9d0e-6396-4463-ad2e-949a4a06d5a9",
//     "skills": [
//       "Prompt Engineering"
//     ]
//   },
//   {
//     "title": "Quantum Algorithms and Cryptography",
//     "issuer": "NPTEL",
//     "issued": "May 2025",
//     "credential_id": "NPTEL25CS61S653704198",
//     "skills": [
//       "Quantum Computing",
//       "Quantum Mechanics",
//       "Cryptography",
//       "Quantum Algorithms"
//     ]
//   },
//   {
//     "title": "Quantum Computing",
//     "issuer": "IBM",
//     "issued": "May 2025",
//     "credential_id": "PLAN-034A5530450D",
//     "skills": [
//       "Quantum Computing",
//       "Quantum Algorithms"
//     ]
//   },
//   {
//     "title": "Quantum Computing Fundamentals with Microsoft Azure Quantum",
//     "issuer": "Udemy",
//     "issued": "May 2025",
//     "credential_id": "UC-50225f5e-4aba-4f10-8c57-8ef05a49645e",
//     "skills": [
//       "Quantum Computing",
//       "Microsoft Azure"
//     ]
//   },
//   {
//     "title": "TCS iON Career Edge \u2013 Young Professional",
//     "issuer": "TCS iON",
//     "issued": "May 2025",
//     "credential_id": "240640-28283315-1016",
//     "skills": [
//       "Communication",
//       "Presentation Skills",
//       "Soft Skills",
//       "Resume Writing",
//       "Accounting",
//       "Artificial Intelligence (AI)",
//       "Time Management"
//     ]
//   },
//   {
//     "title": "The Complete Quantum Computing Course for Beginners",
//     "issuer": "Packt",
//     "issued": "May 2025",
//     "credential_id": "X75D12MNCYJ1",
//     "skills": [
//       "Algorithms"
//     ]
//   },
//   {
//     "title": "AWS Academy Graduate - AWS Academy Cloud Foundation",
//     "issuer": "Amazon Web Services (AWS)",
//     "issued": "Apr 2025",
//     "credential_id": "https://www.credly.com/badges/dc780f93-7435-46e3-abd1-0d8e554deb9c/print",
//     "skills": [
//       "AWS Pricing",
//       "AWS Architecture",
//       "AWS Cloud"
//     ]
//   },
//   {
//     "title": "Emotional Intelligence",
//     "issuer": "NPTEL",
//     "issued": "Apr 2025",
//     "skills": [
//       "Emotional Intelligence",
//       "Self-awareness",
//       "Leadership",
//       "Decision-Making",
//       "Interpersonal Skills"
//     ]
//   },
//   {
//     "title": "Introduction to Psychology",
//     "issuer": "NPTEL",
//     "issued": "Apr 2025",
//     "skills": [
//       "Cognitive Psychology",
//       "Emotional Intelligence",
//       "Behavioral Sciences"
//     ]
//   },
//   {
//     "title": "BCG - Data Science Job Simulation",
//     "issuer": "Forage",
//     "issued": "Mar 2025",
//     "credential_id": "PbsngJhxSy54qcKnw",
//     "skills": [
//       "Object-Oriented Programming (OOP)"
//     ]
//   },
//   {
//     "title": "City of Moreton Bay - Entrepreneurship and Innovation Job Simulation",
//     "issuer": "Forage",
//     "issued": "Mar 2025",
//     "credential_id": "vJTkXhuaCxqxvrem8"
//   },
//   {
//     "title": "Electronic Arts - Software Engineering Job Simulation",
//     "issuer": "Forage",
//     "issued": "Mar 2025",
//     "credential_id": "FygqshTwePyXZ2LXs"
//   },
//   {
//     "title": "Postman API Fundamentals Student Expert",
//     "issuer": "Canvas Credentials (Badgr)",
//     "issued": "Mar 2025",
//     "credential_id": "67cebd99193b202b45e8ad73"
//   },
//   {
//     "title": "Hewlett Packard Enterprise - Software Engineering Job Simulation",
//     "issuer": "Forage",
//     "issued": "Dec 2024",
//     "credential_id": "Z9oxTFYocRxyg7rtk",
//     "skills": [
//       "Spring Framework",
//       "Java"
//     ]
//   },
//   {
//     "title": "Cloud Computing",
//     "issuer": "Google Developer Groups",
//     "issued": "Dec 2024",
//     "skills": [
//       "Google Cloud Platform (GCP)",
//       "Cloud Computing"
//     ]
//   },
//   {
//     "title": "AI/ML for Geodata Analysis",
//     "issuer": "Indian Space Research Organisation (ISRO)",
//     "issued": "Aug 2024",
//     "credential_id": "4UTnw3WaNu",
//     "skills": [
//       "Machine Learning"
//     ]
//   },
//   {
//     "title": "Data Visualisation: Empowering Business with Effective Insights",
//     "issuer": "Forage",
//     "issued": "Aug 2024",
//     "credential_id": "QL5QPegaNqcH6y7Ke"
//   },
//   {
//     "title": "GenAI Job Simulation",
//     "issuer": "Forage",
//     "issued": "Aug 2024",
//     "credential_id": "QL5QPegaNqcH6y7Ke"
//   },
//   {
//     "title": "Getting Started with Artificial Intelligence",
//     "issuer": "IBM SkillsBuild",
//     "issued": "Aug 2024",
//     "credential_id": "https://www.credly.com/badges/8cb38686-2628-46b6-afd2-a579741ccbeb/public_url"
//   },
//   {
//     "title": "Google Cloud Computing Foundations & Generative AI",
//     "issuer": "GDSC",
//     "issued": "Feb 2024",
//     "skills": [
//       "Machine Learning"
//     ]
//   },
//   {
//     "title": "Software Engineering Virtual Experience Program",
//     "issuer": "Forage",
//     "issued": "Aug 2023",
//     "credential_id": "QL5QPegaNqcH6y7Ke"
//   }
// ];

// // Function to render certifications
// function renderCertifications() {
//   const container = document.querySelector('.certifications-grid');
//   if (!container) return;

//   certifications.forEach(cert => {
//     const card = document.createElement('div');
//     card.classList.add('cert-card');

//     const title = document.createElement('h3');
//     title.className = 'cert-title';
//     title.textContent = cert.title || 'No Title';

//     const issuer = document.createElement('p');
//     issuer.className = 'cert-issuer';
//     issuer.textContent = `Issued by: ${cert.issuer || 'Unknown Issuer'}`;

//     const issued = document.createElement('p');
//     issued.className = 'cert-issued';
//     issued.textContent = `Issued: ${cert.issued || 'Unknown Date'}`;

//     card.appendChild(title);
//     card.appendChild(issuer);
//     card.appendChild(issued);

//     if (cert.credential_id && cert.credential_id.startsWith('http')) {
//       const link = document.createElement('a');
//       link.href = cert.credential_id;
//       link.target = '_blank';
//       link.rel = 'noopener';
//       link.className = 'cert-link';
//       link.textContent = 'View Credential';
//       card.appendChild(link);
//     }

//     if (cert.skills && cert.skills.length > 0) {
//       const skills = document.createElement('p');
//       skills.className = 'cert-skills';
//       skills.textContent = 'Skills: ' + cert.skills.join(', ');
//       card.appendChild(skills);
//     }

//     container.appendChild(card);
//   });
// }

// // Call the function after DOM is ready
// document.addEventListener('DOMContentLoaded', renderCertifications);

// // Initialize mobile menu
// initMobileMenu();

// // =========================================
// // FEATURED COURSES CAROUSEL CONTROLLER
// // =========================================
// function initFeaturedCoursesCarousel() {
//   const track = document.getElementById('udemyTrack');
//   const slides = document.querySelectorAll('.udemy-slide');
//   const prevBtn = document.getElementById('udemyPrev');
//   const nextBtn = document.getElementById('udemyNext');

//   if (!track || slides.length === 0) return;

//   let currentIndex = 0;
//   const totalSlides = slides.length;

//   function updateCarousel() {
//     track.style.transform = `translateX(-${currentIndex * 100}%)`;
//   }

//   nextBtn?.addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % totalSlides;
//     updateCarousel();
//   });

//   prevBtn?.addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//     updateCarousel();
//   });

//   // Mobile Touch / Swipe Gesture Support
//   let touchStartX = 0;
//   let touchEndX = 0;

//   track.addEventListener('touchstart', (e) => {
//     touchStartX = e.touches[0].clientX;
//   }, { passive: true });

//   track.addEventListener('touchend', (e) => {
//     touchEndX = e.changedTouches[0].clientX;
//     const swipeThreshold = 50;

//     if (touchStartX - touchEndX > swipeThreshold) {
//       currentIndex = (currentIndex + 1) % totalSlides;
//       updateCarousel();
//     } else if (touchEndX - touchStartX > swipeThreshold) {
//       currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//       updateCarousel();
//     }
//   }, { passive: true });
// }

// // Initialize on DOM load
// document.addEventListener('DOMContentLoaded', initFeaturedCoursesCarousel);
/*
 * Mohd Saqib Portfolio — app.js (Phase 3)
 * Centralized UI behavior and interaction layer.
 *
 * Responsibilities:
 * - Theme switching
 * - Navigation / mobile menu
 * - Scroll UI / active navigation / back-to-top
 * - Skill and reveal animations
 * - Contact form submission
 * - Featured course carousel
 * - Certifications rendering
 * - Floating 3D enhancement
 * - Lightweight click tracking hooks
 */

(function () {
  'use strict';

  const SELECTORS = {
    html: document.documentElement,
    header: '.header',
    navLinks: '.nav-link',
    navMenu: '.nav-links',
    mobileToggle: '.mobile-menu-toggle',
    themeToggle: '#theme-toggle',
    contactForm: '#contact-form',
    formStatus: '#form-status',
    backToTop: '#backToTop',
    legacyBackToTop: '#myBtn',
    scrollProgress: '#myScrollBar',
    carouselTrack: '#udemyTrack',
    carouselSlides: '.udemy-slide',
    carouselPrev: '#udemyPrev',
    carouselNext: '#udemyNext',
    certifications: '.certifications-grid'
  };

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, {
        once: true
      });
    } else {
      callback();
    }
  }

  /* =========================================
     THEME
     ========================================= */

  function initThemeToggle() {
    const toggle = $(SELECTORS.themeToggle);

    if (!toggle) return;

    const icon = toggle.querySelector('i');
    const html = SELECTORS.html;

    const storedTheme = localStorage.getItem('theme');

    const initialTheme =
      storedTheme === 'dark' ? 'dark' : 'light';

    html.setAttribute(
      'data-color-scheme',
      initialTheme
    );

    updateThemeIcon(initialTheme, icon);

    toggle.setAttribute(
      'aria-pressed',
      String(initialTheme === 'dark')
    );

    toggle.addEventListener('click', () => {
      const current =
        html.getAttribute('data-color-scheme') === 'dark'
          ? 'dark'
          : 'light';

      const next =
        current === 'dark'
          ? 'light'
          : 'dark';

      html.setAttribute(
        'data-color-scheme',
        next
      );

      localStorage.setItem(
        'theme',
        next
      );

      updateThemeIcon(
        next,
        icon
      );

      toggle.setAttribute(
        'aria-pressed',
        String(next === 'dark')
      );
    });
  }

  function updateThemeIcon(theme, icon) {
    if (!icon) return;

    icon.className =
      theme === 'dark'
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';
  }

  /* =========================================
     MOBILE NAVIGATION
     ========================================= */

  function initMobileMenu() {
    const toggle = $(SELECTORS.mobileToggle);
    const menu = $(SELECTORS.navMenu);

    if (!toggle || !menu) return;

    const setMenuState = (open) => {
      menu.classList.toggle(
        'active',
        open
      );

      toggle.classList.toggle(
        'active',
        open
      );

      toggle.setAttribute(
        'aria-expanded',
        String(open)
      );
    };

    toggle.setAttribute(
      'aria-expanded',
      'false'
    );

    toggle.addEventListener('click', () => {
      setMenuState(
        !menu.classList.contains('active')
      );
    });

    $$(SELECTORS.navLinks).forEach(link => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    document.addEventListener('click', event => {
      if (!menu.classList.contains('active')) {
        return;
      }

      if (
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth > 768) {
          setMenuState(false);
        }
      },
      { passive: true }
    );
  }

  /* =========================================
     SMOOTH NAVIGATION
     ========================================= */

  function initSmoothScrolling() {
    $$(SELECTORS.navLinks).forEach(link => {
      link.addEventListener('click', event => {
        const href =
          link.getAttribute('href');

        if (
          !href ||
          !href.startsWith('#') ||
          href.length === 1
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        const header =
          $(SELECTORS.header);

        const offset =
          header
            ? header.getBoundingClientRect().height
            : 0;

        const top =
          window.scrollY +
          target.getBoundingClientRect().top -
          offset -
          8;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth'
        });

        history.replaceState(
          null,
          '',
          href
        );
      });
    });
  }

  /* =========================================
     SCROLL UI
     One scroll listener instead of multiple
     window.onscroll handlers.
     ========================================= */

  function initScrollUI() {
    const header =
      $(SELECTORS.header);

    const backToTop =
      $(SELECTORS.backToTop);

    const legacyBackToTop =
      $(SELECTORS.legacyBackToTop);

    const progress =
      $(SELECTORS.scrollProgress);

    const sections =
      $$('section[id]');

    const navLinks =
      $$(SELECTORS.navLinks);

    let ticking = false;

    const update = () => {
      const scrollY =
        window.scrollY;

      const headerHeight =
        header
          ? header.getBoundingClientRect().height
          : 0;

      if (header) {
        header.classList.toggle(
          'scrolled',
          scrollY > 50
        );

        header.style.boxShadow =
          scrollY > 50
            ? '0 2px 20px rgba(0, 0, 0, 0.1)'
            : 'none';
      }

      const shouldShowTop =
        scrollY > 300;

      if (backToTop) {
        backToTop.style.display =
          shouldShowTop
            ? 'block'
            : 'none';
      }

      if (legacyBackToTop) {
        legacyBackToTop.style.display =
          shouldShowTop
            ? 'block'
            : 'none';
      }

      if (progress) {
        const max =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const percent =
          max > 0
            ? Math.min(
                100,
                Math.max(
                  0,
                  (scrollY / max) * 100
                )
              )
            : 0;

        progress.style.width =
          `${percent}%`;
      }

      let current = '';

      for (const section of sections) {
        const top =
          section.getBoundingClientRect().top +
          scrollY;

        if (
          scrollY >=
          top -
          headerHeight -
          80
        ) {
          current =
            section.id;
        }
      }

      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') ===
            `#${current}`
        );
      });

      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          update
        );

        ticking = true;
      }
    };

    window.addEventListener(
      'scroll',
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      requestUpdate,
      { passive: true }
    );

    if (backToTop) {
      backToTop.addEventListener(
        'click',
        scrollToTop
      );
    }

    if (legacyBackToTop) {
      legacyBackToTop.addEventListener(
        'click',
        scrollToTop
      );
    }

    update();
  }

  function scrollToTop(event) {
    if (event) {
      event.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Compatibility with existing HTML:
  // onclick="topFunction()"
  window.topFunction = scrollToTop;

  /* =========================================
     SKILLS + REVEAL ANIMATIONS
     ========================================= */

  function initAnimations() {
    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (reducedMotion) {
      $$('.progress-bar').forEach(bar => {
        const category =
          bar.closest(
            '.skill-category'
          );

        const percentage =
          category?.getAttribute(
            'data-percentage'
          );

        if (percentage) {
          bar.style.width =
            `${percentage}%`;
        }
      });

      return;
    }

    if (
      !(
        'IntersectionObserver' in
        window
      )
    ) {
      $$('.progress-bar').forEach(bar => {
        const percentage =
          bar.closest(
            '.skill-category'
          )?.getAttribute(
            'data-percentage'
          );

        if (percentage) {
          bar.style.width =
            `${percentage}%`;
        }
      });

      return;
    }

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              'fade-in-up',
              'visible'
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.1,
          rootMargin:
            '0px 0px -50px 0px'
        }
      );

    $(
      '.card, .achievement-item, .section-title, .fade-in'
    ).forEach(element => {
      revealObserver.observe(
        element
      );
    });

    const skillObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            }

            const category =
              entry.target;

            const percentage =
              category.getAttribute(
                'data-percentage'
              );

            const bar =
              category.querySelector(
                '.progress-bar'
              );

            if (
              bar &&
              percentage !== null
            ) {
              const value =
                Math.max(
                  0,
                  Math.min(
                    100,
                    Number(percentage)
                  )
                );

              bar.style.width =
                `${value}%`;

              bar.classList.add(
                'animated'
              );
            }

            observer.unobserve(
              category
            );
          });
        },
        {
          threshold: 0.2
        }
      );

    $$('.skill-category').forEach(
      category =>
        skillObserver.observe(category)
    );
  }

  /* =========================================
     CONTACT FORM
     Uses the existing /api/contact endpoint
     from the HTML.
     ========================================= */

  function initContactForm() {
    const form =
      $(SELECTORS.contactForm);

    const status =
      $(SELECTORS.formStatus);

    if (!form || !status) {
      return;
    }

    let submitting = false;

    form.addEventListener(
      'submit',
      async event => {
        event.preventDefault();

        if (submitting) {
          return;
        }

        const name =
          form.name?.value.trim() || '';

        const email =
          form.email?.value.trim() || '';

        const message =
          form.message?.value.trim() || '';

        if (
          !name ||
          !email ||
          !message
        ) {
          showFormStatus(
            status,
            'Please fill in all fields.',
            'error'
          );

          return;
        }

        if (!isValidEmail(email)) {
          showFormStatus(
            status,
            'Please enter a valid email address.',
            'error'
          );

          return;
        }

        const endpoint =
          form.getAttribute('action') ||
          '/api/contact';

        const submitButton =
          form.querySelector(
            'button[type="submit"]'
          );

        submitting = true;

        if (submitButton) {
          submitButton.disabled =
            true;

          submitButton.dataset.originalText =
            submitButton.textContent;

          submitButton.textContent =
            'Sending...';
        }

        showFormStatus(
          status,
          'Sending message...',
          'info'
        );

        try {
          const response =
            await fetch(
              endpoint,
              {
                method: 'POST',
                headers: {
                  'Accept':
                    'application/json',
                  'Content-Type':
                    'application/json'
                },
                body: JSON.stringify({
                  name,
                  email,
                  message,
                  subject:
                    'Portfolio contact form'
                })
              }
            );

          if (!response.ok) {
            throw new Error(
              `Contact request failed: ${response.status}`
            );
          }

          form.reset();

          showFormStatus(
            status,
            '✅ Message sent successfully!',
            'success'
          );
        } catch (error) {
          console.error(
            'Contact form error:',
            error
          );

          showFormStatus(
            status,
            '❌ Unable to send the message right now. Please try again later.',
            'error'
          );
        } finally {
          submitting = false;

          if (submitButton) {
            submitButton.disabled =
              false;

            submitButton.textContent =
              submitButton.dataset
                .originalText ||
              'Send Message';
          }
        }
      }
    );
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }

  function showFormStatus(
    element,
    message,
    type
  ) {
    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.className =
      `mt-8 ${type}`;

    element.classList.remove(
      'hidden'
    );

    if (type === 'success') {
      window.setTimeout(
        () =>
          element.classList.add(
            'hidden'
          ),
        5000
      );
    }
  }

  /* =========================================
     PROJECT CARD ANIMATION DELAYS
     ========================================= */

  function initProjectCardAnimations() {
    $$('.project-card').forEach(
      (card, index) => {
        card.style.animationDelay =
          `${Math.min(
            index * 0.1,
            0.8
          )}s`;
      }
    );
  }

  /* =========================================
     CURRENT YEAR
     ========================================= */

  function setCurrentYear() {
    const year =
      $('#year');

    if (year) {
      year.textContent =
        String(
          new Date().getFullYear()
        );
    }
  }

  /* =========================================
     KEYBOARD ACCESSIBILITY
     ========================================= */

  function initKeyboardAccessibility() {
    document.addEventListener(
      'keydown',
      event => {
        if (event.key === 'Tab') {
          document.body.classList.add(
            'using-keyboard'
          );
        }
      }
    );

    document.addEventListener(
      'mousedown',
      () => {
        document.body.classList.remove(
          'using-keyboard'
        );
      }
    );
  }

  /* =========================================
     FLOATING 3D ORB
     ========================================= */

  function initFloating3D() {
    if (
      document.getElementById(
        'floating-3d'
      )
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    const floatingEl =
      document.createElement('div');

    floatingEl.id =
      'floating-3d';

    floatingEl.className =
      'floating-3d';

    floatingEl.innerHTML =
      '<div class="orb" aria-hidden="true"></div>';

    document.body.appendChild(
      floatingEl
    );

    if (prefersReducedMotion) {
      return;
    }

    let frameId = null;
    let lastX = 0;
    let lastY = 0;

    const updatePosition = () => {
      frameId = null;

      const x =
        (
          lastX /
          window.innerWidth -
          0.5
        ) * 24;

      const y =
        (
          lastY /
          window.innerHeight -
          0.5
        ) * 18;

      floatingEl.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener(
      'mousemove',
      event => {
        lastX =
          event.clientX;

        lastY =
          event.clientY;

        if (!frameId) {
          frameId =
            window.requestAnimationFrame(
              updatePosition
            );
        }
      },
      {
        passive: true
      }
    );
  }

  /* =========================================
     CERTIFICATIONS
     ========================================= */

  const certifications = [
    {
      title:
        'R Programming - R Programming Language Beginners to Pro',
      issuer: 'Udemy',
      issued: 'Jun 2025',
      credential_id:
        'UC-96714476-5206-430e-b69e-dd1c8da8caa9',
      skills: [
        'R (Programming Language)',
        'Data Analysis',
        'Data Visualization',
        'Statistical Programming'
      ]
    },
    {
      title:
        'Blockchain and its Applications',
      issuer: 'NPTEL',
      issued: 'May 2025',
      credential_id:
        'NPTEL25CS08S553703455',
      skills: [
        'Blockchain'
      ]
    },
    {
      title:
        'Building LLM Applications With Prompt Engineering',
      issuer: 'NVIDIA',
      issued: 'May 2025',
      credential_id:
        'v4rq1bLWQO-q2Ymc5WeYfw'
    },
    {
      title:
        'DLA Piper - Global Cyber with Data Privacy Job Simulation',
      issuer: 'Forage',
      issued: 'May 2025',
      credential_id:
        'jPdQR9hkxZi2xnByu'
    },
    {
      title:
        'Foundations of AI and Machine Learning',
      issuer: 'Coursera',
      issued: 'May 2025',
      credential_id:
        '6UGSKTVUYF21'
    },
    {
      title:
        'Fundamentals of digital marketing',
      issuer:
        'Google Digital Garage',
      issued: 'May 2025',
      credential_id:
        '385511428'
    },
    {
      title:
        'Google AI Essentials',
      issuer: 'Coursera',
      issued: 'May 2025',
      skills: [
        'Artificial Intelligence (AI)',
        'Machine Learning',
        'Prompt Engineering',
        'Emerging Technologies',
        'Generative AI',
        'Data Ethics',
        'Critical Thinking',
        'Strategic Thinking'
      ]
    },
    {
      title:
        'Google IT Support',
      issuer: 'Google',
      issued: 'May 2025',
      credential_id:
        'L6N954SVI6KW'
    },
    {
      title:
        'Introducing Generative AI with AWS',
      issuer: 'Udacity',
      issued: 'May 2025',
      credential_id:
        'e443737a-3c52-11f0-b3a3-e7d3d7b94855',
      skills: [
        'Machine Learning',
        'Prompt Engineering'
      ]
    },
    {
      title:
        'MLOps | Machine Learning Operations',
      issuer: 'Duke University',
      issued: 'May 2025',
      credential_id:
        'JUBMWZWC9X30',
      skills: [
        'Microsoft Azure'
      ]
    },
    {
      title:
        'Practical Quantum Computing with IBM Qiskit for Beginners',
      issuer: 'Packt',
      issued: 'May 2025',
      credential_id:
        'TMC5KZ0ILM1T',
      skills: [
        'Theoretical Computer Science',
        'Jupyter',
        'Physics',
        'Computer Science',
        'Cryptography'
      ]
    },
    {
      title:
        'Prompt Engineering for Everyone (Tool-Agnostic)',
      issuer: 'Udemy',
      issued: 'May 2025',
      credential_id:
        'UC-11de9d0e-6396-4463-ad2e-949a4a06d5a9',
      skills: [
        'Prompt Engineering'
      ]
    },
    {
      title:
        'Quantum Algorithms and Cryptography',
      issuer: 'NPTEL',
      issued: 'May 2025',
      credential_id:
        'NPTEL25CS61S653704198',
      skills: [
        'Quantum Computing',
        'Quantum Mechanics',
        'Cryptography',
        'Quantum Algorithms'
      ]
    },
    {
      title:
        'Quantum Computing',
      issuer: 'IBM',
      issued: 'May 2025',
      credential_id:
        'PLAN-034A5530450D',
      skills: [
        'Quantum Computing',
        'Quantum Algorithms'
      ]
    },
    {
      title:
        'Quantum Computing Fundamentals with Microsoft Azure Quantum',
      issuer: 'Udemy',
      issued: 'May 2025',
      credential_id:
        'UC-50225f5e-4aba-4f10-8c57-8ef05a49645e',
      skills: [
        'Quantum Computing',
        'Microsoft Azure'
      ]
    },
    {
      title:
        'TCS iON Career Edge – Young Professional',
      issuer: 'TCS iON',
      issued: 'May 2025',
      credential_id:
        '240640-28283315-1016',
      skills: [
        'Communication',
        'Presentation Skills',
        'Soft Skills',
        'Resume Writing',
        'Accounting',
        'Artificial Intelligence (AI)',
        'Time Management'
      ]
    },
    {
      title:
        'The Complete Quantum Computing Course for Beginners',
      issuer: 'Packt',
      issued: 'May 2025',
      credential_id:
        'X75D12MNCYJ1',
      skills: [
        'Algorithms'
      ]
    },
    {
      title:
        'AWS Academy Graduate - AWS Academy Cloud Foundation',
      issuer:
        'Amazon Web Services (AWS)',
      issued: 'Apr 2025',
      credential_id:
        'https://www.credly.com/badges/dc780f93-7435-46e3-abd1-0d8e554deb9c/print',
      skills: [
        'AWS Pricing',
        'AWS Architecture',
        'AWS Cloud'
      ]
    },
    {
      title:
        'Emotional Intelligence',
      issuer: 'NPTEL',
      issued: 'Apr 2025',
      skills: [
        'Emotional Intelligence',
        'Self-awareness',
        'Leadership',
        'Decision-Making',
        'Interpersonal Skills'
      ]
    },
    {
      title:
        'Introduction to Psychology',
      issuer: 'NPTEL',
      issued: 'Apr 2025',
      skills: [
        'Cognitive Psychology',
        'Emotional Intelligence',
        'Behavioral Sciences'
      ]
    },
    {
      title:
        'BCG - Data Science Job Simulation',
      issuer: 'Forage',
      issued: 'Mar 2025',
      credential_id:
        'PbsngJhxSy54qcKnw',
      skills: [
        'Object-Oriented Programming (OOP)'
      ]
    },
    {
      title:
        'City of Moreton Bay - Entrepreneurship and Innovation Job Simulation',
      issuer: 'Forage',
      issued: 'Mar 2025',
      credential_id:
        'vJTkXhuaCxqxvrem8'
    },
    {
      title:
        'Electronic Arts - Software Engineering Job Simulation',
      issuer: 'Forage',
      issued: 'Mar 2025',
      credential_id:
        'FygqshTwePyXZ2LXs'
    },
    {
      title:
        'Postman API Fundamentals Student Expert',
      issuer:
        'Canvas Credentials (Badgr)',
      issued: 'Mar 2025',
      credential_id:
        '67cebd99193b202b45e8ad73'
    },
    {
      title:
        'Hewlett Packard Enterprise - Software Engineering Job Simulation',
      issuer: 'Forage',
      issued: 'Dec 2024',
      credential_id:
        'Z9oxTFYocRxyg7rtk',
      skills: [
        'Spring Framework',
        'Java'
      ]
    },
    {
      title:
        'Cloud Computing',
      issuer:
        'Google Developer Groups',
      issued: 'Dec 2024',
      skills: [
        'Google Cloud Platform (GCP)',
        'Cloud Computing'
      ]
    },
    {
      title:
        'AI/ML for Geodata Analysis',
      issuer:
        'Indian Space Research Organisation (ISRO)',
      issued: 'Aug 2024',
      credential_id:
        '4UTnw3WaNu',
      skills: [
        'Machine Learning'
      ]
    },
    {
      title:
        'Data Visualisation: Empowering Business with Effective Insights',
      issuer: 'Forage',
      issued: 'Aug 2024',
      credential_id:
        'QL5QPegaNqcH6y7Ke'
    },
    {
      title:
        'GenAI Job Simulation',
      issuer: 'Forage',
      issued: 'Aug 2024',
      credential_id:
        'QL5QPegaNqcH6y7Ke'
    },
    {
      title:
        'Getting Started with Artificial Intelligence',
      issuer:
        'IBM SkillsBuild',
      issued: 'Aug 2024',
      credential_id:
        'https://www.credly.com/badges/8cb38686-2628-46b6-afd2-a579741ccbeb/public_url'
    },
    {
      title:
        'Google Cloud Computing Foundations & Generative AI',
      issuer: 'GDSC',
      issued: 'Feb 2024',
      skills: [
        'Machine Learning'
      ]
    },
    {
      title:
        'Software Engineering Virtual Experience Program',
      issuer: 'Forage',
      issued: 'Aug 2023',
      credential_id:
        'QL5QPegaNqcH6y7Ke'
    }
  ];

  /* =========================================
     RENDER CERTIFICATIONS
     ========================================= */

  function renderCertifications() {
    const container =
      $(SELECTORS.certifications);

    if (!container) {
      return;
    }

    // Prevent duplicate rendering if this
    // script is accidentally evaluated twice.
    if (
      container.dataset.rendered ===
      'true'
    ) {
      return;
    }

    container.dataset.rendered =
      'true';

    const fragment =
      document.createDocumentFragment();

    certifications.forEach(cert => {
      const card =
        document.createElement(
          'article'
        );

      card.className =
        'cert-card';

      const title =
        document.createElement(
          'h3'
        );

      title.className =
        'cert-title';

      title.textContent =
        cert.title ||
        'No Title';

      const issuer =
        document.createElement(
          'p'
        );

      issuer.className =
        'cert-issuer';

      issuer.textContent =
        `Issued by: ${
          cert.issuer ||
          'Unknown Issuer'
        }`;

      const issued =
        document.createElement(
          'p'
        );

      issued.className =
        'cert-issued';

      issued.textContent =
        `Issued: ${
          cert.issued ||
          'Unknown Date'
        }`;

      card.append(
        title,
        issuer,
        issued
      );

      if (cert.credential_id) {
        const credential =
          String(
            cert.credential_id
          );

        if (
          /^https?:\/\//i.test(
            credential
          )
        ) {
          const link =
            document.createElement(
              'a'
            );

          link.href =
            credential;

          link.target =
            '_blank';

          link.rel =
            'noopener noreferrer';

          link.className =
            'cert-link';

          link.textContent =
            'View Credential';

          card.appendChild(
            link
          );
        }
      }

      if (
        Array.isArray(
          cert.skills
        ) &&
        cert.skills.length
      ) {
        const skills =
          document.createElement(
            'p'
          );

        skills.className =
          'cert-skills';

        skills.textContent =
          `Skills: ${
            cert.skills.join(
              ', '
            )
          }`;

        card.appendChild(
          skills
        );
      }

      fragment.appendChild(
        card
      );
    });

    container.appendChild(
      fragment
    );
  }

  /* =========================================
     FEATURED COURSES CAROUSEL
     One controller with keyboard + swipe.
     ========================================= */

  function initFeaturedCoursesCarousel() {
    const track =
      $(SELECTORS.carouselTrack);

    const slides =
      $$(SELECTORS.carouselSlides);

    const prevBtn =
      $(SELECTORS.carouselPrev);

    const nextBtn =
      $(SELECTORS.carouselNext);

    if (
      !track ||
      slides.length === 0
    ) {
      return;
    }

    let currentIndex = 0;

    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    const total =
      slides.length;

    const viewport =
      track.parentElement;

    track.style.willChange =
      'transform';

    const update = ({
      animate = true
    } = {}) => {
      track.style.transition =
        animate
          ? 'transform 0.5s ease'
          : 'none';

      track.style.transform =
        `translate3d(-${
          currentIndex * 100
        }%, 0, 0)`;

      slides.forEach(
        (slide, index) => {
          slide.setAttribute(
            'aria-hidden',
            String(
              index !==
              currentIndex
            )
          );
        }
      );

      if (prevBtn) {
        prevBtn.disabled =
          total <= 1;
      }

      if (nextBtn) {
        nextBtn.disabled =
          total <= 1;
      }
    };

    const goTo = index => {
      currentIndex =
        (index + total) %
        total;

      update();
    };

    const next = () =>
      goTo(
        currentIndex + 1
      );

    const prev = () =>
      goTo(
        currentIndex - 1
      );

    if (nextBtn) {
      nextBtn.addEventListener(
        'click',
        next
      );
    }

    if (prevBtn) {
      prevBtn.addEventListener(
        'click',
        prev
      );
    }

    if (viewport) {
      viewport.addEventListener(
        'touchstart',
        event => {
          const touch =
            event.changedTouches[0];

          touchStartX =
            touch.clientX;

          touchStartY =
            touch.clientY;

          isDragging = true;
        },
        {
          passive: true
        }
      );

      viewport.addEventListener(
        'touchend',
        event => {
          if (!isDragging) {
            return;
          }

          isDragging = false;

          const touch =
            event.changedTouches[0];

          const dx =
            touch.clientX -
            touchStartX;

          const dy =
            touch.clientY -
            touchStartY;

          // Ignore mostly vertical
          // gestures so normal page
          // scrolling remains natural.
          if (
            Math.abs(dx) < 50 ||
            Math.abs(dx) <
              Math.abs(dy)
          ) {
            return;
          }

          if (dx < 0) {
            next();
          } else {
            prev();
          }
        },
        {
          passive: true
        }
      );
    }

    document.addEventListener(
      'keydown',
      event => {
        const rect =
          viewport?.getBoundingClientRect();

        if (
          !rect ||
          rect.bottom < 0 ||
          rect.top >
            window.innerHeight
        ) {
          return;
        }

        if (
          event.key ===
          'ArrowRight'
        ) {
          next();
        }

        if (
          event.key ===
          'ArrowLeft'
        ) {
          prev();
        }
      }
    );

    update({
      animate: false
    });
  }

  /* =========================================
     CLICK TRACKING
     ========================================= */

  function trackClick(
    element,
    action
  ) {
    // Google Analytics is loaded
    // separately by index.html.
    if (
      typeof window.gtag ===
      'function'
    ) {
      window.gtag(
        'event',
        'portfolio_click',
        {
          element,
          action
        }
      );
    }
  }

  function initClickTracking() {
    document.addEventListener(
      'click',
      event => {
        const primaryButton =
          event.target.closest(
            '.btn--primary'
          );

        if (primaryButton) {
          trackClick(
            'Primary Button',
            primaryButton.textContent.trim()
          );

          return;
        }

        const projectCard =
          event.target.closest(
            '.project-card'
          );

        if (projectCard) {
          trackClick(
            'Project Card',
            projectCard
              .querySelector('h3')
              ?.textContent
              ?.trim() ||
              'Project'
          );

          return;
        }

        const socialLink =
          event.target.closest(
            '.social-links a'
          );

        if (socialLink) {
          trackClick(
            'Social Link',
            socialLink.href
          );
        }
      }
    );
  }

  /* =========================================
     RESOURCE / ERROR HANDLING
     ========================================= */

  function initResourceErrorLogging() {
    window.addEventListener(
      'error',
      event => {
        const target =
          event.target;

        if (
          target &&
          (
            target.src ||
            target.href
          )
        ) {
          console.warn(
            'Portfolio resource failed to load:',
            target.src ||
            target.href
          );
        }
      },
      true
    );
  }

  /* =========================================
     LOADING STATE
     ========================================= */

  function hideLoading() {
    document.body.classList.remove(
      'loading'
    );

    const preloader =
      document.getElementById(
        'global-preloader'
      );

    if (preloader) {
      window.setTimeout(
        () =>
          preloader.classList.add(
            'hide-preloader'
          ),
        100
      );

      window.setTimeout(
        () =>
          preloader.remove(),
        800
      );
    }
  }

  /* =========================================
     INITIALIZATION
     ========================================= */

  function initApp() {
    initThemeToggle();

    initMobileMenu();

    initSmoothScrolling();

    initScrollUI();

    initAnimations();

    initContactForm();

    initProjectCardAnimations();

    initKeyboardAccessibility();

    initFloating3D();

    renderCertifications();

    initFeaturedCoursesCarousel();

    initClickTracking();

    initResourceErrorLogging();

    setCurrentYear();

    hideLoading();
  }

  onReady(
    initApp
  );

// Replace 'YOUR_YOUTUBE_CHANNEL_ID' with your actual YouTube Channel ID (e.g., 'UCxxxxxxxxxxxxxx')
const YOUTUBE_CHANNEL_ID = 'UCbxEfgKTCsqz6g0eMNph_Hg'; 

// Ensure this is set to your actual channel ID (e.g., UCxxxxxxxxxxxxxx)
// const YOUTUBE_CHANNEL_ID = 'UCxxxxxxxxxxxxxx'; 

async function loadYouTubeData() {
  try {
    console.log('Fetching YouTube stats for channel:', YOUTUBE_CHANNEL_ID);

    // 1. Fetch channel stats
    const statsRes = await fetch(`/api/youtube/stats?channel=${YOUTUBE_CHANNEL_ID}`);
    const stats = await statsRes.json();
    console.log('YouTube API Response:', stats);

    if (statsRes.ok && stats.viewCount) {
      // Find elements by class OR ID, or any element currently showing "Loading..."
      const targets = document.querySelectorAll('.yt-views-badge-large, #youtube-views, .yt-views-count');
      
      console.log(`Found ${targets.length} target element(s) to update.`);

      targets.forEach((el) => {
        // If the container has sub-elements, update text directly; otherwise set full innerHTML
        const countSpan = el.querySelector('.yt-count') || el;
        countSpan.innerHTML = `<i class="fa-solid fa-eye"></i> ${stats.viewCount} Views`;
      });
    } else {
      console.error('API Error or missing viewCount:', stats);
    }

    // 2. Fetch latest videos
    const videosRes = await fetch(`/api/youtube/videos?channel=${YOUTUBE_CHANNEL_ID}&limit=6`);
    if (videosRes.ok) {
      const { videos } = await videosRes.json();
      console.log('Fetched videos:', videos);
    }
  } catch (err) {
    console.error('Error fetching YouTube data:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadYouTubeData);
  
  /* =========================================
     PUBLIC COMPATIBILITY HELPERS
     ========================================= */

  window.showFormStatus =
    (
      message,
      type
    ) => {
      showFormStatus(
        $(SELECTORS.formStatus),
        message,
        type
      );
    };

  window.isValidEmail =
    isValidEmail;

  window.scrollToTop =
    scrollToTop;

})();



document.addEventListener('DOMContentLoaded', () => {

  // 1. 3D Card Tilt Effect on Mouse Move
  const tiltCards = document.querySelectorAll('.card, .project-card, .achievement-card, .instructor-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 2. Magnetic Pull Effect for Navigation & Primary Buttons
  const magneticBtns = document.querySelectorAll('.btn, .nav-link, .color-swatch');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // 3. Dynamic Click Ripple Visual Feedback
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });

});
