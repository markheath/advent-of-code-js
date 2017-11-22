function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 1598415 : 3812909;
}

function part1(input) {
    return 0;
}

function part2(input) {
    return 0;
}


module.exports = {solve,expected};