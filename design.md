# 言传中文 · 落地页设计规范

> 本文档记录**当前页面**（React 组件 + `src/style.css`）的**设计系统**（仅陈述现状，不含评价与改动建议）。

---

## 1. 项目概述

- **产品**：言传中文（MandarinBridge）——专注在华留学生的一对一线上中文辅导。
- **页面形态**：React 19 + Vite + Tailwind v4（`index.html` 为 Vite 入口，组件在 `src/components/`，双语字典在 `src/i18n.jsx`，自定义样式在 `src/style.css`），响应式，中英双语切换。
- **风格标签**：温暖活力风（玻璃拟态为主 + 轻拟物点缀 + 珊瑚红暖调，纯色无渐变）。
- **品牌主张**：作业、期中期末、HSK、日常交流、商务职场，一站式中文辅导。

---

## 2. 设计风格与调性

整体走「**玻璃拟态（glassmorphism）为主 + 轻拟物（soft skeuomorphism）点缀**」的融合：

- **纯净白底（`#FDFDFC`，近白微暖）+ 珊瑚红主色**，传递亲切、可信、现代的教育气质。
- **玻璃卡片**：半透明白 + `backdrop-filter` 模糊，配 `--glass-line` 高亮描边与「内上高光 / 内下微暗」的拟物 rim，营造柔和立体感。
- **固定背景纹样视差**：红/金两色圆点放射渐变钉在视口（`fixed`），内容滚动时形成纵深。
- **浮动色斑**：全局固定层 `.bg-deco` 数个高斯模糊圆斑，缓慢漂移 + 随滚动轻微视差。
- **装饰细节**：Hero 实色几何色块（`.blk`——左侧桃粉大圆 `#F8DED6` 460px 探出左缘、右上金色圆角方块 `#F3E0B6` 130px 斜放 14°、右下珊瑚大圆 `#F2CDC2` 340px、左下实心珊瑚圆点，纯色无光晕，缓慢漂浮）、标题后三圈回声弧环（虚线 620/880/1180px 错层缓转，浓度递减）、中央声波频谱条（居中对称跳动）；服务轮播区的英文 ghost 大字；数字用浅红描边字（轮播 `.no`、师资卡编号）。

---

## 3. 色彩系统

全部定义在 `src/style.css` 的 `@theme`（构建时输出为 :root CSS 变量，供自定义 CSS 与工具类共用）。

| 变量 | 色值 | 用途 |
|------|------|------|
| `--primary` | `#D6453D` | 主色 · 珊瑚红（品牌主色，标题/节点/描线均用纯色） |
| `--primary-dark` | `#B5372F` | 主色深调（hover / 强调文字） |
| `--cta` | `#CE3A32` | CTA 主色（纯色按钮） |
| `--cta-dark` | `#A82C25` | CTA 深调（hover） |
| `--bg` | `#FDFDFC` | 页面纯净白底色（近白微暖） |
| `--band` | `#C14440` | 红带分区 / CTA 横幅纯色底（`#services` / `#why` / `.cta-band`） |
| `--text` | `#2B2422` | 正文深暖棕 |
| `--muted` | `#6E625E` | 次级文字 |
| `--border` | `#EBDCD6` | 浅色分隔线 / 输入框描边 |
| `--glass` | `rgba(255,255,255,.42)` | 玻璃卡底色 |
| `--glass-line` | `rgba(255,255,255,.78)` | 玻璃描边 / 分区发丝线 |

> 注：金琥珀（原 `--accent`）、珊瑚橙（原 `--coral`）、辅助浅珊瑚（原 `--secondary`）已随「去红黄渐变」改造移除；UI 文字与渐变色为珊瑚红单色系 + 中性暖色，分区背景的金色圆点层保留（红+金双色纹样）。

**非变量色（散落在具体规则里）**

| 色值 | 位置 / 用途 |
|------|------|
| `#742B27` | 页脚纯色底 |
| `#F8F1ED` | FAQ 分区纯色底 |
| `#F5B301` | 反馈星级金色 |
| `rgba(233,162,59,.024–.26)` | 分区圆点第二层（voices/booking/faq）与 bg-deco 色斑金色 |
| `rgba(122,43,39,.16/.22)` | 师资宽卡主投影层（深红暖影，hover 加深） |
| `#FDFBF9` | 师资宽卡暖白底 |
| `#757575` | 表单占位文字（Chrome 默认灰，覆盖 Tailwind preflight 的跟随正文色） |

---

## 4. 字体系统

**全站黑体（无衬线）**。两套系统字体栈（`--sans` / `--latin`），不加载 webfont、不依赖外部字体源（已移除 Google Fonts，避免在华加载失败）。`--sans` 栈首列思源黑体（Source Han Sans SC / Noto Sans CJK SC）：装了思源的设备（Android 默认即 Noto Sans CJK）直接命中，其余设备回退到系统黑体（macOS 苹方 / Windows 微软雅黑），视觉同属黑体系。

| 栈 | 定义 | 用途 |
|----|------|------|
| `--sans` | `Source Han Sans SC, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif` | 全部文本：正文、标题 `h1–h4`、品牌名、FAQ 问题、按钮、表单 |
| `--latin` | `Segoe UI, Helvetica Neue, Arial, sans-serif` | 数字 / 英文装饰大字（`.ghost`、`.no`） |

**字号层级**

| 元素 | 尺寸 | 备注 |
|------|------|------|
| 正文 `body` | 16px / line-height 1.7 | |
| `h1` | 52px（移动端 36px） | 字重 600，`letter-spacing -.01em`；子元素按 `em` 随动缩放 |
| `h1 .grad` | 1.4em（≈72px） | 品牌名，纯色珊瑚红 `var(--primary)`，字重 700 |
| `h1 .ht-tag` | 1.4em（≈72px，与品牌行同大） | 口号行，墨色字重 600；宽屏单行、窄处（text-wrap:balance）均衡断两行；英文版保持 .75em（长句避免过大） |
| `h2` | 36px（移动端 29px） | 字重 600 |
| 轮播卡 `h3` | 26px | |
| 卡片标题（why） | 22px | 字重 700，深色，卡片顶部、下发丝线分隔 |
| 流程标题（step） | 20px | |
| 卡片要点（why） | 14.5px | 颜色 `--text` |
| `.kicker` | 13px | 字重 700，`letter-spacing .12em` |

---

## 5. 圆角 / 阴影 / 边框规范

**圆角（border-radius）**

| 值 | 应用 |
|----|------|
| `1.5rem` | 玻璃卡 `.neu`/`.soft`/`.why-card` |
| `2rem` | 轮播卡 `.slide`、CTA 横幅 `.cta-band` |
| `1rem` | 按钮 `.btn` |
| `12px` | 表单输入框 `.field input/select/textarea` |
| `18px` | 导航 `.nav` |
| `999px`（胶囊） | `.kicker`、`.lang-toggle` |

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
| 分区胶囊标签 | `.kicker` | 圆角胶囊，浅红纯色底 + 内高光，用于各板块标题上方 |
| 主按钮 | `.btn .btn-primary` | 纯色珊瑚红 + 内高光/内投影，hover 变深上浮；Hero 区与次按钮同尺寸（等宽 260px、等高） |
| 次按钮 | `.btn .btn-secondary` | 白底 + 描边，hover 描边变主色 |
| 玻璃卡（无 hover） | `.neu` | `--glass` 底 + blur 22px（现仅用于预约表单） |
| 玻璃卡（有 hover） | `.soft` | 更白底 + blur 24px，hover 上浮 4px |
| 悬浮胶囊导航 | `nav` / `.nav-inner` / `.nav-burger` | 顶部居中悬浮，毛玻璃 + 描边；移动端收起为汉堡菜单 |
| 语言切换 | `.lang-toggle` | 中 / EN 双按钮，激活态填充主色 |
| 服务轮播 | `.carousel` / `.slide` | 左右箭头 + 圆点 + 自动播放 + 滑动/键盘 |
| FAQ 手风琴 | `details` / `summary` | 原生展开，`＋` 旋转 45° |
| 预约表单 | `.form` / `.field` | 玻璃卡包裹，含姓名/学校/联系方式/水平/需求/备注 |
| 反馈卡 | `.t-card` | 星级 + 引用 + 头像脚注 |
| 师资宽卡 | `.why-card` | 暖白卡片（无玻璃效果；深红暖影 + 双层投影，hover 上浮 + 影加深），左上角浅红编号（01/02/03，拉丁字体）、标题下珊瑚短条 + 发丝线、要点清单，3 张横排（红带内） |
| 流程步骤节点 | `.step` | 纯色珊瑚红圆形编号节点（01/02/03，桌面全部居中）+ 同色浅红连接线（移动端左对齐竖向时间线） |
| 声波频谱条 | `.voice-wave` | Hero 标题下方居中对称、边缘渐低的跳动频谱条（31 条，React 生成，`vwPulse` 错峰伸缩） |

---

## 7. 页面布局结构

页面共 **7 个板块 + 页脚**，锚点导航如下：

| 顺序 | 板块 | `id` / 类 | 底色 |
|------|------|-----------|------|
| — | 悬浮导航 | `nav` | 毛玻璃胶囊（fixed） |
| 1 | 首屏 Hero | `#top` `.hero` | 纯净白（透出全局色斑）+ 回声弧环/声波涟漪/中央频谱条装饰 |
| 2 | 我们的服务 | `#services` | 珊瑚红纯色带 + 白色圆点纹样，5 页轮播 |
| 3 | 服务流程 | `#process` | 暖白 + 网格线纹样，3 步圆形编号节点 + 连接线流程 |
| 4 | 师资力量 | `#why` `.why` | 珊瑚红纯色带 + 白色圆点纹样，3 张师资宽卡横排（标题上、要点下） |
| 5 | 学员反馈 | `#voices` | 暖白 + 圆点纹样，3 张反馈卡 |
| 6 | 常见问题 | `#faq` | 浅暖灰 + 圆点纹样，5 条手风琴 |
| 7 | 预约咨询 | `#booking` `.book` | CTA 横幅 + 预约表单 |
| 8 | 页脚 | `footer` | 深红纯色，四栏 |

- 红带分区（`#services` / `#why`）内部文字整体切为白色系（`.kicker` 白色、`h2` 白色、轮播卡半透明白，师资宽卡暖白底、卡内文字深色）。
- 页脚含品牌 + 服务 / 快速导航 / 联系我们三栏链接。

---

## 8. 响应式断点

| 断点 | 主要变化 |
|------|----------|
| `max-width:980px` | 轮播变单列、图片压到顶部；预约两栏变单栏；`t-grid`/`why-grid` 变单列（师资宽卡转单列纵排）；`fixed` 视差背景降级为 `scroll`（iOS 不支持且省电）；右上涟漪 `.rp2` 隐藏；导航收进汉堡菜单（`.nav-burger`）；`h1`/`h2` 缩小；`section` 内边距减小；Hero 底部内边距加大（110px）为 scroll-hint 留位，避免压住按钮；Hero 撑满视口（min-height 100svh） |
| `max-width:640px` | 表单行变单列；导航更紧凑、语言切换缩小；`h1`/`h2` 再缩小；`.wrap` 内边距收窄；footer 单列；CTA 横幅内边距收紧；涟漪全部隐藏 |
| `prefers-reduced-motion:reduce` | 关闭所有动画/过渡、reveal 直显、关闭平滑滚动 |

---

## 9. 动效与交互

| 动效 | 实现 | 位置 |
|------|------|------|
| Hero 入场 | `heroUp` 逐级延迟淡入上移 | `.hero-inner>*` |
| Hero 装饰动效 | 回声弧环三圈错层缓转（`spinEcho` 90s/150s/210s）、色块缓慢漂浮（`blkFloatA/B/R`）、中央频谱条逐条错峰跳动（`vwPulse`，条目 React 生成） | `.echo` / `.blk` / `.voice-wave` |
| 滚动入场 | `.reveal` + `IntersectionObserver` 加 `.in` | `.reveal` |
| 背景色斑视差 | scroll 时改 `marginTop` 轻微漂移 | `.bg-deco .blob` |
| 轮播自动播放 | `setInterval` 6s 切换；hover/触摸暂停；支持箭头/圆点/滑动/键盘 | Services 组件 |
| 导航 scrollspy | scroll 时高亮当前锚点链接 | `.nav-links a.active` |
| 中英切换 | React state 驱动全树重渲染 + `localStorage` 记忆 | `I18nProvider` / `useI18n` |

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

- 文案唯一来源为 `src/i18n.jsx` 的 `I18N` 字典，组件经 `useI18n().t(key)` 取用。
- 切换语言触发 React 全树重渲染，`<html lang>` 随之切换为 `zh-CN` / `en`。
- 语言偏好存 `localStorage`（`mb_lang`），刷新后恢复。
