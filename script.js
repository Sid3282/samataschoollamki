document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Magnetic Effect
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            gsap.to(this, {
                x: (x - centerX) / 5,
                y: (y - centerY) / 5,
                rotateX: angleX,
                rotateY: angleY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            gsap.from('.nav-link', {
                x: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        const statSection = document.querySelector('.stats');
        const statSectionTop = statSection.getBoundingClientRect().top;
        const statSectionHeight = statSection.offsetHeight;
        let animated = false;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + window.innerHeight;
            
            if (scrollPosition > statSectionTop + statSectionHeight / 2 && !animated) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(animateCounters, 1);
                    } else {
                        counter.innerText = target;
                    }
                });
                
                animated = true;
            }
        });
    }
    
    animateCounters();

    // Academics Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Facilities Slider
    const facilitySlides = document.querySelectorAll('.facility-slide');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Create dots
    facilitySlides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Next slide
    document.querySelector('.slider-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % facilitySlides.length;
        updateSlider();
    });
    
    // Previous slide
    document.querySelector('.slider-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + facilitySlides.length) % facilitySlides.length;
        updateSlider();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Update slider
    function updateSlider() {
        facilitySlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % facilitySlides.length;
        updateSlider();
    }, 5000);

    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonialSlides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDots.appendChild(dot);
    });
    
    // Next testimonial
    document.querySelector('.testimonial-next').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        updateTestimonialSlider();
    });
    
    // Previous testimonial
    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        updateTestimonialSlider();
    });
    
    // Go to specific testimonial
    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonialSlider();
    }
    
    // Update testimonial slider
    function updateTestimonialSlider() {
        testimonialSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentTestimonial);
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        updateTestimonialSlider();
    }, 7000);

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h4>Thank you, ${name}!</h4>
                <p>Your message has been received. We will contact you soon.</p>
            `;
            
            contactForm.reset();
            contactForm.style.display = 'none';
            document.querySelector('.contact-form').appendChild(successMessage);
            
            // Animation for success message
            gsap.from(successMessage, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
    });
    
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8
    });
    
    gsap.from('.hero-scroll', {
        opacity: 0,
        duration: 1,
        delay: 1.5
    });
    
    // Section header animations
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
    
    gsap.from('.section-subtitle', {
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
    });
    
    gsap.from('.section-divider', {
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
        },
        opacity: 0,
        scale: 0,
        duration: 1,
        delay: 0.4
    });
    
    // About section animations
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });
    
    // Stats section animations
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    });
    
    // Academics section animations
    gsap.from('.academic-tabs', {
        scrollTrigger: {
            trigger: '.academic-tabs',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
    
    // Facilities section animations
    gsap.from('.facilities-slider', {
        scrollTrigger: {
            trigger: '.facilities-slider',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
    
    // Gallery section animations
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
    
    // Testimonials section animations
    gsap.from('.testimonial-content', {
        scrollTrigger: {
            trigger: '.testimonials-slider',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });
});