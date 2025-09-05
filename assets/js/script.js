// Grace Academy Website JavaScript - Social Media Style
document.addEventListener('DOMContentLoaded', function() {
    
    // Set default theme to light mode
    const savedTheme = localStorage.getItem('grace-academy-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle functionality
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('grace-academy-theme', newTheme);
        
        // Update theme toggle button if it exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Add theme toggle button to navigation
    function addThemeToggle() {
        const navActions = document.querySelector('.mobile-nav-actions');
        if (navActions && !document.getElementById('theme-toggle')) {
            const themeToggle = document.createElement('button');
            themeToggle.id = 'theme-toggle';
            themeToggle.className = 'text-turquoise hover:text-turquoise-dark font-medium transition-colors tap-target mr-3';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.onclick = toggleTheme;
            
            navActions.insertBefore(themeToggle, navActions.firstChild);
        }
    }
    
    addThemeToggle();

    // Testimonial Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const track = document.querySelector('.testimonial-track');
    
    function showSlide(index) {
        if (track && slides.length > 0) {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-grace-blue');
                } else {
                    dot.classList.remove('bg-grace-blue');
                    dot.classList.add('bg-gray-300');
                }
            });
        }
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-slide testimonials
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start auto-slide
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number
                if (target % 1 !== 0) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters when they come into view
                if (entry.target.classList.contains('counter')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
                
                // Add animation classes
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.counter, .testimonial-slide, .bg-gradient-to-br');
    animateElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form handling
    const courseFinderForm = document.querySelector('#course-finder form');
    if (courseFinderForm) {
        courseFinderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const zipCode = formData.get('zip_code') || this.querySelector('input[type="text"]').value;
            const programType = formData.get('program_type') || 'Dental Assistant';
            const radius = formData.get('radius') || '100';
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Searching...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Searching for ${programType} courses within ${radius} miles of ${zipCode}. This would normally redirect to course results.`);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add navbar transition
    if (navbar) {
        navbar.style.transition = 'transform 0.3s ease-in-out';
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.bg-gradient-to-br');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.animate-fade-in');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Initialize tooltips for social media icons
    const socialIcons = document.querySelectorAll('.nav_social, footer a[href*="facebook"], footer a[href*="instagram"], footer a[href*="linkedin"], footer a[href*="twitter"]');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.bg-gradient-to-br');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Video CTA click handler
    const videoCTA = document.querySelector('.group.cursor-pointer');
    if (videoCTA) {
        videoCTA.addEventListener('click', function() {
            // This would normally open a video modal or redirect to YouTube
            alert('This would open a video showcasing Grace Academy success stories!');
        });
    }

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Console welcome message
    console.log('%c🎓 Welcome to Grace Academy! 🎓', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cEmpowering students to achieve their dreams through quality dental assistant education.', 'color: #764ba2; font-size: 14px;');
});

// Navigation functions (similar to PeThoria Match)
function goToSignup() {
    // For now, redirect to a course search or application page
    alert('Course search functionality coming soon! Please call (866) 706-6363 to find a course near you.');
}

function goToLogin() {
    // For now, redirect to student portal or show login info
    alert('Student login portal coming soon! Please call (866) 706-6363 for assistance.');
}

function goToFoundation() {
    window.location.href = 'programs.html';
}

function goToMatching() {
    // Check if user is already logged in
    if (localStorage.getItem('grace-token')) {
        // Already logged in, go to dashboard first
        window.location.href = 'dashboard.html';
    } else {
        // Not logged in, store intended destination and go to login
        localStorage.setItem('redirectAfterLogin', 'dashboard.html');
        window.location.href = 'login.html';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed header
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

    // Mobile hamburger menu functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenuOverlay && mobileMenu) {
            // Open mobile menu
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden';
            });
            
            // Close mobile menu
            function closeMobileMenu() {
                mobileMenu.classList.add('translate-x-full');
                setTimeout(() => {
                    mobileMenuOverlay.classList.add('hidden');
                }, 300);
                document.body.style.overflow = 'auto';
            }
            
            mobileMenuClose.addEventListener('click', closeMobileMenu);
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenu();
                }
            });
            
            // Close menu when clicking on navigation links
            document.querySelectorAll('#mobile-menu nav a').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

// Utility functions
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
