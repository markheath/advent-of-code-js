let {scan,range,maxBy,max} = require("../../utils/utils");

function solve(input, part) {
    let lookup = getLookup(input);
    if (part === 1) {
        return max(lookup, v => v[v.length-1]);
    }
    else {
        return max(lookup, v => v.filter((n,t) => n===max(lookup,q => q[t])).length);
    }
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

module.exports = {solve,expected};