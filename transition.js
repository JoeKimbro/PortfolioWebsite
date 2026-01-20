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
    const scrollPosition = window.pageYOffset + 200; // Offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

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

function switchRole() {
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

// White circle glow that follows cursor
const cursorGlow = document.querySelector('.custom-cursor');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// Scroll animations for project cards and all boxes
const projectCards = document.querySelectorAll('.project-card');
const allBoxes = document.querySelectorAll('.experience-timeline-box, .education-timeline-box, .skills-box, .about-box');

if (projectCards.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

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

// Apply same animation to all boxes
if (allBoxes.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

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
 