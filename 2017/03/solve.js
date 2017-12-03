function solve(input, part) {
    const startingSquare = Number(input[0]);
    if (part === 1) {
        const distanceTo = targetNumber => {
            let c = 1;
            let nextNumber = () => ++c;
            let p = find(n => n === targetNumber, nextNumber)
            return Math.abs(p.pos[0]) + Math.abs(p.pos[1]);
        }
        //console.log(distanceTo(12)) //3
        //console.log(distanceTo(23)) //2
        //console.log(distanceTo(1024)) //31
        return distanceTo(startingSquare);
    }
    else {
        const nextNumber = ([x,y],state) => 
            [[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1]].reduce((acc,[a,b]) => acc + (state[[x+a,y+b]] || 0), 0);
        return find(n => n > startingSquare, nextNumber).n;
    }
}

function find(isTarget, nextNumber) {
    let state = { };
    state[[0,0]] = 1
    for(let p of numberPlacement(p => nextNumber(p,state))) {
        state[p.pos] = p.n;
        if (isTarget(p.n)) {
            return p;
        }
    }
}

// placement of next number R1 U1 L2 D2 R3 U3 L4 D4 R5
function* numberPlacement(nextNumber) {
    const dir = "RULD";
    let [x,y] = [0,0];
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
    for(;;) {
        for(let q = 0; q < 2; q++) {
            for(let n = 0; n < dist; n++) {
                let nextPos = move();
                yield { n: nextNumber(nextPos), pos: nextPos}
            }
            dirIndex++;
            dirIndex = dirIndex%dir.length;
        }
        dist++;
    }
}

const expected = part => part === 1 ? 430 : 312453;

module.exports = {solve,expected};