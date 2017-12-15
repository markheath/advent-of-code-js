let {take,zip,range,where,count} = require('../../utils/utils')
function solve(input, part) {
    let genAStart = Number(/\d+/.exec(input[0])[0])
    let genBStart = Number(/\d+/.exec(input[1])[0])
    console.log(genAStart,genBStart)
    const aFactor = 16807, bFactor = 48271
    const testAStart = 65;
    const testBStart = 8921;
    //console.log([...take(generator(65,aFactor),5)])
    //console.log([...take(generator(8921,bFactor),5)])
    //console.log([...zip(range(4,5),range(10,5))])
    if (part === 1) 
        return countMatch(generator(genAStart,aFactor), generator(genBStart,bFactor), 40000000);
}

function countMatch(seq1,seq2,n) {
    const comp = ([a,b]) => (a&0xFFFF) === (b&0xFFFF); // brackets are needed!
    return count(where(take(zip(seq1,seq2),n),comp))
}

function *generator(seed,factor) {
    let cur = seed;
    for(;;) {
        cur = (cur*factor)%2147483647
        yield cur;
    }
}

const expected = part => part === 1 ? 600 : -1;

module.exports = {solve,expected};
