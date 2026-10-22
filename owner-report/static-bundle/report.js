(function () {
  var html = document.documentElement;
  html.lang = "ar";
  html.dir = "rtl";

  // Text size
  var SIZES = ["md", "lg", "xl"];
  var size = "md";
  try {
    var saved = localStorage.getItem("report-text-size");
    if (saved === "lg" || saved === "xl") size = saved;
  } catch (e) {}
  var minus = document.querySelector('[aria-label="تصغير الخط"]');
  var plus = document.querySelector('[aria-label="تكبير الخط"]');
  function applySize() {
    html.setAttribute("data-size", size);
    [[minus, size === "md"], [plus, size === "xl"]].forEach(function (p) {
      if (!p[0]) return;
      p[0].disabled = p[1];
      if (p[1]) p[0].setAttribute("data-disabled", ""); else p[0].removeAttribute("data-disabled");
    });
    try { localStorage.setItem("report-text-size", size); } catch (e) {}
  }
  if (minus) minus.addEventListener("click", function () { size = SIZES[Math.max(0, SIZES.indexOf(size) - 1)]; applySize(); });
  if (plus) plus.addEventListener("click", function () { size = SIZES[Math.min(2, SIZES.indexOf(size) + 1)]; applySize(); });
  applySize();

  // Section navigation
  var ids = ["summary", "strengths", "problems", "notes", "journey", "competitors", "plan", "method"];
  var lock = 0;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-slot="sidebar-menu-button"]'));
  function setActive(id) {
    buttons.forEach(function (b, i) {
      if (ids[i] === id) { b.setAttribute("data-active", ""); b.setAttribute("aria-current", "true"); }
      else { b.removeAttribute("data-active"); b.removeAttribute("aria-current"); }
    });
  }
  buttons.forEach(function (b, i) {
    b.addEventListener("click", function () {
      var el = document.getElementById(ids[i]);
      lock = Date.now() + 1200;
      setActive(ids[i]);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      html.classList.remove("nav-open");
    });
  });
  var root = document.getElementById("report-scroll");
  function current() {
    if (!root) return;
    if (Date.now() < lock) return;
    var top = root.getBoundingClientRect().top + 140;
    var id = ids[0];
    ids.forEach(function (sid) {
      var el = document.getElementById(sid);
      if (el && el.getBoundingClientRect().top <= top) id = sid;
    });
    if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) id = ids[ids.length - 1];
    setActive(id);
  }
  if (root) {
    var ticking = false;
    root.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; current(); });
    }, { passive: true });
  }

  // In-page step links (journey chips)
  document.querySelectorAll('a[href^="#step-"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var t = document.getElementById(a.getAttribute("href").slice(1));
      if (t) { ev.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  // Phone menu
  var header = document.querySelector("header");
  if (header) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gt-menu-btn";
    btn.setAttribute("aria-label", "فتح قائمة الأقسام");
    btn.textContent = "☰ الأقسام";
    btn.addEventListener("click", function () { html.classList.toggle("nav-open"); });
    header.insertBefore(btn, header.firstChild);
  }
  var scrim = document.getElementById("gt-scrim");
  if (scrim) scrim.addEventListener("click", function () { html.classList.remove("nav-open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") html.classList.remove("nav-open"); });
})();
