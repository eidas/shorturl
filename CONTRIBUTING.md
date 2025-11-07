# CONTRIBUTING

## 貢献ガイドライン
このプロジェクトへの貢献を歓迎します！以下のガイドラインに従ってください。

## プルリクエストの手順
1. リポジトリをフォークします。
2. 新しいブランチを作成します。
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. 必要な変更を行い、コミットします。
   ```bash
   git commit -m "説明的なコミットメッセージ"
   ```
4. リモートリポジトリにプッシュします。
   ```bash
   git push origin feature/your-feature-name
   ```
5. プルリクエストを作成します。

## コーディング規約
- コードは読みやすく、コメントを適切に追加してください。
- インデントはスペース2つを使用してください。
- 変数名はキャメルケースを使用してください。

## コミットメッセージ規約
- コミットメッセージは簡潔で明確にしてください。
- 以下のフォーマットを推奨します：
  ```
  タイプ: 簡単な説明

  詳細な説明（必要に応じて）
  ```
  - タイプ例: feat, fix, docs, style, refactor, test, chore

## 開発環境のセットアップ
1. リポジトリをクローンします。
   ```bash
   git clone https://github.com/eidas/shorturl.git
   ```
2. 必要な依存関係をインストールします。
   ```bash
   npm install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm start
   ```