function solve(input,part) {
    let rules = input.map(i => i.split(' ')).map(p => [p[0],p[2]])
    //console.log(expand("../.#"))
    //console.log(expand(".#./..#/###"))
    let expanded = new Map()
    for(let [input,output] of rules) {
        for (let e of expand(input)) {
            expanded.set(e,output)
        }
    }
    console.log(expanded)
    let state = [".#./..#/###"]

    for(let n = 0; n < 5; n++) {
        let next =  []
        for(let x of state)
            next.push(...iterate(x,expanded))
        state = next
    }
    console.log(state)
    return part;
}

function iterate(i, lookup) {
    if (i.length === 11) {
        if (!lookup.has(i)) console.log("oops", i)
        return [ lookup.get(i) ]
    } 
    else {
        let p = i.split('/')
    
        return [ iterate (`${p[0][0]}${p[0][1]}/${p[1][0]}${p[1][1]}`,lookup),
        iterate (`${p[0][2]}${p[0][3]}/${p[1][2]}${p[1][3]}`,lookup),
        iterate (`${p[2][0]}${p[2][1]}/${p[3][0]}${p[3][1]}`,lookup),
        iterate (`${p[2][2]}${p[2][3]}/${p[3][2]}${p[3][3]}`,lookup)
    ]
    }

} 

let combs2 = [[2,3,0,1], // flip down
         [1,0,3,2], // mirror left
         [2,0,3,1], // rot 90
         [3,2,1,0], // rot 180
         [1,3,0,2]] // rot 270

let combs3 = [[6,7,8,3,4,5,0,1,2], // flip down
         [2,1,0,5,4,3,8,7,6], // mirror left
         [6,3,0,7,4,1,8,5,2], // rot 90
         [8,7,6,5,4,3,2,1,0], // rot 180
         [2,5,8,1,4,7,0,3,6]] // rot 270

function expand(rule) {
    let s = new Set()
    s.add(rule)


    let p = rule.replace(/\//g,'')
    //console.log(p)
    if (p.length == 4) {
        for (let c of combs2) {
            s.add(`${p[c[0]]}${p[c[1]]}/${p[c[2]]}${p[c[3]]}`)
        }
    }
    else {
        for (let c of combs3) {
            s.add(`${p[c[0]]}${p[c[1]]}${p[c[2]]}/${p[c[3]]}${p[c[4]]}${p[c[5]]}/${p[c[6]]}${p[c[7]]}${p[c[8]]}`)
        }
    }
    return s;
}

const expected = part => part === 1 ? "todo" : "todo"

module.exports = { solve, expected }