var _ = require('lodash');
function solve(input) {
    /*
    var result = Array.from(input)
        .map(n => n === '(' ? 1 : -1)
        .reduce((x,y) => x+y,0);*/
    
    var part1 = _.sumBy(input, c => c === '(' ? 1 : -1);
    console.log(`Day 1 Part 1 ${part1}`);

    var part2 = _.transform(input, (res,val) => { res.step++; res.floor+= (val === '(' ? 1:-1); return res.floor >=0; } ,{floor:0, step:0});
    console.log(`Day 1 Part 2 ${part2.step}`);

    /* regular loop
    let floor = 0;
    for(let n = 0; n < input.length; n++) {
        floor += (input[n] === '(' ? 1:-1);
        if (floor < 0) {
            console.log(`Day 1 Part 2 ${n+1}`)
            break;
        }
    }
    */
}

module.exports = {solve};