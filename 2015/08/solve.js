function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 1333 : 2046;
}

let [q,b,bq,bb] = ["\"","\\","\\\"","\\\\"];

let unescape = function(s) {
    return s.slice(1,-1).replace(/\\\"/g, q).replace(/\\\\/g, "?").replace(/\\x[0-9a-f]{2}/g,"?");
}

let escape = s => q + s.replace(/\\/g, bb).replace(/\"/g, bq) + q;

let sumDiffLengths = function(strings,f) {
    return strings.map(f).reduce((acc,[a,b]) => acc + (a.length - b.length), 0);
}

function part1(input) {
    return sumDiffLengths(input, f => [f, unescape(f)]);
}

function part2(input) {
    return sumDiffLengths(input, f => [escape(f), f]);
}

module.exports = {solve,expected};