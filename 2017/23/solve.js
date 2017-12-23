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


function part2(a) {
    let b,c,d,e,f,h
    b = 67                      // set b 67
    c = b                       // set c b
    if (a !== 0) {              // jnz a 2, jnz 1 5
        b *= 100                // mul b 100
        b += 100000             // sub b -100000
        c = b                   // set c b
        c += 17000 }            // sub c -17000
    do { f = 1                  // set f 1
        d = 2                   // set d 2
        do {e = 2               // set e 2
            do { 
                if ((d * e) === b)    // set g d, mul g e, sub g b, jnz g 2
                    f = 0       // set f 0
                e++             // sub e -1
            } while (e != b)    // set g e, sub g b, jnz g -8
            d++                 // sub d -1
        } while (d != b)        // set g d, sub g b, jnz g -13
        if(f ===0)              // jnz f 2
            h++                 // sub h -1
        // these last 4 lines mean loop x1 in part 1 and x1000 in part 2
        if (b === c)            // set g b,sub g c, jnz g 2
            return h            // jnz 1 3
        b += 17                 // sub b -17
    } while(true)               // jnz 1 -23
}


const expected = part => part === 1 ? 4225 : "todo"

module.exports = { solve, expected }