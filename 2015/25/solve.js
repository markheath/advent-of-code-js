let utils = require("../../utils/utils");

function solve(input, part) {
    if (part === 1) {
        let code = 20151125;
        for (let d = 1; true; d++) {
            for (let c = 1; c < d+1; c++) {
                let row = d - c + 1, col = c;
                if (row === 2978 && col === 3083)
                    return code;
                code = (code * 252533) % 33554393;
            }
        }
    }
    return 0;
}

function expected(part) {
    return part == 1 ? 2650453 : 0;
}

module.exports = {solve,expected};