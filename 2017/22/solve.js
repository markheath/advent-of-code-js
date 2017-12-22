const { flatMap } = require('../../utils/utils')
function solve(input, part) {
    //console.log(input.length,input[0].length)
    let delta = Math.floor(input.length / 2)
    const viruses = new Map([...flatMap(input.map((row,y) => [...row].map((ch,x) => [ch,x-delta,y-delta]).filter(([ch]) => ch === '#')))].map(([,x,y]) => [`${x},${y}`,'#']))
    let curPos = [0,0]
    let curDir = 'U'
    const dirs = "URDL"
    let newInfections = 0;
    for(let burst = 0; burst < 10000; burst++) {
        const key = curPos.toString()
        const isInfected = viruses.has(key)
        //console.log(curPos,curDir,isInfected)
        curDir = dirs[(dirs.length + dirs.indexOf(curDir) + (isInfected ? 1 : -1)) % dirs.length]
        if (isInfected) {
            viruses.delete(key); 
        }
        else {
            newInfections++;
            viruses.set(key,'#')
        }
        if(curDir === 'U') curPos[1]--;
        else if(curDir === 'D') curPos[1]++;
        else if(curDir === 'L') curPos[0]--;
        else curPos[0]++;
    }
    //console.log(viruses)
    return part === 1 ? newInfections : 0;
}

const expected = part => part === 1 ? 5305 : "todo"

module.exports = { solve, expected }