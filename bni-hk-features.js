/* ===== BNI HK Platform - Enhanced Features (HKTVmall Inspired) ===== */
/* Version: 1.0 */

document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. SEARCH BAR =====
  (function initSearchBar() {
    const style = document.createElement('style');
    style.textContent = `
      .search-container { position:sticky; top:60px; z-index:100; background:#fff; padding:10px 20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); display:flex; gap:10px; align-items:center; }
      .search-container input { flex:1; padding:10px 16px; border:2px solid #e0e0e0; border-radius:25px; font-size:15px; outline:none; transition:border-color .3s; }
      .search-container input:focus { border-color:#cc0000; }
      .search-container button { background:#cc0000; color:#fff; border:none; padding:10px 20px; border-radius:25px; cursor:pointer; font-size:15px; }
      .search-container button:hover { background:#a00; }
      .search-suggestions { position:absolute; top:100%; left:20px; right:20px; background:#fff; border:1px solid #ddd; border-radius:8px; max-height:300px; overflow-y:auto; display:none; z-index:101; }
      .search-suggestions .suggestion-item { padding:10px 16px; cursor:pointer; border-bottom:1px solid #f0f0f0; }
      .search-suggestions .suggestion-item:hover { background:#f5f5f5; }
      .search-no-results { text-align:center; padding:40px; color:#999; font-size:16px; }
    `;
    document.head.appendChild(style);

    const nav = document.querySelector('.navbar') || document.querySelector('nav');
    const offersSection = document.getElementById('offers-section');
    if (offersSection) {
      const searchDiv = document.createElement('div');
      searchDiv.className = 'search-container';
      searchDiv.innerHTML = `<input type="text" id="searchInput" placeholder="\u641c\u5c0b\u512a\u60e0 / Search offers..." /><button onclick="performSearch()"><i data-lucide="search" style="width:16px;height:16px"></i> \u641c\u5c0b</button><div class="search-suggestions" id="searchSuggestions"></div>`;
      offersSection.parentNode.insertBefore(searchDiv, offersSection);

      const searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.offer-card');
        let visibleCount = 0;
        if (query.length === 0) {
          cards.forEach(c => { c.style.display = ''; }); document.getElementById('searchSuggestions').style.display='none';
          const nr = document.querySelector('.search-no-results'); if(nr) nr.remove();
          return;
        }
        cards.forEach(c => {
          const text = c.textContent.toLowerCase();
          if (text.includes(query)) { c.style.display = ''; visibleCount++; } else { c.style.display = 'none'; }
        });
        const existingNr = document.querySelector('.search-no-results');
        if (visibleCount === 0 && !existingNr) {
          const nr = document.createElement('div'); nr.className='search-no-results'; nr.textContent='\u627e\u4e0d\u5230\u7d50\u679c / No results found'; offersSection.appendChild(nr);
        } else if (visibleCount > 0 && existingNr) { existingNr.remove(); }
      });
      searchInput.addEventListener('keypress', function(e) { if(e.key==='Enter') performSearch(); });
    }
    window.performSearch = function() {
      const input = document.getElementById('searchInput');
      if(input) input.dispatchEvent(new Event('input'));
    };
  })();

  // ===== 2. SHOPPING CART =====
  (function initCart() {
    const cartStyle = document.createElement('style');
    cartStyle.textContent = `
      .cart-fab { position:fixed; bottom:80px; right:20px; background:#cc0000; color:#fff; width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3); z-index:1000; font-size:24px; transition:transform .2s; }
      .cart-fab:hover { transform:scale(1.1); }
      .cart-badge { position:absolute; top:-4px; right:-4px; background:#ff6600; color:#fff; border-radius:50%; width:22px; height:22px; font-size:12px; display:flex; align-items:center; justify-content:center; font-weight:bold; }
      .cart-panel { position:fixed; top:0; right:-400px; width:380px; height:100vh; background:#fff; box-shadow:-4px 0 20px rgba(0,0,0,0.2); z-index:10001; transition:right .3s; overflow-y:auto; }
      .cart-panel.open { right:0; }
      .cart-panel-header { background:#cc0000; color:#fff; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; font-size:18px; font-weight:bold; }
      .cart-panel-close { background:none; border:none; color:#fff; font-size:24px; cursor:pointer; }
      .cart-item { display:flex; gap:12px; padding:12px 16px; border-bottom:1px solid #eee; align-items:center; }
      .cart-item img { width:60px; height:60px; object-fit:cover; border-radius:8px; }
      .cart-item-info { flex:1; }
      .cart-item-title { font-size:14px; font-weight:600; margin-bottom:4px; }
      .cart-item-price { color:#cc0000; font-weight:bold; }
      .cart-item-remove { background:none; border:none; color:#999; cursor:pointer; font-size:18px; }
      .cart-item-qty { display:flex; align-items:center; gap:8px; margin-top:4px; }
      .cart-item-qty button { width:24px; height:24px; border:1px solid #ddd; background:#f5f5f5; border-radius:4px; cursor:pointer; font-size:14px; }
      .cart-empty { text-align:center; padding:60px 20px; color:#999; }
      .cart-footer { padding:16px; border-top:2px solid #eee; }
      .cart-total { font-size:18px; font-weight:bold; margin-bottom:12px; display:flex; justify-content:space-between; }
      .cart-checkout-btn { width:100%; padding:12px; background:#cc0000; color:#fff; border:none; border-radius:8px; font-size:16px; font-weight:bold; cursor:pointer; }
      .cart-checkout-btn:hover { background:#a00; }
      .cart-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10000; display:none; }
      .cart-overlay.open { display:block; }
      .add-to-cart-btn { background:#cc0000; color:#fff; border:none; padding:8px 16px; border-radius:20px; cursor:pointer; font-size:13px; margin-top:8px; display:inline-flex; align-items:center; gap:4px; }
      .add-to-cart-btn:hover { background:#a00; }
      .add-to-cart-toast { position:fixed; bottom:150px; right:20px; background:#333; color:#fff; padding:12px 20px; border-radius:8px; z-index:10002; display:none; font-size:14px; }
    `;
    document.head.appendChild(cartStyle);

    window.bniCart = JSON.parse(localStorage.getItem('bniCart') || '[]');

    // Cart FAB
    const fab = document.createElement('div');
    fab.className = 'cart-fab';
    fab.innerHTML = '<span>\ud83d\uded2</span><span class="cart-badge" id="cartBadge">0</span>';
    fab.onclick = () => toggleCart();
    document.body.appendChild(fab);

    // Cart overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';
    overlay.onclick = () => toggleCart();
    document.body.appendChild(overlay);

    // Cart panel
    const panel = document.createElement('div');
    panel.className = 'cart-panel';
    panel.id = 'cartPanel';
    panel.innerHTML = `<div class="cart-panel-header"><span>\ud83d\uded2 \u8cfc\u7269\u8eca / Cart</span><button class="cart-panel-close" onclick="toggleCart()">&times;</button></div><div id="cartItems"></div><div class="cart-footer"><div class="cart-total"><span>\u7e3d\u8a08 / Total:</span><span id="cartTotal">$0</span></div><button class="cart-checkout-btn" onclick="cartCheckout()">\u7d50\u8cec / Checkout</button></div>`;
    document.body.appendChild(panel);

    // Toast
    const toast = document.createElement('div');
    toast.className = 'add-to-cart-toast';
    toast.id = 'cartToast';
    document.body.appendChild(toast);

    window.toggleCart = function() {
      const p = document.getElementById('cartPanel');
      const o = document.getElementById('cartOverlay');
      p.classList.toggle('open');
      o.classList.toggle('open');
      if (p.classList.contains('open')) renderCart();
    };

    window.addToCart = function(title, price, img) {
      const existing = window.bniCart.find(i => i.title === title);
      if (existing) { existing.qty++; } else { window.bniCart.push({ title, price, img, qty: 1 }); }
      localStorage.setItem('bniCart', JSON.stringify(window.bniCart));
      updateCartBadge();
      showCartToast('\u5df2\u52a0\u5165\u8cfc\u7269\u8eca / Added to cart');
    };

    window.removeFromCart = function(idx) {
      window.bniCart.splice(idx, 1);
      localStorage.setItem('bniCart', JSON.stringify(window.bniCart));
      updateCartBadge(); renderCart();
    };

    window.updateCartQty = function(idx, delta) {
      window.bniCart[idx].qty += delta;
      if (window.bniCart[idx].qty <= 0) window.bniCart.splice(idx, 1);
      localStorage.setItem('bniCart', JSON.stringify(window.bniCart));
      updateCartBadge(); renderCart();
    };

    function renderCart() {
      const container = document.getElementById('cartItems');
      if (window.bniCart.length === 0) {
        container.innerHTML = '<div class="cart-empty">\ud83d\uded2 \u8cfc\u7269\u8eca\u662f\u7a7a\u7684 / Cart is empty</div>';
        document.getElementById('cartTotal').textContent = '$0';
        return;
      }
      let html = '', total = 0;
      window.bniCart.forEach((item, i) => {
        const itemTotal = item.price * item.qty; total += itemTotal;
        html += `<div class="cart-item"><img src="${item.img||''}" onerror="this.style.display='none'"/><div class="cart-item-info"><div class="cart-item-title">${item.title}</div><div class="cart-item-price">$${item.price}</div><div class="cart-item-qty"><button onclick="updateCartQty(${i},-1)">-</button><span>${item.qty}</span><button onclick="updateCartQty(${i},1)">+</button></div></div><button class="cart-item-remove" onclick="removeFromCart(${i})">&times;</button></div>`;
      });
      container.innerHTML = html;
      document.getElementById('cartTotal').textContent = '$' + total.toFixed(0);
    }

    function updateCartBadge() {
      const count = window.bniCart.reduce((s, i) => s + i.qty, 0);
      document.getElementById('cartBadge').textContent = count;
    }

    function showCartToast(msg) {
      const t = document.getElementById('cartToast');
      t.textContent = msg; t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 2000);
    }

    window.cartCheckout = function() {
      if (window.bniCart.length === 0) return alert('\u8cfc\u7269\u8eca\u662f\u7a7a\u7684 / Cart is empty');
      const currentUser = typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser;
      if (!currentUser) return alert('\u8acb\u5148\u767b\u5165 / Please login first');
      alert('\u8a02\u55ae\u5df2\u63d0\u4ea4\uff01\u8ce3\u5bb6\u6703\u806f\u7d61\u60a8\u3002/ Order submitted! Seller will contact you.');
      window.bniCart = []; localStorage.setItem('bniCart', '[]'); updateCartBadge(); renderCart(); toggleCart();
    };

    // Add "Add to Cart" buttons to offer cards
    setTimeout(() => {
      document.querySelectorAll('.offer-card').forEach(card => {
        if (card.querySelector('.add-to-cart-btn')) return;
        const title = (card.querySelector('.offer-title') || card.querySelector('h3') || {}).textContent || 'Item';
        const priceEl = card.querySelector('.offer-price') || card.querySelector('.price');
        let price = 0;
        if (priceEl) { const m = priceEl.textContent.match(/[\d,.]+/); if (m) price = parseFloat(m[0].replace(',','')); }
        const imgEl = card.querySelector('img');
        const img = imgEl ? imgEl.src : '';
        const btn = document.createElement('button');
        btn.className = 'add-to-cart-btn';
        btn.innerHTML = '\ud83d\uded2 \u52a0\u5165\u8cfc\u7269\u8eca';
        btn.onclick = (e) => { e.stopPropagation(); e.preventDefault(); addToCart(title, price, img); };
        const actions = card.querySelector('.offer-actions') || card.querySelector('.card-body') || card;
        actions.appendChild(btn);
      });
    }, 2000);

    updateCartBadge();
  })();

  // ===== 3. PRODUCT SORTING =====
  (function initSorting() {
    const sortStyle = document.createElement('style');
    sortStyle.textContent = `
      .sort-bar { display:flex; align-items:center; gap:12px; padding:10px 20px; background:#f9f9f9; border-bottom:1px solid #eee; flex-wrap:wrap; }
      .sort-bar label { font-weight:600; font-size:14px; color:#333; }
      .sort-bar select { padding:8px 12px; border:1px solid #ddd; border-radius:8px; font-size:14px; background:#fff; cursor:pointer; }
      .sort-bar .results-count { margin-left:auto; font-size:13px; color:#666; }
    `;
    document.head.appendChild(sortStyle);

    const offersSection = document.getElementById('offers-section');
    if (!offersSection) return;

    const sortBar = document.createElement('div');
    sortBar.className = 'sort-bar';
    sortBar.innerHTML = `<label>\u6392\u5e8f / Sort:</label><select id="sortSelect"><option value="default">\u9810\u8a2d / Default</option><option value="price-asc">\u50f9\u683c\u7531\u4f4e\u5230\u9ad8 / Price Low-High</option><option value="price-desc">\u50f9\u683c\u7531\u9ad8\u5230\u4f4e / Price High-Low</option><option value="name-asc">\u540d\u7a31 A-Z</option><option value="rating-desc">\u8a55\u5206\u6700\u9ad8 / Top Rated</option></select><span class="results-count" id="sortCount"></span>`;
    offersSection.insertBefore(sortBar, offersSection.firstChild);

    document.getElementById('sortSelect').addEventListener('change', function() {
      const val = this.value;
      const grid = offersSection.querySelector('.offers-grid') || offersSection.querySelector('.cards-grid') || offersSection;
      const cards = Array.from(grid.querySelectorAll('.offer-card'));
      if (cards.length === 0) return;

      cards.sort((a, b) => {
        if (val === 'price-asc' || val === 'price-desc') {
          const getPrice = el => { const m = el.textContent.match(/\$([\d,]+)/); return m ? parseFloat(m[1].replace(',','')) : 0; };
          return val === 'price-asc' ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a);
        }
        if (val === 'name-asc') {
          const getTitle = el => (el.querySelector('.offer-title')||el.querySelector('h3')||{textContent:''}).textContent;
          return getTitle(a).localeCompare(getTitle(b));
        }
        if (val === 'rating-desc') {
          const getRating = el => parseFloat((el.querySelector('.rating-avg')||{textContent:'0'}).textContent) || 0;
          return getRating(b) - getRating(a);
        }
        return 0;
      });

      cards.forEach(c => grid.appendChild(c));
      document.getElementById('sortCount').textContent = cards.length + ' \u500b\u512a\u60e0 / offers';
    });

    setTimeout(() => {
      const cards = offersSection.querySelectorAll('.offer-card');
      const countEl = document.getElementById('sortCount');
      if (countEl) countEl.textContent = cards.length + ' \u500b\u512a\u60e0 / offers';
    }, 1500);
  })();

  // ===== 4. WISHLIST =====
  (function initWishlist() {
    const wStyle = document.createElement('style');
    wStyle.textContent = `
      .wishlist-btn { background:none; border:none; font-size:22px; cursor:pointer; position:absolute; top:10px; right:10px; z-index:10; transition:transform .2s; }
      .wishlist-btn:hover { transform:scale(1.3); }
      .wishlist-btn.active { color:#cc0000; }
      .offer-card { position:relative; }
      .wishlist-panel { position:fixed; top:0; left:-400px; width:380px; height:100vh; background:#fff; box-shadow:4px 0 20px rgba(0,0,0,0.2); z-index:10001; transition:left .3s; overflow-y:auto; }
      .wishlist-panel.open { left:0; }
      .wishlist-panel-header { background:#cc0000; color:#fff; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; font-size:18px; font-weight:bold; }
      .wishlist-panel-close { background:none; border:none; color:#fff; font-size:24px; cursor:pointer; }
      .wishlist-empty { text-align:center; padding:60px 20px; color:#999; font-size:16px; }
      .wishlist-item { display:flex; gap:12px; padding:12px 16px; border-bottom:1px solid #eee; }
      .wishlist-item img { width:60px; height:60px; object-fit:cover; border-radius:8px; }
      .wishlist-item-info { flex:1; }
      .wishlist-item-title { font-weight:600; font-size:14px; margin-bottom:4px; }
      .wishlist-item-remove { background:none; border:none; color:#999; cursor:pointer; font-size:18px; }
      .wishlist-fab { position:fixed; bottom:150px; right:20px; background:#fff; color:#cc0000; width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.2); z-index:999; font-size:24px; border:2px solid #cc0000; }
      .wishlist-badge { position:absolute; top:-4px; right:-4px; background:#cc0000; color:#fff; border-radius:50%; width:20px; height:20px; font-size:11px; display:flex; align-items:center; justify-content:center; font-weight:bold; }
    `;
    document.head.appendChild(wStyle);

    window.bniWishlist = JSON.parse(localStorage.getItem('bniWishlist') || '[]');

    // Wishlist FAB
    const wFab = document.createElement('div');
    wFab.className = 'wishlist-fab';
    wFab.innerHTML = '\u2665<span class="wishlist-badge" id="wishlistBadge">0</span>';
    wFab.onclick = () => toggleWishlist();
    document.body.appendChild(wFab);

    // Wishlist panel
    const wPanel = document.createElement('div');
    wPanel.className = 'wishlist-panel';
    wPanel.id = 'wishlistPanel';
    wPanel.innerHTML = `<div class="wishlist-panel-header"><span>\u2665 \u6211\u7684\u5fc3\u9858\u6e05\u55ae / My Wishlist</span><button class="wishlist-panel-close" onclick="toggleWishlist()">&times;</button></div><div id="wishlistItems"></div>`;
    document.body.appendChild(wPanel);

    window.toggleWishlist = function() {
      document.getElementById('wishlistPanel').classList.toggle('open');
      if (document.getElementById('wishlistPanel').classList.contains('open')) renderWishlist();
    };

    window.toggleWishlistItem = function(title, img, btn) {
      const idx = window.bniWishlist.findIndex(i => i.title === title);
      if (idx >= 0) {
        window.bniWishlist.splice(idx, 1);
        if (btn) { btn.textContent = '\u2661'; btn.classList.remove('active'); }
      } else {
        window.bniWishlist.push({ title, img });
        if (btn) { btn.textContent = '\u2665'; btn.classList.add('active'); }
      }
      localStorage.setItem('bniWishlist', JSON.stringify(window.bniWishlist));
      updateWishlistBadge();
    };

    window.removeFromWishlist = function(idx) {
      window.bniWishlist.splice(idx, 1);
      localStorage.setItem('bniWishlist', JSON.stringify(window.bniWishlist));
      updateWishlistBadge(); renderWishlist();
    };

    function renderWishlist() {
      const container = document.getElementById('wishlistItems');
      if (window.bniWishlist.length === 0) { container.innerHTML = '<div class="wishlist-empty">\u2661 \u6c92\u6709\u5fc3\u9858\u5546\u54c1 / No saved items</div>'; return; }
      let html = '';
      window.bniWishlist.forEach((item, i) => {
        html += `<div class="wishlist-item"><img src="${item.img||''}" onerror="this.style.display='none'"/><div class="wishlist-item-info"><div class="wishlist-item-title">${item.title}</div></div><button class="wishlist-item-remove" onclick="removeFromWishlist(${i})">&times;</button></div>`;
      });
      container.innerHTML = html;
    }

    function updateWishlistBadge() {
      document.getElementById('wishlistBadge').textContent = window.bniWishlist.length;
    }

    // Add heart buttons to offer cards
    setTimeout(() => {
      document.querySelectorAll('.offer-card').forEach(card => {
        if (card.querySelector('.wishlist-btn')) return;
        const title = (card.querySelector('.offer-title') || card.querySelector('h3') || {textContent:'Item'}).textContent;
        const imgEl = card.querySelector('img');
        const img = imgEl ? imgEl.src : '';
        const isInList = window.bniWishlist.some(i => i.title === title);
        const btn = document.createElement('button');
        btn.className = 'wishlist-btn' + (isInList ? ' active' : '');
        btn.textContent = isInList ? '\u2665' : '\u2661';
        btn.title = '\u52a0\u5165\u5fc3\u9858\u6e05\u55ae / Add to Wishlist';
        btn.onclick = (e) => { e.stopPropagation(); e.preventDefault(); toggleWishlistItem(title, img, btn); };
        card.appendChild(btn);
      });
    }, 2000);

    updateWishlistBadge();
  })();

  // ===== 5. RECENTLY VIEWED =====
  (function initRecentlyViewed() {
    const rvStyle = document.createElement('style');
    rvStyle.textContent = `
      .recently-viewed { padding:30px 20px; background:#f9f9f9; border-top:2px solid #eee; }
      .recently-viewed h3 { font-size:20px; font-weight:700; margin-bottom:16px; color:#333; }
      .rv-scroll { display:flex; gap:16px; overflow-x:auto; padding-bottom:10px; }
      .rv-scroll::-webkit-scrollbar { height:4px; }
      .rv-scroll::-webkit-scrollbar-thumb { background:#ddd; border-radius:2px; }
      .rv-card { min-width:160px; max-width:160px; background:#fff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1); overflow:hidden; cursor:pointer; transition:transform .2s; }
      .rv-card:hover { transform:translateY(-4px); }
      .rv-card img { width:100%; height:100px; object-fit:cover; }
      .rv-card-info { padding:8px 10px; }
      .rv-card-title { font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .rv-card-price { font-size:13px; color:#cc0000; font-weight:bold; margin-top:2px; }
    `;
    document.head.appendChild(rvStyle);

    window.bniRecentlyViewed = JSON.parse(localStorage.getItem('bniRecentlyViewed') || '[]');

    window.trackRecentlyViewed = function(title, img, price) {
      const existing = window.bniRecentlyViewed.findIndex(i => i.title === title);
      if (existing >= 0) window.bniRecentlyViewed.splice(existing, 1);
      window.bniRecentlyViewed.unshift({ title, img, price });
      if (window.bniRecentlyViewed.length > 12) window.bniRecentlyViewed.pop();
      localStorage.setItem('bniRecentlyViewed', JSON.stringify(window.bniRecentlyViewed));
    };

    function renderRecentlyViewed() {
      if (window.bniRecentlyViewed.length === 0) return;
      const section = document.getElementById('offers-section');
      if (!section) return;
      let existing = document.getElementById('recentlyViewedSection');
      if (!existing) {
        existing = document.createElement('div');
        existing.id = 'recentlyViewedSection';
        existing.className = 'recently-viewed';
        section.parentNode.insertBefore(existing, section.nextSibling);
      }
      let html = '<h3>\u6700\u8fd1\u700f\u89bd / Recently Viewed</h3><div class="rv-scroll">';
      window.bniRecentlyViewed.forEach(item => {
        html += `<div class="rv-card"><img src="${item.img||''}" onerror="this.style.background='#f0f0f0';this.style.display='none'"/><div class="rv-card-info"><div class="rv-card-title">${item.title}</div><div class="rv-card-price">${item.price ? '$'+item.price : ''}</div></div></div>`;
      });
      html += '</div>';
      existing.innerHTML = html;
    }

    // Track card views
    setTimeout(() => {
      document.querySelectorAll('.offer-card').forEach(card => {
        card.addEventListener('click', function() {
          const title = (this.querySelector('.offer-title')||this.querySelector('h3')||{textContent:'Item'}).textContent;
          const imgEl = this.querySelector('img');
          const img = imgEl ? imgEl.src : '';
          const priceEl = this.querySelector('.offer-price')||this.querySelector('.price');
          let price = '';
          if (priceEl) { const m = priceEl.textContent.match(/[\d,.]+/); if (m) price = m[0]; }
          trackRecentlyViewed(title, img, price);
        });
      });
      renderRecentlyViewed();
    }, 2000);
  })();

  // ===== 6. SELLER RATINGS =====
  (function initSellerRatings() {
    const rStyle = document.createElement('style');
    rStyle.textContent = `
      .seller-rating { display:flex; align-items:center; gap:6px; margin-top:6px; }
      .stars-display { color:#ffaa00; font-size:16px; letter-spacing:2px; }
      .rating-avg { font-weight:bold; font-size:14px; color:#333; }
      .rating-count { font-size:12px; color:#999; }
      .rate-btn { background:#fff; border:1px solid #cc0000; color:#cc0000; padding:4px 10px; border-radius:12px; font-size:12px; cursor:pointer; margin-left:6px; }
      .rate-btn:hover { background:#cc0000; color:#fff; }
      .rating-modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:20000; display:none; align-items:center; justify-content:center; }
      .rating-modal-overlay.open { display:flex; }
      .rating-modal { background:#fff; border-radius:16px; padding:30px; width:340px; text-align:center; box-shadow:0 8px 32px rgba(0,0,0,0.3); }
      .rating-modal h3 { margin-bottom:16px; font-size:20px; color:#333; }
      .rating-stars-input { display:flex; gap:8px; justify-content:center; margin-bottom:20px; }
      .rating-stars-input span { font-size:36px; cursor:pointer; color:#ddd; transition:color .1s; }
      .rating-stars-input span.active, .rating-stars-input span:hover { color:#ffaa00; }
      .rating-comment { width:100%; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:14px; resize:none; margin-bottom:16px; }
      .rating-submit { background:#cc0000; color:#fff; border:none; padding:12px 30px; border-radius:8px; font-size:15px; cursor:pointer; margin-right:8px; }
      .rating-cancel { background:#f0f0f0; border:none; padding:12px 20px; border-radius:8px; font-size:15px; cursor:pointer; }
    `;
    document.head.appendChild(rStyle);

    // Rating modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'rating-modal-overlay';
    modalOverlay.id = 'ratingModalOverlay';
    modalOverlay.innerHTML = `<div class="rating-modal"><h3>\u7d66\u8ce3\u5bb6\u8a55\u5206 / Rate Seller</h3><div class="rating-stars-input" id="ratingStars"><span data-val="1">&#9733;</span><span data-val="2">&#9733;</span><span data-val="3">&#9733;</span><span data-val="4">&#9733;</span><span data-val="5">&#9733;</span></div><textarea class="rating-comment" id="ratingComment" rows="3" placeholder="\u60a8\u7684\u8a55\u8a9e / Your comment..."></textarea><input type="hidden" id="ratingTarget"/><button class="rating-submit" onclick="submitRating()">\u63d0\u4ea4 / Submit</button><button class="rating-cancel" onclick="closeRatingModal()">\u53d6\u6d88 / Cancel</button></div>`;
    document.body.appendChild(modalOverlay);

    let selectedRating = 0;
    const stars = modalOverlay.querySelectorAll('.rating-stars-input span');
    stars.forEach(star => {
      star.addEventListener('mouseenter', function() {
        const val = parseInt(this.dataset.val);
        stars.forEach((s, i) => s.classList.toggle('active', i < val));
      });
      star.addEventListener('click', function() { selectedRating = parseInt(this.dataset.val); });
      star.addEventListener('mouseleave', function() {
        stars.forEach((s, i) => s.classList.toggle('active', i < selectedRating));
      });
    });

    window.openRatingModal = function(sellerTitle) {
      document.getElementById('ratingTarget').value = sellerTitle;
      document.getElementById('ratingComment').value = '';
      selectedRating = 0;
      stars.forEach(s => s.classList.remove('active'));
      modalOverlay.classList.add('open');
    };

    window.closeRatingModal = function() { modalOverlay.classList.remove('open'); };

    window.submitRating = function() {
      if (selectedRating === 0) return alert('\u8acb\u9078\u64c7\u661f\u6578 / Please select rating');
      const target = document.getElementById('ratingTarget').value;
      const comment = document.getElementById('ratingComment').value;
      const ratings = JSON.parse(localStorage.getItem('bniRatings') || '{}');
      if (!ratings[target]) ratings[target] = [];
      ratings[target].push({ rating: selectedRating, comment, date: new Date().toISOString() });
      localStorage.setItem('bniRatings', JSON.stringify(ratings));
      closeRatingModal();
      refreshSellerRatings();
      alert('\u611f\u8b1d\u60a8\u7684\u8a55\u5206\uff01/ Thank you for your rating!');
    };

    function getAvgRating(title) {
      const ratings = JSON.parse(localStorage.getItem('bniRatings') || '{}');
      const arr = ratings[title] || [];
      if (arr.length === 0) return null;
      const avg = arr.reduce((s, r) => s + r.rating, 0) / arr.length;
      return { avg: avg.toFixed(1), count: arr.length };
    }

    function getStars(avg) {
      const full = Math.round(avg);
      return '\u2605'.repeat(full) + '\u2606'.repeat(5-full);
    }

    function refreshSellerRatings() {
      document.querySelectorAll('.offer-card').forEach(card => {
        const titleEl = card.querySelector('.offer-title') || card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent;
        const existing = card.querySelector('.seller-rating');
        if (existing) existing.remove();
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'seller-rating';
        const data = getAvgRating(title);
        if (data) {
          ratingDiv.innerHTML = `<span class="stars-display">${getStars(data.avg)}</span><span class="rating-avg">${data.avg}</span><span class="rating-count">(${data.count})</span><button class="rate-btn" onclick="openRatingModal('${title.replace(/'/g,"\\'")}')"\u8a55\u5206</button>`;
        } else {
          ratingDiv.innerHTML = `<span class="stars-display" style="color:#ddd">\u2606\u2606\u2606\u2606\u2606</span><button class="rate-btn" onclick="openRatingModal('${title.replace(/'/g,"\\'")}')"\u8a55\u5206</button>`;
        }
        const actions = card.querySelector('.offer-actions') || card.querySelector('.card-body') || card;
        actions.appendChild(ratingDiv);
      });
    }

    setTimeout(refreshSellerRatings, 2500);
  })();

}); // end DOMContentLoaded
