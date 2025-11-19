// Load Navbar
const navbarLoaded = fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

// Load Page1
const page1Loaded = fetch("page1.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page1").innerHTML = html;
  });

// Load Page2
const page2Loaded = fetch("page2.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page2").innerHTML = html;
  });

// Load Page3
const page3Loaded = fetch("page3.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page3").innerHTML = html;
  });

// Load Page4
const page4Loaded = fetch("page4.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page4").innerHTML = html;
  });

// Load Page5
const page5Loaded = fetch("page5.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page5").innerHTML = html;
  });

  // Load Page6
const page6Loaded = fetch("page6.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page6").innerHTML = html;
  });

// Load Page7
const page7Loaded = fetch("page7.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page7").innerHTML = html;
  });

// Load Page8
const page10Loaded = fetch("page8.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("page8").innerHTML = html;
  });

// Load Mobile Menu
const menuLoaded = fetch("mobileMenu.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("mobileMenuContainer").innerHTML = html;
  });

// mobile responsive navbar logic
Promise.all([navbarLoaded, menuLoaded]).then(() => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !closeBtn || !mobileMenu) {
    console.error("❌ Elements missing! Check IDs.");
    return;
  }

  // Open menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.right = "0";
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    mobileMenu.style.right = "-260px";
  });
});

