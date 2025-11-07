// analytics.js: Google Analytics等の初期化・イベント送信用スクリプト雛形

/**
 * Google Analyticsの初期化
 * @param {string} trackingId - トラッキングID
 * @returns {void}
 */
function initAnalytics(trackingId) {
  if (!trackingId) return;
  if (window.gtag) return; // 既に初期化済み
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', trackingId, { 'anonymize_ip': true });
}

/**
 * ページビュー送信
 * @returns {void}
 */
function sendPageView() {
  if (typeof gtag === 'function') {
    gtag('event', 'page_view');
  }
}

/**
 * カスタムイベント送信
 * @param {string} eventName - イベント名
 * @param {object} params - イベントパラメータ
 * @returns {void}
 */
function sendCustomEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

// プライバシー設定・Cookie同意管理（オプション）
// ...必要に応じて実装...

// 条件付き読み込み例（site.jsonの設定に基づく）
document.addEventListener('DOMContentLoaded', () => {
  const trackingId = window.GA_ID || null;
  if (trackingId) {
    initAnalytics(trackingId);
    sendPageView();
  }
});
