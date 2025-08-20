# コンポーネント設計

## ディレクトリ構成

- 汎用的なコンポーネントは `[project_root]/src/components` に配置
  - `layout`と `ui` のサブディレクトリを使用
    - `layout` はページ全体のレイアウトに関するコンポーネント
    - `ui` は再利用可能なUIコンポーネント
- 特定のページに依存するコンポーネントは `[project_root]/src/pages/[page_name]/components` に配置
