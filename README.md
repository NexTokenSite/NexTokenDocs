# NextTokenDocs

[NextToken](https://www.nexttoken.online) 的用户与开发者文档站,基于 [VitePress](https://vitepress.dev/),通过 GitHub Actions 自动部署到 [docs.nexttoken.online](https://docs.nexttoken.online)。

## 目录结构

```
.
├── docs/                     VitePress srcDir
│   ├── .vitepress/
│   │   ├── config.ts         站点 + sidebar 配置
│   │   └── theme/            主题扩展(品牌色 + 复制 Markdown 按钮)
│   ├── public/CNAME          自定义域名 docs.nexttoken.online
│   ├── index.md              首页
│   ├── docs/                 快速开始 + FAQ
│   ├── nexttoken/            平台功能(Key、计费、邀请返利)
│   ├── agents/               编码代理(Claude Code、Codex、CC-Switch、Hermes、OpenCode)
│   ├── chatbot/              聊天客户端(Cherry Studio、RikkaHub)
│   └── tos/                  使用政策
├── scripts/copy-md.mjs       构建后把源 .md 拷到 dist,供"复制 Markdown"按钮 fetch
├── package.json
└── pnpm-lock.yaml
```

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # 产物在 docs/.vitepress/dist
pnpm preview      # 本地预览构建产物
```

## 部署

`.github/workflows/docs-deploy.yml` 监听 main 分支的 push,自动构建并发布到 GitHub Pages。

## 写作约定

- 文档间内链使用绝对 URL 指向自身子域:`https://docs.nexttoken.online/<path>`(不带 `.md` 后缀,VitePress 渲染成 `.html`)
- 指向主站功能页的链接保留 `https://www.nexttoken.online/<path>`(如 `/keys`、`/usage`、`/v1/...`)
- 每篇文档顶部由主题自动注入"复制 Markdown"按钮,无需手动添加
