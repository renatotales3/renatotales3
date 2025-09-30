// Global Particles System
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        particleCount: {
            desktop: 30,
            tablet: 20,
            mobile: 12
        },
        activationDelay: 300
    };
    
    // Get particle count based on screen size
    function getParticleCount() {
        const width = window.innerWidth;
        if (width < 768) return CONFIG.particleCount.mobile;
        if (width < 1024) return CONFIG.particleCount.tablet;
        return CONFIG.particleCount.desktop;
    }
    
    // Create particle element with better distribution
    function createParticle(index, totalCount) {
        const particle = document.createElement('div');
        particle.className = 'global-particle';
        
        // Better distribution - divide screen into regions
        const region = index % 4; // 4 quadrants
        let baseX, baseY;
        
        switch(region) {
            case 0: // Top-left
                baseX = Math.random() * 50;
                baseY = Math.random() * 50;
                break;
            case 1: // Top-right
                baseX = 50 + Math.random() * 50;
                baseY = Math.random() * 50;
                break;
            case 2: // Bottom-left
                baseX = Math.random() * 50;
                baseY = 50 + Math.random() * 50;
                break;
            case 3: // Bottom-right
                baseX = 50 + Math.random() * 50;
                baseY = 50 + Math.random() * 50;
                break;
        }
        
        // Add some randomness to prevent grid-like appearance
        const randomOffsetX = (Math.random() - 0.5) * 20;
        const randomOffsetY = (Math.random() - 0.5) * 20;
        
        particle.style.left = `${Math.max(0, Math.min(100, baseX + randomOffsetX))}%`;
        particle.style.top = `${Math.max(0, Math.min(100, baseY + randomOffsetY))}%`;
        
        // Stagger animation start times for more natural effect
        const randomDelay = (index / totalCount) * 20;
        particle.style.animationDelay = `-${randomDelay}s`;
        
        return particle;
    }
    
    // Initialize particles
    function initGlobalParticles() {
        // Check if container already exists
        let container = document.querySelector('.global-particles');
        
        if (!container) {
            // Create container
            container = document.createElement('div');
            container.className = 'global-particles';
            document.body.insertBefore(container, document.body.firstChild);
        }
        
        // Clear existing particles
        container.innerHTML = '';
        
        // Generate particles with improved distribution
        const count = getParticleCount();
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < count; i++) {
            fragment.appendChild(createParticle(i, count));
        }
        
        container.appendChild(fragment);
        
        // Activate particles after delay
        setTimeout(() => {
            container.classList.add('active');
        }, CONFIG.activationDelay);
        
        console.log(`✨ Global particles initialized: ${count} particles`);
    }
    
    // Reinitialize on resize (debounced)
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const container = document.querySelector('.global-particles');
            if (container) {
                const currentCount = container.querySelectorAll('.global-particle').length;
                const newCount = getParticleCount();
                
                // Only reinitialize if count changed significantly
                if (Math.abs(currentCount - newCount) > 3) {
                    initGlobalParticles();
                }
            }
        }, 500);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalParticles);
    } else {
        initGlobalParticles();
    }
    
    // Handle resize
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Expose global function for manual reinitialization if needed
    window.reinitGlobalParticles = initGlobalParticles;
    
})();
