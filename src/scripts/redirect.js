// redirect.js: リダイレクト実行用スクリプト雛形

/**
 * 指定URLへ遅延リダイレクトを実行
 * @param {string} targetUrl - リダイレクト先URL
 * @param {number} delay - 遅延ミリ秒（デフォルト0）
 */
function redirectTo(targetUrl, delay = 0) {
  try {
    if (!targetUrl) throw new Error('リダイレクト先URLが指定されていません');
    showCountdown(delay);
    setTimeout(() => {
      sendAnalyticsEvent('redirect', targetUrl);
      window.location.href = targetUrl;
    }, delay);
  } catch (e) {
    showError(e.message);
  }
}

/**
 * カウントダウン表示
 * @param {number} delay
 */
function showCountdown(delay) {
  const msg = document.getElementById('redirect-message');
  if (!msg || delay <= 0) return;
  let sec = Math.ceil(delay / 1000);
  msg.textContent = `リダイレクトまで ${sec} 秒...`;
  const timer = setInterval(() => {
    sec--;
    if (sec > 0) {
      msg.textContent = `リダイレクトまで ${sec} 秒...`;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

/**
 * アナリティクスイベント送信（ダミー）
 */
function sendAnalyticsEvent(event, url) {
  // Google Analytics等のイベント送信処理をここに実装
  // 例: gtag('event', event, { event_category: 'redirect', event_label: url });
}

/**
 * エラー表示
 */
function showError(msg) {
  alert('リダイレクトエラー: ' + msg);
}

// オプション: 「今すぐリダイレクト」ボタン
const nowBtn = document.getElementById('redirect-now');
if (nowBtn) {
  nowBtn.addEventListener('click', () => {
    const url = nowBtn.dataset.targetUrl;
    if (url) window.location.href = url;
  });
}

// ページロード時に自動リダイレクト実行（例）
document.addEventListener('DOMContentLoaded', () => {
  const url = window.REDIRECT_TARGET_URL || (window.redirectTargetUrl);
  const delay = window.REDIRECT_DELAY || 0;
  if (url) redirectTo(url, delay);
});
