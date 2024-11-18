---
id: react-useRef
slug: /react-useRef
title: React的useRef
date: 2024-11-10
authors: Fanceir
tags: [react]
keywords: [react]
---

`useRef`是 React 的一个 Hook，可以用来引用一个不需要渲染的值

```tsx
const inputRef = useRef(null);
const ref = useRef(initialValue);
```

这是一个比较简单的例子，useRef 返回一个只有一个属性的对象
`current`属性是一个可变的额值，它之后可以被设置为其他的值，和`useState`不同，当修改 current 值的时候，React 是不会重新渲染的，所以除了初始化外不要再渲染的时候写入或者读取`ref.current`

可以使用 ref 来操作 DOM

```tsx
//使用useRef获取DOM元素
import React, { useRef } from "react";

export const InputFocus: React.FC = () => {
  const InputRef = useRef<HTMLInputElement>(null);
  const getFocus = () => {
    console.log("InputRef:", InputRef);
    InputRef.current?.focus(); //有可能是没有值的，所以要加个问号
  };
  return (
    <>
      <input type="text" ref={InputRef} />
      <button onClick={getFocus}>获取焦点</button>
    </>
  );
};
```

React 会保存 ref 的初始值，并且在后续的渲染中忽略它，但是不要在 useRef 中新建一个对象。

```tsx
import { useRef, useState } from "react";
export default function CountRef() {
  const [count, setCount] = useState(0);
  const countRef = useRef<number | undefined>();
  //   function add() {
  //     setCount((count) => count + 1);
  //     countRef.current = count;
  //   }
  //useRef在组件首次被渲染的时候被创建，在重新渲染的时候不会重复创建Ref对象
  const add = () => {
    setCount((count) => count + 1);
    countRef.current = count;
  };
  return (
    <div>
      旧的值是{countRef.current} 新的值是{count}
      <button onClick={add}>+1</button>
    </div>
  );
}
```

useRef 只会在开始的时候渲染

```tsx
import { useRef, useState } from "react";

export default function CountTimeRef() {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount((count) => count + 1);
  };
  const timeRef = useRef(Date.now());
  return (
    <>
      <h1>
        count的值是{count}time的值是{timeRef.current}
      </h1>
      <button onClick={add}>+1</button>
    </>
  );
}
//在组件首次初始化的一次会渲染一次
```

使用 forwardRef 来获取子组件的 ref

```tsx
//使用useImperativeHandle按需暴露成员
import React from "react";
import { useRef, useState, useImperativeHandle } from "react";

const Child = React.forwardRef((_, ref) => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount((count) => count + 1);
  };

  useImperativeHandle(ref, () => ({
    count,
    reset: () => setCount(0),
  }));
  //可以使用useImperativeHandle来控制暴露给父组件的ref对象
  return (
    <>
      <h3>count的值是{count}</h3>
      <button onClick={add}>+1</button>
    </>
  );
});

export const Father: React.FC = () => {
  const childRef = useRef<{ count: number; reset: () => void }>(null);
  const showRef = () => {
    console.log(childRef.current);
  };
  const onReset = () => {
    childRef.current?.reset();
  };
  return (
    <>
      <h1>这是Father组件</h1>
      <button onClick={showRef}>展示ref</button>
      <button onClick={onReset}>重置</button>
      <Child ref={childRef} />
    </>
  );
};
```

这里使用了`useImperativeHandle`来控制暴露给父组件的`ref`对象
这里介绍一下`useImperativeHandle`的用法，第一个参数是`ref`对象，第二个参数是一个函数，函数返回一个对象，其实还有第三个参数，是一个依赖项的数组

```tsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... 你的方法 ...
    };
  }, []);
  // ...
```
