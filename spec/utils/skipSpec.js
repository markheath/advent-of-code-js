let { skip } = require("../../utils/utils")
describe("skip util", function() {
    it ("can skip 3 elements", function() {
        let actual = [...skip([1,2,3,4,5],3)]
        expect(actual).toEqual([4,5])
    })
    it ("can skip entire sequence", function() {
        let actual = [...skip([1,2,3,4,5],8)]
        expect(actual).toEqual([])
    })
    it ("can skip nothing", function() {
        let actual = [...skip([1,2,3,4,5],0)]
        expect(actual).toEqual([1,2,3,4,5])
    })

})