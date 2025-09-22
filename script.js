// Halloween Event Website JavaScript - Performance Optimized with All Features
// Optimized for smoothness while maintaining all functionality

// Efficient image preloading - only critical images
const criticalImages = [
  "asserts/Adobe Express - file.webp"
];

// Preload critical images only
criticalImages.forEach(src => {
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
let animationFrameId = null;
let isScrolling = false;

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
    setupKeyboardShortcuts();
    setupVisibilityHandling();
    setupErrorHandling();
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
        }, 1500); // Reduced from 2000ms but kept reasonable
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

// Countdown Timer with enhanced functionality - optimized
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
                    animateNumberChangeOptimized(element, values[key]);
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
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Optimized number change animation
function animateNumberChangeOptimized(element, newValue) {
    if (!element) return;
    
    const currentValue = element.textContent;
    const formattedNewValue = newValue.toString().padStart(2, '0');
    
    if (currentValue !== formattedNewValue) {
        // Use CSS transforms for better performance
        element.style.transform = 'scale(1.15)';
        element.style.color = 'var(--primary-orange)';
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '#ffffff';
            }, 300);
        });
        
        // Create optimized ripple effect
        if (Math.random() < 0.3) { // Reduced frequency for performance
            createOptimizedRippleEffect(element);
        }
    }
}

// Optimized ripple effect
function createOptimizedRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, var(--primary-orange) 0%, transparent 70%);
        width: 80px;
        height: 80px;
        left: ${rect.left + rect.width / 2 - 40}px;
        top: ${rect.top + rect.height / 2 - 40}px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.6;
        transform: scale(0);
        transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    // Trigger animation
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
    });
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Enhanced Navigation functionality - optimized
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    // Throttled scroll handler for better performance
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        // Add background blur effect based on scroll
        const opacity = Math.min(scrollTop / 100, 0.95);
        navbar.style.background = document.body.classList.contains('light-mode') 
            ? `rgba(255, 255, 255, ${opacity})` 
            : `rgba(10, 10, 10, ${opacity})`;
        
        lastScrollTop = scrollTop;
    }, 16)); // ~60fps

    // Add active state to navigation links
    updateActiveNavLink();
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
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

// Enhanced Theme Toggle with smooth transitions - optimized
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

        // Animate theme elements - optimized
        animateThemeChangeOptimized(moonElement, stars, parallaxBg, mainTitle, subtitle, creepyImages);

        // Store preference
        localStorage.setItem('halloweenTheme', isDarkMode ? 'dark' : 'light');
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
}

// Optimized theme change animations
function animateThemeChangeOptimized(moonElement, stars, parallaxBg, mainTitle, subtitle, creepyImages) {
    // Use CSS properties for better performance
    if (!isDarkMode) {
        // Light mode animations
        if (parallaxBg) {
            parallaxBg.style.opacity = '0';
            setTimeout(() => {
                parallaxBg.style.display = "none";
            }, 300);
        }

        if (moonElement) {
            moonElement.style.opacity = '0';
            moonElement.style.transform = 'scale(0)';
        }

        if (stars) {
            stars.style.opacity = '0';
        }

        if (mainTitle) mainTitle.style.color = "#8b0000";
        if (subtitle) subtitle.style.color = "#8b0000";
        
        if (creepyImages) {
            creepyImages.style.opacity = "1";
            animateCreepyImagesOptimized();
        }
    } else {
        // Dark mode animations
        if (parallaxBg) {
            parallaxBg.style.display = "block";
            requestAnimationFrame(() => {
                parallaxBg.style.opacity = '1';
            });
        }

        if (moonElement) {
            moonElement.style.opacity = '1';
            moonElement.style.transform = 'scale(1)';
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

// Optimized creepy images animation
function animateCreepyImagesOptimized() {
    const images = document.querySelectorAll('.creepy-img');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.animation = 'float-creepy 6s ease-in-out infinite';
        }, index * 100); // Reduced delay
    });
}

// Enhanced Sound Control with audio visualization - optimized
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
            animateSoundControlOptimized(soundToggle, true);
        } else {
            backgroundAudio.pause();
            animateSoundControlOptimized(soundToggle, false);
        }
        
        localStorage.setItem('soundEnabled', soundEnabled.toString());
    });

    if (backgroundAudio) {
        backgroundAudio.volume = 0.3;
        
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

// Optimized sound control animation
function animateSoundControlOptimized(element, enabled) {
    element.style.transform = 'scale(1.2)';
    element.style.background = enabled ? 'var(--whatsapp-green)' : 'var(--blood-red)';
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.background = '';
        }, 200);
    });
}

// Enhanced Modal System with better event handling - optimized
function setupModalSystem() {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.modal-close');

    // Enhanced event details data
    const eventDetails = {
        'quidditch-game': {
            title: '🧙‍♂️ Quidditch Game',
            registrationLink: 'https://forms.gle/MoUnUSerwcaEeLfN9',
            content: generateEventContent('Quidditch Game', {
                time: '10:30 AM - 1:30 PM',
                prize: '₹1000',
                description: 'Experience the magical sport of Quidditch in real life! Teams will compete in this exciting game of strategy and skill.',
                rules: [
                    'Teams of 5 players (2 Keepers + 3 Chasers).',
                    'No actual flying – safety first!',
                    'Best of 5 goals or most points in 5 mins.',
                    'Fair play and sportsmanship required.'
                ],
                requirements: [
                    'One registration per team (5 players).',
                    'Arrive on time with proper sports attire.',
                    'No physical harm or foul play allowed.'
                ],
                venue : 'IT Block Lawn'
            })
        },
        'treasure-hunt': {
            title: '🗺️ Treasure Hunt',
            registrationLink : 'https://docs.google.com/forms/d/e/1FAIpQLScY9cF6NLQ2TL2Wga_bxsvNmQqGEGSX94KsKWC9_Qh-Ov9iPw/viewform?usp=header',
            content: generateEventContent('Treasure Hunt', {
                time: '10:00 AM - 12:30 PM',
                prize: '₹1200',
                description: 'Follow mysterious clues across the campus to uncover hidden treasures. A test of wit, teamwork, and perseverance.',
                rules: [
                    'Teams of 4 members',
                    'All clues must be solved in sequence',
                    'No internet or phone assistance',
                    'First team to find final treasure wins'
                ],
                requirements: ['Registration deadline: Day before event', 'Team captain must be present'],
                venue : 'IT Block Lawn and Whole Campus'
            })
        },
        'valorant-knockout': {
            title: '🎮 Valorant Knockout',
            registrationLink : 'https://docs.google.com/forms/d/e/1FAIpQLScY9cF6NLQ2TL2Wga_bxsvNmQqGEGSX94KsKWC9_Qh-Ov9iPw/viewform?usp=header',
            content: generateEventContent('Valorant Tournament', {
                time: '10:00 AM - 4:30 PM',
                prize: '₹1000',
                description: 'Show your tactical FPS skills in this intense Valorant tournament. Clutch or kick mentality required!',
                rules: [
                    'Type: Knockout (Single Elimination only 1 match per round)',
                    'Match Mode: Custom Unrated (Standard)',
                    'Win Condition: First to 13 rounds (If 12-12 → Sudden Death decides winner)'
                ],
                requirements: ['Use only registered accounts',
                                'No cheating or smurfing',
                                'No abusive or toxic behavior',
                                'Rule violations lead to disqualification'],
                venue : 'ITE Block - 208/311 Labs'
            })
        },
        'potion-matching': {
            title: '🧪 Potion Matching',
            registrationLink : 'https://docs.google.com/forms/d/e/1FAIpQLSdiI8BBsGx68kNoe0Fy3VuTQdzYz6Ls75mWq-oOYY0pKe0D0A/viewform?usp=header',
            content: generateEventContent('Potion Matching Game', {
                time: '11:00 AM onwards',
                prize: 'Fun & Entertainment',
                description: 'Test your memory and observation skills in this magical potion matching game. Can you remember the mysterious ingredients?',
                rules: [
                'Teams must have 2 members',
                'One participant will guide, the other will match without seeing',
                'Unlimited registrations allowed'],
                requirements : ['None'],
                venue : 'IT Block - Room 306 '
            })

        },
        'blindfolded-typing': {
            title: '⌨️ Blindfolded Typing Test',
            registrationLink : 'https://forms.gle/11jU7mqWuYRBq1Ft5',
            content: generateEventContent('Blindfolded Typing Challenge', {
                time: '10:00 AM - 2:30 PM',
                prize: 'Bragging Rights & Certificates',
                description: 'Type what you hear while blindfolded. A true test of your typing skills and auditory focus.',
                rules: [
                    'Individual participation only',
                    'Blindfolds will be provided',
                    'Dictation will be the same for all participants',
                    'Judging based on accuracy, speed & creativity of errors'
                ],
                requirements : ['None'],
                venue : 'IT Block - 303 & 304 Labs'
            })

        },
        'memory-game': {
            title: '🧠 Memory Challenge',
            registrationLink : 'https://forms.gle/PMEpFnGq8N3ppT7Z8',
            content: generateEventContent('Memory Game', {
                time: '11:00 AM - 4:30 PM',
                prize: 'Mental Satisfaction & Prizes',
                description: 'Challenge your memory with increasingly difficult patterns and sequences. How far can your mind stretch?',
                rules: [
                    'Individual participation',
                    'Progressive difficulty levels',
                    'No external aids allowed'
                ],
                requirements : ['None'],
                venue : 'IT Block - Rooms 205 & 206'
            })
        },
        'movie-day-one': {
            title: '🎬 Yeh Jawaani Hai Deewani',
            registrationLink : 'https://docs.google.com/forms/d/e/1FAIpQLSfHKywIcYbj31Y5VN2_i_G9exJ6aKh4MR8w2HJuLHRQvqeRXA/viewform?usp=dialog',
            content: generateEventContent('Movie Day', {
                time: '11:00 AM - 1:30 PM',
                prize: 'Entertainment & Relaxation',
                description: 'A fun, adventurous journey of friendship, love, and chasing dreams.',
                rules: [
                    'Open to all attendees',
                    'Maintain silence during screening',
                    'No outside food/drinks',
                    'Respect other viewers'
                ],
                requirements: ['Mute your phones', 'present 5 min before movie starts','don\'t walk in/out during movie'],
                venue : 'Edusat Hall'
            })
        },
        'movie-day-two': {
            title: '🎬 Lights Out',
            registrationLink : 'https://docs.google.com/forms/d/e/1FAIpQLSfExWAwFi0WIbgJb54K6_nQNQenJGkuEBIKwCu4L_SmpA8Djw/viewform?usp=header',
            content: generateEventContent('Movie Day', {
                time: '11:00 AM - 1:30 PM',
                prize: 'Entertainment & Relaxation',
                description: 'A family is terrorized by a sinister entity that attacks when the lights go out',
                rules: [
                    'Open to all attendees',
                    'Maintain silence during screening',
                    'No outside food/drinks',
                    'Respect other viewers'
                ],
                requirements: ['Mute your phones', 'present 5 min before movie starts','don\'t walk in/out during movie'],
                venue : 'Edusat Hall'
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
                requirements: ['Qualification from Day 1 required', 'High-level gameplay expected', 'Mental preparation essential'],
                venue : 'IT Block 208/311 Lab'
            })
        },
        'relay-games': {
            title: '🏃‍♂️ Relay Games',
            registrationLink : 'https://forms.gle/71qkstAYBKrjrcbF6',
            content: generateEventContent('Team Relay Challenge', {
                time: '10:30 AM - 12:00 PM',
                prize: '₹1000',
                description: 'Multiple fun relay challenges that test teamwork, speed, and coordination. Perfect team bonding activity.',
                rules: [
                    'Teams must have exactly 5 members.',
                    'All tasks are completed in relay format.',
                    'Teamwork, creativity, and coordination matter more than speed.',
                    'Multiple relay stations.',
                    'All team members must participate.',
                    'Fastest completion wins.'
                ],
               requirements: [
                    'All team members must register.',
                    'Arrive 10 mins before start.',
                    'No outside help or devices.'
            ],
                venue : 'Gallery'
            })
        },
        'poster-making': {
            title: '🎨 Poster Making',
            registrationLink : 'https://forms.gle/5u4B4Kx8uCzCQyxF9',
            content: generateEventContent('Creative Poster Competition', {
                time: '12:00 PM - 1:30 PM',
                prize: '₹600',
                description: 'Create spine-chilling Halloween-themed posters. Let your artistic creativity run wild with spooky themes.',
                rules: [
                    'Prompt revealed at event start',
                    'Design posters in Canva; templates allowed',
                    'Originality & creativity prioritized',
                    'Submit in specified format (PNG/PDF)'
                ],
                requirements: [
                'Team of 2 members',
                'Bring your own laptop',
                'Creative mindset; artistic skills helpful but not mandatory',
                'Know the Halloween theme',
                'No AI tools; maintain professionalism'
                ],
                venue : 'IT Block 305/306 Room'
            })
        },
        'escape-room-day-two': {
            title: '🔓 Escape Room Challenge',
            registrationLink : 'https://forms.gle/FcZoBtDEoe4PtGmp8',
            content: generateEventContent('Escape Room Experience', {
                time: '12:00 PM - 1:30 PM',
                prize: '₹1000',
                description: 'Work together to solve puzzles and escape before time runs out. Multiple themed rooms with different difficulty levels.',
                rules: [
                    'Teams must have 3 members.',
                    'Respect volunteers; arguing may lead to disqualification.',
                    'Solve puzzles calmly; aggressive behavior leads to disqualification.',
                    'Handle props carefully.',
                    'Follow instructions; they won\'t be repeated.'
                ],
                requirements: [
                    'Each team must register before the game.',
                    'All members must be present on time.',
                    'No outside help or mobile devices allowed.'
                ],
                venue : 'IT Block 201,202,203,204,205 Rooms'
            })
        },
        'movie-trivia': {
            title: '🎭 Movie Trivia',
            registrationLink : 'https://forms.gle/eiybK5vrvoBpJg5e9',
            content: generateEventContent('Horror Movie Trivia', {
                time: '10:00 PM - 11:00 PM',
                prize: 'Knowledge & Fun',
                description: 'Test your horror movie knowledge in this spine-tingling trivia session. From classics to modern scares.',
                rules: [
                    'You\'ll be shown fun clues like emoji puzzles, mysterious scenes, or iconic characters.',
                    'Guess the correct movie based on the clues.',
                    'Work as a team to discuss and answer.',
                    'No use of mobile phones or external help.'
                ],
                requirements: [
                    'Teams of 2 members.',
                    'All members must register before the game.',
                    'Arrive on time and be ready to participate.'
                ],
                venue : 'Edusat Hall'
            })
        },
        'costume-party': {
            title: '👻 Grand Costume Party',
            registrationLink : 'https://forms.gle/mq6PA1p8aUFdZK3H9',
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
                requirements: ['Creative costume', 'Confidence to perform', 'Halloween spirit'],
                venue : 'Edusat Hall'
            })
        }
    };

    // Optimized event button click handlers - using event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('event-btn')) {
            e.stopPropagation();
            const eventCard = e.target.closest('.event-card');
            if (eventCard) {
                const eventType = eventCard.getAttribute('data-event');
                if (eventDetails[eventType]) {
                    openModal(eventDetails[eventType], modal, modalTitle, modalContent);
                }
            }
        }
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
            <p><strong>📍 Venue:</strong> ${details.venue}</p>
            <p><strong>📋 Description:</strong> ${details.description}</p>
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

        // Set registration button dynamically
        const registrationBtn = modal.querySelector('.modal-btn');
        if (registrationBtn) {
            if (eventData.registrationLink) {
                registrationBtn.style.display = 'block';
                registrationBtn.onclick = () => window.open(eventData.registrationLink, '_blank');
            } else {
                registrationBtn.style.display = 'none';
            }
        }

        // Focus close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }
}

// Enhanced scroll elements with smooth animations - optimized
function setupScrollElements() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;

    let scrollProgress = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = (scrollTop / docHeight) * 100;
        
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
            updateScrollProgressOptimized(scrollTopBtn, scrollProgress);
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 16)); // ~60fps

    scrollTopBtn.addEventListener('click', () => {
        smoothScrollToTop();
    });
}

// Optimized scroll progress indicator
function updateScrollProgressOptimized(button, progress) {
    // Use CSS custom properties for better performance
    button.style.setProperty('--progress', `${progress * 3.6}deg`);
    button.style.background = `conic-gradient(var(--primary-orange) var(--progress), var(--primary-purple) 0deg)`;
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
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                smoothScrollToElement(target);
            }
        }
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

// Enhanced section reveal animations with stagger effect - optimized
function setupSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        animateElementChildrenOptimized(entry.target);
                    }, index * 50); // Reduced delay
                });
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

// Optimized children animation
function animateElementChildrenOptimized(element) {
    const children = element.querySelectorAll('.event-card, .contact-card, .footer-detail');
    children.forEach((child, index) => {
        setTimeout(() => {
            child.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 25); // Reduced delay for smoother effect
    });
}

// Setup contact cards with enhanced interactivity - optimized
function setupContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        // Add hover sound effects with throttling
        card.addEventListener('mouseenter', throttle(() => {
            if (soundEnabled && Math.random() < 0.2) { // Reduced frequency for performance
                playSpookySoundEffect('hover');
            }
            
            // Add optimized particle effect
            createContactCardParticlesOptimized(card);
        }, 200));
        
        // Add click analytics
        card.addEventListener('click', (e) => {
            const cardType = card.querySelector('.contact-title')?.textContent;
            console.log(`Contact card clicked: ${cardType}`);
            
            if (soundEnabled) {
                playSpookySoundEffect('click');
            }
        });
    });
}

// Optimized particle effects for contact cards
function createContactCardParticlesOptimized(card) {
    const rect = card.getBoundingClientRect();
    const particles = 2; // Reduced for performance
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--primary-orange);
            border-radius: 50%;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.6;
            transform: scale(0);
            transition: transform 0.8s ease-out, opacity 0.8s ease-out;
        `;
        
        document.body.appendChild(particle);
        
        // Trigger animation
        requestAnimationFrame(() => {
            particle.style.transform = 'translateY(-30px) scale(1)';
            particle.style.opacity = '0';
        });
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 800);
    }
}

// Enhanced Easter eggs and interactive elements - optimized
function setupEasterEggs() {
    // Optimized cursor trail with performance optimization
    let trailTimeout;
    document.addEventListener('mousemove', throttle((e) => {
        if (Math.random() < 0.02) { // Reduced frequency
            createGhostTrailOptimized(e.clientX, e.clientY);
        }
    }, 32)); // Reduced frequency for better performance

    // Enhanced click easter eggs
    document.addEventListener('click', (e) => {
        if (Math.random() < 0.015) { // Slightly reduced frequency
            createFlyingBatOptimized(e.clientX, e.clientY);
            clickCount++;
            
            if (clickCount === 8) { // Reduced threshold
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
        card.addEventListener('mouseenter', throttle(() => {
            if (soundEnabled && Math.random() < 0.1) { // Reduced frequency
                playSpookySoundEffect('hover');
            }
        }, 300));
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
    for (let i = 0; i < 3; i++) { // Reduced for performance
        setTimeout(() => {
            createFlyingBatOptimized(Math.random() * window.innerWidth, Math.random() * 100);
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
    const parallaxElements = {
        bg: document.querySelector('.parallax-bg'),
        moon: document.querySelector('.moon'),
        stars: document.querySelector('.stars')
    };

    window.addEventListener('scroll', throttle(() => {
        if (document.body.classList.contains('light-mode')) return;
        
        const scrolled = window.pageYOffset;
        
        // Use transform3d for better performance
        if (parallaxElements.bg) {
            parallaxElements.bg.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        }
        
        if (parallaxElements.moon) {
            parallaxElements.moon.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0) scale(1)`;
        }

        if (parallaxElements.stars) {
            parallaxElements.stars.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
        }
    }, 16)); // ~60fps
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
    
    // Load accessibility preferences
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

// Optimized utility functions

// Create optimized ghost trail
function createGhostTrailOptimized(x, y) {
    // Limit number of trails for performance
    if (ghostTrails.length > 5) {
        const oldTrail = ghostTrails.shift();
        if (oldTrail?.parentNode) {
            oldTrail.remove();
        }
    }

    const trail = document.createElement('div');
    const size = Math.random() * 4 + 3; // Reduced size
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
        opacity: 0.5;
        transform: scale(0);
        transition: transform 1s ease-out, opacity 1s ease-out;
    `;

    document.body.appendChild(trail);
    ghostTrails.push(trail);

    // Trigger animation
    requestAnimationFrame(() => {
        trail.style.transform = 'scale(2)';
        trail.style.opacity = '0';
    });

    setTimeout(() => {
        if (trail.parentNode) {
            trail.remove();
            ghostTrails = ghostTrails.filter(t => t !== trail);
        }
    }, 1000);
}

// Create optimized flying bat
function createFlyingBatOptimized(x, y) {
    const bat = document.createElement('div');
    const batEmojis = ['🦇', '👻', '🎃'];
    const randomBat = batEmojis[Math.floor(Math.random() * batEmojis.length)];
    
    bat.innerHTML = randomBat;
    bat.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 0.5 + 1.2}rem;
        pointer-events: none;
        z-index: 9999;
        color: var(--primary-orange);
        opacity: 0.8;
        transform: translateX(0);
        transition: transform 4s linear, opacity 4s ease-out;
    `;

    document.body.appendChild(bat);

    // Animate using CSS transitions for better performance
    requestAnimationFrame(() => {
        bat.style.transform = `translateX(${window.innerWidth + 100}px) translateY(${Math.random() * 200 - 100}px)`;
        bat.style.opacity = '0';
    });

    setTimeout(() => {
        if (bat.parentNode) {
            bat.remove();
        }
    }, 4000);
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
    createBatchBatsOptimized();

    setTimeout(() => {
        if (easterEggModal.parentNode) {
            easterEggModal.remove();
            document.body.style.overflow = 'auto';
        }
    }, 8000);
}

// Create optimized batch of flying bats
function createBatchBatsOptimized() {
    for (let i = 0; i < 3; i++) { // Reduced for performance
        setTimeout(() => {
            createFlyingBatOptimized(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5
            );
        }, i * 500);
    }
}

// Enhanced spooky sound effects - optimized
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
                gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'click':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            default:
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
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

// Optimized throttle function
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
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

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    // Clean up ghost trails
    ghostTrails.forEach(trail => {
        if (trail.parentNode) trail.remove();
    });
    ghostTrails = [];
});