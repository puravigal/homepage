/* Shared header/footer for all pages under /pos. */
(function () {
  var script = document.currentScript;
  if (!script) return;
  var root = new URL("../", script.src);
  function local(path) { return new URL(path, root).href; }

  var header = document.createElement("header");
  header.className = "product-header";
  header.innerHTML =
    '<div class="container product-nav">' +
      '<a class="product-brand" href="' + local("pos/") + '">' +
        '<img src="' + local("images/puravigal-black-logo.svg") + '" alt="Puravigal" width="151"><span>POS</span>' +
      '</a>' +
      '<button class="menu-btn product-menu-btn" type="button" aria-label="Open POS navigation" aria-expanded="false">Menu</button>' +
      '<nav aria-label="POS navigation">' +
        '<a data-nav="overview" href="' + local("pos/") + '">Overview</a>' +
        '<a data-nav="features" href="' + local("pos/features.html") + '">Features</a>' +
        '<a data-nav="pricing" href="' + local("pos/pricing.html") + '">Pricing</a>' +
        '<div class="pos-nav-dropdown" data-business-dropdown><a data-nav="business-types" class="pos-dropdown-trigger" href="' + local("pos/industries/") + '" aria-haspopup="true" aria-expanded="false">Business types <span class="dropdown-chevron" aria-hidden="true">⌄</span></a><div class="pos-dropdown-menu" aria-label="Business types"><a href="' + local("pos/industries/retail.html") + '">Retail</a><a href="' + local("pos/industries/restaurant.html") + '">Restaurant</a><a href="' + local("pos/industries/cafe.html") + '">Café</a><a href="' + local("pos/industries/mobile-shop.html") + '">Mobile shop</a><a href="' + local("pos/industries/supermarket.html") + '">Supermarket</a><a href="' + local("pos/industries/grocery.html") + '">Grocery / provision store</a></div></div>' +
        '<a data-nav="resources" href="' + local("pos/resources.html") + '">Resources</a>' +
        '<a data-pos-login href="https://accounts.puravigal.com/?mode=signin&amp;redirect_to=https%3A%2F%2Fpos.puravigal.com%2Fsso%2Fcallback">Log in</a>' +
        '<a data-pos-cta class="product-nav-cta" href="https://pos.puravigal.com/">Access now</a>' +
      '</nav>' +
    '</div>';

  var footer = document.createElement("footer");
  footer.innerHTML =
    '<div class="container footer-grid product-footer">' +
      '<div><a class="product-brand" href="' + local("pos/") + '"><img src="' + local("images/puravigal-black-logo.svg") + '" alt="Puravigal" width="151"><span>POS</span></a><p>Simple point of sale software for everyday businesses.</p></div>' +
      '<div><b>POS</b><a href="' + local("pos/") + '">Overview</a><a href="' + local("pos/features.html") + '">Features</a><a href="' + local("pos/pricing.html") + '">Pricing</a></div>' +
      '<div><b>Business types</b><a href="' + local("pos/industries/retail.html") + '">Retail</a><a href="' + local("pos/industries/restaurant.html") + '">Restaurant</a><a href="' + local("pos/industries/cafe.html") + '">Café</a><a href="' + local("pos/industries/mobile-shop.html") + '">Mobile shop</a><a href="' + local("pos/industries/supermarket.html") + '">Supermarket</a><a href="' + local("pos/industries/grocery.html") + '">Grocery</a></div>' +
      '<div><b>Puravigal</b><a href="' + local("") + '">Main website</a><a href="' + local("contact.html") + '">Talk to us</a><a href="' + local("privacy-policy.html") + '">Privacy Policy</a><a href="' + local("terms-and-conditions.html") + '">Terms &amp; Conditions</a></div>' +
      '<div class="social-footer"><b>Follow Puravigal</b><div class="social-links">' +
        '<a href="#" data-social-placeholder="linkedin" aria-label="LinkedIn — replace placeholder URL" title="LinkedIn URL placeholder"><img src="' + local("images/icons/linkedin.svg") + '" alt=""></a>' +
        '<a href="https://www.facebook.com/puravigal" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><img src="' + local("images/icons/facebook.svg") + '" alt=""></a>' +
        '<a href="https://instagram.com/puravigal/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><img src="' + local("images/icons/instagram.svg") + '" alt=""></a>' +
        '<a href="https://twitter.com/puravigal" aria-label="X / Twitter" target="_blank" rel="noopener noreferrer"><img src="' + local("images/icons/twitter.svg") + '" alt=""></a>' +
        '<a href="https://www.threads.net/@puravigal" aria-label="Threads" target="_blank" rel="noopener noreferrer"><img src="' + local("images/icons/threads.svg") + '" alt=""></a>' +
        '<a href="#" data-social-placeholder="whatsapp" aria-label="WhatsApp — replace placeholder URL" title="WhatsApp URL placeholder"><img src="' + local("images/icons/whatsapp.svg") + '" alt=""></a>' +
        '<a href="#" data-social-placeholder="youtube" aria-label="YouTube — replace placeholder URL" title="YouTube URL placeholder"><img src="' + local("images/icons/youtube.svg") + '" alt=""></a>' +
      '</div></div>' +
    '</div><div class="container copyright">© 2026 Puravigal POS. Part of Puravigal.</div>';

  footer.querySelectorAll("[data-social-placeholder]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  var headerMount = document.querySelector("[data-pos-header]");
  var footerMount = document.querySelector("[data-pos-footer]");
  if (headerMount) headerMount.replaceWith(header);
  if (footerMount) footerMount.replaceWith(footer);

  var path = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  var active = "overview";
  if (/\/pos\/features\.html$/.test(path)) active = "features";
  else if (/\/pos\/pricing\.html$/.test(path)) active = "pricing";
  else if (/\/pos\/industries(?:\/|$)/.test(path)) active = "business-types";
  else if (/\/pos\/resources(?:\.html|\/)/.test(path)) active = "resources";

  header.querySelectorAll("nav [data-nav]").forEach(function (link) {
    var selected = link.getAttribute("data-nav") === active;
    link.classList.toggle("is-active", selected);
    if (selected) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  var dropdown = header.querySelector("[data-business-dropdown]");
  if (dropdown) {
    var trigger = dropdown.querySelector(".pos-dropdown-trigger");
    var dropdownMenu = dropdown.querySelector(".pos-dropdown-menu");
    if (trigger && dropdownMenu) {
      trigger.addEventListener("click", function (event) {
        if (window.matchMedia("(max-width: 900px)").matches) {
          event.preventDefault();
          var open = dropdown.classList.toggle("is-open");
          trigger.setAttribute("aria-expanded", String(open));
        }
      });
      dropdown.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          dropdown.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
          trigger.focus();
        }
      });
    }
  }

  var menu = header.querySelector(".product-menu-btn");
  var nav = header.querySelector("nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        /* On mobile, the Business types trigger expands its submenu; do not close the whole menu. */
        if (link.classList.contains("pos-dropdown-trigger") &&
            window.matchMedia("(max-width: 900px)").matches) return;
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Show the correct POS entry action based on the central Accounts session.
     Signed in: hide Log in and show Access now -> POS app.
     Signed out: show Log in and Get Started -> POS signup. */
  var appUrl = "https://pos.puravigal.com/";
  var signupUrl = local("pos/signup.html");
  var normalizedPath = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  var isPosHome = normalizedPath === "/pos";
  if (isPosHome) {
    var accessCtas = Array.prototype.slice.call(document.querySelectorAll("[data-pos-cta]"));
    var loginLink = header.querySelector("[data-pos-login]");

    function applyAuthState(signedIn) {
      accessCtas.forEach(function (cta) {
        cta.href = signedIn ? appUrl : signupUrl;
        cta.textContent = signedIn ? "Access now" : "Get Started";
        cta.setAttribute("aria-label", signedIn ? "Access Puravigal POS" : "Get started with Puravigal POS");
      });
      if (loginLink) loginLink.hidden = signedIn;
    }

    // Safe default until Accounts responds: treat the visitor as signed out.
    applyAuthState(false);

    var authStatusFrame = document.createElement("iframe");
    authStatusFrame.title = "Puravigal account status";
    authStatusFrame.setAttribute("aria-hidden", "true");
    authStatusFrame.tabIndex = -1;
    authStatusFrame.style.cssText = "position:absolute;width:1px;height:1px;left:-10000px;top:-10000px;border:0;visibility:hidden";
    authStatusFrame.src = "https://accounts.puravigal.com/?auth_status=1&parent_origin=" + encodeURIComponent(window.location.origin);
    document.body.appendChild(authStatusFrame);

    window.addEventListener("message", function (event) {
      if (event.origin !== "https://accounts.puravigal.com") return;
      if (!event.data || event.data.type !== "PURAVIGAL_AUTH_STATUS") return;
      if (event.data.parentOrigin !== window.location.origin) return;
      applyAuthState(event.data.authenticated === true);
    });
  }
})();