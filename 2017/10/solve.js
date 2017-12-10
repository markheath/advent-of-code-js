function solve(input, part) {
    let lengths = input[0].split(',').map(n => Number(n))
    let start = new Array(256);
    for(let n = 0; n < start.length; n++) start[n] = n;
    let applied = applyLengths(start,lengths)
    return part === 1 ? applied[0] * applied[1] : -1;
}

const expected = part => part === 20056 ? -1 : -1;

function applyLengths(list, lengths) {
    let currentPos = 0;
    let skipSize = 0;
    for(let length of lengths) {
        list = reverseSection(list, currentPos, length)
        currentPos += length + skipSize++;
    }
    return list;
}

function reverseSection(list, currentPos, length) {
    let out = Array.from(list)
    for(let n = 0; n < length; n++) {
        out[(n+currentPos)%out.length] = list[(currentPos+length-n-1)%out.length]
    }
    return out;
}

module.exports = {solve,expected,reverseSection,applyLengths};