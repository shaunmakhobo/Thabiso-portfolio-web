
(function () {
  "use strict";

  /* ================================================================
     THABISO MAKHOBO — DEVELOPER PORTFOLIO
     Vanilla JavaScript
  ================================================================= */


  /* ----------------------------------------------------------------
     Reduced motion preference
  ---------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ----------------------------------------------------------------
     Footer year
  ---------------------------------------------------------------- */
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ----------------------------------------------------------------
     Theme toggle
  ---------------------------------------------------------------- */
  var themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {

      var isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }

      try {
        localStorage.setItem(
          "theme",
          isDark ? "light" : "dark"
        );
      } catch (e) {}
    });
  }


  /* ----------------------------------------------------------------
     Mobile navigation
  ---------------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");

  if (navToggle) {

    navToggle.addEventListener("click", function () {

      var isOpen =
        document.body.classList.toggle("nav-open");

      navToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });


    document
      .querySelectorAll(".nav__links a")
      .forEach(function (link) {

        link.addEventListener("click", function () {

          document.body.classList.remove("nav-open");

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        });
      });
  }


  /* ----------------------------------------------------------------
     Process tabs
  ---------------------------------------------------------------- */
  var tabsWrap = document.getElementById("processTabs");

  if (tabsWrap) {

    var tabs =
      tabsWrap.querySelectorAll(".process__tab");

    tabs.forEach(function (tab) {

      tab.addEventListener("click", function () {

        tabs.forEach(function (t) {
          t.classList.remove("is-active");
        });

        tab.classList.add("is-active");
      });
    });
  }


  /* ----------------------------------------------------------------
     Scroll reveal
  ---------------------------------------------------------------- */
  var revealEls =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealEls.length
  ) {

    var observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealEls.forEach(function (el) {
      observer.observe(el);
    });

  } else {

    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }


  /* ----------------------------------------------------------------
     Calculate portfolio statistics dynamically

     These values are calculated from what actually exists
     on the page instead of being manually hard-coded.
  ---------------------------------------------------------------- */
  function getPortfolioStats() {

    /* --------------------------------------------------------------
       PROJECTS

       The MOS flagship project is represented by .spotlight.

       The remaining projects are represented by .project-card.

       Therefore:

       1 spotlight + 6 project cards = 7 projects
    -------------------------------------------------------------- */
    var flagshipProjects =
      document.querySelectorAll(".spotlight").length;

    var projectCards =
      document.querySelectorAll(".project-card").length;

    var totalProjects =
      flagshipProjects + projectCards;


    /* --------------------------------------------------------------
       CLIENTS

       Counts the actual client names displayed in:

       .clients__marks
    -------------------------------------------------------------- */
    var totalClients =
      document.querySelectorAll(
        ".clients__marks .clients__mark"
      ).length;


    /* --------------------------------------------------------------
       CORE SPECIALIZATIONS

       Your portfolio explicitly states:

       "Two core specializations"

       The page contains four build/service cards, but only
       two are identified as your CORE specializations:

       - Backend Development
       - Mobile Development

       Therefore this remains 2.
    -------------------------------------------------------------- */
    var totalSpecializations = 2;


    /* --------------------------------------------------------------
       EXPERIENCE

       Your development experience starts in 2023.

       We calculate the number of completed years automatically.

       Example:
       2023 → 2026 = 3 years
    -------------------------------------------------------------- */
    var developmentStartYear = 2023;

    var currentYear =
      new Date().getFullYear();

    var yearsExperience =
      Math.max(
        1,
        currentYear - developmentStartYear
      );


    return {
      projects: totalProjects,
      specializations: totalSpecializations,
      clients: totalClients,
      experience: yearsExperience
    };
  }


  /* ----------------------------------------------------------------
     Animated statistic counters
  ---------------------------------------------------------------- */
  function initCounters() {

    var counters =
      document.querySelectorAll(".counter");


    if (!counters.length) {
      return;
    }


    /* --------------------------------------------------------------
       Get current portfolio numbers
    -------------------------------------------------------------- */
    var stats =
      getPortfolioStats();


    counters.forEach(function (counter) {

      var counterType =
        counter.getAttribute("data-counter");


      /* ------------------------------------------------------------
         Find corresponding calculated value
      ------------------------------------------------------------ */
      var target =
        stats[counterType];


      if (
        typeof target !== "number" ||
        isNaN(target)
      ) {
        target = 0;
      }


      /* ------------------------------------------------------------
         Optional suffix
      ------------------------------------------------------------ */
      var suffix =
        counter.getAttribute("data-suffix") || "";


      /* ------------------------------------------------------------
         Always begin at zero
      ------------------------------------------------------------ */
      counter.textContent = "0";


      /* ------------------------------------------------------------
         Respect reduced motion accessibility setting
      ------------------------------------------------------------ */
      if (prefersReducedMotion) {

        counter.textContent =
          target + suffix;

        return;
      }


      /* ------------------------------------------------------------
         Animation settings
      ------------------------------------------------------------ */
      var duration = 1500;
      var startTime = null;


      /* ------------------------------------------------------------
         Animate counter
      ------------------------------------------------------------ */
      function animateCounter(timestamp) {

        if (!startTime) {
          startTime = timestamp;
        }


        var elapsed =
          timestamp - startTime;


        var progress =
          Math.min(
            elapsed / duration,
            1
          );


        /* Smooth ease-out */
        var easedProgress =
          1 -
          Math.pow(
            1 - progress,
            3
          );


        var currentValue =
          Math.floor(
            easedProgress * target
          );


        counter.textContent =
          currentValue + suffix;


        if (progress < 1) {

          window.requestAnimationFrame(
            animateCounter
          );

        } else {

          /* Guarantee exact final value */
          counter.textContent =
            target + suffix;
        }
      }


      /* ------------------------------------------------------------
         Start animation
      ------------------------------------------------------------ */
      window.requestAnimationFrame(
        animateCounter
      );

    });
  }


  /* ----------------------------------------------------------------
     Start counters
  ---------------------------------------------------------------- */
  initCounters();


})();

