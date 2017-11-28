
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