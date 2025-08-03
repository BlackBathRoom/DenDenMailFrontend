#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "エラー: コンポーネント名を指定してください。"
  echo "使用方法: make gen-story name=<コンポーネント名> [ext=<拡張子>]"
  echo "例:"
  echo "  make gen-story name=Card"
  echo "  make gen-story name=Card ext=tsx"
  exit 1
fi

SCRIPT_PATH=$(cd $(dirname "$0") && pwd)

COMPONENT="$1"
EXTENSION="${2:-ts}"  # デフォルトは 'ts'

# 拡張子の検証（ts または tsx のみ許可）
if [ "$EXTENSION" != "ts" ] && [ "$EXTENSION" != "tsx" ]; then
  echo "エラー: 拡張子は 'ts' または 'tsx' を指定してください。"
  exit 1
fi

UI_DIR="$SCRIPT_PATH/../src/components/ui/$COMPONENT"
LAYOUT_DIR="$SCRIPT_PATH/../src/components/layout/$COMPONENT"
UI_COMP_PATH="$UI_DIR/index.tsx"
LAYOUT_COMP_PATH="$LAYOUT_DIR/index.tsx"
TEMPLATE="$SCRIPT_PATH/template/StoryTemplate.stories.ts"

# 1. uiまたはlayoutディレクトリでコンポーネントが存在するかを確認
if [ -f "$UI_COMP_PATH" ]; then
  DIR="$UI_DIR"
  COMP_PATH="$UI_COMP_PATH"
  TYPE="ui"
elif [ -f "$LAYOUT_COMP_PATH" ]; then
  DIR="$LAYOUT_DIR"
  COMP_PATH="$LAYOUT_COMP_PATH"
  TYPE="layout"
else
  echo "エラー: $COMPONENT コンポーネントが見つかりません。"
  echo "以下のいずれかのパスに index.tsx が存在する必要があります:"
  echo "  - $UI_COMP_PATH"
  echo "  - $LAYOUT_COMP_PATH"
  exit 1
fi

STORY_PATH="$DIR/$COMPONENT.stories.$EXTENSION"

# 2. ディレクトリ名と同名のデフォルトエクスポートを確認
if ! grep -Eq "export default (function|const|class|\\(.*\\) =>|\\(\\) =>) $COMPONENT|export default $COMPONENT;" "$COMP_PATH"; then
  echo "ディレクトリ名($COMPONENT)と同名のコンポーネントがデフォルトエクスポートされていません。処理を終了します。"
  exit 1
fi

# 3. storiesファイルが存在しないことを確認
if [ -e "$STORY_PATH" ]; then
  echo "$STORY_PATH は既に存在します。処理を終了します。"
  exit 1
fi

sed -e "s/__COMPONENT__/$COMPONENT/g" -e "s/__TYPE__/$TYPE/g" "$TEMPLATE" > "$STORY_PATH"
echo "$STORY_PATH を作成しました。"
