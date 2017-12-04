let { isValid1,isValid2 } = require("../2017/04/solve")

describe("2017 day 4", function() {
    it ("aa bb cc dd ee is valid part 1 passphrase", function() {
        const valid = isValid1("aa bb cc dd ee");
        expect(valid).toBe(true);
    })

    it ("aa bb cc dd aa is invalid part 1 passphrase", function() {
        const valid = isValid1("aa bb cc dd aa");
        expect(valid).toBe(false);
    })

    it ("aa bb cc dd aaa is valid part 1 passphrase", function() {
        const valid = isValid1("aa bb cc dd aaa");
        expect(valid).toBe(true);
    });

    it ("abcde fghij is valid part 2 passphrase", function() {
        const valid = isValid2("abcde fghij");
        expect(valid).toBe(true);
    });

    it ("abcde xyz ecdab is invalid part 2 passphrase", function() {
        const valid = isValid2("abcde xyz ecdab");
        expect(valid).toBe(false);
    });

    it ("a ab abc abd abf abj is valid part 2 passphrase", function() {
        const valid = isValid2("a ab abc abd abf abj");
        expect(valid).toBe(true);
    });

    it ("iiii oiii ooii oooi oooo is valid part 2 passphrase", function() {
        const valid = isValid2("iiii oiii ooii oooi oooo");
        expect(valid).toBe(true);
    });

    it ("oiii ioii iioi iiio is invalid part 2 passphrase", function() {
        const valid = isValid2("oiii ioii iioi iiio");
        expect(valid).toBe(false);
    });

});