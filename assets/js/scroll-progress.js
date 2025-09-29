// Enhanced Scroll Progress Implementation
(function() {
    let ticking = false;
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const progressBar = document.getElementById('scroll-progress');
        
        if (!progressBar) {
            console.warn('Progress bar element not found');
            return;
        }
        
        // Smooth scroll progress update with RAF
        function updateScrollProgress() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    
                    if (scrollHeight <= 0) {
                        progressBar.classList.remove('show');
                        progressBar.style.transform = 'scaleX(0)';
                        progressBar.style.opacity = '0';
                        ticking = false;
                        return;
                    }
                    
                    const scrolled = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
                    
                    // Smooth show/hide with threshold
                    if (scrollTop < 80) {
                        progressBar.classList.remove('show');
                        progressBar.style.opacity = '0';
                        progressBar.style.transform = 'scaleX(0)';
                    } else {
                        progressBar.classList.add('show');
                        progressBar.style.opacity = '1';
                        // Smooth scale transition
                        progressBar.style.transform = `scaleX(${scrolled})`;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Throttled scroll listener
        let scrollTimeout;
        function handleScroll() {
            clearTimeout(scrollTimeout);
            updateScrollProgress();
            
            // Add smooth class during scroll
            progressBar.classList.add('scrolling');
            
            scrollTimeout = setTimeout(() => {
                progressBar.classList.remove('scrolling');
            }, 150);
        }
        
        // Update on scroll with passive listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Update on resize to recalculate
        window.addEventListener('resize', updateScrollProgress, { passive: true });
        
        // Initial update
        setTimeout(updateScrollProgress, 100);
        
        console.log('Enhanced scroll progress initialized');
    });
})();