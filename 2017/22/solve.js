const { flatMap } = require('../../utils/utils')
function solve(input, part) {
    //console.log(input.length,input[0].length)
    let delta = Math.floor(input.length / 2)
    const viruses = new Map([...flatMap(input.map((row,y) => [...row].map((ch,x) => [ch,x-delta,y-delta]).filter(([ch]) => ch === '#')))].map(([,x,y]) => [`${x},${y}`,'#']))
    let curPos = [0,0]
    let curDir = 'U'
    const dirs = "URDLURDL"
    let newInfections = 0;
    let bursts = part === 1 ? 10000 : 10000000;
    for(let burst = 0; burst < bursts; burst++) {
        const key = curPos.toString()
        //console.log(curPos,curDir,isInfected)
        if (part === 1) {
            const isInfected = viruses.get(key) === '#'
            curDir = dirs[dirs.indexOf(curDir) + (isInfected ? 1 : 3)]
            if (isInfected) {
                viruses.delete(key); 
            }
            else {
                newInfections++;
                viruses.set(key,'#')
            }

        }
        else {
            const states = ".W#F.";
            const curNode = viruses.get(key) || '.'
            if (curNode === '.') curDir = dirs[dirs.indexOf(curDir) + 3] // left
            else if (curNode === '#') curDir = dirs[dirs.indexOf(curDir) + 1] // right
            else if (curNode === 'F') curDir = dirs[dirs.indexOf(curDir) + 2] // reverse
            const newState = states[states.indexOf(curNode) + 1]
            if (newState === '#') newInfections++;
            //console.log(curNode, newState, curDir, curPos)
            viruses.set(key, newState)
        }
        if(curDir === 'U') curPos[1]--;
        else if(curDir === 'D') curPos[1]++;
        else if(curDir === 'L') curPos[0]--;
        else curPos[0]++;
    }
    //console.log(viruses)
    return newInfections;
}

const expected = part => part === 1 ? 5305 : "todo"

module.exports = { solve, expected }