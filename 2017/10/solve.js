const {range,batch} = require('../../utils/utils')
function solve(input, part) {
    if (part === 1) {
        let state = Array.from(range(0,256));
        let lengths = input[0].split(',').map(n => Number(n))
        let {result} = applyLengths(state,lengths)
        return result[0] * result[1];
    }
    else {
        return toHex(hashString(input[0]))
    }
}

const expected = part => part === 1 ? 20056 : "d9a7de4a809c56bf3a9465cb84392c8e";

function toHex(hashBytes) {
    let hash = ""
    for(let b of hashBytes) {
        hash+= ("0" + b.toString(16)).slice(-2)
    }
    return hash
}

function hashString(str) {
    let start = Array.from(range(0,256));
    let lengths = [...str].map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    let currentPos = 0
    let skipSize = 0
    for(let n = 0; n < 64; n++) {
        ({result:start,currentPos,skipSize} = applyLengths(start,lengths,currentPos,skipSize));
    }
    let hash = []
    for(let b of batch(start,16)) {
        hash.push(b.reduce((a,b) => a^b))
    }
    return hash;
}

function applyLengths(list, lengths, currentPos=0,skipSize=0) {
    for(let length of lengths) {
        list = reverseSection(list, currentPos, length)
        currentPos += length + skipSize++
    }
    return {result:list,currentPos,skipSize};
}

function reverseSection(list, currentPos, length) {
    let out = Array.from(list)
    for(let n = 0; n < length; n++) {
        out[(n+currentPos)%out.length] = list[(currentPos+length-n-1)%out.length]
    }
    return out;
}

module.exports = {solve,expected,reverseSection,applyLengths,hashString,toHex};