// 扩展 VitePress 默认主题:
//   1. 引入 custom.css 做品牌色与组件样式覆盖
//   2. Layout slot 'doc-before' 注入"复制 Markdown"按钮(仅文档页生效)
//   3. 全局注册 <DocsTabs> / <DocsTab> 给 markdown 直接使用
import { h, type App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import CopyMarkdownButton from './CopyMarkdownButton.vue'
import DocsTabs from './DocsTabs.vue'
import DocsTab from './DocsTab.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(CopyMarkdownButton),
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('DocsTabs', DocsTabs)
    app.component('DocsTab', DocsTab)
  },
}
