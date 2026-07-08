// Adds click-and-drag scrolling to the horizontal, swipeable image gallery
// on the Monet's Styling home page. Touch and trackpad swipe already work
// natively via the browser; this just makes it drag-friendly with a mouse.
(function () {
  const el = document.getElementById("home-hscroll");
  if (!el) return;

  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    moved = false;
    el.classList.add("dragging");
    startX = e.pageX;
    startScroll = el.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) moved = true;
    el.scrollLeft = startScroll - dx;
  });

  // Prevent the click-through to a slide's link if the user was dragging.
  el.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
})();
