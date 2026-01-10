// Video autoplay functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle video projects in video-project sections
    const videoProjects = document.querySelectorAll('.video-project');
    
    videoProjects.forEach(videoProject => {
        const video = videoProject.querySelector('.project-video');
        
        if (video) {
            // Play video automatically
            video.play().catch(function(error) {
                // Auto-play might be blocked by browser, handle silently
                console.log('Video autoplay blocked:', error);
            });
        }
    });
    
    // Handle video projects in project sections
    const projectSections = document.querySelectorAll('.project');
    
    projectSections.forEach(projectSection => {
        const video = projectSection.querySelector('.project-video');
        
        if (video) {
            // Play video automatically
            video.play().catch(function(error) {
                // Auto-play might be blocked by browser, handle silently
                console.log('Video autoplay blocked:', error);
            });
        }
    });
    
    // Video modal functionality
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const modalVideo = document.querySelector('.video-modal-player');
    const modalOverlay = document.querySelector('.video-modal-overlay');
    const projectVideos = document.querySelectorAll('.project-video');
    
    // Function to open modal
    function openVideoModal(videoSrc) {
        modalVideo.src = videoSrc;
        modalVideo.muted = false; // Unmute for full video
        videoModal.classList.add('active');
        modalVideo.play().catch(function(error) {
            console.log('Video play error:', error);
        });
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = '';
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Add click event to all project videos
    projectVideos.forEach(video => {
        video.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src') || 
                           this.querySelector('source').getAttribute('src');
            openVideoModal(videoSrc);
        });
    });
    
    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    // Close modal when clicking on overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeVideoModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.video-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

