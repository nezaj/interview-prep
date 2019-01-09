var generateParenthesis = function(n) {
    if (n === 0) { return [] }
    return helper(n * 2).filter(isValid)
};

var helper = function(n) {
    if (n === 1) { return ['(', ')'] }

    return ['(', ')']
        .map(x => helper(n - 1).map(h => x + h))
        .reduce((a, b) => a.concat(b))
}

var isValid = function(aStr) {
    const parens = new Set(['(', '[', '{'])
    const closeMap = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    let opStack = []
    for (let i = 0; i < aStr.length; i++) {
        const curr = aStr[i]
        if (parens.has(curr)) { opStack.push(curr) }
        if (closeMap[curr] && closeMap[curr] != opStack.pop()) {
            return false
        }
    }

    return opStack.length === 0 ? true : false
}

console.log(generateParenthesis(1).length)
console.log(generateParenthesis(2).length)
console.log(generateParenthesis(3).length)
console.log(generateParenthesis(4).length)
console.log(generateParenthesis(5).length)
