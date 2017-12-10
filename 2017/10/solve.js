function solve(input, part) {
    let start = new Array(256);
    for(let n = 0; n < start.length; n++) start[n] = n;

    if (part === 1) {
        let lengths = input[0].split(',').map(n => Number(n))
        let {result} = applyLengths(start,lengths)
        return result[0] * result[1];
    }
    else {
        let lengths = [...input[0]].map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23])
        let currentPos = 0
        let skipSize = 0
        for(let n = 0; n < 64; n++) {
            ({result:start,currentPos,skipSize} = applyLengths(start,lengths,currentPos,skipSize));
        }
    }
}

const expected = part => part === 1 ? 20056 : -1;

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

module.exports = {solve,expected,reverseSection,applyLengths};