let { groupAdjacent,next } = require("../../2015/10/solve")

describe("2015 day 10", function() {
    it ("can group adjacent", function() {
        let solution = groupAdjacent([1,1,1,2,2,3,3,3])
        expect(solution).toEqual([[1,1,1],[2,2],[3,3,3]])
    })

    const nextNumbers = [
        [ [1], [1,1] ],
        [ [1,1], [2,1] ],
        [ [2,1], [1,2,1,1] ],
        [ [1,2,1,1], [1,1,1,2,2,1] ],
        [ [1,1,1,2,2,1], [3,1,2,2,1,1] ]
    ];

    it ("can calc next number", function() {
        for (let [s,n] of nextNumbers)
        expect([...next(s)]).toEqual(n);
    })
});