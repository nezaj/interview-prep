// ## Incorrect Word Generator
//
// Write a second program that generates words with spelling mistakes of the above form, starting with correctly spelled English words. Pipe its output into the first program and verify that there are no occurrences of "NO CORRECTION" in the output.
var Util = require('./util')

function incorrect (w) {
  var length = w.length
  if (length < 4) {
    throw Error('Please enter word with 4 letters or more')
  }
  var mid = Math.floor(length / 2)

  // Add mix-case
  w = w.slice(0, mid).toUpperCase() + w.slice(mid, length).toLowerCase()

  // Add repeating characters
  var repeat
  while (!repeat) {
    var idx = Math.floor(Math.random() * length)
    if (!Util.isVowel(w[idx])) { repeat = w[idx] }
  }
  w = w.slice(0, idx) + Array(3).join(repeat) + w.slice(idx + 1, length)

  // Replace vowels
  /* TODO: I notice for words with high a vowel/consonant ratio the corrector
   * may spit out a word different than the original word. My hunch is this
   * due to vowel replacement. E.g. 'wake' gets replaced
   * by woke. This tells me the incorrect needs to be smarter. I've already
   * spent 4-5 hours on this exercise, I'm happy with my solutions for now but
   * if this was a work thing I'd come back to it later
   */
  var vowels = 'aeiou'
  var num_vowels = vowels.length
  w = w.replace(/[aeiou]/gi, function (c) {
    return vowels[Math.floor(Math.random() * num_vowels)]
  })

  return w
}

console.log(incorrect('cozy'))
console.log(incorrect('carnival'))
console.log(incorrect('conspiracy'))
console.log(incorrect('magazine'))
