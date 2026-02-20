/**
 * Resume Modal Functionality
 * Handles opening and closing the resume modal
 */
document.addEventListener('DOMContentLoaded', function() {
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const modalOverlay = document.querySelector('.resume-modal-overlay');
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    
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
    
    /**
     * Force download of resume PDF
     */
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(event) {
            // Allow Ctrl/Cmd+click to open in new tab
            if (event.ctrlKey || event.metaKey) {
                return;
            }
            
            event.preventDefault();
            
            // Fetch the file and create a blob to force download
            fetch('resumeUpload/Resume - Joseph Kimbrough.docx.pdf')
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Resume - Joseph Kimbrough.docx.pdf';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error downloading resume:', error);
                    // Fallback to direct download
                    window.location.href = 'resumeUpload/Resume - Joseph Kimbrough.docx.pdf';
                });
        });
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
    
    // Expose openResumeModal globally for potential external use
    window.openResumeModal = openResumeModal;
});

