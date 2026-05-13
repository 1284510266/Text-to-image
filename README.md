# 🎨 AI 文字生图

> 输入文字描述，一键生成 AI 图片。基于 Pollinations.ai 免费 API，无需注册、无需密钥、无需后端。

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 快速开始

### 方式一：直接打开（最简单）

双击 `index.html`，浏览器直接打开即可使用。**不需要安装任何依赖，不需要启动服务器。**

### 方式二：本地服务器（可选）

```bash
npx serve .
# 或者
python3 -m http.server 8765
```

然后访问 http://localhost:8765

---

## ✨ 功能特性

- 🎨 **文字→图片** — 输入中文/英文描述，AI 自动生成对应图片
- 📐 **多种尺寸** — 1:1 方形、4:3 横版、3:4 竖版、16:9 宽屏
- 🖌️ **8 种风格** — 写实、动漫、油画、水彩、像素风、3D 渲染、极简、赛博朋克
- ⬇️ **一键下载** — 生成后直接保存图片到本地
- 🔍 **放大查看** — 新窗口打开原图
- 🔄 **失败重试** — 生成失败时一键重试
- 📱 **响应式布局** — 完美适配桌面端和移动端
- 🌙 **暗色主题** — 现代化 UI，视觉舒适

---

## 🖥️ 使用说明

1. 在输入框中输入图片描述
2. 选择尺寸和风格（可选）
3. 点击 **「生成图片」** 或按 `Enter`
4. 等待 10-30 秒，图片自动显示
5. 悬停图片可下载或放大

### Prompt 技巧

好的描述 = **主体 + 场景 + 风格 + 细节**

```
✅ "一只金色柴犬坐在咖啡馆里看书，窗外下着雨，日系动漫风格，温暖的灯光"
❌ "一只狗"
```

---

## 🏗️ 技术方案

- **纯前端**，单个 HTML 文件，零依赖
- 使用 [Pollinations.ai](https://pollinations.ai) 免费 API
- 浏览器直接请求（CORS 已开放，无需代理）
- `fetch` 获取图片 blob，确保完整加载后再显示

---

## 📁 项目结构

```
Text-to-image/
├── index.html      # 完整应用（HTML + CSS + JS 一体化）
├── README.md       # 项目文档
├── LICENSE         # MIT 开源协议
└── .gitignore      # Git 忽略规则
```

---

## ❓ 常见问题

### Q: 点击生成后没反应？

A: Pollinations.ai 首次请求可能需要 10-30 秒，请耐心等待进度提示。

### Q: 提示"生成失败"？

A: 可能原因：
1. **网络问题** — 无法访问 `pollinations.ai`（需要科学上网）
2. **服务繁忙** — 点击「重新生成」按钮重试
3. **浏览器兼容** — 建议使用 Chrome / Edge / Firefox

### Q: 生成的图片可以商用吗？

A: 请参考 [Pollinations.ai 服务条款](https://pollinations.ai)。建议用于个人学习。

---

## 📄 开源协议

[MIT License](./LICENSE)

---

## 🙏 致谢

- [Pollinations.ai](https://pollinations.ai) — 免费 AI 图片生成 API
