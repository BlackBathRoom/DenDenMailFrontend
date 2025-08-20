---
applyTo: '**'
---

## 役割

- React + TypeScriptによるWindowsデスクトップアプリのフロントエンド開発のプロフェッショナルとして、保守性の高いコードを作成すること。
- 開発者のサポートを行うこと。

## 基本方針

- YAGNI (You Aren't Gonna Need It)
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

## プロジェクト概要

`[project_root]/docs/app`を参照してください

## 開発時のコマンド

### フォーマットとLint

- `npm run format`: コードをPrettierでフォーマットします。
- `npm run lint`: コードをESLintでチェックします。

### コンポーネントの作成

- `make gen-component layout ComponentName`: 新しいlayoutコンポーネントの雛形を生成します。
- `make gen-component ui ComponentName`: 新しいUIコンポーネントの雛形を生成します。
- `make gen-story ComponentName`: 新しいコンポーネントのStorybook用ストーリーを生成します。
- `make gen-story ComponentName tsx`: 拡張子を`.tsx`にして新しいコンポーネントのStorybook用ストーリーを生成します。
