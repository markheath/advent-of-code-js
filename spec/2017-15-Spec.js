const { generator } = require("../2017/15/solve")
const { take } = require("../utils/utils")
const aFactor = 16807, bFactor = 48271

describe("2017 day 15", function() {
    it ("can produce generator A test output", function() {
        let actual = [...take(generator(65,aFactor),5)]
        expect(actual).toEqual([1092455,1181022009,245556042,1744312007,1352636452]);
    })

    it ("can produce generator A test output", function() {
        let actual = [...take(generator(8921,bFactor),5)]
        expect(actual).toEqual([430625591,1233683848,1431495498,137874439,285222916]);
    })
});