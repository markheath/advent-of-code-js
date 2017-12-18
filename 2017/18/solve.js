function solve(input,part) {
    const instructions = input.map(i => i.split(' '))
    if (part === 1) {
        let sent = -1
        runToReceive(interpreter(instructions, 0, n => sent = n, () => undefined))
        return sent;
    } 
    else {
        let sent0 = []
        let sent1 = []
        let i0 = interpreter(instructions, 0, n => sent0.push(n), () => sent1.shift())
        let totalSent1 = 0;
        let i1 = interpreter(instructions, 1, n => { sent1.push(n); totalSent1++ }, () => sent0.shift())
        do {
            //console.log("running p0, available:", sent1.length)
            runToReceive(i0)
            //console.log("running p1, available:", sent0.length)
            runToReceive(i1)
            //console.log(sent0.length, sent1.length, i0.registers, i1.registers)
        } while(sent0.length > 0 || sent1.length > 0)
        return totalSent1
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

const testInput2 = [
    "snd 1",
    "snd 2",
    "snd p",
    "rcv a",
    "rcv b",
    "rcv c",
    "rcv d"
]

function interpreter(instructions, id, send, recv) {
    const registers = new Map();
    registers.set('p',id)
    let blocked = false;
    let curPos = 0
    const getVal = v => isNaN(v) ? (registers.get(v) || 0) : Number(v)
    const commands = {
        //snd : reg => { console.log(`prog ${id} sends ${getVal(reg)}`); send(getVal(reg)) },
        snd : x => send(getVal(x)),
        set : (x,y) => registers.set(x,getVal(y)),
        add : (x,y) => registers.set(x,getVal(x) + getVal(y)),
        mul : (x,y) => registers.set(x,getVal(x) * getVal(y)),
        mod : (x,y) => registers.set(x,getVal(x) % getVal(y)),
        rcv : x => { let r = recv(); if (typeof(r) === 'undefined') blocked = true; else { registers.set(x,r); blocked = false; } },
        jgz : (x,y) => curPos += (getVal(x) > 0 ? getVal(y) : 1)
    }
    const execute = () => {
        let [ins,arg1,arg2] = instructions[curPos]
        commands[ins](arg1,arg2)
        //console.log(curPos,ins,arg1,arg2,commands[ins])
        if (!blocked && ins != "jgz") curPos++
        if(curPos < 0 || curPos >= instructions.length) throw Error(`program ${id} exited`)
        return blocked
    }
    function showState() {
        console.log(`Prog ${id}`, curPos,instructions[curPos],blocked,registers)
    }
    return {execute,showState}
}

function runToReceive(interpreter) {
    //interpreter.showState()
    while (!interpreter.execute()) { //
    }
}

const expected = part => part === 1 ? 8600 : "todo"

module.exports = { solve, expected}