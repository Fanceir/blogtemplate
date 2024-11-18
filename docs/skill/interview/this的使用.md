---
id: how-to-use-this
slug: how-to-use-this
title: 如何使用this
date: 2024-11-02
authors: Fanceir
tags: [interview, front-end]
keywords: [interview, front-end]
---

这是 2024 年 11 月 2 日更新的文章，尽力做到 11 月每天都更新一篇较高质量的文章

:::important

本文参考了大佬的文章
https://juejin.cn/post/6844904083707396109

:::

回想一下什么时候会用到 this，现在 react 中普遍使用了函数式组件，弱化了 this 的使用，但是面试还是很喜欢考察 this 的使用的，我做个整理准备 this 相关的使用，this 有哪些考点呢
在学习闭包的时候，经常使用到 this，这也是红宝书中第 10 章 this 的一个部分，在使用 Symbol 的时候，也会用到 this

## 总结 this 的使用

下面总的介绍一下 this 的使用

- 默认绑定，这是最常见的绑定了，在非严格模式下 this 指向的式全局对象，在浏览器中就是 window 在 node 中是 global
- 隐式绑定，例如函数的引用有上下文的对象，`obj.foo()` 这个时候 this 指向的是 obj
- 显示绑定使用 call apply bind，这个时候 this 指向的是传入的对象
- new 绑定，使用 new 关键字调用函数，这个时候 this 指向的是新创建的对象

### 箭头函数和标准函数中的 this

在标准函数中 this 引用的是把函数当成方法调用的上下文对象，在网页的全局上下文中 this 指向的是 windows

在箭头函数中 this 的引用时定义箭头函数的上下文，箭头函数时没有自己的 this 的
举例子

```js
window.col = "red";
let obj = {
  color: "blue",
};
function sayColor() {
  console.log(this.color);
}
sayColor(); // red
obj.sayColor = sayColor;
obj.sayColor(); // blue
```

```js
window.col = "red";
let obj = {
  color: "blue",
};
let sayColor = () => {
  console.log(this.color);
};
sayColor(); // red
obj.sayColor = sayColor;
obj.sayColor(); // red
```

上面的例子是上下文的例子，下面的是箭头函数的例子，这里先将箭头函数的例子，箭头函数的 this 是定义箭头函数的上下文，所以这里的 this 指向的是 window

## 默认绑定

### 1.1 直接调用函数

```js
var color = "red";
function sayColor() {
  console.log(this.color);
}
sayColor(); // red
```

在之前讲过的 let 和 const 中说过，var 是全局变量定义的变量会挂到 window 上所以这里的 this 指向的是 window 输出就是 red

### 1.2 严格模式下的默认绑定

```js
"use strict";
var a = 10;
function foo() {
  console.log("this:", this);
  console.log("this.a:", this.a);
}
console.log(window.foo);
//ƒ foo () {...}
foo(); // this: undefined
// this.a: Uncaught TypeError: Cannot read property 'a' of undefined
```

### 1.3 let 和 const 的默认绑定

```js
let a = 10;
const b = 20;
function foo() {
  console.log("this:", this.a);
  console.log("this.b:", this.b);
}
foo(); // this.a: undefined this.b: undefined
console.log(window.foo); // undefined
```

这里都是 undefined，因为使用了 let,let 是不会挂载到 window 上的

### 1.4 函数套函数

```js
var color = "red";
function foo() {
  var color = "blue";
  function bar() {
    console.log(this.color);
  }
  bar();
}
foo(); // red
```

为什么会是这样的呢？首先我们使用了`foo()`，这样我们进入到了`foo`函数中，然后我们在`foo`函数中调用了`bar`函数，这个时候`bar`函数是一个普通函数，所以`this`指向的是全局对象，所以输出的是`red`

## 隐式绑定

### 2.1 this 永远指向最后一个调用它的对象

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global";
obj.foo(); // 2
```

### 2.2 隐式绑定的丢失问题

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global";
var bar = obj.foo;
bar(); // oops, global
var obj2 = {
  a: 3,
  foo2: obj.foo,
};
console.log(obj2.foo2); // 3
```

这里的`bar`函数是一个普通函数，所以`this`指向的是全局对象，所以输出的是`oops, global`
`obj2.foo2`是一个方法，调用的是 obj2 所以`this`指向的是`obj2`，所以输出的是`3`

```js
function foo() {
  console.log(this.a);
}
var a = 2;
function reFunc(fn) {
  console.log(this);
  fn();
}
var obj = {
  a: 3,
  foo: foo,
};
reFunc(obj.foo);
//window{}
//2
```

```js
function foo() {
  console.log(this.a);
}
function reFunc(fn) {
  console.log(this);
  fn();
}
var obj = {
  a: 1,
  foo: foo,
};
var a = 2;
var obj1 = {
  a: 3,
  reFunc: reFunc,
};
obj1.reFunc(obj.foo);
//obj1
//2
```

有大佬总结了这个东西，如果你把一个函数当成参数传递到另一个函数的时候，会发生隐式丢失，且与包裹着它的函数无关

### 2.3 内置函数

```js
setTimeout(function () {
  console.log(this); // window
});

var a = 0;
function fn() {
  console.log(this.a);
}
var obj = {
  a: 1,
  reFn: fn,
};
setTimeout(obj.reFn, 1000); // 0;
```

## 显示绑定

显示绑定其实是最常见的绑定方式了可以使用 call apply bind 来显示绑定 this 的指向
使用.call()和.apply()方法是直接执行函数的，而.bind()方法是返回一个新的函数，不会立即执行

### 3.1 call 和 apply

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
var a = 1;
foo(); //1
foo.call(obj); //2
foo.apply(obj); //2
```

### 3.2 setTimeout 中的显示绑定

```js
var obj1 = {
  a: 1,
};
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a);
  },
  foo2: function () {
    setTimeout(function () {
      console.log(this);
      console.log(this.a);
    }, 0);
  },
};
var a = 3;

obj2.foo1(); //2 因为是隐式绑定绑定到了obj2
obj2.foo2(); //setTimeout中的this指向的是window
```

那我想要 foo2 输出是 1 怎么办

```js
var obj1 = {
  a: 1,
};
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a);
  },
  foo2: function () {
    setTimeout(
      function () {
        console.log(this);
        console.log(this.a);
      }.call(obj1),
      0
    );
  },
};
var a = 3;

obj2.foo1(); //2 因为是隐式绑定绑定到了obj2
obj2.foo2(); //1
```

这样的写法可以吗？
`obj2.foo2.call(obj1)` 这里改变的是 foo2 钟 this 的指向，foo2 中的指向和 setTimeout 中的指向是不一样的

### 3.3 面试题

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 1 };
var a = 2;

foo(); //2
foo.call(obj); //1
foo().call(obj); //2
```

在这里 `foo.call()` 是显示绑定了 `obj`，所以输出是 1，而下面的 `foo().call(obj)`是先执行 `foo()`，`foo()`是一个普通函数，然后对于 `foo()` 的返回值进行操作可是 `foo()`函数的返回值是 undefined，因此就会报错了。

```js
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}
var obj = { a: 1 };
var a = 2;

foo(); //2
foo.call(obj); //1;
foo().call(obj); //2 1
```

这里我增加了返回值，所以输出就很容易看出来是什么了

### 3.4 bind

bind 的作用是什么，bind 是返回一个新的函数，不会立刻执行

```js
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}
var obj = { a: 1 };
var a = 2;

foo(); //2
foo.bind(obj);
//不输出;
foo().bind(obj); //2
```

### 3.5 面试提升

```js
var obj = {
  a: "obj",
  foo: function () {
    console.log("foo:", this.a);
    return function () {
      console.log("inner:", this.a);
    };
  },
};
var a = "window";
var obj2 = { a: "obj2" };

obj.foo()(); //foo:obj inner:window
obj.foo.call(obj2)(); //foo:obj2 inner:window
obj.foo().call(obj2); //foo:obj inner:obj2
```

```js
var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a;
    return function (c) {
      console.log(this.a + b + c);
    };
  },
};
var a = 2;
var obj2 = { a: 3 };

obj.foo(a).call(obj2, 1); //3+2+1
obj.foo.call(obj2)(1); //b=3 匿名函数this是window 2+3+1=6
```

this 的指向永远是最后调用它的对象
匿名函数的 this 指向的是 window
call apply bind 接收到的第一个参数是 null 或者 undefined，那么 this 指向的是 window
forEach map filter reduce 这些函数的第二个参数是 this 的指向

## new 绑定

### 4.1 new 绑定

```js
var color = "red";
function foo(color) {
  this.color = color;
}
var col1 = new foo("blue");
console.log(col1.color); //blue
```

### 4.2 new 结合显示绑定

```js
var name = "window";
function Person(name) {
  this.name = name;
  this.foo = function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo.call(person2)(); //person2 window
person1.foo().call(person2); //person1 person2
```

## 箭头函数

首先介绍一下箭头函数怎么写

之前的普通函数写法

```js
function foo() {}
var foo1 = function () {};
```

箭头函数的完整写法

```js
var foo3 = (name, age) => {
  console.log(name, age);
};

var name = [1, 2, 3].map((item) => {
  return item + 1;
});
```

箭头函数的简写

```js
//如果只有一个参数可以省略括号
var foo4 = (name) => {
  console.log(name);
};
var nums = [1, 2, 3];
// nums.forEach(item => console.log(item)); 这样写是可以的
nums.forEach((item) => console.log(item)); //这样写也是可以的
```

对于箭头函数它的 this 是定义箭头函数的上下文，所以箭头函数没有自己的 this，如果箭头函数被非箭头函数包裹那么 this 绑定的是最近一层非箭头函数的 this

### 5.1 箭头函数的 this

```js
var obj = {
  name: "obj",
  foo1: () => {
    console.log(this.name);
  },
  foo2: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};
var name = "window";
obj.foo1(); //window
obj.foo2()(); //obj obj
```

### 5.2 嵌套关系的箭头函数

```js
var name = "window";
var obj1 = {
  name: "obj1",
  foo: function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};
var obj2 = {
  name: "obj2",
  foo: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};
var obj3 = {
  name: "obj3",
  foo: () => {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};
var obj4 = {
  name: "obj4",
  foo: () => {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};

obj1.foo()(); //obj1 window
obj2.foo()(); //obj2 obj2
obj3.foo()(); //window window
obj4.foo()(); //window window
```

### 5.3 箭头函数+call

```js
var name = "window";
var obj1 = {
  name: "obj1",
  foo1: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
  foo2: () => {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};
var obj2 = {
  name: "obj2",
};
obj1.foo1.call(obj2)(); //obj2 obj2
obj1.foo1().call(obj2); //obj1 obj1
obj1.foo2.call(obj2)(); //window window
obj1.foo2().call(obj2); //window obj2
```

## 挑战

### 1

```js
var name = "window";
var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};
var person2 = { name: "person2" };

person1.foo1(); //1
person1.foo1.call(person2); //2

person1.foo2(); //window
person1.foo2.call(person2); //window

person1.foo3()(); //window
person1.foo3.call(person2)(); //window
person1.foo3().call(person2); //2

person1.foo4()(); //1
person1.foo4.call(person2)(); //2
person1.foo4().call(person2); //1
```

### 2

```js
var name = "window";
function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1(); //1
person1.foo1.call(person2); //2

person1.foo2(); //1
person1.foo2.call(person2); //1

person1.foo3()(); //window
person1.foo3.call(person2)(); //window
person1.foo3().call(person2); //2

person1.foo4()(); //1
person1.foo4.call(person2)(); //2
person1.foo4().call(person2); //1
```

### 3

```js
function foo() {
  console.log(this.a);
}
var a = 2;
(function () {
  "use strict";
  foo();
})();
```

2 注意到这里的调用`foo()`依旧是 window

### 4

```js
var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); //window
person1.obj.foo1.call(person2)(); //window
person1.obj.foo1().call(person2); //2

person1.obj.foo2()(); //obj
person1.obj.foo2.call(person2)(); //2
person1.obj.foo2().call(person2); //obj
```

## 后续的计划

后续还会出关于 call bind apply 的手写，promise 等也在计划中
