// Healthcare Tech Landing Page - JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTabs();
    initTestimonialSlider();
    initVideoPlaceholder();
    initFormHandler();
    initSolutionModals();
    initSmoothScrolling();
    addScrollAnimation();
});

// Mobile Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Transform hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
                spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Header scroll behavior
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Tab System
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonials.length - 1;
            }
            showTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials every 7 seconds
    let testimonialInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 7000);
    
    // Pause auto-rotation when user interacts with testimonials
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonials.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }, 7000);
        });
    }
}

// Video Placeholder (Demo section)
function initVideoPlaceholder() {
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // In a real implementation, this would replace the placeholder with actual video
            // For this demo, we'll show a modal with a message
            showModal(`
                <div style="text-align: center; padding: 30px;">
                    <h3>Demo Video</h3>
                    <p style="margin: 20px 0;">This is where the actual video would play in a production environment.</p>
                    <img src="https://api.a0.dev/assets/image?text=HealthTech%20Demo%20Video%20Player&aspect=16:9&seed=555" alt="Demo Video Player" style="max-width: 100%; border-radius: 8px;">
                </div>
            `);
        });
    }
}

// Form Handler
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real app, we would send the form data to a server here
            // For this demo, we'll just show a success message
            
            // Show toast notification
            showToast('Request submitted successfully!');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Solution Info Modals
function initSolutionModals() {
    // Solution info content
    const solutionData = {
        ehr: {
            title: 'Electronic Health Records',
            content: `
                <div class="solution-detail">
                    <img src="https://api.a0.dev/assets/image?text=EHR%20System%20Interface&aspect=16:9&seed=112" alt="EHR System Interface" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Comprehensive EHR Solution</h3>
                    <p>Our Electronic Health Records system transforms how healthcare providers manage patient information, streamline workflows, and improve quality of care.</p>
                    
                    <h4>Key Benefits</h4>
                    <ul style="margin-bottom: 20px;">
                        <li>Centralized patient records with real-time updates</li>
                        <li>Seamless integration with billing and scheduling systems</li>
                        <li>Standards-based interoperability with other healthcare systems</li>
                        <li>Role-based access controls and comprehensive audit trails</li>
                        <li>Customizable templates for different specialties</li>
                    </ul>
                    
                    <h4>Implementation Process</h4>
                    <p>Our team provides a full-service implementation including migration from legacy systems, staff training, and ongoing support.</p>
                    
                    <div style="margin-top: 30px;">
                        <a href="#contact" class="btn-primary" style="margin-right: 10px;">Request Demo</a>
                        <a href="#" class="btn-secondary modal-close-btn">Close</a>
                    </div>
                </div>
            `
        },
        ai: {
            title: 'AI Diagnostics Platform',
            content: `
                <div class="solution-detail">
                    <img src="https://api.a0.dev/assets/image?text=AI%20Diagnostics%20Dashboard&aspect=16:9&seed=113" alt="AI Diagnostics Dashboard" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Advanced AI Diagnostics</h3>
                    <p>Our AI platform empowers healthcare professionals with cutting-edge diagnostic tools that enhance accuracy, reduce time to diagnosis, and improve patient outcomes.</p>
                    
                    <h4>Core Capabilities</h4>
                    <ul style="margin-bottom: 20px;">
                        <li>Medical imaging analysis with anomaly detection</li>
                        <li>Pattern recognition in laboratory results</li>
                        <li>Risk prediction algorithms based on patient history</li>
                        <li>Natural language processing for clinical documentation</li>
                        <li>Decision support with evidence-based recommendations</li>
                    </ul>
                    
                    <h4>Continuous Learning</h4>
                    <p>Our AI models continuously improve through supervised learning with clinician feedback, ensuring ever-increasing accuracy and relevance.</p>
                    
                    <div style="margin-top: 30px;">
                        <a href="#contact" class="btn-primary" style="margin-right: 10px;">Request Demo</a>
                        <a href="#" class="btn-secondary modal-close-btn">Close</a>
                    </div>
                </div>
            `
        },
        telehealth: {
            title: 'Telehealth Platform',
            content: `
                <div class="solution-detail">
                    <img src="https://api.a0.dev/assets/image?text=Telehealth%20Virtual%20Visit&aspect=16:9&seed=114" alt="Telehealth Virtual Visit" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Comprehensive Telehealth Solution</h3>
                    <p>Our telehealth platform bridges the gap between patients and providers, enabling high-quality virtual care regardless of location or mobility constraints.</p>
                    
                    <h4>Platform Features</h4>
                    <ul style="margin-bottom: 20px;">
                        <li>HD video consultations with multiple participant support</li>
                        <li>Secure messaging and file sharing</li>
                        <li>Remote patient monitoring integration</li>
                        <li>Digital intake forms and pre-visit preparations</li>
                        <li>Seamless EHR integration for context-aware visits</li>
                    </ul>
                    
                    <h4>Access Anywhere</h4>
                    <p>Patients can connect via web browsers or mobile apps, with adaptive streaming to accommodate varying bandwidth conditions.</p>
                    
                    <div style="margin-top: 30px;">
                        <a href="#contact" class="btn-primary" style="margin-right: 10px;">Request Demo</a>
                        <a href="#" class="btn-secondary modal-close-btn">Close</a>
                    </div>
                </div>
            `
        },
        analytics: {
            title: 'Healthcare Analytics',
            content: `
                <div class="solution-detail">
                    <img src="https://api.a0.dev/assets/image?text=Healthcare%20Analytics%20Dashboard&aspect=16:9&seed=115" alt="Healthcare Analytics Dashboard" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Data-Driven Healthcare Analytics</h3>
                    <p>Transform your organization's data into actionable insights with our comprehensive healthcare analytics platform designed for clinical, operational, and financial excellence.</p>
                    
                    <h4>Analytics Modules</h4>
                    <ul style="margin-bottom: 20px;">
                        <li>Clinical outcomes tracking and benchmarking</li>
                        <li>Population health management</li>
                        <li>Operational efficiency analysis</li>
                        <li>Revenue cycle optimization</li>
                        <li>Customizable executive dashboards</li>
                    </ul>
                    
                    <h4>Predictive Insights</h4>
                    <p>Leverage advanced predictive models to anticipate patient needs, optimize staffing, and prevent adverse events before they occur.</p>
                    
                    <div style="margin-top: 30px;">
                        <a href="#contact" class="btn-primary" style="margin-right: 10px;">Request Demo</a>
                        <a href="#" class="btn-secondary modal-close-btn">Close</a>
                    </div>
                </div>
            `
        }
    };
    
    // Add click handlers to "Learn More" links
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const solutionType = this.getAttribute('data-solution');
            if (solutionData[solutionType]) {
                showModal(solutionData[solutionType].content, solutionData[solutionType].title);
            }
        });
    });
}

// Modal Management
function showModal(content, title = '') {
    const modal = document.getElementById('solution-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Add title if provided
    if (title) {
        modalBody.innerHTML = `<h2 style="margin-bottom: 20px;">${title}</h2>` + content;
    } else {
        modalBody.innerHTML = content;
    }
    
    // Display the modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    
    // Add close functionality to X button
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Add close functionality to any elements with 'modal-close-btn' class
    const closeButtons = modal.querySelectorAll('.modal-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            closeModal();
        });
    });
    
    // Close on click outside content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set appropriate icon and color based on type
    switch(type) {
        case 'success':
            toastIcon.className = 'fas fa-check-circle toast-icon';
            toastIcon.style.color = 'var(--success)';
            break;
        case 'warning':
            toastIcon.className = 'fas fa-exclamation-circle toast-icon';
            toastIcon.style.color = 'var(--warning)';
            break;
        case 'error':
            toastIcon.className = 'fas fa-times-circle toast-icon';
            toastIcon.style.color = 'var(--error)';
            break;
    }
    
    // Show the toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or links that should handle their own behavior
            if (targetId === '#' || this.classList.contains('learn-more')) {
                return;
            }
            
            event.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // Scroll to element with header offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll animations
function addScrollAnimation() {
    // Elements to animate when they enter viewport
    const elements = [
        ...document.querySelectorAll('.solution-card'),
        ...document.querySelectorAll('.feature-content'),
        ...document.querySelectorAll('.info-card'),
        document.querySelector('.contact-form-container')
    ].filter(Boolean); // Filter out any null elements
    
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);
    
    // Add initial styles and start observing
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}