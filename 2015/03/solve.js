function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input[0]);
}

function expected(part) {
    return part == 1 ? 2592 : 2360;
}

function scan(source, folder, startState) {
    let out = []
    let state = startState;
    if (typeof(state) !== "undefined" ) {
        out.push(startState);
    }
    for(var n of source) {
        if (typeof(state) === "undefined" ) {
            state = n;
        }
        else {
            state = folder(state, n);
        }
        out.push(state);
    }
    return out;
}

function getVector(c) {
    return  c == '>' ? { x: 1, y: 0 } :
            c == '^' ? { x: 0, y: 1 } :
            c == '<' ? { x: -1, y: 0 } :
                       { x: 0, y: -1 };
}

function part1X(input) {
    var deltas = Array.from(input).map(getVector);
    
        
    var pos = scan(deltas, ({x,y}, d) => {return {x:x+d.x,y:y+d.y}}, {x:0,y:0})
               .map(({x,y}) => `${x},${y}`);
    return new Set(pos).size;
}

function part1(input) {
    let v = scan(input, moveSanta, {x:0,y:0})
               .map(({x,y}) => `${x},${y}`);
    return new Set(v).size;
}

function moveSanta(pos,c) {
    let {x,y} = getVector(c);
    return {x:pos.x+x,y:pos.y+y};
}

function part2(input) {
    let santaPos = {x:0,y:0};
    let roboSantaPos = {x:0,y:0};
    let positions = new Set();
    positions.add(`${santaPos.x},${santaPos.y}`);
    for(let n = 0; n < input.length; n+=2) {
        santaPos = moveSanta(santaPos,input[n]);
        roboSantaPos = moveSanta(roboSantaPos,input[n+1]);
        positions.add(`${santaPos.x},${santaPos.y}`);
        positions.add(`${roboSantaPos.x},${roboSantaPos.y}`);
    }
    return positions.size;
}

module.exports = {solve,expected};