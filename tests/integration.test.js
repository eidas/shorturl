// integration.test.js (エンドツーエンドビルドテスト)
// Jestによる統合テスト

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

describe('エンドツーエンドビルドテスト', () => {
  const docsDir = path.join(__dirname, '../docs');
  beforeAll(() => {
    // ビルド前にdocsディレクトリをクリーンアップ
    if (fs.existsSync(docsDir)) {
      fs.removeSync(docsDir);
    }
  });

  test('サンプル設定でのフルビルド', () => {
    // npm run build を実行
    execSync('npm run build', { stdio: 'inherit' });
    expect(fs.existsSync(docsDir)).toBe(true);
  });

  test('生成ファイルの存在確認', () => {
    expect(fs.existsSync(path.join(docsDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(docsDir, '404.html'))).toBe(true);
    // サンプル短縮キーのディレクトリが存在するか（例: "sample"）
    // 必要に応じてurls.jsonから取得して確認
  });

  test('HTMLの妥当性チェック', () => {
    const indexHtml = fs.readFileSync(path.join(docsDir, 'index.html'), 'utf8');
    expect(indexHtml).toMatch(/<html[\s\S]*<\/html>/);
    const notFoundHtml = fs.readFileSync(path.join(docsDir, '404.html'), 'utf8');
    expect(notFoundHtml).toMatch(/<html[\s\S]*<\/html>/);
  });
});
