let { unfold,take } = require("../../utils/utils")
describe("unfold util", function() {
    it ("can produce double", function() {
        let actual = [...take(unfold(1,x => x * 2),5)]
        expect(actual).toEqual([1,2,4,8,16])
    })

})