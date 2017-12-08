let { max } = require('../../utils/utils')

function solve(input, part) {
    const instructions = input.map(parseInstruction);
    const {largest,registers} = executeInstructions(instructions)
    return (part === 1) ? max(registers.values()) : largest;
}

function parseInstruction(instruction) {
    const g = /(\w+) (\w+) (-?\d+) if (\w+) ([<>=!]+) (-?\d+)/.exec(instruction)
    return { action: {reg:g[1], op:g[2], amount:Number(g[3])}, test: {reg:g[4], op:g[5], amount:Number(g[6])} };
}

function executeInstructions(instructions) {
    const registers = new Map();
    let largest = 0;
    const applyOpToReg = ({reg,op,amount}) => applyOp(registers.get(reg) || 0, op, amount)
    for (let {action,test} of instructions) {
        if (applyOpToReg(test)) {
            let newValue = applyOpToReg(action)
            largest = Math.max(largest,newValue)
            registers.set(action.reg, newValue);
        }
    }
    return {largest,registers};
}

const ops = {'<':(a,b)=>a<b,'>':(a,b)=>a>b,'<=':(a,b)=>a<=b,'>=':(a,b)=>a>=b,'!=':(a,b)=>a!==b,'==':(a,b)=>a===b,'inc':(a,b)=>a+b,'dec':(a,b)=>a-b };
const applyOp = (val,op,amt) => ops[op](val,amt)

const expected = part => part === 1 ? 4877 : 5471;

module.exports = {solve,expected};