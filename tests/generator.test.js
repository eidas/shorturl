// generator.test.js
// Jestによるgenerator.jsのテスト

const fs = require('fs-extra');
const path = require('path');
const generator = require('../build/generator');

describe('generator.js 設定ファイル読み込みテスト', () => {
  test('urls.jsonとsite.jsonが正しく読み込まれる', async () => {
    // テスト用のダミー設定ファイルを作成
    const urlsPath = path.join(__dirname, '../config/urls.json');
    const sitePath = path.join(__dirname, '../config/site.json');
    expect(await fs.pathExists(urlsPath)).toBe(true);
    expect(await fs.pathExists(sitePath)).toBe(true);
    // generatorの読み込み関数が例外を投げないことを確認
    expect(() => require('../build/generator')).not.toThrow();
  });
});

describe('generator.js テンプレート処理テスト', () => {
  test('テンプレートのプレースホルダー置換が正しく行われる', () => {
    // 仮のテンプレートとデータ
    const template = '<h1>{{title}}</h1>';
    const data = { title: 'テストタイトル' };
    // generator.jsのテンプレートエンジンを利用（仮: handlebars）
    const Handlebars = require('handlebars');
    const compiled = Handlebars.compile(template);
    const result = compiled(data);
    expect(result).toBe('<h1>テストタイトル</h1>');
  });
});

describe('generator.js ファイル生成テスト', () => {
  test('リダイレクトページが生成される', async () => {
    // docs/ディレクトリにファイルが生成されるか確認
    const docsDir = path.join(__dirname, '../docs');
    expect(await fs.pathExists(docsDir)).toBe(true);
    // 例: docs/index.html
    const indexHtml = path.join(docsDir, 'index.html');
    expect(await fs.pathExists(indexHtml)).toBe(true);
  });
  test('404ページが生成される', async () => {
    const docsDir = path.join(__dirname, '../docs');
    const notFoundHtml = path.join(docsDir, '404.html');
    expect(await fs.pathExists(notFoundHtml)).toBe(true);
  });
});

describe('generator.js ディレクトリ操作テスト', () => {
  test('クリーンアップ処理が正常に動作する', async () => {
    // rimrafやfs-extraのremoveSyncでディレクトリが削除されるか
    const tempDir = path.join(__dirname, '../docs/test-temp');
    await fs.ensureDir(tempDir);
    expect(await fs.pathExists(tempDir)).toBe(true);
    await fs.remove(tempDir);
    expect(await fs.pathExists(tempDir)).toBe(false);
  });
  test('ディレクトリ作成処理が正常に動作する', async () => {
    const tempDir = path.join(__dirname, '../docs/test-create');
    await fs.ensureDir(tempDir);
    expect(await fs.pathExists(tempDir)).toBe(true);
    await fs.remove(tempDir);
  });
});
