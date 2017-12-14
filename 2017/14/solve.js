const {hashString} = require('../10/solve')

let grid;

function solve(input, part) {
    grid = grid || buildGrid(input[0]); // perf optimize by remembering the grid from part 1
    if (part === 1) {
        let totalBits = 0;
        for(let x = 0; x < 128; x++) { for(let y = 0; y < 128; y++) totalBits += grid[x][y] === '#'?1:0 }
        return totalBits;
    }
    else {
        return countRegions(grid); // test input shoud be 1242
    }
    //console.log(hashString("flqrgnkx-0")[0].toString(2));
    //console.log(hashString("flqrgnkx-1")[0].toString(2));
    //console.log(hashString("flqrgnkx-2")[0].toString(2));
}

const countRegions = grid => {
    let regions = 0;
    for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
            if(grid[x][y] === '#') {
                regions++;
                clearRegion(grid,x,y)
            }
        }
    }
    return regions;
}

const clearRegion = (grid,x,y) => {
    if(grid[x][y] !== '#') return
    grid[x][y] = '.';
    if(y+1 < grid[x].length) clearRegion(grid,x,y+1)
    if(y > 0) clearRegion(grid,x,y-1)
    if(x+1 < grid.length) clearRegion(grid,x+1,y)
    if(x > 0) clearRegion(grid,x-1,y)
}

const buildGrid = key => {
    let grid = []
    for(let n = 0; n < 128; n++) {
        grid.push(expandHash(getRow(key,n)))
    }
    /*for(let n = 0; n < 3; n++) {
        console.log(grid[n].slice(0,8))
    }*/
    return grid;
}

const expandHash = hash => {
    let b = []
    for (let h of hash) {
        let m = 0x80;
        while(m) {
            b.push(m&h ? '#' : '.')
            m = m>>1
        }
    }
    return b;
}

const getRow = (key,row) => hashString(`${key}-${row}`)

const expected = part => part === 1 ? 8106 : 1164;

module.exports = {solve,expected};
