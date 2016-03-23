/* Disquis phone interview:
 * Implement/test debounce
 */
var assert = require('assert')

function debounce (cb, intervalMs) {
  var start
  return function () {
    var now = new Date().getTime()
    if (start === undefined || now - start > intervalMs) {
      start = new Date().getTime()
      cb()
    }
  }
}

let logcalled = 0
let oldlog = console.log
console.log = function () {
  logcalled++
  oldlog.apply(oldlog, arguments)
}

// production code
let helloDebounced = debounce(() => { console.log('Hello') }, 10000)

// testing production code to guarantee that helloDebounced is actually debounced for 10000ms
/* eslint-disable no-extend-native */
Date.prototype.getTime = function () { return 0 }
helloDebounced()
assert.deepEqual(logcalled, 1)

// helloBounced should not have been called again, enough time hasn't passed
helloDebounced()
assert.deepEqual(logcalled, 1)

// helloBounced should be called again, enough time has passed
Date.prototype.getTime = function () { return 10001 }
helloDebounced()
assert.deepEqual(logcalled, 2)
/* eslint-enable */
