# コンポーネント設計

## ディレクトリ構成

- 汎用的なコンポーネントは `[project_root]/src/components` に配置
  - `layout`と `ui` のサブディレクトリを使用
    - `layout` はページ全体のレイアウトに関するコンポーネント
    - `ui` は再利用可能なUIコンポーネント
- 特定のページに依存するコンポーネントは `[project_root]/src/pages/[page_name]/components` に配置

## コンポーネントの構成

- コンポーネント名のディレクトリを作成します。
- 本体を`index.tsx`として配置します。
- 必要に応じて同一ディレクトリにスタイルシートやストーリーファイルを配置します。

```
ComponentName/
├── index.tsx
└── ComponentName.stories.tsx (オプション)
```

## 記述方法

- アロー関数で記述してください。
- コンポーネントの受け取る型を宣言する際は、`Props`という名前の型エイリアスを使用してください。
- `default export`を使用してください。

```tsx
type Props = {
  // プロパティの型定義
  propName: string;
};

const ComponentName: React.FC<Props> = ({ propName }) => {
  return <div>{/* コンポーネントの内容 */}</div>;
};

export default ComponentName;
```
