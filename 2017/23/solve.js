function solve(input, part) {
    const instructions = input.map(i => i.split(' '))

    if (part === 1) {
        const int = interpreter(instructions, 0)
        while(!int.execute()) {
            //
        }
        return int.mult();    
    }

    return part2();
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
    let f,h=0
    for(let b = 106700; b <= 123700; b += 17) { 
        /*
        f = 1                  // set f 1
        for(let d=2; (d!=b) && (f ==1); d++) {
            for(let e = 2; (e != b) && (f == 1); e++) { 
                if ((d * e) === b) {    // set g d, mul g e, sub g b, jnz g 2
                    f = 0       // set f 0
                }
            } 
        }
        if(f ===0)              // jnz f 2
            h++                 // sub h -1
            */
        if (!isPrime(b)) h++; // 904 too low
        //else (console.log(b))
    } 
    return h;
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num !== 1;
}

const expected = part => part === 1 ? 4225 : 905

module.exports = { solve, expected }