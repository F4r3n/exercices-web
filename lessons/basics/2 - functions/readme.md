# Functions and algorithm


## Functions

A function is composed with arguments. The arguments are local to the function.
To return a value from a function you can use the keyword ```return ```

More info : https://www.w3schools.com/js/js_functions.asp

```js
function decrease(left) {
  return left - 1
}
```

## Recursive

A recursive algorithm is an algorithm which calls itself.

```js
function decrease(left) { //recursive algorithm
  console.log(left)
  if(left === 0) return 0
  return decrease(left - 1)
}

```

What happens here:

```js
decrease(5)

5  
4  
3  
2  
1  
0
```

Each time "decrease" is called it has a smaller argument. When it reaches 0, the value is returned.

```js
function add(left) { //recursive algorithm
  console.log(left)
  if(left === 0) return 0
  return add(left - 1) + left
}

```

```js
add(3) = add(3 - 1) + 3
add(2) = add(2 - 1) + 2
add(1) = add(1 - 1) + 1
add(0) = 0


add(3) = 0 + 1 + 2 + 3 = 6
```

## Iterative

Contrary to an algorithm recursive, an iterative algoritm is based on loop repetition of a process.

```js
function decrease(left) { //iterative algorithm
  let v = left
  for(let i = 0; i < left; ++i)
    v -= 1;

  return v
}

```

```js
function add(left) { //iterative algorithm
  let v = 0;
  for(let i = 0; i < left; i++) {
    v += i
  }
  return let
}
```
