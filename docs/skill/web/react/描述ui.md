---
id: describing-the-ui
slug: /describing-the-ui
title: 描述UI
date: 2024-10-13
authors: Fanceir
tags: [react]
keywords: [react]
---

## 1 第一个组件

### 1.1 什么是组件

组件是 React 的核心概念之一，是构建用户界面的基础
这里先写一个组件

```jsx
import React from "react";
export default function App() {
  return <h1>Hello, React!</h1>;
}
```

当然组件也可以返回一个 img 标签

```jsx
import React from "react";
export default function App() {
  return (
    <img
      src="https://www.baidu.com/img/flexible/logo/pc/result.png"
      alt="baidu"
    />
  );
}
```

### 1.2 使用组件

在导出组件之后可以在其他文件中使用这个组件

```jsx
// sidebar.js
import React from "react";
export default function Sidebar() {
  return (
    <div>
      <h1>我是Sidebar</h1>
    </div>
  );
}

//app.js
import React from "react";
import Sidebar from "./sidebar";
export default function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <Sidebar />
    </div>
  );
}
```

当然也可以在一个组件内部使用多个组件

### 1.3 组件的使用

组件是常规的 JavaScript 函数，但是请不要在一个组件的内部定义另外的一个组，应该在顶层定义每一个组件

## 2 组件的导入和导出

组件可以重复利用，所以创建一个组件之后可以添加其他组件
在上面创建了一个 Profile 组件，并且进行了渲染

```jsx
function Profile() {
  return <img src="https://www.fanxu.online/img/logo.webp" alt="Fanceir" />;
}
export default function Gallery() {
  return (
    <div>
      <h1>Gallery</h1>
      <Profile />
    </div>
  );
}
```

### 同一个文件中导出和导入多个组件

这里介绍一下默认导出和命名导出的区别
如果一个文件中只有一个组件需要导出，那么可以使用默认导出

```jsx
export default function App() {
  return <h1>Hello, React!</h1>;
}
```

如果一个文件中有多个组件需要导出，那么可以使用命名导出

```jsx
export function App() {
  return <h1>Hello, React!</h1>;
}
export function Sidebar() {
  return <h1>我是Sidebar</h1>;
}
```

同一文件中，有且仅有一个默认导出，但可以有多个具名导出

注意合理的拆分组件会使代码更加清晰更加易于维护

## 3 使用 JSX 书写标签语言

### 将 HTML 转化为 JSX

使用官网的例子

```html
<h1>海蒂·拉玛的待办事项</h1>
<img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
<ul>
  <li>发明一种新式交通信号灯</li>
  <li>排练一个电影场景</li>
  <li>改进频谱技术</li>
</ul>
```

转化为 JSX

```jsx
export default function App() {
  return (
    <div>
      <h1>海蒂·拉玛的待办事项</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        class="photo"
      />
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </div>
  );
}
```

可以使用转化器来将 HTML 转化为 JSX

## 4 JSX 中使用大括号来使用 JavaScript 表达式

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

但是如果我想要将一个字符串属性传递给 JSX 的时可以使用`{}`

```jsx
export default function Avatar() {
  const avatarUrl = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className="avatar" src={avatarUrl} alt={description} />;
}
```

可以再哪里使用大括号

1. 用作 JSX 标签中的文本：`<h1>{name}</h1>`
2. 用作 JSX 标签的属性值：`<img src={url} />`

使用双大括号来使用 JavaScript 对象

```jsx
export default function TodoList() {
  return (
    <ul style={{ color: "red", backgroundColor: "yellow" }}>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
    </ul>
  );
}
```

## 5 将 Props 传递给组件

React 使用 props 来互相通信，每个父组件可以提供 props 给他的子组件，这一过程叫做父传子

### Props 是什么

Props 是传递给 JSX 标签的信息，如 className、src、alt 等

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

### 子组件读取 props

```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={`https://i.imgur.com/${person.imageId}s.jpg`}
      alt={person.name}
      style={{ width: size, height: size }}
    />
  );
}
```

### 特殊

声明 props 时不要忘记加上`{}`

props 可以指定一个默认值

```jsx
function Avator({ person, size = 100 }) {}
```

props 可以随着时间变化
Props 是只读的，每次渲染都会收到新版本的 props

## 6 条件渲染

在渲染的时候可以选择性地渲染组件

```jsx
function item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}
```

可以使用位运算符号

```jsx
function Item({name,isPacked}){
  return({
    <li className="item">
    {name}{isPacked&&'已打包'}
    </li>
  })
}
```

不要将数字放在`&&`的左侧

## 7 渲染列表

通过 JavaScript 数组来渲染列表

```jsx
const people = [
  {
    id: 0,
    name: "凯瑟琳·约翰逊",
    profession: "数学家",
  },
  {
    id: 1,
    name: "马里奥·莫利纳",
    profession: "化学家",
  },
  {
    id: 2,
    name: "穆罕默德·阿卜杜勒·萨拉姆",
    profession: "物理学家",
  },
  {
    id: 3,
    name: "珀西·莱温·朱利亚",
    profession: "化学家",
  },
  {
    id: 4,
    name: "苏布拉马尼扬·钱德拉塞卡",
    profession: "天体物理学家",
  },
];
```

```jsx
const chemists = people.filter((person) => preson.profession === "化学家");
const listItem = chemists.map((person) => (
  <li key={person.id}>
    <img src="https://i.imgur.com/7vQD0fPs.jpg" alt={person.name} />
    <p>
      {person.name} <br />
      <span>{person.profession}</span>
    </p>
  </li>
));
```

### 为什么要设定 key

key 可以用来帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

但是请尽量不要把索引当作 key，因为这样会导致一些问题
