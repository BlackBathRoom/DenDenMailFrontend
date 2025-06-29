#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "エラー: コンポーネント名を指定してください。"
  exit 1
fi

SCRIPT_PATH=$(cd $(dirname "$0") && pwd)

COMPONENT="$1"
DIR="$SCRIPT_PATH/../src/components/$COMPONENT"
TEMPLATE="$SCRIPT_PATH/template/index.tsx"

mkdir -p "$DIR"

sed "s/__COMPONENT__/$COMPONENT/g" "$TEMPLATE" > "$DIR/index.tsx"
echo "$DIR を作成しました。"