// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 70px pour compenser la hauteur du header fixe
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    // Observer pour déclencher l'animation quand la section devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Fonction pour animer les barres de compétences
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    }
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const prenom = formData.get('prenom');
            const nom = formData.get('nom');
            const sujet = formData.get('sujet');
            const message = formData.get('message');
            
            // Validation simple
            if (!prenom || !nom || !sujet || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
            alert(`Merci ${prenom} ${nom}! Votre message a été envoyé avec succès.`);
            
            // Reset du formulaire
            this.reset();
        });
    }
    
    // Effet de parallaxe léger sur la section hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            const speed = scrolled * 0.2;
            heroImage.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Animation d'apparition des cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Initialiser l'état des cartes de projet
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
    
    // Gestion des boutons "Voir mes projets"
    const projectButton = document.querySelector('.btn-primary');
    if (projectButton) {
        projectButton.addEventListener('click', function() {
            const projectsSection = document.querySelector('#projets');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Mise en surbrillance du lien de navigation actif
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Effet de typing pour le titre principal (optionnel)
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        let index = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.innerHTML = originalText.substring(0, index + 1);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Décommenter la ligne suivante pour activer l'effet de typing
        // typeWriter();
    }
    
    // Gestion responsive du menu (pour les écrans mobiles)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.style.display = 'none';
    mobileMenuButton.style.background = 'none';
    mobileMenuButton.style.border = 'none';
    mobileMenuButton.style.color = 'white';
    mobileMenuButton.style.fontSize = '20px';
    mobileMenuButton.style.cursor = 'pointer';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(mobileMenuButton);
    }
    
    // Gestion du menu mobile
    function checkScreenSize() {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileMenuButton.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    // Vérifier la taille de l'écran au chargement et lors du redimensionnement
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Toggle du menu mobile
    mobileMenuButton.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = '#2a2a2a';
            navMenu.style.padding = '20px';
            navMenu.style.borderTop = '1px solid #444';
        } else {
            navMenu.style.display = 'none';
        }
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.style.display = 'none';
            }
        });
    });
    
    // Animation de fade-in pour les sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Effet de hover sur les boutons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Validation en temps réel du formulaire
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b6b';
                this.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';
            } else {
                this.style.borderColor = '#00dcb4';
                this.style.boxShadow = '0 0 5px rgba(0, 220, 180, 0.3)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00dcb4';
            this.style.boxShadow = '0 0 8px rgba(0, 220, 180, 0.4)';
        });
    });
    
    // Compteur animé pour les pourcentages de compétences (optionnel)
    function animateCounters() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.skill-progress');
            const targetWidth = parseInt(progressBar.getAttribute('data-width'));
            
            // Créer un élément pour afficher le pourcentage
            const percentageDisplay = document.createElement('span');
            percentageDisplay.className = 'skill-percentage';
            percentageDisplay.style.fontSize = '12px';
            percentageDisplay.style.color = '#666';
            percentageDisplay.style.float = 'right';
            
            const skillName = item.querySelector('.skill-name');
            skillName.appendChild(percentageDisplay);
            
            // Animer le compteur
            let currentWidth = 0;
            const increment = targetWidth / 50; // 50 étapes d'animation
            
            function updateCounter() {
                if (currentWidth < targetWidth) {
                    currentWidth += increment;
                    percentageDisplay.textContent = Math.round(currentWidth) + '%';
                    requestAnimationFrame(updateCounter);
                } else {
                    percentageDisplay.textContent = targetWidth + '%';
                }
            }
            
            // Démarrer l'animation après un délai
            setTimeout(updateCounter, 500);
        });
    }
    
    // Ajouter l'animation des compteurs à l'observer des compétences
    const originalAnimateSkillBars = animateSkillBars;
    animateSkillBars = function() {
        originalAnimateSkillBars();
        setTimeout(animateCounters, 300);
    };
    
    // Effet de particules de fond (optionnel et léger)
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = '#00dcb4';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.3';
            particle.style.pointerEvents = 'none';
            
            // Position aléatoire
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Animation CSS
            particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            
            heroSection.style.position = 'relative';
            heroSection.appendChild(particle);
        }
    }
    
    // Ajouter les keyframes pour l'animation des particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            75% { transform: translateY(-15px) rotate(270deg); }
        }
        
        .nav-menu a.active {
            color: #00dcb4;
            font-weight: bold;
        }
        
        .skill-percentage {
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialiser les particules (décommenter pour activer)
    // createParticles();
    
    // Message de bienvenue dans la console
    console.log('🚀 Portfolio chargé avec succès!');
    console.log('💻 Développé avec HTML, CSS et JavaScript');
    console.log('🎨 Design moderne et responsive');
    
});