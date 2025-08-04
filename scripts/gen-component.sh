#!/bin/bash

set -e

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "使用方法: gen-component <type> <name>"
  echo "  type: ui または layout"
  echo "  name: コンポーネント名"
  echo "例:"
  echo "  make gen-component type=ui name=Button"
  echo "  make gen-component type=layout name=Header"
  exit 1
fi

TYPE="$1"
COMPONENT="$2"

if [ "$TYPE" != "ui" ] && [ "$TYPE" != "layout" ]; then
  echo "エラー: type は 'ui' または 'layout' を指定してください。"
  exit 1
fi

SCRIPT_PATH=$(cd $(dirname "$0") && pwd)

if [ "$TYPE" = "ui" ]; then
  DIR="$SCRIPT_PATH/../src/components/ui/$COMPONENT"
else
  DIR="$SCRIPT_PATH/../src/components/layout/$COMPONENT"
fi

TEMPLATE="$SCRIPT_PATH/template/index.tsx"

mkdir -p "$DIR"

sed "s/__COMPONENT__/$COMPONENT/g" "$TEMPLATE" > "$DIR/index.tsx"
echo "$DIR/index.tsx を作成しました。"
