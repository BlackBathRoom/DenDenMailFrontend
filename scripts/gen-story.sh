#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "エラー: コンポーネント名を指定してください。"
  exit 1
fi

SCRIPT_PATH=$(cd $(dirname "$0") && pwd)

COMPONENT="$1"
DIR="$SCRIPT_PATH/../src/components/$COMPONENT"
COMP_PATH="$DIR/index.tsx"
STORY_PATH="$DIR/$COMPONENT.stories.ts"
TEMPLATE="$SCRIPT_PATH/template/StoryTemplate.stories.ts"

# 1. index.tsxであることを確認
if [ ! -f "$COMP_PATH" ]; then
  echo "$COMP_PATH が存在しません。処理を終了します。"
  exit 1
fi

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

sed "s/__COMPONENT__/$COMPONENT/g" "$TEMPLATE" > "$STORY_PATH"
echo "$STORY_PATH を作成しました。"