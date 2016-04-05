// Vanilla throttle implementation

var assertEqual = require('assert').deepEqual

function throttle (func, wait) {
  var context, args, start, now
  return function () {
    context = this
    args = [].slice.call(arguments)
    now = new Date()
    if (start === undefined || now - start > wait ) {
      start = now
      func.apply(context, args)
    }
  }
}

function hello (i) { console.log('Hello World: ' + i) }

console.log('No throttle:')

for (var i = 0; i < 4; i ++) {
  hello(i)
}

console.log('\nWith throttle:')
var throttledHello = throttle(hello, 1000)
setTimeout(throttledHello.bind(null, ++i), 1000)
setTimeout(throttledHello.bind(null, ++i), 1500)
setTimeout(throttledHello.bind(null, ++i), 2000)
