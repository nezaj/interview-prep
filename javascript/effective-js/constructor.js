/* Item 33:
 * Make consutrctors new-agnostic or at least document that you expect
 * constructor to be used with new keyword
 */

// Shim for Object.create if it does not exist
if (typeof Object.create === 'undefined') {
  Object.create = function (prototype) {
    function C () { }
    C.prototype = prototype
    return new C()
  }
}

// Sample constructor that works w/ and w/o new constructor
function User (name, passwordHash) {
  var self = this instanceof User ? this : Object.create(User.prototype)
  self.name = name
  self.passwordHash = passwordHash
}

// These both work as expected
/* eslint-disable no-new */
new User('bob', 'dole')
User('jon', 'jacobs')
/* eslint-enable */
