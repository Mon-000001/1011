'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.dataset.nav || this.innerHTML.toLowerCase();
    for (let i = 0; i < pages.length; i++) {
      if (target === pages[i].dataset.page) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    this.classList.add("active");
    window.scrollTo(0, 0);

  });
}

/* ---------- Copy to clipboard (Email & Phone) ---------- */
(function(){
  const toast = document.getElementById('copyToast');
  const sub = toast ? toast.querySelector('.copy-toast__sub') : null;
  const closeBtn = toast ? toast.querySelector('.copy-toast__close') : null;

  function showToast(text){
    if (!toast) return;
    if (sub) sub.textContent = text || '';
    toast.classList.add('active');
    clearTimeout(toast._hideT);
    toast._hideT = setTimeout(()=> toast.classList.remove('active'), 2000);
  }

  function copyText(text){
    if (!text) return;
    const canAsync = window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText;
    if (canAsync) {
      navigator.clipboard.writeText(text).then(()=> showToast(text)).catch(()=> {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text){
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand && document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) { showToast(text); } else { console.warn('Copy execCommand returned false'); }
    } catch(e) { console.warn('Copy failed', e); }
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const info = btn.closest('.contact-info');
    const link = info ? info.querySelector('.contact-link') : null;
    let text = link ? (link.textContent || '').trim() : '';
    if (!text && link) {
      const href = link.getAttribute('href') || '';
      text = href.replace(/^mailto:/, '').replace(/^tel:/, '');
    }
    copyText(text);
    try {
      btn.classList.add('copied');
      const icon = btn.querySelector('ion-icon');
      const prev = icon ? icon.getAttribute('name') : null;
      if (icon) icon.setAttribute('name', 'checkmark-outline');
      clearTimeout(btn._copyT);
      btn._copyT = setTimeout(() => {
        btn.classList.remove('copied');
        if (icon && prev) icon.setAttribute('name', prev);
      }, 1500);
    } catch(_) {}
  });

  if (closeBtn) closeBtn.addEventListener('click', function(){ toast.classList.remove('active'); });
})();

/* ---------- Logo Loop (social icons) ---------- */
(function(){
  const containers = document.querySelectorAll('[data-logo-loop]');
  if (!containers.length) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // Respect user preference

  containers.forEach(container => {
    const track = container.querySelector('[data-loop-track]');
    const seq = container.querySelector('[data-seq]');
    if (!track || !seq) return;

    let speed = parseFloat(container.getAttribute('data-speed')) || 60; // px per second
    const direction = (container.getAttribute('data-direction') || 'left').toLowerCase();
    if (direction === 'right') speed = -speed; // allow reverse
    const pauseOnHover = container.getAttribute('data-pause') !== 'false';

    let offset = 0;
    let lastTs = null;
    let paused = false;

    function clearClones(){
      track.querySelectorAll('[data-clone]')?.forEach(c => c.remove());
    }

    function buildCopies(){
      clearClones();
      const containerWidth = container.clientWidth;
      const seqWidth = seq.getBoundingClientRect().width;
      if (!seqWidth) return;
      // Enough copies so total width > container width * 2 for smooth cycling
      const copiesNeeded = Math.ceil((containerWidth * 2) / seqWidth);
      for (let i=0;i<copiesNeeded;i++) {
        const clone = seq.cloneNode(true);
        clone.dataset.clone = 'true';
        clone.setAttribute('aria-hidden','true');
        track.appendChild(clone);
      }
    }

    function animate(ts){
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!paused) {
        offset += speed * dt;
        const first = track.firstElementChild;
        if (first) {
          const firstWidth = first.getBoundingClientRect().width;
          // Move left
          if (speed > 0 && offset >= firstWidth) {
            offset -= firstWidth;
            track.appendChild(first);
          }
          // Move right
          else if (speed < 0 && offset <= -firstWidth) {
            offset += firstWidth;
            track.insertBefore(track.lastElementChild, first);
          }
        }
        track.style.transform = `translate3d(${ -offset }px,0,0)`;
      }
      requestAnimationFrame(animate);
    }

    // Init
    buildCopies();
    window.addEventListener('resize', () => { buildCopies(); });

    if (pauseOnHover) {
      container.addEventListener('mouseenter', () => paused = true);
      container.addEventListener('mouseleave', () => paused = false);
    }

    requestAnimationFrame(animate);
  });
})();

/* ---------- Tilted Card (About) ---------- */
(function(){
  const cards = document.querySelectorAll('[data-tilt-card]');
  if (!cards.length) return;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(card => {
    const inner = card.querySelector('.tilted-card-inner');
    const img = card.querySelector('.tilted-card-img');
    const caption = card.querySelector('.tilted-card-caption');
    const captionText = card.getAttribute('data-tilt-caption') || '';
    if (caption && captionText) caption.textContent = captionText;

    const rotateAmp = parseFloat(card.getAttribute('data-tilt-rotate')) || 14;
    const scaleHover = parseFloat(card.getAttribute('data-tilt-scale')) || 1.1;

    let rect = null;
    let currentX = 0, currentY = 0;
    let targetRotX = 0, targetRotY = 0, rotX = 0, rotY = 0;
    let scale = 1, targetScale = 1;
    let captionOpacity = 0, targetCaptionOpacity = 0;
    let rafId = null;

    function measure(){ rect = card.getBoundingClientRect(); }
    measure();
    window.addEventListener('resize', measure);

    function lerp(a,b,t){ return a + (b-a)*t; }

    function animate(){
      rotX = lerp(rotX, targetRotX, 0.12);
      rotY = lerp(rotY, targetRotY, 0.12);
      scale = lerp(scale, targetScale, 0.15);
      captionOpacity = lerp(captionOpacity, targetCaptionOpacity, 0.2);

      if (inner && !reduceMotion) {
        inner.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
      if (caption) {
        caption.style.opacity = captionOpacity.toFixed(2);
        caption.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    function handleMove(e){
      if (!rect) return;
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const ox = e.clientX - cx;
      const oy = e.clientY - cy;
      const nx = ox / (rect.width/2);
      const ny = oy / (rect.height/2);
      targetRotY = nx * rotateAmp;      // rotateY (left-right)
      targetRotX = -ny * rotateAmp;     // rotateX (up-down)
      currentX = (e.clientX - rect.left) - rect.width * 0.5;
      currentY = (e.clientY - rect.top) - rect.height * 0.5;
    }

    function handleEnter(){
      targetScale = scaleHover;
      targetCaptionOpacity = 1;
    }
    function handleLeave(){
      targetScale = 1;
      targetCaptionOpacity = 0;
      targetRotX = 0; targetRotY = 0;
    }

    if (!reduceMotion) {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
      card.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    }
  });
})();
