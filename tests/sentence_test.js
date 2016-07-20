
var Sentence = require("../scripts/Sentence.js").Sentence;

chai = require("chai");
var assert = chai.assert;
var checkTokens = require("../tests/helper_functions.js").checkTokens;

describe("A Sentence object created by an empty construcor", function() {
    var sentence;
    beforeEach(function() {
        sentence = new Sentence();
    });

    describe("property 'comments'", function () {
        it("should be a property", function () {
            assert.property(sentence, 'comments');
        });

        it("should be a direct property", function () {
            assert(sentence.hasOwnProperty('comments'));
        });

        it("should be an array", function () {
            assert.typeOf(sentence.comments, 'array');
        });

        it("should be empty", function () {
            assert.lengthOf(sentence.comments, 0);
        });
    });

    describe("property 'tokens'", function () {
        it("should be a property", function () {
            assert.property(sentence, 'tokens');
        });

        it("should be a direct property", function () {
            assert(sentence.hasOwnProperty('tokens'));
        });

        it("should be an array", function () {
            assert.typeOf(sentence.tokens, 'array');
        });

        it("should be empty", function () {
            assert.lengthOf(sentence.tokens, 0);
        });
    });

    describe("method 'expand'", function () {
        it("should be a property", function () {
            assert.property(sentence, 'expand');
        });

        it("should be a function", function () {
            assert.typeOf(sentence.expand, 'function');
        });

        var tests = [
            {
                sentence: "I haven't a clue.",
                token: 2,
                index: 4,
                before: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue'},{id:5, form: '.'}],
                after: [{id: 1, form: 'I'},
                    {
                        id: '2-3',
                        form: 'haven\'t',
                        tokens: [{id: 2, form: 'have'}, {id: 3, form: 'n\'t'}]
                    }, {id: 4, form: 'a'}, {id: 5, form: 'clue'},{id:6, form: '.'}]
            }
        ];

        tests.forEach(function(test) {
            context("Sentence: "+test.sentence, function () {
                beforeEach(function () {
                    sentence.tokens = test.before;
                    sentence.expand(test.token,test.index);
                });

                describe("tokens property after calling expand("+test.token+","+test.index+")", function () {
                    checkTokens(sentence,test.after);
                });
            });
        });
    });

    describe("method 'collapse'", function () {
        it("should be a property", function () {
            assert.property(sentence, 'collapse');
        });

        it("should be a function", function () {
            assert.typeOf(sentence.collapse, 'function');
        });


        var tests = [
            {
                sentence: "I haven't a clue.",
                token: 2,
                before: [{id: 1, form: 'I'},
                    {
                        id: '2-3',
                        form: 'haven\'t',
                        tokens: [{id: 2, form: 'have'}, {id: 3, form: 'n\'t'}]
                    }, {id: 4, form: 'a'}, {id: 5, form: 'clue'},{id:6, form: '.'}],
                after: [{id: 1, form: 'I'}, {id: 2, form: 'haven\'t'}, {id: 3, form: 'a'}, {id: 4, form: 'clue'},{id:5, form: '.'}]
            }
        ];

        tests.forEach(function(test) {
            context("Sentence: "+test.sentence, function () {
                beforeEach(function () {
                    sentence.tokens = test.before;
                    sentence.collapse(test.token);
                });

                describe("tokens property after calling collapse("+test.token+")", function () {
                    checkTokens(sentence,test.after);
                });
            });
        });
    });

});