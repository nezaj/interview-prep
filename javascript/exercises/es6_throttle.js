function throttle(fn, wait) {
  // Goal here is to run fn at least once every wait
  let start, now, context
  return function(...args) {
    context = this
    now = new Date()
    if (start == null || now - start > wait) {
      start = now
      fn.apply(context, args)
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
setTimeout(throttledHello.bind(null, i), 0)
setTimeout(throttledHello.bind(null, i), 100)
setTimeout(throttledHello.bind(null, i), 100)
