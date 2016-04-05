// Vanilla debounce without immediate arg

function debounce (func, wait) {
  var timeout, args, context, timestamp
  return function () {
    context = this
    args = [].slice.call(arguments)
    timestamp = new Date()

    function later () {
      var last = (new Date()) - timestamp
      if (last < wait) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        func.apply(context, args)
      }
    }

    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}

function hello () { console.log('Hello!') }

debouncedHello = debounce(hello, 1000)
debouncedHello2 = debounce(hello, 2000)

for (var i = 0; i < 3; i ++) { hello() }
console.log()

for (var i = 0; i < 3; i ++) { debouncedHello(); debouncedHello2() }
