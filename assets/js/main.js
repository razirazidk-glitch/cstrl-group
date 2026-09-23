/**
 * CSTRL Group ApS - Core Logic (Simpel & Generel)
 * CVR: 45778444 | Frederiksberg, Danmark
 */

// State
const state = {
  lang: 'da',
  soundEnabled: true,
  activeOfferTab: 'investments'
};

// Web Audio API Tactile Micro-Interactions
let audioCtx = null;

function initAudio() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
}

function playTactileClick(freq = 750, duration = 0.035, type = 'sine') {
  if (!state.soundEnabled) return;
  try {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Non-critical fallback
  }
}

// Translations Dictionary (Generelt & Simpelt)
const translations = {
  da: {
    nav_offerings: 'Hvad Vi Tilbyder',
    nav_investments: 'Investeringer',
    nav_facilities: 'Sportsarealer',
    nav_sponsorship: 'Sponsoraftaler',
    nav_equipment: 'Sportsudstyr & Aftaler',
    nav_about: 'Om Os',
    nav_contact: 'Kontakt',
    btn_contact: 'Kontakt Os',
    hero_badge: 'CSTRL Group ApS • CVR 45778444 • Frederiksberg',
    hero_title: 'Investeringer, sportsarealer, sponsoraftaler og sportsudstyr',
    hero_desc: 'CSTRL Group ApS er et dansk holdingselskab. Vi investerer i andre selskaber, varetager sportsarealer i Danmark og Europa, forhandler værdiskabende sponsoraftaler for firmaer og sikrer markedets bedste aftaler på sportsudstyr gennem stærke leverandørsamarbejder.',
    hero_btn_1: 'Se Hvad Vi Tilbyder',
    hero_btn_2: 'Kontakt For Samarbejde',
    offer_tag: 'Vores Forretningsområder',
    offer_title: 'Hvad Vi Tilbyder',
    offer_desc: 'Vi fokuserer på fire centrale forretningsområder, hvor vi skaber langsigtet værdi for selskaber, partnere og idrætsaktører.',
    about_tag: 'Virksomhedsoplysninger',
    about_title: 'Om CSTRL Group ApS',
    contact_tag: 'Tag Første Skridt',
    contact_title: 'Kontakt Os For En Uforpligtende Dialog',
    contact_btn: 'Send Besked'
  },
  en: {
    nav_offerings: 'What We Offer',
    nav_investments: 'Investments',
    nav_facilities: 'Sports Venues',
    nav_sponsorship: 'Sponsorships',
    nav_equipment: 'Sports Equipment Deals',
    nav_about: 'About Us',
    nav_contact: 'Contact',
    btn_contact: 'Contact Us',
    hero_badge: 'CSTRL Group ApS • CVR 45778444 • Frederiksberg, Denmark',
    hero_title: 'Investments, sports venues, sponsorship deals and sports gear',
    hero_desc: 'CSTRL Group ApS is a Danish holding company. We invest in growing companies, facilitate sports venues in Denmark and across Europe, manage high-impact sponsorship agreements for corporate partners, and procure the best supplier deals on sports equipment.',
    hero_btn_1: 'Explore What We Offer',
    hero_btn_2: 'Get In Touch',
    offer_tag: 'Our Business Areas',
    offer_title: 'What We Offer',
    offer_desc: 'We focus on four key areas, creating lasting commercial and sporting value across Denmark and Europe.',
    about_tag: 'Company Details',
    about_title: 'About CSTRL Group ApS',
    contact_tag: 'Get In Touch',
    contact_title: 'Contact Us For An Initial Discussion',
    contact_btn: 'Send Message'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Sound Mute Toggle
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.classList.toggle('text-[#00F59B]', state.soundEnabled);
      soundBtn.classList.toggle('text-gray-500', !state.soundEnabled);
      if (state.soundEnabled) playTactileClick(1000, 0.04);
    });
  }

  // Language Toggle
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      state.lang = state.lang === 'da' ? 'en' : 'da';
      langToggleBtn.textContent = state.lang === 'da' ? '🇩🇰 DA' : '🇬🇧 EN';
      applyTranslations(state.lang);
      playTactileClick(800, 0.04);
    });
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      playTactileClick(600, 0.03);
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Main Contact Form
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playTactileClick(1100, 0.05);

      const name = document.getElementById('contact-name')?.value || 'Kunde';
      const email = document.getElementById('contact-email')?.value || '';
      const phone = document.getElementById('contact-phone')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Generel';

      const subjectMap = {
        investment: 'Investering i selskab',
        facilities: 'Sportsarealer i Danmark / Europa',
        sponsorship: 'Sponsoraftale for firma',
        equipment: 'Aftale på sportsudstyr'
      };

      showSuccessModal({
        title: 'Tak for din henvendelse',
        message: `Mange tak, ${name}. Vi har modtaget din forespørgsel angående "${subjectMap[subject] || subject}". Vi kontakter dig snarest muligt via ${email || 'e-mail'}.`,
        ref: `CSTRL-2026-${Math.floor(10000 + Math.random() * 90000)}`
      });

      contactForm.reset();
    });
  }
}

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });
}

function showSuccessModal({ title, message, ref }) {
  const modal = document.getElementById('success-modal');
  const titleElem = document.getElementById('success-modal-title');
  const descElem = document.getElementById('success-modal-desc');
  const refElem = document.getElementById('success-modal-ref');

  if (titleElem) titleElem.textContent = title;
  if (descElem) descElem.textContent = message;
  if (refElem) refElem.textContent = ref;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

window.closeSuccessModal = function() {
  playTactileClick(550, 0.03);
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// Pre-fill contact form helper
window.selectContactSubject = function(subjectValue, note = '') {
  playTactileClick(850, 0.03);
  const select = document.getElementById('contact-subject');
  const textarea = document.getElementById('contact-message');
  if (select) select.value = subjectValue;
  if (textarea && note) textarea.value = note;
  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
};
