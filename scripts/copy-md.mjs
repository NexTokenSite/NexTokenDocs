// 把白名单目录下的源 .md 拷贝到 .vitepress/dist 同相对路径,
// 让"复制 Markdown"按钮可以通过 /<relativePath> fetch 到原始 markdown。
//
// 用白名单(不递归整个仓库),避免误抓 node_modules 等内容。
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const SRC_DIR = join(REPO_ROOT, 'docs')               // VitePress srcDir
const DIST = join(SRC_DIR, '.vitepress', 'dist')      // VitePress 默认 outDir

// 白名单:全部以 SRC_DIR 为基准的相对路径
const sources = [
  // docs/ 子目录下的两个文档
  { type: 'dir', rel: 'docs' },
  // 各分组目录下的所有 .md
  { type: 'dir', rel: 'nextoken' },
  { type: 'dir', rel: 'agents' },
  { type: 'dir', rel: 'chatbot' },
  { type: 'dir', rel: 'tos' },
]

if (!existsSync(DIST)) {
  console.error(`[copy-md] dist 不存在: ${DIST}`)
  console.error('[copy-md] 请先执行 vitepress build,再运行本脚本')
  process.exit(1)
}

let copied = 0

for (const item of sources) {
  const dirPath = join(SRC_DIR, item.rel)
  if (!existsSync(dirPath)) {
    console.warn(`[copy-md] 跳过不存在的目录: ${item.rel}`)
    continue
  }
  const entries = readdirSync(dirPath)
  for (const name of entries) {
    if (!name.endsWith('.md')) continue
    const src = join(dirPath, name)
    if (!statSync(src).isFile()) continue
    const rel = join(item.rel, name).replace(/\\/g, '/')
    const dst = join(DIST, rel)
    mkdirSync(dirname(dst), { recursive: true })
    copyFileSync(src, dst)
    copied++
  }
}

console.log(`[copy-md] 已拷贝 ${copied} 个 .md 到 dist/`)
