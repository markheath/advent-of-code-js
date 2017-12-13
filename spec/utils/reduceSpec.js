let { reduce } = require("../../utils/utils")
describe("reduce util", function() {
    it ("can sum numbers", function() {
        let solution = reduce([1,2,3],(a,b) => a+b,0);
        expect(solution).toBe(6)
    })

    it ("can concatenate strings", function() {
        let solution = reduce(['a','b','c'],(a,b) => a+(a === ""?"":",")+b,"");
        expect(solution).toBe("a,b,c")
    })
})