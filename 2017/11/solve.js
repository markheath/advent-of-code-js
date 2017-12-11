// https://www.redblobgames.com/grids/hexagons

function solve(input, part) {
    let [endPos,maxDist] = followPath(input[0])
    if (part === 1) {
        //console.log(distance(followPath("ne,ne,ne"))) 3
        //console.log(distance(followPath("ne,ne,sw,sw"))) 0
        //console.log(distance(followPath("ne,ne,s,s"))) 2
        //console.log(distance(followPath("se,sw,se,sw,sw"))) 3
        return distance(endPos)
    }
    else {
        return maxDist;
    }
}

const followPath = path => path.split(',')
                            .reduce(([pos,maxdist],dir) => {
                                let newPos = move(pos,dir)
                                return [newPos, Math.max(maxdist,distance(newPos))] }
                                ,[[0,0,0],0])
const move = (from,dir) => lookup[dir].map((v,n) => v+from[n])

const distance = ([x,y,z]) => Math.max(Math.abs(x),Math.abs(y),Math.abs(z))

const lookup = {
    "n": [0,1,-1],
    "s": [0,-1,1],
    "nw": [-1,1,0],
    "se": [1,-1,0],
    "ne": [1,0,-1],
    "sw": [-1,0,1],
}

const expected = part => part === 1 ? 664 : -1;

module.exports = {solve,expected};