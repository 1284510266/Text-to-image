# AI 文字生图

输入文字描述，自动生成 AI 图片。

## ✨ 功能

- 🎨 **文字→图片**：输入任意描述，AI 自动生成对应图片
- 📐 **多种尺寸**：方形 1:1、横版 4:3、竖版 3:4、宽屏 16:9
- 🖌️ **风格选择**：写实、动漫、油画、水彩、像素风、3D 渲染、极简、赛博朋克
- ⬇️ **一键下载**：生成后可直接下载图片
- 🔍 **放大查看**：新窗口打开原图
- 📱 **响应式设计**：适配手机和桌面

## 🚀 一键启动

```bash
# 安装依赖
npm install

# 启动服务
npm start
```

然后打开浏览器访问 **http://localhost:8765**

## 📦 技术方案

- **前端**：原生 HTML/CSS/JS，暗色主题，动画卡片
- **后端**：Express 代理服务器（解决跨域问题）
- **AI 引擎**：[Pollinations.ai](https://pollinations.ai) 免费 API，无需密钥

## 📁 项目结构

```
text-to-image/
├── index.html      # 前端界面
├── server.js       # Express 代理服务器
├── package.json    # 项目配置
├── start.sh        # 一键启动脚本
└── README.md       # 说明文档
```

## 📄 License

MIT
