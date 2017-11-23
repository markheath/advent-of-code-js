function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 543903 : 14687245;
}

let parseInstruction = function(actionSelector, i) {
    const pattern = /(turn on|toggle|turn off)\ (\d+)\,(\d+)\ through\ (\d+)\,(\d+)/
    const groups = pattern.exec(i);
    let action = actionSelector[groups[1]];
    let fromPos = [ parseInt(groups[2]), parseInt(groups[3]) ]
    let toPos = [ parseInt(groups[4]), parseInt(groups[5]) ]
    return { action, fromPos, toPos };
}

let expandPositions = function* ( [x0,y0], [x1,y1]) {
    for(let x = x0; x <= x1; x++) {
        for(let y = y0; y <= y1; y++) {
            yield [x,y];
        }
    }
}

let applyAction = function (acc, action,[x,y]) {
    acc[x][y] = action(acc[x][y]);
    return acc;
}

let calculate = function(actionSelector, input) {
    let state = []
    for(let x = 0; x < 1000; x++) {
        let row = new Array(1000).fill(0);
        state.push(row);
    }
    for (let i of input) {
        let ins = parseInstruction(actionSelector, i);
        for(let p of expandPositions(ins.fromPos, ins.toPos)) {
            applyAction(state, ins.action, p);
        }
    }
    return state.map(r => r.reduce((a,b) => a+b))
                    .reduce((a,b) => a+b);
}

function part1(input) {
    const lookup = {
        "turn on":  n => 1,
        "turn off": n => 0,
        "toggle": n => n == 1 ? 0 : 1
    };
    return calculate (lookup,input);
}

function part2(input) {
    const lookup = {
        "turn on":  n => n + 1,
        "turn off": n => n > 0 ? n - 1 : 0,
        "toggle": n => n + 2
    };
    return calculate (lookup,input);
}

module.exports = {solve,expected};