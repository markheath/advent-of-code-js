const {sum,any,first,range} = require('../../utils/utils')
const {hashString} = require('../10/solve')

function solve(input, part) {
    //console.log(bitsSet(1))
    //console.log(bitsSet(2))
    //console.log(bitsSet(3))
    //console.log(bitsSet(255))

    let totalBits = 0;
    for(let n = 0; n < 128; n++) {
        totalBits += hashString(`${input[0]}-${n}`).reduce((a,b) => a + bitsSet(b),0)
    }
    return totalBits;
    //console.log(hashString("flqrgnkx-0")[0].toString(2));
    //console.log(hashString("flqrgnkx-1")[0].toString(2));
    //console.log(hashString("flqrgnkx-2")[0].toString(2));
}

function bitsSet(byte) {
    let n =0 ;
    for(let c of byte.toString(2)) {
        if (c === '1') n++;
    }
    return n;
}


const expected = part => part === 1 ? 8106 : -1;

module.exports = {solve,expected};
