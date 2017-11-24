let utils = require("../../utils/utils");

function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 664 : 640;
}

function part1(input) {
    let rules = input
        .map(s => s.match(/(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)\./))
        .map(p => { return { A: p[1], B: p[4], Gain: parseInt(p[3]) * (p[2] === "lose" ? -1 : 1) }});
    //console.log(rules);
    let people = Array.from(new Set(rules.map(r => r.A)));
    //console.log(people);
    let lookup = rules.reduce((a,r) => { a[`${r.A}-${r.B}`] = r.Gain; return a}, {});
    console.log(lookup);

    var happiness = utils.permutations(Array.from(people)
        .slice(1))
        .map(p => { p.unshift(people[0]); p.push(people[0]); return utils.pairwise(p); })
        .map(p => p.reduce((acc,[a,b]) => { console.log(acc,a,b); return acc + lookup[`${a}-${b}`] + lookup[`${b}-${a}`]; }));
    //return Math.max.apply(null, happiness)
}

function part2(input) {
    //// part B add me
    //people.ForEach(p => { lookup[$"Mark-{p}"] = 0; lookup[$"{p}-Mark"] = 0; });
    //people.Add("Mark");
}

module.exports = {solve,expected};