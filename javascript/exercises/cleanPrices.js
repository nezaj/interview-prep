// Clean prices
//
// base_price cleaning_fee   total
//   6.3        5.4          11.7
//   6          6            12 = round(11.7) better
// |6.3-6|=0.3  0.6          0.3+0.6 = 0.9
//   7          5            12
//   0.7        0.4          1.1

// Write a function that satisifies the following:
//
// float array A = [x1, x2, ..., xn]  T = Round(x1+x2+... +xn).
// int array B = [y1, y2, ...., yn] y1+y2+...+yn = T
// minimize sum |x_i-y_i|

var assert = require('assert')

function genPoss(aList) {
  if (aList.length === 1) {
    return [
      [Math.floor(aList[0])],
      [Math.ceil(aList[0])]
    ]
  }

  var head = aList[0]
  var tail = aList.slice(1)
  var tailPoss = genPoss(tail)
  var headFloor = [Math.floor(head)]
  var headCeil = [Math.ceil(head)]

  var floor = genPoss(tail).map(function (t) { return headFloor.concat(t) })
  var ceil = genPoss(tail).map(function (t) { return headCeil.concat(t) })
  return floor.concat(ceil)
}

// returns an array of cleaned prices subject to the minimum difference
// of the original prices
function getPrices (aList) {
  var total = aList.reduce(function (a, b) { return a + b })
  total = Math.round(total)

  var poss = genPoss(aList)

  // filter posibilities to those that equal the total
  var possTotals = poss.filter(function (p) {
    var sum = p.reduce(function (a, b) { return a + b})
    if (sum === total) { return p }
  })

  // iterate through valid posibilities, calculating the difference
  // as I iterate, update which possibility is the min and the min value
  var min_poss
  var min_val
  var length = aList.length
  possTotals.forEach(function (p) {
    var sum = 0
    for (var i = 0; i < length; i++) {
      sum += Math.abs(p[i] - aList[i])
    }
    if (min_val === undefined || sum < min_val) {
      min_val = sum
      min_poss = p
    }
  })

  // return the min possibility
  return min_poss
}

assert.deepEqual(genPoss([1.4]), [[1], [2]])
assert.deepEqual(genPoss([6.3, 5.4]), [[6, 5], [6, 6], [7, 5], [7, 6]])

assert.deepEqual(getPrices([6.3, 5.4]), [6, 6])
assert.deepEqual(getPrices([6.8, 6.1, 6.1]), [7, 6, 6])

console.log('All tests pass!')
