$(document).ready(function(){
    
    // ========== MOBILE MENU TOGGLE ==========
    // ========== MOBILE MENU TOGGLE ==========
    $('#menu').on('click', function(e){
        e.stopPropagation();
        $(this).toggleClass('fa-bars').toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    // ========== NAVBAR SCROLL EFFECTS ==========
   
    // ========== NAVBAR SCROLL EFFECTS ==========
  $(window).on('scroll', function(){
    // Close mobile menu on scroll
    $('#menu').removeClass('fa-times').addClass('fa-bars');
    $('.navbar').removeClass('active');

        // Add scrolled class to header
        if($(window).scrollTop() > 60){
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }

        // WhatsApp float + back-to-top visibility
        if($(window).scrollTop() > 300){
            $('.whatsapp-float').addClass('visible');
            $('#backToTop').addClass('visible');
        } else {
            $('.whatsapp-float').removeClass('visible');
            $('#backToTop').removeClass('visible');
        }

        // Active section highlighting
        $('section').each(function(){
            let top = $(window).scrollTop();
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if(top >= offset && top < offset + height){
                $('.navbar a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Set header state correctly on first page load
    if($(window).scrollTop() > 60){
        $('.header').addClass('scrolled');
    }

    // ========== BACK TO TOP ==========
    $('#backToTop').click(function(){
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    // ========== SMOOTH SCROLLING ==========
    $('.navbar a, .hero-cta a').click(function(e){
        let target = $(this).attr('href');
        if(target && target.startsWith('#')){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800, 'swing');
            
            // Close mobile menu
            $('#menu').removeClass('fa-times').addClass('fa-bars');
            $('.navbar').removeClass('active');
        }
    });

    // ========== HERO CAROUSEL ==========
    let currentSlide = 0;
    let slides = $('.carousel-slide');
    let totalSlides = slides.length;
    let autoplayInterval;
    let isTransitioning = false;

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        slides.removeClass('active');
        $(slides[currentSlide]).addClass('active');

        $('.indicator').removeClass('active');
        $(`.indicator[data-slide="${currentSlide}"]`).addClass('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 1500);
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    function startAutoplay() { autoplayInterval = setInterval(nextSlide, 5000); }
    function stopAutoplay()  { clearInterval(autoplayInterval); }
    function resetAutoplay() { stopAutoplay(); startAutoplay(); }

    $('.carousel-control.next').click(function(){ nextSlide(); resetAutoplay(); });
    $('.carousel-control.prev').click(function(){ prevSlide(); resetAutoplay(); });

    $('.indicator').click(function(){
        showSlide(parseInt($(this).data('slide')));
        resetAutoplay();
    });

    $('.hero-carousel').hover(
        function(){ stopAutoplay(); },
        function(){ startAutoplay(); }
    );

    $(document).keydown(function(e){
        if($('.home').length && isInViewport($('.home')[0])) {
            if(e.keyCode === 37){ prevSlide(); resetAutoplay(); }
            else if(e.keyCode === 39){ nextSlide(); resetAutoplay(); }
        }
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    startAutoplay();

    // ========== ANIMATED COUNTERS ==========
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.data('target'));
            const duration = 2000;
            const increment = countTo / (duration / 50);
            let currentCount = 0;

            const counter = setInterval(() => {
                currentCount += increment;
                if (currentCount >= countTo) {
                    $this.text(countTo + '+');
                    clearInterval(counter);
                } else {
                    $this.text(Math.floor(currentCount));
                }
            }, 50);
        });

        counterAnimated = true;
    }

    $(window).on('scroll', function() {
        const parallaxSection = $('.parallax');
        if (parallaxSection.length) {
            const sectionTop = parallaxSection.offset().top;
            const sectionHeight = parallaxSection.outerHeight();
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scrollTop + windowHeight > sectionTop + (sectionHeight / 2)) {
                animateCounters();
            }
        }
    });

    // ========== AOS INIT ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // ========== FORM SUBMISSION ==========
    $('form').submit(function(e){
        e.preventDefault();
        
        const formData = {
            name: $(this).find('input[type="text"]').first().val(),
            email: $(this).find('input[type="email"]').val(),
            phone: $(this).find('input[type="tel"]').val(),
            message: $(this).find('textarea').val()
        };

        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');
        $(this)[0].reset();
    });

    // ========== PARALLAX EFFECT ==========
    $(window).scroll(function() {
        let scrolled = $(window).scrollTop();
        $('.parallax').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // ========== HOVER EFFECTS FOR SERVICE ICONS ==========
    $('.flex-btn').hover(
        function() { $(this).find('.icon-btn').css('animation', 'none'); },
        function() { $(this).find('.icon-btn').css('animation', 'pulse 2s ease infinite'); }
    );

    // ========== LAZY LOADING ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== CLOSE MOBILE MENU ON OUTSIDE CLICK ==========
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar, #menu').length) {
            $('#menu').removeClass('fa-times').addClass('fa-bars');
            $('.navbar').removeClass('active');
        }
    });

    // ========== FOOTER NEWSLETTER ==========
    $('.footer .box input[type="email"]').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            const email = $(this).val();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(email)) {
                alert('Thank you for subscribing to our newsletter!');
                $(this).val('');
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });

    $('.footer .box .btn').click(function(e) {
        e.preventDefault();
        const email = $(this).siblings('input[type="email"]').val();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            alert('Thank you for subscribing to our newsletter!');
            $(this).siblings('input[type="email"]').val('');
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // ========== PRELOADER ==========
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
        $('body').addClass('loaded');
    });

    // ========== ACCESSIBILITY ==========
    $('.carousel-control, .indicator').attr('tabindex', '0').keypress(function(e) {
        if (e.which === 13 || e.which === 32) {
            e.preventDefault();
            $(this).click();
        }
    });

    // ========== SMOOTH REVEAL ON SCROLL ==========
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.box, .content, .image');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 150) {
                element.classList.add('revealed');
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .box, .content, .image {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .box.revealed, .content.revealed, .image.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    $(window).on('scroll', revealOnScroll);
    revealOnScroll();

    console.log('%c👋 Welcome to KC Homecare!', 'font-size: 20px; color: #0a7c6e; font-weight: bold;');

});

// ========== DEBOUNCE ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(function() {}, 10);
window.addEventListener('scroll', debouncedScroll);