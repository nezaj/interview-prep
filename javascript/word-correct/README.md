# Word Correction Take-Home
Word correction take home challenge written by Joe Averbukh (nezaj)

### Run it
```
node word_correct.js  # Run corrector
node word_incorrect.js | node word_correct.js  # Output incorrect gen to correct
```

### Comments
* Exclusively used ES5, although I would prefer to use ES6 for production. It's been awhile since I've written vanilla JS so I thought it would be nice to do so for this exercise.
* Rolled my own test runners for this exercise, would use something like mocha for production. Felt like adding a package.json and additional running instructions would be overkill for this exercise.
* Linted using JavaScript Standard Style, I like the author and I like not having to write semi-colons (I come from a python background)

### Final thoughts
There are definitely some opportunities to DRY and clean-up code. Added a note regarding some thoughts on improving the incorrect generator. Overall was fun :)
