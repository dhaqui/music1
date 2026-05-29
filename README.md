# 礼儀正しく壊れていきます

歌詞と音符が同期して流れる、ブラウザ再生型の音楽ビジュアライザーです。

## Renderで公開する

1. このフォルダの中身をGitHubリポジトリにアップロードします。
2. Renderで「New +」から「Blueprint」を選び、このリポジトリを接続します。
3. `render.yaml` が読み込まれたら、そのまま作成します。

静的サイトなので、ビルドコマンドは不要です。

Web Serviceとして作る場合は、以下を指定します。

- Build Command: `npm install`
- Start Command: `npm start`
