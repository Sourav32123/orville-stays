// ============================
// Contact Form Validation + Netlify Submission
// ============================
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullName = form.querySelector('input[name="fullName"]');
    const phone = form.querySelector('input[name="phone"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    let errors = [];

    if (!fullName.value.trim()) errors.push("Full Name is required.");
    if (!/^\d{10}$/.test(phone.value.replace(/\D/g, ""))) errors.push("Enter a valid 10-digit phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.push("Enter a valid email address.");
    if (!message.value.trim()) errors.push("Message is required.");

    if (errors.length > 0) {
      alert("Form Errors:\n" + errors.join("\n"));
      return;
    }

    // Netlify submission
    const data = new FormData(form);
    const action = form.action;

    try {
      const response = await fetch(action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("✅ Thank you! Your enquiry has been sent.");
        form.reset();
      } else {
        alert("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("⚠️ Network error. Please try again later.");
    }
  });
}

// ============================
// Carousel Functionality
// ============================
const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector(".next");
  const prevButton = carousel.querySelector(".prev");
  const dotsNav = carousel.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  const dots = dotsNav.querySelectorAll(".dot");

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
});
