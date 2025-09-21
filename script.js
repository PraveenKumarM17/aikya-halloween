// Halloween Event Website JavaScript - Updated and Enhanced
// Enhanced functionality for smooth user experience

const images = [
  // 🎭 Event Posters
  "asserts/Qudditch.png",
  "asserts/TreasureHunt.png",
  "asserts/Valvo.jpg",
  "asserts/Robo.png",
  "asserts/Tech.jpg",
  "asserts/Poster.jpg",
  "asserts/HauntedHouse.jpg",
  "asserts/potionMatching.png",
  "asserts/BlindTyping.jpg",
  "asserts/Mindgame.png",
  "asserts/Movie.jpg",
  "asserts/valvoFinal.png",
  "asserts/RelayGame.png",
  "asserts/PosterMaking.png",
  "asserts/EscapeRoom.png",
  "asserts/MovieThrival.png",
  "asserts/Costume.jpg",

  // 🏷️ Branding / Logo
  "asserts/Adobe Express - file.jpg",

  // 🌌 Backgrounds (only if you’re using actual image files, 
  // otherwise skip since your code uses CSS/emoji)
  // "asserts/parallax-bg.png",
  // "asserts/moon.png",
  // "asserts/stars.png",
  // "asserts/bats.png"
];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

// Global variables
let isDarkMode = true;
let soundEnabled = false;
let lastScrollTop = 0;
let ghostTrails = [];
let clickCount = 0;
let countdownInterval = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupLoadingScreen();
    setupCountdownTimer();
    setupNavigation();
    setupThemeToggle();
    setupSoundControl();
    setupModalSystem();
    setupScrollElements();
    setupSmoothScrolling();
    setupSectionAnimations();
    setupEasterEggs();
    setupParallaxEffects();
    setupContactCards();
    loadUserPreferences();
    displayConsoleMessage();
    autoStartSound();
}

// Loading Screen
function setupLoadingScreen() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }
        }, 2000);
    });
}

// Auto-start sound on website entry
function autoStartSound() {
    const backgroundAudio = document.getElementById('backgroundAudio');
    const soundIcon = document.querySelector('.sound-icon');
    
    if (backgroundAudio && soundIcon) {
        // Try to play audio automatically
        backgroundAudio.play().then(() => {
            soundEnabled = true;
            soundIcon.textContent = '🔊';
            localStorage.setItem('soundEnabled', 'true');
        }).catch(() => {
            // If autoplay fails (browser restriction), keep sound disabled
            soundEnabled = false;
            soundIcon.textContent = '🔇';
            localStorage.setItem('soundEnabled', 'false');
        });
    }
}

// Countdown Timer with enhanced functionality
function setupCountdownTimer() {
    function updateCountdown() {
        const eventDate = new Date('2025-09-25T09:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            updateCountdownDisplay(days, hours, minutes, seconds);
        } else {
            handleEventLive();
        }
    }

    function updateCountdownDisplay(days, hours, minutes, seconds) {
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        const values = { days, hours, minutes, seconds };

        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element) {
                const newValue = values[key].toString().padStart(2, '0');
                if (element.textContent !== newValue) {
                    animateNumberChange(element, values[key]);
                    element.textContent = newValue;
                }
            }
        });
    }

    function handleEventLive() {
        const countdownTitle = document.querySelector('.countdown-title');
        const countdownTimer = document.getElementById('countdownTimer');
        
        if (countdownTitle) {
            countdownTitle.textContent = '🎃 THE CURSE HAS AWAKENED! 🎃';
            countdownTitle.style.animation = 'flicker 2s ease-in-out infinite';
        }
        if (countdownTimer) {
            countdownTimer.innerHTML = '<h2 style="color: var(--primary-orange); font-size: 2rem; margin: 1rem 0; animation: pulse 2s ease-in-out infinite;">Event is LIVE! 🔥</h2>';
        }
        playSpookySound();
        
        // Clear the interval as event is live
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    }

    // Initialize countdown and update every second
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Animate number changes in countdown with enhanced effects
function animateNumberChange(element, newValue) {
    if (!element) return;
    
    const currentValue = element.textContent;
    const formattedNewValue = newValue.toString().padStart(2, '0');
    
    if (currentValue !== formattedNewValue) {
        // Add glow effect during change
        element.style.transform = 'scale(1.15)';
        element.style.color = 'var(--primary-orange)';
        element.style.textShadow = '0 0 20px var(--primary-orange)';
        
        // Create ripple effect
        createRippleEffect(element);
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#ffffff';
            element.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        }, 400);
    }
}

// Create ripple effect for countdown changes
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, var(--primary-orange) 0%, transparent 70%);
        width: 100px;
        height: 100px;
        left: ${rect.left + rect.width / 2 - 50}px;
        top: ${rect.top + rect.height / 2 - 50}px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.6;
        animation: ripple-expand 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Enhanced Navigation functionality
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    // Hide/Show navigation on scroll with smooth transitions
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        // Add background blur effect based on scroll
        const opacity = Math.min(scrollTop / 100, 0.95);
        navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        
        if (document.body.classList.contains('light-mode')) {
            navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
        }
        
        lastScrollTop = scrollTop;
    }, 10));

    // Add active state to navigation links
    updateActiveNavLink();
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Theme Toggle with smooth transitions
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const moonElement = document.getElementById('moon');
    const parallaxBg = document.querySelector('.parallax-bg');
    const stars = document.querySelector('.stars');
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const creepyImages = document.getElementById('creepyImages');

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        document.body.classList.toggle('light-mode');
        
        themeToggle.textContent = isDarkMode ? '🌙' : '☀️';

        // Animate theme elements
        animateThemeChange(moonElement, stars, parallaxBg, mainTitle, subtitle, creepyImages);

        // Store preference
        localStorage.setItem('halloweenTheme', isDarkMode ? 'dark' : 'light');
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
}

// Animate theme change elements
function animateThemeChange(moonElement, stars, parallaxBg, mainTitle, subtitle, creepyImages) {
    if (!isDarkMode) {
        // Light mode animations
        document.body.style.background = "#ffffff";
        
        if (parallaxBg) {
            parallaxBg.style.opacity = '0';
            setTimeout(() => {
                parallaxBg.style.display = "none";
            }, 300);
        }

        if (moonElement) {
            moonElement.style.opacity = '0';
            moonElement.style.transform = 'scale(0) rotate(180deg)';
        }

        if (stars) {
            stars.style.opacity = '0';
        }

        if (mainTitle) mainTitle.style.color = "#8b0000";
        if (subtitle) subtitle.style.color = "#8b0000";
        
        if (creepyImages) {
            creepyImages.style.opacity = "1";
            animateCreepyImages();
        }
    } else {
        // Dark mode animations
        document.body.style.background = "";
        
        if (parallaxBg) {
            parallaxBg.style.display = "block";
            setTimeout(() => {
                parallaxBg.style.opacity = '1';
            }, 100);
        }

        if (moonElement) {
            moonElement.style.opacity = '1';
            moonElement.style.transform = 'scale(1) rotate(0deg)';
        }

        if (stars) {
            stars.style.opacity = '1';
        }

        if (mainTitle) mainTitle.style.color = "var(--primary-orange)";
        if (subtitle) subtitle.style.color = "var(--text-secondary)";
        
        if (creepyImages) {
            creepyImages.style.opacity = "0";
        }
    }
}

// Animate creepy images in light mode
function animateCreepyImages() {
    const images = document.querySelectorAll('.creepy-img');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.animation = 'none';
            img.style.animation = 'float-creepy 6s ease-in-out infinite';
        }, index * 200);
    });
}

// Enhanced Sound Control with audio visualization
function setupSoundControl() {
    const soundToggle = document.getElementById('soundToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    
    if (!soundToggle || !backgroundAudio) return;

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const soundIcon = soundToggle.querySelector('.sound-icon');
        
        if (soundIcon) {
            soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
        }
        
        if (soundEnabled) {
            backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
            animateSoundControl(soundToggle, true);
        } else {
            backgroundAudio.pause();
            animateSoundControl(soundToggle, false);
        }
        
        localStorage.setItem('soundEnabled', soundEnabled.toString());
    });

    // Set initial volume and create audio context
    if (backgroundAudio) {
        backgroundAudio.volume = 0.3;
        
        // Add audio event listeners
        backgroundAudio.addEventListener('canplaythrough', () => {
            console.log('Audio ready to play');
        });
        
        backgroundAudio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            soundEnabled = false;
            if (soundToggle.querySelector('.sound-icon')) {
                soundToggle.querySelector('.sound-icon').textContent = '🔇';
            }
        });
    }
}

// Animate sound control feedback
function animateSoundControl(element, enabled) {
    element.style.transform = 'scale(1.2)';
    element.style.background = enabled ? 'var(--whatsapp-green)' : 'var(--blood-red)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.background = '';
    }, 200);
}

// Enhanced Modal System with better event handling
function setupModalSystem() {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.modal-close');

    // Enhanced event details data
    const eventDetails = {
        'quidditch-game': {
            title: '🧙‍♂️ Quidditch Game',
            content: generateEventContent('Quidditch Game', {
                time: '10:00 AM - 1:00 PM',
                prize: '₹1000',
                description: 'Experience the magical sport of Quidditch in real life! Teams will compete in this exciting game of strategy and skill.',
                rules: [
                    'Teams of 7 players each',
                    'No actual flying involved (safety first!)',
                    'Mix of running, strategy, and ball handling',
                    'Fair play and sportsmanship required'
                ],
                requirements: ['Comfortable athletic wear', 'Team registration required', 'Age limit: 16-25 years']
            })
        },
        'treasure-hunt': {
            title: '🗺️ Treasure Hunt',
            content: generateEventContent('Treasure Hunt', {
                time: '10:00 AM - 12:30 PM',
                prize: '₹1000',
                description: 'Follow mysterious clues across the campus to uncover hidden treasures. A test of wit, teamwork, and perseverance.',
                rules: [
                    'Teams of 3-4 members',
                    'All clues must be solved in sequence',
                    'No internet or phone assistance',
                    'First team to find final treasure wins'
                ],
                requirements: ['Registration deadline: Day before event', 'Team captain must be present', 'Wear comfortable walking shoes']
            })
        },
        'valorant-knockout': {
            title: '🎮 Valorant Knockout',
            content: generateEventContent('Valorant Tournament', {
                time: '10:00 AM - 4:30 PM',
                prize: '₹1200',
                description: 'Show your tactical FPS skills in this intense Valorant tournament. Clutch or kick mentality required!',
                rules: [
                    '5v5 team matches',
                    'Best of 3 rounds in eliminations',
                    'Standard competitive rules apply',
                    'No cheating or exploits allowed'
                ],
                requirements: ['Own gaming setup or laptop', 'Stable internet connection', 'Valorant account required', 'Team of 5 players']
            })
        },
        'potion-matching': {
            title: '🧪 Potion Matching',
            content: generateEventContent('Potion Matching Game', {
                time: '10:00 AM onwards',
                prize: 'Fun & Entertainment',
                description: 'Test your memory and observation skills in this magical potion matching game. Can you remember the mysterious ingredients?',
                rules: [
                    'Individual participation',
                    'Match potion ingredients correctly',
                    'Time limits apply for each round',
                    'Multiple difficulty levels available'
                ],
                requirements: ['Sharp memory', 'Quick reflexes', 'No registration required', 'All ages welcome']
            })
        },
        'blindfolded-typing': {
            title: '⌨️ Blindfolded Typing Test',
            content: generateEventContent('Blindfolded Typing Challenge', {
                time: '11:00 AM - 4:30 PM',
                prize: 'Bragging Rights & Certificates',
                description: 'Type what you hear while blindfolded. A true test of your typing skills and auditory focus.',
                rules: [
                    'Individual competition',
                    'No peeking allowed',
                    'Accuracy more important than speed',
                    'Different difficulty levels'
                ],
                requirements: ['Basic typing skills', 'Good hearing', 'Steady nerves', 'Comfortable with blindfolds']
            })
        },
        'memory-game': {
            title: '🧠 Memory Challenge',
            content: generateEventContent('Memory Game', {
                time: '11:00 AM - 4:30 PM',
                prize: 'Mental Satisfaction & Prizes',
                description: 'Challenge your memory with increasingly difficult patterns and sequences. How far can your mind stretch?',
                rules: [
                    'Individual participation',
                    'Progressive difficulty levels',
                    'No external aids allowed',
                    'Three strikes and you\'re out'
                ],
                requirements: ['Sharp memory', 'Concentration skills', 'Patience', 'Competitive spirit']
            })
        },
        'movie-day-one': {
            title: '🎬 Movie Screening',
            content: generateEventContent('Movie Day', {
                time: '10:00 AM - 4:30 PM',
                prize: 'Entertainment & Relaxation',
                description: 'Relax and enjoy carefully selected movies with friends. Perfect for taking a break between other activities.',
                rules: [
                    'Open to all attendees',
                    'Maintain silence during screening',
                    'No outside food/drinks',
                    'Respect other viewers'
                ],
                requirements: ['No registration needed', 'Just bring yourself', 'Comfortable seating provided', 'Popcorn available for purchase']
            })
        },
        'valorant-finals': {
            title: '🏆 Valorant Finals',
            content: generateEventContent('Valorant Championship Finals', {
                time: '9:00 AM - 4:30 PM',
                prize: 'TBA - Grand Championship',
                description: 'The ultimate showdown between the best teams. Winner takes all in this epic finale.',
                rules: [
                    'Only qualified teams from Day 1',
                    'Best of 5 matches',
                    'Professional tournament format',
                    'Live commentary and streaming'
                ],
                requirements: ['Qualification from Day 1 required', 'High-level gameplay expected', 'Mental preparation essential']
            })
        },
        'relay-games': {
            title: '🏃‍♂️ Relay Games',
            content: generateEventContent('Team Relay Challenge', {
                time: '10:30 AM - 12:00 PM',
                prize: '₹1000',
                description: 'Multiple fun relay challenges that test teamwork, speed, and coordination. Perfect team bonding activity.',
                rules: [
                    'Teams of 6-8 members',
                    'Multiple relay stations',
                    'All team members must participate',
                    'Fastest completion wins'
                ],
                requirements: ['Athletic wear recommended', 'Team registration required', 'High energy and enthusiasm']
            })
        },
        'poster-making': {
            title: '🎨 Poster Making',
            content: generateEventContent('Creative Poster Competition', {
                time: '11:00 AM - 1:00 PM',
                prize: '₹600',
                description: 'Create spine-chilling Halloween-themed posters. Let your artistic creativity run wild with spooky themes.',
                rules: [
                    'Individual or pair participation',
                    'Halloween theme mandatory',
                    'All materials provided',
                    'Original artwork only'
                ],
                requirements: ['Artistic skills helpful but not mandatory', 'Creative mindset', 'Halloween theme knowledge']
            })
        },
        'escape-room-day-two': {
            title: '🔓 Escape Room Challenge',
            content: generateEventContent('Escape Room Experience', {
                time: '12:00 PM - 1:30 PM & 1:30 PM - 4:30 PM',
                prize: '₹1000',
                description: 'Work together to solve puzzles and escape before time runs out. Multiple themed rooms with different difficulty levels.',
                rules: [
                    'Teams of 4-6 players',
                    '45-minute time limit per room',
                    'No external help allowed',
                    'Teamwork is essential'
                ],
                requirements: ['Problem-solving skills', 'Team coordination', 'No claustrophobia', 'Reservation required']
            })
        },
        'movie-trivia': {
            title: '🎭 Movie Trivia',
            content: generateEventContent('Horror Movie Trivia', {
                time: '1:30 PM - 2:30 PM',
                prize: 'Knowledge & Fun',
                description: 'Test your horror movie knowledge in this spine-tingling trivia session. From classics to modern scares.',
                rules: [
                    'Individual or team participation',
                    'Multiple choice and open questions',
                    'Horror movie focus',
                    'No phone/internet assistance'
                ],
                requirements: ['Horror movie knowledge', 'Quick thinking', 'Competitive spirit', 'Love for cinema']
            })
        },
        'costume-party': {
            title: '👻 Grand Costume Party',
            content: generateEventContent('Halloween Costume Contest', {
                time: '2:30 PM - 6:00 PM',
                prize: '₹1200',
                description: 'The main event! Show off your most creative and terrifying costumes. Multiple categories and prizes.',
                rules: [
                    'Individual participation',
                    'Multiple judging categories',
                    'Stage performance encouraged',
                    'Appropriate costumes only'
                ],
                requirements: ['Creative costume', 'Confidence to perform', 'Halloween spirit', 'Registration at venue']
            })
        }
    };

    // Event button click handlers
    document.querySelectorAll('.event-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const eventCard = btn.closest('.event-card');
            if (eventCard) {
                const eventType = eventCard.getAttribute('data-event');
                openModal(eventDetails[eventType], modal, modalTitle, modalContent);
            }
        });
    });

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    function closeModalFunction() {
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.animation = '';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
}

// Generate event content dynamically
function generateEventContent(title, details) {
    return `
        <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">🎯 ${details.prize}</h3>
        <div style="text-align: left; margin-bottom: 1rem;">
            <p><strong>⏰ Time:</strong> ${details.time}</p>
            <p><strong>📍 Description:</strong> ${details.description}</p>
        </div>
        <div style="text-align: left; margin-bottom: 1rem;">
            <p><strong>📋 Rules:</strong></p>
            <ul style="margin-left: 1rem; opacity: 0.9;">
                ${details.rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        </div>
        <div style="text-align: left; margin-bottom: 1rem;">
            <p><strong>✅ Requirements:</strong></p>
            <ul style="margin-left: 1rem; opacity: 0.9;">
                ${details.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        <p><strong>📞 Contact:</strong> Event Coordinators - Check contact section</p>
    `;
}

// Open modal with enhanced animations
function openModal(eventData, modal, modalTitle, modalContent) {
    if (eventData && modal && modalTitle && modalContent) {
        modalTitle.innerHTML = eventData.title;
        modalContent.innerHTML = eventData.content;
        modal.style.display = 'block';
        modal.style.animation = 'fadeIn 0.3s ease';
        document.body.style.overflow = 'hidden';
        
        // Add focus to close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }
}

// Enhanced scroll elements with smooth animations
function setupScrollElements() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;

    let scrollProgress = 0;
    
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = (scrollTop / docHeight) * 100;
        
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
            updateScrollProgress(scrollTopBtn, scrollProgress);
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 10));

    scrollTopBtn.addEventListener('click', () => {
        smoothScrollToTop();
    });
}

// Update scroll progress indicator
function updateScrollProgress(button, progress) {
    button.style.background = `conic-gradient(var(--primary-orange) ${progress * 3.6}deg, var(--primary-purple) 0deg)`;
}

// Smooth scroll to top with easing
function smoothScrollToTop() {
    const duration = 800;
    const start = window.pageYOffset;
    const startTime = performance.now();
    
    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, start * (1 - easeOutCubic));
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

// Enhanced smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                smoothScrollToElement(target);
            }
        });
    });
}

// Smooth scroll to element with offset for fixed navbar
function smoothScrollToElement(target) {
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Enhanced section reveal animations with stagger effect
function setupSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    animateElementChildren(entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

// Animate children elements with stagger effect
function animateElementChildren(element) {
    const children = element.querySelectorAll('.event-card, .contact-card, .footer-detail');
    children.forEach((child, index) => {
        setTimeout(() => {
            child.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 50);
    });
}

// Setup contact cards with enhanced interactivity
function setupContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        // Add hover sound effects
        card.addEventListener('mouseenter', () => {
            if (soundEnabled) {
                playSpookySoundEffect('hover');
            }
            
            // Add particle effect
            createContactCardParticles(card);
        });
        
        // Add click analytics (if needed)
        card.addEventListener('click', (e) => {
            const cardType = card.querySelector('.contact-title')?.textContent;
            console.log(`Contact card clicked: ${cardType}`);
            
            if (soundEnabled) {
                playSpookySoundEffect('click');
            }
        });
    });
}

// Create particle effects for contact cards
function createContactCardParticles(card) {
    const rect = card.getBoundingClientRect();
    const particles = 3;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-orange);
            border-radius: 50%;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.8;
            animation: particle-float 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
}

// Enhanced Easter eggs and interactive elements
function setupEasterEggs() {
    // Custom cursor trail with performance optimization
    let trailTimeout;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {
            if (Math.random() < 0.03) {
                createGhostTrail(e.clientX, e.clientY);
            }
        }, 16); // ~60fps limit
    });

    // Enhanced click easter eggs
    document.addEventListener('click', (e) => {
        if (Math.random() < 0.02) {
            createFlyingBat(e.clientX, e.clientY);
            clickCount++;
            
            if (clickCount === 10) {
                showEasterEggMessage();
                clickCount = 0;
            }
        }
    });

    // Floating CTA enhanced animation
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        floatingCTA.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(10deg)';
            
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
                this.style.transform = '';
            }, 300);
        });
    }

    // Enhanced spooky sound interactions
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (soundEnabled && Math.random() < 0.3) {
                playSpookySoundEffect('hover');
            }
        });
    });

    document.querySelectorAll('.event-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (soundEnabled) {
                playSpookySoundEffect('click');
            }
        });
    });

    // Secret konami code easter egg
    setupKonamiCode();
}

// Setup Konami Code easter egg
function setupKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Activate Konami Code easter egg
function activateKonamiEasterEgg() {
    const specialMessage = document.createElement('div');
    specialMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary-purple), var(--blood-red));
        padding: 2rem;
        border-radius: 20px;
        border: 3px solid var(--primary-orange);
        color: white;
        text-align: center;
        z-index: 10001;
        animation: specialGlow 2s ease-in-out infinite alternate;
        max-width: 90%;
    `;

    specialMessage.innerHTML = `
        <h2 style="font-family: 'Creepster', cursive; margin-bottom: 1rem;">🎮 CHEAT CODE ACTIVATED! 🎮</h2>
        <p style="margin-bottom: 1rem;">You've unlocked the secret developer mode!</p>
        <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem;">Extra spooky effects enabled for 30 seconds!</p>
        <button onclick="this.parentElement.remove(); document.body.style.overflow = 'auto';" 
                style="background: var(--primary-orange); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
            Awesome! 🚀
        </button>
    `;

    document.body.style.overflow = 'hidden';
    document.body.appendChild(specialMessage);

    // Activate special effects
    activateSpecialEffects();

    setTimeout(() => {
        if (specialMessage.parentNode) {
            specialMessage.remove();
            document.body.style.overflow = 'auto';
        }
    }, 10000);
}

// Activate special visual effects
function activateSpecialEffects() {
    const originalTitle = document.title;
    document.title = '🎃 SPOOKY MODE ACTIVATED! 🎃';
    
    // Add rainbow effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.animation = 'rainbow-text 1s linear infinite';
    }
    
    // Create multiple flying bats
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFlyingBat(Math.random() * window.innerWidth, Math.random() * 100);
        }, i * 1000);
    }
    
    setTimeout(() => {
        document.title = originalTitle;
        if (mainTitle) {
            mainTitle.style.animation = 'flicker 3s ease-in-out infinite alternate';
        }
    }, 30000);
}

// Enhanced parallax effects with performance optimization
function setupParallaxEffects() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const moon = document.querySelector('.moon');
    const stars = document.querySelector('.stars');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        if (parallaxBg && !document.body.classList.contains('light-mode')) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (moon && !document.body.classList.contains('light-mode')) {
            moon.style.transform = `translateY(${scrolled * 0.2}px) scale(1)`;
        }

        if (stars && !document.body.classList.contains('light-mode')) {
            stars.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Enhanced user preferences loading
function loadUserPreferences() {
    const moonElement = document.getElementById('moon');
    const stars = document.querySelector('.stars');
    const creepyImages = document.getElementById('creepyImages');
    
    // Load theme preference
    const savedTheme = localStorage.getItem('halloweenTheme');
    if (savedTheme === 'light') {
        isDarkMode = false;
        applyLightTheme(moonElement, stars, creepyImages);
    } else {
        isDarkMode = true;
        applyDarkTheme(moonElement, stars, creepyImages);
    }

    // Load sound preference
    const savedSoundSetting = localStorage.getItem('soundEnabled');
    applySoundSetting(savedSoundSetting);
    
    // Load other user preferences
    loadAccessibilityPreferences();
}

// Apply light theme settings
function applyLightTheme(moonElement, stars, creepyImages) {
    document.body.classList.add('light-mode');
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.textContent = '☀️';
    
    if (moonElement) {
        moonElement.style.opacity = '0';
        moonElement.style.transform = 'scale(0)';
    }
    if (stars) stars.style.opacity = '0';
    if (creepyImages) creepyImages.style.opacity = '1';
    
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    if (mainTitle) mainTitle.style.color = "#8b0000";
    if (subtitle) subtitle.style.color = "#8b0000";
}

// Apply dark theme settings
function applyDarkTheme(moonElement, stars, creepyImages) {
    if (moonElement) {
        moonElement.style.opacity = '1';
        moonElement.style.transform = 'scale(1)';
    }
    if (stars) stars.style.opacity = '1';
    if (creepyImages) creepyImages.style.opacity = '0';
}

// Apply sound settings
function applySoundSetting(savedSoundSetting) {
    const soundIcon = document.querySelector('.sound-icon');
    if (!soundIcon) return;
    
    if (savedSoundSetting === 'true') {
        soundEnabled = true;
        soundIcon.textContent = '🔊';
    } else if (savedSoundSetting === 'false') {
        soundEnabled = false;
        soundIcon.textContent = '🔇';
    }
}

// Load accessibility preferences
function loadAccessibilityPreferences() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        console.log('Reduced motion preferences detected and applied');
    }
}

// Enhanced utility functions

// Create enhanced ghost trail
function createGhostTrail(x, y) {
    if (ghostTrails.length > 8) {
        const oldTrail = ghostTrails.shift();
        if (oldTrail?.parentNode) {
            oldTrail.remove();
        }
    }

    const trail = document.createElement('div');
    const size = Math.random() * 6 + 4; // 4-10px size
    const colors = ['var(--primary-orange)', 'var(--primary-purple)', 'var(--blood-red)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    trail.style.cssText = `
        position: fixed;
        left: ${x - size/2}px;
        top: ${y - size/2}px;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: ghost-fade 1.5s ease-out forwards;
        box-shadow: 0 0 ${size*2}px ${randomColor};
    `;

    document.body.appendChild(trail);
    ghostTrails.push(trail);

    setTimeout(() => {
        if (trail.parentNode) {
            trail.remove();
            ghostTrails = ghostTrails.filter(t => t !== trail);
        }
    }, 1500);
}

// Create enhanced flying bat
function createFlyingBat(x, y) {
    const bat = document.createElement('div');
    const batEmojis = ['🦇', '👻', '🎃'];
    const randomBat = batEmojis[Math.floor(Math.random() * batEmojis.length)];
    
    bat.innerHTML = randomBat;
    bat.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 1 + 1.5}rem;
        pointer-events: none;
        z-index: 9999;
        color: var(--primary-orange);
        animation: fly-realistic ${Math.random() * 2 + 4}s linear forwards;
        text-shadow: 0 0 10px var(--primary-orange);
    `;

    document.body.appendChild(bat);

    setTimeout(() => {
        if (bat.parentNode) {
            bat.remove();
        }
    }, 6000);
}

// Enhanced easter egg message
function showEasterEggMessage() {
    const easterEggModal = document.createElement('div');
    easterEggModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--shadow-black), var(--card-bg));
        padding: 2rem;
        border-radius: 20px;
        border: 2px solid var(--primary-orange);
        color: var(--text-primary);
        text-align: center;
        z-index: 10000;
        max-width: 90%;
        animation: modal-slide-in 0.3s ease, glow-pulse 2s ease-in-out infinite alternate;
        backdrop-filter: blur(15px);
        box-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
    `;

    const secretMessages = [
        "You found the hidden bat easter egg!",
        "A true ghost hunter never gives up!",
        "The spirits have noticed your dedication!",
        "Your supernatural senses are tingling!",
        "You've awakened the ancient curse!"
    ];
    
    const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];

    easterEggModal.innerHTML = `
        <h2 style="color: var(--primary-orange); margin-bottom: 1rem; font-family: 'Creepster', cursive;">🦇 Secret Discovered!</h2>
        <p style="margin-bottom: 1rem;">${randomMessage}</p>
        <p style="opacity: 0.8; font-size: 0.9rem; margin-bottom: 1.5rem;">You have a keen eye for the supernatural! 👁️</p>
        <div style="margin-bottom: 1rem;">
            <div style="font-size: 2rem;">🎃👻🦇💀🕷️</div>
        </div>
        <button onclick="this.parentElement.remove(); document.body.style.overflow = 'auto';" 
                style="background: linear-gradient(135deg, var(--primary-orange), var(--blood-red)); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
            Spooky! 👻
        </button>
    `;

    document.body.style.overflow = 'hidden';
    document.body.appendChild(easterEggModal);

    // Add special effects
    createBatchBats();

    setTimeout(() => {
        if (easterEggModal.parentNode) {
            easterEggModal.remove();
            document.body.style.overflow = 'auto';
        }
    }, 8000);
}

// Create batch of flying bats
function createBatchBats() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFlyingBat(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5
            );
        }, i * 500);
    }
}

// Enhanced spooky sound effects
function playSpookySoundEffect(type) {
    if (!soundEnabled) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'hover':
                oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'click':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            default:
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
        }
    } catch (e) {
        console.log('Web Audio API not supported:', e);
    }
}

// Play spooky sound wrapper
function playSpookySound() {
    playSpookySoundEffect('default');
}

// Enhanced debounce function
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Display enhanced console message
function displayConsoleMessage() {
    const styles = {
        title: 'color: #ff6b35; font-size: 16px; font-weight: bold;',
        subtitle: 'color: #6a0572; font-size: 12px;',
        text: 'color: #8b0000; font-size: 11px;'
    };

    console.log('%c🎃👻🦇 WELCOME TO THE AIKYA HALLOWEEN EVENT 🦇👻🎃', styles.title);
    console.log(`
      |\\      _,,,---,,_
ZZZzz /,\\.̨-'\\    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \\'-'
    '---''(_/--'  \\-'\\_)
    `);
    console.log('%cThe spirits whisper: "The website holds dark secrets..."', styles.subtitle);
    console.log('%cKeep clicking around the page... you might find something spooky! 🦇', styles.text);
    console.log('%cTry the sound toggle for an atmospheric experience! 🔊', styles.text);
    console.log('%cTip: Try the Konami Code (↑↑↓↓←→←→BA) for a special surprise!', styles.text);
    console.log('%cHappy Halloween! 🎃', styles.title);
}

// Add enhanced CSS animations
function addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ghost-fade {
            to { 
                opacity: 0; 
                transform: scale(3) translateY(-30px); 
            }
        }
        
        @keyframes particle-float {
            to {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes ripple-expand {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes rainbow-text {
            0% { color: #ff6b35; }
            16% { color: #ff0080; }
            33% { color: #8000ff; }
            50% { color: #0080ff; }
            66% { color: #00ff80; }
            83% { color: #80ff00; }
            100% { color: #ff6b35; }
        }
        
        @keyframes specialGlow {
            from { box-shadow: 0 0 20px var(--primary-orange); }
            to { box-shadow: 0 0 40px var(--primary-orange), 0 0 60px var(--blood-red); }
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
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .theme-transition {
            transition: all 0.5s ease !important;
        }
        
        .nav-links a.active {
            color: var(--primary-orange) !important;
            transform: translateY(-2px);
        }
        
        .nav-links a.active::before {
            width: 80% !important;
        }
        
        /* Enhanced hover effects */
        .event-card:hover .event-img img {
            filter: brightness(1.2) contrast(1.3) saturate(1.3);
        }
        
        .event-btn:hover {
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        .time-unit:hover::after {
            transform: translateX(100%);
        }
        
        /* Performance optimizations */
        .parallax-bg,
        .moon,
        .stars {
            will-change: transform;
        }
        
        .event-card {
            will-change: transform, box-shadow;
        }
    `;
    document.head.appendChild(style);
}

// Performance monitoring and optimization
function setupPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`🚀 Page loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Page load time is high. Consider optimizing images and scripts.');
                }
                
                // Report performance metrics
                reportPerformanceMetrics(loadTime);
            }, 0);
        });
    }
}

// Report performance metrics
function reportPerformanceMetrics(loadTime) {
    const metrics = {
        loadTime,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timestamp: new Date().toISOString()
    };
    
    console.log('Performance metrics:', metrics);
}

// Setup error handling
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        if (e.target?.tagName === 'AUDIO') {
            console.log('Audio loading failed, but site will continue to work normally.');
            const soundIcon = document.querySelector('.sound-icon');
            if (soundIcon) {
                soundIcon.textContent = '🔇';
            }
            soundEnabled = false;
        } else {
            console.error('JavaScript error:', e.error);
        }
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Setup visibility change handling
function setupVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        const backgroundAudio = document.getElementById('backgroundAudio');
        if (backgroundAudio && soundEnabled) {
            if (document.hidden) {
                backgroundAudio.pause();
            } else {
                backgroundAudio.play().catch(e => console.log('Audio resume failed:', e));
            }
        }
    });
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
        
        // Alt + S for sound toggle
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const soundToggle = document.getElementById('soundToggle');
            if (soundToggle) soundToggle.click();
        }
        
        // Alt + H for home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Escape to close any open modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                const closeBtn = openModal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
    });
}

// Initialize additional features
function initializeAdditionalFeatures() {
    addEnhancedStyles();
    setupPerformanceMonitoring();
    setupErrorHandling();
    setupVisibilityHandling();
    setupKeyboardShortcuts();
}

// Call additional initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeAdditionalFeatures, 100);
});