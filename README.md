# boku lylack 個人ページ

GitHub Pages で公開する静的サイト。

## 編集する場所

- リンク・アイコン画像・メールアドレス・作品: `src/script.js` 冒頭の設定
- 文章: `index.html`
- 色: `style.css` の `:root`

## JavaScript の難読化

公開している `script.js` は、`src/script.js` を難読化したもの。
`src/` は `.gitignore` で除外しているので、リポジトリにもページにも元のコードは載らない
（**元のコードはこの PC にしかないので、消さないよう注意**）。

```
npm install          # 初回だけ
npm run build        # src/script.js を難読化して script.js を作る
npm run build:dev    # 難読化せずにコピー (手元で確かめるとき)
```

`src/script.js` を変えたら、必ず `npm run build` してから push する。

## 公開

`main` ブランチに push すると GitHub Pages に反映される（Settings → Pages → Branch: `main` / `(root)`）。
