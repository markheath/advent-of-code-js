
function solve(input, part) {
    let instructions = input[0].split(',')
        .map(i => i.match(/x(\d+)\/(\d+)|s(\d+)|p([a-z])\/([a-z])/))
        .map(([x,a,b,c,d,e]) => ({move:x[0],exA:Number(a),exB:Number(b),spin:Number(c),pA:d,pB:e}))
    const start = "abcdefghijklmnop";
    if (part === 1) {
        return dance(instructions,start)
    }
    else {
        let cur = start;
        let repetitions = 1000000000;
        for(let n = 0; n < repetitions; n++) {
            cur = dance(instructions,cur);
            if (cur === start)
            {
                let cycle = n+1;
                let extras = repetitions % cycle;
                //console.log("cycle",cycle,"extras",extras);
                n = 0;
                repetitions = extras+1;
            }
        }
        return cur
    }
}

let exchange = (state,a,b) => {
    let tmp = state[a]
    state[a] = state[b]
    state[b] = tmp
    return state;
}
let spin = (state,n) => {
    return state.slice(state.length - n).concat(state.slice(0,state.length - n))
}

function dance(instructions, start) {
    let s = [...start]
    for(let i of instructions) {
        switch(i.move) {
            case "x": s = exchange(s,i.exA,i.exB); break;
            case "s": s = spin(s,i.spin); break;
            case "p": s = exchange(s,s.indexOf(i.pA), s.indexOf(i.pB)); break;
        }
    }
    return s.join('')
}


const expected = part => part === 1 ? "pkgnhomelfdibjac" : "pogbjfihclkemadn";

module.exports = {solve,expected};
