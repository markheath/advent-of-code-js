//const {max,min} = require('../../utils/utils')

function solve(input, part) {
    let startingSquare = Number(input[0]);
    console.log(distanceTo(1)) // 0 
    console.log(distanceTo(12)) //3
    console.log(distanceTo(23)) //2
    console.log(distanceTo(1024)) //31
    return distanceTo(startingSquare);
}

function distanceTo(targetNumber) {
    for(let p of numberPlacement()) {
        if (p.n === targetNumber) {
            return Math.abs(p.pos[0]) + Math.abs(p.pos[1]);
        }
    }
}

// placement of next number R1 U1 L2 D2 R3 U3 L4 D4 R5
function* numberPlacement() {
    const dir = "RULD";
    let [x,y] = [0,0];
    let curNumber = 1;
    let dirIndex = 0;
    let dist = 1;
    let move = () => {
        switch(dir[dirIndex]) {
            case "R": x++; break;
            case "U": y--; break;
            case "L": x--; break;
            case "D": y++; break;
        }
        return [x,y];
    }
    yield { n: curNumber, pos: [x,y]}
    for(;;) {
        for(let q = 0; q < 2; q++) {
            for(let n = 0; n < dist; n++) {
                yield { n: ++curNumber, pos: move()}
            }
            dirIndex++;
            dirIndex = dirIndex%dir.length;
        }
        dist++;
    }
}



const expected = part => part === 1 ? 430 : -1;

module.exports = {solve,expected};