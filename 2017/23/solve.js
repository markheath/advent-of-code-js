function solve(input, part) {
    const instructions = input.map(i => i.split(' '))

    if (part === 1) {
        const int = interpreter(instructions, 0)
        while(!int.execute()) {
            //
        }
        return int.mult();    
    }

    const int = interpreter(instructions, 1)
    let it = 0
    while(!int.execute()) {
        int.showState()
        if (it++ > 10) break;
    }
    return int.mult();
}

function interpreter(instructions, a) {
    const registers = new Map();
    registers.set('a',a)
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


function part2() {
    let a,b,c,d,e,f,g,h
    b = 67
    c = b
    if (a !== 0) {
        //jnz 1 5
        b *= 100
        b += 100000
        c = b
        c += 17000 }
    do { f = 1
        d = 2
        do {e = 2
            do { g = d
                g *= e
                g -= b
                if (g === 0)
                    f = 0
                e++
                g = e
                g -= b
            } while (g != 0)
            d++
            g = d
            g -= b
        } while (g != 0)
        if(f ===0)
            h++
        g = b // these last 4 lines mean loop x1 in part 1 and x1000 in part 2
        g -= c
        if (g === 0)
            return h
        b += 17
    } while(true)
}


const expected = part => part === 1 ? 4225 : "todo"

module.exports = { solve, expected }