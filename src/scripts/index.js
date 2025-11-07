// index.js: トップページ用クライアントサイドスクリプト雛形

/**
 * URL一覧のクライアントサイド検索・フィルター・ソート機能
 */
document.addEventListener('DOMContentLoaded', () => {
  // URLsデータの取得
  let urls = [];
  try {
    const data = document.getElementById('urls-data');
    if (data) {
      urls = JSON.parse(data.textContent);
    }
  } catch (e) {
    // データ取得失敗時
    console.error('URLデータの読み込みに失敗しました', e);
  }

  // 検索フィルターUI
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.trim().toLowerCase();
      renderList(urls, keyword);
    });
  }

  // 初期表示
  renderList(urls, '');
});

/**
 * URL一覧の描画
 * @param {Array} urls - URLデータの配列
 * @param {string} keyword - フィルタリング用のキーワード
 * @returns {void}
 */
function renderList(urls, keyword) {
  const listArea = document.getElementById('url-list');
  if (!listArea) return;
  let filtered = urls;
  if (keyword) {
    filtered = urls.filter(item =>
      (item.key && item.key.toLowerCase().includes(keyword)) ||
      (item.url && item.url.toLowerCase().includes(keyword)) ||
      (item.description && item.description.toLowerCase().includes(keyword))
    );
  }
  // ソート例: キー順
  filtered.sort((a, b) => (a.key > b.key ? 1 : -1));
  // 一覧HTML生成
  listArea.innerHTML = '<ul>' + filtered.map(item =>
    `<li><a href="${item.url}">${item.key}</a> - ${item.description || ''}</li>`
  ).join('') + '</ul>';
}

// タグフィルター・コピー・QRコード等は必要に応じて追加
