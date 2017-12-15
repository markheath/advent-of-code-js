const { reverseSection,applyLengths,hashString,toHex } = require("../2017/10/solve")

const reverseTests = [ [[0,1,2,3,4], 0, 2, [1,0,2,3,4] ],
[[0,1,2,3,4], 1, 3, [0,3,2,1,4] ],
[[0,1,2,3,4], 2, 3, [0,1,4,3,2] ],
[[0,1,2,3,4], 3, 3, [3,1,2,0,4] ],
]

const hashTests = [
    ["", "a2582a3a0e66e6e86e3812dcb672a272"],
    ["AoC 2017" , "33efeb34ea91902bb2f59c9920caa6cd"],
    ["1,2,3", "3efbe78a8d82f29979031a4aa0b16a9d"],
    ["1,2,4", "63960835bcdc130f0b66d7ff4f6a5a8e"]
]

describe("2017 day 10", function() {
    it ("can reverse sections", function() {
        for (let [input,pos,len,expected] of reverseTests)
            expect(reverseSection(input,pos,len)).toEqual(expected);
    })

    it ("can apply lengths", function() {
        let {result} = applyLengths([0,1,2,3,4],[3, 4, 1, 5]);
        expect(result).toEqual([3,4,2,1,0]);
    })

    it ("can hash strings", function() {
        for (let [input,expected] of hashTests)
            expect(toHex(hashString(input))).toEqual(expected);
    })
});