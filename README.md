# AI App Frontend テンプレート

このREADMEはAIによって自動生成されました

---

## 概要

このリポジトリは、React・TypeScript・Vite をベースとしたフロントエンドアプリケーションのテンプレートです。開発の初期セットアップや、プロジェクトの雛形としてご利用いただけます。

- devcontainer（開発用コンテナ）設立済み
- Node.js v22.x 系対応
- 主要パッケージのバージョンは下記参照

## 主なバージョン情報（package.jsonより抜粋）

- Node.js: 22（devcontainer想定）
- TypeScript: 5
- Vite: 7
- React: 19
- TailwindCSS: 4

## 前提

下記がインストール、設定済みであることを確認します。

エディタはvsCodeを推奨します。

### devcontainer使用の場合

- wsl 2（Windowsの場合）
  - [インストール手順](docs/setup_wsl.md)
- Docker
  - [インストール手順](docs/setup_docker.md)
- vsCode
  - 拡張機能
    - [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### devcontainer未使用の場合

- nodejs 22

## クローン手順（SSH/Bash）

- 事前にwsl上でsshキーの取得を行ってください。
  - [取得方法](docs/setup_sshkey.md)

```bash
# リポジトリをSSHでクローン
git clone git@github.com:BlackBathRoom/DenDenMailFrontend.git
cd DenDenMailFrontend
code .
```

## Dev Containerで開く

- `Shift` + `Ctrl` + `p` をクリック
- コマンドパレットが開くので`reopen in container`と入力
- `Dev Containers: Reopen in Container`を選択

> [!NOTE]
> 初回はビルド時間がかかるためすぐに開きません

## セットアップ

```bash
npm install
```

- **DevContainerを使用する場合は自動で実行されます**

## 開発サーバー起動

```bash
npm run dev
```

## Lint・フォーマット

```bash
npm run lint
npm run format
```

## Storybook

```bash
npm run storybook
```

## コンポーネント/ストーリー自動生成

Makefile から以下のコマンドで雛形を生成できます。

```bash
make gen-component name=ComponentName
make gen-story name=ComponentName
```

## ディレクトリ構成

```
/app
├── public/                # 静的アセット
├── scripts/               # 開発用スクリプト・テンプレート
│   └── template/          # コンポーネント/ストーリーの雛形
├── src/                   # アプリ本体
│   ├── assets/            # 画像等アセット
│   ├── components/        # UIコンポーネント
│   ├── pages/             # ページコンポーネント
│   ├── routes/            # ルーティング
│   ├── stories/           # Storybook用サンプル
│   └── styles/            # グローバルCSS
├── .storybook/            # Storybook 設定
├── eslint.config.js       # ESLint 設定
├── prettier.config.js     # Prettier 設定
├── tsconfig*.json         # TypeScript 設定
├── vite.config.ts         # Vite 設定
├── Makefile               # 開発用コマンド
└── README.md              # このファイル
```

## 注意事項

- `src/stories` 配下はビルド・Lint 対象外です。
- `scripts/template` 配下もLint・ビルド対象外です。
- Storybook 用のサンプルやテンプレートは本番コードに含まれません。
- devcontainer（開発用コンテナ）環境での動作を前提としています。

---

このテンプレートを活用して、独自のフロントエンドアプリ開発をスムーズに始めましょう！
