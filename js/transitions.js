/**
 * RK Developers — Page Transition v2
 * Small 180px circular overlay, bottom-left corner.
 * Plays "animation 1.mp4" on page enter and page leave.
 * Does NOT cover the screen — sits modestly in the corner.
 * IMPORTANT: Never applies transform to body/html so fixed
 * elements (widgets, navbar) always stay in place.
 */
(function () {
  'use strict';

  /* Resolve path relative to page depth */
  function assetPath(name) {
    var pathname = window.location.pathname;
    var parts = pathname.split('/').filter(function (p) { return p.length > 0; });
    if (parts.length > 0 && parts[parts.length - 1].indexOf('.') !== -1) parts.pop();
    var prefix = parts.length > 0 ? parts.map(function () { return '..'; }).join('/') + '/' : '';
    return prefix + 'assets/' + name;
  }

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '#rkTransBox{',
    '  position:fixed!important;',
    '  bottom:24px!important;',
    '  left:24px!important;',
    '  width:160px!important;',
    '  height:160px!important;',
    '  border-radius:50%!important;',
    '  overflow:hidden!important;',
    '  z-index:999998!important;',
    '  pointer-events:none!important;',
    '  opacity:0;',
    '  border:3px solid rgba(255,149,0,0.55)!important;',
    '  box-shadow:0 0 24px rgba(255,149,0,0.35),0 8px 32px rgba(0,0,0,0.28)!important;',
    '  transition:opacity .35s ease!important;',
    '}',
    '#rkTransBox.rk-t-show{opacity:1!important;}',
    '#rkTransVid{',
    '  position:absolute!important;',
    '  inset:0!important;',
    '  width:100%!important;',
    '  height:100%!important;',
    '  object-fit:cover!important;',
    '  pointer-events:none!important;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── Build the small circle overlay ── */
  var box = document.createElement('div');
  box.id = 'rkTransBox';

  var vid = document.createElement('video');
  vid.id = 'rkTransVid';
  vid.src = assetPath('animation 1.mp4');
  vid.muted = true;
  vid.setAttribute('playsinline', '');
  vid.setAttribute('preload', 'auto');

  box.appendChild(vid);

  function appendBox() {
    if (!document.getElementById('rkTransBox')) {
      document.body.appendChild(box);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendBox);
  } else {
    appendBox();
  }

  /* ── Page ENTER: show briefly then hide ── */
  function playEnter() {
    appendBox();
    vid.currentTime = 0;
    vid.play().catch(function(){});
    box.classList.add('rk-t-show');
    setTimeout(function () {
      box.classList.remove('rk-t-show');
    }, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playEnter);
  } else {
    /* Slight delay so DOM is painted first */
    setTimeout(playEnter, 80);
  }

  /* ── Page LEAVE: navigation is handled by main.js only ── */
  /* transitions.js only plays the enter animation above */

})();
