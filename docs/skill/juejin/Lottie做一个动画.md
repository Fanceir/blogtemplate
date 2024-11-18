---
id: use-lottie-to-make-a-small-animation
slug: /use-lottie-to-make-a-small-animation
title: 用lottie来做一个小动画
date: 2024-10-31
authors: Fanceir
tags: [juejin,lottie]
keywords: [juejin,lottie]
---

## 使用 lottie 丰富你的博客

今天在掘金看到这样一个文章，可以使用 lottie 来做一个很酷的小动画
[原文地址](https://juejin.cn/post/7430690608711647232)
正如文章中所提到的使用 lottie 可以做一个很酷的动画，只需要导入现成的 json 文件就可以，这里我准备找一个万圣节的小动画，因为今天也是万圣节

### 使用 lottie

找到 lottie 的官网，可以在这里找到很多现成的动画
[lottie 官网](https://lottiefiles.com/)
这里使用的次数是有限的，不付费只能使用 10 次

### md 使用 lottie

因为我的博客是用 docusaurus 搭建的，所以我需要在 md 文件中使用 lottie，可以使用 iframe 来引入 lottie 的动画，下面就是一个简单的例子

<iframe src="https://lottie.host/embed/bbba0b6b-2e36-4b18-8526-ddcaa0ef5315/WBhsiFvUI8.json"></iframe>

```html
<iframe
  src="https://lottie.host/embed/bbba0b6b-2e36-4b18-8526-ddcaa0ef5315/WBhsiFvUI8.json"
></iframe>
```

### 在 react 中使用 lottie

在你的下载页面右下角官方已经给出了 Vue,React 使用方法，这里我使用 react 来进行演示

### 安装 lottie 的 react 包

```bash
pnpm install lottie-react
```

### 下载 json 文件

然后在你的组件钟使用 lottie-react

```jsx
import Lottie from "lottie-react";
import animationData from "../../static/halloween.json";

const App = () => {
  <div style={{ position: "absolute", top: "50px", left: "50px", zIndex: 10 }}>
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: "150px", height: "150px" }}
    />
  </div>;
};
```

当然你也可以下载.lottie 文件，然后使用 DotLottieReact 来进行使用

```tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const App = () => {
  return <DotLottieReact src="path/to/animation.lottie" loop autoplay />;
};
```

然后你就可以在你的 react 项目中使用 lottie 了，你可以看到博客的左上角有一个小动画，这就是 lottie 做的
