let { max } = require('../../utils/utils')

function solve(input, part) {
    const instructions = input.map(parseInstruction);
    let state = new Map()
    const largest = executeInstructions(state,instructions)
    return (part === 1) ? max(state.values()) : largest;
}

function parseInstruction(instruction) {
    let g = /(\w+) (\w+) (-?\d+) if (\w+) ([<>=!]+) (-?\d+)/.exec(instruction)
    return { target: g[1], op: g[2], amount: Number(g[3]), testReg: g[4], testOp: g[5], testAmount: Number(g[6]) };
}

function executeInstructions(registers, instructions) {
    let largest = 0;
    for (let i of instructions) {
        if (applyOp(registers.get(i.testReg) || 0, i.testOp, i.testAmount)) {
            let newValue = applyOp(registers.get(i.target) || 0, i.op, i.amount)
            largest = Math.max(largest,newValue)
            registers.set(i.target, newValue);
        }
    }
    return largest;
}

const ops = {'<':(a,b)=>a<b,'>':(a,b)=>a>b,'<=':(a,b)=>a<=b,'>=':(a,b)=>a>=b,'!=':(a,b)=>a!==b,'==':(a,b)=>a===b,'inc':(a,b)=>a+b,'dec':(a,b)=>a-b };
const applyOp = (val,op,amt) => ops[op](val,amt)

function testRegister1(value, op, amount) {
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

function applyOp1(value, op, amount) {
    switch(op) {
        case 'inc': return value + amount;
        case 'dec': return value - amount;
        default: throw new Error("invalid op " + op)
    }
}

const expected = part => part === 1 ? 4877 : 5471;

module.exports = {solve,expected};