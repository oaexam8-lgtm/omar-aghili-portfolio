document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const langToggle = document.getElementById("langToggle");
  const typingText = document.getElementById("typingText");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const contactForm = document.getElementById("contactForm");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const toast = document.getElementById("toast");
  const navHeight = 72;

  // ✨ Particles Animation for Hero Background (Desktop Only)
  const canvas = document.getElementById("particlesCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    let isAnimating = false;

    // بررسی اینکه آیا دستگاه دسکتاپ است یا نه
    function isDesktop() {
      return window.innerWidth >= 1024;
    }

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity * 0.25})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      if (!isDesktop()) return; // موبایل/تبلت: هیچ ذره‌ای ایجاد نمی‌شود
      
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      if (!isAnimating) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animateParticles);
    }

    function startAnimation() {
      if (!isDesktop() || isAnimating) return;
      isAnimating = true;
      animateParticles();
    }

    function stopAnimation() {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }

    // IntersectionObserver برای فعال/غیرفعال کردن انیمیشن
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && isDesktop()) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      }, { threshold: 0.1 });

      heroObserver.observe(heroSection);
    }

    // راه‌اندازی اولیه
    resizeCanvas();
    initParticles();
    if (isDesktop()) {
      startAnimation();
    }

    // مدیریت تغییر سایز پنجره
    window.addEventListener("resize", () => {
      const wasDesktop = particles.length > 0;
      const nowDesktop = isDesktop();
      
      resizeCanvas();
      
      // اگر از موبایل به دسکتاپ یا بالعکس تغییر کرد
      if (wasDesktop !== nowDesktop) {
        stopAnimation();
        initParticles();
        if (nowDesktop) {
          startAnimation();
        }
      } else if (nowDesktop) {
        // فقط در دسکتاپ، ذرات را دوباره مقداردهی کن
        initParticles();
      }
    });
  }

  const typingPhrases = {
    en: ["Frontend Web Developer"],
    fa: ["توسعه دهنده فرانت اند وب"]
  };

  let currentLanguage = localStorage.getItem("language") || "en";
  let currentTheme = localStorage.getItem("theme") || "dark";
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer;

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    const themeIcon = document.getElementById("themeIcon");
    const useElement = themeIcon.querySelector("use");
    useElement.setAttribute("href", theme === "dark" ? "#icon-moon" : "#icon-sun");
    localStorage.setItem("theme", theme);
    currentTheme = theme;
  }

  function applyLanguage(lang) {
    currentLanguage = lang;
    html.setAttribute("lang", lang === "fa" ? "fa" : "en");
    html.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    html.classList.toggle("fa-mode", lang === "fa");
    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-en][data-fa]").forEach((node) => {
      const text = node.getAttribute(lang === "fa" ? "data-fa" : "data-en");
      node.textContent = text;
    });

    langToggle.textContent = lang === "fa" ? "فا | EN" : "EN | فا";
    restartTyping();
  }

  function typeLoop() {
    const phrases = typingPhrases[currentLanguage];
    const fullText = phrases[phraseIndex];

    if (!isDeleting) {
      typingText.textContent = fullText.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex === fullText.length) {
        isDeleting = true;
        typingTimer = setTimeout(typeLoop, 1100);
        return;
      }
      typingTimer = setTimeout(typeLoop, 90);
    } else {
      typingText.textContent = fullText.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimer = setTimeout(typeLoop, 260);
        return;
      }
      typingTimer = setTimeout(typeLoop, 45);
    }
  }

  function restartTyping() {
    clearTimeout(typingTimer);
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingText.textContent = "";
    typeLoop();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function toggleMobileMenu(forceClose = false) {
    const shouldOpen = forceClose ? false : !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", shouldOpen);
    mobileOverlay.classList.toggle("is-open", shouldOpen);
  }

  function validateField(input, rule, errorId) {
    const errorNode = document.getElementById(errorId);
    const value = input.value.trim();
    const errorText = rule(value, currentLanguage);
    input.classList.toggle("invalid", Boolean(errorText));
    errorNode.textContent = errorText || "";
    return !errorText;
  }

  const validators = {
    name: (value, lang) => {
      if (value.length >= 2) return "";
      return lang === "fa" ? "نام باید حداقل 2 کاراکتر باشد." : "Name must be at least 2 characters.";
    },
    email: (value, lang) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (regex.test(value)) return "";
      return lang === "fa" ? "ایمیل معتبر وارد کنید." : "Please enter a valid email address.";
    },
    message: (value, lang) => {
      if (value.length >= 10) return "";
      return lang === "fa" ? "پیام باید حداقل 10 کاراکتر باشد." : "Message must be at least 10 characters.";
    }
  };

  // 🎬 Enhanced Reveal Observer with Multiple Elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  // Observe all reveal elements
  document.querySelectorAll(".reveal").forEach((node) => {
    revealObserver.observe(node);
  });

  // 🎯 Observe special elements for animations
  const specialElements = [
    '.about-left',
    '.about-right',
    '.about-text',
    '.stat-item',
    '.skill-card',
    '.project-card',
    '.contact-subtitle',
    '.contact-icons',
    '.contact-form',
    '#skills .section-title',
    '#projects .section-title',
    '#contact .section-title'
  ];

  specialElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      revealObserver.observe(el);
    });
  });

  const skillsSection = document.getElementById("skills");
  document.querySelectorAll(".skill-card").forEach((card) => {
    const color = card.dataset.color || "#6c63ff";
    card.style.setProperty("--skill-color", color);
    const icon = card.querySelector(".icon");
    if (icon) icon.style.color = color;
  });

  // Sync active state between desktop and mobile nav links while scrolling.
  const sections = [...document.querySelectorAll("main section[id]")];
  const allNavLinks = [...document.querySelectorAll(".nav-link, .mobile-nav-link")];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        allNavLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", active);
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach((section) => sectionObserver.observe(section));

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
      toggleMobileMenu(true);
    });
  });

  mobileMenuToggle.addEventListener("click", () => toggleMobileMenu());
  mobileOverlay.addEventListener("click", () => toggleMobileMenu(true));
  document.addEventListener("click", (event) => {
    if (!mobileMenu.classList.contains("is-open")) return;
    if (mobileMenu.contains(event.target) || mobileMenuToggle.contains(event.target)) return;
    toggleMobileMenu(true);
  });

  themeToggle.addEventListener("click", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  langToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "en" ? "fa" : "en");
  });

  ["name", "email", "message"].forEach((field) => {
    const input = document.getElementById(field);
    const errorId = `${field}Error`;
    input.addEventListener("blur", () => validateField(input, validators[field], errorId));
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        validateField(input, validators[field], errorId);
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const validName = validateField(nameInput, validators.name, "nameError");
    const validEmail = validateField(emailInput, validators.email, "emailError");
    const validMessage = validateField(messageInput, validators.message, "messageError");

    if (validName && validEmail && validMessage) {
      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach((el) => el.classList.remove("invalid"));
      showToast(currentLanguage === "fa" ? "پیام شما با موفقیت ارسال شد." : "Message sent successfully.");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 300);
  });

  setTheme(currentTheme);
  applyLanguage(currentLanguage);

  // 🖼️ Image Gallery Carousel Functionality
  const galleryModal = document.getElementById("galleryModal");
  const galleryTrack = document.getElementById("galleryTrack");
  const galleryClose = document.querySelector(".gallery-close");
  const galleryBackdrop = document.querySelector(".gallery-backdrop");

  let currentGalleryImages = [];
  let currentGalleryIndex = 0;

  function openGallery(images, startIndex = 0) {
    currentGalleryImages = images;
    currentGalleryIndex = startIndex;
    
    // Create slides
    galleryTrack.innerHTML = "";
    images.forEach((imageData, index) => {
      const slide = document.createElement("div");
      slide.className = "gallery-slide";
      
      const img = document.createElement("img");
      img.src = imageData.src;
      img.alt = imageData.alt;
      img.loading = "lazy";
      
      slide.appendChild(img);
      slide.addEventListener("click", () => {
        if (index !== currentGalleryIndex) {
          showGalleryImage(index);
        }
      });
      
      galleryTrack.appendChild(slide);
    });

    updateGallerySlides();
    galleryModal.classList.add("active");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    galleryModal.classList.remove("active");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentGalleryImages = [];
  }

  function showGalleryImage(index) {
    if (index < 0 || index >= currentGalleryImages.length) return;
    currentGalleryIndex = index;
    updateGallerySlides();
  }

  function updateGallerySlides() {
    const slides = galleryTrack.querySelectorAll(".gallery-slide");

    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next", "hidden");
      
      if (index === currentGalleryIndex) {
        slide.classList.add("active");
      } else if (index === currentGalleryIndex - 1 || 
                 (currentGalleryIndex === 0 && index === slides.length - 1)) {
        slide.classList.add("prev");
      } else if (index === currentGalleryIndex + 1 || 
                 (currentGalleryIndex === slides.length - 1 && index === 0)) {
        slide.classList.add("next");
      } else {
        slide.classList.add("hidden");
      }
    });
  }

  function nextImage() {
    const newIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    showGalleryImage(newIndex);
  }

  function prevImage() {
    const newIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showGalleryImage(newIndex);
  }

  // Event listeners for gallery
  galleryClose.addEventListener("click", closeGallery);
  galleryBackdrop.addEventListener("click", closeGallery);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!galleryModal.classList.contains("active")) return;
    
    if (e.key === "Escape") closeGallery();
    else if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "ArrowRight") nextImage();
  });

  // Setup gallery triggers for project cards
  document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const projectCard = trigger.closest(".project-card");
      const galleryData = projectCard.querySelector(".gallery-data");
      
      if (!galleryData) return;
      
      const images = Array.from(galleryData.querySelectorAll("img")).map((img) => ({
        src: img.dataset.src,
        alt: img.alt,
        caption: currentLanguage === "fa" ? img.dataset.captionFa : img.dataset.captionEn
      }));
      
      if (images.length > 0) {
        openGallery(images, 0);
      }
    });
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  galleryModal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  galleryModal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage(); // Swipe left
      } else {
        prevImage(); // Swipe right
      }
    }
  }
});