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
            // Only autoplay regular video elements, not YouTube iframes
            if (video.tagName === 'VIDEO') {
                video.play().catch(function(error) {
                    // Auto-play might be blocked by browser, handle silently
                    console.log('Video autoplay blocked:', error);
                });
            }
            // YouTube iframes autoplay via URL parameters, no action needed
        }
    });
    
    // Video modal functionality
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const modalVideo = document.querySelector('.video-modal-player');
    const modalYoutube = document.querySelector('.video-modal-youtube');
    const modalOverlay = document.querySelector('.video-modal-overlay');
    const projectVideos = document.querySelectorAll('.project-video');
    
    // Function to open modal with video
    function openVideoModal(videoSrc) {
        // Hide both players first
        modalVideo.style.display = 'none';
        modalYoutube.style.display = 'none';
        
        modalVideo.src = videoSrc;
        modalVideo.muted = false; // Unmute for full video
        modalVideo.style.display = 'block';
        videoModal.classList.add('active');
        modalVideo.play().catch(function(error) {
            console.log('Video play error:', error);
        });
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to open modal with YouTube
    function openYoutubeModal(youtubeId) {
        // Hide both players first
        modalVideo.style.display = 'none';
        modalYoutube.style.display = 'none';
        
        const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        modalYoutube.src = youtubeUrl;
        modalYoutube.style.display = 'block';
        videoModal.classList.add('active');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        
        // Pause and reset video if it's visible
        if (modalVideo.style.display !== 'none') {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = '';
        }
        
        // Reset YouTube iframe if it's visible
        if (modalYoutube.style.display !== 'none') {
            modalYoutube.src = '';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Add click event to all project videos
    projectVideos.forEach(video => {
        video.addEventListener('click', function() {
            // Check if it's a YouTube video
            if (this.classList.contains('youtube-video')) {
                const youtubeId = this.getAttribute('data-youtube-id');
                if (youtubeId) {
                    openYoutubeModal(youtubeId);
                }
            } else {
                // Regular video element
                const videoSrc = this.getAttribute('data-video-src') || 
                               this.querySelector('source').getAttribute('src');
                openVideoModal(videoSrc);
            }
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

