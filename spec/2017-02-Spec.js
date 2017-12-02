let { checksum,greatestDifference,findDivisors } = require("../2017/02/solve")

describe("2017 day 2", function() {
    it ("solves the part 1 test case", function() {
        const part1TestSpreadsheet = [[5,1,9,5],[7,5,3],[2,4,6,8]]
        let solution = checksum(part1TestSpreadsheet,greatestDifference)
        expect(solution).toEqual(18)
    })

    it ("solves the part 2 test case", function() {
        const part2TestSpreadsheet = [[5,9,2,8],[9,4,7,3],[3,8,6,5]]
        let solution = checksum(part2TestSpreadsheet,findDivisors)
        expect(solution).toEqual(9)
    })
});