// BNI HK Buyer Registration Module
// Dynamically adds buyer registration to the platform

(function() {
  'use strict';

  var BNI_CHAPTERS = [
    'Achievers', 'Alliance', 'Apex', 'Champion', 'Dragon',
    'Elite', 'Emperor', 'Fortune', 'Glory', 'Infinity',
    'Legend', 'Liberty', 'Masters', 'Momentum', 'Noble',
    'Pinnacle', 'Premier', 'Prestige', 'Prime', 'Progress',
    'Prosperity', 'Synergy', 'Triumph', 'Unity', 'Victory',
    'Vigor', 'Vision', 'Wealth'
  ];

  function createBuyerRegisterModal() {
    var m = document.createElement('div');
    m.className = 'modal-overlay';
    m.id = 'buyerRegisterModal';
    var h = '';
    h += '<div class="modal" style="max-width:520px">';
    h += '<div class="modal-header"><h3>買家註冊</h3>';
    h += '<button class="modal-close" onclick="closeModal(\'buyerRegisterModal\')"><i data-lucide="x" style="width:16px;height:16px"></i></button></div>';
    h += '<div class="modal-body">';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
    h += '<div class="form-group"><label class="form-label">姓名 *</label><input type="text" class="form-input" id="buyerRegName" placeholder="您的姓名"></div>';
    h += '<div class="form-group"><label class="form-label">聯絡電話</label><input type="tel" class="form-input" id="buyerRegPhone" placeholder="+852 9XXX XXXX"></div></div>';
    h += '<div class="form-group"><label class="form-label">電郵地址 *</label><input type="email" class="form-input" id="buyerRegEmail" placeholder="your@email.com"></div>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
    h += '<div class="form-group"><label class="form-label">BNI 分會名稱 *</label><select class="form-input" id="buyerRegChapter"><option value="">請選擇分會</option></select></div>';
    h += '<div class="form-group"><label class="form-label">BNI 會員編號</label><input type="text" class="form-input" id="buyerRegMemberId" placeholder="BNI-HK-XXXX"></div></div>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
    h += '<div class="form-group"><label class="form-label">密碼 *</label><input type="password" class="form-input" id="buyerRegPass" placeholder="至少 8 個字元"></div>';
    h += '<div class="form-group"><label class="form-label">確認密碼 *</label><input type="password" class="form-input" id="buyerRegPassConfirm" placeholder="再次輸入密碼"></div></div>';
    h += '<p id="buyerRegError" style="color:var(--color-error);font-size:12px;display:none"></p>';
    h += '</div>';
    h += '<div class="modal-footer">';
    h += '<button class="btn btn-secondary" onclick="closeModal(\'buyerRegisterModal\');showBuyerLoginModal()">返回登入</button>';
    h += '<button class="btn btn-primary" onclick="doBuyerRegister()">提交註冊</button>';
    h += '</div></div>';
    m.innerHTML = h;
    document.body.appendChild(m);
    var sel = document.getElementById('buyerRegChapter');
    BNI_CHAPTERS.forEach(function(ch) {
      var o = document.createElement('option');
      o.value = ch; o.textContent = ch;
      sel.appendChild(o);
    });
    if (window.lucide) lucide.createIcons();
  }

  function addRegLinkToLogin() {
    var modal = document.getElementById('buyerLoginModal');
    if (!modal) return;
    var footer = modal.querySelector('.modal-footer');
    if (!footer) return;
    var d = document.createElement('div');
    d.style.cssText = 'width:100%;text-align:center;margin-top:12px';
    d.innerHTML = '<span style="color:#999">或</span> <a href="#" onclick="closeModal(\'buyerLoginModal\');showBuyerRegisterModal();return false;" style="color:var(--color-primary);text-decoration:underline;cursor:pointer">新買家註冊</a>';
    footer.appendChild(d);
  }

  window.showBuyerRegisterModal = function() {
    var m = document.getElementById('buyerRegisterModal');
    if (m) m.classList.add('active');
  };

  window.doBuyerRegister = async function() {
    var name = document.getElementById('buyerRegName').value.trim();
    var phone = document.getElementById('buyerRegPhone').value.trim();
    var email = document.getElementById('buyerRegEmail').value.trim();
    var chapter = document.getElementById('buyerRegChapter').value;
    var memberId = document.getElementById('buyerRegMemberId').value.trim();
    var pass = document.getElementById('buyerRegPass').value;
    var pass2 = document.getElementById('buyerRegPassConfirm').value;
    var err = document.getElementById('buyerRegError');
    err.style.display = 'none';
    if (!name || !email || !chapter || !pass) {
      err.textContent = '請填寫所有必填欄位 (*)'; err.style.display = 'block'; return;
    }
    if (pass.length < 8) {
      err.textContent = '密碼至少需要 8 個字元'; err.style.display = 'block'; return;
    }
    if (pass !== pass2) {
      err.textContent = '兩次輸入的密碼不一致'; err.style.display = 'block'; return;
    }
    try {
      var cred = await firebase.auth().createUserWithEmailAndPassword(email, pass);
      var uid = cred.user.uid;
      await firebase.firestore().collection('buyers').doc(uid).set({
        name: name, phone: phone, email: email,
        chapter: chapter, memberId: memberId, role: 'buyer',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      if (window.state) {
        window.state.buyerUser = { uid: uid, name: name, email: email, chapter: chapter, phone: phone };
      }
      closeModal('buyerRegisterModal');
      alert('註冊成功！歡迎使用 BNI 優惠平台。');
      var btn = document.getElementById('nav-login');
      if (btn) { btn.textContent = name; btn.onclick = function() { doBuyerLogout(); }; }
    } catch(e) {
      var msg = e.message;
      if (e.code === 'auth/email-already-in-use') msg = '此電郵已被註冊，請直接登入';
      else if (e.code === 'auth/weak-password') msg = '密碼強度不足';
      else if (e.code === 'auth/invalid-email') msg = '電郵格式不正確';
      err.textContent = msg; err.style.display = 'block';
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    createBuyerRegisterModal();
    addRegLinkToLogin();
  });
})();
