function solve(input,part) {
    let rules = input.map(i => i.replace(/\//g,'').split(' ')).map(p => [p[0],p[2]])
    //console.log(expand("../.#"))
    //console.log(expand(".#./..#/###"))
    let expanded = new Map()
    for(let [input,output] of rules) {
        for (let e of expand(input)) {
            if (expanded.has(e)) {
                throw new Error(`replacing ${e}, ${expanded.get(e)} ${output}`)
            }
            expanded.set(e,output)
        }
    }
    //console.log(expanded)
    let state = [".#.","..#","###"]

    for(let n = 0; n < 5; n++) {
        state = iterate(state,expanded)
        console.log("iteration", n+1)
        console.log(state)
    }
    return state.reduce((a,s) => a + s.replace(/\./g,'').length,0)
}

function iterate(p, lookup) {
    let out = [];
    if (p.length % 2 == 0) {
        let y2 = 0
        // 2x2
        for(let y = 0; y < p.length; y+=2) {
            for(let x = 0; x < p.length; x+=2) {
                let key = p[y][x] + p[y][x+1] + p[y+1][x] + p[y+1][x+1]
                if (!lookup.has(key)) throw new Error("lookup not found [" + key + "]")
                let r = lookup.get(key) // will be 9 length string
                
                out[y2] = (out[y2] || "") +  r.slice(0,3)
                out[y2+1] = (out[y2+1] || "") + r.slice(3,6)
                out[y2+2] = (out[y2+2] || "") + r.slice(6,9)
            }
            y2+=3
        }
    }
    else {
        // 3x3
        let y2 = 0
        for(let y = 0; y < p.length; y+=3) {
            for(let x = 0; x < p.length; x+=3) {
                let key = p[y][x] + p[y][x+1] + p[y][x+2] + p[y+1][x] + p[y+1][x+1] + p[y+1][x+2] + p[y+2][x] + p[y+2][x+1] + p[y+2][x+2]
                if (!lookup.has(key)) throw new Error("lookup not found [" + key + "]")
                let r = lookup.get(key)// will be 16 length string
                out[y2] = (out[y2] || "") + r.slice(0,4)
                out[y2+1] = (out[y2+1] || "") + r.slice(4,8)
                out[y2+2] = (out[y2+2] || "") + r.slice(8,12)
                out[y2+3] = (out[y2+3] || "") + r.slice(12,16)
            }
            y2+=4
        }
    }
    return out;
}

const flip2 = s => s[2]+s[3]+s[0]+s[1]
const flip2LR = s => s[1]+s[0]+s[3]+s[2]
const rot2 = s => s[2]+s[0]+s[3]+s[1]

const flip3 = s => s[6]+s[7]+s[8]+s[3]+s[4]+s[5]+s[0]+s[1]+s[2]
const flip3LR = s => s[2]+s[1]+s[0]+s[5]+s[4]+s[3]+s[8]+s[7]+s[6]
const rot3 = s => s[6]+s[3]+s[0]+s[7]+s[4]+s[1]+s[8]+s[5]+s[2]

function perms3(s,q) {
    let f = flip3(q)
    if(!s.has(f)) {
        s.add(f)
        perms3(s,f)
    }
    f = flip3LR(q)
    if(!s.has(f)) {
        s.add(f)
        perms3(s,f)
    }
    f = rot3(q)
    if(!s.has(f)) {
        s.add(f)
        perms3(s,f)
    }
}

function expand(p) {
    let s = new Set()
    s.add(p)

    if (p.length === 4) {
        s.add(flip2(p))
        s.add(flip2LR(p))
        let r90 = rot2(p)
        s.add(r90)
        s.add(flip2(r90))
        s.add(flip2LR(r90))
        let r180 = rot2(r90)
        s.add(flip2(r180))
        s.add(flip2LR(r180))
        let r270 = rot2(r180)
        s.add(flip2(r270))
        s.add(flip2LR(r270))
    }
    else if (p.length === 9){
        perms3(s,p)
    }
    else {
        throw new Error("unexpected expand length",p)
    }
    return s;
}

const expected = part => part === 1 ? 197 : "todo"

module.exports = { solve, expected }