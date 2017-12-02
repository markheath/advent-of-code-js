const {max,min} = require('../../utils/utils')

function solve(input, part) {
    const spreadsheet = input.map(r => r.split('\t').map(s => Number(s)))
    return checksum(spreadsheet, (part === 1) ? greatestDifference : findDivisors);
}

const greatestDifference = r => max(r) - min(r)
const checksum = (spreadsheet, rowFn) => spreadsheet.reduce((a,b) => a+rowFn(b),0);

function* allPairs(arr) {
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr.length; y++) {
            if (x !== y) yield [arr[x],arr[y]];
        }
    }
}

function findDivisors(row) {
    for (let[a,b] of allPairs(row)) {
        if(a%b === 0) return a/b;
    }
    throw new Error("no divisors found in row");
}

const expected = part => part === 1 ? 50376 : 267;

module.exports = {solve,expected,checksum,greatestDifference,findDivisors};