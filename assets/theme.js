/**
 * WHEEL&WONDER — HOT WHEELS STORE CORE JAVASCRIPT
 * Controls Mobile Nav, Dedicated Buying Window, Customer Login Modal,
 * Live Case Drop Countdown, Collector Pack Finder, and Dynamic Hero Showcase.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer
  const mobileBtn = document.getElementById('MobileMenuBtn');
  const mobileDrawer = document.getElementById('MobileNavDrawer');
  const mobileClose = document.getElementById('MobileNavClose');
  const mobileOverlay = document.getElementById('MobileNavOverlay');
  const mobileLoginLink = document.getElementById('MobileLoginLink');

  function openMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileBtn) mobileBtn.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // =========================================================================
  // DYNAMIC AUTO-CYCLING HERO HOT WHEELS SHOWCASE
  // =========================================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroCounter = document.getElementById('HeroSliderCounter');
  const heroTitle = document.getElementById('HeroTitle');
  const heroSub = document.getElementById('HeroSub');
  const heroPrice = document.getElementById('HeroPrice');
  const heroCompare = document.getElementById('HeroCompare');
  const heroBadgeText = document.getElementById('HeroBadgeText');
  const heroQuickBuyBtn = document.getElementById('HeroSlideQuickBuy');
  const heroAddBagBtn = document.getElementById('HeroSlideAddBag');

  let currentSlide = 0;
  let heroInterval = null;

  function setHeroSlide(index) {
    if (!heroSlides.length) return;
    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    const activeSlide = heroSlides[currentSlide];
    if (activeSlide) {
      const title = activeSlide.dataset.title;
      const sub = activeSlide.dataset.sub || '1:64 Die-Cast Metal • Factory Sealed Blister Card';
      const price = parseInt(activeSlide.dataset.price) || 179;
      const compare = parseInt(activeSlide.dataset.compare) || price;
      const badge = activeSlide.dataset.badge;
      const image = activeSlide.dataset.image;

      if (heroCounter) heroCounter.textContent = `0${currentSlide + 1} / 0${heroSlides.length}`;
      if (heroTitle) heroTitle.textContent = title;
      if (heroSub) heroSub.textContent = sub;
      if (heroPrice) heroPrice.textContent = `₹${price.toLocaleString('en-IN')}`;
      if (heroCompare) {
        if (compare > price) {
          heroCompare.textContent = `₹${compare.toLocaleString('en-IN')}`;
          heroCompare.style.display = 'inline';
        } else {
          heroCompare.textContent = 'FLAT MRP';
          heroCompare.style.textDecoration = 'none';
        }
      }
      if (heroBadgeText) heroBadgeText.textContent = badge;

      if (heroQuickBuyBtn) {
        heroQuickBuyBtn.dataset.productTitle = title;
        heroQuickBuyBtn.dataset.productPrice = price;
        heroQuickBuyBtn.dataset.productCompare = compare;
        heroQuickBuyBtn.dataset.productBadge = badge;
        heroQuickBuyBtn.dataset.productImage = image;
      }

      if (heroAddBagBtn) {
        heroAddBagBtn.dataset.productTitle = title;
        heroAddBagBtn.dataset.productPrice = price;
        heroAddBagBtn.dataset.productImage = image;
      }
    }
  }

  function getSlideDuration(index) {
    return index === 0 ? 5500 : 3500;
  }

  function resetProgressBars() {
    heroDots.forEach((dot) => {
      dot.classList.remove('running');
      const fill = dot.querySelector('.hero-dot-fill');
      if (fill) {
        fill.style.animation = 'none';
        void fill.offsetWidth;
      }
    });
    const activeDot = heroDots[currentSlide];
    if (activeDot) {
      activeDot.classList.add('running');
      const fill = activeDot.querySelector('.hero-dot-fill');
      if (fill) {
        const dur = getSlideDuration(currentSlide);
        fill.style.animation = `heroDotProgress ${dur}ms linear forwards`;
      }
    }
  }

  function scheduleNextSlide() {
    if (heroInterval) clearTimeout(heroInterval);
    resetProgressBars();
    const duration = getSlideDuration(currentSlide);
    heroInterval = setTimeout(() => {
      setHeroSlide(currentSlide + 1);
      scheduleNextSlide();
    }, duration);
  }

  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setHeroSlide(idx);
      scheduleNextSlide();
    });
  });

  if (heroSlides.length) {
    setHeroSlide(0);
    scheduleNextSlide();
  }

  function handleHeroPrev(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setHeroSlide(currentSlide - 1);
    scheduleNextSlide();
  }

  function handleHeroNext(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setHeroSlide(currentSlide + 1);
    scheduleNextSlide();
  }

  document.querySelectorAll('#HeroStagePrev, .hero-stage-arrow--prev').forEach(btn => {
    btn.addEventListener('click', handleHeroPrev);
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleHeroPrev(e);
    });
  });

  document.querySelectorAll('#HeroStageNext, .hero-stage-arrow--next').forEach(btn => {
    btn.addEventListener('click', handleHeroNext);
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleHeroNext(e);
    });
  });

  // Mobile Touch Swipe Gestures
  const stageEl = document.getElementById('HeroSliderStage');
  if (stageEl) {
    let touchStartX = 0;
    let touchStartY = 0;

    stageEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    stageEl.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) setHeroSlide(currentSlide + 1);
        else setHeroSlide(currentSlide - 1);
        scheduleNextSlide();
      }
    }, { passive: true });
  }

  // Desktop 3D Interactive Card Tilt
  const showcaseCard = document.getElementById('HeroShowcase');
  if (showcaseCard && window.innerWidth > 992) {
    showcaseCard.addEventListener('mousemove', (e) => {
      const rect = showcaseCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / (rect.height / 2)) * 4;
      const rotateY = (x / (rect.width / 2)) * 4;
      showcaseCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });
    showcaseCard.addEventListener('mouseleave', () => {
      showcaseCard.style.transform = '';
    });
  }

  // =========================================================================
  // LIVE CASE DROP COUNTDOWN TIMER
  // =========================================================================
  const elDays = document.getElementById('TimerDays');
  const elHours = document.getElementById('TimerHours');
  const elMins = document.getElementById('TimerMins');
  const elSecs = document.getElementById('TimerSecs');

  if (elDays && elHours && elMins && elSecs) {
    let totalSeconds = (2 * 24 * 3600) + (11 * 3600) + (42 * 60) + 18;
    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const d = Math.floor(totalSeconds / (3600 * 24));
        const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        elDays.textContent = String(d).padStart(2, '0');
        elHours.textContent = String(h).padStart(2, '0');
        elMins.textContent = String(m).padStart(2, '0');
        elSecs.textContent = String(s).padStart(2, '0');
      }
    }, 1000);
  }

  // =========================================================================
  // INTERACTIVE HOT WHEELS COLLECTOR PACK FINDER
  // =========================================================================
  const packStyle = document.getElementById('PackStyle');
  const packCount = document.getElementById('PackCount');
  const packUsage = document.getElementById('PackUsage');
  const packResult = document.getElementById('PackResultBadge');

  function updatePackRecommendation() {
    if (!packStyle || !packCount || !packUsage || !packResult) return;
    const style = packStyle.value;
    const count = parseInt(packCount.value) || 6;
    const usage = packUsage.value;
    const total = count * 179;
    let tierText = '';
    if (total >= 1499) tierText = '• FREE Delivery + 2 FREE Cars Unlocked! 🔥';
    else if (total >= 999) tierText = '• FREE Delivery + 1 FREE Car Unlocked! 🎁';
    else if (total >= 499) tierText = '• FREE Delivery Unlocked! 🚚';
    else tierText = `• Add ₹${499 - total} more for Free Delivery`;

    let picks = '';
    if (style === 'jdm') picks = 'Toyota Supra MK4, Civic Type R EK9, Mazda RX-7 FD3S';
    else if (style === 'exotics') picks = 'Porsche 911 GT3, Koenigsegg Jesko, Bugatti Chiron';
    else if (style === 'muscle') picks = 'Mustang Boss 302, \'70 Dodge Charger R/T, \'69 Camaro SS';
    else picks = 'Twin Mill, Bone Shaker, Arkham Knight Batmobile';

    const cardTip = usage === 'carded'
      ? 'Shipped in rigid corrugated armor with bubble wrap for mint blisters.'
      : 'Ideal high-speed 1:64 axles tuned for Hot Wheels orange track loops.';

    packResult.innerHTML = `🏁 Recommended: <strong>${count}-Car ${style.toUpperCase()} Bundle — ₹${total.toLocaleString('en-IN')}</strong> (${count} × ₹179) ${tierText}<br><span style="font-size:0.8rem;font-weight:500;">Top Picks: ${picks} • ${cardTip}</span>`;
  }

  if (packStyle) packStyle.addEventListener('change', updatePackRecommendation);
  if (packCount) packCount.addEventListener('change', updatePackRecommendation);
  if (packUsage) packUsage.addEventListener('change', updatePackRecommendation);

  // =========================================================================
  // DEDICATED BUYING WINDOW MODAL
  // =========================================================================
  const buyingWindow = document.getElementById('BuyingWindowModal');
  const bwCloseTriggers = document.querySelectorAll('[data-buying-window-close]');
  const bwImage = document.getElementById('BuyingWindowImage');
  const bwTitle = document.getElementById('BuyingWindowTitle');
  const bwPrice = document.getElementById('BuyingWindowPrice');
  const bwCompare = document.getElementById('BuyingWindowCompare');
  const bwDiscount = document.getElementById('BuyingWindowDiscount');
  const bwBadge = document.getElementById('BuyingWindowBadge');
  const bwQtyInput = document.getElementById('BwQtyInput');
  const bwAddBtn = document.getElementById('BwAddBagBtn');
  const bwBuyNowBtn = document.getElementById('BwBuyNowBtn');

  let currentSelectedProduct = {
    title: 'Hot Wheels Toyota Supra (MK4 A80)',
    price: 179,
    compare: 179,
    image: 'hw-car-02.jpg',
    option: 'Long Card',
    quantity: 1
  };

  function openBuyingWindow(data) {
    if (!buyingWindow) return;

    currentSelectedProduct.title = data.title || 'Hot Wheels 1:64 Die-Cast Car';
    currentSelectedProduct.price = data.price || 179;
    currentSelectedProduct.compare = data.compare || currentSelectedProduct.price;
    currentSelectedProduct.image = data.image || 'hw-car-02.jpg';
    currentSelectedProduct.option = 'Long Card';
    currentSelectedProduct.quantity = 1;

    if (bwTitle) bwTitle.textContent = currentSelectedProduct.title;
    if (bwPrice) bwPrice.textContent = `₹${currentSelectedProduct.price.toLocaleString('en-IN')}`;
    if (bwBadge) bwBadge.textContent = data.badge || '1:64 MAINLINE';
    if (bwQtyInput) bwQtyInput.value = 1;

    if (bwCompare && bwDiscount) {
      if (currentSelectedProduct.compare > currentSelectedProduct.price) {
        bwCompare.style.display = 'inline';
        bwCompare.textContent = `₹${currentSelectedProduct.compare.toLocaleString('en-IN')}`;
        const discount = Math.round(((currentSelectedProduct.compare - currentSelectedProduct.price) / currentSelectedProduct.compare) * 100);
        bwDiscount.textContent = `${discount}% OFF`;
      } else {
        bwCompare.style.display = 'none';
        bwDiscount.textContent = 'FLAT ₹179 MRP • SEALED';
      }
    }

    if (bwImage) {
      bwImage.classList.remove('vimi-loaded');
      const bwWrapper = bwImage.closest('.buying-window-media');
      if (bwWrapper) bwWrapper.classList.remove('vimi-shimmer-off');

      const imgPath = data.image.includes('/') ? data.image : `./assets/${data.image}`;
      bwImage.src = imgPath;
      bwImage.onload = function() {
        if (typeof window.vimiImgLoaded === 'function') window.vimiImgLoaded(this);
      };
      bwImage.onerror = function() {
        this.src = `./assets/hw-car-02.jpg`;
        if (typeof window.vimiImgLoaded === 'function') window.vimiImgLoaded(this);
      };
      if (bwImage.complete && bwImage.naturalWidth > 0) {
        if (typeof window.vimiImgLoaded === 'function') window.vimiImgLoaded(bwImage);
      }
    }

    document.querySelectorAll('.bw-size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === 'Long Card');
    });

    buyingWindow.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeBuyingWindow() {
    if (buyingWindow) {
      buyingWindow.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  bwCloseTriggers.forEach(el => el.addEventListener('click', closeBuyingWindow));

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-buying-window');
    if (!trigger) return;
    e.preventDefault();

    const rawPrice = parseInt(trigger.dataset.productPrice) || 179;
    const rawCompare = parseInt(trigger.dataset.productCompare) || rawPrice;
    const priceInRs = rawPrice >= 10000 ? Math.round(rawPrice / 100) : rawPrice;
    const compareInRs = rawCompare >= 10000 ? Math.round(rawCompare / 100) : rawCompare;

    openBuyingWindow({
      title: trigger.dataset.productTitle,
      price: priceInRs,
      compare: compareInRs,
      badge: trigger.dataset.productBadge,
      image: trigger.dataset.productImage || 'hw-car-02.jpg'
    });
  });

  document.querySelectorAll('.bw-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bw-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSelectedProduct.option = btn.dataset.size;
    });
  });

  const bwMinus = document.getElementById('BwQtyMinus');
  const bwPlus = document.getElementById('BwQtyPlus');
  if (bwMinus && bwPlus && bwQtyInput) {
    bwMinus.addEventListener('click', () => {
      let v = parseInt(bwQtyInput.value) || 1;
      if (v > 1) {
        bwQtyInput.value = v - 1;
        currentSelectedProduct.quantity = v - 1;
      }
    });
    bwPlus.addEventListener('click', () => {
      let v = parseInt(bwQtyInput.value) || 1;
      if (v < 10) {
        bwQtyInput.value = v + 1;
        currentSelectedProduct.quantity = v + 1;
      }
    });
  }

  if (bwAddBtn) {
    bwAddBtn.addEventListener('click', () => {
      if (window.vimiCartAPI) {
        window.vimiCartAPI.addItem({
          title: `${currentSelectedProduct.title} (${currentSelectedProduct.option})`,
          price: currentSelectedProduct.price,
          quantity: currentSelectedProduct.quantity,
          image: currentSelectedProduct.image
        });
      }
      closeBuyingWindow();
    });
  }

  if (bwBuyNowBtn) {
    bwBuyNowBtn.addEventListener('click', () => {
      if (window.vimiCartAPI) {
        window.vimiCartAPI.addItem({
          title: `${currentSelectedProduct.title} (${currentSelectedProduct.option})`,
          price: currentSelectedProduct.price,
          quantity: currentSelectedProduct.quantity,
          image: currentSelectedProduct.image
        });
      }
      closeBuyingWindow();
      const checkoutBtn = document.querySelector('.btn--checkout');
      if (checkoutBtn) checkoutBtn.click();
    });
  }

  // =========================================================================
  // CUSTOMER LOGIN / ACCOUNT MODAL
  // =========================================================================
  const loginModal = document.getElementById('LoginModal');
  const loginTrigger = document.getElementById('LoginTrigger');
  const loginCloseTriggers = document.querySelectorAll('[data-login-close]');
  const loginTabsNav = document.getElementById('LoginTabsNav');
  const tabSignIn = document.getElementById('TabSignIn');
  const tabRegister = document.getElementById('TabRegister');
  const formSignIn = document.getElementById('FormSignIn');
  const formRegister = document.getElementById('FormRegister');
  const formRecover = document.getElementById('FormRecover');
  const linkForgotPassword = document.getElementById('LinkForgotPassword');
  const cancelRecover = document.getElementById('CancelRecover');

  function openLoginModal(view) {
    if (loginModal) {
      loginModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (view === 'recover') showRecoverForm();
      else if (view === 'register') showRegisterForm();
      else showSignInForm();
    }
  }

  function closeLoginModal() {
    if (loginModal) {
      loginModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function showSignInForm() {
    if (loginTabsNav) loginTabsNav.style.display = 'grid';
    if (tabSignIn) tabSignIn.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    if (formSignIn) formSignIn.style.display = 'flex';
    if (formRegister) formRegister.style.display = 'none';
    if (formRecover) formRecover.style.display = 'none';
  }

  function showRegisterForm() {
    if (loginTabsNav) loginTabsNav.style.display = 'grid';
    if (tabRegister) tabRegister.classList.add('active');
    if (tabSignIn) tabSignIn.classList.remove('active');
    if (formRegister) formRegister.style.display = 'flex';
    if (formSignIn) formSignIn.style.display = 'none';
    if (formRecover) formRecover.style.display = 'none';
  }

  function showRecoverForm() {
    if (loginTabsNav) loginTabsNav.style.display = 'none';
    if (formSignIn) formSignIn.style.display = 'none';
    if (formRegister) formRegister.style.display = 'none';
    if (formRecover) formRecover.style.display = 'flex';
  }

  if (loginTrigger) loginTrigger.addEventListener('click', () => openLoginModal('signin'));
  if (mobileLoginLink) mobileLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileNav();
    openLoginModal('signin');
  });
  loginCloseTriggers.forEach(el => el.addEventListener('click', closeLoginModal));

  if (tabSignIn) tabSignIn.addEventListener('click', showSignInForm);
  if (tabRegister) tabRegister.addEventListener('click', showRegisterForm);
  if (linkForgotPassword) linkForgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    showRecoverForm();
  });
  if (cancelRecover) cancelRecover.addEventListener('click', (e) => {
    e.preventDefault();
    showSignInForm();
  });

  if (window.location.hash === '#recover') openLoginModal('recover');
  else if (window.location.hash === '#register') openLoginModal('register');
  else if (window.location.hash === '#login') openLoginModal('signin');
  else if (loginModal && loginModal.querySelector('.login-form-errors')) {
    const hasRecoverError = formRecover && formRecover.querySelector('.login-form-errors');
    const hasRegisterError = formRegister && formRegister.querySelector('.login-form-errors');
    if (hasRecoverError) openLoginModal('recover');
    else if (hasRegisterError) openLoginModal('register');
    else openLoginModal('signin');
  }

  window.handleLoginSuccess = function(msg) {
    closeLoginModal();
    window.showVimiToast(msg);
  };

  // =========================================================================
  // HOT WHEELS CATEGORY FILTER TABS
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      productCards.forEach(card => {
        const cat = (card.dataset.category || '').toLowerCase();
        const text = card.innerText.toLowerCase();
        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (cat) {
          card.style.display = cat === filter ? 'flex' : 'none';
        } else if (filter === 'jdm') {
          card.style.display = text.includes('jdm') || text.includes('skyline') || text.includes('supra') || text.includes('civic') || text.includes('rx-7') || text.includes('datsun') || text.includes('subaru') ? 'flex' : 'none';
        } else if (filter === 'exotics') {
          card.style.display = text.includes('exotic') || text.includes('porsche') || text.includes('lamborghini') || text.includes('mclaren') || text.includes('jesko') || text.includes('bugatti') || text.includes('pagani') ? 'flex' : 'none';
        } else if (filter === 'muscle') {
          card.style.display = text.includes('muscle') || text.includes('mustang') || text.includes('charger') || text.includes('camaro') || text.includes('corvette') || text.includes('barracuda') || text.includes('gt40') ? 'flex' : 'none';
        } else if (filter === 'track') {
          card.style.display = text.includes('track') || text.includes('twin mill') || text.includes('bone shaker') || text.includes('rodger') || text.includes('deora') || text.includes('batmobile') || text.includes('787b') ? 'flex' : 'none';
        }
      });
    });
  });

  // Collection Sort Select (client-side fallback)
  const sortSelect = document.getElementById('SortBy');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const grid = document.querySelector('.products-grid');
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll('.product-card'));
      if (sortSelect.value === 'title-asc') {
        cards.sort((a, b) => a.querySelector('.product-card__title').innerText.localeCompare(b.querySelector('.product-card__title').innerText));
      } else if (sortSelect.value === 'title-desc') {
        cards.sort((a, b) => b.querySelector('.product-card__title').innerText.localeCompare(a.querySelector('.product-card__title').innerText));
      } else if (sortSelect.value === 'featured') {
        cards.sort((a, b) => (parseInt(a.dataset.order) || 0) - (parseInt(b.dataset.order) || 0));
      }
      cards.forEach(c => grid.appendChild(c));
    });
  }
});

/**
 * Global Toast Helper
 */
window.showVimiToast = function(message) {
  let toast = document.getElementById('VimiToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'VimiToast';
    toast.className = 'vimi-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-active');

  setTimeout(() => {
    toast.classList.remove('is-active');
  }, 3200);
};

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    if (window.scrollY > 15) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  }
}, { passive: true });

// =========================================================
// Dedicated Mobile Hero Carousel Synchronizer
// =========================================================
(function(){
  function initMobileHero(){
    var s = document.getElementById('mSlides');
    var d = document.querySelectorAll('#mDots i');
    var nameEl = document.getElementById('mName');
    var metaEl = document.getElementById('mMeta');
    var priceEl = document.getElementById('mPrice');
    var buyBtn = document.getElementById('MobileHeroQuickBuy');
    var addBtn = document.getElementById('MobileHeroAddBag');
    if(!s) return;
    s.addEventListener('scroll', function(){
      var i = Math.round(s.scrollLeft / s.clientWidth);
      d.forEach(function(x, k){ x.classList.toggle('on', k === i); });
      var slides = s.querySelectorAll('.m-slide');
      if(slides[i]){
        var sl = slides[i];
        if(nameEl) nameEl.textContent = sl.dataset.title;
        if(metaEl) metaEl.textContent = sl.dataset.meta;
        if(priceEl) priceEl.innerHTML = sl.dataset.price + (sl.dataset.compare ? '<s>' + sl.dataset.compare + '</s>' : '');
        if(buyBtn) {
          buyBtn.dataset.productTitle = sl.dataset.title;
          buyBtn.dataset.productPrice = sl.dataset.rawPrice;
          buyBtn.dataset.productCompare = sl.dataset.rawCompare;
          buyBtn.dataset.productImage = sl.dataset.img;
        }
        if(addBtn) {
          addBtn.dataset.productTitle = sl.dataset.title;
          addBtn.dataset.productPrice = sl.dataset.rawPrice;
          addBtn.dataset.productImage = sl.dataset.img;
        }
      }
    }, { passive: true });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMobileHero);
  else initMobileHero();
})();

/* ==========================================================================
   GLOBAL IMAGE LOADER & SHIMMER ORCHESTRATOR
   ========================================================================== */
window.vimiImgLoaded = function(img) {
  if (!img) return;
  img.classList.add('vimi-loaded');
  const wrapper = img.closest('.product-card__media-wrapper, .m-slide, .hero-slide, .buying-window-media');
  if (wrapper) {
    wrapper.classList.add('vimi-shimmer-off');
  }
};

function initVimiGlobalImageLoader() {
  const selector = '.product-card__image, .m-slide-img, .hero-slide-img, .buying-window-img';
  const imgs = document.querySelectorAll(selector);

  imgs.forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      window.vimiImgLoaded(img);
    } else {
      img.addEventListener('load', function() {
        window.vimiImgLoaded(this);
      }, { once: true });
      img.addEventListener('error', function() {
        setTimeout(() => window.vimiImgLoaded(this), 300);
      }, { once: true });
    }
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVimiGlobalImageLoader);
else initVimiGlobalImageLoader();
