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
      var result = [];
      for (var i = 0, n = a.length; i < n; i++) {
        (function(j) {
          result[i] = function() { return a[j]; };
        })(i);
      }
      return result;
    }
    ```

* Item 14: Beware of scoping in nested function expressions

* Item 15: Don't declare functions in block scopes, may be source of subtle bugs

* Item 16: Don't create variables with `eval`

* Item 17: If you do use `eval`, use it indirectly for performance. Look this up for more details
