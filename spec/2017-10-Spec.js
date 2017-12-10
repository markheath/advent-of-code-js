const { reverseSection,applyLengths } = require("../2017/10/solve")

const reverseTests = [ [[0,1,2,3,4], 0, 2, [1,0,2,3,4] ],
[[0,1,2,3,4], 1, 3, [0,3,2,1,4] ],
[[0,1,2,3,4], 2, 3, [0,1,4,3,2] ],
[[0,1,2,3,4], 3, 3, [3,1,2,0,4] ],
]


describe("2017 day 10", function() {
    it ("can reverse sections", function() {
        for (let [input,pos,len,expected] of reverseTests)
            expect(reverseSection(input,pos,len)).toEqual(expected);
    })

    it ("can apply lengths", function() {
        let output = applyLengths([0,1,2,3,4],[3, 4, 1, 5]);
        expect(output).toEqual([3,4,2,1,0]);
    })
});