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

//Logic for Works Page - using same class names as home page
const myworksScrollIndicator = document.querySelector('.myworks .scroll-indicator');
const projectSection =  document.querySelector('.project');
const projectMyWorks = document.querySelector('.myworks');
const myworksAboutIndicator = document.querySelector('.project .about-indicator');
const WorksHeader = document.querySelector('myWorksHeader');

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
if (projectMyWorks && WorksHeader) {
    window.addEventListener('scroll', function() {
        const projectBottom = projectMyWorks.offsetTop + projectMyWorks.offsetHeight;
        const projectScrollPosition = window.scrollY + WorksHeader.offsetHeight;
        
        if (projectScrollPosition >= projectBottom) {
            WorksHeader.classList.add('scrolled');
        } else {
            WorksHeader.classList.remove('scrolled');
        }
    });
}

// Logic for Experience Page
const experienceScrollIndicator = document.querySelector('.experienceMain .scroll-indicator');
const experienceResumeSection = document.querySelector('.resume');
const experienceMainTop = document.querySelector('.experienceMain');
const experienceAboutIndicator = document.querySelector('.resume .about-indicator');
const experienceHeader = document.querySelector('myExperienceHeader');

if (experienceScrollIndicator && experienceResumeSection) {
    experienceScrollIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        experienceResumeSection.scrollIntoView({behavior: 'smooth'});
    });
}

if (experienceAboutIndicator && experienceMainTop) {
    experienceAboutIndicator.addEventListener('click', function(event){
        event.preventDefault();
        experienceMainTop.scrollIntoView({behavior: 'smooth'});
    });
}

if (experienceMainTop && experienceHeader) {
    window.addEventListener('scroll', function() {
        const experienceBottom = experienceMainTop.offsetTop + experienceMainTop.offsetHeight;
        const experienceScrollPosition = window.scrollY + experienceHeader.offsetHeight;
        
        if (experienceScrollPosition >= experienceBottom) {
            experienceHeader.classList.add('scrolled');
        } else {
            experienceHeader.classList.remove('scrolled');
        }
    });
}

// Logic for Contact Me Page 
const contactMeScrollIndicator = document.querySelector('.contactMeMain .scroll-indicator');
const contactMeInfoBottom =  document.querySelector('.contactMeInfo');
const contactMeMainTop = document.querySelector('.contactMeMain');
const contactMeAboutIndicator = document.querySelector('.contactMeInfo .about-indicator');
const contactMeHeader = document.querySelector('myContactMeHeader');

if (contactMeScrollIndicator && contactMeInfoBottom) {
    contactMeScrollIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        contactMeInfoBottom.scrollIntoView({behavior: 'smooth'});
    });
}

if (contactMeAboutIndicator && contactMeMainTop) {
    contactMeAboutIndicator.addEventListener('click', function(event){
        event.preventDefault();
        contactMeMainTop.scrollIntoView({behavior: 'smooth'});
    });
}

if (contactMeMainTop && contactMeHeader) {
    window.addEventListener('scroll', function() {
        const contactMeBottom = contactMeMainTop.offsetTop + contactMeMainTop.offsetHeight;
        const contactMeScrollPosition = window.scrollY + contactMeHeader.offsetHeight;
        
        if (contactMeScrollPosition >= contactMeBottom) {
            contactMeHeader.classList.add('scrolled');
        } else {
            contactMeHeader.classList.remove('scrolled');
        }
    });
}
