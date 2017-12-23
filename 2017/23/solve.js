function solve(input, part) {
    const instructions = input.map(i => i.split(' '))
    const int = interpreter(instructions)
    while(!int.execute()) {
        //
    }
    return int.mult();
}

function interpreter(instructions) {
    const registers = new Map();
    let curPos = 0
    let multiplies = 0;
    const getVal = v => isNaN(v) ? (registers.get(v) || 0) : Number(v)
    const commands = {
        set : (x,y) => registers.set(x,getVal(y)),
        sub : (x,y) => registers.set(x,getVal(x) - getVal(y)),
        mul : (x,y) => { multiplies++; registers.set(x,getVal(x) * getVal(y)) },
        jnz : (x,y) => curPos += (getVal(x) != 0 ? getVal(y) : 1)
    }
    const execute = () => {
        let [ins,arg1,arg2] = instructions[curPos]
        commands[ins](arg1,arg2)
        if (ins != "jnz") curPos++
        return (curPos < 0 || curPos >= instructions.length);
    }
    function showState() {
        console.log(curPos,instructions[curPos],registers)
    }
    return {execute,showState,mult:() => multiplies}
}

const expected = part => part === 1 ? 4225 : "todo"

module.exports = { solve, expected }