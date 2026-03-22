/* ===== BNI HK Platform - Product Categories Feature ===== */
/* Version: 1.0 */
/* Adds product category browsing with keyword-based auto-detection */

(function() {

  // ===== CATEGORY DEFINITIONS =====
  const CATEGORIES = [
    {
      id: 'skincare',
      label: '護膚美妝',
      labelEn: 'Skincare & Beauty',
      icon: '✨',
      keywords: ['護膚', '美妝', 'skincare', 'serum', 'essence', 'cream', 'lotion', 'foundation',
        '乳液', '精華', '面霜', '眼霜', 'moisturizer', 'toner', 'cleanser', '潔面', '爽膚',
        'YSL', 'CHANEL', 'Dior', 'Lancome', 'Clinique', 'Estee', 'Shiseido', 'SK-II',
        'Cle de Peau', 'CLE DE PEAU', 'Cellcosmet', 'SENSAI', 'La Prairie',
        'Vita Green', 'probiotic', '益生菌', '底液', '氣墊', 'cushion'
      ]
    },
    {
      id: 'perfume',
      label: '香水',
      labelEn: 'Fragrance',
      icon: '🌸',
      keywords: ['香水', 'perfume', 'fragrance', 'eau de', 'EDP', 'EDT', 'parfum', 'cologne',
        '淡香', '濃香', '止汗', 'deodorant', 'spray', 'mist',
        'HERMES', 'GUCCI', 'CREED', 'BVLGARI', "PENHALIGON'S", 'PENHALIGON',
        'Valentino', 'Chanel', 'Dior', 'YSL', 'Jo Malone', 'Prada'
      ]
    },
    {
      id: 'toys',
      label: '玩具公仔',
      labelEn: 'Toys & Collectibles',
      icon: '🧸',
      keywords: ['玩具', '公仔', 'toy', 'figure', 'collectible', 'Disney', 'Britto', 'Mickey',
        'Minnie', 'Tigger', 'Eeyore', 'Simba', 'Alice', 'Enesco', 'Robosen',
        'PlayShifu', 'STEM', 'Marvel', '機械人', 'robot', 'Kodak', 'Charmera'
      ]
    },
    {
      id: 'health',
      label: '健康保健',
      labelEn: 'Health & Wellness',
      icon: '💊',
      keywords: ['健康', '保健', '維他命', 'vitamin', 'supplement', 'collagen', '膠原',
        '抗氧化', 'antioxidant', '魚油', 'omega', 'probiotic', '益生菌',
        'Vita Green', '健康之寶', 'wellness', 'organic', '有機'
      ]
    },
    {
      id: 'bodycare',
      label: '身體護理',
      labelEn: 'Body Care',
      icon: '🧴',
      keywords: ['body', 'lotion', 'body wash', '沐浴', '護手', 'hand cream', '身體乳',
        'shower', 'bath', '沐浴露', '潤膚', 'scrub', 'exfoliant'
      ]
    },
    {
      id: 'giftset',
      label: '禮盒套裝',
      labelEn: 'Gift Sets',
      icon: '🎁',
      keywords: ['禮盒', '套裝', 'gift set', 'gift', 'set', '禮品', '套裝', '禮品套裝',
        'value set', '限定', 'limited edition', '情人節', 'Valentine', 'Christmas'
      ]
    },
    {
      id: 'food',
      label: '食品飲料',
      labelEn: 'Food & Beverage',
      icon: '🍵',
      keywords: ['食品', '飲料', '茶', 'tea', 'coffee', '咖啡', '食物', 'food', 'beverage',
        '保健食品', '燕窩', 'bird nest', '蜂蜜', 'honey', '健康飲品'
      ]
    },
    {
      id: 'services',
      label: '服務優惠',
      labelEn: 'Services',
      icon: '🛎️',
      keywords: ['服務', 'service', 'IT', '維護', '諮詢', 'consulting', '療程', 'treatment',
        '瑜伽', 'yoga', '美容', 'salon', '法律', 'legal', '物業', 'property'
      ]
    },
    {
      id: 'other',
      label: '其他優惠',
      labelEn: 'Other Offers',
      icon: '🏷️',
      keywords: []
    }
  ];

  // ===== AUTO-DETECT CATEGORY FROM TITLE/DESC =====
  function detectCategory(title, desc) {
    const text = (title + ' ' + (desc || '')).toLowerCase();
    for (const cat of CATEGORIES) {
      if (cat.id === 'other') continue;
      for (const kw of cat.keywords) {
        if (text.includes(kw.toLowerCase())) {
          return cat.id;
        }
      }
    }
    return 'other';
  }

  // ===== BUILD CATEGORY NAV UI =====
  function buildCategoryNav() {
    const style = document.createElement('style');
    style.textContent = `
      .category-nav {
        padding: 16px 20px 8px;
        background: var(--color-surface, #fff);
        border-bottom: 1px solid var(--color-border, #eee);
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .category-nav::-webkit-scrollbar { display: none; }
      .category-nav-inner {
        display: inline-flex;
        gap: 8px;
        padding-bottom: 4px;
      }
      .cat-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1.5px solid var(--color-border, #ddd);
        background: var(--color-surface, #fff);
        color: var(--color-text-muted, #666);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.18s;
        flex-shrink: 0;
      }
      .cat-btn:hover {
        border-color: var(--color-primary, #01696f);
        color: var(--color-primary, #01696f);
        background: var(--color-primary-highlight, #cedcd8);
      }
      .cat-btn.active {
        background: var(--color-primary, #01696f);
        color: #fff;
        border-color: var(--color-primary, #01696f);
      }
      .cat-btn .cat-count {
        background: rgba(0,0,0,0.12);
        border-radius: 999px;
        padding: 1px 6px;
        font-size: 11px;
        font-weight: 600;
      }
      .cat-btn.active .cat-count {
        background: rgba(255,255,255,0.25);
      }
      .cat-section-title {
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-faint, #aaa);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 0 20px 6px;
        background: var(--color-surface, #fff);
      }
    `;
    document.head.appendChild(style);

    // Find insertion point: after filter section, before offers section
    const offersSection = document.getElementById('offers-section');
    if (!offersSection) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'categoryNavWrapper';

    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'cat-section-title';
    sectionTitle.textContent = '產品分類 / Categories';

    const nav = document.createElement('div');
    nav.className = 'category-nav';
    const inner = document.createElement('div');
    inner.className = 'category-nav-inner';
    nav.appendChild(inner);

    wrapper.appendChild(sectionTitle);
    wrapper.appendChild(nav);

    offersSection.parentNode.insertBefore(wrapper, offersSection);

    return inner;
  }

  // ===== COUNT OFFERS PER CATEGORY =====
  function countByCategory() {
    const counts = { all: 0 };
    CATEGORIES.forEach(c => { counts[c.id] = 0; });

    document.querySelectorAll('.offer-card').forEach(card => {
      const titleEl = card.querySelector('.offer-title') || card.querySelector('h3');
      const descEl = card.querySelector('.offer-desc') || card.querySelector('p');
      const title = titleEl ? titleEl.textContent : '';
      const desc = descEl ? descEl.textContent : '';
      const catId = detectCategory(title, desc);
      if (counts[catId] !== undefined) counts[catId]++;
      else counts['other']++;
      counts.all++;
    });

    return counts;
  }

  // ===== TAG EACH CARD WITH CATEGORY =====
  function tagCards() {
    document.querySelectorAll('.offer-card').forEach(card => {
      if (card.dataset.category) return; // already tagged
      const titleEl = card.querySelector('.offer-title') || card.querySelector('h3');
      const descEl = card.querySelector('.offer-desc') || card.querySelector('p');
      const title = titleEl ? titleEl.textContent : '';
      const desc = descEl ? descEl.textContent : '';
      card.dataset.category = detectCategory(title, desc);
    });
  }

  // ===== FILTER BY CATEGORY =====
  let activeCategory = 'all';

  function filterByCategory(catId) {
    activeCategory = catId;

    // Update button states
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === catId);
    });

    // Show/hide cards
    document.querySelectorAll('.offer-card').forEach(card => {
      if (catId === 'all') {
        card.style.display = '';
      } else {
        card.style.display = card.dataset.category === catId ? '' : 'none';
      }
    });

    // Update offers count text
    const countEl = document.getElementById('offers-count');
    if (countEl) {
      const visible = catId === 'all'
        ? document.querySelectorAll('.offer-card').length
        : document.querySelectorAll(`.offer-card[data-category="${catId}"]`).length;
      countEl.textContent = `共 ${visible} 個優惠`;
    }
  }

  // ===== RENDER CATEGORY BUTTONS =====
  function renderCategoryButtons(inner) {
    const counts = countByCategory();

    // "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'cat-btn active';
    allBtn.dataset.cat = 'all';
    allBtn.innerHTML = `全部 <span class="cat-count">${counts.all}</span>`;
    allBtn.onclick = () => filterByCategory('all');
    inner.appendChild(allBtn);

    // Category buttons (only if count > 0)
    CATEGORIES.forEach(cat => {
      if (!counts[cat.id]) return; // skip empty categories
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.dataset.cat = cat.id;
      btn.title = cat.labelEn;
      btn.innerHTML = `${cat.icon} ${cat.label} <span class="cat-count">${counts[cat.id]}</span>`;
      btn.onclick = () => filterByCategory(cat.id);
      inner.appendChild(btn);
    });
  }

  // ===== INIT =====
  function init() {
    const cards = document.querySelectorAll('.offer-card');
    if (cards.length === 0) {
      // Cards not yet rendered; retry
      setTimeout(init, 800);
      return;
    }

    tagCards();
    const inner = buildCategoryNav();
    if (inner) renderCategoryButtons(inner);

    // Re-tag and re-count when new cards might load (e.g. after GSheet import)
    const observer = new MutationObserver(() => {
      tagCards();
      // Refresh counts on existing buttons
      const counts = countByCategory();
      document.querySelectorAll('.cat-btn').forEach(btn => {
        const catId = btn.dataset.cat;
        const countSpan = btn.querySelector('.cat-count');
        if (countSpan && counts[catId] !== undefined) {
          countSpan.textContent = counts[catId];
        }
      });
      // Apply current filter to any new cards
      if (activeCategory !== 'all') {
        filterByCategory(activeCategory);
      }
    });

    const grid = document.getElementById('offersGrid') ||
                 document.querySelector('.offers-grid');
    if (grid) {
      observer.observe(grid, { childList: true, subtree: false });
    }
  }

  // Wait for DOM + offers to render
  setTimeout(init, 1500);

})();
