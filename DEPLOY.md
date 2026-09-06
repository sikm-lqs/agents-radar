# 部署指南（你自己的 AI 每日雷达）

本文档面向把本仓库 fork / 重新发布到自己 GitHub 账号下的场景，覆盖 secrets/vars 配置、飞书机器人接入和 GitHub Pages 开启。全程零运维，所有任务跑在 GitHub Actions 上。

## 1. 推送代码到自己的仓库

```bash
# 在 GitHub 网页上新建一个空仓库（不要勾选初始化 README），例如 <your-name>/agents-radar
cd agents-radar
git remote set-url origin git@github.com:<your-name>/agents-radar.git   # 或新增一个 remote
git push -u origin main
```

> 提示：如果希望自己的雷达从零开始积累，推送前可清空 `digests/` 目录及根目录的 `manifest.json` / `feed.xml`（作者的历史日报仅作参考，git 历史里仍在）。

## 2. 配置 Secrets（Settings → Secrets and variables → Actions → Secrets）

| Secret | 必填 | 说明 |
|--------|------|------|
| `GLM_API_KEY` | 是 | LLM provider 密钥。workflow 默认 `LLM_PROVIDER: glm`（智谱 BigModel，默认模型 `glm-5.3`，端点 `https://open.bigmodel.cn/api/coding/paas/v4`）。如改用其他 provider，修改 `.github/workflows/daily-digest.yml` 中的 `LLM_PROVIDER` 并配置对应 key（`ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `OPENROUTER_API_KEY` / `DEEPSEEK_API_KEY` / `DASHSCOPE_API_KEY`） |
| `TAVILY_API_KEY` | 推荐 | [tavily.com](https://tavily.com) 注册免费获取（1000 次/月额度，本仓库每天 2 场 × 4 个查询 ≈ 240 次/月，够用）。用于生成「AI 快讯日报」（ai-news）。**不配置则自动跳过该报告，不影响其他报告** |
| `FEISHU_WEBHOOK_URLS` | 推荐 | 飞书自定义机器人 Webhook 地址，多个地址用英文逗号分隔。配置方法见下文第 4 节 |
| `FEISHU_SECRET` | 视情况 | 飞书机器人开启「签名校验」安全设置时**必填**，值为机器人详情页的签名密钥；使用「自定义关键词」或不开安全设置时留空即可 |
| `PRODUCTHUNT_TOKEN` | 可选 | Product Hunt API token，不配则自动跳过 ai-ph 报告 |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | 可选 | 需要 Telegram 推送时配置 |

`GITHUB_TOKEN` 无需手动配置，Actions 自动注入（workflow 已声明 `contents: write` + `issues: write` 权限）。

## 3. 配置 Variables（Settings → Secrets and variables → Actions → Variables）

| Variable | 必填 | 说明 |
|----------|------|------|
| `PAGES_URL` | 推荐 | 你的 GitHub Pages 地址，如 `https://<your-name>.github.io/agents-radar`。飞书/Telegram 卡片里的报告链接和 RSS feed 都使用它。**不配置则回退到原作者的演示地址，推送卡片里的链接会指错地方** |

## 4. 飞书机器人配置

1. 在飞书中打开目标群聊 → 群设置 → 机器人 → 添加机器人 → 选择「自定义机器人」
2. 给机器人起名（如「AI 雷达」）。安全设置二选一：
   - **自定义关键词**：填入 `agents-radar`（推送内容固定以 `📡 agents-radar` 开头，能匹配该关键词）——此时无需配置 `FEISHU_SECRET`
   - **签名校验**：复制生成的签名密钥，配置到仓库 Secret `FEISHU_SECRET`——代码会自动在请求体中附加 `timestamp` + `sign`（HMAC-SHA256，Base64）
3. 复制生成的 Webhook 地址（形如 `https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx`）
4. 把它配置到仓库 Secret `FEISHU_WEBHOOK_URLS`；要推送到多个群时，用英文逗号拼接多个 Webhook 地址

推送效果：每条报告（AI CLI、AI 快讯、ArXiv 等）一行，附 6 条快讯亮点，点击标题直达 GitHub Pages 上的完整报告。

## 5. 开启 GitHub Pages

1. 仓库 Settings → Pages
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `main`（或你的默认分支），目录选 `/(root)`，保存
4. 等第一次 digest 提交后，访问 `https://<your-name>.github.io/agents-radar/` 即可看到报告列表页（`index.html` + `manifest.json` 驱动）

## 6. 启用并验证 workflow

1. 仓库 Actions 页面 → 启用 `Daily Agents Radar` workflow
2. 点 **Run workflow** 手动触发一次（手动触发不受 guard 限制，一定会跑）
3. 观察运行日志：正常约 15~25 分钟；完成后检查：
   - `digests/<当天日期>/` 下出现 `ai-cli.md`、`ai-news.md` 等报告
   - 仓库 Issues 中出现当天各报告的 Issue（自动打标签）
   - 飞书群收到推送卡片，链接可打开 Pages 报告页

## 7. 运行节奏（双场 + 晚间增量）

| 场次 | UTC | 北京时间 | 行为 |
|------|-----|----------|------|
| 早场 | 23:37 | 次日 07:37 | 全天主报告：生成全部报告、开 Issue、推送通知。若当天 digests 已存在（如手动跑过）则跳过 |
| 晚场 | 11:37 | 19:37 | 内容更新版：重新抓取并覆盖当天 markdown；**不开新 Issue**；与早版做规范化 diff（忽略「生成时间」时间戳和 highlights.json），无实质变化则不提交、不推送通知 |

## 常见问题

- **不想跟踪某个信息源**：Tavily / Product Hunt 不配 key 即自动跳过；GitHub 仓库组（`cli_repos` / `openclaw` / `infra_repos` 等）在 `config.yml` 中整段删除即可。
- **飞书推送报关键词校验失败**：机器人安全设置的自定义关键词必须是推送内容中实际出现的字符串，建议就用 `agents-radar`。若机器人开的是「签名校验」，则必须配置 `FEISHU_SECRET` secret，否则推送会被拒绝（返回签名错误）。
- **定时任务没按时跑**：GitHub Actions 的 cron 在高峰期可能延迟数分钟到几十分钟，属平台正常现象；也可以在 Actions 页面随时手动 Run workflow 补跑。
