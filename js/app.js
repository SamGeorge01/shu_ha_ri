/**
 * SHU.HA.RI ARCHITECTURE STUDIO
 * Interactive Core Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudioClock();
  initThemeToggle();
  initHeaderScroll();
  initPhilosophySwitcher();
  initPortfolioFilters();
  initProjectModal();
  initMaterialityArchive();
  initCommissionForm();
  initMobileNav();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. STUDIO TELEMETRY & WORLD CLOCK
   -------------------------------------------------------------------------- */
function initStudioClock() {
  const clockEl = document.getElementById('studioClockDisplay');
  if (!clockEl) return;

  function updateTime() {
    try {
      const options = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const tokyoTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
      clockEl.textContent = KYOTO STUDIO  JST;
    } catch (e) {
      const now = new Date();
      clockEl.textContent = STUDIO  UTC;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   2. THEME SWITCHER (Linen vs Nocturne)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  // Check saved or preferred theme
  const savedTheme = localStorage.getItem('shuhari-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('shuhari-theme', next);
  });
}

/* --------------------------------------------------------------------------
   3. HEADER SCROLL STATE
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. PHILOSOPHY INTERACTIVE SWITCHER (?????)
   -------------------------------------------------------------------------- */
function initPhilosophySwitcher() {
  const pills = document.querySelectorAll('.stage-pill');
  const cards = document.querySelectorAll('.philo-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const stage = pill.dataset.stage;
      
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      cards.forEach(card => {
        if (card.dataset.stage === stage) {
          card.classList.add('highlight');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('highlight');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PROJECT DOSSIER MODAL / LIGHTBOX
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  'prj-solis': {
    title: 'Villa Solis & Colonnade',
    tag: 'Private Residence & Colonnade',
    location: 'Aegean Cliffside / Kyoto Fusion',
    year: '2025',
    area: '920 m?',
    materials: 'Roman Travertine, Fair-Faced Concrete, Low-Iron Infinity Glass',
    leadArchitect: 'shu.ha.ri Architecture Studio',
    image: 'assets/images/hero_villa.jpg',
    description: 'A monolithic private residence sculpted into the natural cliffside. Villa Solis juxtaposes classical arched colonnade architecture with daring cantilevered engineering. The central infinity pool extends 14 meters over the volcanic stone foundation without visible structural pillars, dissolving the boundary between human refuge and the horizon.',
    quote: 'Architecture at the precipice of earth and sky?mastering the weight of stone to frame weightlessness.'
  },
  'prj-courtyard': {
    title: 'The Zen Courtyard House',
    tag: 'Courtyard Villa & Waterway',
    location: 'Mallorca Coast / Zen Sanctuary',
    year: '2024',
    area: '780 m?',
    materials: 'Unfilled Travertine, Hand-Chiseled Stone, Japanese Black Pine',
    leadArchitect: 'shu.ha.ri Architecture Studio',
    image: 'assets/images/courtyard_aerial.jpg',
    description: 'Designed around an austere central quadrangle, this residence blends Mediterranean stone vernacular with traditional Japanese engawa courtyards. An illuminated arched arcade shields the private quarters while a 25-meter azure lap pool reflects the shifting sky throughout the solar cycle.',
    quote: 'A sanctuary turned inward, orchestrating shadow, stone, and the tranquil sound of water.'
  },
  'prj-twilight': {
    title: 'Monolith at Twilight',
    tag: 'Linear Pavilion & Open Fields',
    location: 'Alentejo Meadow Plateau',
    year: '2026',
    area: '640 m?',
    materials: 'Board-Formed Concrete, Smoked Dark Oak, Basalt Hearth',
    leadArchitect: 'shu.ha.ri Architecture Studio',
    image: 'assets/images/exterior_twilight.jpg',
    description: 'An elongated, low-profile horizontal monolith that defers completely to the vast grassy plain. Floor-to-ceiling glass pavilions emit warm amber illumination against the dark silhouette of the hills. Featuring a sunken outdoor basalt stone fire lounge and silent black mirror pool.',
    quote: 'Pure horizontality that quietly anchors itself within the topography.'
  },
  'prj-shadows': {
    title: 'Pavilion of Shadows & Oak',
    tag: 'Interior Architecture & Louvers',
    location: 'Hakone Forest Reserve',
    year: '2025',
    area: '510 m?',
    materials: 'White Oak Slats, Natural Lime-Wash Plaster, Cast Concrete',
    leadArchitect: 'shu.ha.ri Architecture Studio',
    image: 'assets/images/interior_shadows.jpg',
    description: 'An exercise in delicate wabi-sabi aesthetics and natural light choreography. Wooden ceiling louvers filter harsh sunlight into dancing botanical silhouettes across hand-troweled lime-wash plaster. A sunken lounge floor with recessed floor illumination fosters deep stillness.',
    quote: 'Space that is not merely built, but tuned like an acoustic instrument for daylight and shadow.'
  },
  'prj-tectonics': {
    title: 'Tectonic Materiality Study',
    tag: 'Material Laboratory & Joinery',
    location: 'Kyoto Research Atelier',
    year: '2024',
    area: 'Detail Craft',
    materials: 'Unfilled Roman Travertine, Board-Formed Concrete, Blackened Steel',
    leadArchitect: 'shu.ha.ri Architecture Studio',
    image: 'assets/images/material_detail.jpg',
    description: 'The essence of Shu (?): returning to material truth. Here, board-formed concrete retaining its natural wood grain meets porous Roman travertine through an unadorned blackened steel reveal. No decorative trims or disguises?only precision tolerances down to the millimeter.',
    quote: 'Down to the final stone?every joint reflects intentionality and mastery.'
  }
};

function initProjectModal() {
  const backdrop = document.getElementById('projectModalBackdrop');
  const closeBtn = document.getElementById('projectModalClose');
  const projectCards = document.querySelectorAll('.project-card');

  if (!backdrop) return;

  function openProject(projectId) {
    const data = PROJECT_DATABASE[projectId];
    if (!data) return;

    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectTag').textContent = data.tag;
    document.getElementById('modalProjectLocation').textContent = data.location;
    document.getElementById('modalProjectYear').textContent = data.year;
    document.getElementById('modalProjectArea').textContent = data.area;
    document.getElementById('modalProjectMaterials').textContent = data.materials;
    document.getElementById('modalProjectDesc').textContent = data.description;
    document.getElementById('modalProjectQuote').textContent = "";
    document.getElementById('modalProjectImg').src = data.image;
    document.getElementById('modalProjectImg').alt = data.title;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      openProject(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProject);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeProject();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeProject();
    }
  });
}

/* --------------------------------------------------------------------------
   7. MATERIALITY ARCHIVE
   -------------------------------------------------------------------------- */
const MATERIALS_DATABASE = {
  'travertine': {
    name: 'Unfilled Roman Travertine',
    provenance: 'Tivoli Quarries, Italy',
    desc: 'Warm, porous limestone cut along the vein. Its tactile micro-cavities celebrate organic geologic time while providing cool thermal mass in Mediterranean and subtropical climates.',
    image: 'assets/images/material_detail.jpg'
  },
  'concrete': {
    name: 'Board-Formed Architectural Concrete',
    provenance: 'Artisanal Cedar Formwork',
    desc: 'Poured in-situ with natural rough-sawn cedar grain left permanently imprinted into the cementitious matrix. Honesty of mass, weathering gracefully across decades.',
    image: 'assets/images/material_detail.jpg'
  },
  'oak': {
    name: 'Natural White Oak Louvers',
    provenance: 'Sustainable Japanese Forestry',
    desc: 'Precision-milled structural timber slats engineered for solar shading and acoustic dampening, casting poetic linear shadows across interior sanctuaries.',
    image: 'assets/images/interior_shadows.jpg'
  },
  'stone': {
    name: 'Hand-Dry-Stacked Basalt Stone',
    provenance: 'Locally Sourced Volcanic Rock',
    desc: 'Rooted directly into natural site topography. Earthy, durable foundations supporting weightless glass and cantilevered terraces.',
    image: 'assets/images/hero_villa.jpg'
  }
};

function initMaterialityArchive() {
  const cards = document.querySelectorAll('.swatch-card');
  const imgEl = document.getElementById('materialPreviewImg');
  const nameEl = document.getElementById('materialPreviewName');
  const provEl = document.getElementById('materialPreviewProv');
  const descEl = document.getElementById('materialPreviewDesc');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const matKey = card.dataset.material;
      const data = MATERIALS_DATABASE[matKey];
      if (!data) return;

      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.image;
          nameEl.textContent = data.name;
          provEl.textContent = data.provenance;
          descEl.textContent = data.desc;
          imgEl.style.opacity = '1';
        }, 200);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. COMMISSION INQUIRY BUILDER
   -------------------------------------------------------------------------- */
function initCommissionForm() {
  const form = document.getElementById('commissionForm');
  const pills = document.querySelectorAll('.typology-pill-btn');
  const banner = document.getElementById('formSuccessBanner');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit-commission');
    const originalText = btn.textContent;
    btn.textContent = 'TRANSMITTING INQUIRY...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (banner) {
        banner.classList.add('active');
      }
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   9. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   10. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
