// Firebase Sync for BNI HK Platform
// Initializes Firebase and syncs DB object with Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAIzOO7_2YZCmtfw7yv7p9-Wx2yodCtdgI",
  authDomain: "bni-hk-platform.firebaseapp.com",
  databaseURL: "https://bni-hk-platform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bni-hk-platform",
  storageBucket: "bni-hk-platform.firebasestorage.app",
  messagingSenderId: "155691139247",
  appId: "1:155691139247:web:c3b545c7e47a0e27ee545a"
};

firebase.initializeApp(firebaseConfig);
const fbDB = firebase.database();
let firebaseReady = false;

// Write full DB to Firebase (seed)
async function seedFirebase() {
  try {
    await fbDB.ref('/').set({
      settings: DB.settings,
      sellers: DB.sellers.reduce((o,s)=>{o[s.id]=s;return o;},{}),
      offers: DB.offers.reduce((o,item)=>{o[item.id]=item;return o;},{}),
      orders: DB.orders.reduce((o,item)=>{o[item.id]=item;return o;},{}),
      buyers: DB.buyers.reduce((o,item)=>{o[item.id]=item;return o;},{})
    });
    console.log('Firebase seeded successfully');
  } catch(e) { console.error('Seed error:',e); }
}

// Load DB from Firebase
async function loadFromFirebase() {
  try {
    const snap = await fbDB.ref('/').once('value');
    const data = snap.val();
    if (!data || !data.offers) {
      console.log('Firebase empty, seeding...');
      await seedFirebase();
      return;
    }
    // Convert Firebase objects back to arrays
    if (data.settings) DB.settings = data.settings;
    if (data.sellers) DB.sellers = Object.values(data.sellers);
    if (data.offers) DB.offers = Object.values(data.offers);
    if (data.orders) DB.orders = Object.values(data.orders);
    if (data.buyers) DB.buyers = Object.values(data.buyers);
    firebaseReady = true;
    console.log('Loaded from Firebase:', DB.offers.length, 'offers');
  } catch(e) { console.error('Load error:',e); }
}

// Sync helpers
function fbSyncOffer(offer) {
  fbDB.ref('offers/' + offer.id).set(offer).catch(e=>console.error(e));
}
function fbSyncOrder(order) {
  fbDB.ref('orders/' + order.id).set(order).catch(e=>console.error(e));
}
function fbSyncSeller(seller) {
  fbDB.ref('sellers/' + seller.id).set(seller).catch(e=>console.error(e));
}
function fbSyncSettings() {
  fbDB.ref('settings').set(DB.settings).catch(e=>console.error(e));
}

// Override original functions to add Firebase sync
const _origSaveNewOffer = typeof saveNewOfferFromTab === 'function' ? saveNewOfferFromTab : null;

// Patch DOMContentLoaded to load from Firebase first
const _origInit = function(){
  lucide.createIcons();
  renderOffers();
};

document.addEventListener('DOMContentLoaded', async function() {
  await loadFromFirebase();
  lucide.createIcons();
  renderOffers();
});

// Monkey-patch key functions after page loads
window.addEventListener('load', function() {
  // Patch saveNewOfferFromTab
  const origSave = window.saveNewOfferFromTab;
  window.saveNewOfferFromTab = function() {
    origSave();
    const newOffer = DB.offers[DB.offers.length - 1];
    if (newOffer) fbSyncOffer(newOffer);
    const s = state.sellerUser;
    if (s) fbSyncSeller(s);
  };

  // Patch saveOffer (edit)
  const origSaveOffer = window.saveOffer;
  window.saveOffer = function() {
    origSaveOffer();
    const o = DB.offers.find(x => x.id === state.editingOfferId);
    if (o) fbSyncOffer(o);
  };

  // Patch toggleOfferStatus
  const origToggle = window.toggleOfferStatus;
  window.toggleOfferStatus = function(id) {
    origToggle(id);
    const o = DB.offers.find(x => x.id === id);
    if (o) fbSyncOffer(o);
  };

  // Patch submitOrder
  const origSubmit = window.submitOrder;
  window.submitOrder = function(offerId, qty, total, sellerId) {
    origSubmit(offerId, qty, total, sellerId);
    const newOrder = DB.orders[DB.orders.length - 1];
    if (newOrder) fbSyncOrder(newOrder);
  };

  // Patch saveProfile
  const origProfile = window.saveProfile;
  window.saveProfile = function() {
    origProfile();
    if (state.sellerUser) fbSyncSeller(state.sellerUser);
  };

  // Patch doSellerRegister
  const origReg = window.doSellerRegister;
  window.doSellerRegister = function() {
    origReg();
    const newSeller = DB.sellers[DB.sellers.length - 1];
    if (newSeller) fbSyncSeller(newSeller);
  };

  // Patch saveSettings
  const origSettings = window.saveSettings;
  window.saveSettings = function() {
    origSettings();
    fbSyncSettings();
  };

  // Patch saveSellerEdit (admin)
  const origSellerEdit = window.saveSellerEdit;
  window.saveSellerEdit = function() {
    origSellerEdit();
    const s = DB.sellers.find(x => x.id === state.editingSellerId);
    if (s) fbSyncSeller(s);
  };

  // Patch adminToggleOffer
  const origAdminToggle = window.adminToggleOffer;
  window.adminToggleOffer = function(id) {
    origAdminToggle(id);
    const o = DB.offers.find(x => x.id === id);
    if (o) fbSyncOffer(o);
  };

  // Patch showView to refresh offers on home
  const origShowView = window.showView;
  window.showView = function(name) {
    origShowView(name);
    if (name === 'home') renderOffers();
  };

  console.log('Firebase sync patches applied');
});
