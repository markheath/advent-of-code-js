const {sum,any,first,range} = require('../../utils/utils')

function solve(input, part) {
    const firewall = loadFirewall(input)
    return (part === 1) ? scoreTrip(firewall,0) : first(range(0),d => !wasCaught(firewall,d))
}

function loadFirewall(input) {
    return new Map( input.map(s => /(\d+): (\d+)/.exec(s))
    .map(([,d,r]) => ([Number(d),Number(r)])))
}

const isCollision = (range,currentTime) => currentTime%(2 * (range - 1)) === 0;

const scoreTrip = (firewall, delay) => sum(trip(firewall,delay));

const wasCaught = (firewall,delay) => any(trip(firewall,delay));

function* trip(firewall, delay) {
    for(let [depth,range] of firewall) {
        if (isCollision(range,delay+depth)) {
            yield depth*range;
        }
    }
}

const expected = part => part === 1 ? 1612 : 3907994;

module.exports = {solve,expected};
