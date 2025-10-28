# 短縮URLサービス仕様書

## 概要
GitHub Pages上で動作する静的な短縮URLサービス

## 目的
- GitHubの無料ホスティング機能を活用した短縮URLの提供
- サーバーレスでメンテナンスコストを最小化
- シンプルで使いやすいURL短縮サービスの実現

## 技術要件

### プラットフォーム
- **ホスティング**: GitHub Pages
- **実装方式**: 静的サイト生成
- **リダイレクト方法**: HTML meta refreshまたはJavaScriptによるリダイレクト

### 必須機能

#### 1. URL短縮とリダイレクト
- 短縮URL（例: `https://username.github.io/shorturl/abc123`）にアクセスすると、登録された完全なURLにリダイレクトする
- リダイレクトは可能な限り高速に実行される
- リダイレクト時の待機時間は最小限（0-1秒程度）

#### 2. URL管理
- 短縮URLと完全URLのマッピングを管理
- マッピングデータは設定ファイル（JSON/YAML）で管理
- 短縮キー（識別子）のカスタマイズが可能

#### 3. エラーハンドリング
- 存在しない短縮URLへのアクセス時は404ページを表示
- 404ページには利用可能な短縮URLのリストまたはホームページへのリンクを表示

### オプション機能

#### 1. 統計・分析
- GitHub Pagesの制約上、リアルタイム統計は不可
- Google Analyticsなどの外部サービス統合による基本的なアクセス解析

#### 2. 管理インターフェース
- 新規短縮URLの追加手順を説明するドキュメント
- 短縮URLリストの一覧ページ

#### 3. カスタムドメイン対応
- GitHub Pagesのカスタムドメイン機能を活用
- 独自ドメインでの短縮URLサービス提供

## データ構造

### URL マッピング設定ファイル
```
{
  "短縮キー": {
    "url": "完全なURL",
    "description": "説明（オプション）",
    "created": "作成日時（オプション）"
  }
}
```

### ディレクトリ構造案
```
/
├── index.html          # トップページ（短縮URLリスト表示）
├── 404.html            # エラーページ
├── config/
│   └── urls.json       # URLマッピング設定
├── [短縮キー]/
│   └── index.html      # リダイレクトページ
└── assets/
    ├── css/
    └── js/
```

## 運用フロー

### 新規短縮URL追加プロセス
1. `config/urls.json` に新しいマッピングを追加
2. ビルドスクリプトを実行して各短縮URLのディレクトリとHTMLファイルを生成
3. GitHubリポジトリにコミット・プッシュ
4. GitHub Pagesが自動的にデプロイ

### ビルドプロセス
- 設定ファイルを読み込み
- 各短縮URLに対応するディレクトリとリダイレクトHTMLを自動生成
- インデックスページを生成

## 制約事項

### GitHub Pagesの制限
- 動的なサーバーサイド処理は不可
- データベースの使用は不可
- リアルタイムのアクセスカウントは不可
- リポジトリサイズ上限: 1GB推奨
- 帯域幅制限: 月100GB（ソフトリミット）

### セキュリティ考慮事項
- リダイレクト先URLのバリデーション（悪意のあるサイトへのリダイレクト防止）
- 短縮キーの衝突チェック
- HTTPSの強制（GitHub Pagesのデフォルト機能）

## リダイレクト実装方式の選択肢

### 方式1: HTML Meta Refresh
```html
<meta http-equiv="refresh" content="0;url=完全なURL">
```
**メリット**: シンプル、JavaScriptなしで動作  
**デメリット**: SEO的に推奨されない、一部ブラウザで警告が出る可能性

### 方式2: JavaScript リダイレクト
```javascript
window.location.href = "完全なURL";
```
**メリット**: 即座にリダイレクト可能  
**デメリット**: JavaScriptが無効な環境では動作しない

### 方式3: ハイブリッド
Meta RefreshとJavaScriptの両方を実装  
**メリット**: 最大限の互換性  
**デメリット**: やや複雑

## 推奨実装方針
- **リダイレクト方式**: ハイブリッド（JavaScript + Meta Refresh フォールバック）
- **設定ファイル形式**: JSON（パース容易性とGitHub Actionsとの親和性）
- **ビルドツール**: Node.js スクリプトまたはPythonスクリプト
- **CI/CD**: GitHub Actions（プッシュ時の自動ビルド・デプロイ）

## 将来的な拡張案
- QRコード生成機能
- 有効期限付き短縮URL
- パスワード保護されたURL
- 複数の宛先へのランダムリダイレクト（A/Bテスト用）
- OGPタグ設定によるSNSシェア最適化

## 参考情報
- GitHub Pages ドキュメント: https://docs.github.com/pages
- GitHub Pagesの制限: https://docs.github.com/pages/getting-started-with-github-pages/about-github-pages#usage-limits
