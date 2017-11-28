let { bfs,scan } = require("../utils/utils")
describe("Utils", function() {
    it ("can do a basic breadth first search", function() {
        let solution = bfs(s => s === "abba", s => [ s+"b", s+"a" ] , "a").next().value;
        expect(solution).toEqual("abba")
    })

    it ("can keep a running total", function() {
        let solution = [...scan([2,2,2,2],(a,b) => a+b, 0)];
        expect(solution).toEqual([0,2,4,6,8])
    })
    it ("can keep a running total without start state", function() {
        let solution = [...scan([2,2,2,2],(a,b) => a+b)];
        expect(solution).toEqual([2,4,6,8])
    })
})