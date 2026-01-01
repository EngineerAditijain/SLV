gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".image-column").forEach((column) => {
  const speed = Number(column.dataset.speed) || 1;
  const track = column.querySelector(".image-track");
  const images = track.querySelectorAll("img");

  // Duplicate once
  track.innerHTML += track.innerHTML;

  // Wait for ALL images to load
  let loaded = 0;
  images.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.onload = () => {
        loaded++;
        if (loaded === images.length) startLoop();
      };
    }
  });

  if (loaded === images.length) startLoop();

  function startLoop() {
    const singleSetHeight = track.scrollHeight / 2;

    // SAFETY CHECK
    if (singleSetHeight === 0) return;

    const loop = gsap.to(track, {
      y: -singleSetHeight,
      duration: 26 / speed,
      ease: "none",
      repeat: -1
    });

    column.addEventListener("mouseenter", () => loop.pause());
    column.addEventListener("mouseleave", () => loop.resume());
  }
});
// Smooth scroll detection for header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const track = document.querySelector(".mustvisit__track");
const prevBtn = document.querySelector(".nav--prev");
const nextBtn = document.querySelector(".nav--next");

let index = 0;
const cardWidth = 284; // card + gap

nextBtn.addEventListener("click", () => {
  const maxIndex = track.children.length - 3;
  index = Math.min(index + 1, maxIndex);
  track.style.transform = `translateX(-${index * cardWidth}px)`;
});

prevBtn.addEventListener("click", () => {
  index = Math.max(index - 1, 0);
  track.style.transform = `translateX(-${index * cardWidth}px)`;
});
