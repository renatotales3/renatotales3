// Simple Scroll Progress Implementation
(function() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const progressBar = document.getElementById('scroll-progress');
        
        if (!progressBar) {
            console.log('Progress bar element not found');
            return;
        }
        
        console.log('Progress bar found, initializing...');
        
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (scrollHeight <= 0) {
                progressBar.classList.remove('show');
                progressBar.style.transform = 'scaleX(0)';
                progressBar.style.opacity = '0';
                return;
            }
            
            const scrolled = Math.min(scrollTop / scrollHeight, 1);
            
            // Hide progress bar when at top (first 100px)
            if (scrollTop < 100) {
                progressBar.classList.remove('show');
                progressBar.style.opacity = '0';
                progressBar.style.transform = 'scaleX(0)';
                progressBar.classList.remove('active');
            } else {
                progressBar.classList.add('show');
                progressBar.style.opacity = '1';
                progressBar.style.transform = `scaleX(${scrolled})`;
                
                // Add active class when scrolling
                if (scrolled > 0.05) {
                    progressBar.classList.add('active');
                } else {
                    progressBar.classList.remove('active');
                }
            }
        }
        
        // Update on scroll
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        
        // Initial update
        updateScrollProgress();
        
        console.log('Scroll progress initialized');
    });
})();