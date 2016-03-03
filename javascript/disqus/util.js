/* Dedupe repeating characters from a string
 * e.g. 'sheeep' -> 'shep'
 */
function dedupeRepeat (aString) {
  var i
  var len = aString.length
  var prev = ''
  var deduped = []
  for (i = 0; i < len; i++) {
    var current = aString[i]
    if (current !== prev) {
      deduped.push(current)
    }
    prev = current
  }

  return deduped.join('')
}

/* Returns bool indicating whether character is a vowel */
function isVowel (c) {
  return /[aeiou]/i.test(c)
}

/* Returns maximum value from a list that is less than or equal
 * to the given value. Returns undefined if no value is found.
 * [1, 2, 3, 4], 3 -> 3
 * [4, 1, 2], 3 -> 2
 * [1, 2, 3], 0 -> undefined
 */
function maxLTE (aList, val) {
  return aList.filter(function (e) { return e <= val }).sort().slice(-1)[0]
}

/* Returns all permutations of a word replacing its vowels with other
 * vowels. If a word has 3 vowels we expect a total of 5 ^ 3 permutations
 * since each vowel can be replaced with one of five characters
 */
function permuteVowels (input) {
  if (!input) {
    return ['']
  }

  var VOWELS = ['a', 'e', 'i', 'o', 'u']
  var head = input[0]
  var tail = permuteVowels(input.slice(1, input.length))
  var newPerms
  if (isVowel(head)) {
    newPerms = VOWELS.map(function (v) {
      return tail.map(function (t) { return v + t })
    }).reduce(function (a, b) { return a.concat(b) })
  } else {
    newPerms = tail.map(function (t) { return head + t })
  }

  return newPerms
}

module.exports = {
  dedupeRepeat: dedupeRepeat,
  isVowel: isVowel,
  maxLTE: maxLTE,
  permuteVowels: permuteVowels
}
