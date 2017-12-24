const { maxBy} = require('../../utils/utils')

function solve(input,part) {
    let parts = input.map(i => i.split('/').map(n => Number(n)))
    //console.log(parts)
    const strongest = maxBy(build(0,[],parts,0),c => c.strength)
    console.log(strongest)
}

function *build(current,used,available,strength) {
    //console.log(current,used.length,available.length,strength)
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

const expected = part => part === 1 ? 2006 : "todo";

module.exports = { solve, expected }