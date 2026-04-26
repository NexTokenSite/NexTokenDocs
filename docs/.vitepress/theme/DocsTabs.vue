<script setup lang="ts">
// 文档页 tab 容器:配合 <DocsTab> 子组件使用,提供按钮组 + 切换面板。
// 设计上故意把所有子 tab 内容都渲染进 DOM,只用 CSS 控制显示——这样:
//   1. SSG 阶段全部内容进静态 HTML,搜索引擎能索引所有 tab(SEO 友好)
//   2. 站内全文搜索能命中非 active tab 的内容
//   3. 直接通过 URL hash 跳到非 active tab 里某个 anchor 也能滚动定位
import { provide, ref, useSlots, type VNode, computed } from 'vue'

const props = defineProps<{
  /** 默认选中的 tab,值对应某个子 <DocsTab> 的 name */
  defaultTab?: string
}>()

interface TabMeta {
  name: string
  title: string
}

// 从 slot vnode 中抽出每个子 DocsTab 的 props,用于渲染顶部按钮栏
const slots = useSlots()
const tabs = computed<TabMeta[]>(() => {
  const children = (slots.default?.() ?? []) as VNode[]
  const out: TabMeta[] = []
  // 子 vnode 可能因为 markdown 段落包装而出现 Fragment / 空文本节点,递归扁平化
  const walk = (nodes: VNode[]) => {
    for (const n of nodes) {
      if (typeof n.type === 'object' && (n.type as any).__name === 'DocsTab') {
        const p = (n.props ?? {}) as Record<string, unknown>
        const name = String(p.name ?? '')
        const title = String(p.title ?? name)
        if (name) out.push({ name, title })
      } else if (Array.isArray(n.children)) {
        walk(n.children as VNode[])
      }
    }
  }
  walk(children)
  return out
})

// 初始选中:优先 defaultTab,其次第一个 tab
const active = ref(
  props.defaultTab && tabs.value.some((t) => t.name === props.defaultTab)
    ? props.defaultTab
    : tabs.value[0]?.name ?? '',
)

// 子 DocsTab 通过 inject 拿到当前 active 名称,自行决定显示/隐藏
provide('docsTabsActive', active)

function select(name: string) {
  active.value = name
}
</script>

<template>
  <div class="docs-tabs">
    <div class="docs-tabs-bar" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.name"
        type="button"
        role="tab"
        :aria-selected="t.name === active"
        :class="['docs-tabs-btn', { 'is-active': t.name === active }]"
        @click="select(t.name)"
      >
        {{ t.title }}
      </button>
    </div>
    <div class="docs-tabs-panels">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.docs-tabs {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.docs-tabs-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.docs-tabs-btn {
  appearance: none;
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;
}
.docs-tabs-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}
.docs-tabs-btn.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.docs-tabs-panels {
  padding: 4px 18px;
}
.docs-tabs-panels :deep(> *:first-child) {
  margin-top: 14px;
}
</style>
