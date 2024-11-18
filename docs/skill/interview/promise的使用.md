---
id: how-to-use-promise
slug: how-to-use-promise
title: 如何使用promise
date: 2024-11-02
authors: Fanceir
tags: [interview, front-end]
keywords: [interview, front-end]
---

## promise 的基础概念

Promise 对象标识一个异步操作，有三种状态，pending fulfilled rejected，当 promise 被调用之后它会显示 pending 状态，被创建的 promise 最后会以 fulfilled 或者 rejected 状态结束

来看这样一段代码

```js
let myPromise2 = new Promise((resolve, reject) => {
  let a = 1;
  for (let index = 0; index < 5; index++) {
    a++;
  }
});
console.log("myPromise2 :>> ", myPromise2);

myPromise2.then(() => {
  console.log("myPromise2执行了then");
});
```

在 pending 状态下，promise 不会执行回调函数 then

## 手写 promise

通过手写 `promise` 来了解 `promise` 的实现原理
回忆一下一刚刚整理的 `promise` ，`promise` 是有两个参数的，一个是 `resolve` 表示成功，一个是 `reject` 表示拒绝，由此还可以引申推广到，`promise` 的三个状态，分别是 `pending`, `fulfilled`, `rejected`

promise 肯定是一个类，这个类有 resolve 和 reject 两个方法，还有一个 then 方法，then 方法接收两个参数，一个是成功的回调，一个是失败的回调，then 方法还会返回一个新的 promise

```js
class myPromise {
  constructor(executor) {
    let resolve = () => {}; //成功
    let reject = () => {}; //失败
    executor(resolve, reject);
  }
}
```

然后根据三个状态

```javascript
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
}
```

平时我们使用完了这些东西之后会使用`.then`方法来做下一步操作

```javascript
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
    if (this.state === "pending") {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

如果 then 中如果 onFulfilled 和 onRejected 不是函数，那么我们就忽略它，让值穿透

```javascript
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    // executor(this.resolve.bind(this), this.reject.bind(this));
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
    }
  }
  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
  }
}
```

添加异步操作

```javascript
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback());
    }
  }

  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback());
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    if (this.state === "pending") {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.value);
        });
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          onRejected(this.reason);
        });
      });
    }
    if (this.state === "fulfilled") {
      setTimeout(() => {
        onFulfilled(this.value);
      });
    }
    if (this.state === "rejected") {
      setTimeout(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

链式调用

```javascript
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback());
    }
  }

  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback());
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new myPromise((resolve, reject) => {
      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            onFulfilled(this.value);
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            onRejected(this.reason);
          });
        });
      }
      if (this.state === "fulfilled") {
        setTimeout(() => {
          onFulfilled(this.value);
        });
      }
      if (this.state === "rejected") {
        setTimeout(() => {
          onRejected(this.reason);
        });
      }
    });
    return promise2;
  }
}
```

最终版本

```js
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback());
    }
  }

  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback());
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new myPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  if (x && (typeof x === "object" || typeof x === "function")) {
    let used;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

## 做题

### 基础部分

以下都是林呆呆大佬的题目

(https://juejin.cn/post/6844904077537574919)

#### 1.1

```js
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
});
console.log("1", promise1);

//promise1
//1 Promise { <pending> }
```

#### 1.2

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve("success");
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
//1 2 4 3
```

先使用了`new`来新建一个`promise`对象，然后进入执行同步代码打印 1，然后`resolve`成功，promise 的状态改为`resolved`，然后继续执行输出 2 然后看到了`then`任务，这个任务是一个微任务将它加入到微任务队列，然后输出 4 最后输出了 3

#### 1.3

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
//1 2 4
```

这里首先进入了 new 然后输出了 1，2，但是没有确定是否是 resolved 还是 rejected，所以没有 then，然后输出了 4

#### 1.4

```js
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
//'promise1'
//1 Promise { 'resolve1' }
//2 Promise { <pending> }
//resolve1
```

#### 1.5

```js
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
fn().then((res) => {
  console.log(res);
});
console.log("start");
// 1
// 'start'
// 'success'
```

注意到这里的 fn 函数后面是一个立即执行函数，所以会直接立即执行，关于立即 Promise 的执行

#### 1.6

```js
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then((res) => {
  console.log(res);
});
// "start"
// 1
// "success"
```

### setTimeout 和 Promise 结合

#### 2.1

```js
console.log("start");
setTimeout(() => {
  console.log("time");
});
Promise.resolve().then(() => {
  console.log("resolve");
});
console.log("end");
//start
//end
//resolve
//time
```

#### 2.2

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
//1
// 2
// 4
// "timerStart"
// "timerEnd"
// "success"
```

#### 2.3-1

```js
setTimeout(() => {
  console.log("timer1");
  setTimeout(() => {
    console.log("timer3");
  }, 0);
}, 0);
setTimeout(() => {
  console.log("timer2");
}, 0);
console.log("start");
//start
//timer1
//timer2
//timer3
```

#### 2.3-2

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
}, 0);
console.log("start");
//start
//timer1
//promise
//timer2
```

promise 是一个微任务所以会在本轮执行结束之后执行

#### 2.3-3

```js
Promise.resolve().then(() => {
  console.log("promise1");
  const timer2 = setTimeout(() => {
    console.log("timer2");
  }, 0);
});
const timer1 = setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise2");
  });
}, 0);
console.log("start");
//start
//promise1
//timer1
//promise2
//timer2
```

宏任务->微任务->宏任务->微任务
就是通过这样的循环

#### 2.4

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

//p1 pending
//p2 pending
//Error
//promise1 resolved success
//promise2 rejected
```

#### 2.5

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    console.log("timer1");
  }, 1000);
  console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("timer2");
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
//promise1里的内容
//1 pending
//2 pending
//timer1
//error
//p1 resolved success
//p2 rejected
```

### Promise 中的 then、catch、finally

#### 3.1

```js
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
//then:success1
```

#### 3.2

```js
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
  .then((res) => {
    console.log("then1: ", res);
  })
  .then((res) => {
    console.log("then2: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  })
  .then((res) => {
    console.log("then3: ", res);
  });
//catch:error
//then3:undefined
```

#### 3.3

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
//1 2
```

#### 3.4

```js
Promise.reject(1)
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    console.log(err);
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
//1 3
```

#### 3.5

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("timer");
    resolve("success");
  }, 1000);
});
const start = Date.now();
promise.then((res) => {
  console.log(res, Date.now() - start);
});
promise.then((res) => {
  console.log(res, Date.now() - start);
});
//timer
//success 1001
//success 1002
```

如果够快可能都是 1001

#### 3.6

```js
Promise.resolve()
  .then(() => {
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
//then error
```

#### 3.7

```js
const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.err);
```

不能返回 promise 本身所以会造成死循环

#### 3.8

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
```

`.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传，直接将 resolve1 传递到最后一个 then 中

#### 3.9

```js
Promise.reject("err!!!")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  });
//error err!!!
//如果去掉了(err) => {console.log("error", err);}，那么就会输出 catch err!!!
```

```js
Promise.resolve()
  .then(
    function success(res) {
      throw new Error("error!!!");
    },
    function fail1(err) {
      console.log("fail1", err);
    }
  )
  .catch(function fail2(err) {
    console.log("fail2", err);
  });
//fail2 Error: error!!!
//at success
```

#### 3.10

```js
Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
Promise.resolve("2")
  .finally(() => {
    console.log("finally2");
    return "我是finally2返回的值";
  })
  .then((res) => {
    console.log("finally2后面的then函数", res);
  });
// '1'
// 'finally2'
// 'finally'
// 'finally2后面的then函数' '2'
```

```js
Promise.resolve("1")
  .finally(() => {
    console.log("finally1");
    throw new Error("我是finally中抛出的异常");
  })
  .then((res) => {
    console.log("finally后面的then函数", res);
  })
  .catch((err) => {
    console.log("捕获错误", err);
  });
//'finally1'
//捕获错误 Error: 我是finally中抛出的异常
```

如果这里改为`return new Error`就会打印出`finally后面的then函数 Error: 我是finally中抛出的异常`

```js
function promise1() {
  let p = new Promise((resolve) => {
    console.log("promise1");
    resolve("1");
  });
  return p;
}
function promise2() {
  return new Promise((resolve, reject) => {
    reject("error");
  });
}
promise1()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally1"));

promise2()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally2"));
// promise1
// 1
//error
//finally1
//finally2
```

总结

- `promise` 的状态一经改变就不能改变
- `.catch` `.then`会返回一个新的`promise`
- catch 不管连接到哪里都执行上面未捕获的错误
- 在`Promise`中返回一个非`promise`的值都会被包裹成`promise`并且是`resolved`状态
- `.then` `.catch`中不能返回`promise`本身
- `.finally`方法返回一个`promise`，不管怎么样都会执行里面的回调函数

### Promise 中的 all 和 race 练习

首先简单介绍一下`Promise.all`和`Promise.race()`
简单来说`.all`是接受一组异步仍无，然后执行他们，并且在所有的异步任务都操作完才会执行回调函数`.race`是接受一组异步任务，只要有一个任务完成就可以执行回调函数

#### 4.1

```js
const p1 = new Promise((r) => console.log("立即打印"));
```

如果直接定义一个`promise`对象，那么会立即执行
如过这样就可以在调用的时候执行这个函数

```js
function fn() {
  const p1 = new Promise((r) => console.log("立即打印"));
  return p1;
}
fn();
```

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
  console.log(res)
);
// 1
// 2
// 3
// [1, 2, 3]
```

这样可以并行执行多个异步操作，在一个回调中可以拿到所有的返回数据，
这里的 res 是一个数组，并且数组的数据是和接收的数据一一对应的

#### 4.2

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
//   // 1s后输出
// 1
// 3
// // 2s后输出
// 2
// Error: 2
// // 4s后输出
// 4
```

这里的`all`是并行执行的，所以只要有一个`reject`那么就会直接进入`catch`函数

`race`是只会执行最快的那个异步操作

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));
// 1
// 'result: ' 1
// 2
// 3
```

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));
//   0
// 'Error: 0'
// 1
// 2
// 3
```

### async 和 await

#### 5.1

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log("start");
// 'async1 start'
// 'async2'
// 'start'
// 'async1 end'
```

首先是定义了两个`async`函数，首先调用第一个函数，输出了`async1 start` 然后发现了`await`这会阻塞后面的代码执行所以会先去执行 async2 中的同步代码，输出了`async2`然后跳出了`async1`，输出了`start`，最后输出了`async1 end`

```js
async function async1() {
  console.log("async1 start");
  new Promise((resolve) => {
    console.log("promise");
  });
  console.log("async1 end");
}
async1();
console.log("start");
// 'async start'
// 'promise'
// 'async1 end'
// 'start'
```

#### 5.2

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  setTimeout(() => {
    console.log("timer");
  }, 0);
  console.log("async2");
}
async1();
console.log("start");
// a1 s
// a2
// start
// a1 end
// timer
```

#### 5.3

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log("timer1");
  }, 0);
}
async function async2() {
  setTimeout(() => {
    console.log("timer2");
  }, 0);
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log("timer3");
}, 0);
console.log("start");
// 'async1 start'
// 'async2'
// 'start'
// 'async1 end'
// 'timer2'
// 'timer3'
// 'timer1'
```

#### 5.4

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
```

注意到在`await new Promise`的时候，没有返回值，所以一直在`await`

#### 5.5

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise1 resolve");
  }).then((res) => console.log(res));
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
// 'promise1 resolve'
// 'async1 success'
// 'async1 end'
```

#### 5.6

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise resolve");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => {
  console.log(res);
});
new Promise((resolve) => {
  console.log("promise2");
  setTimeout(() => {
    console.log("timer");
  });
});
// 'script start'
// 'async1 start'
// 'promise1'
// 'promise2'
// 'async1 success'
// 'async1 end'
// 'timer'
```

### 综合题目

#### 6.1

```js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
        console.log(p);
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then((arg) => {
      console.log(arg);
    });
  });
first().then((arg) => {
  console.log(arg);
});
console.log(4);
```

#### 6.2

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolve3");
    console.log("timer1");
  }, 0);
  resolve("resovle1");
  resolve("resolve2");
})
  .then((res) => {
    console.log(res);
    setTimeout(() => {
      console.log(p1);
    }, 1000);
  })
  .finally((res) => {
    console.log("finally", res);
  });
//   'resolve1'
// 'finally' undefined
// 'timer1'
// Promise{<resolved>: undefined}
```

`finally`中的 res 是不会接收到 Promise 的返回值的
