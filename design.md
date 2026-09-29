# 言传汉语 · 落地页设计规范

> 本文档记录 `index.html` 的**当前设计系统**（仅陈述现状，不含评价与改动建议）。
> 配套的优化/调整建议见 [优化建议.md](优化建议.md)。

---

## 1. 项目概述

- **产品**：言传汉语（MandarinBridge）——专注在华留学生的一对一线上汉语辅导。
- **页面形态**：`index.html`（结构）+ `styles.css`（样式）+ `script.js`（脚本与文案字典），响应式，中英双语切换。
- **风格标签**：轻拟物健康风（轻量拟物 + 玻璃拟态 + 暖调健康配色）。
- **品牌主张**：作业、期中期末、HSK、日常交流、商务职场，一站式汉语辅导。

---

## 2. 设计风格与调性

整体走「**轻拟物（soft skeuomorphism）+ 玻璃拟态（glassmorphism）**」的融合：

- **暖白底 + 珊瑚红主色**，传递亲切、可信、有温度的教育气质。
- **玻璃卡片**：半透明白 + `backdrop-filter` 模糊，配 `--glass-line` 高亮描边与「内上高光 / 内下微暗」的拟物 rim，营造柔和立体感。
- **固定背景纹样视差**：红/金两色圆点放射渐变钉在视口（`fixed`），内容滚动时形成纵深。
- **浮动色斑**：全局固定层 `.bg-deco` 数个高斯模糊圆斑，缓慢漂移 + 随滚动轻微视差。
- **装饰细节**：Hero 的 HUD 同心弧环 + 轨道光点 + 噪点质感层；服务轮播区的英文 ghost 大字；数字用渐变描边字。

---

## 3. 色彩系统

全部定义在 `styles.css` 的 `:root`。

| 变量 | 色值 | 用途 |
|------|------|------|
| `--primary` | `#D6453D` | 主色 · 珊瑚红（品牌主色） |
| `--primary-dark` | `#B5372F` | 主色深调（hover / 强调文字） |
| `--secondary` | `#EF9A94` | 辅助浅珊瑚（badge 圆点、blob） |
| `--cta` | `#CE3A32` | CTA 主色 |
| `--cta-dark` | `#A82C25` | CTA 深调（hover） |
| `--bg` | `#FBF8F6` | 页面暖白底色 |
| `--text` | `#2B2422` | 正文深暖棕 |
| `--muted` | `#6E625E` | 次级文字 |
| `--border` | `#EBDCD6` | 浅色分隔线 / 输入框描边 |
| `--coral` | `#E9764F` | 珊瑚橙（渐变中间色 / 强调） |
| `--accent` | `#E9A23B` | 金琥珀（渐变收尾 / 点缀） |
| `--glass` | `rgba(255,255,255,.42)` | 玻璃卡底色 |
| `--glass-line` | `rgba(255,255,255,.78)` | 玻璃描边 / 分区发丝线 |

**非变量色（散落在具体规则里）**

| 色值 | 位置 / 用途 |
|------|------|
| `#A5333A → #C14440 → #D2584E → #B74952` | 红带分区渐变（`#services` / `#process` 120deg） |
| `#A5333A → #C14440 → #D2584E → #E9764F` | CTA 横幅 `#cta-band` 渐变 |
| `#8A3430 → #5E221F` | 页脚深红渐变（165deg） |
| `#C93A31 → #CE3A32 → #E0574B` | 主按钮渐变（135deg） |
| `#B02E27 → #A82C25 → #C74740` | 主按钮 hover 渐变 |
| `#F5B301` | 反馈星级金色 |
| `#C93B32` | 渐变文字 / 数据数字（`.grad`、`.stat b`） |
| `#F3D9AD` / `#E9A23B` | 红带内文字与点缀的金色 |

---

## 4. 字体系统

三套系统字体栈（`--serif` / `--sans` / `--latin`），不再依赖外部字体源（已移除 Google Fonts，避免在华加载失败）。

| 栈 | 定义 | 用途 |
|----|------|------|
| `--serif` | `Georgia, Songti SC, STSong, SimSun, serif` | 所有标题 `h1–h4`、品牌名、FAQ 问题 |
| `--sans` | `PingFang SC, Microsoft YaHei, system-ui, sans-serif` | 正文、UI、按钮、表单 |
| `--latin` | `Segoe UI, Helvetica Neue, Arial, sans-serif` | 数字 / 英文装饰大字（`.why-num`、`.ghost`、`.no`） |

**字号层级**

| 元素 | 尺寸 | 备注 |
|------|------|------|
| 正文 `body` | 16px / line-height 1.7 | |
| `h1` | 52px（移动端 36px） | 字重 600，`letter-spacing -.01em` |
| `h2` | 36px（移动端 29px） | 字重 600 |
| `.q`（h1 引导行） | 20px | `letter-spacing .05em` |
| `.hero-sub` | 17.5px | |
| `.sub` | 16.5px | 分区副标题 |
| 轮播卡 `h3` | 26px | |
| 小标题（why/step） | 20px | |
| `.why-num` | 54px | 渐变大数字 |
| `.stat b` | 36px | 数据数字，`tabular-nums` |
| `.kicker` | 13px | 字重 700，`letter-spacing .12em` |

---

## 5. 圆角 / 阴影 / 边框规范

**圆角（border-radius）**

| 值 | 应用 |
|----|------|
| `1.5rem` | 玻璃卡 `.neu`/`.soft` |
| `2rem` | 轮播卡 `.slide`、CTA 横幅 `.cta-band` |
| `1rem` | 按钮 `.btn` |
| `12px` | 表单输入框 `.field input/select/textarea` |
| `18px` | 导航 `.nav` |
| `999px`（胶囊） | `.kicker`、`.hero-badge`、`.lang-toggle` |

**阴影**

| 变量 | 值 | 用途 |
|------|----|------|
| `--shadow-d` | `0 8px 24px rgba(180,90,80,.12), 0 30px 60px rgba(150,70,90,.10)` | 卡片的远/近双层投影 |
| `--shadow-l` | `0 2px 8px rgba(180,90,80,.06)` | 轻微投影（胶囊、头像等） |
| `--rim` | `inset 0 1px 0 rgba(255,255,255,.92), inset 0 -1px 0 rgba(214,69,61,.05)` | 拟物内高光（上亮下微暗） |

**描边 / 分隔**

- `--glass-line`（`rgba(255,255,255,.78)`）作为玻璃卡描边与分区发丝线。
- `--border`（`#EBDCD6`）作为浅色分隔线、列表分隔、输入框描边。

---

## 6. 组件库

| 组件 | 类名 | 说明 |
|------|------|------|
| 分区胶囊标签 | `.kicker` | 圆角胶囊，渐变底 + 内高光，用于各板块标题上方 |
| 主按钮 | `.btn .btn-primary` | 珊瑚红渐变 + 内高光/内投影，hover 上浮 |
| 次按钮 | `.btn .btn-secondary` | 白底 + 描边，hover 描边变主色 |
| 小按钮 | `.btn-sm` | 尺寸缩小版（导航 CTA） |
| 玻璃卡（无 hover） | `.neu` | `--glass` 底 + blur 22px（现仅用于预约表单） |
| 玻璃卡（有 hover） | `.soft` | 更白底 + blur 24px，hover 上浮 4px |
| 悬浮胶囊导航 | `nav` / `.nav-inner` / `.nav-burger` | 顶部居中悬浮，毛玻璃 + 描边；移动端收起为汉堡菜单 |
| 语言切换 | `.lang-toggle` | 中 / EN 双按钮，激活态填充主色 |
| 服务轮播 | `.carousel` / `.slide` | 左右箭头 + 圆点 + 自动播放 + 滑动/键盘 |
| FAQ 手风琴 | `details` / `summary` | 原生展开，`＋` 旋转 45° |
| 预约表单 | `.form` / `.field` | 玻璃卡包裹，含姓名/学校/联系方式/水平/需求/备注 |
| 数据统计行 | `.stats` / `.stat` | 无卡片，数字+标签，发丝线分隔，数字滚动动画 |
| 反馈卡 | `.t-card` | 星级 + 引用 + 头像脚注 |
| 渐变数字 | `.why-num` | 54px 渐变描边字（红→金） |
| 师资要点列 | `.why-card` | 无卡片，扁平三列，列间发丝线分隔（移动端横向线） |
| 流程步骤节点 | `.step` | 圆形编号节点（01/02/03，桌面全部居中）+ 白→金连接线（移动端左对齐竖向时间线） |

---

## 7. 页面布局结构

页面共 **9 大板块 + 页脚**，锚点导航如下：

| 顺序 | 板块 | `id` / 类 | 底色 |
|------|------|-----------|------|
| — | 悬浮导航 | `nav` | 毛玻璃胶囊（fixed） |
| 1 | 首屏 Hero | `#top` `.hero` | 暖白 + 弧环/噪点装饰 |
| 2 | 我们的服务 | `#services` | 珊瑚红渐变带，5 页轮播 |
| 3 | 师资力量 | `#why` `.why` | 暖白 + 网格线纹样 |
| 4 | 服务流程 | `#process` | 珊瑚红渐变带，3 步圆形编号节点 + 连接线流程 |
| 5 | 学员反馈 | `#voices` | 暖白 + 圆点纹样，3 张反馈卡 |
| 6 | 常见问题 | `#faq` | 暖白，5 条手风琴 |
| 7 | 预约咨询 | `#booking` `.book` | CTA 横幅 + 预约表单 |
| 8 | 页脚 | `footer` | 深红渐变，四栏 |

- 红带分区（`#services` / `#process`）内部文字整体切为白/金配色（`.kicker` 金色、`h2` 白色、轮播卡半透明白、流程编号节点为白色描边圆）。
- 页脚含品牌 + 服务 / 快速导航 / 联系我们三栏链接。

---

## 8. 响应式断点

| 断点 | 主要变化 |
|------|----------|
| `max-width:980px` | 轮播变单列、图片压到顶部；预约两栏变单栏；`why-grid`/`t-grid` 变单列；`fixed` 视差背景降级为 `scroll`（iOS 不支持且省电）；导航收进汉堡菜单（`.nav-burger`）；`h1`/`h2` 缩小；`section` 内边距减小 |
| `max-width:640px` | 表单行变单列；导航更紧凑、CTA 隐藏、语言切换缩小；`h1`/`h2`/`.q`/`.why-num`/`.stat b` 再缩小；`.wrap` 内边距收窄；footer 单列；CTA 横幅内边距收紧 |
| `prefers-reduced-motion:reduce` | 关闭所有动画/过渡、reveal 直显、关闭平滑滚动 |

---

## 9. 动效与交互

| 动效 | 实现 | 位置 |
|------|------|------|
| Hero 入场 | `heroUp` 逐级延迟淡入上移 | `.hero-inner>*` |
| 滚动入场 | `.reveal` + `IntersectionObserver` 加 `.in` | `.reveal` |
| 数字滚动 | `data-count` 由 0 缓动滚到目标值（`count-up`） | `.stat b` |
| 背景色斑视差 | scroll 时改 `marginTop` 轻微漂移 | `.bg-deco .blob` |
| 轮播自动播放 | `setInterval` 6s 切换；hover/触摸暂停；支持箭头/圆点/滑动/键盘 | 服务轮播 IIFE |
| 导航 scrollspy | scroll 时高亮当前锚点链接 | `.nav-links a.active` |
| 中英切换 | `data-i18n` 文案替换 + `localStorage` 记忆 | `I18N` / `setLang` |

---

## 10. 无障碍与国际化

**已具备**

- 语义标签：`nav` / `header` / `section` / `footer` / `details` / `summary` / `form` / `label`。
- 表单字段均有 `<label>` 且 `required`。
- 轮播箭头、圆点、语言切换均有 `aria-label`。
- 键盘焦点样式 `:focus-visible`（按钮 / summary / 语言切换）。
- 尊重 `prefers-reduced-motion: reduce`。
- 图片均有描述性 `alt`。

**国际化（中 / EN）**

- 文案以 `data-i18n="key"` 标记，字典 `I18N` 存于 `script.js`。
- 切换时用 `innerHTML` 写入对应语言，`<html lang>` 随之切换为 `zh-CN` / `en`。
- 语言偏好存 `localStorage`（`mb_lang`），刷新后恢复。
