let { maxBy } = require('../../utils/utils')

let largest = 0;
function solve(input, part) {
    const instructions = input.map(parseInstruction);
    largest = 0
    let state = new Map()
    executeInstructions(state,instructions)
    if (part === 1) {
        let maxReg = maxBy(state, ([,val]) => val)
        //console.log(maxReg)
        return maxReg[1];
    }
    else {
        return largest;
    }
}

const testInstructions = [
    "b inc 5 if a > 1",
    "a inc 1 if b < 5",
    "c dec -10 if a >= 1",
    "c inc -20 if c == 10",
]

// g dec 445 if fwk == -3145
// pnt inc 428 if xek < 10
function parseInstruction(instruction) {
    let g = /(\w+) (\w+) (-?\d+) if (\w+) ([<>=!]+) (-?\d+)/.exec(instruction)
    //if (!g[2]) console.log(instruction)
    return { target: g[1], op: g[2], amount: Number(g[3]), testReg: g[4], testOp: g[5], testAmount: Number(g[6]) };
}

function executeInstructions(registers, instructions) {
    for (let i of instructions) {
        if (testRegister(registers.get(i.testReg) || 0, i.testOp, i.testAmount)) {
            let newValue = applyOp(registers.get(i.target) || 0, i.op, i.amount)
            largest = Math.max(largest,newValue)
            registers.set(i.target, newValue);
        }
    }
}

function testRegister(value, op, amount) {
    switch(op) {
        case '<': return value < amount;
        case '>': return value > amount;
        case '<=': return value <= amount;
        case '>=': return value >= amount;
        case '!=': return value !== amount;
        case '==': return value === amount;
        default: throw new Error("invalid test op " + op)
    }
}

function applyOp(value, op, amount) {
    switch(op) {
        case 'inc': return value + amount;
        case 'dec': return value - amount;
        default: throw new Error("invalid op " + op)
    }
}

const expected = part => part === 1 ? 4877 : 5471;

module.exports = {solve,expected};