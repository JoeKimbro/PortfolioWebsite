// Resume Modal functionality and PDF Preview
document.addEventListener('DOMContentLoaded', function() {
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const resumeWrapper = document.getElementById('resumeWrapper');
    const resumePreview = document.getElementById('resumePreview');
    const resumeCanvas = document.getElementById('resumeCanvas');
    const modalOverlay = document.querySelector('.resume-modal-overlay');
    const pdfPath = 'resumeUpload/Resume - Joseph Kimbrough.docx.pdf';
    
    // Load PDF and render first page as preview image
    if (typeof pdfjsLib !== 'undefined' && resumePreview && resumeCanvas) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        async function loadResumePreview() {
            try {
                // Use fetch to load the PDF file
                const response = await fetch(pdfPath);
                const arrayBuffer = await response.arrayBuffer();
                
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1); // Get first page
                
                // Calculate scale for better quality (2x for retina displays)
                const scale = 2.0;
                const viewport = page.getViewport({ scale: scale });
                
                // Set canvas dimensions
                resumeCanvas.width = viewport.width;
                resumeCanvas.height = viewport.height;
                
                const context = resumeCanvas.getContext('2d');
                
                // Render PDF page to canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                
                // Convert canvas to image and set as preview
                resumePreview.src = resumeCanvas.toDataURL('image/png');
                resumePreview.style.display = 'block';
            } catch (error) {
                console.error('Error loading PDF preview:', error);
                // Fallback: show a placeholder or error message
                resumePreview.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23f0f0f0" width="400" height="600"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EResume Preview%3C/text%3E%3C/svg%3E';
                resumePreview.style.display = 'block';
            }
        }
        
        // Load the preview when page loads
        loadResumePreview();
    } else if (!resumePreview || !resumeCanvas) {
        console.error('Resume preview elements not found');
    } else {
        console.warn('PDF.js not loaded. Make sure the script tag is included.');
    }
    
    // Function to open modal
    function openResumeModal() {
        resumeModal.classList.add('active');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeResumeModalFunc() {
        resumeModal.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Add click event to resume wrapper
    if (resumeWrapper) {
        resumeWrapper.addEventListener('click', openResumeModal);
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

