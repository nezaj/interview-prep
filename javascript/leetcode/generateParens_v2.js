var generateParenthesis = function(n) {
  let res = []
  helper(n, n, res, "")
  return res
};

var helper = function(left, right, res, aStr) {
  if (right < left) { return null }
  if (right === 0 && left === 0) { res.push(aStr) }
  if (left > 0) { helper(left - 1, right, res, aStr + '(') }
  if (right > 0) { helper(left, right - 1, res, aStr + ')') }
}

console.log(generateParenthesis(1).length)
console.log(generateParenthesis(2).length)
console.log(generateParenthesis(3).length)
console.log(generateParenthesis(4).length)
console.log(generateParenthesis(5).length)
