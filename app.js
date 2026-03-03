// DOM Content Loaded
// import { Analytics } from "@vercel/analytics/react"
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initThemeToggle();
  initSmoothScrolling();
  initSkillsAnimation();
  initContactForm();
  setCurrentYear();
  initIntersectionObserver();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-color-scheme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, icon) {
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      // Collapse menu on click (for mobile)
if (window.innerWidth < 768) {
  document.querySelector('.nav-links').classList.remove('active');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (toggle) toggle.classList.remove('active');
}

    });
  });
}

// Skills Progress Bar Animation
function initSkillsAnimation() {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  const animateSkills = () => {
    skillCategories.forEach(category => {
      const rect = category.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const percentage = category.getAttribute('data-percentage');
        const progressBar = category.querySelector('.progress-bar');
        
        if (progressBar && !progressBar.classList.contains('animated')) {
          progressBar.style.width = percentage + '%';
          progressBar.classList.add('animated');
        }
      }
    });
  };
  
  // Initial check
  animateSkills();
  
  // Check on scroll
  window.addEventListener('scroll', animateSkills);
}

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      showFormStatus('Please fill in all fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    showFormStatus('Sending message...', 'info');
    
    // Simulate API call delay
    setTimeout(() => {
      showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    }, 1500);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormStatus(message, type) {
  const formStatus = document.getElementById('form-status');
  formStatus.textContent = message;
  formStatus.className = `mt-8 ${type}`;
  formStatus.classList.remove('hidden');
  
  if (type === 'success') {
    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 5000);
  }
}

// Set Current Year in Footer
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}

// Intersection Observer for Animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const elementsToObserve = document.querySelectorAll('.card, .achievement-item, .section-title');
  elementsToObserve.forEach(el => {
    observer.observe(el);
  });
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    // header.style.backgroundColor = 'rgba(67, 64, 64, 0.9)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.backgroundColor = 'var(--color-surface)';
    header.style.boxShadow = 'none';
  }
});

// Smooth reveal animations for project cards
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    if (window.scrollY >= sectionTop - headerHeight - 50) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Initialize active nav link tracking
window.addEventListener('scroll', updateActiveNavLink);

// Add click analytics (placeholder for future implementation)
function trackClick(element, action) {
  // This would integrate with analytics service
  console.log(`Clicked: ${element} - ${action}`);
}

// Add event listeners for tracking clicks
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn--primary')) {
    trackClick('Primary Button', e.target.textContent);
  }
  if (e.target.matches('.project-card')) {
    trackClick('Project Card', e.target.querySelector('h3').textContent);
  }
  if (e.target.matches('.social-links a')) {
    trackClick('Social Link', e.target.getAttribute('href'));
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
  updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
function preloadResources() {
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
  ];
  
  criticalResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Initialize preloading
preloadResources();

// Add loading state management
function showLoading() {
  document.body.classList.add('loading');
}

function hideLoading() {
  document.body.classList.remove('loading');
}

// Initialize project card animations on load
document.addEventListener('DOMContentLoaded', function() {
  initProjectCardAnimations();
  hideLoading();
});

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
  console.error('Resource failed to load:', e.target.src || e.target.href);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('using-keyboard');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('using-keyboard');
});

// Mobile menu toggle (for future mobile menu implementation)
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

const backToTop = document.getElementById('backToTop');
window.onscroll = function() {
  backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
};
backToTop.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


 // Example JSON data (replace this with your actual JSON import or fetch)
const certifications = [
  {
    "title": "R Programming - R Programming Language Beginners to Pro",
    "issuer": "Udemy",
    "issued": "Jun 2025",
    "credential_id": "UC-96714476-5206-430e-b69e-dd1c8da8caa9",
    "skills": [
      "R (Programming Language)",
      "Data Analysis",
      "Data Visualization",
      "Statistical Programming"
    ]
  },
  {
    "title": "Blockchain and its Applications",
    "issuer": "NPTEL",
    "issued": "May 2025",
    "credential_id": "NPTEL25CS08S553703455",
    "skills": [
      "Blockchain"
    ]
  },
  {
    "title": "Building LLM Applications With Prompt Engineering",
    "issuer": "NVIDIA",
    "issued": "May 2025",
    "credential_id": "v4rq1bLWQO-q2Ymc5WeYfw"
  },
  {
    "title": "DLA Piper - Global Cyber with Data Privacy Job Simulation",
    "issuer": "Forage",
    "issued": "May 2025",
    "credential_id": "jPdQR9hkxZi2xnByu"
  },
  {
    "title": "Foundations of AI and Machine Learning",
    "issuer": "Coursera",
    "issued": "May 2025",
    "credential_id": "6UGSKTVUYF21"
  },
  {
    "title": "Fundamentals of digital marketing",
    "issuer": "Google Digital Garage",
    "issued": "May 2025",
    "credential_id": "385511428"
  },
  {
    "title": "Google AI Essentials",
    "issuer": "Coursera",
    "issued": "May 2025",
    "skills": [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "Prompt Engineering",
      "Emerging Technologies",
      "Generative AI",
      "Data Ethics",
      "Critical Thinking",
      "Strategic Thinking"
    ]
  },
  {
    "title": "Google IT Support",
    "issuer": "Google",
    "issued": "May 2025",
    "credential_id": "L6N954SVI6KW"
  },
  {
    "title": "Introducing Generative AI with AWS",
    "issuer": "Udacity",
    "issued": "May 2025",
    "credential_id": "e443737a-3c52-11f0-b3a3-e7d3d7b94855",
    "skills": [
      "Machine Learning",
      "Prompt Engineering"
    ]
  },
  {
    "title": "MLOps | Machine Learning Operations",
    "issuer": "Duke University",
    "issued": "May 2025",
    "credential_id": "JUBMWZWC9X30",
    "skills": [
      "Microsoft Azure"
    ]
  },
  {
    "title": "Practical Quantum Computing with IBM Qiskit for Beginners",
    "issuer": "Packt",
    "issued": "May 2025",
    "credential_id": "TMC5KZ0ILM1T",
    "skills": [
      "Theoretical Computer Science",
      "Jupyter",
      "Physics",
      "Computer Science",
      "Cryptography"
    ]
  },
  {
    "title": "Prompt Engineering for Everyone (Tool-Agnostic)",
    "issuer": "Udemy",
    "issued": "May 2025",
    "credential_id": "UC-11de9d0e-6396-4463-ad2e-949a4a06d5a9",
    "skills": [
      "Prompt Engineering"
    ]
  },
  {
    "title": "Quantum Algorithms and Cryptography",
    "issuer": "NPTEL",
    "issued": "May 2025",
    "credential_id": "NPTEL25CS61S653704198",
    "skills": [
      "Quantum Computing",
      "Quantum Mechanics",
      "Cryptography",
      "Quantum Algorithms"
    ]
  },
  {
    "title": "Quantum Computing",
    "issuer": "IBM",
    "issued": "May 2025",
    "credential_id": "PLAN-034A5530450D",
    "skills": [
      "Quantum Computing",
      "Quantum Algorithms"
    ]
  },
  {
    "title": "Quantum Computing Fundamentals with Microsoft Azure Quantum",
    "issuer": "Udemy",
    "issued": "May 2025",
    "credential_id": "UC-50225f5e-4aba-4f10-8c57-8ef05a49645e",
    "skills": [
      "Quantum Computing",
      "Microsoft Azure"
    ]
  },
  {
    "title": "TCS iON Career Edge \u2013 Young Professional",
    "issuer": "TCS iON",
    "issued": "May 2025",
    "credential_id": "240640-28283315-1016",
    "skills": [
      "Communication",
      "Presentation Skills",
      "Soft Skills",
      "Resume Writing",
      "Accounting",
      "Artificial Intelligence (AI)",
      "Time Management"
    ]
  },
  {
    "title": "The Complete Quantum Computing Course for Beginners",
    "issuer": "Packt",
    "issued": "May 2025",
    "credential_id": "X75D12MNCYJ1",
    "skills": [
      "Algorithms"
    ]
  },
  {
    "title": "AWS Academy Graduate - AWS Academy Cloud Foundation",
    "issuer": "Amazon Web Services (AWS)",
    "issued": "Apr 2025",
    "credential_id": "https://www.credly.com/badges/dc780f93-7435-46e3-abd1-0d8e554deb9c/print",
    "skills": [
      "AWS Pricing",
      "AWS Architecture",
      "AWS Cloud"
    ]
  },
  {
    "title": "Emotional Intelligence",
    "issuer": "NPTEL",
    "issued": "Apr 2025",
    "skills": [
      "Emotional Intelligence",
      "Self-awareness",
      "Leadership",
      "Decision-Making",
      "Interpersonal Skills"
    ]
  },
  {
    "title": "Introduction to Psychology",
    "issuer": "NPTEL",
    "issued": "Apr 2025",
    "skills": [
      "Cognitive Psychology",
      "Emotional Intelligence",
      "Behavioral Sciences"
    ]
  },
  {
    "title": "BCG - Data Science Job Simulation",
    "issuer": "Forage",
    "issued": "Mar 2025",
    "credential_id": "PbsngJhxSy54qcKnw",
    "skills": [
      "Object-Oriented Programming (OOP)"
    ]
  },
  {
    "title": "City of Moreton Bay - Entrepreneurship and Innovation Job Simulation",
    "issuer": "Forage",
    "issued": "Mar 2025",
    "credential_id": "vJTkXhuaCxqxvrem8"
  },
  {
    "title": "Electronic Arts - Software Engineering Job Simulation",
    "issuer": "Forage",
    "issued": "Mar 2025",
    "credential_id": "FygqshTwePyXZ2LXs"
  },
  {
    "title": "Postman API Fundamentals Student Expert",
    "issuer": "Canvas Credentials (Badgr)",
    "issued": "Mar 2025",
    "credential_id": "67cebd99193b202b45e8ad73"
  },
  {
    "title": "Hewlett Packard Enterprise - Software Engineering Job Simulation",
    "issuer": "Forage",
    "issued": "Dec 2024",
    "credential_id": "Z9oxTFYocRxyg7rtk",
    "skills": [
      "Spring Framework",
      "Java"
    ]
  },
  {
    "title": "Cloud Computing",
    "issuer": "Google Developer Groups",
    "issued": "Dec 2024",
    "skills": [
      "Google Cloud Platform (GCP)",
      "Cloud Computing"
    ]
  },
  {
    "title": "AI/ML for Geodata Analysis",
    "issuer": "Indian Space Research Organisation (ISRO)",
    "issued": "Aug 2024",
    "credential_id": "4UTnw3WaNu",
    "skills": [
      "Machine Learning"
    ]
  },
  {
    "title": "Data Visualisation: Empowering Business with Effective Insights",
    "issuer": "Forage",
    "issued": "Aug 2024",
    "credential_id": "QL5QPegaNqcH6y7Ke"
  },
  {
    "title": "GenAI Job Simulation",
    "issuer": "Forage",
    "issued": "Aug 2024",
    "credential_id": "QL5QPegaNqcH6y7Ke"
  },
  {
    "title": "Getting Started with Artificial Intelligence",
    "issuer": "IBM SkillsBuild",
    "issued": "Aug 2024",
    "credential_id": "https://www.credly.com/badges/8cb38686-2628-46b6-afd2-a579741ccbeb/public_url"
  },
  {
    "title": "Google Cloud Computing Foundations & Generative AI",
    "issuer": "GDSC",
    "issued": "Feb 2024",
    "skills": [
      "Machine Learning"
    ]
  },
  {
    "title": "Software Engineering Virtual Experience Program",
    "issuer": "Forage",
    "issued": "Aug 2023",
    "credential_id": "QL5QPegaNqcH6y7Ke"
  }
];

// Function to render certifications
function renderCertifications() {
  const container = document.querySelector('.certifications-grid');
  if (!container) return;

  certifications.forEach(cert => {
    const card = document.createElement('div');
    card.classList.add('cert-card');

    const title = document.createElement('h3');
    title.className = 'cert-title';
    title.textContent = cert.title || 'No Title';

    const issuer = document.createElement('p');
    issuer.className = 'cert-issuer';
    issuer.textContent = `Issued by: ${cert.issuer || 'Unknown Issuer'}`;

    const issued = document.createElement('p');
    issued.className = 'cert-issued';
    issued.textContent = `Issued: ${cert.issued || 'Unknown Date'}`;

    card.appendChild(title);
    card.appendChild(issuer);
    card.appendChild(issued);

    if (cert.credential_id && cert.credential_id.startsWith('http')) {
      const link = document.createElement('a');
      link.href = cert.credential_id;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'cert-link';
      link.textContent = 'View Credential';
      card.appendChild(link);
    }

    if (cert.skills && cert.skills.length > 0) {
      const skills = document.createElement('p');
      skills.className = 'cert-skills';
      skills.textContent = 'Skills: ' + cert.skills.join(', ');
      card.appendChild(skills);
    }

    container.appendChild(card);
  });
}

// Call the function after DOM is ready
document.addEventListener('DOMContentLoaded', renderCertifications);

// Initialize mobile menu
initMobileMenu();

