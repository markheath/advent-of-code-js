const {max,sum,any,first,range} = require('../../utils/utils')
function solve(input, part) {
    const firewall = loadFirewall(input)
    if (part === 1) {
        return scoreTrip(firewall,0)
    }
    else {
        /*for(let delay = 0; ; delay++) {
            if (!wasCaught(firewall,delay)) return delay;
        }*/
        return first(range(0),d => !wasCaught(firewall,d))
    }
}

function loadFirewall(input) {
    return new Map( input.map(s => /(\d+): (\d+)/.exec(s))
    .map(([,d,r]) => ([Number(d),Number(r)])))
}

const isCollision = (range,currentTime) => range > 0 && currentTime%(2 * (range - 1)) === 0;

const scoreTrip = (firewall, delay) => sum(trip(firewall,delay));

function wasCaught2(firewall,delay) {
    for(let s of trip(firewall,delay)) return true;
    return false;
}

const wasCaught3 = (firewall,delay) => !trip(firewall,delay)[Symbol.iterator]().next().done;

const wasCaught = (firewall,delay) => any(trip(firewall,delay));


function* trip2(firewall, delay) {
    const maxDepth = max(firewall.keys())
    for(let depth = 0; depth<=maxDepth; depth++) {
        let range = firewall.get(depth) || 0
        if (isCollision(range,delay+depth)) {
            yield depth*range;
        }
    }
}

function* trip(firewall, delay) {
    for(let [depth,range] of firewall) {
        if (isCollision(range,delay+depth)) {
            yield depth*range;
        }
    }
}


const testInput = [
"0: 3",
"1: 2",
"4: 4",
"6: 4" ]

const expected = part => part === 1 ? 1612 : 3907994;

module.exports = {solve,expected};
