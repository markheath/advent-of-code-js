// using 3d hex coordinates https://www.redblobgames.com/grids/hexagons

function solve(input, part) {
    const [endPos,maxDist] = followPath(input[0])
    return (part === 1) ? distance(endPos) : maxDist;
}

const updateState = ([pos,maxdist],dir) => {
    const newPos = move(pos,dir)
    return [newPos, Math.max(maxdist,distance(newPos))] 
}
const followPath = path => path.split(',').reduce(updateState,[[0,0,0],0])
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

const expected = part => part === 1 ? 664 : 1447;

module.exports = {solve,expected};