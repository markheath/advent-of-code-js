let { firstRepeatedValue,firstRepeatedElement } = require("../../utils/utils")
describe("firstRepeatedValue util", function() {
    it ("finds an immediate repeat", function() {
        let actual = firstRepeatedValue([1,1,1,1], 3)
        expect(actual).toEqual(1)
    })
    it ("finds a repeat", function() {
        let actual = firstRepeatedValue([2,3,4,1,1,1,2,4], 3)
        expect(actual).toEqual(1)
    })
    it ("finds a repeat at the end", function() {
        let actual = firstRepeatedValue([2,3,4,2,4,1,1,1], 3)
        expect(actual).toEqual(1)
    })
    it ("resumes after partial repeat", function() {
        let actual = firstRepeatedValue([2,3,4,1,1,2,4,5,1,1,1], 3)
        expect(actual).toEqual(1)
    })
    it ("can find with selector", function() {
        let actual = firstRepeatedValue(["bear","apple","pear","dog","cat","ant","tiger"], 3, s => s.length)
        expect(actual).toEqual(3)
    })
    it ("can find element with selector", function() {
        let actual = firstRepeatedElement(["bear","apple","pear","dog","cat","ant","tiger"], 3, s => s.length)
        expect(actual).toEqual("dog")
    })
})