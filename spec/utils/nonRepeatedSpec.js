let { nonRepeated } = require("../../utils/utils")
describe("nonRepeated util", function() {
    it ("filters a single repeat", function() {
        let actual = [...nonRepeated([1,1,2,3])]
        expect(actual).toEqual([2,3])
    })
    it ("filters a double repeat", function() {
        let actual = [...nonRepeated([1,1,2,3,1])]
        expect(actual).toEqual([2,3])
    })
    it ("supports selector", function() {
        let actual = [...nonRepeated(["cat","dog","horse","cow","bear"], s => s.length)]
        expect(actual).toEqual(["horse","bear"])
    })
})