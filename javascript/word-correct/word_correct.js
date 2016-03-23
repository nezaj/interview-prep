// # Word Correction
//
// Write a program in JavaScript that reads a large list of English words (e.g. from /usr/share/dict/words on a unix system) into memory, and then reads words from stdin, and prints either the best spelling correction, or "NO CORRECTION" if no suitable correction can be found.
//
// The program should print "> " as a prompt before reading each word, and should loop until killed.
//
// For example:
//
//     $node ./spellcorrecter.js
//     > sheeeeep
//     sheep
//     > CUNsperrICY
//     conspiracy
//     > sheeple
//     NO CORRECTION
//
// The class of spelling mistakes to be corrected is as follows:
//
// 1. Case (upper/lower) errors `inSIDE -> inside`
// 2. Repeated letters `jjoobbb -> job`
// 3. Incorrect vowels `weke -> wake`
// 4. Any combination of the above types of errors `CUNsperrICY -> conspiracy`
//
//
// Your solution should be faster than O(n) per word checked, where n is the length of the dictionary. That is to say, you can't scan the dictionary every time you want to spellcheck a word.
//
// If there are many possible corrections of an input word, your program can choose one in any way you like, however your results *must* match the examples above (e.g. "sheeeeep" should return "sheep" and not "shap").
//
var fs = require('fs')

var Util = require('./util')

/* The meat and potatoes!
 * Returns the "best" correction given an input and a pre-processed map
 * of possible corrections. We use a prepocessed map to make our lookup time
 * faster O(n) where n would be the length of our possible correcitons
 *
 * Handles the following class of spelling mistakes:
 * 1. Case (upper/lower) errors `inSIDE -> inside`
 * 2. Repeated letters `jjoobbb -> job`
 * 3. Incorrect vowels `weke -> wake`
 * 4. Any combination of the above types of errors `CUNsperrICY -> conspiracy`
 */
function correct (input, words_map) {
  var correction, word, original_length, deduped, permutations, sequences

  // Generate a list of sequences to check for corrections.
  // Sequences are sorted by similarity to input
  word = input.toLowerCase()
  original_length = word.length
  deduped = Util.dedupeRepeat(word)
  permutations = Util.permuteVowels(deduped)
  sequences = similaritySort(deduped, permutations)

  // Check whether a sequence maps to corrections.
  // If so, try to find a correction <= the original length of the input.
  // If one exists, we set that as the correction and we're done
  while (!correction && sequences.length !== 0) {
    var seq = sequences.shift()
    if (seq in words_map) {
      var seq_map, seq_lengths, closest_length

      seq_map = words_map[seq]
      seq_lengths = Object.keys(seq_map)
      closest_length = Util.maxLTE(seq_lengths, original_length)
      if (closest_length) {
        correction = seq_map[closest_length]
      }
    }
  }

  return correction
}

/* Convert dictionary to a nested map that indexes words by:
 * 1) the sequence of non-repeating characters (case-insensitive)
 * 2) the original word length
 */
function createWordsMap (wordList) {
  var map = {}
  wordList.forEach(function (word) {
    var original_length, deduped

    word = word.toLowerCase()
    original_length = word.length
    deduped = Util.dedupeRepeat(word)
    map[deduped] = map[deduped] || {}
    map[deduped][original_length] = word
  })

  return map
}

/* Returns a sorted list of words based on their similarity to the given
 * input. Uses the following criteria:
 * 1) Words with more letters in the same place come first
 * 2) Words with same score are sorted by alphabetical order
 * e.g. ('woke', ['wake', 'weke', 'woke']) -> ['woke', 'wake', 'weke']
 *
 * Note: This assumes all words are same length
 */
function similaritySort (input, wordList) {
  // Initialize mapping of words to scores
  var ws_map = {}
  wordList.forEach(function (word) { ws_map[word] = 0 })

  // Tally scores for each word
  var i
  var length = input.length
  for (i = 0; i < length; i++) {
    wordList.forEach(function (word) {
      if (input[i] === word[i]) { ++ws_map[word] }
    })
  }

  // Invert word_score map to be a map of scores pointing to a list of words
  var sw_map = {}
  var word
  for (word in ws_map) {
    var score = ws_map[word]
    sw_map[score] = sw_map[score] || []
    sw_map[score].push(word)
  }

  // For each score, sort words in alphabetical order
  for (score in sw_map) { sw_map[score].sort() }

  // Get the list of scores from highest to lowest
  var final_scores = Object.keys(sw_map).sort().reverse()

  // Finally, return a flattened list of words sorted by similarity
  // and alphabetical order
  return final_scores.map(function (score) {
    return sw_map[score]
  }).reduce(function (a, b) { return a.concat(b) })
}

/* Returns a list of words from a dictionary file */
function loadDictionary (infile) {
  infile = infile || '/usr/share/dict/words'
  return fs.readFileSync(infile).toString().split('\n')
}

module.exports = {
  correct: correct,
  createWordsMap: createWordsMap,
  similaritySort: similaritySort,
  loadDictionary: loadDictionary
}

if (require.main === module) {
  // Pre-process dictionary for faster lookups
  var dictionary = loadDictionary()
  var words_map = createWordsMap(dictionary)

  // Create our command-line interface
  var readline = require('readline')
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  rl.setPrompt('> ')
  rl.prompt()

  // Run our word corrector
  rl.on('line', function (line) {
    var correction = correct(line, words_map)
    correction ? console.log(correction) : console.log('NO CORRECTION')
    rl.prompt()
  }).on('close', function () {
    process.exit(0)
  })
}
