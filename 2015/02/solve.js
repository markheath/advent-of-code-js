function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 1598415 : 3812909;
}

function measure(input, fn) {
    return input
    .map(s => s.split('x'))
    .map(x => x.map(n => parseInt(n)))
    .map(w => w.sort((a,b)=>a-b))
    .map(fn)
    .reduce((a,b) => a+b);
}

function part1(input) {
    return measure(input, w => 3 * w[0] * w[1] + 2 * w[0] * w[2] + 2 * w[1] * w[2]);
}

function part2(input) {
    return measure(input, w => 2 * w[0] + 2 * w[1] + w[0] * w[1] * w[2]);
}




module.exports = {solve,expected};