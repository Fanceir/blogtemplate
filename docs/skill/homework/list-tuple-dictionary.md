---
id: list-tuple-dictionary
slug: list-tuple-dictionary
title: 列表、元组和字典
date: 2024-09-15
authors: Fanceir
tags: [Python, homework]
keywords: [Python, homework]
---


## list

- list 是有序的可变的集合可以有重复的元素
- list 是用方括号`[]`来表示的

### 如何创建列表

使用py的内置函数`list()`或者直接使用方括号`[]`来创建一个列表

```python
list1 = list() # 创建一个空列表
list2 = [] # 创建一个空列表
list3 = [1, 2, 3, 4, 5] # 创建一个有元素的列表
```

### 列表的操作

我们可以通过`len`来知道列表的长度

```python
len(list3) # 5
```

想要输出列表中的元素可以直接使用`print`

```python
print(list3) # [1, 2, 3, 4, 5]
```

列表可以包含不同的数据类型

```python
lst = [1, 2, 3, 'a', 'b', 'c', True, False]
```

### 列表的索引

列表的索引是从0开始的

```python
lst = [1, 2, 3, 4, 5]
print(lst[0]) # 1
print(lst[1]) # 2
print(lst[2]) # 3
```

可通过正索引和负索引来访问列表中的元素

```python
print(lst[-1]) # 5
print(lst[-2]) # 4
```

### 列表的切片

```python
lst = [1, 2, 3, 4, 5]
print(lst[1:3]) # [2, 3]
print(lst[:3]) # [1, 2, 3]
print(lst[1:]) # [2, 3, 4, 5]
```

第一个索引是包含的，第二个索引是不包含的，注意下标是从0开始的

### 列表的增删改查

可以通过`in`来判断元素是否在列表中

```python
lst = [1, 2, 3, 4, 5]
print(1 in lst) # True
print(6 in lst) # False
```

可以通过`append`来添加元素

```python
lst = [1, 2, 3, 4, 5]
lst.append(6)
print(lst) # [1, 2, 3, 4, 5, 6]
```

可以通过`insert`来插入元素

```python
lst = [1, 2, 3, 4, 5]
lst.insert(1, 1.5)
print(lst) # [1, 1.5, 2, 3, 4, 5]
```

`insert`的第一个参数是插入的位置，第二个参数是插入的元素，上面的例子表示在索引为1的位置插入1.5

可以通过`remove`来删除元素

```python
lst = [1, 2, 3, 4, 5]
lst.remove(3)
print(lst) # [1, 2, 4, 5]
```

表示删除了元素3

可以通过`pop`来删除元素

```python
lst = [1, 2, 3, 4, 5]
lst.pop(2)
print(lst) # [1, 2, 4, 5]
```

这两个方法的区别是`remove`是根据元素的值来删除，`pop`是根据索引来删除

想要删除一个范围的元素可以使用`del`

```python
lst = [1, 2, 3, 4, 5]
del lst[1:3]
print(lst) # [1, 4, 5]
```

清空列表可以使用`clear`

```python
lst = [1, 2, 3, 4, 5]
lst.clear()
print(lst) # []
```

### 列表的复制

```python
lst = [1, 2, 3, 4, 5]
lst1 = lst.copy()
print(lst1) # [1, 2, 3, 4, 5]
```

### 列表后添加一个列表

```python
lst = [1, 2, 3, 4, 5]
lst1 = [6, 7, 8, 9, 10]
lst.extend(lst1)
print(lst) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 列表的排序

```python
lst = [1, 3, 2, 5, 4]
lst.sort()
print(lst) # [1, 2, 3, 4, 5]
```

如果想要降序排序可以使用`reverse`

```python
lst = [1, 3, 2, 5, 4]
lst.sort(reverse=True)
print(lst) # [5, 4, 3, 2, 1]
```

这种方法会改变原来的list，如果不想改变原来的list可以使用`sorted`

```python

lst = [1, 3, 2, 5, 4]
lst1 = sorted(lst)
print(lst) # [1, 3, 2, 5, 4]
print(lst1) # [1, 2, 3, 4, 5]
```

### 列表的反转

```python
lst = [1, 2, 3, 4, 5]
lst.reverse()
print(lst) # [5, 4, 3, 2, 1]
```

## tuple

元组是有序的不可变的集合，可以有重复的元素，元组是用圆括号`()`来表示的
一旦创建了元组，我们就无法更改其值。我们不能在元组中使用 add、insert、remove 方法

### 如何创建元组

使用py的内置函数`tuple()`或者直接使用圆括号`()`来创建一个元组

```python
tpl = tuple() # 创建一个空元组
tpl1 = () # 创建一个空元组
tpl2 = (1, 2, 3, 4, 5) # 创建一个有元素的元组
```

### 基本的元组操作

长度，索引，获取元组中的项

```python

tpl = (1, 2, 3, 4, 5)
print(len(tpl)) # 5
print(tpl[0]) # 1
print(tpl[1]) # 2
print(1 in tpl) # True
print(6 in tpl) # False
```

这些方法和列表是一致的这里就不再赘述

### 元组的切片

```python
tpl = (1, 2, 3, 4, 5)
print(tpl[1:3]) # (2, 3)
print(tpl[:3]) # (1, 2, 3)
print(tpl[1:]) # (2, 3, 4, 5)
```

### 将元组更改为列表

```python
tpl = (1, 2, 3, 4, 5)
lst = list(tpl)
print(lst) # [1, 2, 3, 4, 5]
```

## dictionary

字典是无序的可变的集合，可以有重复的元素，字典是用大括号`{}`来表示的
字典是一个键值对的集合，每个键值对用冒号`:`来分割，每个键值对之间用逗号`,`来分割

### 如何创建字典

使用py的内置函数`dict()`或者直接使用大括号`{}`来创建一个字典

```python
dct = dict() # 创建一个空字典
dct1 = {} # 创建一个空字典
dct2 = {'name': 'Fan', 'age': 20} # 创建一个有元素的字典
```

### 字典的操作

长度，访问字典中的项

```python
dct = {'name': 'Fan', 'age': 20}
print(len(dct)) # 2
print(dct['name']) # Fan
print(dct['age']) # 20
```

### 字典的增删改查

增加一个项

```python
dct= {'name': 'Fan', 'age': 20,'skills': ['Python', 'JavaScript','TypeScript']} 
dct['major'] = 'CS'
print(dct) 
# {'name': 'Fan', 'age': 20, 'major': 'CS'}
dct['skills'].append('Vue')
print(dct)
 # {'name': 'Fan', 'age': 20, 'major': 'CS', 'skills': ['Python', 'JavaScript', 'TypeScript', 'Vue']}
```

注意到这里我使用了`append`来添加一个元素，因为我的skills是一个列表

删除一个项

```python
dct= {'name': 'Fan', 'age': 20,'skills': ['Python', 'JavaScript','TypeScript']}
del dct['age']
print(dct)
# {'name': 'Fan', 'skills': ['Python', 'JavaScript', 'TypeScript']}
```

### 获取字典的键列表

```python
dct= {'name': 'Fan', 'age': 20,'skills': ['Python', 'JavaScript','TypeScript']}
keys = dct.keys()
print(keys) # dict_keys(['name', 'age', 'skills'])
```

### 获取字典的值列表

```python
dct= {'name': 'Fan', 'age': 20,'skills': ['Python', 'JavaScript','TypeScript']}
values = dct.values()
print(values) # dict_values(['Fan', 20, ['Python', 'JavaScript', 'TypeScript']])
```
