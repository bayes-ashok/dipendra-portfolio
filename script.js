// script.js - Crystal clear version

const slidesData = [
    { type: "image", src: "img/img.png" },
    { type: "image", src: "img/afa.jpg" },
    { type: "image", src: "img/agah.jpg" },
    { type: "video", src: "img/VID_20260325_193913.mp4" },
    { type: "image", src: "img/3.png" },
    { type: "image", src: "img/hag.jpg" },
    { type: "video", src: "img/VID-20260325-WA0003.mp4" },
    { type: "image", src: "img/1.jpg" },
    { type: "video", src: "img/Snapchat-2038632051.mp4" },
    { type: "image", src: "img/2.png" },
    { type: "video", src: "img/Snapchat-767716306.mp4" },
    { type: "video", src: "img/VID_20251108_235023.mp4" },
    { type: "video", src: "img/VID_20251129_084218_830.mp4" },
    { type: "video", src: "img/VID_20260325_192536.mp4" },
    { type: "image", src: "img/hgsh.jpg" },
    { type: "image", src: "img/hsghs.jpg" },
    { type: "image", src: "img/IMG_20260325_193147_306.jpg" },
    { type: "image", src: "img/IMG-20260325-WA0000.jpg" },
    { type: "image", src: "img/IMG-20260325-WA0002.jpg" },
    { type: "image", src: "img/IMG_20251113_223638_356.jpg" },
    { type: "image", src: "img/IMG_20251209_190311_135.webp" },
    { type: "image", src: "img/IMG_20251209_190340_880.webp" },
    { type: "image", src: "img/IMG_20260127_002259_502.jpg" },
    { type: "image", src: "img/IMG_20260324_200713_883.jpg" },
    { type: "image", src: "img/IMG_20260325_193021_160.jpg" },
    { type: "image", src: "img/IMG_20260325_193134_852.jpg" },
    { type: "image", src: "img/IMG_20260325_193243_172.jpg" },
    { type: "image", src: "img/IMG_20260325_193510_144.jpg" },
    { type: "image", src: "img/IMG_20260325_193521_419.jpg" },
    { type: "image", src: "img/IMG_20260325_193552_696.jpg" },
    { type: "image", src: "img/Screenshot 2026-03-25 194550.png" },
    { type: "image", src: "img/sggs.jpg" },
    { type: "image", src: "img/sh.jpg" },
    { type: "image", src: "img/t.png" }
];

let currentIndex = 0;

const slidesWrapper = document.getElementById("slides-wrapper");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const loader = document.getElementById("loader");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");
let hasStartedMusic = false;

function renderSlides() {
    slidesWrapper.innerHTML = "";
    slidesData.forEach((slide, index) => {
        const slideEl = document.createElement("div");
        slideEl.className = `slide ${index === 0 ? "active" : ""}`;

        if (slide.type === "image") {
            slideEl.innerHTML = `<img src="${slide.src}" alt="Memory" loading="lazy">`;
        } else {
            slideEl.innerHTML = `<video src="${slide.src}" controls playsinline></video>`;
        }
        slidesWrapper.appendChild(slideEl);
    });
}

function stopAllVideos() {
    document.querySelectorAll("video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function goToSlide(index) {
    stopAllVideos();
    currentIndex = (index + slidesData.length) % slidesData.length;
    slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll(".slide").forEach((s, i) =>
        s.classList.toggle("active", i === currentIndex)
    );
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
    } else {
        document.exitFullscreen();
    }
}

function toggleBackgroundMusic() {
    if (bgMusic.paused) {
        if (!hasStartedMusic) {
            bgMusic.currentTime = 58;   // Start from 34 seconds only on first play
            hasStartedMusic = true;
        }
        bgMusic.play().catch(() => console.log("Music playback was blocked"));
    } else {
        bgMusic.pause();
    }
}

// Keyboard
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
});

// Touch swipe
const sliderContainer = document.getElementById("slider-container");
let touchStartX = 0;

sliderContainer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 80) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
});

// Initialize
function init() {
    renderSlides();

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    fullscreenBtn.addEventListener("click", toggleFullscreen);
    musicToggle.addEventListener("click", toggleBackgroundMusic);

    // Hide loader
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 600);
    }, 1200);

    console.log("%c✅ Memory Lane - Crystal Clear Version Ready", "color:#00f0ff; font-size:14px");
}

window.addEventListener("load", init);
