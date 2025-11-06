// validator.test.js
// バリデーションモジュールの単体テスト（Jest）

const validator = require('../build/validator');
const path = require('path');
const fs = require('fs');

describe('validator.js', () => {
  test('正常なJSONの検証', () => {
    // サンプルの正常なurls.json, site.jsonを使う
    const urlsPath = path.join(__dirname, '../config/urls.json');
    const sitePath = path.join(__dirname, '../config/site.json');
    const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));
    const site = JSON.parse(fs.readFileSync(sitePath, 'utf-8'));
    const result = validator.validate({ urlsPath, sitePath, urls, site });
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('不正なJSONの検証', () => {
    // 必須フィールドが抜けたデータ
    const urls = [{}];
    const site = {};
    const result = validator.validate({ urlsPath: '', sitePath: '', urls, site });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('有効なURLの検証', () => {
    expect(validator.isValidUrl('https://example.com')).toBe(true);
    expect(validator.isValidUrl('http://example.com')).toBe(true);
  });

  test('無効なURLの検証', () => {
    expect(validator.isValidUrl('ftp://example.com')).toBe(false);
    expect(validator.isValidUrl('javascript:alert(1)')).toBe(false);
  });

  test('短縮キーの検証', () => {
    expect(validator.isValidShortKey('abc-123_X')).toBe(true);
    expect(validator.isValidShortKey('!@#')).toBe(false);
    expect(validator.isValidShortKey('')).toBe(false);
    expect(validator.isValidShortKey('a'.repeat(51))).toBe(false);
  });

  test('セキュリティ検証', () => {
    expect(validator.isSafeUrl('https://safe.com')).toBe(true);
    expect(validator.isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(validator.isSafeUrl('data:text/html;base64,xxx')).toBe(false);
  });
});
