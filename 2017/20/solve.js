const { minBy,nonRepeated,unfold,firstRepeatedValue } = require('../../utils/utils')
function solve(input,part) {
    const particles = input.map(p => p.match(/-?\d+/g).map(d => Number(d)))
                            .map((x,n) => ({ p: x.slice(0,3), v: x.slice(3,6), a: x.slice(6,9),n }))
    const addv = (v1,v2) => [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
    const dist = v => Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2])
    const tick = ps => { for(let p of ps) { p.v = addv(p.v,p.a); p.p = addv(p.p,p.v); } return ps; }
    if (part === 1) {
        return firstRepeatedValue(unfold(particles, tick), 300, ps => minBy(ps, p => dist(p.p)).n)
    }
    else {
        return firstRepeatedValue(unfold(particles, ps => [...nonRepeated(tick(ps),p=>p.p.toString())]), 100, ps => ps.length)
    }
}

const expected = part => part === 1 ? 170 : 571;

module.exports = { solve, expected}