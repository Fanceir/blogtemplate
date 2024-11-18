---
id: learn-vite
slug: learn-vite
title: vite初体验
date: 2024-11-09
authors: Fanceir
tags: [interview, front-end]
keywords: [interview, front-end]
---

## vite 初体验

使用 vite 创建一个 react 的项目

```bash
npm create vite@latest
```

然后选择 react 项目，等待安装完成后，进入项目目录

```bash
npm install
```

修改`vite.config.js`文件，添加`alias`配置，首先安装`@types/node`

```bash
npm install @types/node
```

然后在`vite.config.js`文件加入如下配置

```javascript
import {join} from 'path'
resolve: {
  alias: {
    '@': join(__dirname, 'src')
  }
}
```

完整内容如下

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
```

然后修改`tsconfig.app.json`文件，添加`baseUrl`和`paths`配置

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
