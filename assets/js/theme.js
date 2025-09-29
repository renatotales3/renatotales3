// ===================================
// Theme Management System
// ===================================

class ThemeManager {
    constructor() {
        this.root = document.documentElement;
        this.themeToggle = document.getElementById('theme-toggle');
        this.storageKey = 'portfolio-theme';
        
        this.init();
    }
    
    init() {
        // Get initial theme
        const savedTheme = this.getSavedTheme();
        const systemTheme = this.getSystemTheme();
        const initialTheme = savedTheme || systemTheme;
        
        // Set initial theme
        this.setTheme(initialTheme);
        
        // Add event listeners
        this.addEventListeners();
    }
    
    getSavedTheme() {
        return localStorage.getItem(this.storageKey);
    }
    
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    setTheme(theme) {
        this.root.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }
    
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        
        const color = theme === 'dark' ? '#0a0a0a' : '#ffffff';
        metaThemeColor.setAttribute('content', color);
    }
    
    toggleTheme() {
        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add click animation
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'translateY(-1px) scale(0.95)';
            setTimeout(() => {
                this.themeToggle.style.transform = '';
            }, 150);
        }
        
        this.setTheme(newTheme);
    }
    
    addEventListeners() {
        // Theme toggle button
        this.themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getSavedTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}