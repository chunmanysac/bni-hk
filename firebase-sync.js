// Firebase Auth + Firestore Integration for BNI HK Platform
// Uses Firebase Auth for authentication and Firestore for data persistence

// Firebase is loaded via CDN in the HTML file
// This file initializes Firebase and provides auth/db helper functions

const firebaseConfig = {
  apiKey: "AIzaSyAIzOO7_2YZCmtfw7yv7p9-Wx2yodCtdgI",
  authDomain: "bni-hk-platform.firebaseapp.com",
  projectId: "bni-hk-platform",
  storageBucket: "bni-hk-platform.firebasestorage.app",
  messagingSenderId: "155691139247",
  appId: "1:155691139247:web:c3b545c7e47a0e27ee545a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// =============================================
// AUTH HELPERS
// =============================================

async function fbRegister(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

async function fbLogin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function fbLogout() {
  return auth.signOut();
}

function fbCurrentUser() {
  return auth.currentUser;
}

// =============================================
// FIRESTORE HELPERS
// =============================================

// Sellers
async function fbCreateSeller(uid, data) {
  await db.collection('sellers').doc(uid).set(data);
}

async function fbGetSeller(uid) {
  const doc = await db.collection('sellers').doc(uid).get();
  return doc.exists ? { id: uid, ...doc.data() } : null;
}

async function fbUpdateSeller(uid, data) {
  await db.collection('sellers').doc(uid).update(data);
}

async function fbGetAllSellers() {
  const snap = await db.collection('sellers').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Offers
async function fbCreateOffer(data) {
  const ref = await db.collection('offers').add(data);
  return ref.id;
}

async function fbGetOffer(id) {
  const doc = await db.collection('offers').doc(id).get();
  return doc.exists ? { id, ...doc.data() } : null;
}

async function fbUpdateOffer(id, data) {
  await db.collection('offers').doc(id).update(data);
}

async function fbGetAllOffers() {
  const snap = await db.collection('offers').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fbGetOffersBySeller(sellerId) {
  const snap = await db.collection('offers').where('sellerId', '==', sellerId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Orders
async function fbCreateOrder(data) {
  const ref = await db.collection('orders').add(data);
  return ref.id;
}

async function fbGetAllOrders() {
  const snap = await db.collection('orders').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fbGetOrdersBySeller(sellerId) {
  const snap = await db.collection('orders').where('sellerId', '==', sellerId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fbUpdateOrder(id, data) {
  await db.collection('orders').doc(id).update(data);
}

// Buyers
async function fbCreateBuyer(uid, data) {
  await db.collection('buyers').doc(uid).set(data);
}

async function fbGetBuyer(uid) {
  const doc = await db.collection('buyers').doc(uid).get();
  return doc.exists ? { id: uid, ...doc.data() } : null;
}

// Settings
async function fbGetSettings() {
  const doc = await db.collection('settings').doc('platform').get();
  return doc.exists ? doc.data() : { registrationFee: 50, monthlyFee: 200, listingFee: 10 };
}

async function fbUpdateSettings(data) {
  await db.collection('settings').doc('platform').set(data, { merge: true });
}

// =============================================
// SEED DATA (run once to populate Firestore)
// =============================================
async function seedFirestore() {
  // Check if already seeded
  const check = await db.collection('settings').doc('platform').get();
  if (check.exists) {
    console.log('Firestore already seeded');
    return;
  }

  console.log('Seeding Firestore...');

  // Settings
  await fbUpdateSettings({ registrationFee: 50, monthlyFee: 200, listingFee: 10 });

  // Seed offers (these don't need auth UIDs)
  const offers = [
    { sellerId:'SEED_S001', title:'Robosen \u6a5f\u68b0\u4eba 9 \u6298\u512a\u60e0', desc:'Robosen T9 \u96fb\u7af6\u6a5f\u68b0\u4eba\uff0c\u5168\u6e2f\u7368\u5bb6 BNI \u6703\u54e1\u5c08\u5c6c\u4e5d\u6298\uff0c\u539f\u5ee0\u4fdd\u990a\uff0c\u5373\u8cb7\u5373\u62ce\u3002', image:'https://picsum.photos/seed/robot1/600/450', originalPrice:3999, discountedPrice:3599, discountType:'90', isCoupon:false, terms:'\u6bcf\u4f4d\u6703\u54e1\u9650\u8cfc 2 \u4ef6\u3002\u512a\u60e0\u671f\u81f3 2026-06-30\u3002', expiry:'2026-06-30', status:'active', views:142, orders:8, createdAt:'2026-01-10', sellerCompany:'SAC Global Ltd', sellerChapter:'BNI Achievers' },
    { sellerId:'SEED_S002', title:'IT \u7dad\u8b77\u670d\u52d9\u5e74\u5ea6\u5408\u7d04 8 \u6298', desc:'\u5168\u9762 IT \u5916\u5224\u670d\u52d9\uff0c\u5305\u62ec\u4f3a\u670d\u5668\u7dad\u8b77\u3001\u7db2\u7d61\u7ba1\u7406\u3001\u8cc7\u8a0a\u5b89\u5168\u7b49\uff0cBNI \u6703\u54e1\u4eab\u516b\u6298\u512a\u60e0\u3002', image:'https://picsum.photos/seed/it2/600/450', originalPrice:12000, discountedPrice:9600, discountType:'80', isCoupon:false, terms:'\u5408\u7d04\u671f\u6700\u77ed 12 \u500b\u6708\u3002\u9069\u7528\u65bc 10 \u4eba\u4ee5\u4e0b\u4f01\u696d\u3002', expiry:'2026-12-31', status:'active', views:89, orders:3, createdAt:'2026-01-15', sellerCompany:'HK IT Solutions', sellerChapter:'BNI Champions' },
    { sellerId:'SEED_S003', title:'\u5168\u8eab\u6392\u6bd2\u7642\u7a0b\u73fe\u91d1\u5238 $500', desc:'\u50f9\u503c HK$700 \u5168\u8eab\u6392\u6bd2\u7642\u7a0b\u73fe\u91d1\u5238\uff0c\u53ef\u7528\u65bc\u4efb\u4f55\u670d\u52d9\u3002\u6709\u6548\u671f 6 \u500b\u6708\uff0c\u4e0d\u8a2d\u514c\u63db\u3002', image:'https://picsum.photos/seed/wellness3/600/450', originalPrice:700, discountedPrice:500, discountType:'coupon', isCoupon:true, couponValue:700, terms:'\u73fe\u91d1\u5238\u4e0d\u53ef\u514c\u63db\u73fe\u91d1\u3002\u6709\u6548\u671f\u7531\u8cfc\u8cb7\u65e5\u8d77 6 \u500b\u6708\u3002', expiry:'2026-09-30', status:'active', views:215, orders:19, createdAt:'2026-02-01', sellerCompany:'Wellness Studio HK', sellerChapter:'BNI Diamond' }
  ];

  for (const o of offers) {
    await db.collection('offers').add(o);
  }

  console.log('Firestore seeded successfully');
}

// =============================================
// SYNC DB OBJECT WITH FIRESTORE
// =============================================
// This keeps the in-memory DB object in sync for backward compatibility

async function syncDBFromFirestore() {
  try {
    const [sellers, offers, orders, settings] = await Promise.all([
      fbGetAllSellers(),
      fbGetAllOffers(),
      fbGetAllOrders(),
      fbGetSettings()
    ]);
    DB.sellers = sellers;
    DB.offers = offers;
    DB.orders = orders;
    DB.settings = settings;
    console.log('DB synced from Firestore:', { sellers: sellers.length, offers: offers.length, orders: orders.length });
  } catch(e) {
    console.error('Sync error:', e);
  }
}

console.log('Firebase Auth + Firestore initialized');
