---
id: js-Array
slug: /js-Array
title: JS中的Array
date: 2024-10-20
authors: Fanceir
tags: [javascript]
keywords: [javascript]
---

## Array slice 和 splice

`Array.prototype.slice()` 和 `Array.prototype.splice()` 都是数组的方法，但是它们的作用不同。

### Array.prototype.slice()

`slice()`方法提取一个数组从`start`到`end`（不包括`end`）的元素，不会改变原数组，返回一个新的数组。

```js
const arr = [1, 2, 3, 4];
let myarr = arr.slice(0, 2);
console.log(myarr); // [1, 2]  arr不变
console.log(arr); // [1, 2, 3, 4]
```

可以看到原数组是不会改变的

### Array.prototype.splice()

Splice 方法会为原数组添加或者删除元素，返回被删除的元素，注意这个方法会改变原数组。

```js
const arr = [1, 2, 3, 4];
let myarr = arr.splice(0, 2);
console.log(myarr); // [1, 2]  arr变为[3, 4]
console.log(arr); // [3, 4]
```

更多样例

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let myarr = arr.splice(2, 3, 11, 12, 13);
console.log(myarr); // 从 3 开始删去 3 个元素，然后插入 3 个元素 11 12 13
//arr变为[1, 2, 11, 12, 13, 6, 7, 8, 9, 10]
//myarr为[3, 4, 5]
```

如果不要删除元素，只是插入元素，可以将第二个参数设置为 0

## forEach 和 map
