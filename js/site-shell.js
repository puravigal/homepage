/* Shared header and footer for the main Puravigal site. POS has its own shell. */
(function () {
  var script = document.currentScript;
  if (!script) return;
  var root = new URL("../", script.src);
  function local(path) { return new URL(path, root).href; }
  var accountsSignup = "https://puravigal-accounts.onrender.com/signup";
  var accountsSignin = "https://puravigal-accounts.onrender.com/?mode=signin";

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="container nav-wrap">' +
      '<a class="brand" href="' + local("index.html") + '">' +
        '<img src="' + local("images/puravigal-black-logo.svg") + '" alt="Puravigal" width="151">' +
      '</a>' +
      '<button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">Menu</button>' +
      '<nav aria-label="Main navigation">' +
        '<a href="' + local("index.html#products") + '">Products</a>' +
        '<a href="' + local("pos/") + '">POS</a>' +
        '<a href="' + local("about-us.html") + '">About</a>' +
        '<a href="' + local("index.html#faq") + '">FAQ</a>' +
        '<a href="' + accountsSignup + '" class="nav-cta">Get Started</a>' +
      '</nav>' +
    '</div>';

  var footer = document.createElement("footer");
  footer.innerHTML =
    '<div class="container footer-grid">' +
      '<div><a href="' + local("index.html") + '" aria-label="Puravigal home"><img src="' + local("images/puravigal-black-logo.svg") + '" alt="Puravigal" width="151"></a>' +
        '<p>Practical business software for the businesses that keep everyday commerce moving.</p>' +
        '<a href="mailto:sales@puravigal.com">sales@puravigal.com</a></div>' +
      '<div><b>Products</b><a href="' + local("pos/") + '">Puravigal POS</a></div>' +
      '<div><b>Company</b><a href="' + local("about-us.html") + '">About</a><a href="' + local("careers.html") + '">Careers</a><a href="' + local("contact.html") + '">Contact</a></div>' +
      '<div><b>Legal</b><a href="' + local("privacy-policy.html") + '">Privacy Policy</a><a href="' + local("terms-and-conditions.html") + '">Terms &amp; Conditions</a></div>' +
      '<div class="site-footer-social"><b>Follow Puravigal</b><div class="social-links">' +
        '<span class="social-pending" role="img" aria-label="LinkedIn link not provided yet" title="LinkedIn link pending"><img src="' + local("images/icons/linkedin.svg") + '" alt=""></span>' +
        '<a href="https://www.facebook.com/puravigal" aria-label="Facebook"><img src="' + local("images/icons/facebook.svg") + '" alt=""></a>' +
        '<a href="https://instagram.com/puravigal/" aria-label="Instagram"><img src="' + local("images/icons/instagram.svg") + '" alt=""></a>' +
        '<a href="https://twitter.com/puravigal" aria-label="X / Twitter"><img src="' + local("images/icons/twitter.svg") + '" alt=""></a>' +
        '<a href="https://www.threads.net/@puravigal" aria-label="Threads"><img src="' + local("images/icons/threads.svg") + '" alt=""></a>' +
        '<span class="social-pending" role="img" aria-label="WhatsApp link not provided yet" title="WhatsApp link pending"><img src="' + local("images/icons/whatsapp.svg") + '" alt=""></span>' +
        '<span class="social-pending" role="img" aria-label="YouTube link not provided yet" title="YouTube link pending"><img src="' + local("images/icons/youtube.svg") + '" alt=""></span>' +
      '</div></div>' +
    '</div><div class="container copyright">© 2026 Puravigal. All rights reserved.</div>';

  var headerMount = document.querySelector("[data-site-header]");
  var footerMount = document.querySelector("[data-site-footer]");
  if (headerMount) headerMount.replaceWith(header);
  if (footerMount) footerMount.replaceWith(footer);

  var currentPath = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  header.querySelectorAll("nav a").forEach(function (link) {
    var target;
    try { target = new URL(link.href, window.location.href); } catch (e) { return; }
    if (target.origin !== window.location.origin || !target.hash) {
      if (target.origin !== window.location.origin) return;
    }
    var targetPath = target.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
    var isSectionLink = !!target.hash;
    var isActive = targetPath === currentPath && (!isSectionLink || target.hash === window.location.hash);
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  var menu = header.querySelector(".menu-btn");
  var nav = header.querySelector("nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Keep legacy account links pointed at the central Puravigal Accounts service.
  document.querySelectorAll('a[href$="login.html"]').forEach(function (link) { link.href = accountsSignin; });
  document.querySelectorAll('a[href$="signup.html"]').forEach(function (link) { link.href = accountsSignup; });
  document.querySelectorAll('a[href*="signup.html"]').forEach(function (link) {
    if (/start free|get started free|sign up|signup/i.test(link.textContent.trim())) {
      link.href = accountsSignup;
      link.textContent = "Get Started";
    }
  });
})();
