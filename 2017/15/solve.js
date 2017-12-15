let {take,zip,where,count} = require('../../utils/utils')
function solve(input, part) {
    const parse = s => Number(/\d+/.exec(s)[0])
    let genAStart = parse(input[0])
    let genBStart = parse(input[1])
    const aFactor = 16807, bFactor = 48271

    if (part === 1) 
        return countMatch(generator(genAStart,aFactor), 
                        generator(genBStart,bFactor), 40000000);
    else 
        return countMatch(generator(genAStart,aFactor,n=>(n%4)===0), 
                        generator(genBStart,bFactor,n=>(n%8)===0), 5000000);
}

function countMatch(seq1,seq2,n) {
    const comp = ([a,b]) => (a&0xFFFF) === (b&0xFFFF); // brackets are needed!
    return count(where(take(zip(seq1,seq2),n),comp))
}

function *generator(seed,factor,test) {
    let cur = seed;
    for(;;) {
        cur = (cur*factor)%2147483647
        if (!test || test(cur)) yield cur;
    }
}

const expected = part => part === 1 ? 600 : 313;

module.exports = {solve,expected,generator};
