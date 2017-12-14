const {hashString} = require('../10/solve')

function solve(input, part) {
    //console.log(bitsSet(1))
    //console.log(bitsSet(2))
    //console.log(bitsSet(3))
    //console.log(bitsSet(255))
    if (part === 1) {
        let totalBits = 0;
        for(let n = 0; n < 128; n++) {
            totalBits += getRow(input[0],n).reduce((a,b) => a + bitsSet(b),0)
        }
        return totalBits;
    }
    else {
        let grid = buildGrid(input[0]);
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
    //if(x < 0 || y < 0 || x >= grid.length || y >= grid[x].length) return;
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

function bitsSet(byte) {
    let n = 0;
    for(let c of byte.toString(2)) {
        if (c === '1') n++;
    }
    return n;
}

function bitsSet2(n) {
    let count = 0;
    while (n)
    {
      n &= (n-1);
      count++;
    }
    return count;
}

const expected = part => part === 1 ? 8106 : 1164;

module.exports = {solve,expected};
