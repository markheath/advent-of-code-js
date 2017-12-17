
function solve(input, part) {
    let steps = Number(input[0]) // for test 3
    if (part === 1) {
        let buf = spinFor(2017,steps)
        return buf[buf.indexOf(2017)+1]
    } 
    else {
        let second = -1
        let curPos = 0;
        for(let n = 1; n < 50000000; n++) {
            curPos = (curPos + steps)%n + 1
            if (curPos === 1) second = n;
        }
        return second;
    }
}

function spinFor(iterations,steps) {
    let buf = [0]
    let curPos = 0;
    for(let n = 1; n <= iterations; n++) {
        curPos = spin(buf,steps,curPos,n)
    }
    return buf;
}

function spin(buffer, steps, curPos, val) {
    const insertPos = (curPos + steps)%buffer.length + 1
    buffer.splice(insertPos, 0, val);
    return insertPos;
}

const expected = part => part === 1 ? 417 : 34334221;

module.exports = {solve,expected};
