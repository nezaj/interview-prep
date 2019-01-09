var evalRPN = function(tokens) {
    let params = []
    let ops = new Set(['+', '-', '*', '/'])

    tokens.forEach(t => {
        if (!ops.has(t)) {
            params.push(parseInt(t))
        }

        else {
            let v2 = params.pop()
            let v1 = params.pop()
            if (t === '+') { params.push(v1 + v2) }
            else if (t === '-') { params.push(v1 - v2) }
            else if (t === '*') { params.push(v1 * v2) }
            else { v1 / v2 > 0 ? params.push(Math.floor(v1 / v2)) : params.push(Math.ceil(v1 / v2)) }
        }

    })

    console.log(params[0])
    return params[0]
};

evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])
