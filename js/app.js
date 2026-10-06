/**
 * SHU.HA.RI ARCHITECTURE STUDIO
 * Interactive Core Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initPhilosophySwitcher();
  initPortfolioFilters();
  initProjectModal();
  initMaterialityArchive();
  initCommissionForm();
  initMobileNav();
  initSmoothScroll();
  console.log('shu.ha.ri architecture studio engine loaded successfully.');
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (Linen vs Nocturne)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  // Retrieve saved preference or default to light
  const savedTheme = localStorage.getItem('shuhari-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('shuhari-theme', next);
  });
}

/* --------------------------------------------------------------------------
   2. HEADER SCROLL STATE
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   3. PHILOSOPHY INTERACTIVE SWITCHER (守・破・離)
   -------------------------------------------------------------------------- */
function initPhilosophySwitcher() {
  const pills = document.querySelectorAll('.stage-pill');
  const cards = document.querySelectorAll('.philo-card');

  pills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const stage = pill.getAttribute('data-stage');
      
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      cards.forEach((card) => {
        if (card.getAttribute('data-stage') === stage) {
          card.classList.add('highlight');
          card.style.transform = 'translateY(-8px)';
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('highlight');
          card.style.transform = '';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT DOSSIER MODAL / LIGHTBOX
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  'prj-solis': {
    title: 'Villa Solis & Colonnade',
    tag: 'Private Residence & Colonnade',
    location: 'Kerala Coastal Cliffside',
    year: '2025',
    area: '920 m²',
    materials: 'Unfilled Roman Travertine, Fair-Faced Concrete, Low-Iron Glass',
    leadArchitect: 'Abin Thomas / shu.ha.ri',
    image: 'assets/images/hero_villa.jpg',
    description: 'A monolithic private villa sculpted into the natural landscape. Villa Solis juxtaposes classical arched colonnade architecture with daring cantilevered structural engineering. The central infinity pool extends 14 meters over the volcanic stone foundation without visible structural pillars, dissolving the boundary between human refuge and the horizon.',
    quote: 'Architecture at the precipice of earth and sky—mastering the weight of stone to frame weightlessness.'
  },
  'prj-courtyard': {
    title: 'The Zen Courtyard House',
    tag: 'Courtyard Villa & Waterway',
    location: 'Calicut Outskirts / Serene Sanctuary',
    year: '2024',
    area: '780 m²',
    materials: 'Unfilled Travertine, Hand-Chiseled Stone, Indigenous Flora',
    leadArchitect: 'Abin Thomas / shu.ha.ri',
    image: 'assets/images/courtyard_aerial.jpg',
    description: 'Designed around an austere central quadrangle, this residence blends tropical courtyard ventilation with traditional minimalist pavilions. An illuminated arched arcade shields the private quarters while a 25-meter azure lap pool reflects the shifting Kerala monsoon sky throughout the solar cycle.',
    quote: 'A sanctuary turned inward, orchestrating shadow, stone, and the tranquil sound of water.'
  },
  'prj-twilight': {
    title: 'Monolith at Twilight',
    tag: 'Linear Pavilion & Open Fields',
    location: 'Highland Foothills, Kerala',
    year: '2026',
    area: '640 m²',
    materials: 'Board-Formed Concrete, Smoked Dark Oak, Basalt Hearth',
    leadArchitect: 'Abin Thomas / shu.ha.ri',
    image: 'assets/images/exterior_twilight.jpg',
    description: 'An elongated, low-profile horizontal monolith that defers completely to the vast open green landscape. Floor-to-ceiling glass pavilions emit warm amber illumination against the dark silhouette of the tropical hills. Featuring a sunken outdoor basalt stone fire lounge and silent black mirror pool.',
    quote: 'Pure horizontality that quietly anchors itself within the topography.'
  },
  'prj-shadows': {
    title: 'Pavilion of Shadows & Oak',
    tag: 'Interior Architecture & Louvers',
    location: 'Wayanad Forest Edge',
    year: '2025',
    area: '510 m²',
    materials: 'White Oak Slats, Natural Lime-Wash Plaster, Cast Concrete',
    leadArchitect: 'Abin Thomas / shu.ha.ri',
    image: 'assets/images/interior_shadows.jpg',
    description: 'An exercise in delicate wabi-sabi aesthetics and natural light choreography. Wooden ceiling louvers filter sunlight into dancing botanical silhouettes across hand-troweled lime-wash plaster. A sunken lounge floor with recessed floor illumination fosters deep stillness.',
    quote: 'Space that is not merely built, but tuned like an acoustic instrument for daylight and shadow.'
  },
  'prj-tectonics': {
    title: 'Tectonic Materiality Study',
    tag: 'Material Laboratory & Joinery',
    location: 'Chevarambalam Atelier, Calicut',
    year: '2024',
    area: 'Detail Craft',
    materials: 'Unfilled Roman Travertine, Board-Formed Concrete, Blackened Steel',
    leadArchitect: 'Abin Thomas / shu.ha.ri',
    image: 'assets/images/material_detail.jpg',
    description: 'The essence of Shu (守): returning to material truth. Here, board-formed concrete retaining its natural wood grain meets porous Roman travertine through an unadorned blackened steel reveal. No decorative trims or disguises—only precision tolerances down to the millimeter.',
    quote: 'Down to the final stone—every joint reflects intentionality and mastery.'
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
    document.getElementById('modalProjectQuote').textContent = '"' + data.quote + '"';
    document.getElementById('modalProjectImg').src = data.image;
    document.getElementById('modalProjectImg').alt = data.title;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.getAttribute('data-project-id');
      openProject(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeProject();
    });
  }

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
   6. MATERIALITY ARCHIVE
   -------------------------------------------------------------------------- */
const MATERIALS_DATABASE = {
  'travertine': {
    name: 'Unfilled Roman Travertine',
    provenance: 'Tivoli Quarries / Architectural Masonry',
    desc: 'Warm, porous limestone cut along the vein. Its tactile micro-cavities celebrate organic geologic time while providing cool thermal mass in tropical climates.',
    image: 'assets/images/material_detail.jpg'
  },
  'concrete': {
    name: 'Board-Formed Architectural Concrete',
    provenance: 'Artisanal Cedar Grain Formwork',
    desc: 'Poured in-situ with natural rough-sawn cedar grain left permanently imprinted into the cementitious matrix. Honesty of mass, weathering gracefully across decades.',
    image: 'assets/images/material_detail.jpg'
  },
  'oak': {
    name: 'Natural White Oak Louvers',
    provenance: 'Precision-Milled Structural Timber',
    desc: 'Engineered for solar shading and acoustic dampening, casting poetic linear shadows across interior sanctuaries.',
    image: 'assets/images/interior_shadows.jpg'
  },
  'stone': {
    name: 'Hand-Dry-Stacked Basalt Rock',
    provenance: 'Regional Bedrock & Quarry Stone',
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

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const matKey = card.getAttribute('data-material');
      const data = MATERIALS_DATABASE[matKey];
      if (!data) return;

      cards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');

      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.image;
          if (nameEl) nameEl.textContent = data.name;
          if (provEl) provEl.textContent = data.provenance;
          if (descEl) descEl.textContent = data.desc;
          imgEl.style.opacity = '1';
        }, 180);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. COMMISSION INQUIRY BUILDER
   -------------------------------------------------------------------------- */
function initCommissionForm() {
  const form = document.getElementById('commissionForm');
  const pills = document.querySelectorAll('.typology-pill-btn');
  const banner = document.getElementById('formSuccessBanner');

  pills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      pills.forEach((p) => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit-commission');
    if (btn) {
      btn.textContent = 'TRANSMITTING INQUIRY...';
      btn.disabled = true;
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (banner) {
        banner.classList.add('active');
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   8. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   9. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
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
