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
        
        // Create loading particles first
        this.createLoadingParticles();
        
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
        if (!this.loadingScreen) return;
        
        // Simple delay then hide
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            
            // Restore body scroll immediately when loading screen starts fading
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            // Remove from DOM after animation
            setTimeout(() => {
                this.loadingScreen.remove();
            }, 500);
        }, 1500);
    }
    
    createLoadingParticles() {
        const particleContainer = document.getElementById('loading-particles');
        if (!particleContainer) {
            console.log('Loading particles container not found');
            return;
        }
        
        console.log('Creating loading particles...');
        
        // Create particles similar to hero section
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'loading-particle';
            
            // Random size
            const size = Math.random() * 3 + 2; // 2-5px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            const loadDur = (Math.random() * 6) + 6; // 6s - 12s
            particle.style.animationDuration = loadDur + 's';
            particle.style.animationTimingFunction = 'cubic-bezier(0.4,0.0,0.2,1)';
            
            particleContainer.appendChild(particle);
        }
        
        // Activate particles immediately
        setTimeout(() => {
            particleContainer.classList.add('active');
            const particles = particleContainer.querySelectorAll('.loading-particle');
            particles.forEach(particle => {
                particle.classList.add('active');
            });
            console.log(`Activated ${particles.length} loading particles`);
        }, 100);
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
        
        // Animate menu links with cascade effect
        const links = this.mobileMenu.querySelectorAll('.nav-mobile-link');
        gsap.fromTo(links, {
            opacity: 0,
            x: -30
        }, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
        });
    }
    
    closeMobileMenu() {
        // Animate menu links out
        const links = this.mobileMenu.querySelectorAll('.nav-mobile-link');
        gsap.to(links, {
            opacity: 0,
            x: -20,
            duration: 0.2,
            stagger: 0.02,
            ease: 'power2.in',
            onComplete: () => {
                this.mobileMenu.classList.remove('open');
                this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===================================
    // Smooth Scrolling
    // ===================================
    
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href.length <= 1) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Immediately update active state for instant feedback
                    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
                    const targetId = target.id;
                    
                    // Remove active from all links
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Add active to clicked links immediately
                    const clickedLinks = document.querySelectorAll(`a[href="#${targetId}"]`);
                    clickedLinks.forEach(navLink => navLink.classList.add('active'));
                    
                    // Pause scroll progress during navigation
                    const progressBar = document.getElementById('scroll-progress');
                    if (progressBar) {
                        progressBar.style.pointerEvents = 'none';
                    }
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20; // Extra offset
                    
                    // Smooth scroll with callback
                    this.smoothScrollTo(targetPosition, () => {
                        // Re-enable scroll progress
                        if (progressBar) {
                            setTimeout(() => {
                                progressBar.style.pointerEvents = '';
                            }, 100);
                        }
                    });
                }
            });
        });
    }
    
    smoothScrollTo(target, callback) {
        const startPosition = window.pageYOffset;
        const distance = target - startPosition;
        
        // Otimized duration - much faster and more responsive
        const baseDuration = 400; // Base duration reduced from max 800 to 400
        const maxDuration = 600; // Maximum duration reduced
        const minDuration = 250; // Minimum duration for very short distances
        
        // Calculate duration based on distance but with better limits
        let duration = Math.abs(distance) * 0.3; // Reduced multiplier from 0.5 to 0.3
        duration = Math.max(minDuration, Math.min(duration, maxDuration));
        
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Improved easing function - more responsive and snappy
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else if (callback) {
                callback();
            }
        }
        
        requestAnimationFrame(animation);
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
        
        // Create cinematic entrance timeline
        const heroTimeline = gsap.timeline({ delay: 0.5 });
        
        // 1. Animate hero image first (focal point)
        heroTimeline.fromTo('.hero-visual', {
            opacity: 0,
            scale: 0.8,
            rotation: -5
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'back.out(1.7)'
        });
        
        // 2. Animate title with split reveal
        heroTimeline.fromTo('.hero-title', {
            opacity: 0,
            y: 50,
            skewY: 3
        }, {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.8');
        
        // 3. Animate subtitle and typing text
        heroTimeline.fromTo('.hero-subtitle', {
            opacity: 0,
            x: -30
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4');
        
        // 4. Animate description with fade up
        heroTimeline.fromTo('.hero-description', {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3');
        
        // 5. Animate status and actions
        heroTimeline.fromTo(['.hero-status', '.hero-actions'], {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');
        
        // About Section Animations
        this.initAboutAnimations();
        
        // Animate sections on scroll with better triggers
        const sections = document.querySelectorAll('.section:not(.hero):not(.about)');
        sections.forEach((section, index) => {
            // Only animate if section is not already visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                        gsap.fromTo(entry.target, {
                            opacity: 0,
                            y: 60
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                            delay: index * 0.1
                        });
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '-10% 0px -10% 0px',
                threshold: 0.1
            });
            
            observer.observe(section);
        });
    }
    
    // ===================================
    // About Section Animations
    // ===================================
    
    initAboutAnimations() {
        // About section entrance animation
        gsap.fromTo('.about-text', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Timeline items animation
        gsap.fromTo('.timeline-item', {
            opacity: 0,
            x: -30
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.about-timeline',
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Stats counter animation
        gsap.fromTo('.stat-item', {
            opacity: 0,
            y: 30,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                onEnter: () => this.animateStatNumbers()
            }
        });
        
        // Project highlight animation
        gsap.fromTo('.about-project', {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about-project',
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    // Animate stat numbers with counter effect
    animateStatNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateNumber();
        });
    }
    
    // ===================================
    // Active Navigation Links
    // ===================================
    
    initActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
        let activeSection = '';
        let isScrolling = false;
        
        // Debounced scroll handler to prevent flickering
        const updateActiveLink = debounce(() => {
            const scrollPosition = window.scrollY + 120; // Offset for header
            let newActiveSection = '';
            
            // Find current section with better logic
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;
                
                // Check if we're in this section
                if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 50) {
                    newActiveSection = section.id;
                }
                
                // Handle edge case for last section
                if (index === sections.length - 1 && scrollPosition >= sectionTop - 100) {
                    newActiveSection = section.id;
                }
            });
            
            // Update active links only if section actually changed
            if (newActiveSection && newActiveSection !== activeSection) {
                activeSection = newActiveSection;
                
                // Immediate update without delay to prevent flickering
                navLinks.forEach(link => link.classList.remove('active'));
                
                const activeLinks = document.querySelectorAll(`a[href="#${newActiveSection}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
            }
            
            isScrolling = false;
        }, 10); // Reduced debounce for more responsive updates
        
        // Track scrolling state
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 100);
            
            updateActiveLink();
        });
        
        // Intersection Observer as fallback for precision
        const observer = new IntersectionObserver((entries) => {
            // Only process if not actively scrolling to prevent conflicts
            if (isScrolling) return;
            
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.id;
                    
                    if (id !== activeSection) {
                        activeSection = id;
                        
                        navLinks.forEach(link => link.classList.remove('active'));
                        
                        const activeLinks = document.querySelectorAll(`a[href="#${id}"]`);
                        activeLinks.forEach(link => link.classList.add('active'));
                    }
                }
            });
        }, {
            rootMargin: '-15% 0px -15% 0px',
            threshold: [0.3, 0.5, 0.7]
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
            // Random vertical start within viewport so movement is visible
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            // Ensure varied durations and optional reverse direction
            const duration = (Math.random() * 15) + 8; // 8s - 23s
            particle.style.animationDuration = duration + 's';
            particle.style.animationTimingFunction = 'linear';
            if (Math.random() > 0.5) particle.style.animationDirection = 'reverse';
            // Add a small horizontal offset for the CSS animation to animate from
            particle.dataset.hOffset = (Math.random() * 100 - 50).toFixed(2);
            
            particleContainer.appendChild(particle);
        }
        
        // Activate particle system
        setTimeout(() => {
            particleContainer.classList.add('active');
        }, 1000);

        // Initialize About section particles (usando as mesmas partículas do Hero)
        this.initAboutParticles();
    }

    initAboutParticles() {
        const aboutParticleContainer = document.getElementById('about-particle-container');
        if (!aboutParticleContainer) return;
        
        // Create particles for About section usando as mesmas classes do Hero
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle'; // Mesma classe do Hero
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            const duration = (Math.random() * 15) + 8;
            particle.style.animationDuration = duration + 's';
            particle.style.animationTimingFunction = 'linear';
            if (Math.random() > 0.5) particle.style.animationDirection = 'reverse';
            particle.dataset.hOffset = (Math.random() * 100 - 50).toFixed(2);
            
            aboutParticleContainer.appendChild(particle);
        }

        // Activate About particle system
        setTimeout(() => {
            aboutParticleContainer.classList.add('active');
        }, 1200);
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
        this.timeoutId = null; // Track timeout for proper cleanup
        
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
        
        // Clear any pending timeouts
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    
    restart() {
        this.stop();
        this.updateStrings();
        
        // Reset all animation state
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        // Reset speeds to original values
        this.typeSpeed = 150;
        this.deleteSpeed = 75;
        this.pauseDelay = 3000;
        
        // Clear any existing content
        if (this.element) {
            this.element.textContent = '';
        }
        
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
                this.timeoutId = setTimeout(() => this.type(), 200);
                return;
            }
            
            this.timeoutId = setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Type character
            this.currentCharIndex++;
            this.element.textContent = currentString.substring(0, this.currentCharIndex);
            
            if (this.currentCharIndex === currentString.length) {
                this.isDeleting = true;
                this.timeoutId = setTimeout(() => this.type(), this.pauseDelay);
                return;
            }
            
            this.timeoutId = setTimeout(() => this.type(), this.typeSpeed);
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