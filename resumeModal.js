/**
 * Resume Modal Functionality
 * Handles opening and closing the resume modal
 */
document.addEventListener('DOMContentLoaded', function() {
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const modalOverlay = document.querySelector('.resume-modal-overlay');
    
    if (!resumeModal) {
        console.warn('Resume modal element not found');
        return;
    }
    
    /**
     * Open the resume modal
     */
    function openResumeModal() {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close the resume modal
     */
    function closeResumeModalFunc() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal when close button is clicked
    if (closeResumeModal) {
        closeResumeModal.addEventListener('click', closeResumeModalFunc);
    }
    
    // Close modal when clicking on overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeResumeModalFunc);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeResumeModalFunc();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.resume-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

