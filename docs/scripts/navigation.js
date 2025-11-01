document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');

    // Initialize counter display
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    function showSlide(n) {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate new slide index
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Show new slide
        slides[currentSlide].classList.add('active');
        
        // Update counter
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentSlide + 1;
        }
        
        // Update button states for boundaries
        if (prevBtn) {
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                showSlide(0);
                break;
            case 'End':
                e.preventDefault();
                showSlide(totalSlides - 1);
                break;
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only process horizontal swipes (ignore vertical scrolling)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startX = 0;
        startY = 0;
    });

    // Initialize first slide
    showSlide(0);

    // Auto-play animations for stat bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statBars = entry.target.querySelectorAll('.stat-bar-fill');
                statBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    });

    slides.forEach(slide => {
        observer.observe(slide);
    });
});
