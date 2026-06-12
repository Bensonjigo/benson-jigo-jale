/* ==========================================================================
   BENSON JIGO JALE - PORTFOLIO INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. MOBILE MENU TOGGLE
    // -------------------------------------------------------------
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. STICKY NAVBAR & ACTIVE NAVIGATION STATE
    // -------------------------------------------------------------
    const headerNav = document.querySelector('.header-nav');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }

        // Active Link based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // -------------------------------------------------------------
    // 3. DARK / LIGHT THEME SWITCHER
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply the saved theme on load
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const updateThemeColor = (theme) => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.content = theme === 'light' ? '#f8fafc' : '#070b14';
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                updateThemeColor('dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeColor('light');
            }
        });
    }

    updateThemeColor(currentTheme);

    // -------------------------------------------------------------
    // 4. TYPEWRITER EFFECT IN HERO
    // -------------------------------------------------------------
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const words = [
            "Information Technology Graduate",
            "Software Developer",
            "IT Specialist",
            "Technology Consultant",
            "Problem Solver"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Deleting is faster
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Wait at the end of the word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before starting new word
            }

            setTimeout(type, typingSpeed);
        };

        // Start typing
        setTimeout(type, 1000);
    }

    // -------------------------------------------------------------
    // 5. INTERACTIVE CANVAS PARTICLE NETWORK
    // -------------------------------------------------------------
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Set full width/height
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        };

        window.addEventListener('resize', resizeCanvas);

        // Capture mouse movement inside canvas wrapper
        const canvasWrapper = canvas.parentElement;
        canvasWrapper.addEventListener('mousemove', (e) => {
            const rect = canvasWrapper.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvasWrapper.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.baseSpeedX = Math.random() * 0.4 - 0.2;
                this.baseSpeedY = Math.random() * 0.4 - 0.2;
                this.speedX = this.baseSpeedX;
                this.speedY = this.baseSpeedY;
            }

            update() {
                // Normal drifting motion
                this.x += this.speedX;
                this.y += this.speedY;

                // Wall collision rebound
                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

                // Mouse interaction - pull effect
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        
                        // Pull particle slightly towards mouse
                        this.x += forceDirectionX * force * 0.8;
                        this.y += forceDirectionY * force * 0.8;
                    }
                }
            }

            draw() {
                // Particle color based on theme
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                ctx.fillStyle = isLight ? 'rgba(99, 102, 241, 0.35)' : 'rgba(129, 140, 248, 0.45)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            // Determine quantity relative to canvas area
            const density = Math.floor((canvas.width * canvas.height) / 9000);
            const particleCount = Math.min(Math.max(density, 40), 100);

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const drawLines = () => {
            const maxDistance = 120;
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const lineColor = isLight ? '99, 102, 241' : '129, 140, 248';

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        // Calculate line transparency based on proximity
                        const alpha = (1 - (distance / maxDistance)) * 0.15;
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse pointer
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const alpha = (1 - (distance / mouse.radius)) * 0.25;
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawLines();
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();
    }

    // -------------------------------------------------------------
    // 6. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // Viewport
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // Slightly offset triggers
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // -------------------------------------------------------------
    // 7. SKILLS SECTION FILTER
    // -------------------------------------------------------------
    const skillsTabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillsContents = document.querySelectorAll('.skills-content');

    if (skillsTabButtons.length > 0) {
        skillsTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from buttons
                skillsTabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle visibility of skill cards groups
                const targetId = btn.getAttribute('data-target');
                skillsContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 8. PORTFOLIO FILTER
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    // Set animations
                    item.style.transform = 'scale(0.95)';
                    item.style.opacity = '0';

                    setTimeout(() => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'flex';
                            setTimeout(() => {
                                item.style.transform = 'scale(1)';
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 9. TESTIMONIALS SLIDER
    // -------------------------------------------------------------
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');

    if (testimonialsSlider && testimonialSlides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const updateSlider = (index) => {
            currentSlide = index;
            testimonialsSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            sliderDots.forEach((dot, idx) => {
                dot.classList.remove('active');
                if (idx === currentSlide) {
                    dot.classList.add('active');
                }
            });
        };

        const startSlideShow = () => {
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % testimonialSlides.length;
                updateSlider(nextSlide);
            }, 6000); // Transitions every 6 seconds
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        // Dots click navigation
        sliderDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                updateSlider(idx);
                startSlideShow();
            });
        });

        // Initialize slideshow
        startSlideShow();
    }

    // -------------------------------------------------------------
    // 10. CONTACT FORM VALIDATION & SIMULATION
    // -------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous alerts
            formStatus.className = 'form-status-message';
            formStatus.style.display = 'none';

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Form client-side validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill out all form fields.';
                formStatus.classList.add('error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                return;
            }

            // Disable submit button and show sending state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending message...';

            // Simulate form submission API request delay (1.5 seconds)
            setTimeout(() => {
                // Emulate success
                formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. Benson will get back to you shortly.`;
                formStatus.classList.add('success');
                
                // Clear form
                contactForm.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Clear success message after 7 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.classList.remove('success');
                }, 7000);

            }, 1500);
        });
    }
});
