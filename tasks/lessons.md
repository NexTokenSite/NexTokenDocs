## 2026-06-16

- Failure mode: 新增 `docs/agents/openclaw.md` 后只提交了页面文件，没有同步更新 VitePress Agents 侧栏导航。
- Detection signal: 用户指出 agent 栏没有 OpenClaw 导航入口。
- Prevention rule: 新增文档页面时必须同时检查 `docs/.vitepress/config.ts` 的 sidebar/nav 配置，并在构建前确认新页面有可达入口。
