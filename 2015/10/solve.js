let { range,flatMap,reduce } = require('../../utils/utils');

function solve(input, part) {
    return getRepeatedLength(part === 1 ? 40:50, input[0]);
}

function expected(part) {
    return part == 1 ? 360154 : 5103798;
}

let groupAdjacent = a => reduce(a,function(prev, curr) {
    if (prev.length && curr === prev[prev.length - 1][0]) {
        prev[prev.length - 1].push(curr);
    }
    else {
        prev.push([curr]);
    }
    return prev;
}, []);

const next = cur => [...flatMap(groupAdjacent(cur),g => [g.length, g[0]])]

function getRepeatedLength(repetitions,input) {
    let start = Array.from(input).map(c => c - '0');

    return [...range(1,repetitions)]
            .reduce(next, start).length;
}

module.exports = {solve,expected,groupAdjacent,next};