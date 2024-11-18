---
slug: this 的绑定
title: this 的绑定
date: 2024-09-02
authors: Fanceir
tags: [javascript]
keywords: [javascript]
image: https://s2.loli.net/2024/07/24/iheyz3CPOQoaIX7.png
---

# this 的指向

- 函数在调用的过程中，JavaScript 会给 this 一个值
- this 的绑定和定义的位置没有关系
- this 的绑定和调用的方式和调用的位置有关

this 的四个绑定规则

- 默认绑定
- 隐式绑定
- 显示绑定
- new 绑定

## 默认绑定

```javascript
function foo() {
  console.log(this);
}
foo(); //这里独立函数调用输出window
```

把函数定义在对象中，但是独立调用

```javascript
var obj = {
  name: "fanc",
  bar: function () {
    console.log("bar:", this);
  },
};
var bazzz = obj.bar;
bazzz();
```

严格模式下独立调用函数中的 this 指向的是 undefined

## 隐式绑定

必须在调用对象的内部有一个对函数的引用，如果没有这样的引用就会报错找不到函数

```javascript
function foo() {
  console.log("foo:", this);
}
var obj = {
  bar: foo,
};
obj.bar();
```

```javascript
function foo() {
  console.log(this);
}
var obj1 = {
  name: "obj1",
  foo: foo,
};
var obj2 = {
  name: "obj2",
  foo: foo,
  obj1: obj1,
};
foo(); // window
obj1.foo(); // obj1
obj2.foo(); // obj2
obj2.obj1.foo(); // obj1
```

`obj2.obj1`就是调用了 obj1

## new 绑定

创建一个全新的对象
这个新对象会被执行 prototype 连接
这个欣对象会绑定到函数调用的 this 上
如果函数没有返回其他的对象，表达式会返回这个新对象

```javascript
function preson() {
  console.log("foo:", this); //person
}
new foo();
```

## 显示绑定

```javascript
var obj = {
  name: "obj",
};
function foo() {
  console.log("foo:", this);
}

//直接执行函数，this的指向为obj
foo.call(obj); //foo: {name: "obj"}
foo.apply(obj); //foo: {name: "obj"}
```

如果不想再对象内部包含这个函数的引用，可以使用 call 或者 apply 来改变 this 的指向

如果要传递参数怎么办
`apply`第一个参数是绑定 this 的第二个参数是传递额外的实参，是以数组的形式

```javascript
function foo(a, b) {
  console.log("foo:", this, a, b);
}
foo.apply(obj, [1, 2]); //foo: {name: "obj"} 1 2
```

`call` 是多参数的形式来进行传递的

```javascript
foo.call(obj, 1, 2); //foo: {name: "obj"} 1 2
```

### bind

`bind`方法会创建一个新的绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入的第一个参数作为 this，传入的第二个参数加上绑定函数运行时传入的参数按顺序作为参数来调用原函数

```javascript
function foo() {
  console.log("foo:", this);
}
var obj = {
  name: "obj",
};
var bar = foo; //这里bar是一个全局函数
bar(); //foo: window
//如果是
var bar1 = foo.bind(obj);
bar1(); //foo: {name: "obj"}
```

bind 也是和 call 一样的

```javascript
function foo(a, b) {
  console.log("foo:", this, a, b);
}
```

## 内置函数的调用绑定

```javascript
setTimeout(function () {
  console.log("foo:", this); //window
}, 1000);

[1, 2, 3].forEach(function (item) {
  console.log("item:", this);
}, "aaa");
//item: aaa

var btnEl = document.getElementById("btn");
btnEl.onclick = function () {
  console.log("this:", this); //btn
};
```

## this 绑定的优先级

### 显示绑定的优先级高于隐式绑定

```javascript
function foo() {
  console.log("foo:", this);
}
var obj1 = {
  name: "obj1",
  foo: foo,
};
var obj2 = {
  name: "obj2",
};
obj1.foo.call(obj2); //foo: {name: "obj2"}
```

这里的隐式绑定是 obj1.foo，但是显示绑定是 obj2

### new 绑定高于隐式绑定

```javascript
var obj = {
  name: "obj",
  foo: function () {
    console.log("foo:", this);
  },
};
new obj.foo(); //foo: {}
```

new 不可以和 call apply 一起使用

### new 和 bind 可以一起使用并且 new 绑定高于显示绑定

```javascript
function foo() {
  console.log("foo:", this);
}

var bar = foo.bind("aaa");
new bar(); //foo: {}
```

### new 绑定高于显示绑定

```javascript
var obj = {
  name: "obj",
  foo: function () {
    console.log("foo:", this);
  },
};
var bar = new obj.foo();
```

### 箭头函数的 this

箭头函数没有 this，箭头函数的 this 是继承外层的 this

```javascript
var obj = {
  name: "obj",
  foo: function () {
    setTimeout(() => {
      console.log("foo:", this);
    }, 1000);
  },
};
obj.foo(); //foo: {name: "obj"}
```
