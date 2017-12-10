function solve(input, part) {
    return part;
}

const expected = part => part === 1 ? -1 : -1;

function reverseSection(list, currentPos, length) {
    let out = Array.from(list)
    for(let n = 0; n < length; n++) {
        out[(n+currentPos)%out.length] = list[(currentPos+length-n-1)%out.length]
    }
    return out;
}

module.exports = {solve,expected,reverseSection};