# Setup SSH Key

## 公式

- https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

## 手順

1. sshKeyの作成

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

2. GitHubに登録

- 以下を実行し、実行結果をコピー

```bash
# 保存ディレクトリを変更した場合はそちらを指定
cat ~/.ssh/id_ed25519.pub
```

- [SSH Key 設定ページ](https://github.com/settings/keys)に移動
- `New SSH key`をクリック
  - Titleには好きな名前を設定
  - Keyには先ほどの実行結果を貼り付け

- 以下コマンドで接続確認

```bash
ssh -T git@github.com
# 成功するとこのメッセージが返ってきます
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

> [!NOTE]
> 以下はDevContainer上からsshでgitを操作するための設定です。
> 必要に応じて設定してください。

3. ssh-agentに登録

- インストール

```bash
sudo apt install openssh-client socat
```

- 登録

```bash
eval `ssh-agent`
ssh-add ~/.ssh/id_rsa
```

4. keychainの導入

- インストール

```bash
sudo apt install keychain
```

- 設定

```bash
/usr/bin/keychain -q --nogui $HOME/.ssh/id_ed25519 # 保存ディレクトリを変更した場合はそちらを指定
source $HOME/.keychain/$(hostname)-sh
```
