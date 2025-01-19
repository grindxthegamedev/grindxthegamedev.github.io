// import { DotLottie } from '@lottiefiles/dotlottie-web';

// Carousel Data
const carouselData = [
    { 
        image: 'https://via.placeholder.com/200x150/2a2a2a/b68d40?text=Client+1', 
        url: 'client1.com' 
    },
    { 
        image: 'https://via.placeholder.com/200x150/2a2a2a/b68d40?text=Client+2', 
        url: 'client2.com' 
    },
    { 
        image: 'https://via.placeholder.com/200x150/2a2a2a/b68d40?text=Client+3', 
        url: 'client3.com' 
    },
    { 
        image: 'https://via.placeholder.com/200x150/2a2a2a/b68d40?text=Client+4', 
        url: 'client4.com' 
    },
    { 
        image: 'https://via.placeholder.com/200x150/2a2a2a/b68d40?text=Client+5', 
        url: 'client5.com' 
    }
];

// Initialize Carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    
    carouselData.forEach(client => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        const img = document.createElement('img');
        img.src = client.image;
        img.alt = 'Client Logo';
        
        const overlay = document.createElement('div');
        overlay.className = 'url-overlay';
        overlay.textContent = client.url;
        
        item.appendChild(img);
        item.appendChild(overlay);
        carousel.appendChild(item);
    });
    
    // Clone items for infinite scroll
    const items = document.querySelectorAll('.carousel-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
}

// Animate Carousel
function animateCarousel() {
    const carousel = document.querySelector('.carousel');
    let position = 0;
    const speed = 1;
    
    function move() {
        position -= speed;
        if (position <= -carousel.offsetWidth / 2) {
            position = 0;
        }
        carousel.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(move);
    }
    
    move();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"], button[data-scroll-to]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add console.log for debugging
            console.log('Scroll click detected');
            
            // Get target element (either from href or data-scroll-to attribute)
            const targetId = this.getAttribute('href') || this.getAttribute('data-scroll-to');
            console.log('Target ID:', targetId);
            
            const targetElement = document.querySelector(targetId);
            console.log('Target Element:', targetElement);
            
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

    const goldCard = document.querySelector('.price-card.gold');
    const mysteriousItem = document.querySelector('.mysterious');
    
    goldCard.addEventListener('mousemove', (e) => {
        const rect = goldCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        goldCard.style.setProperty('--mouse-x', `${x}px`);
        goldCard.style.setProperty('--mouse-y', `${y}px`);
    });

    // Random steam particle generation
    setInterval(() => {
        const steam = document.createElement('div');
        steam.className = 'steam-particle';
        steam.style.left = `${Math.random() * 60}px`;
        steam.style.animationDelay = `${Math.random() * 2}s`;
        
        const steamContainer = document.querySelector('.reactor-steam');
        steamContainer.appendChild(steam);
        
        setTimeout(() => steam.remove(), 3000);
    }, 500);

    createSmokeEffect();

    // Enhanced mouse trail effect for all sections
    const sections = document.querySelectorAll('.hero, .trusted, .pricing, .about, .contact');
    let lastSparkTime = 0;
    const sparkInterval = 20; // Reduced from 50 to create more frequent sparks
    
    sections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const currentTime = Date.now();
            if (currentTime - lastSparkTime > sparkInterval) {
                createMouseSpark(e.clientX, e.clientY);
                lastSparkTime = currentTime;
            }

            // Update background gradient
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            section.style.setProperty('--mouse-x', `${x}%`);
            section.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    function createMouseSpark(x, y) {
        const spark = document.createElement('div');
        spark.className = 'mouse-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        
        // Enhanced random offset
        const offset = 20; // Increased from 10 for more spread
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistance = Math.random() * offset;
        
        spark.style.setProperty('--offset-x', `${Math.cos(randomAngle) * randomDistance}px`);
        spark.style.setProperty('--offset-y', `${Math.sin(randomAngle) * randomDistance}px`);
        
        // Create multiple particles for each spark
        for (let i = 0; i < 3; i++) {
            const particle = spark.cloneNode(true);
            particle.style.animationDelay = `${i * 0.1}s`;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    }

    const frame = document.querySelector('.mechanical-frame');
    const corners = document.querySelectorAll('.frame-corner');
    
    // Track particle intervals for cleanup
    let particleIntervals = new Map();

    frame.addEventListener('mousemove', (e) => {
        corners.forEach((corner, index) => {
            const rect = corner.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to gear center
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Adjust rotation speed based on distance
            const maxDistance = 300;
            const minSpeed = 1;
            const maxSpeed = 4;
            
            // Calculate speed and particle rate based on distance
            const distanceRatio = 1 - Math.min(distance / maxDistance, 1);
            const speed = minSpeed + distanceRatio * (maxSpeed - minSpeed);
            const particleRate = Math.max(50, 300 - (distanceRatio * 250)); // Particle spawn rate in ms
            
            const player = corner.querySelector('dotlottie-player');
            if (player) {
                player.speed = speed;
            }

            // Handle particle generation
            if (particleIntervals.has(corner)) {
                clearInterval(particleIntervals.get(corner));
            }

            if (distanceRatio > 0.1) { // Only create particles when close enough
                const interval = setInterval(() => {
                    createGearParticles(corner, dx, dy, distanceRatio);
                }, particleRate);
                particleIntervals.set(corner, interval);
            }
        });
    });

    frame.addEventListener('mouseleave', () => {
        corners.forEach(corner => {
            const player = corner.querySelector('dotlottie-player');
            if (player) {
                player.speed = 1;
            }
            if (particleIntervals.has(corner)) {
                clearInterval(particleIntervals.get(corner));
                particleIntervals.delete(corner);
            }
        });
    });

    function createGearParticles(gear, dx, dy, intensity) {
        const numParticles = Math.floor(intensity * 5) + 1; // Scale particles with proximity
        
        for (let i = 0; i < numParticles; i++) {
            const spark = document.createElement('div');
            spark.className = 'gear-spark';
            
            // Calculate particle trajectory
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const speedMultiplier = 0.5 + intensity;
            
            spark.style.setProperty('--fly-x', `${Math.cos(angle) * distance * speedMultiplier}px`);
            spark.style.setProperty('--fly-y', `${Math.sin(angle) * distance * speedMultiplier}px`);
            
            // Random starting position within the gear
            const startAngle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 20;
            spark.style.left = `calc(50% + ${Math.cos(startAngle) * radius}px)`;
            spark.style.top = `calc(50% + ${Math.sin(startAngle) * radius}px)`;
            
            gear.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    }

    // Enhanced background animation
    let cogAngle = 0;

    function animateBackground() {
        cogAngle = (cogAngle + 0.1) % 360;
        hero.style.setProperty('--cog-angle', `${cogAngle}deg`);
        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    // Animate statistics numbers
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Adjust speed here
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });

    // Create steam effect for stats
    function createStatSteam() {
        document.querySelectorAll('.stat-steam').forEach(container => {
            const steam = document.createElement('div');
            steam.className = 'steam-particle';
            steam.style.left = `${Math.random() * 40 - 20}px`;
            container.appendChild(steam);
            
            setTimeout(() => steam.remove(), 3000);
        });
    }

    setInterval(createStatSteam, 300);

    // Initialize expertise meters
    const meters = document.querySelectorAll('.gear-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = `${progress}%`;
                meterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    meters.forEach(meter => meterObserver.observe(meter));

    // Add mouse tracking for image overlay
    const imageContainer = document.querySelector('.about-image-container');
    
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        imageContainer.style.setProperty('--mouse-x', `${x}%`);
        imageContainer.style.setProperty('--mouse-y', `${y}%`);
    });

    // Add this to your existing frame corner hover handlers
    document.querySelectorAll('.frame-corner').forEach(corner => {
        corner.addEventListener('mouseover', () => {
            const player = corner.querySelector('dotlottie-player');
            if (player) player.speed = 5;
        });
        
        corner.addEventListener('mouseout', () => {
            const player = corner.querySelector('dotlottie-player');
            if (player) player.speed = 1;
        });
    });

    // Add background tracking for sections
    document.querySelectorAll('.about, .trusted, .pricing').forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            section.style.setProperty('--mouse-x', `${x}%`);
            section.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    initCarousel();
    animateCarousel();
});

// Add parallax effect to gears
window.addEventListener('scroll', () => {
    const gears = document.querySelectorAll('.gear');
    const scrolled = window.pageYOffset;
    
    gears.forEach((gear, index) => {
        const speed = (index + 1) * 0.2;
        gear.style.transform = `rotate(${scrolled * speed}deg)`;
    });
});

// Add smoke effect to mechanical frame
function createSmokeEffect() {
    const smokeContainer = document.querySelector('.smoke-container');
    
    function createSmokeParticle() {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // Random starting position along the width
        const xPos = Math.random() * 100;
        particle.style.left = `${xPos}%`;
        
        // Random x-offset for rising movement
        const xOffset = (Math.random() - 0.5) * 50;
        particle.style.setProperty('--x-offset', `${xOffset}px`);
        
        smokeContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
    
    // Create new particles periodically
    setInterval(createSmokeParticle, 200);
}

// Add hover effect to skill gears
document.querySelectorAll('.skill-gear').forEach(gear => {
    gear.addEventListener('mouseover', () => {
        gear.style.animationDuration = '5s';
    });
    
    gear.addEventListener('mouseout', () => {
        gear.style.animationDuration = '10s';
    });
});

// Pattern management
const patterns = {
    hero: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-size='180' fill='%23463618' text-anchor='middle' dominant-baseline='middle'%3E♠%3C/text%3E%3C/svg%3E",
    trusted: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-size='180' fill='%23463618' text-anchor='middle' dominant-baseline='middle'%3E★%3C/text%3E%3C/svg%3E",
    pricing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-size='180' fill='%23463618' text-anchor='middle' dominant-baseline='middle'%3E♣%3C/text%3E%3C/svg%3E",
    about: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-size='180' fill='%23463618' text-anchor='middle' dominant-baseline='middle'%3E♥%3C/text%3E%3C/svg%3E",
    contact: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-size='180' fill='%23463618' text-anchor='middle' dominant-baseline='middle'%3E♦%3C/text%3E%3C/svg%3E"
};

function updatePattern() {
    const sections = ['hero', 'trusted', 'pricing', 'about', 'contact'];
    let currentSection = 'hero';

    sections.forEach(section => {
        const element = document.querySelector(`.${section}`);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
        }
    });

    document.documentElement.style.setProperty(
        '--current-pattern', 
        `url("${patterns[currentSection]}")`
    );
}

// Throttled scroll listener
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updatePattern();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initial call
updatePattern();
