function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), wait)
  }
}


function debounceImmediate(fn, wait, immediate) {
  let timeout, res
  return function(...args) {
    const context = this
    function later()  {
      timeout = null
      if (!immediate) { return fn.apply(context, args) }
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { return fn.apply(context, args) }
  }
}

function hello(x) {  console.log(`Hello World! ${x}`) }

const dbHello = debounce(hello, 1000, true)

for (let i = 0; i < 3; i++) { hello(i) }
console.log('')

for (let i = 0; i < 4; i++) { dbHello(i) }


function sayHello() {
  console.log('My name is', this.name)
}

const amy = {
  name: 'amy',
  speak: debounceImmediate(sayHello, 1000, true),
  speak2: debounceImmediate(sayHello, 1000, false),
  speak3: debounce(sayHello, 1000),
}

amy.speak()
amy.speak2()
amy.speak3()
