---
id: basic
slug: /algorithm/basic
title: 基础算法
authors: Fanceir
tags: [algorithm, basic]
keywords: [algorithm, basic]
---

## map

`map`是一种键值对的数据结构，可以快速通过`key`找到对应的`value`。
在 js 中，`map`是一种对象，可以通过`new Map()`创建，也可以通过对象字面量创建。

```js
let map = new Map();
map.set(firstname, "haha");
//set (key, value) 添加元素,key是键名，value是键值
//get (key) 获取元素get的是key
map.get(firstname); //haha
//如果key不存在，返回undefined
map.get(lastname) ? map.get(lastname) : map.set(lastname, "hehe");
//这里是如果没有这个lastname那么就设置一个lastname
//has (key) 是否存在
map.has(firstname); //true
//如果存在返回true，否则返回false
//delete (key) 删除元素
//clear () 清空元素
//size () 元素个数
//keys () 获取所有的key
map.keys(); //MapIterator {"firstname", "lastname"}

//values () 获取所有的value
map.values(); //MapIterator {"haha", "hehe"}
//这里的mapiterator是一个迭代器，可以用for of遍历

//entries () 获取所有的key-value
map.entries(); //MapIterator {"firstname", "haha"}, {"lastname", "hehe"}
```

在上面的例子中，`map`是一个对象，`firstname`和`lastname`是`key`，`haha`和`hehe`是`value`。
这里我介绍了一些基本的方法，还有一些方法可以自行查阅。

## set

不同于`map`，`set`是一种没有重复元素的集合，可以通过`new Set()`创建

```js
let set = new Set();
set.add(1);
//add (value) 添加元素
set.add(2);
set.add(3);
set.length; //3
//length属性获取元素个数
set.has(1); //true
//has (value) 是否存在
set.delete(1);
//delete (value) 删除元素
set.clear();
//clear () 清空元素
set.values();
//values () 获取所有的value
set.entries();
//entries () 获取所有的key-value
```

## Array

数组可以通过`new Array()`创建

```js
//Array
let arr = new Array();
//创建一个空数组
arr[0] = "haha";
//添加元素
arr.push("hehe");
//添加元素
arr.join();
//arr.join()方法将数组中的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
let arr1 = arr.join(); //haha,hehe
arr.pop();
//删除最后一个元素
arr.shift();
//删除第一个元素
arr.unshift("haha");
//添加第一个元素
arr.reverse();
//反转数组
arr.sort();
//排序
let arr2 = arr.concat(arr1);
console.log(arr2); //["hehe", "haha", "hehe"]

//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
//splice() 方法会改变原始数组。
//splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

Array.from("haha"); //这个是将字符串转换为数组
```

...tobecontinued