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

  // ✨ Particles Animation for Hero Background
  const canvas = document.getElementById("particlesCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

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
        const isMobile = canvas.width < 768;
        const baseOpacity = isMobile ? 0.15 : 0.25;
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity * baseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const width = canvas.width;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      let particleCount;
      if (isMobile) {
        particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 30);
      } else if (isTablet) {
        particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 50);
      } else {
        particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      }
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles with lines - responsive distance
      const isMobile = canvas.width < 768;
      const maxDistance = isMobile ? 80 : 120;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }

  const typingPhrases = {
    en: ["Web Developer", "Frontend Developer", "UI Enthusiast"],
    fa: ["توسعه دهنده وب", "برنامه نویس فرانت اند"]
  };

  let currentLanguage = localStorage.getItem("language") || "en";
  let currentTheme = localStorage.getItem("theme") || "dark";
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer;

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    themeIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
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
  const skillBars = document.querySelectorAll(".skill-progress");
  document.querySelectorAll(".skill-card").forEach((card) => {
    const color = card.dataset.color || "#6c63ff";
    card.style.setProperty("--skill-color", color);
    const icon = card.querySelector("i");
    if (icon) icon.style.color = color;
  });

  let skillsAnimated = false;
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillBars.forEach((bar) => {
          bar.style.width = `${bar.dataset.progress}%`;
        });
        skillsAnimated = true;
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });
  skillsObserver.observe(skillsSection);

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
});