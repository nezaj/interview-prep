# Items
Items covered in Effective JS

## JS Basics
* Item 1: Know which version of JS you are using. This is especially important
when using `strict mode` or concatenating files

* Item 2: All #s are floating points, integer arithmetic is most accurate,
floating-point is most performant

* Item 3: Beware implicit coercion, javascript coerces values when using operators, be especially careful when comparing for truthiness

* Item 4: Use primitives over Object wrappers. Object wrappers do not have same behavior as primitives.
    ```
    new String('hello') === 'hello'  // false
    ```

* Item 5: Never use `==` for comparing mixed types, as this will result in implicit coercions. Compare values of identical types and use `===` instead.

* Item 6: Semi-colons are only inferred before a `}`, `\n`, or the end of the program. It is injected only if the next token cannot be parsed.

* Item 7: Think of strings as sequences of 16 bit code units. Beware when using special unicode characters, since these can use multiple code units to represent one character it may throw off operators like indexing and length. Use a special unicode-aware library for these instances

## Variable Scope
* Item 8: Avoid global variables

* Item 9: Always explicitly declare local variables. Easy to accidently leave off `var`. Use a linter to catch these sort of errors

* Item 10: Avoid using `with` keyword. Lots of unexpected behavior due to bindings of `this`. Instead, explicitly bind method calls to a local variable. Alias the local variable if you want to shorten the amount of typing

* Item 11: Use closures. Closures internally store references to their outer variables and ca read/update these variables

* Item 12: Be aware of variable hoisting. That is, variable declarations are moved to the top of their enclosing function scope. Some programmers choose to explicitly define all their variables at the top of the functional scope to signal this.

* Item 13: Use Immediately Invoked Function Expressions (IIFEs) to create local scopes. This very useful in for loops
    ```
    function wrapElements(a) {
      var result = []
      for (var i = 0, n = a.length; i < n; i++) {
        (function(j) {
          result[i] = function() { return a[j] }
        })(i)
      }
      return result
    }
    ```

* Item 14: Beware of scoping in nested function expressions

* Item 15: Don't declare functions in block scopes, may be source of subtle bugs

* Item 16: Don't create variables with `eval`

* Item 17: If you do use `eval`, use it indirectly for performance. Look this up for more details

## Functions
* Item 18: Know the difference between Function, Method, and Constructor Calls.
    * Method calls provide the object in which the method property is looked up as the receiver
    * Functions calls provide global object (or undefined in strict mode) as the receiver. You should only be doing this if the function you are using does not rely on this
    * Constructors are called with the `new` keyword and receive a fresh object as their receiver

* Item 19: Get comfortable using higher-order functions. That is, functions that take other functions in their signature. This is a useful pattern for building flexible code.

* Item 20: Use `call` to call methods with a custom receiver. That is, use `call` to explicitly set the value of `this`. This is useful for borrowing methods from other objects. For example, the special `arguments` variable available in any function is array-like but not truly an array. To convert it to a true array we borrow the slice method from the Array prototype like so `[].slice.call(arguments)`

* Item 21: Use `apply` to call variadic functions (those take a variable number of arguments) with an array. E.g. `func.apply(context, args)` where `context` is the custom receiver and `args` is an array of arguments.

* Item 22: Use the implicit `arguments` object to implement variadic functions. Consider providing additional fixed variable versions of these functions so you don't need to use the apply method (e.g. a public function that explicitly takes an array of arguments and calls `apply` on a private function)

* Item 23: Never directly modify arguments. Copy it's contents to a true array using the idiom `[].slice.call(arguments)`

* Item 24: Be aware of scope when referring to implicit object like `arguments` and `this` in nested functions. Use the idiom `var that = this` in outer function to capture their values and use them in nested function expressions

* Item 25: Be aware that extract a method (e.g. `someobj.func`) does not bind the method's receiver to the original object.
    * When passing an extracted method to a HOF (higher order function) use an anonymous function
        ```
        aList.forEach(function(e) { console.log(e) })
        ```
    * Use `bind` as a shorthand for creating a function bound to a custom receiver. This returns a new function which explicitly sets the context (the value of `this`)

* Item 26: Use `bind` to curry a function, can be more concise than using function wrappers. Pass `null` or `undefined` as the first argument to curry a function that doesn't use `this`

* Item 27: Prefer closures to strings for encapsulating code. Basically never eval code as strings and write HOFs instead. Look this up again for more detail.

* Item 28: Avoid using `toString()` to inspect function signatures and implementations. Output is determined by JS engine and is non-standard

* Item 29: Avoid `arguments.caller` and `arguments.callee` for inspection. Again non-standard across engines and browsers

## Objects and Prototypes
* Item 30: A class is designed by defining a constructor function and associated methods on the prototype

* Item 31: Use `Object.getPrototypeOf` instead of `Object.__proto__`

* Item 32: Never modify an Object's `__proto__` property. Use `Object.create` to set an object's prototype instead
    ```
    CustomComponent.prototype = Object.create(BaseComponent.prototype)
    ```

* Item 33: Make constructors new agnostic or at least establish a convention that constructors must be called with new.
    ```
    // Sample constructor that works w/ and w/o new constructor
    function User(name, passwordHash) {
      var self = this instanceof User ? this : Object.create(User.prototype)
      self.name = name
      self.passwordHash = passwordHash
    }
    ```

* Item 34: Store methods on prototypes rather than instance objects. Exception to this might be if you want to explicitly signal that the object is intended to be a singleton

* Item 35: Use closures to store private data

* Item 36: Store mutable, per-instances data on instances, not on prototypes

* Item 37: Be aware of implicit definition of this. Scope is always determined by nearest enclosing function

* Item 38: When creating subclasses, call the superclass' constructor from the subclass constructor.
    ```
    var CustomComponent = function (root) {
        BaseComponent.call(this, root)
        this.state = {}
    }
    CustomComponent.prototype = Object.create(BaseComponent.prototype)
    ```

* Item 39: Never reuse a superclass property in a subclass. Will get unexpected behavior

* Item 40: Never subclass from standard classes. Will get unexpected behavior due to internal implementation details across engines and browsers

* Item 41: Treat prototypes as implementation details. That is, don't rely on methods/properties to be available on a specific prototype. Look this up for more details

* Item 42: Avoid monkey-patching. This can be useful for testing and polyfills, but otherwise be careful.

## Arrays and Dictionaries
* Item 43: Use object literals (e.g. `{'key': 'value'}`) to construct lightweight dictionaries. Beware this may produce unexpected behavior in `for in` loops due to prototype pollution

* Item 44: To combat `for in` issues, use Object.create(null) to create prototype-free objects

* Item 45: Use `hasOwnProperty` to protect against prototype pollution

* Item 46: Use arrays instead of dictionaries for ordered collections. This is because order is not guaranteed in a `for in` loop for enumerated properties.

* Item 47: Avoid adding properties on `Object.prototype` as this will pollute the enumerable properties for all objects. If you must do this use `Object.defineProperty` and set `enumurable` to `false` in the definition. Look up how to do this.

* Item 48: Don't modify an object while iterating over it's properties in a `for in` loop. If you must modify an object while iterating over its properties, use a regular `for` or `while` loop instead.

* Item 49: Always use `for` instead of `for in` when iterating over indexed properties of an array. This way you won't iterate/modify implicit properties like `length`

* Item 50: As can be seen, `for in` loops have many gotchas. But writing lots of vanilla `for` loops can lead to annoying bugs like off by one for the terminating condition. Instead prefer iteration methods like `forEach`, `map`, `filter`, `some`, and `every`. Regular `for` loops are necessary however if you need to break early. Consider defining custom iteration methods to abstract non-standard loops.

* Item 51: Reuse generic `Array` methods on array-like objects using idioms like `[].slice.call(arrayLikeObject)`. An object is considered array-like if it has indexed properties and a `length` property.

* Item 52: Prefer array literals (e.g. [1, 2, 3]) instead of the `Array` constructor.

## Library and API Design
* Item 53: Use consistent conventions for variable and function names. Don't deviate from standards.

* Item 54: Use `undefined` as `no value`. Test for `undefined` explicitly instead of truth tests. This will protect against inputs that allow `0`, `NaN`, or the empty string.

* Item 55: Use `options` objects to make APIs more usable.
    * All options in the `option` object should be optional
    * Use a custom `extend` function to merge default and specified options

* Item 56: Develop stateless APIs where possible. Strive for idempotency to minimize bugs

* Item 57: Use duck typing for flexible object interfaces. This is useful for developing in-memory implementations and testing behavior.

* Item 58: Never overload duck types with overlapping types. That is, don't accept an array or an object in in the same method. If you do, make sure to explicitly document this and handle it correctly to avoid bugs.

* Item 59: Avoid mixing coercions with overloading. This can be the source of more subtle bugs. If you must do this consider adding guards that check for things like types and values. Look this up for more info.

* Item 60: Support method chaining. Makes your APIs much nicer to use.
    * Return objects in stateless methods
    * Return `this` in stateful methods

## Concurrency
* Item 61: Don't block the event queue on I/O. JavaScript can accept events concurrently but processes events sequentially (or one by one)

* Item 62: Use nested callbacks to perform sequential async. However, beware of callback hell

* Item 63: Beware of silent errors in async. Make sure to handle errors explicitly by taking/returning error values.

* item 64: Loops cannot be async. Use recursive functions extend to perform async iterations in separate turns of the event loop. This has the added benefit of no stack overflow

* Item 65: Avoid expensive algorithms/CPU on the main event queue. Instead, use worker API to do do the work on a separate queue. Alternatively split up computation across multiple turns of event loop (via recursions or callbacks)

* Item 66: Use a countdown counter to perform concurrent operations and persist their results in a deterministic order. Look this up for more information.

* Item 67: Never call an async callback in a synchronous manner. Doing so disrupts the expected sequences of events and the idea that each turn of the event loop processes only one event. This can lead to unexpected stack overflows and mishandled exceptions. Instead, use an async api method like `setTimeout` to call the async method and schedule it in another turn of the event loop.

* Item 68: Use `promises`, `co-routines`, or `async/await` to avoid callback hell and have a better async experience.
