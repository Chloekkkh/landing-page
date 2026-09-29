# 言传汉语 · 落地页

> 专注在华留学生的一对一线上汉语辅导 —— 作业、期中期末、HSK、日常交流、商务职场，一站式搞定。

一个纯静态、双语（中 / EN）可切换的响应式营销落地页。

## 功能特性

- **中英双语切换**：一键切换全站文案，语言偏好存于 `localStorage`，刷新后自动恢复
- **服务轮播**：5 条课程路线，支持自动播放、左右箭头、圆点、触摸滑动与键盘方向键
- **滚动动效**：区块渐入、首屏数据数字滚动计数、背景色斑视差
- **导航**：scrollspy 滚动高亮当前板块；移动端收起为汉堡菜单
- **响应式**：980px / 640px 两档断点，适配手机与桌面
- **无障碍**：语义化标签、表单 `label`、`aria-label`、`:focus-visible`、尊重 `prefers-reduced-motion`

## 技术栈

原生 HTML + CSS + JavaScript，**无框架、无构建、无第三方依赖**。

## 目录结构

```
landing-page/
├── index.html      # 页面结构 + 静态中文文案（data-i18n 标记）
├── styles.css      # 全部样式：:root 设计令牌 → 分区样式 → 响应式断点
├── script.js       # I18N 文案字典 + 全部交互逻辑
├── design.md       # 设计系统规范（配色 / 字体 / 组件 / 断点）
├── assets/         # 图片资源
│   ├── avatars/    # 学员头像
│   └── carousel/   # 服务轮播配图
└── CLAUDE.md       # 面向 Claude Code 的开发说明
```

## 本地运行

无需安装任何依赖，任选其一：

```bash
# 方式一：直接用浏览器打开
index.html

# 方式二：起一个本地静态服务器（Python）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

修改 JS 后可用 `node --check script.js` 做语法校验。

## 双语文案说明

文案以 `data-i18n="key"`（替换 innerHTML）和 `data-i18n-ph="key"`（替换 placeholder）标记，中英对照字典 `I18N` 存于 `script.js`。

> ⚠️ 每一条文案同时存在于**两个地方**：`index.html` 的静态中文兜底文本，以及 `script.js` 里的 `{zh, en}` 字典。新增或修改文案时，务必两处（且 zh / en 两种语言）同步更新。

## 设计规范

完整的配色、字体、组件、断点规范见 [design.md](design.md)。

## 部署

纯静态站点，任意静态托管（GitHub Pages、Netlify、Vercel、对象存储等）直接托管本目录即可。
