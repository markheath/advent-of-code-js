const { maxBy} = require('../../utils/utils')

function solve(input,part) {
    let parts = input.map(i => i.split('/').map(n => Number(n)))
    if (part === 1) {
        return maxBy(build(0,[],parts,0),c => c.strength).strength
    }
    else {
        let bridges = [...build(0,[],parts,0)]
        let longest = maxBy(bridges,c => c.used.length).used.length
        return maxBy(bridges.filter(b => b.used.length === longest),b => b.strength).strength
    }
}

function *build(current,used,available,strength) {
    for(let [a,b] of available) {
        if(a === current) {
            yield* build(b,[...used,[a,b]],available.filter(([x,y]) => !(x===a && y===b)),strength+a+b)
        }
        else if (b === current && a !== b) {
            yield* build(a,[...used,[a,b]],available.filter(([x,y]) => !(x===a && y===b)),strength+a+b)
        }
    }
    yield {used,strength}
}

const expected = part => part === 1 ? 2006 : 1994;

module.exports = { solve, expected }