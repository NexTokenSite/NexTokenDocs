# OpenClaw 使用指南

> OpenClaw 是一款主打 Anthropic 协议的开源编程助手，可以本地运行也支持云端模式。两种部署下接入 NexToken 的方法都很轻量。

## 一、需要的两条信息

- **Base URL**：`https://www.nextoken.online
- **API Key**：`你的Key`

OpenClaw 走 Anthropic 协议，所以 **Base URL 不要带 `/v1`**。



## 二、本地（CLI / 桌面客户端）模式

### 2.1 安装

```bash
# npm 全局安装
npm install -g openclaw

# 或者下载预编译版本（见项目发布页）
```



### 2.2 配置文件

```yaml
provider:
  type: anthropic
  base_url: https://www.nextoken.online
  api_key: 你的Key

model:
  default: claude-sonnet-4-6
```

**Windows 路径为：`%USERPROFILE%\.openclaw\config.yaml`。**



### 2.3 启动

```yaml
openclaw
```

首次启动会提示信任当前目录,确认后就可以正常使用。



## 三、云端 / Web UI 模式

如果你部署了 OpenClaw 的 Web 版（自部署或社区镜像），通常在 **「设置」→「Provider」** 里就能填接入参数。

1. 进入设置页，选 **Provider 类型**：Anthropic Compatible。
2. 在 **Base URL** 填入 `https://www.nextoken.online`。
3. 在 **API Key** 填入 `你的Key`。
4. 点 **测试连接**：返回 `200 OK / Connected` 即成功。
5. 保存设置，回到对话页测试。



## 四、常见问题

**Q：测试连接返回 401？** Key 写错或者前后有空格。建议从控制台直接复制，不要手敲。

**Q：测试连接返回 404？** Base URL 写错。Nextoken的 Anthropic 兼容端点不带 `/v1`，只保留 `https://www.nextoken.online` 即可。