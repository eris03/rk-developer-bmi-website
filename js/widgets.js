/**
 * RK Developers — Site Widgets v15
 * ─────────────────────────────────────────────────────────────────
 *  TOP-RIGHT FIXED — 4 equal-size buttons, moved lower (top:260px)
 *  WhatsApp · Call · Message · AI Bot (robo.mp4)
 *  Click any button → full name slides out with animation
 *  requestAnimationFrame loop: position re-set every single frame
 *  MutationObserver + rAF = impossible to vanish
 * ─────────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  /* ══ CONFIG ══════════════════════════════════════════════════ */
  var CFG = {
    phone: '9663108999',
    wa: '919663108999',
    email: 'rkdevelopers12345@gmail.com',
    popupDelay: 20000
  };

  /* ══ KNOWLEDGE BASE — Full Website Summary v2 ══════════════ */
  var KB = [

    /* ── Greetings ── */
    { tags: ['hi','hello','hey','namaste','good morning','good afternoon','good evening','start','help'],
      answer: 'Hello! 👋 Welcome to <strong>RK Developers</strong> — Bengaluru's trusted real estate company since 2004.<br><br>How can I help you today?',
      chips: ['Ongoing Projects','Completed Projects','Pricing','Book a Site Visit','Contact Us'] },

    /* ── About company ── */
    { tags: ['about','who are you','rk developers','company','founded','history','since','trust','experience','story'],
      answer: '<strong>RK Developers</strong> was founded in 2004 with one goal — making quality real estate investments accessible, transparent, and rewarding for every buyer.<br><br>📊 <strong>20+ Projects</strong> delivered<br>👨‍👩‍👧 <strong>1,500+ Happy Families</strong><br>🌍 <strong>300+ Acres</strong> developed<br>🏠 <strong>1,600+ Units</strong> handed over<br><br>Areas served: Bagalur, Hesaraghatta, Yelahanka, Nelamangala, Devanahalli, Gauribidanur, Chikkaballapur & more.',
      chips: ['Ongoing Projects','Completed Projects','Contact Us'] },

    /* ── All/Ongoing projects ── */
    { tags: ['projects','ongoing','current','available','what projects','all projects','developments','new'],
      answer: '<strong>Ongoing Projects:</strong><br><br>🌿 <strong>Metro Greens</strong> — Farm plots, Chikkaballapur, Beechgahanalli Village. ₹999/sq.ft<br><br>🏡 <strong>RK Avenue</strong> — 36 residential plots, Gauribidanur. ₹1,899/sq.ft<br><br>🏢 <strong>RK Revenue</strong> — Commercial spaces, Hebbal, Bangalore. From ₹65 Lakhs',
      chips: ['Metro Greens','RK Avenue','RK Revenue','Book a Site Visit'] },

    /* ── Metro Greens ── */
    { tags: ['metro greens','metro','farm','farm plot','farm land','chikkaballapur','beechgahanalli','beechaganahalli','ecological','200 acres','nature'],
      answer: '🌿 <strong>Metro Greens</strong><br><strong>Location:</strong> Chikkaballapur, Beechgahanalli Village, North Bengaluru<br><strong>Total:</strong> 200 Acres | <strong>Phase 1:</strong> 11.5 Acres<br><strong>Price:</strong> ₹999/sq.ft<br><strong>Status:</strong> Ready to Register<br><br><strong>Plot Sizes:</strong><br>• 5.5 Guntas (~5,445 sq.ft) — Starter Estate<br>• 6.0–6.5 Guntas — Premium Estate ⭐ Most Popular<br>• 8.0–9.0 Guntas — Grand Estate<br>• 1 Acre+ — The Grand Estate<br><br><strong>Amenities (30+):</strong> Clubhouse, Swimming Pool, Spa, Jogging Track, Yoga Decks, Sports Courts, Children's Play Area, 24/7 Security, Drip Irrigation, Organic Gardens, Scenic Trails, Solar Lighting, High-Speed Wi-Fi & more.',
      chips: ['Pricing','Book Visit','Contact Us'] },

    /* ── RK Avenue ── */
    { tags: ['rk avenue','avenue','gauribidanur','residential','plots','gated community','alkapura'],
      answer: '🏡 <strong>RK Avenue</strong><br><strong>Location:</strong> Alkapura Village, Gauribidanur<br><strong>Layout:</strong> 2.5 Acres | <strong>Plots:</strong> 36 Exclusive<br><strong>Price:</strong> ₹1,899/sq.ft<br><strong>Status:</strong> Ready to Register & Construct<br><br><strong>Amenities:</strong> 30-ft wide roads, underground electricity & water, drainage, 24/7 security guards, CCTV, landscaped park, children's play area, street lighting.<br><br><strong>Nearby:</strong> Someshwara Railway Station (5 min), Gauribidanur–Doddaballapura Highway (SH9), Gauribidanur DC Office.',
      chips: ['Pricing','Book Visit','Contact Us'] },

    /* ── RK Revenue ── */
    { tags: ['rk revenue','revenue','commercial','office','retail','hebbal','business','invest commercial'],
      answer: '🏢 <strong>RK Revenue</strong> — Hebbal, Bangalore<br><strong>Type:</strong> G+20 Commercial Tower | 180 Units<br><strong>Possession:</strong> March 2027<br><strong>ROI:</strong> 8–10% p.a. | 12 km from Airport<br><br><strong>Space Types & Pricing:</strong><br>• Retail Shops (450–1,200 sq.ft) — from <strong>₹65 Lakhs</strong><br>• Studio Offices (600–1,000 sq.ft) — from <strong>₹82 Lakhs</strong><br>• Office Suites (1,200–3,000 sq.ft) — from <strong>₹1.4 Cr</strong><br>• Corporate Floors (3,000–5,000 sq.ft) — from <strong>₹3.2 Cr</strong>',
      chips: ['Book Visit','Call Us','WhatsApp'] },

    /* ── Completed projects ── */
    { tags: ['completed','delivered','done','finished','past','soundarya','saundrya','royal arcade','golden gate','orchid','reality layout','srk grand'],
      answer: '🏆 <strong>20+ Projects Delivered</strong> across Bengaluru:<br><br>• <strong>Reality Residential Layout</strong> — 94 plots, 4 acres, Bagalur, North Bengaluru<br>• <strong>SRK Grand</strong> — 2 acres, near REVA University<br>• <strong>Soundarya Enclave</strong><br>• <strong>Royal Arcade / Royal Orchid</strong><br>• <strong>Golden Gate</strong><br>• And many more across Yelahanka, Hesaraghatta, Nelamangala & Sahakarnagar.',
      chips: ['Ongoing Projects','Book Visit','Contact Us'] },

    /* ── Pricing ── */
    { tags: ['price','pricing','rate','cost','how much','per sqft','sq ft','budget','affordable','cheap','expensive'],
      answer: '💰 <strong>Current Pricing:</strong><br><br>🌿 <strong>Metro Greens</strong> (Farm plots, Chikkaballapur)<br>&nbsp;&nbsp;&nbsp;→ ₹999/sq.ft<br><br>🏡 <strong>RK Avenue</strong> (Residential plots, Gauribidanur)<br>&nbsp;&nbsp;&nbsp;→ ₹1,899/sq.ft<br><br>🏢 <strong>RK Revenue</strong> (Commercial, Hebbal)<br>&nbsp;&nbsp;&nbsp;→ Retail from ₹65L | Offices from ₹82L | Suites from ₹1.4Cr<br><br>Call <strong>+91 9663108999</strong> for exact plot size & total cost!',
      chips: ['Call Us','WhatsApp','Book a Site Visit'] },

    /* ── Location / address ── */
    { tags: ['location','where','address','office','sahakarnagar','find','directions','map','how to reach'],
      answer: '📍 <strong>Our Office:</strong><br>3rd Floor, 1st Cross, 15th Main, E Block,<br>Beside Nandana Palace,<br><strong>Sahakarnagar, Bengaluru – 560092</strong><br><br>⏰ Open <strong>Mon–Sun, 9:30 AM – 7:00 PM</strong><br><br>📞 <strong>+91 9663108999</strong>',
      chips: ['Call Us','WhatsApp','Book a Site Visit'] },

    /* ── Contact ── */
    { tags: ['contact','phone','number','call','reach','email','get in touch'],
      answer: '📞 <strong>Call:</strong> +91 9663108999<br>💬 <strong>WhatsApp:</strong> +91 9663108999<br>✉️ <strong>Email:</strong> rkdevelopers12345@gmail.com<br><br>⏰ Available <strong>Mon–Sun, 9:30 AM – 7:00 PM IST</strong>',
      chips: ['Call Now','WhatsApp','Book a Site Visit'] },

    /* ── Site visit ── */
    { tags: ['visit','site visit','schedule','book','appointment','free visit','see project','tour','come'],
      answer: '🏡 We offer <strong>FREE site visits</strong> to all our projects — Metro Greens, RK Avenue & RK Revenue!<br><br>📅 Available <strong>7 days a week, 9:30 AM – 7:00 PM</strong><br>📞 Call <strong>+91 9663108999</strong> to schedule at your convenience.',
      chips: ['Call Now','WhatsApp'] },

    /* ── WhatsApp ── */
    { tags: ['whatsapp','message','chat','wa','ping','text'],
      answer: '💬 Chat with us instantly on <strong>WhatsApp</strong>!<br><br>📱 <strong>+91 9663108999</strong><br><br>Our team typically responds within minutes. Available <strong>7 days a week</strong>.',
      chips: ['WhatsApp Now','Call Us'] },

    /* ── EMI / Loan / Finance ── */
    { tags: ['emi','loan','home loan','bank','finance','payment','installment','hdfc','sbi','icici'],
      answer: '🏦 <strong>Home Loan Assistance</strong><br><br>We work with leading banks & NBFCs to help you secure the best loan rates. Our team guides you through the entire process — documentation, valuation, and registration.<br><br>📞 Call <strong>+91 9663108999</strong> to speak with our finance advisor.',
      chips: ['Call Us','WhatsApp','Book Visit'] },

    /* ── Legal / RERA ── */
    { tags: ['rera','legal','register','registration','title','documents','clear','verified','khata','ec','sale deed'],
      answer: '✅ <strong>All RK Developers projects are:</strong><br>• Legally clear with clean titles<br>• RERA compliant<br>• EC & Khata verified<br>• Ready for bank loans<br><br>We provide full legal documentation support — sale deeds, khata transfers, EC verification, and registration. <strong>Zero hidden charges.</strong>',
      chips: ['Call Us','Book Visit'] },

    /* ── Amenities ── */
    { tags: ['amenities','facilities','features','park','road','water','electricity','gated','security','swimming','clubhouse'],
      answer: '🌟 <strong>Amenities by Project:</strong><br><br>🌿 <strong>Metro Greens:</strong> Clubhouse, Pool, Spa, Yoga, Sports Courts, Organic Gardens, Solar, Wi-Fi, 30+ more<br><br>🏡 <strong>RK Avenue:</strong> 30-ft roads, underground utilities, 24/7 security, CCTV, park, play area<br><br>🏢 <strong>RK Revenue:</strong> 1Gbps fiber, 100% power backup, centralised AC, multilevel parking, food court',
      chips: ['Metro Greens','RK Avenue','RK Revenue'] },

    /* ── Investment ── */
    { tags: ['invest','investment','returns','appreciation','profit','value','growth','roi','return','long term'],
      answer: '📈 <strong>Why Invest with RK Developers?</strong><br><br>• High-appreciation corridors near Bangalore's growth zones<br>• Legally clear plots — safe, bankable investment<br>• <strong>RK Revenue:</strong> 8–10% rental ROI p.a., 40% capital appreciation expected over 5 years<br>• 20+ projects delivered — proven track record since 2004<br><br>Speak with our advisors for personalised investment guidance!',
      chips: ['Call Us','WhatsApp','Metro Greens','RK Revenue'] },

    /* ── Services ── */
    { tags: ['services','what do you offer','what do you do','help with','assist'],
      answer: '🛠️ <strong>Our Services:</strong><br><br>• Residential Plot Development<br>• Farm Plot Communities<br>• Commercial Development<br>• Legal Documentation Support<br>• Investment Advisory<br>• Property Maintenance & After-Sales<br><br>We guide you end-to-end — from site visit to registration to handover.',
      chips: ['Book Visit','Call Us','Our Projects'] },

    /* ── Thanks / bye ── */
    { tags: ['thanks','thank you','bye','goodbye','ok','okay','great','perfect','noted','got it','awesome'],
      answer: 'Thank you for connecting with <strong>RK Developers</strong>! 😊<br><br>We're here 7 days a week at <strong>+91 9663108999</strong>. Looking forward to helping you find your perfect property!',
      chips: ['Book a Site Visit','Call Us','WhatsApp'] }

  ];

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function resolveAsset(filename) {
    var path = window.location.pathname;
    var parts = path.split('/').filter(function (p) { return p.length > 0; });
    if (parts.length > 0 && parts[parts.length - 1].indexOf('.') !== -1) parts.pop();
    var prefix = parts.length > 0 ? parts.map(function () { return '..'; }).join('/') + '/' : '';
    return prefix + 'assets/' + filename;
  }

  /* ══ CSS ══════════════════════════════════════════════════════ */
  var CSS = [

    /* ── Glow keyframes ── */
    '@keyframes glowWa{0%,100%{box-shadow:0 0 8px #25D366,0 0 20px rgba(37,211,102,.32),0 3px 14px rgba(0,0,0,.35)}50%{box-shadow:0 0 18px #25D366,0 0 36px rgba(37,211,102,.55),0 3px 18px rgba(0,0,0,.4)}}',
    '@keyframes glowCall{0%,100%{box-shadow:0 0 8px #2196F3,0 0 20px rgba(33,150,243,.32),0 3px 14px rgba(0,0,0,.35)}50%{box-shadow:0 0 18px #2196F3,0 0 36px rgba(33,150,243,.55),0 3px 18px rgba(0,0,0,.4)}}',
    '@keyframes glowMsg{0%,100%{box-shadow:0 0 8px #FF9500,0 0 20px rgba(255,149,0,.32),0 3px 14px rgba(0,0,0,.35)}50%{box-shadow:0 0 18px #FF9500,0 0 36px rgba(255,149,0,.55),0 3px 18px rgba(0,0,0,.4)}}',
    '@keyframes glowBot{0%,100%{box-shadow:0 0 8px rgba(255,149,0,.55),0 0 20px rgba(255,149,0,.28),0 3px 14px rgba(0,0,0,.38)}50%{box-shadow:0 0 20px rgba(255,180,0,.9),0 0 40px rgba(255,149,0,.45),0 3px 18px rgba(0,0,0,.44)}}',
    '@keyframes rippleRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.3);opacity:0}}',
    '@keyframes stackIn{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:translateX(0)}}',

    /* ── Click label reveal ── */
    '@keyframes labelReveal{from{opacity:0;transform:translateY(-50%) translateX(10px)}to{opacity:1;transform:translateY(-50%) translateX(0)}}',
    '@keyframes labelFade{from{opacity:1}to{opacity:0}}',

    /* ── Speech bubble ── */
    '@keyframes bubblePop{0%{opacity:0;transform:translateX(10px) scale(.72)}60%{opacity:1;transform:translateX(-3px) scale(1.05)}100%{opacity:1;transform:translateX(0) scale(1)}}',

    /* ── Widget container: fixed top-right ── */
    '#rkRightBar{',
    '  position:fixed!important;',
    '  top:260px!important;',          /* lower — sits comfortably in hero zone */
    '  right:14px!important;',
    '  z-index:99999!important;',      /* nuclear z-index */
    '  display:flex!important;',
    '  flex-direction:column!important;',
    '  align-items:center!important;',
    '  gap:11px!important;',
    '  opacity:1!important;',
    '  visibility:visible!important;',
    '  pointer-events:auto!important;',
    '  will-change:transform;',        /* own compositor layer */
    '}',

    /* ── ALL 4 buttons — same size 52×52 ── */
    '.rk-w-btn{',
    '  position:relative!important;',
    '  width:52px!important;height:52px!important;',
    '  border-radius:50%!important;',
    '  display:flex!important;align-items:center!important;justify-content:center!important;',
    '  cursor:pointer!important;',
    '  text-decoration:none!important;',
    '  border:none!important;outline:none!important;',
    '  overflow:visible!important;',
    '  flex-shrink:0;',
    '  transition:transform .16s!important;',
    '}',
    '.rk-w-btn:hover,.rk-w-btn:active{transform:scale(1.14)!important;}',
    '.rk-w-btn i{font-size:22px;color:#fff;position:relative;z-index:2;pointer-events:none;}',

    /* Ripple ring on all buttons */
    '.rk-w-btn::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;animation:rippleRing 2.6s ease-out infinite;}',

    /* ── Click label (slides left of button) ── */
    '.rk-click-label{',
    '  position:absolute;',
    '  right:calc(100% + 12px);',
    '  top:50%;',
    '  transform:translateY(-50%);',
    '  background:rgba(15,15,15,0.9);',
    '  backdrop-filter:blur(8px);',
    '  color:#fff;',
    '  font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:.4px;',
    '  padding:6px 14px;',
    '  border-radius:24px;',
    '  white-space:nowrap;',
    '  pointer-events:none;',
    '  z-index:100000;',
    '  animation:labelReveal .28s cubic-bezier(.34,1.56,.64,1) both;',
    '}',

    /* Colours per button */
    '.rk-wa-label{border:1.5px solid rgba(37,211,102,.5);box-shadow:0 0 12px rgba(37,211,102,.3);}',
    '.rk-call-label{border:1.5px solid rgba(33,150,243,.5);box-shadow:0 0 12px rgba(33,150,243,.3);}',
    '.rk-msg-label{border:1.5px solid rgba(255,149,0,.5);box-shadow:0 0 12px rgba(255,149,0,.3);}',
    '.rk-bot-label{border:1.5px solid rgba(255,149,0,.5);box-shadow:0 0 12px rgba(255,149,0,.3);}',

    /* ── WhatsApp ── */
    '#rkWaBtn{background:linear-gradient(135deg,#25D366,#128C4A)!important;animation:stackIn .4s .04s ease both,glowWa 2.8s ease-in-out infinite!important;}',
    '#rkWaBtn::after{border:2px solid rgba(37,211,102,.45);}',

    /* ── Call ── */
    '#rkCallBtn{background:linear-gradient(135deg,#2196F3,#0055BB)!important;animation:stackIn .4s .1s ease both,glowCall 2.8s .5s ease-in-out infinite!important;}',
    '#rkCallBtn::after{border:2px solid rgba(33,150,243,.45);}',

    /* ── Message ── */
    '#rkMsgBtn{background:linear-gradient(135deg,#FF9500,#D97000)!important;animation:stackIn .4s .17s ease both,glowMsg 2.8s 1s ease-in-out infinite!important;}',
    '#rkMsgBtn::after{border:2px solid rgba(255,149,0,.45);}',

    /* ── AI Bot button — same 52×52, video inside ── */
    '#rkBotBtn{',
    '  background:linear-gradient(135deg,#FF9500,#D97000)!important;',
    '  animation:stackIn .4s .24s ease both,glowBot 2.4s 1.5s ease-in-out infinite!important;',
    '}',
    '#rkBotBtn::after{border:2px solid rgba(255,149,0,.5);}',

    /* Video inside bot button */
    '#rkBotVideo{',
    '  position:absolute!important;',
    '  inset:0!important;',
    '  width:100%!important;height:100%!important;',
    '  object-fit:cover!important;',
    '  border-radius:50%!important;',
    '  mix-blend-mode:multiply;',
    '  pointer-events:none;',
    '  z-index:1;',
    '}',

    /* ── Speech bubble ── */
    '#rkSpeechBubble{',
    '  position:absolute;',
    '  right:calc(100% + 12px);',
    '  top:50%;transform:translateY(-50%);',
    '  background:#fff;',
    '  border:2px solid #FF9500;',
    '  border-radius:10px 10px 0 10px;',
    '  padding:7px 13px;',
    '  font-size:12px;font-family:sans-serif;color:#1A0800;font-weight:700;',
    '  white-space:nowrap;z-index:100000;',
    '  pointer-events:none;',
    '  box-shadow:0 4px 18px rgba(0,0,0,.18);',
    '  animation:bubblePop .38s cubic-bezier(.34,1.56,.64,1) both;',
    '}',
    '#rkSpeechBubble::after{content:"";position:absolute;top:50%;right:-9px;transform:translateY(-50%);border:5px solid transparent;border-left-color:#FF9500;}',

    /* ── Chat Panel ── */
    '#rkChatPanel{position:fixed!important;top:260px!important;right:78px!important;width:315px;height:440px;background:#fff;border-radius:18px;box-shadow:0 8px 44px rgba(0,0,0,.22);z-index:100000!important;display:flex;flex-direction:column;overflow:hidden;pointer-events:auto!important;}',
    '#rkChatHeader{background:linear-gradient(135deg,#FF9500,#d97000);color:#fff;padding:14px 16px;font-family:sans-serif;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:space-between;border-radius:18px 18px 0 0;}',
    '#rkChatMessages{flex:1;overflow-y:auto;padding:12px;font-family:sans-serif;font-size:13px;background:#f9f9f9;}',
    '.rk-chat-msg{margin-bottom:10px;max-width:86%;line-height:1.46;}',
    '.rk-chat-msg.bot{background:#fff;border:1px solid #eee;border-radius:12px 12px 12px 2px;padding:9px 12px;color:#222;}',
    '.rk-chat-msg.user{background:#FF9500;color:#fff;border-radius:12px 12px 2px 12px;padding:9px 12px;margin-left:auto;text-align:right;}',
    '.rk-chat-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}',
    '.rk-chat-chip{background:#fff3e0;border:1px solid #FF9500;color:#FF9500;font-size:11px;padding:4px 10px;border-radius:20px;cursor:pointer;font-family:sans-serif;}',
    '.rk-chat-chip:hover{background:#FF9500;color:#fff;}',
    '#rkChatInputRow{padding:10px;border-top:1px solid #eee;display:flex;gap:8px;background:#fff;}',
    '#rkChatInput{flex:1;border:1px solid #ddd;border-radius:8px;padding:8px 10px;font-size:13px;outline:none;font-family:sans-serif;}',
    '#rkChatSend{background:#FF9500;color:#fff;border:none;border-radius:8px;padding:8px 14px;cursor:pointer;font-size:13px;}',

    /* ── Modals ── */
    '.rk-modal-backdrop{position:fixed!important;inset:0;background:rgba(0,0,0,.52);z-index:100001!important;display:flex;align-items:center;justify-content:center;pointer-events:auto!important;}',
    '.rk-modal-box{background:#fff;border-radius:18px;padding:28px 24px;width:340px;max-width:92vw;font-family:sans-serif;position:relative;box-shadow:0 8px 44px rgba(0,0,0,.22);}',
    '.rk-modal-title{font-size:18px;font-weight:700;margin:0 0 6px;color:#111;text-align:center;}',
    '.rk-modal-sub{font-size:13px;color:#666;text-align:center;margin:0 0 18px;}',
    '.rk-modal-input{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px;box-sizing:border-box;margin-bottom:10px;font-family:sans-serif;outline:none;}',
    '.rk-modal-input:focus{border-color:#FF9500;}',
    '.rk-modal-btn{width:100%;padding:12px;background:linear-gradient(135deg,#FF9500,#d97000);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:sans-serif;}',
    '.rk-modal-close{position:absolute;top:12px;right:14px;background:none;border:none;font-size:22px;cursor:pointer;color:#aaa;line-height:1;}',
    '.rk-modal-close:hover{color:#333;}',

    /* ── Mobile ── */
    '@media(max-width:600px){',
    '  #rkRightBar{top:130px!important;right:8px!important;gap:9px!important;}',
    '  .rk-w-btn{width:44px!important;height:44px!important;}',
    '  .rk-w-btn i{font-size:18px;}',
    '  #rkChatPanel{right:60px!important;top:130px!important;width:calc(100vw - 74px);}',
    '}'

  ].join('\n');

  /* ══ CLICK LABEL HELPER ══════════════════════════════════════ */
  var _labelTimer = {};
  function showClickLabel(btn, text, colorClass) {
    var existing = btn.querySelector('.rk-click-label');
    if (existing) existing.remove();
    var lbl = document.createElement('span');
    lbl.className = 'rk-click-label ' + (colorClass || '');
    lbl.textContent = text;
    btn.appendChild(lbl);
    /* fade out after 1.8s */
    var id = btn.id || text;
    clearTimeout(_labelTimer[id]);
    _labelTimer[id] = setTimeout(function () {
      lbl.style.animation = 'labelFade .3s ease forwards';
      setTimeout(function () { if (lbl.parentNode) lbl.remove(); }, 320);
    }, 1800);
  }

  /* ══ DOM BUILD ═══════════════════════════════════════════════ */
  var _bar = null; /* keep global ref for watchdog */

  function buildBar() {
    /* Remove stale if present */
    var old = document.getElementById('rkRightBar');
    if (old) old.remove();

    /* Style injection — idempotent */
    if (!document.getElementById('rkWidgetStyles')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'rkWidgetStyles';
      styleEl.textContent = CSS;
      document.head.appendChild(styleEl);
    }

    var bar = document.createElement('div');
    bar.id = 'rkRightBar';
    _bar = bar;

    /* ── WhatsApp ── */
    var waBtn = document.createElement('a');
    waBtn.id = 'rkWaBtn';
    waBtn.href = 'https://wa.me/' + CFG.wa + '?text=Hello%2C%20I%27m%20interested%20in%20your%20projects.';
    waBtn.target = '_blank';
    waBtn.className = 'rk-w-btn';
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    waBtn.addEventListener('click', function () {
      showClickLabel(waBtn, 'WhatsApp Us', 'rk-wa-label');
    });

    /* ── Call ── */
    var callBtn = document.createElement('a');
    callBtn.id = 'rkCallBtn';
    callBtn.href = 'tel:+91' + CFG.phone;
    callBtn.className = 'rk-w-btn';
    callBtn.innerHTML = '<i class="fas fa-phone-alt"></i>';
    callBtn.addEventListener('click', function () {
      showClickLabel(callBtn, 'Call +91 ' + CFG.phone, 'rk-call-label');
    });

    /* ── Message ── */
    var msgBtn = document.createElement('div');
    msgBtn.id = 'rkMsgBtn';
    msgBtn.className = 'rk-w-btn';
    msgBtn.innerHTML = '<i class="fas fa-envelope"></i>';
    msgBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showClickLabel(msgBtn, 'Send Message', 'rk-msg-label');
      openMessageModal();
    });

    /* ── AI Bot ── */
    var botBtn = document.createElement('div');
    botBtn.id = 'rkBotBtn';
    botBtn.className = 'rk-w-btn';
    botBtn.setAttribute('role', 'button');

    var vid = document.createElement('video');
    vid.id = 'rkBotVideo';
    vid.src = resolveAsset('robo.mp4');
    vid.autoplay = true;
    vid.loop = true;
    vid.muted = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('preload', 'auto');

    botBtn.appendChild(vid);
    botBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showClickLabel(botBtn, 'AI Assistant', 'rk-bot-label');
      openChatbot();
    });

    bar.appendChild(waBtn);
    bar.appendChild(callBtn);
    bar.appendChild(msgBtn);
    bar.appendChild(botBtn);

    /* Append to body with inline style as backup */
    document.body.appendChild(bar);
    _enforceStyle(bar);

    /* ── Speech bubble on bot btn ── */
    var waveMessages = ['May I help you?','Looking for a property?','Free site visit!','Ask me anything!'];
    function showBubble() {
      var b = document.getElementById('rkSpeechBubble');
      if (!b) {
        b = document.createElement('div');
        b.id = 'rkSpeechBubble';
        botBtn.appendChild(b);
      }
      b.textContent = rand(waveMessages);
      b.style.display = 'block';
      b.style.animation = 'none';
      void b.offsetWidth;
      b.style.animation = '';
      setTimeout(function () { if (b) b.style.display = 'none'; }, 3500);
    }
    setTimeout(showBubble, 2500);
    setInterval(showBubble, 12000);

    /* ── Lead popup ── */
    if (!sessionStorage.getItem('rkPopupShown')) {
      setTimeout(function () {
        showLeadPopup();
        sessionStorage.setItem('rkPopupShown', '1');
      }, CFG.popupDelay);
    }
  }

  /* ══ ENFORCE STYLE ════════════════════════════════════════════
     Sets position via cssText every call — overwrites everything.
  ════════════════════════════════════════════════════════════ */
  var BAR_STYLE = [
    'position:fixed',
    'top:260px',
    'right:14px',
    'z-index:99999',
    'opacity:1',
    'visibility:visible',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'gap:11px',
    'pointer-events:auto',
    'will-change:transform'
  ].join('!important;') + '!important;';

  function _enforceStyle(el) {
    if (!el) return;
    /* cssText assignment beats any CSS rule — no !important in CSS can win */
    el.setAttribute('style', BAR_STYLE);
  }

  /* ══ RAF WATCHDOG — fires every browser frame (≈60 fps) ══════
     requestAnimationFrame loop means the bar is checked/restored
     before the browser paints — totally invisible to the user.
  ════════════════════════════════════════════════════════════ */
  function _rafLoop() {
    var bar = document.getElementById('rkRightBar');
    if (!bar) {
      buildBar();
    } else {
      _enforceStyle(bar);
      if (bar.parentNode !== document.body) {
        document.body.appendChild(bar);
        _enforceStyle(bar);
      }
    }
    requestAnimationFrame(_rafLoop);
  }

  /* MutationObserver — instant rebuild if bar node is removed */
  function startObserver() {
    if (typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var removed = mutations[i].removedNodes;
        for (var j = 0; j < removed.length; j++) {
          if (removed[j].id === 'rkRightBar') {
            buildBar();
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  /* ══ CHATBOT ══════════════════════════════════════════════════ */
  function openChatbot() {
    var panel = document.getElementById('rkChatPanel');
    if (panel) { panel.style.display = panel.style.display === 'none' ? 'flex' : 'none'; return; }
    panel = document.createElement('div');
    panel.id = 'rkChatPanel';
    panel.style.display = 'flex';

    var header = document.createElement('div');
    header.id = 'rkChatHeader';
    header.innerHTML = '<span>&#129302; RK Developers AI</span>' +
      '<button onclick="document.getElementById(\'rkChatPanel\').style.display=\'none\'" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;padding:0;">&#215;</button>';

    var msgs = document.createElement('div');
    msgs.id = 'rkChatMessages';

    var inputRow = document.createElement('div');
    inputRow.id = 'rkChatInputRow';
    inputRow.innerHTML = '<input id="rkChatInput" type="text" placeholder="Ask me anything..." /><button id="rkChatSend">Send</button>';

    panel.appendChild(header); panel.appendChild(msgs); panel.appendChild(inputRow);
    document.body.appendChild(panel);
    addBotMsg(msgs, 'Hello! Welcome to RK Developers. How can I help you today?',
      ['Metro Greens','RK Avenue','Pricing','Book a Site Visit','Contact Us']);

    var input = document.getElementById('rkChatInput');
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') rkChatSend(msgs, input); });
    document.getElementById('rkChatSend').addEventListener('click', function () { rkChatSend(msgs, input); });
  }

  function addBotMsg(container, html, chips) {
    var wrap = document.createElement('div');
    wrap.className = 'rk-chat-msg bot';
    wrap.innerHTML = html;
    if (chips && chips.length) {
      var row = document.createElement('div'); row.className = 'rk-chat-chips';
      chips.forEach(function (c) {
        var chip = document.createElement('button'); chip.className = 'rk-chat-chip'; chip.textContent = c;
        chip.addEventListener('click', function () { var inp = document.getElementById('rkChatInput'); if (inp) inp.value = c; rkChatSend(container, inp); });
        row.appendChild(chip);
      });
      wrap.appendChild(row);
    }
    container.appendChild(wrap); container.scrollTop = container.scrollHeight;
  }

  function addUserMsg(container, text) {
    var wrap = document.createElement('div'); wrap.className = 'rk-chat-msg user'; wrap.textContent = text;
    container.appendChild(wrap); container.scrollTop = container.scrollHeight;
  }

  function rkChatSend(msgs, input) {
    var text = (input ? input.value : '').trim(); if (!text) return;
    addUserMsg(msgs, text); if (input) input.value = '';
    var tl = text.toLowerCase(), found = null;
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].tags.length; j++) { if (tl.indexOf(KB[i].tags[j]) !== -1) { found = KB[i]; break; } }
      if (found) break;
    }
    setTimeout(function () { addBotMsg(msgs, found ? found.answer : 'Thank you! Call <strong>+91 9663108999</strong> or WhatsApp for help.', found ? found.chips : ['Call Now','WhatsApp']); }, 400);
  }

  /* ══ MESSAGE MODAL ════════════════════════════════════════════ */
  function openMessageModal() {
    if (document.getElementById('rkMsgBackdrop')) return;
    var bd = document.createElement('div'); bd.id = 'rkMsgBackdrop'; bd.className = 'rk-modal-backdrop';
    bd.innerHTML = '<div class="rk-modal-box"><button class="rk-modal-close" id="rkMsgClose">&#215;</button>' +
      '<h3 class="rk-modal-title">Send Us a Message</h3><p class="rk-modal-sub">We\'ll get back to you within 24 hours</p>' +
      '<input class="rk-modal-input" id="rkMsgName" type="text" placeholder="Your Name"/>' +
      '<input class="rk-modal-input" id="rkMsgPhone" type="tel" placeholder="Phone Number"/>' +
      '<input class="rk-modal-input" id="rkMsgEmail" type="email" placeholder="Email (optional)"/>' +
      '<textarea class="rk-modal-input" id="rkMsgText" placeholder="Your message..." style="min-height:88px;resize:none;"></textarea>' +
      '<button class="rk-modal-btn" id="rkMsgSend">Send Message</button></div>';
    document.body.appendChild(bd);
    document.getElementById('rkMsgClose').onclick = function () { bd.remove(); };
    bd.addEventListener('click', function (e) { if (e.target === bd) bd.remove(); });
    document.getElementById('rkMsgSend').onclick = function () {
      var n = (document.getElementById('rkMsgName').value || '').trim();
      var p = (document.getElementById('rkMsgPhone').value || '').trim();
      if (!n || !p) { alert('Please fill in your name and phone.'); return; }
      alert('Thank you, ' + n + '! We\'ll reach you at ' + p + ' shortly.'); bd.remove();
    };
  }

  /* ══ LEAD POPUP ═══════════════════════════════════════════════ */
  function showLeadPopup() {
    if (document.getElementById('rkLeadBackdrop')) return;
    var bd = document.createElement('div'); bd.id = 'rkLeadBackdrop'; bd.className = 'rk-modal-backdrop';
    bd.innerHTML = '<div class="rk-modal-box"><button class="rk-modal-close" id="rkLeadClose">&#215;</button>' +
      '<div style="text-align:center;font-size:38px;margin-bottom:6px;">&#127968;</div>' +
      '<h3 class="rk-modal-title">Interested in Our Projects?</h3>' +
      '<p class="rk-modal-sub">Book a <strong>FREE</strong> site visit today!</p>' +
      '<input class="rk-modal-input" id="rkLeadName" type="text" placeholder="Your Name"/>' +
      '<input class="rk-modal-input" id="rkLeadPhone" type="tel" placeholder="Phone Number"/>' +
      '<button class="rk-modal-btn" id="rkLeadSubmit">Book Free Site Visit</button>' +
      '<p style="text-align:center;font-size:11px;color:#bbb;margin:10px 0 0;">No spam, we promise!</p></div>';
    document.body.appendChild(bd);
    document.getElementById('rkLeadClose').onclick = function () { bd.remove(); };
    bd.addEventListener('click', function (e) { if (e.target === bd) bd.remove(); });
    document.getElementById('rkLeadSubmit').onclick = function () {
      var n = (document.getElementById('rkLeadName').value || '').trim();
      var p = (document.getElementById('rkLeadPhone').value || '').trim();
      if (!n || !p) { alert('Please fill in your name and phone.'); return; }
      alert('Thank you, ' + n + '! Our team will call ' + p + ' to confirm your site visit.'); bd.remove();
    };
  }

  /* ══ BOOT ════════════════════════════════════════════════════ */
  function init() {
    buildBar();
    startObserver();
    /* RAF loop — re-enforces position every single frame */
    requestAnimationFrame(_rafLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
