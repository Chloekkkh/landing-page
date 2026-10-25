# 言传中文 · 落地页

> 专注在华留学生的一对一线上中文辅导 —— 作业、期中期末、HSK、日常交流、商务职场，一站式搞定。

中英双语（中文 / EN）可切换的响应式营销落地页，React 19 + Vite + Tailwind v4。

## 功能特性

- **中英双语切换**：一键切换全站文案，语言偏好存于 `localStorage`，刷新后自动恢复
- **课程切换**：学业辅导、HSK 备考、日常交际、职场中文、文化体验 5 类课程同级展示，点击入口或用左右方向键、Home、End 切换，无自动播放
- **轻柔动效**：Hero 分组入场、照片轻微缩放、区块首次滚动渐入；声波逐条错峰律动，可暂停，离开视口或切后台自动暂停。课程文案即时切换，图片仅保留轻微过渡
- **导航**：scrollspy 滚动高亮当前板块；移动端收起为汉堡菜单
- **响应式**：980px / 640px 两档断点，适配手机与桌面
- **无障碍**：语义化标签、表单 `label`、`aria-label`、`:focus-visible`、尊重 `prefers-reduced-motion`
- **预约表单收集**：Cloudflare Worker 接收预约，写入 KV 留档后在后台发送邮件通知（见「部署」）

## 技术栈

React 19 + Vite 8 + Tailwind CSS v4（CSS-first 配置，`@theme` 设计令牌）。Cloudflare Workers Static Assets 托管前端，Worker 提供同源预约 API。Node 版本固定为 `24.15.0`（`.node-version`）。

Worker 兼容日期为 `2026-10-19`，与当前锁定 Wrangler 自带的 workerd 运行时一致；更新日期前应先验证本地运行时支持。

## 目录结构

```
landing-page/
├── index.html            # Vite 入口（meta / favicon / #root）
├── src/
│   ├── main.jsx          # React 挂载入口
│   ├── App.jsx           # 板块装配 + 全局 reveal 观察器
│   ├── i18n.jsx          # I18N 双语字典 + I18nProvider / useI18n
│   ├── style.css         # Tailwind @theme 令牌 + 自定义 CSS（复杂视觉 / keyframes）
│   ├── motion.js         # 减少动态效果偏好与原生动画辅助
│   ├── useCourseMotion.js # 课程图片与高度过渡
│   └── components/       # 导航、各分区、RevealObserver
├── public/assets/        # 图片资源（avatars / carousel）
├── worker/               # Worker 路由入口与预约处理（index.js / booking.js）
├── tests/                # Node 内置测试，模拟 KV 与邮件服务
├── wrangler.jsonc        # Worker / Static Assets / KV 绑定 / 日志配置
├── .dev.vars.example     # 本地邮件配置示例，无真实凭据
├── design.md             # 设计系统规范（配色 / 字体 / 组件 / 断点）
├── vite.config.js
└── CLAUDE.md             # 面向 Claude Code 的开发说明
```

## 本地运行

```bash
npm ci               # 按锁文件安装依赖，先切换到 Node 24.15.0
npm run dev          # Vite 前端开发 → http://localhost:5173
npm run dev:worker   # 构建前端并启动完整 Worker → http://localhost:8787
npm test             # API 单元测试；不调用真实邮件服务
npm run build        # 前端构建到 dist/
npm run preview      # 仅预览静态构建产物
```

`npm run dev` 和 `npm run preview` 不运行预约 API；表单联调请用 `npm run dev:worker`。Worker 代码会自动重载；修改前端后需重新运行该命令以更新 `dist/`。本地 KV 自动创建、持久化到 `.wrangler/`，与线上数据隔离，无需 Cloudflare 登录。

本地如需验证邮件，执行 `cp .dev.vars.example .dev.vars`，填写自己的测试配置后再启动 Worker。凭据留空时，预约仍写入本地 KV，通知会被跳过并记录日志。本地配置和数据已加入 `.gitignore`。

## 双语文案说明

文案唯一来源为 `src/i18n.jsx` 的 `I18N` 字典（按 key 存放 `{zh, en}`），组件经 `useI18n().t(key)` 渲染，语言切换由 React state 驱动 —— 不再存在「HTML 兜底 + 字典」两处同步问题。新增文案时 zh / en 双语都要补；含内联 HTML 的 key（`<br>`、`<b>`）需以 `dangerouslySetInnerHTML` 渲染。

## 设计规范

完整的配色、字体、组件、断点规范见 [design.md](design.md)。

## 部署到 Cloudflare Workers

### GitHub 自动部署

1. 在 Cloudflare 的 Workers & Pages 中创建 **Worker** 并连接 GitHub 仓库 `Chloekkkh/landing-page`。本轮设计与预约后端改动推送到 `dev`；现在部署本轮版本时选择 `dev`。正式站如继续使用 `main`，先把经过验收的 `dev` 合入 `main`，再部署该分支。
2. Worker 名称使用 `mandarinbridge-landing`，与 `wrangler.jsonc` 保持一致。构建设置如下：

   | 设置 | 值 |
   | --- | --- |
   | 生产分支 | `dev`（现在部署本轮版本）；正式站可在合并后使用 `main` |
   | 根目录 | 仓库根目录 |
   | 构建命令 | `npm test && npm run build` |
   | 部署命令 | `npx wrangler deploy` |
   | 构建变量 | `NODE_VERSION=24.15.0` |

   这里的“生产分支”是这个 Worker 自动发布所跟踪的 Git 分支；选择 `dev` 后，每次推送 `dev` 都会更新该 Worker 的在线版本。如果生产分支保留 `main`，而 `dev` 通过 Preview Builds 部署，请按下节配置预览。Workers 的静态目录由配置里的 `assets.directory` 指定为 `dist`，无需填写 Pages 的输出目录，也无需额外部署 `functions/`。
3. 首次部署时 Wrangler 自动为 `BOOKINGS` 绑定创建 KV namespace；确认构建使用的 API token 有 Workers KV Storage 编辑权限。GitHub 部署创建的资源 ID 可在 Cloudflare 后台查看，不会自动回写仓库。若已有预约 KV，部署前在绑定配置中填入现有 `id` 以复用它。
4. 在该 Worker 的 **Settings → Variables & Secrets** 中配置运行时参数，然后部署新版本使其生效：

   | 参数 | 用途 |
   | --- | --- |
   | `RESEND_API_KEY` | Resend API Key，使用 Secret |
   | `NOTIFY_EMAIL` | 接收预约通知的邮箱，使用变量或 Secret |
   | `RESEND_FROM_EMAIL` | 可选，发件邮箱地址，默认 `onboarding@resend.dev` |

   这些参数必须供 **Worker 运行时**使用，不能只填在 Build variables 中。`keep_vars` 已启用，生产部署会保留后台配置的普通变量；分支预览的普通变量以 `previews.vars` 为准，见下节。不要将密钥加上 `VITE_` 前缀或提交到仓库。
5. 默认测试发件域只能发到 **Resend 账户邮箱**；其他收件地址须先在 Resend 验证自有域名，再将 `RESEND_FROM_EMAIL` 配置为该域名下的地址（例如 `hello@mandarinbridge.cn`）。仅修改收件地址不能解除测试域限制。
6. 发布后打开网站，提交一条明确标记为测试的预约，在 KV 中确认留档并检查通知收件箱。在 Workers 日志中检查 `booking.*` 错误事件。自定义域名可在 Worker 的 Domains & Routes 中绑定。

首次部署完成并不代表邮件已配置成功，需完成上述运行时配置和预约验收。

独立 Sites 团队预览禁用预约提交；GitHub 中的主项目保留真实预约接口。Cloudflare 部署的是主项目，KV 配置正常后即可接收预约；邮件参数不完整时仍保存到 KV，但不会发送通知。

### Cloudflare 分支预览（Worker Previews）

如果构建日志运行的是 `npx wrangler preview`，说明这次走的是预览部署流程。该命令要求配置文件包含顶层 `previews`；仓库已在此处将 `BOOKINGS` 绑定到确认过的测试 KV。`assets` 与兼容日期保留在顶层。

- **构建设置**：Worker → Settings → Build → Branch control，开启需要的 Preview Builds；预览命令使用 `npx wrangler preview`。`npm run preview` 是本地 Vite 静态预览命令，不用于 Cloudflare 部署。
- **预约存储**：Worker Previews 不继承顶层 `BOOKINGS`，也不会替它自动创建测试 KV。当前测试绑定已写入 `wrangler.jsonc`；如迁移 Cloudflare 账号或更换测试空间，创建新的测试 KV namespace 后，按以下格式替换实际 ID。不要复制生产预约 KV 的 ID。

  ```json
  "previews": {
    "kv_namespaces": [
      { "binding": "BOOKINGS", "id": "填入实际测试 KV namespace ID" }
    ]
  }
  ```

- **预览邮件**：在当前 `dev` 预览中将 `RESEND_API_KEY` 和 `NOTIFY_EMAIL` 都配置为 **Secret**；自定义发件地址 `RESEND_FROM_EMAIL` 也可作为 Secret 配置。预览重新部署会保留已有 Secret；仅在后台添加、没有写入 `previews.vars` 的普通 Text 变量可能被源码配置覆盖。普通变量也可在 `previews.vars` 中声明，密钥不能提交到仓库。新建预览可从 Settings → Variables and secrets → **Previews Base** 初始化密钥；更新 Base 密钥不会自动更新已有 `dev` 预览。
- **缺失参数诊断**：`booking.email_unconfigured` 现在附带 `missing` 列表，只记录缺少的变量名。例如 `missing: ["NOTIFY_EMAIL"]` 表示当前请求没有读到收件邮箱。不会记录密钥、邮箱值或预约内容；这条日志说明尚未调用 Resend。
- **后台绑定**：在 Settings → Bindings → Previews Base 添加绑定后，将后台生成的 `previews` 配置同步回 `wrangler.jsonc`，保持源码与部署设置一致。
- **验收**：使用包含绑定配置的最新提交重新构建预览后，提交测试预约，并在测试 KV 中确认 `booking-` 开头的记录。邮件参数可随后配置，KV 保存成功即可返回预约成功。测试 KV 和邮件渠道均不可用时，预约接口会返回失败。

日志中的 open beta 警告不会导致部署失败；`missing a previews block` 才是需要修复的配置错误。本地的 `wrangler deploy --dry-run` 验证生产部署打包，不能代替云端 `wrangler preview` 的实际发布验收。

参考：[预览配置](https://developers.cloudflare.com/workers/previews/configuration/)、[资源与隔离](https://developers.cloudflare.com/workers/previews/resources/)。

### 预约接口与故障处理

`POST /api/booking` 接受 JSON，必填 `name`、`school`、`contact`，可选 `level`、`need`、`note`；`website` 是蜜罐字段。前五个字段的长度上限分别为 200/200/200/100/100，`note` 为 2000，字符串会去除首尾空格并截断。

- 非法 JSON、非对象、数组或缺少必填内容：`400 {"ok":false}`。
- 蜜罐命中：`200 {"ok":true}`，不保存、不发信。
- KV 保存成功：`200 {"ok":true,"saved":true}`，邮件在 `ctx.waitUntil()` 中后台发送，不承诺已送达。
- KV 失败但 Resend 接受邮件：`200 {"ok":true,"saved":false,"emailed":true}`。
- 两个渠道均失败：`500 {"ok":false}`。邮件请求最多等待 5 秒。
- 非 POST 的预约请求返回 JSON `405` 和 `Allow: POST`；未知 `/api` 路由返回 JSON `404`，不回退到首页。

后台邮件失败只记录错误事件，没有自动重试；预约已经保存在 KV，可手动查询跟进。日志不输出预约正文、联系方式、API Key 或邮件服务的错误正文。

### 本地发布与检查

```bash
npm test
npm run build
npx wrangler deploy --dry-run  # 仅打包检查，不发布
# 仅在需要手动发布时执行：
npx wrangler login
npm run deploy
```

相关文档：[Workers 自动构建](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)、[资源自动创建](https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning)、[Resend 测试域限制](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)。
