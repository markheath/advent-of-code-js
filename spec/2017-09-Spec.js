const { parseInput } = require("../2017/09/solve")

const testScores = [ ['{}', 1 ],
    [ '{{{}}}', 6 ],
    [ '{{},{}}', 5 ],
    [ '{{{},{},{{}}}}', 16 ],
    [ '{<a>,<a>,<a>,<a>}', 1 ],
    [ '{{<ab>},{<ab>},{<ab>},{<ab>}}', 9 ],
    [ '{{<!!>},{<!!>},{<!!>},{<!!>}}', 9 ],
    [ '{{<a!>},{<a!>},{<a!>},{<ab>}}', 3 ] ]

const garbageCounts = [
    [ '<>', 0 ],
    [ '<random characters>', 17 ],
    [ '<<<<>', 3 ],
    [ '<{!>}>', 2 ],
    [ '<!!>', 0 ],
    [ '<!!!>>', 0 ],
    [ '<{o"i!a,<{i<a>', 10 ],
];

describe("2017 day 9", function() {
    it ("scores the tests correctly", function() {
        for (let [s,n] of testScores)
            expect(parseInput(s)[0]).toBe(n);
    })

    it ("counts garbage chars correctly", function() {
        for (let [s,n] of garbageCounts)
            expect(parseInput(s)[1]).toBe(n);
    })
});