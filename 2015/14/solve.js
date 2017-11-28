let {scan,range} = require("../../utils/utils");

function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part === 1 ? 2640 : 1102;
}

function getLookup(input) {
    return input.map(s => s.split(' '))
            .map(g => { return { Speed:Number(g[3]), Duration:Number(g[6]), Rest:Number(g[13]) } })
            .map(r => Array.from(scan(Array.from(range(0, 2503))
                      .map(t => t % (r.Duration + r.Rest) < r.Duration ? r.Speed : 0)
                      , (a, b) => a + b, 0)).slice(1));

}

function part1(input) {
    let lookup = getLookup(input);
    return Math.max.apply(null, lookup.map(v => v[v.length-1]));
}

function part2(input) {
    let lookup = getLookup(input);
    let q = lookup.map(v => v.filter((n,t) => n===Math.max.apply(null, lookup.map(q => q[t]))).length);
    return Math.max.apply(null, q);
}


module.exports = {solve,expected};