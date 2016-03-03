var assertEqual = require('./assertEqual')
var WordCorrect = require('./word_correct')

function test_createWordsMap () {
  var wordList = [
    'SHeep',
    'sheep',
    'lop',
    'loop',
    'apple'
  ]

  var expected = {
    'shep': {
      5: 'sheep'
    },
    'lop': {
      3: 'lop',
      4: 'loop'
    },
    'aple': {
      5: 'apple'
    }
  }

  var actual = WordCorrect.createWordsMap(wordList)
  assertEqual(expected, actual)
}

function test_correct () {
  var word, expected, actual
  var words_map = WordCorrect.createWordsMap(WordCorrect.loadDictionary())

  // Handles mixed cases
  word = 'inSIDE'
  expected = 'inside'
  actual = WordCorrect.correct(word, words_map)
  assertEqual(expected, actual)

  // Handles repeated letters
  word = 'jjoobbb'
  expected = 'job'
  actual = WordCorrect.correct(word, words_map)
  assertEqual(expected, actual)

  // Handles incorrect vowels
  word = 'weke'
  expected = 'wake'
  actual = WordCorrect.correct(word, words_map)
  assertEqual(expected, actual)

  // Handles any combination of mixed-case, repeated letters, incorrect vowels
  word = 'CUNsperrICY'
  expected = 'conspiracy'
  actual = WordCorrect.correct(word, words_map)
  assertEqual(expected, actual)

  // Returns undefined if no correction can be found
  word = 'sheeple'
  expected = undefined
  actual = WordCorrect.correct(word, words_map)
  assertEqual(expected, actual)
}

function test_similaritySort () {
  var input = 'woke'
  var wordList = ['wake', 'weke', 'woke']

  var expected = ['woke', 'wake', 'weke']
  var actual = WordCorrect.similaritySort(input, wordList)
  assertEqual(expected, actual)
}

if (require.main === module) {
  console.log('Starting word_correct test suite...')

  test_createWordsMap()
  test_similaritySort()
  test_correct()

  console.log('All tests pass!')
}
