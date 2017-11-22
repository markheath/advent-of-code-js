var crypto = require('crypto');

function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 346386 : 9958218;
}

function find(key,search) {
    for (let n = 0; n < 10000000; n++) {
        let inputString = `${key}${n}`;
        let hash = crypto.createHash('md5').update(inputString).digest('hex');
        if (hash.startsWith(search)) return n;
    }
}

function part1(input) {
    return find(input,"00000");
}

function part2(input) {
    return find(input,"000000");
}

module.exports = {solve,expected};