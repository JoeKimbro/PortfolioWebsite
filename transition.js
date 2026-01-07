const scrollIndicator = document.querySelector('.scroll-indicator');
const aboutSection = document.querySelector('.about');
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');

//logic for Home Page
if (scrollIndicator && aboutSection) {
    scrollIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
}

const aboutIndicator = document.querySelector('.about-indicator');

if (aboutIndicator && heroSection) {
    aboutIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        heroSection.scrollIntoView({behavior: 'smooth'}); 
    });
}

//Logic for Works Page - using same class names as home page
const myworksScrollIndicator = document.querySelector('.myworks .scroll-indicator');
const projectSection =  document.querySelector('.project');
const projectMyWorks = document.querySelector('.myworks');
const myworksAboutIndicator = document.querySelector('.project .about-indicator');

if (myworksScrollIndicator && projectSection) {
    myworksScrollIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        projectSection.scrollIntoView({behavior: 'smooth'});
    });
}

if (myworksAboutIndicator && projectMyWorks) {
    myworksAboutIndicator.addEventListener('click', function(event){
        event.preventDefault();
        projectMyWorks.scrollIntoView({behavior: 'smooth'});
    });
}

// Scroll listener to change header text color (Home Page only)
if (heroSection && header) {
    window.addEventListener('scroll', function() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + header.offsetHeight;
        
        if (scrollPosition >= heroBottom) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}