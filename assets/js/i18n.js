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
            title: 'Sobre Mim',
            subtitle: 'Desenvolvedor Full-Stack apaixonado por tecnologia',
            paragraph1: 'Sou um desenvolvedor Full-Stack apaixonado por criar soluções digitais que fazem a diferença. Minha jornada na programação começou em 2024, quando me dediquei ao frontend, design com Figma e Python.',
            paragraph2: 'Ao longo do meu aprendizado, expandi meus conhecimentos para o ecossistema completo: React, Node.js, Java, bancos de dados e outras tecnologias. Acredito que o desenvolvimento é um processo contínuo de evolução.',
            paragraph3: 'Busco sempre desenvolver soluções que geram resultados reais. Criei um sistema de automação com n8n que reduziu em 80% o tempo de execução de processos de vendas, desde o primeiro contato até o agendamento com consultores.',
            paragraph4: 'Atualmente trabalho no Core, meu projeto pessoal: um app completo de finanças em React Native para Android e iOS. O lema é "No centro das suas finanças" - uma solução que visa simplificar a gestão financeira pessoal.',
            timeline: {
                '2024': {
                    title: 'Início na Programação',
                    description: 'Frontend, Figma, Python'
                },
                '2025a': {
                    title: 'Desenvolvedor Full-Stack',
                    description: 'React, Node.js, Java'
                },
                '2025b': {
                    title: 'Banco de Dados & Backend',
                    description: 'SQL, NoSQL, APIs RESTful'
                },
                '2025c': {
                    title: 'Automação de Vendas',
                    description: 'Sistema n8n (-80% tempo)'
                },
                '2025d': {
                    title: 'App Core',
                    description: 'React Native (Android/iOS)'
                }
            },
            stats: {
                stat1: {
                    number: '1+',
                    suffix: 'Ano',
                    label: 'Experiência em Desenvolvimento',
                    detail: 'Frontend, Backend e Mobile'
                },
                stat2: {
                    number: '80',
                    suffix: '%',
                    label: 'Redução Automação de Processos',
                    detail: 'Tempo de vendas otimizado'
                },
                stat3: {
                    number: '2',
                    suffix: '',
                    label: 'Plataformas Desenvolvimento Mobile',
                    detail: 'Android e iOS nativo'
                }
            },
            project: {
                slogan: 'No centro das suas finanças',
                status: 'Em desenvolvimento'
            },
            cta: {
                projects: 'Ver Meus Projetos',
                resume: 'Baixar Currículo'
            }
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
            title: 'About Me',
            subtitle: 'Full-Stack Developer passionate about technology',
            paragraph1: 'I am a Full-Stack developer passionate about creating digital solutions that make a difference. My programming journey began in 2024, when I dedicated myself to frontend, Figma design and Python.',
            paragraph2: 'Throughout my learning, I expanded my knowledge to the complete ecosystem: React, Node.js, Java, databases and other technologies. I believe that development is a continuous process of evolution.',
            paragraph3: 'I always seek to develop solutions that generate real results. I created an automation system with n8n that reduced sales process execution time by 80%, from first contact to scheduling with consultants.',
            paragraph4: 'I am currently working on Core, my personal project: a complete finance app in React Native for Android and iOS. The motto is "At the center of your finances" - a solution that aims to simplify personal financial management.',
            timeline: {
                '2024': {
                    title: 'Started Programming',
                    description: 'Frontend, Figma, Python'
                },
                '2025a': {
                    title: 'Full-Stack Developer',
                    description: 'React, Node.js, Java'
                },
                '2025b': {
                    title: 'Database & Backend',
                    description: 'SQL, NoSQL, RESTful APIs'
                },
                '2025c': {
                    title: 'Sales Automation',
                    description: 'n8n System (-80% time)'
                },
                '2025d': {
                    title: 'Core App',
                    description: 'React Native (Android/iOS)'
                }
            },
            stats: {
                stat1: {
                    number: '1+',
                    suffix: 'Year',
                    label: 'Development Experience',
                    detail: 'Frontend, Backend and Mobile'
                },
                stat2: {
                    number: '80',
                    suffix: '%',
                    label: 'Process Automation Reduction',
                    detail: 'Optimized sales time'
                },
                stat3: {
                    number: '2',
                    suffix: '',
                    label: 'Mobile Development Platforms',
                    detail: 'Native Android and iOS'
                }
            },
            project: {
                slogan: 'At the center of your finances',
                status: 'In development'
            },
            cta: {
                projects: 'See My Projects',
                resume: 'Download Resume'
            }
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
        
        // Update resume download links based on language
        this.updateResumeLinks();
        
        // Update stats content
        this.updateStats();
    }
    
    updateStats() {
        const stats = this.t('about.stats');
        
        // Update each stat item
        Object.keys(stats).forEach((statKey, index) => {
            const statData = stats[statKey];
            const statIndex = index + 1;
            
            // Update stat number and suffix
            const numberElement = document.querySelector(`[data-stat="${statIndex}"] .stat-number`);
            const suffixElement = document.querySelector(`[data-stat="${statIndex}"] .stat-suffix`);
            const labelElement = document.querySelector(`[data-stat="${statIndex}"] .stat-label`);
            const detailElement = document.querySelector(`[data-stat="${statIndex}"] .stat-detail`);
            
            if (numberElement) {
                numberElement.textContent = statData.number;
                numberElement.setAttribute('data-target', statData.number.replace(/\D/g, ''));
            }
            if (suffixElement) {
                suffixElement.textContent = statData.suffix;
            }
            if (labelElement) {
                labelElement.textContent = statData.label;
            }
            if (detailElement) {
                detailElement.textContent = statData.detail;
            }
        });
    }
    
    updateResumeLinks() {
        const resumeBtn = document.querySelector('.about-resume-btn');
        if (resumeBtn) {
            if (this.currentLang === 'pt-BR') {
                resumeBtn.href = '/resume/curriculo_renato_tales.pdf';
            } else {
                resumeBtn.href = '/resume/resume_renato_tales.pdf';
            }
        }
        
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
        
        // Add click animation
        if (this.langToggle) {
            this.langToggle.style.transform = 'translateY(-1px) scale(0.95)';
            setTimeout(() => {
                this.langToggle.style.transform = '';
            }, 150);
        }
        
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