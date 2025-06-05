// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Toggle mobile navigation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Filter products
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                
                // Add animation
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        
        // Change button text and style
        this.textContent = 'Added to Cart';
        this.classList.add('added');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('added');
        }, 2000);
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Function to change slide
const changeSlide = (n) => {
    // Remove active class from all slides and dots
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Update current slide
    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    
    // Activate current slide and dot
    testimonialSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

// Set up dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeSlide(index);
        clearInterval(slideInterval);
        startSlideInterval();
    });
});

// Auto-rotate testimonials
const startSlideInterval = () => {
    slideInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 5000);
};

// Start the slideshow
startSlideInterval();

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            // For demo purposes, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = 'white';
            successMessage.style.fontWeight = 'bold';
            successMessage.style.marginTop = '1rem';
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.innerHTML = `
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Subscribe</button>
                `;
            }, 3000);
        }
    });
}

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.benefit-card, .product-card, .cta-content');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.animation = 'fadeIn 1s forwards';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    revealOnScroll();
});

window.addEventListener('scroll', () => {
    revealOnScroll();
});
