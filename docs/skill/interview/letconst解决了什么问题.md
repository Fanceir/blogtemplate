---
id: let-const-problem
slug: let-const-problem
title: let const 解决了什么问题
date: 2024-10-30
authors: Fanceir
tags: [interview, front-end]
keywords: [interview, front-end]
---

## JavaScript 高级程序设计 3.2

### let const 和 var

ECMAscript 变量是松散类型的，所以可以用于保存任何类型的数据，每个变量不过是一个占位符号，一共有三个关键字可以用于声明变量
`var` `let` `const` 在这三个关键字中，var 再所有 ecma 版本都可以使用而 const 和 let 只能再 es6 之后使用

### var

var 可以用来定义一个变量

```js
var message = 1;
```

但是有的时候忘记了定义过一个变量你可能会写出这样的代码

```js
var message = 1;
message = "hhh";
```

这样的操作是合法的但是是不建议使用的

#### var 的声明作用域

var 操作定义的变量会包含它的函数的局部变量
举个红宝书上的例子使用 var 在一个函数内部定义一个变量就意味着该变量会在函数退出后被销毁，这里会联系到作用域的问题，后续也会更新

```js
function test() {
  var message = "hello";
}
test();
console.log(message); // error
```

因为这里的 message 变量实在函数内部使用 var 来定义的，所以在函数被调用之后被销毁了

```js
function test() {
  message = "hello";
}
test();
var message;
console.log(message); // hello
```

注意到一个细节，在这里我的 var 的声明是在函数调用之后的，但是在函数调用的时候就已经使用了这个 message，这其实就是变量提升

#### var 的变量提升

```js
function foo() {
  console.log(age);
  var age = 20;
}
foo(); // undefined
```

这里不会报错而是指出了这是一个 undefined，这是因为在使用这个关键字声明的变量会自动提升到函数作用域的顶部，所以这里的代码实际上是这样的

```js
function foo() {
  var age;
  console.log(age);
  age = 20;
}
```

所以也就很好的解释了为什么这里的代码是 undefined 了

### let 和 const

let 和 const 是差不多的，区别是 const 声明的变量是一个常量，一旦声明就不能再改变了

```js
if (true) {
  var name = "Alice";
  console.log(name); // Alice
}
console.log(name); // Alice
if (true) {
  let age = 28;
  console.log(age); // 28
}
console.log(age); // error
```

注意一下这里的 error 是因为 age 没有被定义，因为它的作用域仅限该 if 的内部
let 是不允许同一个块作用域出现冗余声明的
当然在不同的块作用域中是被允许出现同一个变量名的

```js
if (true) {
  let name = "Alice";
  console.log(name); // Alice
}
let name = "Bob";
console.log(name); // Bob
```

#### let 的暂时性死区

```js
console.log(name); // error
let name = "Alice";
```

#### 全局声明问题

let 在全局作用域声明的变量不会成为 window 对象的属性，不过 let 声明的变量仍然会在全局作用域中出现，所以确保不会重复声明同一个变量

```js
if (typeof name === "undefined") {
  let name;
}
name = "Bob";
console.log(name); // Bob
```

name 被限制在 if 的作用域中，因此这个赋值形同全局作用域的赋值
name = "Bob"; 在全局作用域中操作，由于全局没有声明 name，JavaScript 引擎会自动创建一个全局变量 name，并赋值 "Bob"

#### for 循环中的 let

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

#### const

const 的行为和 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，而且尝试修改 const 声明的变量会导致运行时错误，因为你不改那就不能改了

```js
const name = "Alice";
name = "Bob"; // error
```

### 声明风格

尽量不适用 var 了，因为它的作用域问题，let 和 const 会更好一些

const 优先，let 次之，var 不推荐
