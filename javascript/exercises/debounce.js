// Debounce as implemented underscore style
k
var assert = require('assert')

function debounce (func, wait, immediate) {
  var timeout, result
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) { result = func.apply(context, args) }
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { result = func.apply(context, args) }

    return result
  }
}
