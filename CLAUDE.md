# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**言传汉语（MandarinBridge）** 的静态营销落地页 —— 面向在华留学生的一对一线上汉语辅导。纯 HTML/CSS/原生 JS，中英双语（中文 / English），响应式。无框架、无构建、无依赖、无 package.json、无测试。

## 常用命令

没有构建 / lint / 测试工具链，开发和验证方式如下：

- **预览**：直接用浏览器打开 `index.html`，或起静态服务器，如 `python -m http.server 8000`（本机已装 Python）。
- **JS 语法校验**：`node --check script.js`（改完 `script.js` 后跑一次）。
- **核对改动**：`git diff` —— 本仓库没有 CI，`git diff` 是主要的验证手段。

## 文件布局

- `index.html` —— 只有页面结构，全部可见文案以静态中文兜底文本形式写在这里。
- `styles.css` —— 全部样式：`:root` 设计令牌，随后大致按分区顺序（导航 → hero → 服务 → 师资 → 流程 → 反馈 → FAQ → 预约 → 页脚），最后是响应式断点。
- `script.js` —— `I18N` 字典 + 全部行为逻辑（语言切换、数字滚动、scrollspy、移动端汉堡、服务轮播、背景视差、表单提交）。
- `design.md` —— **设计系统规范**（配色、字体、组件、布局、断点）。把它当作视觉设计的"事实来源"，改动视觉时在同一个提交里同步更新它。
- `assets/avatars/` 和 `assets/carousel/` —— 相对路径引用的 PNG 图片。

## i18n —— 最容易踩的坑

文案同时存在于**两个地方，必须保持同步**：

1. `index.html` 里的静态中文文本（JS 加载前的兜底，也是搜索引擎看到的内容）。
2. `script.js` 里的 `I18N` 对象 —— 按 key 存放 `{zh, en}` 双语。

文本通过 `data-i18n="key"`（以 `innerHTML` 替换）和 `data-i18n-ph="key"`（以 `placeholder` 替换）绑定，`setLang()` 读取这些属性并替换内容，所选语言持久化到 `localStorage`（键名 `mb_lang`）。

新增或修改任何用户可见字符串时：先在 `index.html` 添加 / 更新 `data-i18n` key，再到 `I18N` 里为 **zh 和 en 两种语言**都补上对应条目。字符串里若有内联 HTML（如 `<em>`、`<b>`、`<br>`），静态兜底文本和字典条目里都要带上，否则两种语言渲染会不一致。

## 需要注意的跨文件耦合

- **导航 ↔ scrollspy ↔ 分区 id**：`index.html` 里的导航链接、`<section>` 上的 `id`、以及 `script.js` scrollspy IIFE 里硬编码的 `secs = ['#top','#services','#why','#process','#faq']` 三者必须一致。新增、删除或重命名分区时，三处都要同步改。
- **设计令牌**：`styles.css` 的 `:root` 定义了 `--primary`、`--cta`、`--bg`、`--text`、`--glass` 等变量。尽量用变量而非硬编码新颜色；新的非变量颜色要写进 `design.md`。
- **响应式断点**：`@media (max-width:980px)` 与 `@media (max-width:640px)`。980px 那一档还会把 `fixed` 视差背景降级为 `scroll`（iOS 兼容 + 省电）—— 分区若新增 `fixed` 背景，也要做同样处理。

## 结构备注

- 页面共 9 大板块 + 导航 + 页脚，每块都有锚点 `id`，使用平滑滚动 + scrollspy 高亮。
- CSS / JS 文件顶部各有一个**空行 + 2 空格顶层缩进**，是从单个内联 `<style>`/`<script>` 块拆分时遗留的。它无害且有意保留 —— 别整体重排，以免产生大段噪音 diff。
- JS 按"一个交互一个 IIFE"组织，每个 IIFE 都对缺失元素做了判空保护（`if(!els.length) return;`），并尊重 `prefers-reduced-motion`。

## Git

远端为 SSH 地址（`git@github.com:Chloekkkh/landing-page.git`），默认分支 `main`。用户在中国大陆，GitHub 走 SSH over 443（已配好在 `~/.ssh/config`），**不要切换成 HTTPS**。仅在用户明确要求时才提交 / 推送。
