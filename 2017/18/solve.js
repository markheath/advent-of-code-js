function solve(input,part) {
    if (part === 1) {
        const instructions = input.map(i => i.split(' '))
        return executeInstructions(instructions)
    }
}

const testInput = [
    "set a 1",
    "add a 2",
    "mul a a",
    "mod a 5",
    "snd a",
    "set a 0",
    "rcv a",
    "jgz a -1",
    "set a 1",
    "jgz a -2",
]

function executeInstructions(instructions) {

    const registers = new Map();
    let lastSound = 0
    let recovered = false;
    let curPos = 0
    const getVal = v => isNaN(v) ? (registers.get(v) || 0) : Number(v)
    const snd = reg => lastSound = getVal(reg)
    const set = (x,y) => registers.set(x,getVal(y))
    const add = (x,y) => registers.set(x,getVal(x) + getVal(y))
    const mul = (x,y) => registers.set(x,getVal(x) * getVal(y))
    const mod = (x,y) => registers.set(x,getVal(x) % getVal(y))
    const rcv = x => { if(getVal(x)) recovered = true }
    const jgz = (x,y) => curPos += (getVal(x) ? getVal(y) : 1)

    let interpreter = {snd,set,add,mul,mod,rcv,jgz}

    while (curPos < instructions.length && curPos >= 0 && !recovered) {
        let [ins,arg1,arg2] = instructions[curPos]
        console.log(ins,arg1,arg2)
        interpreter[ins](arg1,arg2)
        if (ins != "jgz") curPos++
    }
    return lastSound
}

const expected = part => part === 1 ? "todo" : "todo"

module.exports = { solve, expected}