let utils = require("../../utils/utils");

let bestSoFar;
function solve(input, part) {
    var presents = input.map(n => Number(n));
    return findBestQE(presents, part === 1 ?  3:4);
}

function findBestQE(presents, groups)
{
    let totalWeight = utils.sumBy(presents);
    let weightPerSet =  totalWeight / groups;
    bestSoFar = 1 + presents.length / groups;
    let bestSet = [...distribute([], presents, Math.floor(weightPerSet))]
        .map(g => { return { count: g.length, qe: g.reduce((a, b) => a * b, 1) } })
        .sort((a,b) => (a.count === b.count) ? a.qe - b.qe : a.count - b.count )[0]
    return bestSet.qe;
}


function* distribute(used, pool, amount)
{
    if (used.length >= bestSoFar) return;
    
    let remaining = amount - utils.sumBy(used);
    for (let n = 0; n < pool.length; n++)
    {
        let s = pool[n];
        if (pool[n] > remaining) continue;
        let x = [...used,s];
        if (s === remaining)
        {
            if (x.length < bestSoFar)
                bestSoFar = x.length;
            yield x;
        }
        else
        {
            var y = pool.slice(n+1);
            yield* distribute(x, y, amount);
        }
    }
}


function expected(part) {
    return part == 1 ? 10723906903 : 74850409;
}


module.exports = {solve,expected};