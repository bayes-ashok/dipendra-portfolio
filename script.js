// script.js - Clean version from scratch

const slidesData = [
    { type: "image", src: "img/1.jpg", date: "03.25" },
    { type: "image", src: "img/2.png", date: "03.25" },
    { type: "image", src: "img/3.png", date: "03.25" },
    { type: "image", src: "img/afa.jpg", date: "03.25" },
    { type: "image", src: "img/agah.jpg", date: "03.25" },
    { type: "image", src: "img/hag.jpg", date: "03.25" },
    { type: "image", src: "img/hgsh.jpg", date: "03.25" },
    { type: "image", src: "img/hsghs.jpg", date: "03.25" },
    { type: "image", src: "img/img.png", date: "03.25" },
    { type: "image", src: "img/Screenshot 2026-03-25 194550.png", date: "03.25" },
    { type: "image", src: "img/sggs.jpg", date: "03.25" },
    { type: "image", src: "img/sh.jpg", date: "03.25" },
    { type: "image", src: "img/t.png", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.40.33.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.05.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.06.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.07.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.09.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.10.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.12.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.13.jpeg", date: "03.25" },
    { type: "image", src: "img/WhatsApp Image 2026-03-25 at 19.41.14.jpeg", date: "03.25" },

    // Videos
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.40.32.mp4", poster: "img/2.png", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.04.mp4", poster: "img/3.png", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.07.mp4", poster: "img/hgsh.jpg", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.08.mp4", poster: "img/hsghs.jpg", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.11.mp4", poster: "img/img.png", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.12.mp4", poster: "img/t.png", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.13.mp4", poster: "img/sggs.jpg", date: "03.25" },
    { type: "video", src: "img/WhatsApp Video 2026-03-25 at 19.41.14.mp4", poster: "img/sh.jpg", date: "03.25" }
];

let currentIndex = 0;
let isAutoPlaying = true;
let autoplayInterval = null;
let isMuted = true;
let touchStartX = 0;

// DOM Elements
const slidesWrapper = document.getElementById("slides-wrapper");
const timelineDots = document.getElementById("timeline-dots");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const loader = document.getElementById("loader");
const pauseIndicator = document.getElementById("pause-indicator");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const videoMuteBtn = document.getElementById("video-mute-btn");
const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

function renderSlides() {
    slidesWrapper.innerHTML = "";
    slidesData.forEach((slide, index) => {
        const slideEl = document.createElement("div");
        slideEl.className = `slide ${index === 0 ? "active" : ""}`;

        if (slide.type === "image") {
            slideEl.innerHTML = `<img src="${slide.src}" alt="Memory" loading="lazy">`;
        } else {
            slideEl.innerHTML = `
                <video 
                    src="${slide.src}" 
                    poster="${slide.poster}" 
                    muted 
                    playsinline>
                </video>`;
        }
        slidesWrapper.appendChild(slideEl);
    });
}

function renderDots() {
    timelineDots.innerHTML = "";
    slidesData.forEach((slide, i) => {
        const container = document.createElement("div");
        container.style.position = "relative";

        const dot = document.createElement("div");
        dot.className = `dot ${i === 0 ? "active" : ""}`;
        dot.dataset.index = i;

        const label = document.createElement("div");
        label.className = "dot-label";
        label.textContent = slide.date;

        container.append(dot, label);
        timelineDots.appendChild(container);

        dot.addEventListener("click", () => goToSlide(i));
    });
}

function handleMedia() {
    document.querySelectorAll("video").forEach(v => v.pause());
    
    const currentSlide = slidesWrapper.children[currentIndex];
    const video = currentSlide ? currentSlide.querySelector("video") : null;
    
    if (video) {
        video.muted = isMuted;
        video.play().catch(() => {});
    }
}

function goToSlide(index) {
    currentIndex = (index + slidesData.length) % slidesData.length;
    slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll(".slide").forEach((s, i) => 
        s.classList.toggle("active", i === currentIndex)
    );
    
    document.querySelectorAll(".dot").forEach((d, i) => 
        d.classList.toggle("active", i === currentIndex)
    );

    handleMedia();
}

function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
        if (isAutoPlaying) goToSlide(currentIndex + 1);
    }, 5200);
}

function pauseAutoplay() {
    isAutoPlaying = false;
    clearInterval(autoplayInterval);
    pauseIndicator.classList.add("show");
}

function resumeAutoplay() {
    isAutoPlaying = true;
    pauseIndicator.classList.remove("show");
    startAutoplay();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

function toggleVideoMute() {
    isMuted = !isMuted;
    const icon = document.getElementById("mute-icon");
    
    icon.innerHTML = isMuted ? 
        `<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M23 9L17 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
         <path d="M17 9L23 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` :
        `<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M19 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;

    const video = slidesWrapper.children[currentIndex].querySelector("video");
    if (video) video.muted = isMuted;
}

function toggleBackgroundMusic() {
    bgMusic.paused ? bgMusic.play() : bgMusic.pause();
}

// Event Listeners
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    if (e.key === " ") {
        e.preventDefault();
        isAutoPlaying ? pauseAutoplay() : resumeAutoplay();
    }
});

const sliderContainer = document.getElementById("slider-container");

sliderContainer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 80) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
});

sliderContainer.addEventListener("mouseenter", pauseAutoplay);
sliderContainer.addEventListener("mouseleave", () => {
    if (isAutoPlaying) resumeAutoplay();
});

// Initialize Everything
function init() {
    renderSlides();
    renderDots();
    startAutoplay();

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    fullscreenBtn.addEventListener("click", toggleFullscreen);
    videoMuteBtn.addEventListener("click", toggleVideoMute);
    musicToggle.addEventListener("click", toggleBackgroundMusic);

    // Hide loader
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 600);
    }, 1400);

    console.log("%c✅ Memory Lane Gallery Loaded Successfully", "color:#00f0ff; font-size:14px");
}

window.addEventListener("load", init);