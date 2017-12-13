const {max} = require('../../utils/utils')
function solve(input, part) {
    const firewall = new Map( input.map(s => /(\d+): (\d+)/.exec(s))
    .map(([,d,r]) => ([Number(d),Number(r)])))
    const maxDepth = max(firewall.keys())
    
    let score = 0;
    for(let depth = 0; depth<=maxDepth; depth++) {
        let range = firewall.get(depth) || 0
        if (range > 0) {
            let period = 2 * (range - 1)
            let caught = depth%period === 0;
            if (caught)
                score += depth*range;
        }
    }
    return score;
}

const testInput = [
"0: 3",
"1: 2",
"4: 4",
"6: 4" ]


const expected = part => part === 1 ? 1612 : -1;

module.exports = {solve,expected};