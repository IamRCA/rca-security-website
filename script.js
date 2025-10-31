// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        document.getElementById('particles-container').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 120 // Green to cyan range
            });
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.0005;
                particle.vy += dy * force * 0.0005;
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = `hsl(${particle.hue}, 100%, 50%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    this.ctx.strokeStyle = '#00ff88';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .badge, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, index * 200);
    });
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icons i');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Cyber Grid Animation
function initCyberGridAnimation() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(0, 255, 136, 0.3)';
            item.style.transform = 'scale(1.1)';
            item.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(0, 255, 136, 0.1)';
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('service_your_service_id', 'template_your_template_id', {
            from_name: data.name,
            from_email: data.email,
            company: data.company || 'Not provided',
            message: data.message,
            to_email: 'info@rcasecuritygroup.com'
        })
        .then(function(response) {
            // Success
            form.reset();
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            // Error - fallback to mailto
            console.error('EmailJS failed:', error);
            const subject = `Contact from ${data.name}${data.company ? ` at ${data.company}` : ''}`;
            const body = `Name: ${data.name}\nEmail: ${data.email}${data.company ? `\nCompany: ${data.company}` : ''}\n\nMessage:\n${data.message}`;
            const mailtoLink = `mailto:info@rcasecuritygroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            showNotification('Email client opened. Please send the message manually.', 'warning');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Download Resource Function
function downloadResource(type) {
    let resourceName = '';
    let resourceUrl = '';
    
    switch(type) {
        case 'security-checklist':
            resourceName = 'RCA Security Checklist';
            resourceUrl = 'security-checklist.html';
            break;
        case 'compliance-guide':
            resourceName = 'Compliance Quick Guide.pdf';
            // Future: add actual PDF
            break;
        case 'policy-templates':
            resourceName = 'Security Policy Templates.zip';
            // Future: add actual ZIP
            break;
        default:
            resourceName = 'Resource.pdf';
    }
    
    if (resourceUrl) {
        // Open the checklist in a new tab for now
        window.open(resourceUrl, '_blank');
        showNotification(`${resourceName} opened successfully!`, 'success');
    } else {
        // For future PDF/ZIP downloads
        showNotification(`Downloading ${resourceName}...`, 'success');
        setTimeout(() => {
            showNotification(`${resourceName} downloaded successfully!`, 'success');
        }, 1500);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    // Create notification content safely
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const icon = document.createElement('i');
    icon.className = `fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}`;
    
    const text = document.createElement('span');
    text.textContent = message; // Using textContent prevents XSS
    
    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
        color: var(--dark-bg);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-glow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mouse Trail Effect
function initMouseTrail() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let mouse = { x: 0, y: 0 };
    let trail = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        trail.push({
            x: mouse.x,
            y: mouse.y,
            life: 1
        });
        
        if (trail.length > 10) {
            trail.shift();
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        trail.forEach((point, index) => {
            point.life -= 0.05;
            
            if (point.life > 0) {
                ctx.save();
                ctx.globalAlpha = point.life;
                ctx.fillStyle = '#00ff88';
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        });
        
        trail = trail.filter(point => point.life > 0);
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Enhanced Animations System
function initEnhancedAnimations() {
    // Staggered animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            member.style.transition = 'all 0.6s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 20px 60px rgba(0, 255, 136, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
    
    // Animated progress bars for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Floating animation for cert badges
    const certBadges = document.querySelectorAll('.cert-badge');
    certBadges.forEach((badge, index) => {
        badge.style.animation = `float 3s ease-in-out infinite`;
        badge.style.animationDelay = `${index * 0.2}s`;
    });
}

// DEMO HIDDEN - Commented out to hide demo functionality
/*
function initLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');
    const introScreen = document.getElementById('intro-screen');
    const loadingContent = document.querySelector('.loading-content');
    
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && !window.location.pathname.includes('mobile.html')) {
        window.location.href = 'mobile.html';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
        localStorage.removeItem('rca_demo_seen');
    }
    const hasSeenDemo = localStorage.getItem('rca_demo_seen') === 'true';
    const skipDemo = true || urlParams.get('skip') === 'true' || 
                    urlParams.get('demo') === 'false' || 
                    urlParams.get('home') === 'true' ||
                    window.location.pathname.includes('/home') ||
                    (hasSeenDemo && urlParams.get('demo') !== 'true');
    if (skipDemo) {
        loadingScreen.style.display = 'none';
        return;
    }
    introScreen.style.display = 'flex';
    loadingContent.style.display = 'none';
    const mobileNote = document.querySelector('.intro-mobile-note');
    if (isMobile) {
        mobileNote.style.display = 'block';
    }
    setupIntroScreen();
}
*/

// DEMO HIDDEN - Commented out to hide demo functionality
/*
function setupIntroScreen() {
    const demoBtn = document.getElementById('start-split-demo');
    const skipBtn = document.getElementById('skip-animation');
    
    demoBtn.addEventListener('click', () => {
        // Mark demo as seen
        localStorage.setItem('rca_demo_seen', 'true');
        
        // Redirect to split-screen demo
        window.location.href = 'split-screen-demo.html';
    });
    
    skipBtn.addEventListener('click', () => {
        // Mark demo as seen (so they don't see it again)
        localStorage.setItem('rca_demo_seen', 'true');
        
        // Skip directly to website
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    });
}
*/

// DEMO HIDDEN - Commented out to hide demo functionality
/*
function startEpicAnimation() {
    // Add typing effect to terminal lines - ONE AT A TIME
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            // Store original text safely
            const originalText = line.textContent; // Use textContent to prevent XSS
            line.textContent = '';
            line.classList.add('typing');
            
            // Type out the text character by character
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    line.textContent += originalText[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    // Remove typing class after completion
                    setTimeout(() => {
                        line.classList.remove('typing');
                    }, 1000); // Wait 1 second before next line
                }
            }, 40); // Type each character every 40ms
        }, 5000 + (index * 2000)); // 5 seconds + 2 seconds per line (sequential)
    });
    
    // Update attack percentage counter
    const attackPercentage = document.querySelector('.attack-percentage');
    if (attackPercentage) {
        let percentage = 0;
        // Start counter when attack progress appears (13s)
        setTimeout(() => {
            const interval = setInterval(() => {
                percentage += 2;
                attackPercentage.textContent = percentage + '%';
                if (percentage >= 100) {
                    clearInterval(interval);
                }
            }, 80); // Update every 80ms for 4 second duration (100% / 2% = 50 steps * 80ms = 4s)
        }, 13000); // Start at 13 seconds
    }
    
    // Auto-redirect to victory page after animation completes
    setTimeout(() => {
        window.location.href = 'victory.html';
    }, 44000); // 44 seconds total (34s animation + 10s redirect screen)
}
*/

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove demo elements
    const loadingScreen = document.getElementById('loading-screen');
    const introScreen = document.getElementById('intro-screen');
    const loadingContent = document.querySelector('.loading-content');
    
    if (loadingScreen) loadingScreen.remove();
    if (introScreen) introScreen.remove();
    if (loadingContent) loadingContent.remove();
    
    // Mobile redirect
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && !window.location.pathname.includes('mobile.html')) {
        window.location.href = 'mobile.html';
        return;
    }

    // Trigger hero title animations
    setTimeout(() => {
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.animation = `slideInUp 0.8s ease ${index * 0.1}s forwards`;
        });
    }, 100);
    
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize all features
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initTypingAnimation();
    initParallaxEffect();
    initCyberGridAnimation();
    initContactForm();
    // initMouseTrail(); // Disabled
    
    // Initialize enhanced animations
    initEnhancedAnimations();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
