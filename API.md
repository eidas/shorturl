# API Reference

## validator.js API

### validateUrl(url)
- **Description**: Validates the given URL.
- **Parameters**:
  - `url` (string): The URL to validate.
- **Returns**: (boolean) `true` if the URL is valid, otherwise `false`.
- **Example**:
  ```javascript
  const isValid = validateUrl('https://example.com');
  console.log(isValid); // true
  ```

### validateConfig(config)
- **Description**: Validates the configuration object.
- **Parameters**:
  - `config` (object): The configuration object to validate.
- **Returns**: (boolean) `true` if the configuration is valid, otherwise `false`.
- **Example**:
  ```javascript
  const isValid = validateConfig({ key: 'value' });
  console.log(isValid); // true
  ```

## generator.js API

### generateShortUrl(originalUrl)
- **Description**: Generates a short URL for the given original URL.
- **Parameters**:
  - `originalUrl` (string): The original URL to shorten.
- **Returns**: (string) The generated short URL.
- **Example**:
  ```javascript
  const shortUrl = generateShortUrl('https://example.com');
  console.log(shortUrl); // e.g., 'https://short.url/abc123'
  ```

### generateCustomAlias(originalUrl, alias)
- **Description**: Generates a short URL with a custom alias.
- **Parameters**:
  - `originalUrl` (string): The original URL to shorten.
  - `alias` (string): The custom alias to use.
- **Returns**: (string) The generated short URL with the custom alias.
- **Example**:
  ```javascript
  const shortUrl = generateCustomAlias('https://example.com', 'myalias');
  console.log(shortUrl); // e.g., 'https://short.url/myalias'
  ```

## 関数・クラスの詳細説明

### 共通事項
- すべての関数はエラー時に例外をスローします。
- 非同期処理は`Promise`を返します。