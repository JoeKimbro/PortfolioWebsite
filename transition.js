/**
 * Navigation and Scroll Animations
 * Handles navigation, scroll animations, role text rotation, and timeline animations
 */

// Navigation smooth scrolling
const navLinks = document.querySelectorAll('#mainNav a');
const sections = document.querySelectorAll('section[id]');

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav state
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Update active nav on scroll
function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const scrollCenter = scrollPosition + (viewportHeight / 2); // Use viewport center for better detection
    
    // Sort sections by their position
    const sortedSections = Array.from(sections).sort((a, b) => a.offsetTop - b.offsetTop);
    
    // Find which section we're currently in
    for (let i = 0; i < sortedSections.length; i++) {
        const section = sortedSections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if we've passed this section's top
        if (scrollCenter >= sectionTop) {
            // If this is the last section, or we haven't reached the next section yet
            if (i === sortedSections.length - 1 || scrollCenter < sortedSections[i + 1].offsetTop) {
                current = section.getAttribute('id');
                break;
            }
        }
    }
    
    // If we're at the very top, default to first section
    if (!current && sortedSections.length > 0 && scrollPosition < sortedSections[0].offsetTop) {
        current = sortedSections[0].getAttribute('id');
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
// Update on page load to set initial active state
updateActiveNav();

// Logic for top chevron - appears when scrolled to contact section, scrolls to top when clicked
const topChevron = document.getElementById('topChevron');
const contactSection = document.getElementById('contact');

if (topChevron && contactSection) {
    // Show/hide chevron based on scroll position
    function checkScrollPosition() {
        const contactTop = contactSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition >= contactTop) {
            topChevron.classList.add('visible');
        } else {
            topChevron.classList.remove('visible');
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScrollPosition);
    
    // Check on load
    checkScrollPosition();
    
    // Scroll to top when clicked
    topChevron.addEventListener('click', function(event){
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animated role text switching
const roleText = document.getElementById('roleText');
const roles = ['Aspiring Software Engineer', 'Team Member', 'Fast Learner', 'Critical Thinker'];
let currentRoleIndex = 0;

/**
 * Switch to the next role text with fade animation
 */
function switchRole() {
    if (!roleText) return;
    
    roleText.style.opacity = '0';
    
    setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleText.textContent = roles[currentRoleIndex];
        roleText.style.opacity = '1';
    }, 500);
}

// Start the role switching animation
if (roleText) {
    setInterval(switchRole, 3000); // Switch every 3 seconds
}

// Custom cursor glow that follows mouse
const cursorGlow = document.querySelector('.custom-cursor');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// Scroll animations for project cards and content boxes
const projectCards = document.querySelectorAll('.project-card');
const allBoxes = document.querySelectorAll('.education-timeline-box, .experience-timeline-box, .about-box');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Animate project cards on scroll
if (projectCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Animate content boxes on scroll
if (allBoxes.length > 0) {
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    allBoxes.forEach(box => {
        boxObserver.observe(box);
    });
}

// Timeline progress animation and entry visibility
const timelineSection = document.querySelector('.experience-timeline');
const timelineProgress = document.getElementById('timelineProgress');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineSection && timelineProgress) {
    // Calculate each timeline item's position relative to the timeline
    function calculateItemPositions() {
        const timelineHeight = timelineSection.scrollHeight;
        
        const itemPositions = [];
        timelineItems.forEach((item) => {
            const icon = item.querySelector('.timeline-icon');
            if (icon) {
                // Calculate position relative to timeline section
                let itemTop = 0;
                let currentElement = item;
                
                // Traverse up to find position relative to timeline
                while (currentElement && currentElement !== timelineSection) {
                    itemTop += currentElement.offsetTop;
                    currentElement = currentElement.offsetParent;
                    // Safety check to avoid infinite loop
                    if (!currentElement || currentElement === document.body) break;
                }
                
                const iconPercentage = (itemTop / timelineHeight) * 100;
                
                itemPositions.push({
                    item: item,
                    percentage: Math.max(0, Math.min(100, iconPercentage))
                });
            }
        });
        
        // Sort by percentage to ensure correct order
        itemPositions.sort((a, b) => a.percentage - b.percentage);
        
        return itemPositions;
    }
    
    let itemPositions = [];
    
    function updateTimelineProgress() {
        const timelineRect = timelineSection.getBoundingClientRect();
        const timelineTop = timelineRect.top + window.scrollY;
        const timelineHeight = timelineSection.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress using the center of the viewport
        const viewportCenter = window.scrollY + (viewportHeight / 2);
        const timelineBottom = timelineTop + timelineHeight;
        
        // Calculate how much of the timeline is visible/passed
        let progress = 0;
        
        if (viewportCenter >= timelineTop) {
            if (viewportCenter >= timelineBottom) {
                progress = 100; // Fully scrolled past
            } else {
                // Calculate percentage based on how far the center has scrolled through the timeline
                const scrolled = viewportCenter - timelineTop;
                progress = (scrolled / timelineHeight) * 100;
            }
        }
        
        // Clamp progress between 0 and 100
        progress = Math.max(0, Math.min(100, progress));
        
        // Update the progress line height
        timelineProgress.style.height = progress + '%';
        
        // Update item visibility based on scroll progress
        if (itemPositions.length === 0) {
            itemPositions = calculateItemPositions();
        }
        
        itemPositions.forEach(({ item, percentage }) => {
            const timelineContent = item.querySelector('.timeline-content');
            if (timelineContent) {
                // Show content when scroll progress reaches the item's position
                if (progress >= percentage) {
                    timelineContent.classList.add('visible');
                } else {
                    timelineContent.classList.remove('visible');
                }
            }
        });
    }
    
    // Recalculate positions on resize
    window.addEventListener('resize', () => {
        itemPositions = [];
        updateTimelineProgress();
    });
    
    // Update on scroll
    window.addEventListener('scroll', updateTimelineProgress);
    
    // Update on load
    updateTimelineProgress();
}

// Animated grid for hero section
const heroGrid = document.getElementById('heroGrid');
const heroSection = document.querySelector('.hero');

if (heroGrid && heroSection) {
    let cols = 0;
    let rows = 0;
    let cells = [];
    let animationFrame = null;
    let isMobile = window.innerWidth <= 768;
    let lastUpdateTime = 0;
    const mobileThrottle = 33; // ~30fps on mobile for better performance
    
    // Detect mobile device
    function detectMobile() {
        isMobile = window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile;
    }
    
    // Calculate grid dimensions based on viewport
    function createGrid() {
        detectMobile();
        const cellSize = isMobile ? 60 : 80;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        cols = Math.ceil(viewportWidth / cellSize);
        rows = Math.ceil(viewportHeight / cellSize);
        
        // Clear existing cells
        heroGrid.innerHTML = '';
        cells = [];
        
        // Create grid cells
        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement('div');
            cell.className = 'hero-grid-cell';
            heroGrid.appendChild(cell);
            cells.push(cell);
        }
        
        // Update grid template
        heroGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        heroGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }
    
    // Create grid on load
    createGrid();
    
    // Recreate grid on resize and orientation change
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createGrid();
            startAnimation();
        }, 250);
    }
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
    
    // Animate grid with wave effect
    let time = 0;
    function animateGrid(currentTime) {
        // Throttle animation on mobile for better performance
        if (isMobile) {
            if (currentTime - lastUpdateTime < mobileThrottle) {
                animationFrame = requestAnimationFrame(animateGrid);
                return;
            }
            lastUpdateTime = currentTime;
        }
        
        // Adjust animation speed based on device
        const speedMultiplier = isMobile ? 0.015 : 0.02;
        time += speedMultiplier;
        
        cells.forEach((cell, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            
            // Create wave effect that moves across the grid
            const distance = Math.sqrt(
                Math.pow(col - cols / 2, 2) + 
                Math.pow(row - rows / 2, 2)
            );
            
            // Simplified wave calculation on mobile for better performance
            if (isMobile) {
                // Use fewer waves on mobile
                const wave1 = Math.sin(distance * 0.3 - time * 2) * 0.5 + 0.5;
                const wave2 = Math.cos((col + row) * 0.5 - time * 3) * 0.5 + 0.5;
                const intensity = (wave1 * 0.6 + wave2 * 0.4);
                
                if (intensity > 0.6) {
                    cell.classList.add('highlighted');
                    cell.style.opacity = intensity;
                } else {
                    cell.classList.remove('highlighted');
                    cell.style.opacity = '';
                }
            } else {
                // Full animation on desktop
                const wave1 = Math.sin(distance * 0.3 - time * 2) * 0.5 + 0.5;
                const wave2 = Math.sin(distance * 0.2 - time * 1.5) * 0.5 + 0.5;
                const wave3 = Math.cos((col + row) * 0.5 - time * 3) * 0.5 + 0.5;
                
                const intensity = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3);
                
                if (intensity > 0.6) {
                    cell.classList.add('highlighted');
                    cell.style.opacity = intensity;
                } else {
                    cell.classList.remove('highlighted');
                    cell.style.opacity = '';
                }
            }
        });
        
        animationFrame = requestAnimationFrame(animateGrid);
    }
    
    function startAnimation() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        time = 0;
        lastUpdateTime = 0;
        animationFrame = requestAnimationFrame(animateGrid);
    }
    
    // Start animation
    startAnimation();
    
    // Pause animation when page is hidden (mobile optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        } else {
            startAnimation();
        }
    });
}
 