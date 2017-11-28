var _ = require('lodash');
function solve(input, part) {
    var solver = part === 1 ? part1BuiltIn : part2Loop;
    return solver(input[0]);
}

function expected(part) {
    return part == 1 ? 74 : 1795;
}

function part1BuiltIn(input) {
    return [...input].reduce((x,y) => x+(y === '(' ? 1 : -1),0);
}
function part1Lodash(input) {
    return _.sumBy(input, c => c === '(' ? 1 : -1);
}

function part2Transform(input) {
    return _.transform(input, (res,val) => { 
        res.step++; 
        res.floor += (val === '(' ? 1:-1); 
        return res.floor >=0; },
        {floor:0, step:0}).step;
}

function part2Loop(input) {
    let floor = 0;
    for(let step = 0; step < input.length; step++) {
        floor += (input[step] === '(' ? 1:-1);
        if (floor < 0) {
            return step+1;
        }
    }
}

module.exports = {solve,expected};