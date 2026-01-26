/**
 * Video Modal Functionality
 * Handles video modal opening and closing for project videos
 */
document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const modalVideo = document.querySelector('.video-modal-player');
    const modalYoutube = document.querySelector('.video-modal-youtube');
    const modalOverlay = document.querySelector('.video-modal-overlay');
    const projectVideos = document.querySelectorAll('.project-video');
    
    if (!videoModal) {
        console.warn('Video modal element not found');
        return;
    }
    
    /**
     * Open modal with regular video
     * @param {string} videoSrc - Source URL of the video
     */
    function openVideoModal(videoSrc) {
        if (!modalVideo) return;
        
        // Hide both players first
        modalVideo.style.display = 'none';
        if (modalYoutube) modalYoutube.style.display = 'none';
        
        modalVideo.src = videoSrc;
        modalVideo.muted = false;
        modalVideo.style.display = 'block';
        videoModal.classList.add('active');
        
        modalVideo.play().catch(function(error) {
            console.log('Video play error:', error);
        });
        
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Open modal with YouTube video
     * @param {string} youtubeId - YouTube video ID
     */
    function openYoutubeModal(youtubeId) {
        if (!modalYoutube) return;
        
        // Hide both players first
        if (modalVideo) modalVideo.style.display = 'none';
        modalYoutube.style.display = 'none';
        
        const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        modalYoutube.src = youtubeUrl;
        modalYoutube.style.display = 'block';
        videoModal.classList.add('active');
        
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close the video modal
     */
    function closeVideoModal() {
        videoModal.classList.remove('active');
        
        // Pause and reset video if it's visible
        if (modalVideo && modalVideo.style.display !== 'none') {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = '';
        }
        
        // Reset YouTube iframe if it's visible
        if (modalYoutube && modalYoutube.style.display !== 'none') {
            modalYoutube.src = '';
        }
        
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

