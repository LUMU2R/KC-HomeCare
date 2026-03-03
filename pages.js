$(document).ready(function () {

  // ========== MOBILE MENU TOGGLE ==========
  $('#menu').on('click', function (e) {
    e.stopPropagation();
    $(this).toggleClass('fa-bars').toggleClass('fa-times');
    $('.navbar').toggleClass('active');
  });

  // ========== NAVBAR SCROLL EFFECTS ==========
  $(window).on('scroll load', function () {
    // Close mobile menu on scroll
    $('#menu').removeClass('fa-times').addClass('fa-bars');
    $('.navbar').removeClass('active');

    if ($(window).scrollTop() > 60) {
      $('.header').addClass('scrolled');
    } else {
      $('.header').removeClass('scrolled');
    }

    // WhatsApp float + back-to-top visibility
    if ($(window).scrollTop() > 300) {
      $('.whatsapp-float').addClass('visible');
      $('#backToTop').addClass('visible');
    } else {
      $('.whatsapp-float').removeClass('visible');
      $('#backToTop').removeClass('visible');
    }
  });

  // ========== BACK TO TOP ==========
  $('#backToTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  // ========== CLOSE MOBILE MENU ON OUTSIDE CLICK ==========
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.navbar, #menu').length) {
      $('#menu').removeClass('fa-times').addClass('fa-bars');
      $('.navbar').removeClass('active');
    }
  });

  // ========== BUBBLE RIPPLE EFFECT ON ALL BUTTONS ==========
  function createBubbles(e, btn) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    btn.classList.remove('rippling');
    void btn.offsetWidth;
    btn.style.setProperty('--ripple-x', (e.clientX - rect.left - size / 2) + 'px');
    btn.style.setProperty('--ripple-y', (e.clientY - rect.top - size / 2) + 'px');
    btn.style.setProperty('--ripple-size', size + 'px');
    btn.classList.add('rippling');

    const colours = ['#b7f5d4', '#7de8b4', '#25D366', '#10b981', '#a7f3d0', '#fff'];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('btn-bubble-particle');
      const bSize = Math.random() * 14 + 6;
      bubble.style.cssText = `
        width:${bSize}px; height:${bSize}px;
        left:${e.clientX + (Math.random() - 0.5) * 60}px;
        top:${e.clientY + (Math.random() - 0.5) * 30}px;
        background:${colours[Math.floor(Math.random() * colours.length)]};
        opacity:0.85;
        animation-duration:${0.6 + Math.random() * 0.5}s;
        animation-delay:${Math.random() * 0.15}s;
      `;
      document.body.appendChild(bubble);
      bubble.addEventListener('animationend', () => bubble.remove());
    }

    setTimeout(() => btn.classList.remove('rippling'), 800);
  }

  $(document).on('click', '.btn, .filter-btn, .carousel-control, .nav-quote', function (e) {
    createBubbles(e, this);
  });

  // ========== GALLERY FILTER ==========
  $('.filter-btn').click(function () {
    const filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.gallery-item').removeClass('hidden').css({ opacity: 0 });
      setTimeout(() => $('.gallery-item').css({ opacity: 1, transition: 'opacity 0.4s ease' }), 10);
    } else {
      $('.gallery-item').each(function () {
        const cat = $(this).data('category');
        if (cat === filter) {
          $(this).removeClass('hidden').css({ opacity: 0 });
          setTimeout(() => $(this).css({ opacity: 1, transition: 'opacity 0.4s ease' }), 10);
        } else {
          $(this).addClass('hidden');
        }
      });
    }
  });

  // ========== CONTACT FORM SUBMISSION ==========
  $('form.contact-form').submit(function (e) {
    e.preventDefault();
    const name    = $(this).find('input[type="text"]').first().val();
    const email   = $(this).find('input[type="email"]').val();
    const message = $(this).find('textarea').val();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });

  // ========== FOOTER NEWSLETTER ==========
  $('.footer .box .btn').click(function (e) {
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

  // ========== AOS INIT ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100,
    });
  }

  // ========== PARALLAX (pages with .page-hero) ==========
  $(window).scroll(function () {
    const scrolled = $(window).scrollTop();
    $('.page-hero').css('background-position', 'center ' + (scrolled * 0.35) + 'px');
  });

});