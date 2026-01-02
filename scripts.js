document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ==============================
     HERO IMAGE VERTICAL LOOP
  ============================== */
  document.querySelectorAll(".image-column").forEach((column) => {
    const speed = Number(column.dataset.speed) || 1;
    const track = column.querySelector(".image-track");
    if (!track) return; // safety

    // Duplicate once
    track.innerHTML += track.innerHTML;

    const images = track.querySelectorAll("img");

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
      if (!singleSetHeight) return;

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

  /* ==============================
     HEADER SCROLL EFFECT
  ============================== */
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ==============================
     MUST VISIT SLIDER (SAFE)
  ============================== */
  const mustVisitTrack = document.querySelector(".mustvisit__track");
  const prevBtn = document.querySelector(".nav--prev");
  const nextBtn = document.querySelector(".nav--next");

  let index = 0;
  const cardWidth = 284;

  if (mustVisitTrack && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      const maxIndex = mustVisitTrack.children.length - 3;
      index = Math.min(index + 1, maxIndex);
      mustVisitTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    });

    prevBtn.addEventListener("click", () => {
      index = Math.max(index - 1, 0);
      mustVisitTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    });
  }

  /* ==============================
     PARTICIPATING SCHOOLS LOGOS
     CONTINUOUS SLING ANIMATION
  ============================== */
  document.querySelectorAll(".logos__track").forEach((track) => {
    if (!track) return;

    // Duplicate content once
    const original = track.innerHTML;
    track.innerHTML = original + original;

    const images = [...track.querySelectorAll("img")];

    Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => (img.onload = res))
      )
    ).then(() => {
      const distance = track.scrollWidth / 2;
      if (!distance) return;

      const direction = track.classList.contains("logos__track--r2l") ? 1 : -1;

      const loop = gsap.to(track, {
        x: direction * -distance,
        duration: 30,
        ease: "none",
        repeat: -1
      });

      // Pause for accessibility
      track.addEventListener("mouseenter", () => loop.pause());
      track.addEventListener("mouseleave", () => loop.resume());
      track.addEventListener("focusin", () => loop.pause());
      track.addEventListener("focusout", () => loop.resume());
    });
  });
});

/* ==============================
   CHOOSE SECTION – MOBILE SLIDER DOTS
============================== */
document.addEventListener("DOMContentLoaded", () => {
  const chooseGrid = document.querySelector("[data-mobile-slider]");
  if (!chooseGrid) return;

  const pagination = chooseGrid.parentElement.querySelector(".pagination");
  const cards = Array.from(chooseGrid.querySelectorAll(".choose__card"));

  // Only enable slider + dots on mobile
  if (window.innerWidth >= 600) return;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      chooseGrid.scrollTo({
        left: cards[i].offsetLeft,
        behavior: "smooth"
      });
    });

    pagination.appendChild(dot);
  });

  const dots = pagination.querySelectorAll("button");

  // Update active dot on scroll
  chooseGrid.addEventListener("scroll", () => {
    const index = Math.round(
      chooseGrid.scrollLeft / cards[0].offsetWidth
    );

    dots.forEach((d) => d.classList.remove("active"));
    dots[index]?.classList.add("active");
  });
});
