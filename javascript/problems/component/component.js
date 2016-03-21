/* Templating exercise
 * Challenge: Roll your own mini templating engine that automatically triggers
 * a re-render when the internal state of the underlying data changes.
 * In this case, try implementing a lightweight react component library
 */
(function() {

  // Generic Library component which all custom components should inherit from
  var Component = function (root) {
    this.root = root
  }

  Component.prototype.setState = function (newState) {
    this.state = newState
    this._render()
  }

  Component.prototype._render = function () {
    var html = this.render()
    console.log(html)
    this.root.innerHTML = ''
    this.root.appendChild(html)
  }

  Component.prototype.render = function () {
    throw new Error('Subclasses component must implement render()')
  }

  // Custom component for rendering names and numbers
  var NameNumberComponent = function (root) {
    Component.call(this, root)
    this.state = []  // Would probably make this an object, but using an array for this exercise
  }
  NameNumberComponent.prototype = Object.create(Component.prototype)

  // Convenience method for appending to the state
  NameNumberComponent.prototype.add = function (val) {
    this.setState(this.state.concat(val))
  }

  NameNumberComponent.prototype.render = function () {
    return (
         el('div', [
           el('ul', this.state.map(function (t) {
             return el('li', t.name)
           })),
           el('ul', this.state.map(function (t) {
             return el('li', t.number)
           }))
         ])
    )
  }

  // Library helper method for creating DOM elements
  function el (tagName, children) {
    var tag = document.createElement(tagName)
    if (typeof children === 'string') {
      tag.innerText = children
    } else {
      children.forEach(function (c) { tag.appendChild(c) })
    }
    return tag
  }

  var root = document.getElementById('container')
  var component = new NameNumberComponent(root)
  component.setState([
    {
      'name': 'Joe',
      'number': '0'
    },
    {
      'name': 'Charles',
      'number': '1'
    },
    {
      'name': 'Nic',
      'number': '2'
    },
  ])

  // Debugging purposes
  window.component = component
})()
