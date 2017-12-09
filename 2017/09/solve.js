function solve(input, part) {
    let [score,garbageChars] = parseInput(input[0]);
    return (part === 1) ? score:garbageChars;
}

function parseInput(input) {
    let nestingLevel = 0;
    let score = 0;
    let garbageChars = 0;
    let inGarbage = false;
    for(let n = 0; n < input.length; n++) {
        let c = input[n]
        if(c === '!') n++;
        else if(c === '>') inGarbage = false;
        else if(inGarbage) garbageChars++;
        else if(c === '<') inGarbage = true;
        else if(!inGarbage && c === '{') score += ++nestingLevel;
        else if(!inGarbage && c === '}') nestingLevel--;
    }
    return [score,garbageChars];
}

const expected = part => part === 1 ? 13154 : 6369;

module.exports = {solve,expected,parseInput};