const products = [
  {
    id: 'field-shell', name: 'Field Shell', color: 'Stone', category: 'Jackets', type: 'jackets',
    image: 'media/shell-main.jpg', secondary: 'media/shell-back.jpg',
    description: 'A clean full-zip jacket in a warm stone tone. The gallery shows the supplied front and back views.',
  },
  {
    id: 'transit-puffer', name: 'Transit Puffer', color: 'Black', category: 'Jackets', type: 'jackets',
    image: 'media/puffer-black-main.jpg', secondary: 'media/puffer-black-back.jpg',
    description: 'A black quilted jacket, shown from the front and back. Product details and sizing can be confirmed on request.',
  },
  {
    id: 'cocoa-puffer', name: 'Quilt Jacket', color: 'Cocoa', category: 'Jackets', type: 'jackets',
    image: 'media/puffer-brown-main.jpg', secondary: 'media/puffer-brown-back.jpg',
    description: 'A cocoa-toned quilted jacket with a hood. The supplied imagery includes front, back and detail views.',
  },
  {
    id: 'training-kit', name: 'Training Kit', color: 'Blue', category: 'Sportswear', type: 'sets',
    image: 'media/sports-blue-main.jpg', secondary: '',
    description: 'A coordinated blue shirt and shorts set, shown in the supplied front and back product image.',
  },
  {
    id: 'track-set', name: 'Track Set', color: 'Navy / Grey', category: 'Sportswear', type: 'sets',
    image: 'media/tracksuit-main.jpg', secondary: 'media/tracksuit-back.jpg',
    description: 'A navy and grey hooded top with matching track pants, shown from the front and back.',
  },
  {
    id: 'storm-shell', name: 'Hooded Jacket', color: 'Olive', category: 'Jackets', type: 'jackets',
    image: 'media/shell-olive-main.jpg', secondary: '',
    description: 'A hooded jacket in olive, shown on model. Ask the brand team to confirm available color and sizing details.',
  },
];

const productGrid = document.querySelector('#product-grid');
const overlay = document.querySelector('#overlay');
const bagDrawer = document.querySelector('#bag-drawer');
const searchPanel = document.querySelector('#search-panel');
const accountPanel = document.querySelector('#account-panel');
const productPanel = document.querySelector('#product-panel');
const openPanels = [bagDrawer, searchPanel, accountPanel, productPanel];
let activeFilter = 'all';
let cart = loadCart();
let lastFocus = null;

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem('oneFitPlayBag') || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
}

function saveCart() {
  try { localStorage.setItem('oneFitPlayBag', JSON.stringify(cart)); } catch { /* bag remains available for this session */ }
}

function productCard(product, index) {
  const secondary = product.secondary ? `<img class="product-image-hover" src="${product.secondary}" alt="" loading="lazy" />` : '';
  return `<article class="product-card" data-product-card="${product.id}" data-type="${product.type}">
    <div class="product-media">
      <img src="${product.image}" alt="${product.name} in ${product.color}, product view" loading="lazy" />
      ${secondary}
      <span class="product-index">0${index + 1} / OFP</span>
      <button class="product-open" type="button" data-open-product="${product.id}"><span>View details</span><span aria-hidden="true">↗</span></button>
    </div>
    <div class="product-meta"><div><h3 class="product-name">${product.name}</h3><p class="product-category">${product.color} / ${product.category}</p></div><p class="product-price">Price on request</p></div>
    <button class="quick-add" type="button" data-add-to-bag="${product.id}"><span>Add to bag</span><span aria-hidden="true">+</span></button>
  </article>`;
}

function renderProducts() {
  const visible = products.filter(product => activeFilter === 'all' || product.type === activeFilter);
  productGrid.innerHTML = visible.map((product, index) => productCard(product, index)).join('');
  document.querySelector('#product-total').textContent = `${String(visible.length).padStart(2, '0')} pieces`;
  document.querySelectorAll('.filter-button').forEach(button => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function currentQuantity() { return Object.values(cart).reduce((total, quantity) => total + quantity, 0); }

function updateBagCount() {
  const count = currentQuantity();
  document.querySelector('.bag-count').textContent = count;
  document.querySelector('.bag-button').setAttribute('aria-label', `Open bag, ${count} ${count === 1 ? 'item' : 'items'}`);
  document.querySelector('.drawer-count').textContent = `(${count})`;
}

function renderBag() {
  const entries = products.filter(product => cart[product.id]);
  const list = document.querySelector('#bag-items');
  list.innerHTML = entries.map(product => `<article class="bag-item" data-bag-item="${product.id}">
    <img src="${product.image}" alt="" />
    <div><h3>${product.name}</h3><p>${product.color} / Price on request</p><div class="quantity-control"><button type="button" data-quantity="-1" data-id="${product.id}" aria-label="Remove one ${product.name}">−</button><span>${cart[product.id]}</span><button type="button" data-quantity="1" data-id="${product.id}" aria-label="Add one ${product.name}">+</button></div></div>
    <button class="remove-item" type="button" data-remove-item="${product.id}" aria-label="Remove ${product.name}">×</button>
  </article>`).join('');
  const empty = entries.length === 0;
  document.querySelector('#bag-empty').hidden = !empty;
  document.querySelector('#bag-footer').hidden = empty;
  updateBagCount();
}

function addToBag(id) {
  if (!products.some(product => product.id === id)) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderBag();
  openPanel(bagDrawer);
}

function openPanel(panel) {
  lastFocus = document.activeElement;
  closeMobileNav();
  openPanels.forEach(item => { item.hidden = true; item.classList.remove('is-open'); });
  overlay.hidden = false;
  panel.hidden = false;
  document.body.classList.add('dialog-open');
  requestAnimationFrame(() => { overlay.classList.add('is-visible'); panel.classList.add('is-open'); });
  const focusable = panel.querySelector('button, input, a');
  focusable?.focus();
}

function closePanels() {
  overlay.classList.remove('is-visible');
  openPanels.forEach(panel => panel.classList.remove('is-open'));
  document.body.classList.remove('dialog-open');
  window.setTimeout(() => {
    overlay.hidden = true;
    openPanels.forEach(panel => { panel.hidden = true; });
    lastFocus?.focus?.();
  }, 240);
}

function closeMobileNav() {
  const nav = document.querySelector('#primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}

function openProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const images = [product.image, product.secondary].filter(Boolean);
  const gallery = images.map((src, index) => `<img src="${src}" alt="${product.name} ${index === 0 ? 'front' : 'additional'} view" />`).join('');
  document.querySelector('#product-detail-content').innerHTML = `<div class="detail-gallery">${gallery}</div>
    <div class="detail-info"><p class="eyebrow dark-eyebrow">${product.category} / ${product.color}</p><h2 id="product-title">${product.name}</h2><p class="detail-price">Price on request</p><p class="detail-description">${product.description}</p><div class="detail-divider"></div><div class="detail-meta"><span><strong>Color</strong> / ${product.color}</span><span><strong>Price</strong> / Confirm on request</span><span><strong>Sizing & availability</strong> / Ask the brand team</span></div><button class="button button-dark" type="button" data-add-to-bag="${product.id}">Add to bag <span aria-hidden="true">+</span></button></div>`;
  openPanel(productPanel);
}

function renderSearch(query = '') {
  const normalized = query.trim().toLowerCase();
  const matches = products.filter(product => !normalized || `${product.name} ${product.color} ${product.category}`.toLowerCase().includes(normalized));
  document.querySelector('#search-results').innerHTML = matches.length
    ? matches.map(product => `<button class="search-result" type="button" data-open-product="${product.id}"><span>${product.name} — ${product.color}</span><span>View ↗</span></button>`).join('')
    : '<p class="form-note">No pieces match that search.</p>';
}

document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.matches('[data-open-bag]')) { event.preventDefault(); renderBag(); openPanel(bagDrawer); }
  if (target.matches('[data-close-drawer], [data-close-dialog], [data-close-bag]')) { event.preventDefault(); closePanels(); }
  if (target.matches('[data-open-search]')) { renderSearch(); openPanel(searchPanel); }
  if (target.matches('[data-open-account]')) openPanel(accountPanel);
  if (target.matches('[data-open-product]')) { event.preventDefault(); openProduct(target.dataset.openProduct); }
  if (target.matches('[data-add-to-bag]')) { event.preventDefault(); addToBag(target.dataset.addToBag); }
  if (target.matches('[data-filter]')) { activeFilter = target.dataset.filter; renderProducts(); }
  if (target.matches('[data-filter-link]')) {
    activeFilter = target.dataset.filterLink;
    renderProducts();
  }
  if (target.matches('[data-quantity]')) {
    const id = target.dataset.id;
    cart[id] = (cart[id] || 0) + Number(target.dataset.quantity);
    if (cart[id] <= 0) delete cart[id];
    saveCart(); renderBag();
  }
  if (target.matches('[data-remove-item]')) { delete cart[target.dataset.removeItem]; saveCart(); renderBag(); }
  if (target.matches('[data-open-product]') && searchPanel.hidden === false) closePanels();
  if (target.matches('.menu-toggle')) {
    const nav = document.querySelector('#primary-nav');
    const isOpen = nav.classList.toggle('is-open');
    target.setAttribute('aria-expanded', String(isOpen));
    target.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
  if (target.closest('.primary-nav')) closeMobileNav();
});

overlay.addEventListener('click', closePanels);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) closePanels(); });
document.querySelector('#search-input').addEventListener('input', event => renderSearch(event.currentTarget.value));

document.querySelector('#copy-order').addEventListener('click', async () => {
  const lines = products.filter(product => cart[product.id]).map(product => `${cart[product.id]} × ${product.name} — ${product.color} (price on request)`);
  const text = `One Fit Play order request\n${lines.join('\n')}\nPlease confirm current pricing, sizing and availability.`;
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Order request copied. Paste it into a message to the brand team.';
  } catch {
    status.textContent = text;
  }
});

document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#newsletter-note').textContent = 'Newsletter signup is not connected yet, so your address was not sent.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts();
renderBag();
