/* Exports convenience function for assert.deepEqual with
 * custom error message */
var assert = require('assert')
var inspect = require('util').inspect

/* Build custom error message for AssertionErrors */
function _error (expected, actual) {
  return '\n\nExpected: ' +
    inspect(expected) +
    '\nActual: ' + inspect(actual) + '\n'
}

function assertEqual (expected, actual) {
  assert.deepEqual(expected, actual, _error(expected, actual))
}

module.exports = assertEqual
