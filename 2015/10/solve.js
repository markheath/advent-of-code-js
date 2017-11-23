let _ = require('lodash');

function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input[0]);
}

function expected(part) {
    return part == 1 ? 360154 : 5103798;
}

let groupAdjacent = a => a.reduce(function(prev, curr) {
    if (prev.length && curr === prev[prev.length - 1][0]) {
        prev[prev.length - 1].push(curr);
    }
    else {
        prev.push([curr]);
    }
    return prev;
}, []);

function getRepeatedLength(repetitions,input) {
    let start = Array.from(input).map(c => c - '0');
    return _.range(1,repetitions + 1)
            .reduce((acc,x) => _.flatMap(groupAdjacent(acc),g => [g.length, g[0]]), start).length;
}

function part1(input) {
    return getRepeatedLength(40,input);
}

function part2(input) {
    return getRepeatedLength(50,input);
}

module.exports = {solve,expected};