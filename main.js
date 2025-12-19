
// --------------------load navbar---------------------------//
const loadHTML = (selector, file) =>
  fetch(file)
    .then(res => res.text())
    .then(html => (document.querySelector(selector).innerHTML = html));

Promise.all([
  loadHTML("#navbar", "navbar.html"),
  loadHTML("#mobileMenuContainer", "mobileMenu.html")
]).then(() => {
  const menuBtn = document.querySelector("#menuBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  const toggleMenu = (open) => {
    mobileMenu.style.right = open ? "0" : "-260px";
  };

  // Open mobile menu
  menuBtn.addEventListener("click", () => toggleMenu(true));

  // Close mobile menu
  closeBtn.addEventListener("click", () => toggleMenu(false));

  mobileMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggleMenu(false);
  });
});

//-----load footer--------------//
// Load Footer on all pages
document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(res => {
      if (!res.ok) throw new Error("Footer not found");
      return res.text();
    })
    .then(html => {
      const footerContainer = document.getElementById("footer");
      if (footerContainer) {
        footerContainer.innerHTML = html;
      }
    })
    .catch(err => console.error("Footer load error:", err));
});





//----------------scope of services slider ---------------------------//
//----------------scope of services slider ---------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!track) return;

  const slides = [...track.children];

  let index = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  const slideWidth = () => slides[0].offsetWidth;

  const setTranslate = (x) => {
    track.style.transform = `translateX(${x}px)`;
  };

  const goToSlide = (i) => {
    index = Math.max(0, Math.min(i, slides.length - 1));
    currentTranslate = -index * slideWidth();
    prevTranslate = currentTranslate;
    track.style.transition = "transform 0.35s ease";
    setTranslate(currentTranslate);
  };

  // ---------- DRAG ----------
  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentTranslate = prevTranslate + (e.clientX - startX); // 🔥 FIX
    setTranslate(currentTranslate);
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;
    const threshold = slideWidth() * 0.25;

    if (movedBy < -threshold) index++;
    if (movedBy > threshold) index--;

    goToSlide(index);
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointerleave", endDrag);
  track.addEventListener("pointercancel", endDrag);

  // ---------- ARROWS ----------
  prevBtn?.addEventListener("click", () => goToSlide(index - 1));
  nextBtn?.addEventListener("click", () => goToSlide(index + 1));

  // ---------- INIT ----------
  window.addEventListener("load", () => goToSlide(0));
  window.addEventListener("resize", () => goToSlide(index));
});



//--------------FAQ section arrow --------------------//

function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");
  const arrow = button.querySelector(".faq-arrow");

  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

  if (isOpen) {
    answer.style.maxHeight = "0px";
    arrow.classList.remove("rotate-180");
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    arrow.classList.add("rotate-180");
  }
}


//slider
new Swiper(".swiper", {
  slidesPerView: 1,
  loop: true,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },



  pauseOnMouseEnter: true,
  grabCursor: true,
  speed: 800,
});


//-----------services dropdown arrow logic-------------//
 function toggleService(select) {
    const arrow = document.getElementById("serviceArrow");

    // acts like "isOpen"
    const isOpen = document.activeElement === select;

    if (isOpen) {
      arrow.classList.add("rotate-180");
    } else {
      arrow.classList.remove("rotate-180");
    }
  }

  const serviceSelect = document.getElementById("serviceSelect");

  // dropdown opened
  serviceSelect.addEventListener("focus", () => {
    toggleService(serviceSelect);
  });

  // dropdown closed
  serviceSelect.addEventListener("blur", () => {
    toggleService(null);
  });

  // option selected → close
  serviceSelect.addEventListener("change", () => {
    document.getElementById("serviceArrow")
      .classList.remove("rotate-180");
  });


  //----------------------ask a question modaal section--------------------------//
function openQuestionModal() {
  document.getElementById("modalBackdrop").classList.remove("hidden");
}
function closeQuestionModal() {
  document.getElementById("modalBackdrop").classList.add("hidden");
}

//ask a question section
document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  document.getElementById("successPopup").classList.remove("hidden");
  form.reset();
  fetch(
    "https://n8n.techdemo.in/webhook-test/ask-a-question",
    {
      method: "POST",
      body: formData,
    }
  ).catch((err) => console.log("Webhook error:", err));
  closeQuestionModal();
});

//file upload validation

// function validateFile(input) {
//     const files = input.files;
//     const allowedTypes = ["image/png", "application/pdf"];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const minSize = 5 * 1024;   
//       const maxSize = 10 * 1024;
//       //file size
//       if (file.size < minSize || file.size > maxSize) {
//         alert(`"${file.name}" must be between 5 KB and 10 KB.`);
//         input.value = ""; 
//         return;
//       }
//       //file format
//       if (!allowedTypes.includes(file.type)) {
//         alert(`"${file.name}" is not allowed. Only PNG and PDF files are accepted.`);
//         input.value = ""; 
//         return;
//       }
//     }
//   }

//----------------appointment section---------------------//
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(
    "https://n8n.techdemo.in/webhook/book-appointment",
    {
      method: "POST",
      body: formData,
    }
  ).catch(err => console.error("Webhook Error:", err));

  document.getElementById("successPopup").classList.remove("hidden");
  form.reset();
});

function closePopup() {
  document.getElementById("successPopup").classList.add("hidden");
}

