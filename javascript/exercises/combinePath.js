/* combinePaths.js
 * Write a function combinesPath(pwd, input) that combines pwd and input
 * in a similar fashion as `cd` on the commandline
 * Test cases:
 * combinePaths('/abc', 'def') -> '/abc/def'
 * combinePaths('/abc', '/def') -> '/def'
 * combinePaths('/abc', '..') -> '/'
 * combinePaths('/abc', 'def/..') -> '/abc'
 * combinePaths('/abc', 'def/../xyz') -> '/abc/xyz'
 * combinePaths('/abc', './') -> '/abc'
 * combinePaths('/abc', 'def/./') -> '/abc/def'
 * combinePaths('/abc', '/def/.././xyz') -> '/xyz'
 *
 * XXX: This could use some serious cleanup
 */
var assert = require('assert')

function combinePaths (pwd, input) {
  var output = [pwd]
  var start = 0
  var buffer = ''

  // Handle case where input is an absolute path
  if (input[0] === '/') {
    output.pop()
    buffer += '/'
    ++start
  }

  var curr
  var next
  var i
  var length = input.length
  for (i = start; i < length; i++) {
    curr = input[i]
    next = input[i + 1]

    if (curr === '/') {
      output.push(buffer)
      buffer = ''
    } else if (curr === '.' && next === '.') {
      output.pop()
      i += 2  // skip ../
    } else if (curr === '.' && next === '/') {
      ++i  // skip ./
      buffer = '/'
    } else {
      buffer += input[i]
    }
  }

  // Add valid trailing path
  if (buffer !== '' && buffer !== '/') {
    output.push(buffer)
  }

  // Handle case where path is empty
  if (output.length === 0) {
    output.push('/')
  }

  return output.join('/')
}

assert.equal(combinePaths('/abc', 'def'), '/abc/def')
assert.equal(combinePaths('/abc', '/def'), '/def')
assert.equal(combinePaths('/abc', '..'), '/')
assert.equal(combinePaths('/abc', 'def/..'), '/abc')
assert.equal(combinePaths('/abc', 'def/../xyz'), '/abc/xyz')
assert.equal(combinePaths('/abc', './'), '/abc')
assert.equal(combinePaths('/abc', 'def/./'), '/abc/def')
assert.equal(combinePaths('/abc', '/def/.././xyz'), '/xyz')

console.log('All tests pass!')
