// ===================================
// Main Application JavaScript
// ===================================

class PortfolioApp {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('nav-mobile');
        this.loadingScreen = document.getElementById('loading-screen');
        this.typingElement = document.getElementById('typing-text');
        
        this.init();
    }
    
    async init() {
        // Wait for other managers to initialize
        await this.waitForManagers();
        
        // Initialize components
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initActiveNavLinks();
        this.initParticleSystem();
        this.initFocusManagement();
        
        // Hide loading screen
        this.hideLoadingScreen();
    }
    
    async waitForManagers() {
        // Wait for theme and i18n managers to be available
        let attempts = 0;
        const maxAttempts = 100;
        
        while ((!window.themeManager || !window.i18nManager) && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 10));
            attempts++;
        }
    }
    
    // ===================================
    // Loading Screen
    // ===================================
    
    hideLoadingScreen() {
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    this.loadingScreen.remove();
                }, 500);
            }
        }, 1000);
    }
    
    // ===================================
    // Mobile Menu
    // ===================================
    
    initMobileMenu() {
        if (!this.mobileMenuToggle || !this.mobileMenu) return;
        
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = this.mobileMenu.querySelectorAll('.nav-mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenuToggle.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('open')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        const isOpen = this.mobileMenu.classList.contains('open');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.mobileMenu.classList.add('open');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.mobileMenu.classList.remove('open');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // ===================================
    // Smooth Scrolling
    // ===================================
    
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===================================
    // Typing Animation
    // ===================================
    
    initTypingAnimation() {
        if (!this.typingElement) return;
        
        this.typingAnimation = new TypingAnimation(this.typingElement);
        window.typingAnimation = this.typingAnimation; // Make it globally accessible
    }
    
    // ===================================
    // Scroll Animations
    // ===================================
    
    initScrollAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero content
        gsap.fromTo('.hero-text > *', {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        // Animate hero image
        gsap.fromTo('.hero-visual', {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        // Animate sections on scroll
        const sections = document.querySelectorAll('.section:not(.hero)');
        sections.forEach(section => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ===================================
    // Active Navigation Links
    // ===================================
    
    initActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current links
                    const activeLinks = document.querySelectorAll(`a[href="#${id}"]`);
                    activeLinks.forEach(link => link.classList.add('active'));
                }
            });
        }, {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0.1
        });
        
        sections.forEach(section => observer.observe(section));
    }

    // ===================================
    // Particle System
    // ===================================
    
    initParticleSystem() {
        const particleContainer = document.getElementById('particle-container');
        if (!particleContainer) return;
        
        // Create particles
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            particleContainer.appendChild(particle);
        }
        
        // Activate particle system
        setTimeout(() => {
            particleContainer.classList.add('active');
        }, 1000);
    }

    // ===================================
    // Focus Management
    // ===================================
    
    initFocusManagement() {
        // Track mouse vs keyboard usage
        document.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
        
        // Remove tap highlight on touch devices
        document.addEventListener('touchstart', () => {
            document.body.classList.add('using-touch');
        });
        
        // Handle click events to prevent unwanted selection
        document.addEventListener('mousedown', (e) => {
            // Allow text selection for input elements and text content
            const allowSelection = e.target.matches('input, textarea, [contenteditable="true"]');
            const isTextContent = e.target.matches('p, h1, h2, h3, h4, h5, h6, span, div');
            
            if (!allowSelection && !isTextContent) {
                e.preventDefault();
            }
        });
        
        // Handle focus for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select, [tabindex]'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('focus', (e) => {
                if (!document.body.classList.contains('using-mouse')) {
                    e.target.setAttribute('data-focus-visible', 'true');
                }
            });
            
            element.addEventListener('blur', (e) => {
                e.target.removeAttribute('data-focus-visible');
            });
        });
    }
}

// ===================================
// Typing Animation Class
// ===================================

class TypingAnimation {
    constructor(element) {
        this.element = element;
        this.strings = [];
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 150; // Aumentado de 100 para 150ms
        this.deleteSpeed = 75; // Aumentado de 50 para 75ms
        this.pauseDelay = 3000; // Aumentado de 2000 para 3000ms
        this.isAnimating = false;
        
        this.updateStrings();
        this.start();
    }
    
    updateStrings() {
        if (window.i18nManager) {
            this.strings = window.i18nManager.getTypingStrings();
        } else {
            this.strings = ['Full-Stack', 'Frontend', 'Backend', 'React', 'Node.js', 'Java'];
        }
    }
    
    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.type();
    }
    
    stop() {
        this.isAnimating = false;
    }
    
    restart() {
        this.stop();
        this.updateStrings();
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        setTimeout(() => this.start(), 100);
    }
    
    type() {
        if (!this.isAnimating) return;
        
        const currentString = this.strings[this.currentStringIndex];
        
        if (this.isDeleting) {
            // Delete character
            this.currentCharIndex--;
            this.element.textContent = currentString.substring(0, this.currentCharIndex);
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
                setTimeout(() => this.type(), 200);
                return;
            }
            
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Type character
            this.currentCharIndex++;
            this.element.textContent = currentString.substring(0, this.currentCharIndex);
            
            if (this.currentCharIndex === currentString.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseDelay);
                return;
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        }
    }
}

// ===================================
// Utility Functions
// ===================================

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
    };
}

// ===================================
// Initialize Application
// ===================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioApp = new PortfolioApp();
    });
} else {
    window.portfolioApp = new PortfolioApp();
}

// ===================================
// Global Event Listeners
// ===================================

// Handle resize
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Handle language change for typing animation
window.addEventListener('languagechange', () => {
    if (window.typingAnimation) {
        window.typingAnimation.restart();
    }
});