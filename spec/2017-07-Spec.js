const { part1,part2,findDifferentIndex } = require("../2017/07/solve")

const testInput = [ "pbga (66)",
"xhth (57)",
"ebii (61)",
"havc (66)",
"ktlj (57)",
"fwft (72) -> ktlj, cntj, xhth",
"qoyq (66)",
"padx (45) -> pbga, havc, qoyq",
"tknk (41) -> ugml, padx, fwft",
"jptl (61)",
"ugml (68) -> gyxo, ebii, jptl",
"gyxo (61)",
"cntj (57)`;" ]

describe("2017 day 7", function() {
    it ("solves the part 1 test case", function() {
        expect(part1(testInput)).toBe("tknk");
    })

    it ("solves the part 2 test case", function() {
        expect(part2(testInput)).toBe(60);
    })

    it ("finds different index if different is first", function() {
        expect(findDifferentIndex([2,1,1,1])).toEqual([0,1])
    })

    it ("finds different index if different is last", function() {
        expect(findDifferentIndex([1,1,1,2])).toEqual([3,0])
    })

    it ("finds different index if different is second", function() {
        expect(findDifferentIndex([1,2,1,1])).toEqual([1,0])
    })

    it ("handles two input arrays", function() {
        // arbitrary decision here - [0,1] or [1,0] equally valid outputs
        expect(findDifferentIndex([1,2])).toEqual([0,1])
    })
});