function solve(input,part) {
    const instructions = input.map(i => i.split(' '))
    if (part === 1) {
        let sent = -1
        runUntilBlocked(interpreter(instructions, 0, n => sent = n, () => undefined))
        return sent;
    } 
    else {
        let sent0 = []
        let sent1 = []
        let i0 = interpreter(instructions, 0, n => sent0.push(n), () => sent1.shift())
        let totalSent1 = 0;
        let i1 = interpreter(instructions, 1, n => { sent1.push(n); totalSent1++ }, () => sent0.shift())
        do {
            runUntilBlocked(i0)
            runUntilBlocked(i1)
        } while(sent0.length > 0 || sent1.length > 0)
        return totalSent1
    }
}

function interpreter(instructions, id, send, recv) {
    const registers = new Map();
    registers.set('p',id)
    let blocked = false;
    let curPos = 0
    const getVal = v => isNaN(v) ? (registers.get(v) || 0) : Number(v)
    const commands = {
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
        if (!blocked && ins != "jgz") curPos++
        if(curPos < 0 || curPos >= instructions.length) throw Error(`program ${id} exited`)
        return blocked
    }
    function showState() {
        console.log(`Prog ${id}`, curPos,instructions[curPos],blocked,registers)
    }
    return {execute,showState}
}

function runUntilBlocked(interpreter) {
    while (!interpreter.execute()) { //
    }
}

const expected = part => part === 1 ? 8600 : 7239

module.exports = { solve, expected}