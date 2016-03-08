/* Linked List ADT */

function Node (d) {
  this.data = d
  this.next
}

function LinkedList (data) {
  if (Array.isArray(data)) {
    this.extend(data)
  } else {
    this.append(data)
  }
}

LinkedList.prototype.append = function (d) {
  var end = new Node(d)
  var node = this.head

  // Handle case where we append to empty LinkedList
  if (!node) {
    this.head = new Node(d)
    return
  }

  while (node.next !== undefined) { node = node.next }
  node.next = end
}

LinkedList.prototype.extend = function(arr) {
  var that = this;
  arr.forEach(function (e) { that.append(e) })
}

LinkedList.prototype.remove = function (d) {
  var node = this.head
  // Handle case where we remove head
  if (node.data === d) {
    this.head = node.next
    return
  }

  // Handle other cases
  while (node.next) {
    if (node.next.data === d) {
      node.next = node.next.next
      return
    }
  }
}

LinkedList.prototype.traverse = function () {
  var output = []
  var node = this.head
  while (node.next) {
    output.push(node.data)
    node = node.next
  }
  // Log last node as well
  output.push(node.data)

  return output
}

module.exports = LinkedList

if (require.main === module) {
  var linked = new LinkedList([1, 3, 10, 2])

  console.log(linked.traverse())
}
