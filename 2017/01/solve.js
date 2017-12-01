function solve(input, part) {
    const nextChar = (ch,n) => ch[(n + 1) % ch.length];
    const halfWay = (ch,n) => ch[(n + (ch.length / 2)) % ch.length];
    return sumMatching([...input[0]], part === 1 ? nextChar: halfWay);
}

function sumMatching(chars, fn) {
    return chars.map((c,n) => c === fn(chars,n) ? Number(c) : 0).reduce((a,b) => a+b);
}

const expected = part => part === 1 ? 1343 : 1274;

module.exports = {solve,expected};