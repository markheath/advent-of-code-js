
function solve(input, part) {
    //let buf = {val:0}
    //buf.next = buf;
    if (part === 1) {
        let buf = [0]
        let steps = Number(input[0]) // for test 3
        let curPos = 0;
        let maxNumber = 2017;
        for(let n = 1; n <= maxNumber; n++) {
            curPos = spin(buf,steps,curPos,n)
            //console.log(buf,curPos)
        }
        return buf[buf.indexOf(2017)+1]
    }
}



function spin(buffer, steps, curPos, val) {
    const insertPos = (curPos + steps)%buffer.length + 1
    buffer.splice(insertPos, 0, val);
    return insertPos;
}

const expected = part => part === 1 ? "todo" : "todo";

module.exports = {solve,expected};
