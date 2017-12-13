let { count } = require("../../utils/utils")
describe("count util", function() {
    it ("can count an empty array", function() {
        let solution = count([]);
        expect(solution).toBe(0)
    })

    it ("can count a one element array", function() {
        let solution = count([1]);
        expect(solution).toBe(1)
    })

    it ("can count a three element array", function() {
        let solution = count([1,4,6]);
        expect(solution).toBe(3)
    })

    it ("can count any iterable", function() {
        let solution = count(new Map([[1,2],[3,4]]));
        expect(solution).toBe(2)
    })

})