let {take,zip,range,where,count} = require('../../utils/utils')
function solve(input, part) {
    let genAStart = Number(/\d+/.exec(input[0])[0])
    let genBStart = Number(/\d+/.exec(input[1])[0])
    const aFactor = 16807, bFactor = 48271
    const testAStart = 65;
    const testBStart = 8921;
    //console.log([...take(generator(65,aFactor),5)])
    //console.log([...take(generator(8921,bFactor),5)])
    //console.log([...zip(range(4,5),range(10,5))])
    if (part === 1) 
        return countMatch(generator(genAStart,aFactor,()=>true), 
                        generator(genBStart,bFactor,()=>true), 40000000);
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
        if (test(cur)) yield cur;
    }
}

const expected = part => part === 1 ? 600 : 313;

module.exports = {solve,expected};
