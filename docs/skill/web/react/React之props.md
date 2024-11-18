---
id: react-props
slug: /react-props
title: React之props
date: 2024-10-03
authors: Fanceir
tags: [react, props]
keywords: [react, props]
---

## props

`React`组件使用`props`来相互通信，每个父组件都可以通关 props 来传递信息给他的子组件，`props`是只读的，子组件不能修改父组件传递过来的`props`。

### 传递 props

```jsx
function Parent() {
    return <Child name="fanceir" />;
}
```

这就是一个经典的父组件传递给子组件`props`的例子，`Child`组件可以通过`props`来获取`name`的值。

```jsx
function Parent() {
    return <Child person={{ name: "fanceir", age: 18 }} />;
}
```

这同样也是一种父组件传递给子组件的方式，这里我使用了`{{}}`来传递一个对象，在`Child`组件中我可以通过 props.person 来访问`person`对象。

```jsx
//Parent.jsx
import React from "react";
import Child from "./Child";
function Parent() {
    return <Child person={{ name: "fanceir", age: 18 }} />;
}

//Child.jsx
import React from "react";
function Child(props) {
    return <div>{props.person.name}</div>;
}
//或者使用解构
function Child({ person }) {
    return <div>{person.name}</div>;
}
//以上这两种方法都可以获取到`person`对象中的`name`属性
```

### 默认 props

```jsx
function Child(props) {
    return <div>{props.name}</div>;
}
Child.defaultProps = {
    name: "fanceir",
};
```

### 给 Props 一个默认值

```jsx
function Child({ name = "fanceir" }) {
    return <div>{name}</div>;
}
```

### 简化书写 props

```jsx
function Parent(props) {
    return <Child {...props} />;
}

function Child({ name }) {
    return <div>{name}</div>;
}
```

### 将 jsx 最为一个子组件传递

```jsx
function Parent() {
    return <Child>{<div>hello</div>}</Child>;
}
```

```jsx
// utils.jsx
export function getChildNumber(person, number) {
    return person.name + number;
}
```

```jsx
//Parent.jsx
import React from "react";
import Child from "./Child";
import { getChildNumber } from "./utils";
function Parent() {
    return <Child>{getChildNumber({ name: "fanceir" }, 18)}</Child>;
}
```

```jsx
//Child.jsx
import React from "react";
function Child(props) {
    return <div>{props.children}</div>;
}
```

