(function () {
  var html = document.documentElement;
  html.lang = "ar";
  html.dir = "rtl";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var behavior = reduce ? "auto" : "smooth";
  var root = document.getElementById("report-scroll");

  // حجم الخط: ثلاثة أزرار، الزر المختار مُعلَّم ولا يُعطَّل أي زر
  var size = "md";
  try {
    var saved = localStorage.getItem("report-text-size");
    if (saved === "lg" || saved === "xl") size = saved;
  } catch (e) {}
  var sizeBtns = Array.prototype.slice.call(document.querySelectorAll("[data-size-btn]"));
  function applySize() {
    html.setAttribute("data-size", size);
    sizeBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-size-btn") === size ? "true" : "false");
    });
    try { localStorage.setItem("report-text-size", size); } catch (e) {}
  }
  sizeBtns.forEach(function (b) {
    b.addEventListener("click", function () { size = b.getAttribute("data-size-btn"); applySize(); });
  });
  applySize();

  // التنقل بين الأقسام
  var ids = ["summary", "strengths", "problems", "plan", "details"];
  var names = ["الخلاصة", "نقاط القوة", "أهم 8 أمور للإصلاح", "خطة العمل", "التفاصيل والمصادر"];
  var where = document.querySelector("[data-where]");
  var bar = document.querySelector("[data-progress]");
  var lock = 0;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-slot="sidebar-menu-button"]'));
  function setActive(id) {
    var idx = ids.indexOf(id);
    buttons.forEach(function (b, i) {
      if (i === idx) { b.setAttribute("data-active", ""); b.setAttribute("aria-current", "true"); }
      else { b.removeAttribute("data-active"); b.removeAttribute("aria-current"); }
    });
    if (where && idx >= 0) where.textContent = " · " + names[idx];
  }

  // الانتقال إلى عنصر، مع فتح القسم المطوي إن كان العنصر داخله، وتصحيح الموضع بعد انتهاء الحركة
  function go(el) {
    if (!el) return;
    var d = el.closest ? el.closest("details") : null;
    if (el.tagName === "DETAILS") el.open = true; else if (d) d.open = true;
    lock = Date.now() + 1200;
    el.scrollIntoView({ behavior: behavior, block: "start" });
    setTimeout(function () {
      if (!root) return;
      var off = el.getBoundingClientRect().top - root.getBoundingClientRect().top;
      if (Math.abs(off - 24) > 30) el.scrollIntoView({ block: "start" });
    }, reduce ? 50 : 900);
  }

  buttons.forEach(function (b, i) {
    b.addEventListener("click", function () {
      setActive(ids[i]);
      go(document.getElementById(ids[i]));
      closeNav(false);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href").slice(1);
      var t = document.getElementById(id);
      if (!t) return;
      ev.preventDefault();
      var sec = t.closest("section[id]");
      if (sec) setActive(sec.id);
      go(t);
    });
  });

  function onScroll() {
    if (!root) return;
    var max = root.scrollHeight - root.clientHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? root.scrollTop / max : 0) + ")";
    if (topBtn) topBtn.hidden = root.scrollTop < root.clientHeight;
    if (Date.now() < lock) return;
    var top = root.getBoundingClientRect().top + 160;
    var id = ids[0];
    ids.forEach(function (sid) {
      var el = document.getElementById(sid);
      if (el && el.getBoundingClientRect().top <= top) id = sid;
    });
    if (root.scrollTop >= max - 4) id = ids[ids.length - 1];
    setActive(id);
  }

  // زر العودة للأعلى
  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "gt-top";
  topBtn.hidden = true;
  topBtn.setAttribute("aria-label", "العودة لأعلى الصفحة");
  topBtn.innerHTML = '<span aria-hidden="true">↑</span><span class="gt-top-label">للأعلى</span>';
  topBtn.addEventListener("click", function () {
    if (root) root.scrollTo({ top: 0, behavior: behavior });
    lock = Date.now() + 1200;
    setActive("summary");
  });
  document.body.appendChild(topBtn);

  if (root) {
    var ticking = false;
    root.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; onScroll(); });
    }, { passive: true });
    onScroll();
  }

  // قائمة الأقسام على الجوال
  var header = document.querySelector("header");
  var menuBtn = null;
  var panel = document.querySelector('[data-slot="sidebar-container"]');
  function openNav() {
    html.classList.add("nav-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    var cur = document.querySelector('[data-slot="sidebar-menu-button"][data-active]') || buttons[0];
    if (cur) setTimeout(function () { cur.focus(); }, 30);
  }
  function closeNav(focusBack) {
    if (!html.classList.contains("nav-open")) return;
    html.classList.remove("nav-open");
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      if (focusBack) menuBtn.focus();
    }
  }
  if (header) {
    menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "gt-menu-btn";
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<span aria-hidden="true">☰</span> الأقسام';
    menuBtn.addEventListener("click", openNav);
    header.insertBefore(menuBtn, header.firstChild);
  }
  if (panel) {
    var close = document.createElement("button");
    close.type = "button";
    close.className = "gt-close-btn";
    close.innerHTML = '<span aria-hidden="true">✕</span> إغلاق';
    close.addEventListener("click", function () { closeNav(true); });
    panel.insertBefore(close, panel.firstChild);
  }
  var scrim = document.getElementById("gt-scrim");
  if (scrim) scrim.addEventListener("click", function () { closeNav(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(true); });
})();
