const {max,min} = require('../../utils/utils')

function solve(input, part) {
    const spreadsheet = input.map(r => r.split('\t').map(s => Number(s)))
    if (part === 1) {
        const part1TestSpreadsheet = [[5,1,9,5],[7,5,3],[2,4,6,8]] // should return 18
        return checksum(spreadsheet, r => max(r) - min(r));
    }
    else {
        const part2TestSpreadsheet = [[5,9,2,8],[9,4,7,3],[3,8,6,5]] // should return 9
        return checksum(spreadsheet, findDivisors);
    }
}

function checksum(spreadsheet, rowFn) {
    return spreadsheet.map(rowFn)
                      .reduce((a,b) => a+b);
}

function* combinations(arr) {
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr.length; y++) {
            if (x !== y) yield [arr[x],arr[y]];
        }
    }
}

function findDivisors(row) {
    for (let[a,b] of combinations(row)) {
        if(a%b === 0) return a/b;
    }
    throw new Error("no divisors found in row");
}

function findDivisors1(row) {
    for (let x = 0; x < row.length; x++) {
        for (let y = x+1; y < row.length; y++) {
            if (row[x]%row[y] === 0) {
                return row[x] / row[y];
            }
            if (row[y]%row[x] === 0) {
                return row[y] / row[x];
            }
        }
    }
    throw new Error("no divisors found in row");
}

const expected = part => part === 1 ? 50376 : 267;

module.exports = {solve,expected};