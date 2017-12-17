
function solve(input, part) {
    //let buf = {val:0}
    //buf.next = buf;
    let steps = Number(input[0]) // for test 3
    if (part === 1) {
        let buf = spinFor(2017,steps)
        return buf[buf.indexOf(2017)+1]
    } 
    else {
        let second = -1
        let curPos = 0;
        for(let n = 1; n < 50000000; n++) {
            let newSecond
            [curPos,newSecond] = spin2(steps,curPos,n,second)
            if (newSecond != second) {
                //console.log(n,second)
                second = newSecond
            }
        }
        return second;
        //let buf = spinFor(50000000,steps)
        //return buf[buf.indexOf(0)+1]
    }
}

//with steps = 3:
// 1: 1, 
// 2: 2x3, 
// 5x4, 
// 9x3, 
// 12x4, 
// 16xlots?, 
// 218: 218x

//with steps = 348
// 1 13 22 34 57

function spinFor(iterations,steps,debug) {
    let buf = [0]
    let curPos = 0;
    for(let n = 1; n <= iterations; n++) {
        curPos = spin(buf,steps,curPos,n)
        if (debug) console.log(n,buf.slice(0,2))
        //console.log(buf,curPos)
        
    }
    return buf;
}

function spin(buffer, steps, curPos, val) {
    const insertPos = (curPos + steps)%buffer.length + 1
    buffer.splice(insertPos, 0, val);
    return insertPos;
}

function spin2(steps, curPos, val, second) {
    const insertPos = (curPos + steps)%val + 1
    return [insertPos, (insertPos === 1) ? val : second]
}

const expected = part => part === 1 ? 417 : 34334221;

module.exports = {solve,expected};
