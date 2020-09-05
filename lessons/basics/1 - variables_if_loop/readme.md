# Variables and Functions


## Varibles declaration

A variable is declared with the keyword 'var', 'let' or 'const'
* ```let``` declares a variable inside a scope delemited by {}. Ex : ```let toto = 5```
* ```var``` declares a variable inside a scope delimited by the function. Ex : ```var toto = 5```
* ```const``` declares a variable and its content cannot be changed. The variable should be assigned during the declaration. Ex :```const toto = 5```


Even with js is not a typed language, there are primitives.
* Boolean ```true/false```
* Null ```null```
* Undefined ```undefined```
* Number ```1.0 or 1```
* String ```"string"```
* Symbol ```test = function() {}``` To see later

## Functions

```js

// function functionName( argumentsSeparatedByAComma)
function method(val1, val2) {
    //val1 === 1
    //val2 === 2
    return val1 + val2
}

method(1, 2) // call the function method with two arguments

```

## If/else

logical operator (&&, ||, !)
```js
// a && b // if a is true and b is true => true otherwise false
// a || c // if a is true or b is true => true otherwise false
// !a // if a is false => true otherwise false
```
```js
<= // inferior or equal
> // strictly superior
< // strictly inferior
=== // equality. Warning do not use == https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
```
```js

if(val === 1) {

}
else if(val === 2) {

}
else {

}

//switch case
switch (expression) {
  case valeur1:
    // Instructions à exécuter lorsque le résultat
    // de l'expression correspond à valeur1
    instructions1;
    [break;]
  case valeur2:
    // Instructions à exécuter lorsque le résultat
    // de l'expression correspond à valeur2
    instructions 2;
    [break;]
  ...
  [default:
    // Instructions à exécuter lorsqu'aucune des valeurs
    // ne correspond 
    instructions_def;
    [break;]]
}


```

## Loop

```js

for(let i = 0; i < 3; i++) {
    console.log(i)
}

//0
//1
//2

```

## Scope

```js
//Global
{
    //scope 1
    {
        // scope 2
    }
}

function test() {
    // scope of function
}
```