# IELTS Learning Assistant

A local-first browser extension for capturing IELTS learning material while
practising on websites such as online mock-test and intensive-listening
platforms.

## Current milestone

The first product shell replaces the starter popup with a native browser side
panel.

It currently supports:

- opening the side panel from the extension toolbar icon;
- showing the current page title and URL;
- capturing selected text from normal web pages;
- recording notes, error reasons, and IELTS skill tags;
- saving notes in the browser's local extension storage;
- reviewing recent notes in a lightweight library.

## Development

```bash
npm install
npm run dev
```

For an Edge-targeted development build:

```bash
npm run dev -- -b edge
```

Validation commands:

```bash
npm run compile
npm run build
```

## Privacy

Version 0.1 stores learning notes locally in the browser. It does not upload
notes or connect to an AI service.

---

# 日常维护与 GitHub 推送备忘

本项目由仓库所有者直接在 `main` 分支推进，不使用额外功能分支。为了避免多设备、VPN 和多 GitHub 账号造成同步问题，每次开发都应遵循以下固定流程。

## 1. 每次开始开发前

先进入项目目录：

```powershell
cd C:\Users\yulia\Desktop\itel
```

检查本地状态：

```powershell
git status
```

拉取云端最新版本：

```powershell
git pull --ff-only
```

`--ff-only` 的含义是：只有在不会制造额外合并提交时才更新。如果另一台设备已经产生不同提交，Git 会停止并提示，而不是擅自合并。

理想输出：

```text
Already up to date.
```

或正常显示从云端拉取到的新提交。

## 2. 开发和测试流程

启动开发环境：

```powershell
npm.cmd run dev
```

代码修改完成后，至少运行：

```powershell
npm.cmd run compile
npm.cmd run build
```

只有在以下三项都通过后，才提交：

```text
npm run dev      浏览器实测通过
npm run compile  TypeScript 检查通过
npm run build    WXT 生产构建通过
```

不要因为看到 `npm audit` 的漏洞提醒就直接运行：

```powershell
npm audit fix --force
```

强制升级可能破坏 WXT、Vite 或 React 的版本兼容。漏洞应单独评估后再处理。

## 3. 每次结束开发时

查看改动：

```powershell
git status
git diff --stat
```

提交：

```powershell
git add .
git commit -m "本次改动说明"
```

推送：

```powershell
git push
```

最后再次检查：

```powershell
git status
```

理想结果：

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

只有出现上述结果，才表示本地与 GitHub 云端完全同步。

## 4. 当前仓库的稳定网络配置

本机 VPN 的 HTTP 代理端口为：

```text
127.0.0.1:7890
```

当前仓库使用以下本地 Git 配置：

```powershell
git config --local http.proxy http://127.0.0.1:7890
git config --local https.proxy http://127.0.0.1:7890
git config --local http.version HTTP/1.1
```

检查配置：

```powershell
git config --local --get http.proxy
git config --local --get https.proxy
git config --local --get http.version
```

理想输出：

```text
http://127.0.0.1:7890
http://127.0.0.1:7890
HTTP/1.1
```

如果以后 VPN 端口发生变化，例如改为 `7897`，只需要更新：

```powershell
git config --local http.proxy http://127.0.0.1:7897
git config --local https.proxy http://127.0.0.1:7897
```

## 5. 多 GitHub 账号配置

本机同时使用：

```text
Serena-Ping
orange-lee-tech
```

本项目属于：

```text
Serena-Ping/ielts-learning-assistant
```

为了避免凭据串号，使用：

```powershell
git config --global credential.https://github.com.useHttpPath true
```

当前仓库的远程地址应明确包含 `Serena-Ping`：

```powershell
git remote set-url origin https://Serena-Ping@github.com/Serena-Ping/ielts-learning-assistant.git
```

检查：

```powershell
git remote -v
```

理想结果：

```text
origin  https://Serena-Ping@github.com/Serena-Ping/ielts-learning-assistant.git (fetch)
origin  https://Serena-Ping@github.com/Serena-Ping/ielts-learning-assistant.git (push)
```

注意：

```text
git config user.name
git config user.email
```

只决定提交记录中的作者姓名和邮箱，不会切换 GitHub 登录账号。

## 6. 推送失败时的排查顺序

遇到问题时，不要立刻重新 `git add`、重新 `git commit` 或执行强制推送。先按照下面顺序判断。

### 6.1 确认本地提交是否安全

```powershell
git status
git log --oneline -3
```

如果看到：

```text
Your branch is ahead of 'origin/main' by 1 commit.
```

说明提交已经安全保存在本机，只是尚未上传。

不要重复提交。

### 6.2 检查 VPN 本地代理端口

```powershell
Test-NetConnection 127.0.0.1 -Port 7890
```

正常结果：

```text
TcpTestSucceeded : True
```

如果是 `False`：

1. 完全退出 VPN；
2. 重新打开 VPN；
3. 确认系统代理已启用；
4. 检查 VPN 当前端口是否仍为 `7890`；
5. 必要时更换节点或开启 TUN 模式。

### 6.3 检查代理是否能访问 GitHub

```powershell
curl.exe -x http://127.0.0.1:7890 --http1.1 -I https://github.com
```

正常结果会包含：

```text
HTTP/1.1 200 Connection established
HTTP/1.1 200 OK
```

如果这一步失败，问题在 VPN 或节点线路，而不是 Git 仓库。

### 6.4 检查 Git 是否能读取远程仓库

```powershell
git ls-remote origin
```

正常结果会显示：

```text
<commit-sha> HEAD
<commit-sha> refs/heads/main
```

如果 `curl` 成功但 `git ls-remote` 失败，检查 Git 代理：

```powershell
git config --show-origin --get-regexp "http\..*proxy|https\..*proxy|remote\.origin\.proxy|http\.version"
```

### 6.5 常见报错对照

#### A. 无法连接或连接被重置

```text
Could not connect to github.com
Connection was reset
Empty reply from server
```

处理：

```powershell
Test-NetConnection 127.0.0.1 -Port 7890
curl.exe -x http://127.0.0.1:7890 --http1.1 -I https://github.com
git ls-remote origin
```

#### B. 登录了错误账号

```text
Permission to Serena-Ping/ielts-learning-assistant.git denied to orange-lee-tech
```

说明 Git 使用了错误的账号凭据。

清除 GitHub 凭据：

```powershell
"protocol=https`nhost=github.com`n" | git credential-manager erase
```

然后重新推送：

```powershell
git push
```

浏览器弹出认证时，必须选择：

```text
Serena-Ping
```

若仍未弹出，可进入：

```text
控制面板
→ 用户账户
→ 凭据管理器
→ Windows 凭据
```

删除与 `github.com`、`git:https://github.com` 或错误账号相关的 GitHub 凭据，然后重新认证。

#### C. 仓库被归档

```text
This repository was archived so it is read-only.
```

进入 GitHub：

```text
Repository
→ Settings
→ General
→ Danger Zone
→ Unarchive this repository
```

取消归档后再执行：

```powershell
git push
```

可通过 GitHub API 检查：

```powershell
$repo = curl.exe -x http://127.0.0.1:7890 -s https://api.github.com/repos/Serena-Ping/ielts-learning-assistant | ConvertFrom-Json
$repo.archived
```

必须显示：

```text
False
```

#### D. 远程有新提交

```text
rejected
non-fast-forward
```

不要使用：

```powershell
git push --force
```

先执行：

```powershell
git pull --ff-only
```

如果仍失败，说明本地与云端存在不同提交，需要先比较提交历史，不要强行覆盖云端。

#### E. PowerShell 把提示符当成命令

不要复制：

```text
PS C:\Users\yulia\Desktop\itel>
```

真正需要输入的只有后面的命令。

同样，不要把 Git 输出中的：

```text
fatal:
remote:
```

再次粘贴到 PowerShell。

## 7. 新设备恢复项目

在新设备上：

```powershell
git -c http.version=HTTP/1.1 clone https://github.com/Serena-Ping/ielts-learning-assistant.git itel
cd .\itel
npm.cmd install
npm.cmd run compile
npm.cmd run build
npm.cmd run dev
```

如果需要使用 VPN 代理：

```powershell
git config --local http.proxy http://127.0.0.1:7890
git config --local https.proxy http://127.0.0.1:7890
git config --local http.version HTTP/1.1
```

## 8. 禁止操作

没有明确判断原因前，不要执行：

```powershell
git push --force
git reset --hard
git clean -fd
Remove-Item .git -Recurse -Force
npm audit fix --force
```

这些命令可能覆盖提交、删除未跟踪文件、破坏仓库历史或引入依赖兼容问题。

## 9. 最简日常口诀

```text
开始工作：git status → git pull --ff-only
完成代码：npm run compile → npm run build → 浏览器实测
结束工作：git add . → git commit → git push → git status
推送失败：先检查 127.0.0.1:7890，再检查账号，不要重新提交或强制推送
```
