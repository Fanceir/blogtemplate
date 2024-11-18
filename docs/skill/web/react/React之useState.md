---
id: react-useState
slug: /react-useState
title: React的useState
date: 2024-11-10
authors: Fanceir
tags: [react]
keywords: [react]
---

## useState 的初步介绍

`useState`是 react 的一个 hook，可以用作在函数组件中添加状态
调用 useState 可以给他传入一个初始的值，一般使用 use+变量名来命名

```tsx
import React, { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>你点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
}
```

这里一般使用小驼峰进行命名
useState 返回一个由两个值组成的数组,
当前的 state，在首次渲染的时候，它的值和你传入的 useState 的第一个参数一样，set 函数，它可以将 state 更新为不同的值并且重新触发渲染

useState 是一个 hook 所以只能在组件的顶层或者自己的 hook 中使用它

## useState 的渲染

useState 首先肯定会在创建这个组件的时候执行一次，然后在每次调用 set 函数的时候会重新渲染这个组件,set 函数仅仅更新下一次渲染的状态变量所以在调用 set 函数后读取状态，仍然得到调用之前的旧的值。

```tsx
import React from "react";

export const Count: React.FC = () => {
  console.log("导入了Count组件");
  const [count, setCount] = React.useState(0);
  //调用useState可以给他一个初始值
  //z只要状态发生变化就会有一个新的值
  //已经渲染过一遍了之后会修改状态，不会重新赋初值
  console.log("触发了useState");
  const add = () => {
    setCount(count + 1);
  };
  const reset = () => {
    setCount(0);
  };
  //第一个是状态值，第二个要以set开始使用小驼峰来进行命名
  return (
    <>
      <h1>Count的值是{count}</h1>
      <button onClick={add}>+1</button>
      <button onClick={reset}>重置</button>
    </>
  );
};
```

## useState 存储对象

useState 想要存储对象的时候可以使用这样的方式

```tsx
import React, { useState } from "react";

export default function DateCom() {
  const [date] = useState(() => {
    const dt = new Date();
    return {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate(),
    };
  });
  return (
    <>
      <h1>当前的日期</h1>
      <p>当前的月份{date.year}</p>
      <p>当前的月份{date.month}</p>
      <p>当前的月份{date.day}</p>
    </>
  );
}
```

这里使用了一个函数来进行初始化，但是如何去更新对象呢？

```tsx
export const Userinfo: React.FC = () => {
  const [user, setUser] = useState({
    name: "faa",
    age: 18,
    gender: "男",
  });
  const onChangeUser = () => {
    user.name = "bbb";
    user.age = 20;
    setUser({ ...user });
  };
  return (
    <>
      <h1>用户信息</h1>
      <p>姓名：{user.name}</p>
      <p>年龄: {user.age}</p>
      <p>性别: {user.gender}</p>
      <button onClick={onChangeUser}>修改信息</button>
    </>
  );
};
```

这里的`setUser`是一个浅拷贝，所以在修改对象的时候需要使用`...`来进行拷贝
实际上是因为判断是否是同一个对象主要是看访问的地址是否相同，所以在修改对象的时候要注意这一点，当使用 `setUser({ ...user })` 时，它会创建一个新的对象，并将 user 的属性复制到这个新对象中。

## 更新完之后的值

之前已经说到过，由于异步的原因，set 函数只会在下一次渲染的时候更新状态，所以在调用 set 函数之后读取状态，仍然得到调用之前的旧值，使用 useEffect 可以解决这个问题

```tsx
// import { useEffect } from "react";
import React, { useState, useEffect } from "react";
export const Count2: React.FC = () => {
  console.log("导入了Count组件");
  const [count, setCount] = useState(0);
  //调用useState可以给他一个初始值
  //只要状态发生变化就会有一个新的值
  //已经渲染过一遍了之后会修改状态，不会重新赋初值
  console.log("触发了useState");
  const add = () => {
    setCount(count + 1);
    // console.log(count);
  };

  //useEffect的fn属性首先被渲染的时候也会执行一次
  useEffect(() => {
    console.log("触发了useEffect");
    console.log(`count的值是${count}`);
  }, [count]);
  const reset = () => {
    setCount(0);
  };
  //第一个是状态值，第二个要以set开始使用小驼峰来进行命名
  return (
    <>
      <h1>Count的值是{count}</h1>
      <button onClick={add}>+1</button>
      <button onClick={reset}>重置</button>
    </>
  );
};
```

## 值的更新

之前只能加一，但是如何加多个呢？

```tsx
import React from "react";
import { useState } from "react";
export default function Count3() {
  const [count, setCount] = useState(0);
  //   const add = () => {
  //     setCount(count + 1);
  //     setCount(count + 1);
  //   };//发现这种情况只能加1，因为setCount是异步的，所以第一个setCount执行完后，count还是0，所以第二个setCount还是加1
  const add = () => {
    setCount((count) => count + 2);
  };
  return (
    <>
      <h1>Count的值是{count}</h1>
      <button onClick={add}>+2</button>
    </>
  );
}
```

这里的 set 函数选择了调用一个函数，这样写可以保证每次都能进行操作，使用函数的写法可以改善代码的可读性，也可以避免一些问题

## click 事件被异常调用

下面的代码会导致点击按钮的时候就会调用 setCount 函数，这是不对的，因为这里的 setCount 函数是在渲染的时候就会调用的，但是这样也会报错

```tsx
import React, { useState } from "react";

export default function Count4() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>Count的值是 {count}</h1>
      <button onClick={add}>+1</button>
      {/* 这里的写法会导致按钮无法正常工作 */}
      <button onClick={setCount(count + 1)}>+1</button>
    </>
  );
}
```

正确的写法

```tsx
import React, { useState } from "react";
export default function Count4() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>Count的值是 {count}</h1>
      <button onClick={add}>+1</button>
    </>
  );
}
```

## 出现循环调用

```tsx
// 🚩 错误：在渲染过程中调用事件处理函数
return <button onClick={handleClick()}>Click me</button>;

// ✅ 正确：将事件处理函数传递下去
return <button onClick={handleClick}>Click me</button>;

// ✅ 正确：传递一个内联函数
return <button onClick={(e) => handleClick(e)}>Click me</button>;
```

## 总结

- useState 是一种可以存储状态的 hook
- useState 返回一个数组，第一个是状态值，第二个是更新状态的函数
- useState 可以存储对象，但是在更新对象的时候需要使用浅拷贝
- useState 是异步的，所以在调用 set 函数之后读取状态，仍然得到调用之前的旧值，使用 useEffect 可以解决这个问题
- useState 可以使用函数的方式来进行更新，这样可以避免一些问题
- 在渲染的时候调用 set 函数会导致循环调用，所以要注意这一点
