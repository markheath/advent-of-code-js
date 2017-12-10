function solve(input, part) {

    if (part === 1) {
        let start = new Array(256);
        for(let n = 0; n < start.length; n++) start[n] = n;
            let lengths = input[0].split(',').map(n => Number(n))
        let {result} = applyLengths(start,lengths)
        return result[0] * result[1];
    }
    else {
        return hashString(input[0])
    }
}

const expected = part => part === 1 ? 20056 : "d9a7de4a809c56bf3a9465cb84392c8e";

function hashString(str) {
    let start = new Array(256);
    for(let n = 0; n < start.length; n++) start[n] = n;
    let lengths = [...str].map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    let currentPos = 0
    let skipSize = 0
    for(let n = 0; n < 64; n++) {
        ({result:start,currentPos,skipSize} = applyLengths(start,lengths,currentPos,skipSize));
    }
    let hash = ""
    for(let n = 0; n < 16; n++) {
        let xor = 0
        for(let x = 0; x<16; x++) {
            xor ^= start[n*16+x]
        }
        hash+= ("0" + xor.toString(16)).slice(-2)
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

module.exports = {solve,expected,reverseSection,applyLengths,hashString};