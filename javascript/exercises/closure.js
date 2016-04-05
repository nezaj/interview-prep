// Example of using a closure in JS to retain the value of an outer loop
// even if the value is accessed at a later point

function closure () {
  var result = []
  for (var i = 0; i < 5; i++) {
    result[i] = (function (j) {
      console.log(j)
    }).bind(null, i)
  }

  return result
}

var arr = closure()

arr.forEach(function (a) { a() })
