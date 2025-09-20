// Halloween Event Website JavaScript
// Enhanced functionality for smooth user experience

// Global variables
let isDarkMode = true;
let soundEnabled = false;
let lastScrollTop = 0;
let ghostTrails = [];
let clickCount = 0;

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
    loadUserPreferences();
    displayConsoleMessage();
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

// Countdown Timer
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

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            const countdownTitle = document.querySelector('.countdown-title');
            const countdownTimer = document.getElementById('countdownTimer');
            
            if (countdownTitle) {
                countdownTitle.textContent = '🎃 THE CURSE HAS AWAKENED! 🎃';
            }
            if (countdownTimer) {
                countdownTimer.innerHTML = '<h2 style="color: var(--primary-orange); font-size: 2rem; margin: 1rem 0;">Event is LIVE! 🔥</h2>';
            }
            playSpookySound();
        }
    }

    // Initialize countdown and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    // Hide/Show navigation on scroll
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    }, 10));
}

// Theme Toggle (Light/Dark Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const moonElement = document.getElementById('moon');
    const parallaxBg = document.querySelector('.parallax-bg'); // background layer (stars/haunted visuals)
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = isDarkMode ? '🌙' : '☀️';

        // Hide/Show moon based on theme
        if (moonElement) {
            moonElement.style.opacity = isDarkMode ? '1' : '0';
            moonElement.style.transform = isDarkMode ? 'scale(1)' : 'scale(0)';
        }

        // Background handling
        if (!isDarkMode) {
            document.body.style.background = "#ffffffff"; // pure white background
            if (parallaxBg) parallaxBg.style.display = "none"; // hide stars/parallax

            // Make header text red
            if (mainTitle) mainTitle.style.color = "#f01c1ca2"; // dark red
            if (subtitle) subtitle.style.color = "#e22e2eff";  // dark red
        } else {
            document.body.style.background = ""; // restore dark via CSS vars
            if (parallaxBg) parallaxBg.style.display = "block"; // show stars/parallax

            // Restore original colors
            if (mainTitle) mainTitle.style.color = "var(--primary-orange)";
            if (subtitle) subtitle.style.color = "var(--text-secondary)";
        }

        // Store preference
        localStorage.setItem('halloweenTheme', isDarkMode ? 'dark' : 'light');
    });
}


// Sound Control
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
        } else {
            backgroundAudio.pause();
        }
        
        // Store preference
        localStorage.setItem('soundEnabled', soundEnabled.toString());
    });
}

// Modal System
function setupModalSystem() {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.modal-close');

    // Event details data
    const eventDetails = {
        'costume-contest': {
            title: '👻 Costume Contest',
            content: `
                <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">🏆 Grand Prize: ₹5,000 + Trophy</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> 7:00 PM - 8:00 PM</p>
                    <p><strong>💰 Registration Fee:</strong> ₹100</p>
                    <p><strong>📍 Venue:</strong> Main Stage Area</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🎯 Judging Criteria:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Creativity & Originality (40%)</li>
                        <li>Scariness Factor (30%)</li>
                        <li>Attention to Detail (20%)</li>
                        <li>Audience Appeal (10%)</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>📋 Rules:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>All costumes must be appropriate for college event</li>
                        <li>No offensive or discriminatory themes</li>
                        <li>Props are allowed but must be safe</li>
                        <li>Performance time: Maximum 2 minutes on stage</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Sarah Blackwood - +91-9876543210</p>
            `
        },
        'horror-quiz': {
            title: '🧠 Horror Quiz Night',
            content: `
                <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">🎯 Prize Pool: ₹3,000 + Certificates</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> 8:30 PM - 9:30 PM</p>
                    <p><strong>💰 Registration Fee:</strong> ₹150 per team</p>
                    <p><strong>👥 Team Size:</strong> 3-4 members</p>
                    <p><strong>📍 Venue:</strong> Main Auditorium</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>📚 Quiz Categories:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Classic Horror Movies</li>
                        <li>Urban Legends & Folklore</li>
                        <li>Horror Literature</li>
                        <li>Supernatural Phenomena</li>
                        <li>Halloween Trivia</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🎮 Format:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Preliminary Round: Written Quiz</li>
                        <li>Semi-Finals: Rapid Fire</li>
                        <li>Finals: Audio-Visual Round</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Quiz Team Coordinator - +91-9876543210</p>
            `
        },
        'haunted-house': {
            title: '🏚️ Haunted House Experience',
            content: `
                <h3 style="color: var(--blood-red); margin-bottom: 1rem;">⚠️ WARNING: Not for the Faint-Hearted!</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> 6:00 PM - 11:00 PM</p>
                    <p><strong>💰 Entry Fee:</strong> ₹200 per person</p>
                    <p><strong>⌛ Duration:</strong> 15-minute terrifying experience</p>
                    <p><strong>🔞 Age Restriction:</strong> 16+ only</p>
                    <p><strong>📍 Location:</strong> Old Library Building</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>👻 What to Expect:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Multiple themed rooms of terror</li>
                        <li>Live actors in spine-chilling makeup</li>
                        <li>Special effects & jump scares</li>
                        <li>Immersive horror storyline</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🚨 Health & Safety:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Not recommended for pregnant women</li>
                        <li>Heart patients advised caution</li>
                        <li>Emergency exits clearly marked</li>
                        <li>Staff trained in first aid</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Marcus Grimm - +91-9876543212</p>
            `
        },
        'dance-floor': {
            title: '💃 Spooky Dance Floor',
            content: `
                <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">🎵 Monster Mash Dance Party!</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> 9:30 PM - 12:00 AM</p>
                    <p><strong>💰 Entry Fee:</strong> ₹100 per person</p>
                    <p><strong>🎧 DJ:</strong> DJ Phantom - Live Halloween Mix</p>
                    <p><strong>📍 Venue:</strong> Main Hall</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🎶 Music Genres:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Classic Halloween Songs</li>
                        <li>Horror Movie Soundtracks</li>
                        <li>Bollywood Horror Hits</li>
                        <li>Electronic Dance with Spooky Beats</li>
                        <li>International Pop & Rock</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>✨ Special Features:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Fog machines & laser lights</li>
                        <li>Best dancer competitions every hour</li>
                        <li>Costume dance-offs</li>
                        <li>Midnight surprise performance</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Luna Eclipse - +91-9876543213</p>
            `
        },
        'photo-booth': {
            title: '📸 Horror Photo Booth',
            content: `
                <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">📷 Capture Your Terrifying Transformation!</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> All Evening (6:00 PM - 12:00 AM)</p>
                    <p><strong>💰 Cost:</strong> Free for all attendees</p>
                    <p><strong>📍 Location:</strong> Main Lobby Area</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🎭 Features:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Professional horror-themed backgrounds</li>
                        <li>Spooky props and accessories</li>
                        <li>Instant photo printing</li>
                        <li>Digital copies for social sharing</li>
                        <li>Halloween filters and effects</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>📝 Instructions:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Queue will be managed for smooth flow</li>
                        <li>Maximum 4 people per photo</li>
                        <li>2 shots per group/individual</li>
                        <li>Props must be handled carefully</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Photo Team - +91-9876543210</p>
            `
        },
        'food-stalls': {
            title: '🍕 Midnight Feast',
            content: `
                <h3 style="color: var(--primary-orange); margin-bottom: 1rem;">🍽️ Ghoulishly Delicious Halloween Menu!</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>⏰ Time:</strong> 7:00 PM onwards</p>
                    <p><strong>📍 Location:</strong> Cafeteria & Outdoor Food Court</p>
                    <p><strong>💰 Price Range:</strong> ₹50 - ₹300</p>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🎃 Halloween Special Menu:</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>"Blood" Red Velvet Cupcakes</li>
                        <li>Graveyard Dirt Cake</li>
                        <li>Witch's Brew Smoothies</li>
                        <li>Pumpkin Spice Everything</li>
                        <li>Monster Face Pizzas</li>
                        <li>Ghostly White Chocolate Treats</li>
                    </ul>
                </div>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>🍹 Special Beverages (18+ only):</strong></p>
                    <ul style="margin-left: 1rem; opacity: 0.9;">
                        <li>Blood Orange Cocktails</li>
                        <li>Witch's Potion Mocktails</li>
                        <li>Spooky Themed Milkshakes</li>
                        <li>Halloween Punch</li>
                    </ul>
                </div>
                <p><strong>📞 Contact:</strong> Food Committee - +91-9876543210</p>
            `
        }
    };

    // Event card click handlers
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventType = card.getAttribute('data-event');
            if (eventDetails[eventType] && modal && modalTitle && modalContent) {
                modalTitle.innerHTML = eventDetails[eventType].title;
                modalContent.innerHTML = eventDetails[eventType].content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    function closeModalFunction() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Scroll elements (scroll to top button)
function setupScrollElements() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;

    // Show/hide scroll to top button
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 10));

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Section reveal animations
function setupSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Easter eggs and interactive elements
function setupEasterEggs() {
    // Custom cursor trail
    document.addEventListener('mousemove', (e) => {
        // Reduced frequency for performance
        if (Math.random() < 0.03) {
            createGhostTrail(e.clientX, e.clientY);
        }
    });

    // Click easter eggs
    document.addEventListener('click', (e) => {
        if (Math.random() < 0.02) { // 2% chance
            createFlyingBat(e.clientX, e.clientY);
            clickCount++;
            
            if (clickCount === 10) {
                showEasterEggMessage();
                clickCount = 0;
            }
        }
    });

    // Floating CTA special animation
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
}

// Parallax effects
function setupParallaxEffects() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const moon = document.querySelector('.moon');
    const stars = document.querySelector('.stars');

    const debouncedParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (moon && !document.body.classList.contains('light-mode')) {
            moon.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedParallax);
}

// Load user preferences
function loadUserPreferences() {
    const moonElement = document.getElementById('moon');
    
    // Load theme preference
    const savedTheme = localStorage.getItem('halloweenTheme');
    if (savedTheme === 'light') {
        isDarkMode = false;
        document.body.classList.add('light-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
        // Hide moon in light mode
        if (moonElement) {
            moonElement.style.opacity = '0';
            moonElement.style.transform = 'scale(0)';
        }
    } else {
        // Show moon in dark mode
        if (moonElement) {
            moonElement.style.opacity = '1';
            moonElement.style.transform = 'scale(1)';
        }
    }

    // Load sound preference
    const savedSoundSetting = localStorage.getItem('soundEnabled');
    if (savedSoundSetting === 'true') {
        soundEnabled = true;
        const soundIcon = document.querySelector('.sound-icon');
        if (soundIcon) {
            soundIcon.textContent = '🔇';
        }
        
        const backgroundAudio = document.getElementById('backgroundAudio');
        if (backgroundAudio) {
            backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
}

// Utility function: Create ghost trail
function createGhostTrail(x, y) {
    if (ghostTrails.length > 5) {
        const oldTrail = ghostTrails.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.remove();
        }
    }

    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: rgba(255, 107, 53, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: ghost-fade 1s ease-out forwards;
    `;

    document.body.appendChild(trail);
    ghostTrails.push(trail);

    setTimeout(() => {
        if (trail.parentNode) {
            trail.remove();
            ghostTrails = ghostTrails.filter(t => t !== trail);
        }
    }, 1000);
}

// Utility function: Create flying bat
function createFlyingBat(x, y) {
    const bat = document.createElement('div');
    bat.innerHTML = '🦇';
    bat.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        color: var(--primary-orange);
        animation: fly-realistic 4s linear forwards;
    `;

    document.body.appendChild(bat);

    setTimeout(() => {
        if (bat.parentNode) {
            bat.remove();
        }
    }, 4000);
}

// Utility function: Show easter egg message
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
        animation: modal-slide-in 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    easterEggModal.innerHTML = `
        <h2 style="color: var(--primary-orange); margin-bottom: 1rem; font-family: 'Creepster', cursive;">🦇 Secret Discovered!</h2>
        <p style="margin-bottom: 1rem;">You found the hidden bat easter egg!</p>
        <p style="opacity: 0.8; font-size: 0.9rem; margin-bottom: 1.5rem;">You have a keen eye for the supernatural! 👁️</p>
        <button onclick="this.parentElement.remove(); document.body.style.overflow = 'auto';" 
                style="background: linear-gradient(135deg, var(--primary-orange), var(--blood-red)); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
            Spooky! 👻
        </button>
    `;

    document.body.style.overflow = 'hidden';
    document.body.appendChild(easterEggModal);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (easterEggModal.parentNode) {
            easterEggModal.remove();
            document.body.style.overflow = 'auto';
        }
    }, 5000);
}

// Utility function: Play spooky sound
function playSpookySound() {
    if (!soundEnabled) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.5);

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Console message
function displayConsoleMessage() {
    console.log(`
🎃👻🦇 WELCOME TO THE AIKYA HALLOWEEN EVENT 🦇👻🎃

      |\\      _,,,---,,_
ZZZzz /,\\.̨-'\\    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \\'-'
    '---''(_/--'  \\-'\\_)

The spirits whisper: "The website holds dark secrets..."
Keep clicking around the page... you might find something spooky! 🦇
Try the sound toggle for an atmospheric experience! 🔊

Happy Halloween! 🎃
    `);
}

// Add CSS animation for ghost trail
const style = document.createElement('style');
style.textContent = `
    @keyframes ghost-fade {
        to { 
            opacity: 0; 
            transform: scale(2) translateY(-20px); 
        }
    }
`;
document.head.appendChild(style);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
        }, 0);
    });
}