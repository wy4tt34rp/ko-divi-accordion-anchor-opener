(function () {
  "use strict";

  function normText(s) {
    return (s || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function isDiviToggle(toggle) {
    return toggle && toggle.classList && toggle.classList.contains("et_pb_toggle");
  }

  function findToggleFromTarget(targetEl) {
    if (!targetEl) return null;

    if (isDiviToggle(targetEl)) return targetEl;

    var t = targetEl.closest ? targetEl.closest(".et_pb_toggle") : null;
    if (t) return t;

    var node = targetEl;
    while (node && node !== document.documentElement) {
      if (isDiviToggle(node)) return node;
      node = node.parentNode;
    }
    return null;
  }

  function openToggle(toggle) {
    if (!isDiviToggle(toggle)) return;

    var accordion = toggle.closest ? toggle.closest(".et_pb_accordion") : null;

    if (accordion) {
      var toggles = accordion.querySelectorAll(".et_pb_toggle");
      toggles.forEach(function (tg) {
        if (tg !== toggle) {
          tg.classList.remove("et_pb_toggle_open");
          tg.classList.add("et_pb_toggle_close");
        }
      });
    }

    if (toggle.classList.contains("et_pb_toggle_open") && !toggle.classList.contains("et_pb_toggle_close")) return;

    var title = toggle.querySelector(".et_pb_toggle_title");
    if (title) {
      title.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    } else {
      toggle.classList.remove("et_pb_toggle_close");
      toggle.classList.add("et_pb_toggle_open");
    }
  }

  function openById(id, opts) {
    opts = opts || {};
    if (!id) return false;

    id = id.replace(/^#/, "");
    var target = document.getElementById(id);
    if (!target) return false;

    var toggle = findToggleFromTarget(target);
    if (!toggle) return false;

    openToggle(toggle);

    if (opts.scroll) {
      try { toggle.scrollIntoView({ behavior: "smooth", block: "start" }); }
      catch (e) { toggle.scrollIntoView(true); }
    }

    return true;
  }

  function findToggleByTitle(titleText) {
    var needle = normText(titleText);
    if (!needle) return null;

    var titles = document.querySelectorAll(".et_pb_accordion .et_pb_toggle .et_pb_toggle_title, .et_pb_toggle .et_pb_toggle_title");
    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      if (normText(el.textContent) === needle) {
        return el.closest(".et_pb_toggle");
      }
    }
    return null;
  }

  function openByTitle(titleText, opts) {
    opts = opts || {};
    var toggle = findToggleByTitle(titleText);
    if (!toggle) return false;

    openToggle(toggle);

    if (opts.scroll) {
      try { toggle.scrollIntoView({ behavior: "smooth", block: "start" }); }
      catch (e) { toggle.scrollIntoView(true); }
    }
    return true;
  }

  // Hash formats supported:
  // 1) #some-id   (opens toggle containing element with id="some-id")
  // 2) #ko-accordion=Priority%20Placement  (opens toggle whose title text matches)
  function parseHash(hash) {
    if (!hash) return { type: null };
    if (hash.indexOf("#ko-accordion=") === 0) {
      var raw = hash.substring("#ko-accordion=".length);
      return { type: "title", value: decodeURIComponent(raw || "") };
    }
    if (hash.length > 1) {
      return { type: "id", value: hash };
    }
    return { type: null };
  }

  function handleHash(scroll) {
    var h = parseHash(window.location.hash);
    if (!h.type) return;

    // Delay slightly for Divi init / animations
    setTimeout(function () {
      if (h.type === "title") {
        openByTitle(h.value, { scroll: !!scroll });
      } else if (h.type === "id") {
        openById(h.value, { scroll: !!scroll });
      }
    }, 30);
  }

  function onClick(e) {
    var a = e.target && (e.target.closest ? e.target.closest("a[href^='#']") : null);
    if (!a) return;

    var href = a.getAttribute("href");
    if (!href || href === "#") return;

    // Title-based open
    if (href.indexOf("#ko-accordion=") === 0) {
      e.preventDefault();

      if (history && history.pushState) {
        history.pushState(null, "", href);
      } else {
        window.location.hash = href.substring(1);
      }

      var title = decodeURIComponent(href.substring("#ko-accordion=".length));
      openByTitle(title, { scroll: true });
      return;
    }

    // ID-based open (only intercept if the ID is inside/at a Divi toggle)
    var id = href.replace(/^#/, "");
    var el = document.getElementById(id);
    if (!el) return;

    var toggle = findToggleFromTarget(el);
    if (!toggle) return;

    e.preventDefault();

    if (history && history.pushState) {
      history.pushState(null, "", "#" + id);
    } else {
      window.location.hash = "#" + id;
    }

    openById(id, { scroll: true });
  }

  function init() {
    document.addEventListener("click", onClick, true);
    handleHash(true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("hashchange", function () {
    handleHash(true);
  });
})();