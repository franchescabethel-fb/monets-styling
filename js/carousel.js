// Simple dependency-free image carousel used on the Monet's Styling home page.
(function () {
  const root = document.getElementById("home-carousel");
  if (!root) return;

  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const prevBtn = root.querySelector(".carousel-arrow.prev");
  const nextBtn = root.querySelector(".carousel-arrow.next");
  const dotsWrap = root.querySelector(".carousel-dots");

  if (!slides.length) return;

  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 5000;

  // Build dots
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function update() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
    restart();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  root.addEventListener("mouseenter", () => timer && clearInterval(timer));
  root.addEventListener("mouseleave", restart);

  update();
  restart();
})();
