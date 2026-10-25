# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**言传中文（MandarinBridge）** 的营销落地页 —— 面向在华留学生的一对一线上中文辅导。React 19 + Vite + Tailwind v4，中英双语（中文 / English），响应式。Cloudflare Workers + Static Assets 部署，Node 内置测试；GitHub 自动部署配置见 README。

## 常用命令

- **开发**：`npm run dev`（Vite 开发服务器，默认 http://localhost:5173）。
- **构建 / 预览产物**：`npm run build` → `npm run preview`。
- **运行环境**：Node `24.15.0`（`.node-version`）；安装依赖用 `npm ci`。
- **验证**：`npm test`（Node 内置测试，模拟 KV/邮件）→ `npm run build` → `npx wrangler deploy --dry-run`（不发布）。
- **完整联调**：`npm run dev:worker` 构建前端并启动 Worker，默认 http://localhost:8787。Worker 代码会自动重载；修改前端需重新构建。`npm run dev` / `preview` 只运行前端，不提供预约 API。
- **手动部署**：`npm run deploy`；仅在用户明确要求线上发布时执行。

## 文件布局

- `index.html` —— Vite 入口：meta / favicon / `<div id="root">`，不含任何可见文案。
- `src/main.jsx` —— React 挂载入口（StrictMode）。
- `src/App.jsx` —— 板块装配（BgDeco → NavBar → Hero → Services → Process → WhyUs → Voices → Faq → Booking → Footer）+ 全局 `.reveal` IntersectionObserver。
- `src/i18n.jsx` —— `I18N` 双语字典（{zh, en}）+ `I18nProvider` / `useI18n`（state 驱动渲染，localStorage 键 `mb_lang`）。
- `src/components/*.jsx` —— 每板块一个组件，交互逻辑在组件内用 hooks 实现。
- `src/style.css` —— `@import "tailwindcss"` + `@theme` 设计令牌 + 原自定义 CSS（复杂视觉与 keyframes 原样保留）。
- `design.md` —— **设计系统规范**（配色、字体、组件、布局、断点）。把它当作视觉设计的"事实来源"，改动视觉时在同一个提交里同步更新它。
- `public/assets/avatars/`、`public/assets/carousel/` —— 静态图片，代码中以 `/assets/...` 绝对路径引用。
- `worker/index.js` —— Worker 路由入口；`worker/booking.js` —— 预约接收、KV 留档与 Resend 通知。
- `wrangler.jsonc` —— Worker 名称、静态资源、KV 绑定和日志；`tests/worker.test.js` —— 接口回归测试。
- `网页文案.md` —— 全站文案的中英对照提取底稿；改文案仍以 `src/i18n.jsx` 为准。

## i18n —— 文案唯一来源

文案只存在于**一个地方**：`src/i18n.jsx` 的 `I18N` 字典，按 key 存放 `{zh, en}`。组件里 `const { t } = useI18n()` 后以 `{t('key')}` 渲染，切换语言由 `useI18n` 的 state 触发全树重渲染，语言持久化到 `localStorage`（键名 `mb_lang`），`<html lang>` 由 Provider 的 effect 同步。

新增或修改任何用户可见字符串时：在 `I18N` 里为 **zh 和 en 两种语言**都补上条目，然后在组件中用 `t()` 取值。字符串里若含内联 HTML（如 `why.h2` / `book.h2` 的 `<br>`、`v1-3.q` 的 `<b>`），渲染时用 `dangerouslySetInnerHTML`（现有这些 key 已处理，新增含 HTML 的 key 也要同样处理）。

## 表单收集（Cloudflare Worker）

预约表单（`Booking.jsx`）fetch POST 同源 `/api/booking`（JSON），Worker 路由调用 `handleBooking(request, env, ctx)`，纯 JS 无依赖：

- **输入**：非法 JSON、`null`、数组、非对象或缺少必填字段返回 JSON 400；字符串去首尾空格并按原有限长截断。蜜罐字段 `website` 非空时假成功，不保存、不发信。
- **成功语义**：先写 `BOOKINGS` KV；保存后立即返回 `{ok:true,saved:true}`，通过 `ctx.waitUntil()` 发邮件，请求超时 5 秒。KV 失败时等待邮件兜底，Resend 接受后返回 `{ok:true,saved:false,emailed:true}`；均失败返回 500。后台邮件没有自动重试，失败后从 KV 手动跟进。
- **路由**：`/api/booking` 仅接受 POST（其他方法 JSON 405）；未知 API JSON 404。`assets.run_worker_first` 仅匹配 `/api` 和 `/api/*`，防止静态 SPA 回退吞掉 API 请求。
- **部署**：GitHub 生产分支默认 `main`；构建 `npm test && npm run build`，部署 `npx wrangler deploy`。前端静态目录 `dist`，KV 首次部署自动创建；初期关闭非生产分支自动构建/预览。完整步骤见 README。
- **运行时配置**：`RESEND_API_KEY`、`NOTIFY_EMAIL` 配在 Worker Variables & Secrets，不是仅构建变量。本地使用被忽略的 `.dev.vars`（从示例复制），不配置邮件时仍可验证本地 KV。`RESEND_FROM_EMAIL` 可选，默认 `onboarding@resend.dev`；测试域只发到 Resend 账户邮箱，其他收件人需验证自有发件域名。错误日志只记录环节及状态，不记录用户信息、密钥或邮件服务错误正文。
- 前端四态 `idle | sending | sent | error`，新增相关文案 key 需在 `src/i18n.jsx` 双语补齐。

## 需要注意的跨文件耦合

- **导航 ↔ scrollspy ↔ 分区 id**：`NavBar.jsx` 的导航链接、各组件 `<section>` 上的 `id`、以及 `NavBar.jsx` scrollspy 里硬编码的 `secs = ['#top','#services','#process','#why','#faq']` 三者必须一致（数组顺序要与 DOM 中板块出现顺序相同）。新增、删除或重命名分区时，三处都要同步改。
- **设计令牌**：`src/style.css` 的 `@theme` 是唯一来源——`--color-*` / `--shadow-*` / `--font-*` / `--breakpoint-*` 供 Tailwind 工具类，`--primary` / `--sans` 等非命名空间变量供自定义 CSS 用 `var()` 引用，构建时全部输出为 `:root` 变量。改颜色只改 `@theme`，并同步 `design.md`；新的非变量颜色写进 `design.md`。
- **自定义 CSS 的层叠规则**：类/id 级自定义样式保持未分层（unlayered），永远压过 Tailwind 工具类——**不要在自定义 CSS 里写全局 margin/padding 重置**（会杀死 `mx-auto` 等工具类，即"偏左"事故根因）；元素级基础样式统一放 `src/style.css` 顶部的 `@layer base` 块。
- **响应式断点**：`@theme` 里 `--breakpoint-tab: 61.25rem`（980px）、`--breakpoint-mob: 40rem`（640px）。Tailwind 侧用 `max-tab:` / `max-mob:` 前缀（表达 max-width）；自定义 CSS 侧沿用 `@media (max-width:980px)` / `(max-width:640px)`。980px 那一档还会把 `fixed` 视差背景降级为 `scroll`（iOS 兼容 + 省电）—— 分区若新增 `fixed` 背景，也要做同样处理。

## 结构备注

- 页面共 7 个板块（hero/services/process/why/voices/faq/booking）+ 导航 + 页脚，每块都有锚点 `id`，使用平滑滚动 + scrollspy 高亮。
- 复杂视觉（分区圆点 fixed 背景、玻璃卡、hero 装饰、轮播、keyframes）保留为自定义 CSS；简单布局走 Tailwind utilities。
- React StrictMode 下 effect 会「挂载 → 清理 → 重挂」，所有 effect 都要带 cleanup（轮播定时器、全局监听均已处理）。
- **并行编辑**：用户经常在另一个 Claude 会话中同时修改本仓库文件。会话中收到 "file modified on disk" 提示时，以磁盘上的当前状态为准继续工作，不要回滚对方的改动；动手编辑前先 grep / Read 目标区域。

## Git

- 远端为 HTTPS（`https://github.com/Chloekkkh/landing-page.git`），分支：`main`（默认）+ `dev`（开发）。
- 用户在中国大陆，github.com 直连不通：本机有 Clash 代理（`127.0.0.1:7890`），网络操作加一次性参数，如 `git -c http.proxy=http://127.0.0.1:7890 push origin HEAD:dev`——不要写进仓库或全局配置。
- `.workbuddy/` 是本地工具工作区数据，不要提交。
- 仅在用户明确要求时才提交 / 推送。
