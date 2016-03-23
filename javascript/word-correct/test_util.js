var assertEqual = require('./assertEqual')
var Util = require('./util')

function test_dedupeRepeat () {
  var word, expected, actual

  word = 'sheeep'
  expected = 'shep'
  actual = Util.dedupeRepeat(word)
  assertEqual(expected, actual)

  word = 'apple'
  expected = 'aple'
  actual = Util.dedupeRepeat(word)
  assertEqual(expected, actual)
}

function test_maxLTE () {
  var aList, val, expected, actual

  aList = [1, 2, 3, 4]
  val = 3
  expected = 3
  actual = Util.maxLTE(aList, val)
  assertEqual(expected, actual)

  aList = [4, 1, 2]
  val = 3
  expected = 2
  actual = Util.maxLTE(aList, val)
  assertEqual(expected, actual)

  aList = [1, 2, 4]
  val = 0
  expected = undefined
  actual = Util.maxLTE(aList, val)
  assertEqual(expected, actual)
}

function test_permuteVowels () {
  var word, expected, actual

  // Replaces no vowels
  word = 'shhh'
  expected = ['shhh']
  actual = Util.permuteVowels(word)
  assertEqual(expected, actual)

  // Replaces one vowel
  word = 'cat'
  expected = ['cat', 'cet', 'cit', 'cot', 'cut']
  actual = Util.permuteVowels(word)
  assertEqual(expected, actual)

  // Replaces multiple vowels
  word = 'loop'
  expected = [
    'laap', 'laep', 'laip', 'laop', 'laup',
    'leap', 'leep', 'leip', 'leop', 'leup',
    'liap', 'liep', 'liip', 'liop', 'liup',
    'loap', 'loep', 'loip', 'loop', 'loup',
    'luap', 'luep', 'luip', 'luop', 'luup'
  ]
  actual = Util.permuteVowels(word)
  assertEqual(expected, actual)

  // Does the right thing for words with several vowels
  word = 'people'
  var expected_length = Math.pow(5, 3)
  var actual_length = Util.permuteVowels(word).length
  assertEqual(expected_length, actual_length)
}

if (require.main === module) {
  console.log('Starting util test suite...')

  test_dedupeRepeat()
  test_maxLTE()
  test_permuteVowels()

  console.log('All tests pass!')
}
