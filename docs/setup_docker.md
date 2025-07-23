# Dockerのインストール

## 公式

- https://docs.docker.com/engine/install/

## 前提条件

以下の環境を想定

- Ubuntu 24

## インストール手順

1. 既存パッケージリストの更新

```bash
sudo apt update
sudo apt upgrade -y
```

2. 競合パッケージのクリーン

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

3. Dockerリポジトリの追加

- 必要なツールのインストール

```bash
sudo apt install ca-certificates curl software-properties-common gnupg lsb-release -y
```

- 公式GPGキーの追加

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

- リポジトリの設定

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Docker Engineのインストール

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

5. 起動確認、sudo無しで実行できるように

```bash
sudo docker run hello-world
# or
sudo docker --version
```

- 確認メッセージ、またはバージョンが表示されれば成功です

```bash
sudo usermod -aG docker $USER
```

- 実行後Ubuntuターミナル、またはwslを再起動し以下のコマンドを実行

```bash
docker run hello-world
```

6. 自動起動設定

```bash
sudo vi /etc/wsl.conf
```

- 以下のようにsystemdが有効化されていることを確認

```plaintext
[boot]
systemd=true
```

- 自動起動設定を追加

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

- サービスの状態を確認

```bash
sudo systemctl status docker
```
