/* Item 24:
 * Be aware of scope when referring to implicit object like `arguments` and
 * `this` in nested functions. Use the idiom `var that = this` in outer
 * function to capture their values and use them in nested function expressions
 */

var obj, f

function wrapValue () {
  return function () { return this.val }
}

obj = { 'val': 10 }

f = wrapValue.call(obj)
console.log(f()) // undefined

function wrapValueThat () {
  var that = this
  return function () { return that.val }
}

f = wrapValueThat.call(obj)
console.log(f()) // 10
