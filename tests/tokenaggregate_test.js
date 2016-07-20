
var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;

chai = require("chai");
var assert = chai.assert;
var checkTokens = require('../tests/helper_functions').checkTokens;

describe("A TokenAggregate object", function() {
    var tokens;
    var ta;
    beforeEach(function () {
        tokens = 'tokens';
        var A = function() {
            this[tokens] = [];
            TokenAggregate.call(this,tokens);
        };
        ta = new A();
    });

    describe("method 'split'", function () {
        it("should be a property", function () {
            assert.property(ta, 'split');
        });

        it("should be a function", function () {
            assert.typeOf(ta.split, 'function');
        });

        var tests = [
            {
                sentence: "I haven't a clue.",
                token: 4,
                index: 4,
                before: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue.'}],
                after: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue'},{id:5, form: '.'}]
            },
            {
                sentence: "This is asentence.",
                token: 3,
                index: 1,
                before: [{id: 1, form: 'This'}, {id: 2, form: 'is'}, {id: 3, form: 'asentence'}, {id: 4, form: '.'}],
                after: [{id: 1, form: 'This'}, {id: 2, form: 'is'}, {id: 3, form: 'a'},{id: 4, form: 'sentence'}, {id: 5, form: '.'}]
            },
            {
                sentence: "Example with unusual token ids",
                token: 8,
                index: 2,
                before: [{id: 6, form: 'Example'}, {id:7, form:'with'}, {id:8, form:'unusual'}, {id:9, form:'token'},{id:10, form:'ids'}],
                after: [{id: 6, form: 'Example'}, {id:7, form:'with'}, {id:8, form:'un'}, {id:9, form:'usual'}, {id:10, form:'token'},{id:11, form:'ids'}]
            }
        ];

        tests.forEach(function (test) {
            context("Sentence: "+test.sentence, function () {
                beforeEach(function () {
                    ta[tokens] = test.before;
                    ta.split(test.token, test.index);
                });

                describe("tokens property after calling split("+test.token+","+test.index+")", function () {
                    checkTokens(ta,test.after);
                });
            });
        });
    });

    describe("method 'merge'", function () {
        it("should be a property", function () {
            assert.property(ta, 'merge');
        });

        it("should be a function", function () {
            assert.typeOf(ta.merge, 'function');
        });

        tests = [
            {
                sentence: "I haven't a clue.",
                token: 4,
                before: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue'},{id:5, form: '.'}],
                after: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue.'}]
            },
            {
                sentence: "This is a sentence.",
                token: 3,
                index: 1,
                before: [{id: 1, form: 'This'}, {id: 2, form: 'is'}, {id: 3, form: 'a'},{id: 4, form: 'sentence'}, {id: 5, form: '.'}],
                after: [{id: 1, form: 'This'}, {id: 2, form: 'is'}, {id: 3, form: 'asentence'}, {id: 4, form: '.'}]
            },
            {
                sentence: "Example with unusual token ids",
                token: 8,
                index: 2,
                before: [{id: 6, form: 'Example'}, {id:7, form:'with'}, {id:8, form:'un'}, {id:9, form:'usual'}, {id:10, form:'token'},{id:11, form:'ids'}],
                after: [{id: 6, form: 'Example'}, {id:7, form:'with'}, {id:8, form:'unusual'}, {id:9, form:'token'},{id:10, form:'ids'}]
            }
        ];

        tests.forEach(function (test) {
            context("Sentence: "+test.sentence, function () {
                beforeEach(function () {
                    ta[tokens] = test.before;
                    ta.merge(test.token);
                });

                describe("tokens property after calling merge("+test.token+")", function () {
                    checkTokens(ta,test.after);
                });
            });
        });
    });

});



