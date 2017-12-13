const {max} = require('../../utils/utils')
function solve(input, part) {
    const firewall = loadFirewall(input)
    if (part === 1) {
        return scoreTrip(firewall,0).score
    }
    else {
        let f = loadFirewall(input)
        for(let delay = 0; ; delay++) {
            let {wasCaught} = scoreTrip(f,delay)
            //console.log(`delay ${delay}: score ${score}`)
            if (!wasCaught) return delay;
        }
    }
}

function loadFirewall(input) {
    return new Map( input.map(s => /(\d+): (\d+)/.exec(s))
    .map(([,d,r]) => ([Number(d),Number(r)])))
}

function scoreTrip(firewall, delay) {
    const maxDepth = max(firewall.keys())
    
    let score = 0;
    let wasCaught = false;
    for(let depth = 0; depth<=maxDepth; depth++) {
        let range = firewall.get(depth) || 0
        if (range > 0) {
            let period = 2 * (range - 1)
            let currentTime = delay + depth
            let caught = currentTime%period === 0;
            if (caught) {
                score += (depth*range);
                wasCaught = true;
            }
        }
    }
    return {score,wasCaught};
}


const testInput = [
"0: 3",
"1: 2",
"4: 4",
"6: 4" ]

const expected = part => part === 1 ? 1612 : 3907994;

module.exports = {solve,expected};
