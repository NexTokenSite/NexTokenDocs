<script setup lang="ts">
// 单个 tab 面板,必须放在 <DocsTabs> 内部使用。
// 通过 inject 拿到父级当前 active 名称,与自己的 name 比对决定渲染显隐。
import { inject, computed, type Ref } from 'vue'

defineOptions({ name: 'DocsTab' })

const props = defineProps<{
  /** 唯一标识,父 DocsTabs 用它区分各 tab */
  name: string
  /** 顶部按钮显示的文字 */
  title?: string
}>()

const active = inject<Ref<string>>('docsTabsActive')
const isActive = computed(() => active?.value === props.name)
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :aria-labelledby="name"
    class="docs-tab-panel"
  >
    <slot />
  </div>
</template>

<style scoped>
.docs-tab-panel {
  /* 占位,所有具体样式继承 vp-doc 默认主题 */
}
</style>
