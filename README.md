# 🎨 AI 文字生图

> 输入文字描述，一键生成 AI 图片。基于 Pollinations.ai 免费 API，无需注册、无需密钥。

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📖 项目简介

AI 文字生图是一个轻量级的 Web 应用，允许用户通过输入中文或英文的文字描述（Prompt），自动生成高质量的 AI 图片。

**核心特点：**
- 🆓 **完全免费** — 使用 Pollinations.ai 开放 API，无需付费、无需注册
- 🚀 **一键启动** — `npm start` 即可运行，零配置
- 🎭 **多种风格** — 写实、动漫、油画、水彩、像素风、3D 渲染等 8 种预设风格
- 📐 **灵活尺寸** — 支持方形、横版、竖版、宽屏四种比例
- 🌙 **暗色主题** — 现代化 UI 设计，视觉舒适
- 📱 **响应式布局** — 完美适配桌面端和移动端

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/1284510266/Text-to-image.git
cd Text-to-image

# 2. 安装依赖
npm install

# 3. 启动服务
npm start
```

启动后终端会显示：

```
✅ Server running at http://localhost:8765
```

打开浏览器访问 **http://localhost:8765** 即可使用。

### 一键启动（Linux/macOS）

```bash
chmod +x start.sh
./start.sh
```

`start.sh` 会自动检测 `node_modules` 是否存在，未安装时自动执行 `npm install`。

---

## 🖥️ 使用说明

### 基本使用

1. 在输入框中输入图片描述，例如：
   - `一只穿着宇航服的柴犬在月球上散步`
   - `A futuristic city at sunset, cyberpunk style`
   - `水墨画风格的山水风景`

2. 点击 **「生成图片」** 按钮（或按 `Enter` 键）

3. 等待 10-30 秒，图片将自动显示

4. 鼠标悬停在图片上，可以：
   - ⬇️ **下载** — 保存图片到本地
   - 🔍 **放大** — 在新窗口查看原图

### 高级选项

| 选项 | 说明 | 可选值 |
|------|------|--------|
| **尺寸** | 输出图片的宽高比 | 1:1 方形、4:3 横版、3:4 竖版、16:9 宽屏 |
| **风格** | 图片的艺术风格 | 自动、写实、动漫、油画、水彩、像素风、3D 渲染、极简、赛博朋克 |

### Prompt 编写技巧

好的描述 = **主体** + **场景** + **风格** + **细节**

```
✅ 好的 Prompt：
"一只金色柴犬坐在咖啡馆里看书，窗外下着雨，日系动漫风格，温暖的灯光"

❌ 过于简单的 Prompt：
"一只狗"
```

**提升效果的关键词：**
- 光线：`自然光`、`golden hour`、`studio lighting`
- 质量：`high quality`、`detailed`、`4K`
- 构图：`close-up`、`wide angle`、`bird's eye view`

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────┐
│                  浏览器                       │
│  ┌─────────────────────────────────────────┐ │
│  │           index.html (前端)              │ │
│  │  • 文字输入 & 风格/尺寸选择               │ │
│  │  • 图片展示 & 下载                       │ │
│  │  • 加载状态 & 错误处理                    │ │
│  └──────────────┬──────────────────────────┘ │
│                 │ fetch /api/generate         │
│  ┌──────────────▼──────────────────────────┐ │
│  │         server.js (Express 代理)         │ │
│  │  • 接收前端请求                           │ │
│  │  • 拼接 Pollinations.ai URL              │ │
│  │  • 代理返回图片数据                       │ │
│  └──────────────┬──────────────────────────┘ │
└─────────────────┼───────────────────────────┘
                  │ HTTPS
    ┌─────────────▼─────────────┐
    │    Pollinations.ai API    │
    │   (免费 AI 图片生成服务)   │
    └───────────────────────────┘
```

### 为什么需要代理服务器？

浏览器直接请求 Pollinations.ai 会遇到 **CORS 跨域限制**。Express 服务器作为中间代理，转发请求并返回图片数据，绕过了这个限制。

### API 接口

**请求：**
```
GET /api/generate?prompt={文字描述}&width={宽度}&height={高度}&seed={随机种子}
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| prompt | string | ✅ | - | 图片描述文本 |
| width | number | ❌ | 1024 | 图片宽度 |
| height | number | ❌ | 1024 | 图片高度 |
| seed | number | ❌ | 随机 | 随机种子（相同种子+相同 prompt = 相同图片） |

**响应：** 返回 JPEG 图片二进制流

**示例：**
```
http://localhost:8765/api/generate?prompt=a%20cute%20cat&width=1024&height=1024
```

---

## 📁 项目结构

```
Text-to-image/
├── index.html          # 前端页面（HTML + CSS + JS 一体化）
├── server.js           # Express 代理服务器
├── package.json        # 项目配置 & 依赖声明
├── package-lock.json   # 依赖版本锁定
├── start.sh            # 一键启动脚本
├── .gitignore          # Git 忽略规则
└── README.md           # 项目文档（本文件）
```

### 文件说明

| 文件 | 作用 |
|------|------|
| `index.html` | 单文件前端应用，包含完整的 HTML 结构、CSS 样式和 JavaScript 逻辑 |
| `server.js` | Express 服务器，提供静态文件服务和 `/api/generate` 图片代理接口 |
| `start.sh` | Bash 启动脚本，自动检查并安装依赖，适合 Linux/macOS 一键启动 |
| `package.json` | npm 项目配置，声明 `npm start` 命令和 express 依赖 |

---

## 🔧 配置修改

### 修改端口

编辑 `server.js`，修改 `PORT` 变量：

```javascript
const PORT = 8765;  // 改为你想要的端口
```

### 修改默认尺寸/风格

编辑 `index.html`，修改对应的 `<select>` 元素中的 `value` 属性。

---

## ❓ 常见问题

### Q: 图片生成很慢？

A: 首次生成可能需要 10-30 秒，取决于 Pollinations.ai 的负载。后续请求通常更快（有 CDN 缓存）。

### Q: 生成失败怎么办？

A: 检查以下几点：
1. 服务器是否正常运行（终端显示 `Server running`）
2. 网络是否可以访问 `pollinations.ai`
3. 尝试刷新页面重新生成

### Q: 可以同时生成多张图片吗？

A: 当前版本支持顺序生成。每次点击「生成图片」会创建一个新任务，多张图片会依次显示在画廊中。

### Q: 图片有版权问题吗？

A: Pollinations.ai 生成的图片遵循其服务条款。建议用于个人学习和非商业用途。

### Q: 如何在服务器上部署？

A: 确保服务器已安装 Node.js，执行 `npm install && npm start`，然后通过服务器 IP + 端口访问。如需外网访问，确保防火墙开放对应端口。

---

## 🛣️ 后续计划

- [ ] 支持批量生成
- [ ] 添加图片历史记录
- [ ] 支持自定义 Prompt 模板
- [ ] 添加图片分享功能
- [ ] 支持更多 AI 模型选择

---

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源。

---

## 🙏 致谢

- [Pollinations.ai](https://pollinations.ai) — 提供免费的 AI 图片生成 API
- [Express](https://expressjs.com) — 轻量高效的 Node.js Web 框架

---

> 如有问题或建议，欢迎提交 [Issue](https://github.com/1284510266/Text-to-image/issues)
