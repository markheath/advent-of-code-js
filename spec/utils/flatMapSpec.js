let { flatMap } = require("../../utils/utils")
describe("flatMap util", function() {
    it ("flatMap array of arrays", function() {
        let solution = [...flatMap([[1],[2,2],[3,3,3]],f => f)];
        expect(solution).toEqual([1,2,2,3,3,3])
    })

    it ("flatMap strings", function() {
        let solution = [...flatMap(["apple","banana","cat"],f => [f[0],f.length])];
        expect(solution).toEqual(['a',5,'b',6,'c',3])
    })

    it ("flatMap selector is optional", function() {
        let solution = [...flatMap([[1],[2,2],[3,3,3]])];
        expect(solution).toEqual([1,2,2,3,3,3])
    })
})