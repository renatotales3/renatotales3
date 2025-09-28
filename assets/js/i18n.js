// ===================================
// Internationalization System
// ===================================

const translations = {
    'pt-BR': {
        site: {
            title: 'Renato Tales - Desenvolvedor Full-Stack'
        },
        loading: {
            text: 'Carregando'
        },
        accessibility: {
            skip: 'Pular para o conteúdo principal'
        },
        nav: {
            home: 'Início',
            about: 'Sobre',
            skills: 'Skills',
            experience: 'Experiência',
            projects: 'Projetos',
            contact: 'Contato'
        },
        hero: {
            greeting: 'Olá, eu sou',
            subtitle: 'Desenvolvedor',
            description: 'Desenvolvedor Full-Stack apaixonado por criar soluções digitais inovadoras. Especializado em React, Node.js e Java, sempre em busca de novos desafios.',
            status: {
                available: 'Disponível para projetos',
                busy: 'Em reunião',
                working: 'Trabalhando em projeto'
            },
            social: {
                linkedin: 'Conectar no LinkedIn',
                github: 'Ver repositórios no GitHub', 
                email: 'Enviar email'
            }
        },
        about: {
            title: 'Sobre Mim'
        },
        skills: {
            title: 'Habilidades'
        },
        experience: {
            title: 'Experiência'
        },
        projects: {
            title: 'Projetos'
        },
        contact: {
            title: 'Contato'
        },
        footer: {
            rights: 'Todos os direitos reservados.'
        }
    },
    'en': {
        site: {
            title: 'Renato Tales - Full-Stack Developer'
        },
        loading: {
            text: 'Loading'
        },
        accessibility: {
            skip: 'Skip to main content'
        },
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            experience: 'Experience',
            projects: 'Projects',
            contact: 'Contact'
        },
        hero: {
            greeting: 'Hello, I am',
            subtitle: 'Developer',
            description: 'Full-Stack Developer passionate about creating innovative digital solutions. Specialized in React, Node.js and Java, always looking for new challenges.',
            status: {
                available: 'Available for projects',
                busy: 'In meeting',
                working: 'Working on project'
            },
            social: {
                linkedin: 'Connect on LinkedIn',
                github: 'View repositories on GitHub',
                email: 'Send email'
            }
        },
        about: {
            title: 'About Me'
        },
        skills: {
            title: 'Skills'
        },
        experience: {
            title: 'Experience'
        },
        projects: {
            title: 'Projects'
        },
        contact: {
            title: 'Contact'
        },
        footer: {
            rights: 'All rights reserved.'
        }
    }
};

class I18nManager {
    constructor() {
        this.currentLang = this.getInitialLanguage();
        this.langToggle = document.getElementById('lang-toggle');
        this.storageKey = 'portfolio-lang';
        this.typingStrings = {
            'pt-BR': ['Full-Stack', 'Frontend', 'Backend', 'React', 'Node.js', 'Java'],
            'en': ['Full-Stack', 'Frontend', 'Backend', 'React', 'Node.js', 'Java']
        };
        
        this.init();
    }
    
    init() {
        this.setLanguage(this.currentLang);
        this.addEventListeners();
        this.updateLangToggleText();
    }
    
    getInitialLanguage() {
        const savedLang = localStorage.getItem(this.storageKey);
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
        
        // Detect browser language
        const browserLang = navigator.language || navigator.languages[0];
        if (browserLang.startsWith('pt')) {
            return 'pt-BR';
        }
        
        return 'en'; // Default to English
    }
    
    setLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language '${lang}' not supported`);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem(this.storageKey, lang);
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang === 'pt-BR' ? 'pt-BR' : 'en');
        
        // Update page title
        document.title = this.t('site.title');
        
        // Update all elements with data-i18n attribute
        this.updateElements();
        
        // Update lang toggle button
        this.updateLangToggleText();
        
        // Restart typing animation with new language
        this.restartTypingAnimation();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    }
    
    t(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        
        return value || key;
    }
    
    updateElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translation);
            } else {
                element.textContent = translation;
            }
        });
        
        // Update tooltip attributes
        const tooltipElements = document.querySelectorAll('[data-i18n-tooltip]');
        tooltipElements.forEach(element => {
            const key = element.getAttribute('data-i18n-tooltip');
            const translation = this.t(key);
            element.setAttribute('aria-label', translation);
            element.setAttribute('title', translation);
        });
    }
    
    updateLangToggleText() {
        if (this.langToggle) {
            const langText = this.langToggle.querySelector('.lang-text');
            if (langText) {
                langText.textContent = this.currentLang === 'pt-BR' ? 'PT' : 'EN';
            }
        }
    }
    
    toggleLanguage() {
        const newLang = this.currentLang === 'pt-BR' ? 'en' : 'pt-BR';
        this.setLanguage(newLang);
    }
    
    restartTypingAnimation() {
        // This will be called by main.js when it's loaded
        if (window.typingAnimation) {
            window.typingAnimation.restart();
        }
    }
    
    addEventListeners() {
        // Language toggle button
        this.langToggle?.addEventListener('click', () => {
            this.toggleLanguage();
        });
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + L)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.toggleLanguage();
            }
        });
    }
    
    getTypingStrings() {
        return this.typingStrings[this.currentLang] || this.typingStrings['en'];
    }
}

// Initialize i18n manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18nManager = new I18nManager();
    });
} else {
    window.i18nManager = new I18nManager();
}