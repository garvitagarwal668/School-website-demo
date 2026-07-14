/* ==========================================================================
   Jaipur Public School — Interaction layer
   Handles: corner-logo nav toggle, scroll reveals, active link, form UX
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Slide-out navigation, triggered by the corner logo ---------------- */
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("navPanel");
  const scrim = document.getElementById("navScrim");
  const links = document.querySelectorAll(".nav-link");

  function openNav() {
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    const firstLink = panel.querySelector(".nav-link");
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }

  function isNavOpen() {
    return document.body.classList.contains("nav-open");
  }

  toggle.addEventListener("click", function () {
    isNavOpen() ? closeNav() : openNav();
  });

  scrim.addEventListener("click", closeNav);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isNavOpen()) {
      closeNav();
      toggle.focus();
    }
  });

  links.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------------- Scroll-triggered reveal animation ---------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Enquiry form: friendly client-side confirmation ---------------- */
  const form = document.getElementById("enquiryForm");
  const note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("pname").value.trim();
      note.textContent = name
        ? "Thanks, " + name.split(" ")[0] + " — the admissions office will call you back within one working day."
        : "Thanks — the admissions office will call you back within one working day.";
      form.reset();
    });
  }
})();
