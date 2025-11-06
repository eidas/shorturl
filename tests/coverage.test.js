// coverage.test.js
// Jestカバレッジレポート設定のテスト

describe('テストカバレッジの確認', () => {
  test('Jestカバレッジレポートが生成される', () => {
    // 実際のカバレッジ生成はnpm scriptで行うため、ここではスクリプトの存在を確認
    const pkg = require('../package.json');
    expect(pkg.scripts).toHaveProperty('coverage');
    expect(pkg.scripts.coverage).toMatch(/jest --coverage/);
  });
});
