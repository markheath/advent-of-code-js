const { redistribute,countRedistributions } = require("../2017/06/solve")

describe("2017 day 6", function() {
    it ("solves the part 1 test case", function() {
        const count = countRedistributions([0,2,7,0]).redistributions
        expect(count).toBe(5);
    })

    it ("passes the part 2 test case", function() {
        const count = countRedistributions([0,2,7,0]).loopSize
        expect(count).toBe(4);
    })

    
    it ("correctly redistributes", function() {
        let banks = redistribute([0,2,7,0])
        expect(banks).toEqual([2,4,1,2]);
        banks = redistribute(banks)
        expect(banks).toEqual([3,1,2,3]);
        banks = redistribute(banks)
        expect(banks).toEqual([0,2,3,4]);
        banks = redistribute(banks)
        expect(banks).toEqual([1,3,4,1]);
        banks = redistribute(banks)
        expect(banks).toEqual([2,4,1,2]);
    })
});