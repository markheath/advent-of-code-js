let { countStepsUntilExit } = require("../2017/05/solve")

describe("2017 day 5", function() {
    it ("passes the part 1 test cast", function() {
        const steps = countStepsUntilExit([0,3,0,1,-3], () => 1)
        expect(steps).toBe(5);
    })

    it ("passes the part 2 test cast", function() {
        const steps = countStepsUntilExit([0,3,0,1,-3], n => (n>=3)?-1:1)
        expect(steps).toBe(10);
    })
});