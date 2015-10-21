# tcomb-decorators

ES7 Decorators for [tcomb](https://github.com/gcanti/tcomb).

## Installation

```
npm install tcomb-decorators --save
```

## Usage

### @func

```js
import { func } from 'tcomb-decorators';
import { String as Str } from 'tcomb';

class SomeClass {
    @func([Str], Str)
    someFunc(value) {
        return value + 'World';
    }
}

const instance = new SomeClass();

instance.someFunc('Hello '); // Works
instance.someFunc(null); // Throws error
```

### @struct

_Experimental_: The current behaviour maybe changed in the future.

```js
import { struct } from 'tcomb-decorators';
import { String as Str } from 'tcomb';

@struct({
    name: Str
})
class Person {
    constructor(name) {
        this.name = name;
    }
}

new Person('John Doe') // Works
new Person(); // Throws error
```

The `struct` decorator works by wrapping the constructor and using `tcomb-validation`s `validate` function after class construction. So typ checking is only applyed on initialtion. Further modifications of the object does not lead to an validation again.

# LISENCE
MIT