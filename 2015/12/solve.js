function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 111754 : 65402;
}

function isRed(obj) {
    if (obj.constructor == Array) return false;
    for(j in obj) {
        if (obj[j] === "red") return true;
    }
    return false;
}

function sum(obj,avoid) {
    let total = 0;
    if (typeof(obj) === "object") {
        if (!avoid(obj)) {
            for (j in obj) {
                total += sum(obj[j],avoid);
            }
        }
    }
    else if (typeof (obj) === "number") {
        total += obj;
    }
    return total;
}

function part1(input) {
    let j = JSON.parse(input.join("\n"))
    return sum(j,(o => false));
}

function part2(input) {
    let j = JSON.parse(input.join("\n"))
    return sum(j,isRed);
}

module.exports = {solve,expected};