const { minBy } = require('../../utils/utils')
function solve(input,part) {
    const particles = input.map(p => p.match(/-?\d+/g).map(d => Number(d)))
                            .map((x,n) => ({ p: x.slice(0,3), v: x.slice(3,6), a: x.slice(6,9),n }))
    //console.log(particles)
    const add = (v1,v2) => [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
    const dist = v => Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2])

    let current = -1;
    let closestFor = 0;
    while(closestFor < 1000) {
        // tick
        for (let p of particles) {
            p.v = add(p.v,p.a)
            p.p = add(p.p,p.v)
        }
        const closest = minBy(particles, p => dist(p.p))
        if (closest.n != current) {
            //console.log("new", closest.n, "prev", current, "for", closestFor)
            closestFor = 0;
            current = closest.n
        }
        else {
            closestFor++
        }
    }
    return current
}

const expected = part => part === 1 ? 170 : "todo";

module.exports = { solve, expected}