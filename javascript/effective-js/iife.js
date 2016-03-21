/* Item 13:
 * Use Immediately Invoked Function Expressions (IIFEs) to capture values of
 * variables in local scope. This is very useful in things like for loops
 * where we return a function that is meant to be executed at a later time
 */
var wrapped, f

// Returns an array of functions. Intended behavior is that each function
// returns value of the array at that index. What actually happens is each
// function returns undefined since i is set to a.length by the time the
// functions are executed. So each function returns a[a.length] which is
// undefined
function wrapElements (a) {
  var result = []
  for (var i = 0, n = a.length; i < n; i++) {
    result[i] = function () { return a[i] }
  }
  return result
}

wrapped = wrapElements([10, 20, 30, 40, 50])
f = wrapped[0]
console.log(f()) // undefined

// Returns an array of functions. This works as expected since we bind j
// to the value of i for each iteration of the for loop. In this case when
// we invoke the functions later we return the value at the proper index.
function wrapElementsIIFE (a) {
  var result = []
  for (var i = 0, n = a.length; i < n; i++) {
    (function () {
      // Bind j to i so that when we later call this
      var j = i
      result[i] = function () { return a[j] }
    })()
  }
  return result
}

wrapped = wrapElementsIIFE([10, 20, 30, 40, 50])
f = wrapped[0]
console.log(f()) // 10

// Alternative implementation of IIFE. We bind j to i again by including it in
// the signature of our function expression and invoking the function with i
function wrapElementsIIFE2 (a) {
  var result = []
  for (var i = 0, n = a.length; i < n; i++) {
    (function (j) {
      result[i] = function () { return a[j] }
    })(i)
  }
  return result
}

wrapped = wrapElementsIIFE2([10, 20, 30, 40, 50])
f = wrapped[0]
console.log(f()) // 10
