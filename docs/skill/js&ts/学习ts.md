---
id: learn-ts-Day1
slug: /learn-ts-Day1
title: 学习tsDay1
date: 2024-10-24
authors: Fanceir
tags: [ts]
keywords: [ts]
---

0# 类型

typescript 是有定义标识符的

- 基本类型
  - number
  - string
  - boolean
  - null
  - undefined
  - symbol
  - void
  - any

```ts
let name: string = "hello";
let age: number = 10;
let isOk: boolean = true;

let n: null = null;
let u: undefined = undefined;
```

声明一个标识符的时候，如果有直接的写出来的类型那么就用这个类型，如果没有写出来那么就会去推导这个类型

```ts
let name = "hello";
let age = 18;
const height = 180;
```

## 主要的类型

### Array

```ts
let names: string[] = ["John", "Doe", "Smith"];
names.push("aaa");
let nums: Array<number> = [1, 2, 3, 4, 5];
nums.push(6);
console.log(names);
console.log(nums);
```

这里我使用了两种方式来声明数组的类型，一种是`string[]`，一种是`Array<number>`，这两种方式是等价的

### number

```ts
let num: number = 13;
console.log(num);
```

### Object

```ts
let info = {
  name: "John",
  age: 25,
  height: 5.8,
};
//这里没有指定出类型，但是ts会自动推导出类型
console.log(info);
const info: {
  name: string;
  age: number;
  height: number;
} = {
  name: "fanceir",
  age: 18,
  height: 185,
}; //这里指定了类型
```

这里我们一般不会指定类型，这里可以让 ts 自动推导出类型

### any

```ts
let id: any = "aaa";
id = 1;
const infos: any[] = ["abc", 123, {}, []];
let data: number | string;
data = 123;
//我们可以用any来代替所有类型，但是这样会导致类型不安全，所以我们可以使用联合类型
```

可以使用`any`来代替所有类型，但是这样会导致类型不安全，所以我们可以使用联合类型

### unknown

```ts
//unknown 类型是和 any 类型有点相似，但是在unknown类型上进行任何的操作都是不合法的
let foo: any = "aaa";
foo = 123; //这里是可以的

let foo1: unknown = "aaa";
foo1 = 1223;

// console.log(foo1.length);//这里是不合法的是会报错的、
//必须要先进行类型校验，然后才能在缩小之后的类型下进行对应的操作
if (typeof foo1 === "string") {
  console.log(foo1.length);
}
//表示已经校验过了，所以可以使用
//这叫做类型缩小
```

unknown 和 any 的类型区别，两个都是可以代替所有的类型，但是使用的时候 unknown 进行操作是不合法的，必须要先进行类型校验，然后才能在缩小之后的类型下进行对应的操作

### void

void 表示没有任何类型，一般用于函数的返回值

```ts
function sum(num1: number, num2: number): void {
  console.log(num1 + num2);
  return undefined;
}
type LyricInfoType = {
  time: number;
  lyric: string;
};
//parseLyric函数类型是 (lyric: string) => LyricInfoType[]
function parseLyric(lyric: string): LyricInfoType[] {
  const lyricInfos: LyricInfoType[] = [];
  return lyricInfos;
}
type fooType = () => void; //返回值是void类型
const fooo: fooType = () => {};

type delayFunctionType = (...args: any[]) => void;
//定义一个函数并且传入的参数是一个函数，这个函数的参数是一个字符串和一个数字，返回值是void
function delayFunction(fn: delayFunctionType) {
  setTimeout(() => {
    fn("fanceir", 18);
  }, 1000);
}
//执行上面的函数。并且传入一个匿名函数
delayFunction((names, age) => {
  console.log(names, age);
});
//函数没有明确的返回值类型的时候返回一个void
```

这里的使用`:`还是`()=>`用哪个会后续讲到

特殊要点

```ts
const names1: string[] = ["abc", "def", "ghi"];
names1.forEach((item, index, arr) => {
  return 123; //这里返回的123是没有意义的，因为forEach是没有返回值的
});
```

这里我返回了一个 123，但是这个返回值是没有意义的，因为 forEach 是没有返回值的

### never

never 表示永远不会有返回值的类型

```ts
//never表示永远不会有返回值的类型

function fc(): never {
  throw new Error("error");
}

fc();
//一般只有类型推导中会推导出never，但是实际是很少使用的
function test() {
  return [];
}

//封装框架的时候可能会使用never
function handleMessage(message: string | number) {
  switch (typeof message) {
    case "string":
      console.log(message);
      break;
    case "number":
      console.log(message);
      break;
    default:
      const check: never = message;
  }
}
//这里的check更像是一个逻辑的判断，如果排除了所有的可能，就可以使用never
```

### tuple

```ts
//元组类型tuple
//个人信息 fanceir 20 178
const info1: [string, number, number] = ["fanceir", 20, 178];
//元组类型用这样的方式来表示

//元组数据结构中可以放不同的数据类型，取出来的value也是有明确的类型的
function useState(initialState: number): [number, (newValue: number) => void] {
  let stateValue = initialState;
  function setValue(newValue: number) {
    stateValue = newValue;
  }
  return [stateValue, setValue];
}
const [count, setCount] = useState(0);
console.log(count);
setCount(10);
// function useState<T>(state: T): [T, (newState: T) => void] {
//   let stateValue = state;
//   function setValue(newState: T) {
//     stateValue = newState;
//   }
//   return [stateValue, setValue];
// }
```

元组中可以使用不同的数据类型，这样每个拿出来也是有明确类型的，如果使用 any 的话就会导致类型不安全
