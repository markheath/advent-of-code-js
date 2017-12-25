function solve(input,part) {
    if (part === 2) return 0
    let state = 'A'
    const steps = 12481997
    let cursor = 0
    let tape = {}

    let rules =
        {'A': [1,1,'B',0,-1,'C'],
         'B': [1,-1,'A',1,1,'D'],
         'C': [0,-1,'B',0,-1,'E'],
         'D': [1,1,'A',0,1,'B'],
         'E': [1,-1,'F',1,-1,'C'],
         'F': [1,1,'D',1,1,'A']}

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