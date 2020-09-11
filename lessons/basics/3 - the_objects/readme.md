# The Objects

The objects are data storage.

## Array

An array is used to store a consecutive list of values. An array can store any kind of values.

### Initialization

```js
let a = new Array(5) // create an empty array of size 5
let b = [1,2,3,4,5] // create an array of values
```

### Access element of an array

Starts at 0 ends at size of array minus one.
Use '[*index*]' to get element value at *index* position.

```js
// first element
b[0] // 1
```

```js
// first element
b[b.length - 1] // 5
```

### Iterate over an array

```js
for(/*initIndex*/let i = 0;/*stop condition*/ i < array.length;/*step*/ ++i) {
    console.log(array[i])
}


for(const element of array) {
    console.log(element)
}

```

## String

A string is a character chain.
For example:
```js
const a = "test"
a[0] //t
a[1] //e
a[2] //s
a[3] //t
```

It exists many functions to manipulate a string.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

## Objects

## Map

