/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE VARIABLES ---
  let exhibitionIndex = 0;
  const totalExhibits = 4;

  // --- DOM ELEMENT REFERENCES ---
  const mainNavigation = document.getElementById('main-navigation');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  // Slide navigation
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');

  // Modals & triggers
  const ticketModalOverlay = document.getElementById('ticket-modal-overlay');
  const ticketModalCloseBtn = document.getElementById('ticket-modal-close-btn');
  const ticketModalBackdrop = document.getElementById('ticket-modal-backdrop');
  const ticketModalDoneBtn = document.getElementById('ticket-success-close-btn');

  const catalogueModalOverlay = document.getElementById('catalogue-modal-overlay');
  const catalogueModalCloseBtn = document.getElementById('catalogue-modal-close-btn');
  const catalogueModalBackdrop = document.getElementById('catalogue-modal-backdrop');

  // Catalogue request
  const catalogueRequestForm = document.getElementById('catalogue-request-form') as HTMLFormElement;
  const catalogueSubmitBtn = document.getElementById('catalogue-submit-btn') as HTMLButtonElement;
  const catalogueFieldEmail = document.getElementById('catalogue-field-email') as HTMLInputElement;
  const catalogueSuccess = document.getElementById('catalogue-success');
  const successCatalogueEmail = document.getElementById('success-catalogue-email');

  // Global sharing handler
  const footerShareBtn = document.getElementById('footer-share-btn');

  // --- STICKY NAV & BACK TO TOP HANDLER ---
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky nav toggle
    if (mainNavigation) {
      if (scrollY > 80) {
        mainNavigation.classList.remove('bg-white/80', 'border-[#3C612F]/10', 'py-4.5', 'top-8');
        mainNavigation.classList.add('bg-white/95', 'border-[#C67139]/30', 'shadow-lg', 'py-3', 'top-2');
      } else {
        mainNavigation.classList.remove('bg-white/95', 'border-[#C67139]/30', 'shadow-lg', 'py-3', 'top-2');
        mainNavigation.classList.add('bg-white/80', 'border-[#3C612F]/10', 'py-4.5', 'top-8');
      }
    }

    // Back to top toggle
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- MOBILE DRAWER TOGGLE ---
  if (mobileMenuToggle && mobileDrawer && menuIcon && closeIcon) {
    mobileMenuToggle.addEventListener('click', () => {
      const isClosed = mobileDrawer.classList.contains('hidden');
      if (isClosed) {
        mobileDrawer.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileDrawer.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }

  // --- ANCHOR SMOOTH SCROLL ---
  const scrollTargets = document.querySelectorAll('[data-scroll-target]');
  scrollTargets.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-scroll-target');
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          // Close mobile menu first if open
          if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
            mobileDrawer.classList.add('hidden');
            if (menuIcon && closeIcon) {
              menuIcon.classList.remove('hidden');
              closeIcon.classList.add('hidden');
            }
          }

          // Native smooth scroll
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- EXHIBITIONS CAROUSEL LOGIC ---
  const updateExhibits = (index: number) => {
    exhibitionIndex = (index + totalExhibits) % totalExhibits;

    for (let i = 0; i < totalExhibits; i++) {
      const slide = document.getElementById(`exhibition-slide-${i}`);
      if (slide) {
        if (i === exhibitionIndex) {
          slide.classList.add('ring-2', 'ring-[#C67139]', 'shadow-md');
          slide.classList.remove('opacity-95');
        } else {
          slide.classList.remove('ring-2', 'ring-[#C67139]', 'shadow-md');
          slide.classList.add('opacity-95');
        }
      }
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateExhibits(exhibitionIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateExhibits(exhibitionIndex + 1);
    });
  }

  // --- HELPER FOR OPENING MODAL ---
  const openTicketModal = () => {
    if (ticketModalOverlay) {
      ticketModalOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeTicketModal = () => {
    if (ticketModalOverlay) {
      ticketModalOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  // Attach modal triggers
  const bannerSecureBtn = document.getElementById('banner-secure-rate-btn');
  const navBuyTickets = document.getElementById('nav-buy-tickets');
  const mobileDrawerBuyTickets = document.getElementById('mobile-drawer-buy-tickets');
  const heroBuyTickets = document.getElementById('hero-buy-tickets-btn');
  const ctaQrButton = document.getElementById('cta-qr-button');
  const ctaQrPreview = document.getElementById('cta-qr-preview');

  // Trigger Exhibitions cards too as generic ticket buy mapping
  const exhibitionCtaBtns = document.querySelectorAll('.exhibition-cta-btn');

  if (bannerSecureBtn) bannerSecureBtn.addEventListener('click', openTicketModal);
  if (navBuyTickets) navBuyTickets.addEventListener('click', openTicketModal);
  if (mobileDrawerBuyTickets) mobileDrawerBuyTickets.addEventListener('click', openTicketModal);
  if (heroBuyTickets) heroBuyTickets.addEventListener('click', openTicketModal);
  if (ctaQrButton) ctaQrButton.addEventListener('click', openTicketModal);
  if (ctaQrPreview) ctaQrPreview.addEventListener('click', openTicketModal);

  exhibitionCtaBtns.forEach((btn) => {
    btn.addEventListener('click', openTicketModal);
  });

  if (ticketModalCloseBtn) ticketModalCloseBtn.addEventListener('click', closeTicketModal);
  if (ticketModalBackdrop) ticketModalBackdrop.addEventListener('click', closeTicketModal);
  if (ticketModalDoneBtn) ticketModalDoneBtn.addEventListener('click', closeTicketModal);

  // --- CATALOGUE MODAL INITIATORS ---
  const openCatalogueModal = () => {
    if (catalogueModalOverlay) {
      catalogueModalOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeCatalogueModal = () => {
    if (catalogueModalOverlay) {
      catalogueModalOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');

      // Reset form states
      if (catalogueRequestForm) {
        catalogueRequestForm.reset();
        catalogueRequestForm.classList.remove('hidden');
      }
      if (catalogueSuccess) {
        catalogueSuccess.classList.add('hidden');
      }
    }
  };
  const previewCatalogueBtn = document.getElementById('auction-catalogue-btn');
  if (previewCatalogueBtn) previewCatalogueBtn.addEventListener('click', openCatalogueModal);
  if (catalogueModalCloseBtn) catalogueModalCloseBtn.addEventListener('click', closeCatalogueModal);
  if (catalogueModalBackdrop) catalogueModalBackdrop.addEventListener('click', closeCatalogueModal);

  // Catalogue Submit Transaction
  if (catalogueRequestForm) {
    catalogueRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = catalogueFieldEmail.value.trim();
      if (!email) return;

      if (catalogueSubmitBtn) {
        catalogueSubmitBtn.disabled = true;
        catalogueSubmitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        if (catalogueSubmitBtn) {
          catalogueSubmitBtn.disabled = false;
          catalogueSubmitBtn.textContent = 'Request PDF';
        }

        // Switch screen states
        catalogueRequestForm.classList.add('hidden');
        if (catalogueSuccess) {
          catalogueSuccess.classList.remove('hidden');
        }
        if (successCatalogueEmail) {
          successCatalogueEmail.textContent = email;
        }
      }, 1200);
    });
  }

  // --- FOOTER AND METADATA ACTIONS ---
  if (footerShareBtn) {
    footerShareBtn.addEventListener('click', () => {
      // Copy to clipboard fallback
      const shareUrl = 'https://thesabahpages.com/anniversary';
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(`Registration Link Copied: ${shareUrl}`);
      }).catch(() => {
        alert(`Link: ${shareUrl}`);
      });
    });
  }

  // --- CARD DESCRIPTION TOGGLE ACTIONS ---
  const educationShort = document.getElementById('education-desc-short');
  const educationFull = document.getElementById('education-desc-full');

  const toggleEducation = () => {
    if (educationShort && educationFull) {
      educationShort.classList.toggle('hidden');
      educationFull.classList.toggle('hidden');
    }
  };

  if (educationShort) educationShort.addEventListener('click', toggleEducation);
  if (educationFull) educationFull.addEventListener('click', toggleEducation);

  // --- VENDORS MODAL INITIATORS ---
  const vendorsModalOverlay = document.getElementById('vendors-modal-overlay');
  const vendorsModalCloseBtn = document.getElementById('vendors-modal-close-btn');
  const vendorsModalBackdrop = document.getElementById('vendors-modal-backdrop');
  const exhibitionVendorsBtn = document.getElementById('exhibition-vendors-btn');

  const openVendorsModal = () => {
    if (vendorsModalOverlay) {
      vendorsModalOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeVendorsModal = () => {
    if (vendorsModalOverlay) {
      vendorsModalOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  if (exhibitionVendorsBtn) exhibitionVendorsBtn.addEventListener('click', openVendorsModal);
  if (vendorsModalCloseBtn) vendorsModalCloseBtn.addEventListener('click', closeVendorsModal);
  if (vendorsModalBackdrop) vendorsModalBackdrop.addEventListener('click', closeVendorsModal);
});
