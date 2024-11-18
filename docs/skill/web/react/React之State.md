---
id: react-state
slug: /react-state
title: React之State
date: 2024-10-05
authors: Fanceir
tags: [react, state]
keywords: [react, state]
---

## React 中的 State

因为局部变量无法在多次渲染中持久保存，所以当 React 再次渲染这个组件的时候，他会从头开始渲染，不会保留之前的状态，但是我们想要更新数据，所以可以使用 Hook 中的`useState`来实现。

`State` 变量用来保存渲染间的数据，当数据发生变化的时候可以触发重新渲染，`State setter`函数可以用来更新 `State` 变量。

```jsx
import { useState } from "react";
```

通过添加`useState`来引入`State`。

### 基本使用

```jsx
import React, { useState } from "react";
const [count, setCount] = useState(0);
//这里的useState(0)表示初始化count的值为0
//[]包裹的是一个解构数组，它允许你从这个数组中读取值
```

这是一个使用 useState 的例子`const [thing,setThing]`是约定，第一个是变量名，第二个是变量更新的函数，后面的`useState(0)`中的`0`是 thing 的初始值。

### State 的特性

State 是完全独立的，如果我渲染了两个组件，他们的 State 是完全独立的，一个组件的 State 不会影响另一个组件的 State。

设置`State`的时候不会更改已有的`State`会重新渲染，一个`State`永远不会在一次渲染中改变。

### State 的更新

`State`的更新是异步的，所以如果你想要在`State`更新后执行一些操作，你可以使用`useEffect`。

```jsx
import React, { useState, useEffect } from "react";
const [count, setCount] = useState(0);
useEffect(() => {
  console.log("count has changed");
}, [count]);
```

### 使用一系列 State

来看官方文档上的例子

```jsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

这个例子中，当点击一次并没有出现想要的+3 结果，这是因为`setNumber`是异步的，所以在这里`setNumber`并不会立即更新`number`的值，而是在下一次渲染的时候才会更新。

要使用这样的方式更新`State`：
`setNumber((prevNumber) => prevNumber + 1)`

下面来分析几个`setNumber`的使用方式：

```jsx
setNumber(number + 1);
//未使用n直接更新
setNumber((n) => n + 1);
//使用n，在n的基础上更新
setNumber(22);
//直接更新为22
```

#### 命名的规范

通常使用 State 变量中的第一个字母来命名新的更新函数的参数

### 更新对象 State

```jsx
const [person, setPerson] = useState({ name: "fanceir", age: 18 });
function handlePerson(e) {
  setPerson({ ...person, name: e.target.value });
}
```

### 更新数组 State

```jsx
let nextId = 0;
const [name, setName] = useState("");
const [author, setAuthor] = useState([]);

function handleAuthor() {
  setAuthor((prevAuthor) => [
    ...prevAuthor,
    {
      id: nextId++,
      name: name,
    },
  ]);
  setName(""); // 清空输入框
}

return (
  <div>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <button onClick={handleAuthor}>add</button>
    <ul>
      {author.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
);
```

这里的更新数组 State 是通过`setAuthor`的参数函数来实现的，这样可以保证在更新数组的时候不会丢失之前的数据。
