document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       CLICK CELEBRATION BURST
    ============================== */

    document.addEventListener("click", function (e) {
        createBurst(e.clientX, e.clientY);
    });

    function createBurst(x, y) {
        const count = 20;

        for (let i = 0; i < count; i++) {
            const spark = document.createElement("div");
            spark.className = "spark";

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 20;

            spark.style.left = x + "px";
            spark.style.top = y + "px";

            spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
            spark.style.setProperty("--y", Math.sin(angle) * distance + "px");

            document.body.appendChild(spark);
            

            setTimeout(() => spark.remove(), 700);
        }
    }

    /* ==============================
       LOADER LOGIC
    ============================== */

    let progress = 0;

    const bar = document.querySelector(".progress-bar");
    const percent = document.querySelector(".percentage");
    const loader = document.getElementById("loader");
    const loaderContent = document.querySelector(".loader-content");
    const welcomeText = document.querySelector(".welcome-text");
    const goku = document.querySelector(".goku");

    if (!bar || !percent || !loader) return;

    const interval = setInterval(() => {

        progress++;

        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        /* Goku charging near 85% */
        if (goku && progress > 85) {
            goku.classList.add("charging");
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(startWelcomeAnimation, 400);
        }

    }, 25);

    /* ==============================
       WELCOME + TRANSITION
    ============================== */

    function startWelcomeAnimation() {

        if (goku) goku.classList.remove("charging");

        if (loaderContent)
            loaderContent.style.opacity = "0";

        setTimeout(() => {
            if (welcomeText) {
                welcomeText.style.opacity = "1";
                welcomeText.classList.add("animate");
            }
        }, 500);

        setTimeout(() => {
            loader.classList.add("zoom-out");
        }, 2000);

        setTimeout(() => {
            loader.style.display = "none";
            document.body.classList.add("loaded");
        }, 2800);
    }

});

/* ==============================
   PROFILE MODAL LOGIC
============================== */

const profileIcon = document.getElementById("profileIcon");
const profileModal = document.getElementById("profileModal");
const closeModal = document.querySelector(".close-modal");

if (profileIcon && profileModal) {

    profileIcon.addEventListener("click", () => {
        profileModal.classList.add("active");
    });

    closeModal.addEventListener("click", () => {
        profileModal.classList.remove("active");
    });

    profileModal.addEventListener("click", (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove("active");
        }
    });
}

/* ==============================
   CAROUSEL SLIDER FUNCTIONALITY
============================== */

document.addEventListener("DOMContentLoaded", function() {
    
    // Get carousel elements
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    let currentSlide = 0;
    const totalSlides = carouselSlides.length;
    
    // Function to update carousel
    function updateCarousel(slideIndex) {
        currentSlide = (slideIndex + totalSlides) % totalSlides;
        
        // Remove active class from all slides and dots
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        carouselSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateCarousel(currentSlide + 1);
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateCarousel(currentSlide - 1);
        });
    }
    
    // Dots navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            updateCarousel(slideIndex);
        });
    });
    
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        updateCarousel(currentSlide + 1);
    }, 5000);
});

/* ==============================
   SKILL CARDS FLIP FUNCTIONALITY
============================== */

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('click', function(event) {
        this.classList.toggle('flipped');
    });
});

/* ================================
   PROJECTS CAROUSEL FUNCTIONALITY
================================ */

document.addEventListener("DOMContentLoaded", function() {
    
    const projectCards = document.querySelectorAll('.project-card');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const projectCounter = document.querySelector('.project-counter .current');
    
    let currentIndex = 0;
    const totalProjects = projectCards.length;
    let autoRotateInterval;
    
    // Initialize carousel
    function initCarousel() {
        projectCards[0].classList.add('active');
        indicators[0].classList.add('active');
        updateCounter();
        // Auto-rotation removed - manual navigation only
    }
    
    // Update carousel to show specific project
    function updateCarousel(newIndex) {
        // Remove active class from all
        projectCards.forEach(card => card.classList.remove('active', 'prev', 'next'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to current
        projectCards[newIndex].classList.add('active');
        indicators[newIndex].classList.add('active');
        
        // Add directional classes for animation
        projectCards.forEach((card, index) => {
            if (index < newIndex) {
                card.classList.add('prev');
            } else if (index > newIndex) {
                card.classList.add('next');
            }
        });
        
        currentIndex = newIndex;
        updateCounter();
        
        // Auto-rotation removed - no reset needed
    }
    
    // Update project counter display
    function updateCounter() {
        if (projectCounter) {
            projectCounter.textContent = currentIndex + 1;
        }
    }
    
    // Navigate to next project
    function nextProject() {
        const newIndex = (currentIndex + 1) % totalProjects;
        updateCarousel(newIndex);
    }
    
    // Navigate to previous project
    function prevProject() {
        const newIndex = (currentIndex - 1 + totalProjects) % totalProjects;
        updateCarousel(newIndex);
    }
    
    // Go to specific project
    function goToProject(index) {
        if (index >= 0 && index < totalProjects) {
            updateCarousel(index);
        }
    }
    
    // Auto-rotate disabled - manual navigation only
    function startAutoRotate() {
        // Auto-rotation removed - carousel is now manual only
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextProject);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevProject);
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToProject(index);
        });
    });
    
    // Manual navigation only - no auto-rotation
    // Hover pause logic removed
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextProject();
        } else if (e.key === 'ArrowLeft') {
            prevProject();
        }
    });
    
    // Initialize carousel
    initCarousel();
    
});

/* ================================
   SMOOTH SCROLL TO PROJECTS
================================ */

document.addEventListener("DOMContentLoaded", function() {
    const projectsLink = document.querySelector('a[href="#projects"]');
    
    if (projectsLink) {
        projectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

/* ================================
   PROJECT MODAL VIEWER
================================ */

document.addEventListener("DOMContentLoaded", function() {
    
    // Project data with images
    const projectsData = [
        {
            id: 0,
            name: "🔮 BizLedger",
            type: "phone",  // Mobile app
            images: ["Assets/Bizledger/1.png", "Assets/Bizledger/2.png", "Assets/Bizledger/3.png", "Assets/Bizledger/4.png"]
        },
        {
            id: 1,
            name: "🌾 AgriSathi",
            type: "laptop",  // Web dashboard
            images: ["Assets/AgriSathi/1.png", "Assets/AgriSathi/2.png", "Assets/AgriSathi/3.png", "Assets/AgriSathi/4.png"]
        },
        {
            id: 2,
            name: "📊 DeepCrypt",
            type: "laptop",  // Web analytics
            images: ["Assets/Deepcrypt/1.png", "Assets/Deepcrypt/2.png", "Assets/Deepcrypt/3.png", "Assets/Deepcrypt/4.png"]
        },
        {
            id: 3,
            name: "🍕 Pizzap",
            type: "phone",  // Mobile app
            images: ["Assets/Pizzap/1.png", "Assets/Pizzap/1.png", "Assets/Pizzap/1.png", "Assets/Pizzap/1.png"]
        }
    ];

    const modal = document.getElementById("projectModal");
    const modalClose = document.querySelector(".modal-close");
    const projectLinks = document.querySelectorAll(".project-link");
    let currentImageIndex = 0;
    let currentProjectData = null;

    // Open modal when clicking View Project
    projectLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get the project card
            const projectCard = this.closest(".project-card");
            const projectIndex = Array.from(projectCard.parentElement.children).indexOf(projectCard);
            
            openProjectModal(projectIndex);
        });
    });

    // Open modal function
    function openProjectModal(projectIndex) {
        currentProjectData = projectsData[projectIndex];
        currentImageIndex = 0;

        // Update modal title
        document.getElementById("modalProjectTitle").textContent = currentProjectData.name;
        
        // Create device mockup
        createDeviceMockup();
        
        // Update image counter
        updateImageCounter();
        
        // Show modal
        modal.classList.add("active");
    }

    // Create device mockup based on type
    function createDeviceMockup() {
        const container = document.getElementById("modalDeviceContainer");
        container.innerHTML = "";

        if (currentProjectData.type === "phone") {
            container.innerHTML = `
                <div class="modal-phone-frame">
                    <div class="modal-phone-notch"></div>
                    <div class="modal-phone-screen">
                        <img src="${currentProjectData.images[currentImageIndex]}" alt="Project Screenshot">
                    </div>
                    <div class="modal-phone-home"></div>
                </div>
            `;
        } else if (currentProjectData.type === "laptop") {
            container.innerHTML = `
                <div class="modal-laptop-frame">
                    <div class="modal-laptop-top"></div>
                    <div class="modal-laptop-screen">
                        <img src="${currentProjectData.images[currentImageIndex]}" alt="Project Screenshot">
                    </div>
                    <div class="modal-laptop-stand"></div>
                </div>
            `;
        }
    }

    // Update image counter
    function updateImageCounter() {
        const counter = document.querySelector(".modal-image-counter .current");
        const total = document.querySelector(".modal-image-counter .total");
        counter.textContent = currentImageIndex + 1;
        total.textContent = currentProjectData.images.length;
    }

    // Next image
    document.querySelector(".modal-image-next").addEventListener("click", function() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectData.images.length;
        updateDeviceImage();
    });

    // Previous image
    document.querySelector(".modal-image-prev").addEventListener("click", function() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectData.images.length) % currentProjectData.images.length;
        updateDeviceImage();
    });

    // Update device image
    function updateDeviceImage() {
        const img = document.querySelector(".modal-phone-screen img, .modal-laptop-screen img");
        if (img) {
            img.src = currentProjectData.images[currentImageIndex];
        }
        updateImageCounter();
    }

    // Close modal
    function closeModal() {
        modal.classList.remove("active");
        currentProjectData = null;
        currentImageIndex = 0;
    }

    modalClose.addEventListener("click", closeModal);

    // Close on ESC key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Close on background click
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation for images
    document.addEventListener("keydown", function(e) {
        if (!modal.classList.contains("active")) return;
        
        if (e.key === "ArrowRight") {
            currentImageIndex = (currentImageIndex + 1) % currentProjectData.images.length;
            updateDeviceImage();
        } else if (e.key === "ArrowLeft") {
            currentImageIndex = (currentImageIndex - 1 + currentProjectData.images.length) % currentProjectData.images.length;
            updateDeviceImage();
        }
    });
});


/* ================================
   GLOBAL SCROLL REVEAL (FINAL)
================================ */

function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach(el => observer.observe(el));
}

/* Wait until loader finishes */
const revealWaiter = setInterval(() => {
    if (document.body.classList.contains("loaded")) {
        initScrollReveal();
        clearInterval(revealWaiter);
    }
}, 100);

/* ================================
   HERO TYPEWRITER EFFECT
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const words = [
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
    ];

    const typedText = document.getElementById("typed-text");
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1200);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, isDeleting ? 60 : 110);
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const recaptcha = document.querySelector(
      'textarea[name="g-recaptcha-response"]'
    );

    // ✅ Check if reCAPTCHA completed
    if (!recaptcha || recaptcha.value.trim() === "") {
      alert("⚠️ Please verify that you are human.");
      return;
    }

    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      alert("✅ Message sent successfully!");
      form.reset();
    } catch (err) {
      alert("❌ Something went wrong. Please try again.");
    }
  });
});