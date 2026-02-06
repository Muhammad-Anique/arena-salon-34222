'use strict';

/**
 * Arena Salon - Interactive Features
 * Handles mobile navigation, smooth scrolling, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const header = document.querySelector('.main-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle Mobile Menu
    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(18, 18, 18, 0.98)';
            header.style.padding = '15px 0';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.padding = '20px 0';
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Stylist Card Hover Effect (Intersection Observer) ---
    // Subtle fade-in animation for sections as they enter viewport
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeOnScroll = new IntersectionObserver((entries, fadeOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in-visible');
            fadeOnScroll.unobserve(entry.target);
        });
    }, fadeOptions);

    // Apply to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-element');
        fadeOnScroll.observe(section);
    });

    // --- Stylist Gallery Interactions ---
    const stylistCards = document.querySelectorAll('.stylist-card');
    stylistCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // --- Simple Testimonial Carousel (If Grid isn't used) ---
    // Logic for a basic auto-rotating slider if elements exist
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (testimonials.length > 0) {
        setInterval(() => {
            // This is a placeholder for a cross-fade logic if needed
            // Currently architecture suggests a Grid, but this allows for extension
        }, 5000);
    }

    // --- Contact Form Placeholder Logic ---
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea');
            
            if (email.value