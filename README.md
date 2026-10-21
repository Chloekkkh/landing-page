# 言传中文 · 落地页

> 专注在华留学生的一对一线上中文辅导 —— 作业、期中期末、HSK、日常交流、商务职场，一站式搞定。

中英双语（中文 / EN）可切换的响应式营销落地页，React 19 + Vite + Tailwind v4。

## 功能特性

- **中英双语切换**：一键切换全站文案，语言偏好存于 `localStorage`，刷新后自动恢复
- **服务轮播**：5 条课程路线，支持自动播放、左右箭头、圆点、触摸滑动与键盘方向键
- **滚动动效**：区块渐入、背景色斑视差、Hero 几何装饰与声波频谱
- **导航**：scrollspy 滚动高亮当前板块；移动端收起为汉堡菜单
- **响应式**：980px / 640px 两档断点，适配手机与桌面
- **无障碍**：语义化标签、表单 `label`、`aria-label`、`:focus-visible`、尊重 `prefers-reduced-motion`
- **预约表单收集**：提交经 Cloudflare Pages Function 写入 KV 备份并发送邮件通知（见「部署」）

## 技术栈

React 19 + Vite 8 + Tailwind CSS v4（CSS-first 配置，`@theme` 设计令牌）。构建产物为纯静态文件，任意静态托管均可部署。

## 目录结构

```
landing-page/
├── index.html            # Vite 入口（meta / favicon / #root）
├── src/
│   ├── main.jsx          # React 挂载入口
│   ├── App.jsx           # 板块装配 + 全局 reveal 观察器
│   ├── i18n.jsx          # I18N 双语字典 + I18nProvider / useI18n
│   ├── style.css         # Tailwind @theme 令牌 + 自定义 CSS（复杂视觉 / keyframes）
│   └── components/       # NavBar / Hero / Services / Process / WhyUs / Voices / Faq / Booking / Footer / BgDeco
├── public/assets/        # 图片资源（avatars / carousel）
├── functions/api/        # Cloudflare Pages Functions（预约表单接收）
├── design.md             # 设计系统规范（配色 / 字体 / 组件 / 断点）
├── vite.config.js
└── CLAUDE.md             # 面向 Claude Code 的开发说明
```

## 本地运行

```bash
npm install          # 首次
npm run dev          # 开发服务器 → http://localhost:5173
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

## 双语文案说明

文案唯一来源为 `src/i18n.jsx` 的 `I18N` 字典（按 key 存放 `{zh, en}`），组件经 `useI18n().t(key)` 渲染，语言切换由 React state 驱动 —— 不再存在「HTML 兜底 + 字典」两处同步问题。新增文案时 zh / en 双语都要补；含内联 HTML 的 key（`<br>`、`<b>`）需以 `dangerouslySetInnerHTML` 渲染。

## 设计规范

完整的配色、字体、组件、断点规范见 [design.md](design.md)。

## 部署

`npm run build` 后把 `dist/` 目录部署到任意静态托管（GitHub Pages、Netlify、Vercel、对象存储等）即可。**预约表单收集依赖 Cloudflare Pages**，配置如下：

1. **Pages 项目**：构建命令 `npm run build`，输出目录 `dist`。仓库根的 `functions/` 目录会被自动识别为 Pages Functions（`POST /api/booking`）。
2. **KV 命名空间**：在 Cloudflare 创建 KV namespace，并在 Pages 项目 Settings → Bindings 绑定，变量名 `BOOKINGS`（预约提交的备份留档）。
3. **环境变量（Secrets）**：`RESEND_API_KEY`（Resend 后台的 API Key）、`NOTIFY_EMAIL`（接收预约通知的邮箱）。
4. **Resend**：注册后在免费层验证自己的收件邮箱即可——沙箱发件域（`onboarding@resend.dev`）只能发到账户验证过的邮箱，恰好满足「提交发给自己」。验证自有域名后，把 `functions/api/booking.js` 里的 `from` 改为 `hello@mandarinbridge.cn`。
5. **本地联调函数**（可选）：`npm i -D wrangler` 后 `npx wrangler pages dev dist`。不联调时 `npm run dev` 下提交表单会显示失败提示（函数不存在），属预期。
