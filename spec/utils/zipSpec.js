let { zip,range } = require("../../utils/utils")
describe("zip util", function() {
    it ("can zip sequences of equal length", function() {
        let actual = [...zip(range(4,5),range(10,5))]
        expect(actual).toEqual([[4,10],[5,11],[6,12],[7,13],[8,14]])
    })
    it ("can zip sequences first is longer", function() {
        let actual = [...zip(range(4,8),range(10,5))]
        expect(actual).toEqual([[4,10],[5,11],[6,12],[7,13],[8,14]])
    })
    it ("can zip sequences second is longer", function() {
        let actual = [...zip(range(4,5),range(10,8))]
        expect(actual).toEqual([[4,10],[5,11],[6,12],[7,13],[8,14]])
    })

})