---
id: react-useCallback
slug: /react-useCallback
title: React的useCallback
date: 2024-11-17
authors: Fanceir
tags: [react]
keywords: [react]
---

## 什么是 useCallback

useCallback 是一个允许在多次渲染中缓存函数的 React Hook

```tsx
const callbackFn = useCallback(fn, dependencies);
```

`useCallback` 返回的是一个函数，这个函数是经过优化的，只有在依赖改变的时候才会重新创建，注意在初次渲染的时候 `React` 会返回这个函数但是不会调用他，当进行下一次渲染的时候，如果 `Dependencies` 没有发生变化，那么就会返回这个函数，`React` 不会自动执行这个函数，而是返回这个函数.
`dependencies` 是一个数组，里面记录着这个函数的依赖。当函数的依赖发生变化的时候，React 会使用 `Object.is` 来比较依赖是否发生变化，如果依赖发生变化，`React` 会重新创建这个函数，否则会直接返回这个函数。

## 什么时候需要用到 useCallback

当从父组件传递一个函数给子组件的时候，这个函数依赖父组件的状态，当父组件的状态发生变化的时候，子组件也会随着父组件一起刷新，这就会导致资源的浪费。默认情况下，当一个组件被渲染的时候，React 会递归渲染它的所有子组件，因此每当因为父组件的状态发生变化而导致父组件重新渲染的时候，子组件也会重新渲染。
在 JavaScript 中，`function () {}` 或者 `() => {}` 总是会产生不同的函数，所以这就意味着每次父组件重新渲染的时候，传递给子组件的函数都会是一个新的函数，这就会导致子组件也会重新渲染，注意 useCallback 只是性能优化，如果函数不起作用了应该先找函数的问题

## useCallback 和 useMemo 的区别

useMemo 和 useCallback 经常一起出现，他们的区别在于 `useMemo` 是用来缓存计算结果的，而 `useCallback` 是用来缓存函数的。
下面是官方文档中的例子

```jsx
import { useMemo, useCallback } from "react";

function ProductPage({ productId, referrer }) {
  const product = useData("/product/" + productId);

  const requirements = useMemo(() => {
    //调用函数并缓存结果
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback(
    (orderDetails) => {
      // 缓存函数本身
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

这里的 useMemo 缓存了函数调用的结果，它缓存了调用 `computeRequirements(product)` 而 useCallback 缓存了函数本身

## useCallback 的使用

```tsx
import React, { useCallback, useEffect } from "react";
//定义一个类型
type SearchInputType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type WordType = {
  id: number;
  word: string;
};
//定义一个函数组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = React.useState("");
  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }, []);
  return (
    <>
      <SearchInput onChange={onchange} />
      <hr />
      <SearchResult query={kw} />
    </>
  );
};

export const SearchInput: React.FC<SearchInputType> = React.memo(
  ({ onChange }) => {
    useEffect(() => {
      console.log("SearchInput被渲染了");
    });
    return (
      <>
        <input type="text" onChange={onChange}></input>
      </>
    );
  }
);

export const SearchResult: React.FC<{ query: string }> = (props) => {
  const [list, setList] = React.useState<WordType[]>([]);
  React.useEffect(() => {
    if (props.query === "") return setList([]);
    fetch(`https://api.liulongbin.top/v1/words?kw=` + props.query)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data[0]);
        setList(res.data);
      });
  }, [props.query]);
  return (
    <>
      {list.map((item) => (
        <p key={item.id}>{item.word}</p>
      ))}
    </>
  );
};
```

## 优化自定义 Hook

建议将返回的任何函数都包裹在 useCallback 中，以确保每次渲染时都返回相同的函数引用，这样可以避免不必要的子组件渲染

## 疑难

如果忘记了依赖数组，那么每次渲染都会创建一个新的函数，这样会导致子组件每次都会重新渲染，这样会导致性能问题，所以在使用 useCallback 的时候一定要注意依赖数组

需要在顶层使用 useCallback，不能在循环中调用 useCallback。
