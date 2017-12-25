const { batch,skip } = require('../../utils/utils')

function solve(input,part) {
    if (part === 2) return 0
    let state = input[0].match(/Begin in state (.)\./)[1]
    const steps = Number(input[1].match(/after (\d+) steps/)[1])
    let cursor = 0, tape = {}, rules = {}
    const parseState = s => s.match(/state (.)/)[1] 
    const parseVal = s => Number(s.match(/the value (\d)\./)[1])
    const parseDir = s => s.match(/to the right/) ? 1 : -1 
    for(let b of batch(skip(input,2),9)) { // nb blank input lines already stripped
        rules[parseState(b[0])] = [parseVal(b[2]),parseDir(b[3]),parseState(b[4]),
                                    parseVal(b[6]),parseDir(b[7]),parseState(b[8])]
    }

    for(let step = 0; step < steps; step++) {
        let rule = rules[state];
        [tape[cursor],cursor,state] = (tape[cursor]) ? 
            [rule[3],cursor+rule[4],rule[5]] :
            [rule[0],cursor+rule[1],rule[2]];
    }

    let checksum = 0
    for(let p in tape) {
        if (tape[p] === 1) checksum++;
    }
    return checksum;
}

const expected = part => part === 1 ? 3362: 0;

module.exports = {solve,expected}