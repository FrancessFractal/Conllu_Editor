
var Sentence = require("../scripts/Sentence.js").Sentence;
var Token = require("../scripts/Token.js").Token;
var MultiwordToken = require("../scripts/MultiwordToken.js").MultiwordToken;

chai = require("chai");
var assert = chai.assert;

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
                    test.before.forEach(function (obj, index) {
                        if(obj.hasOwnProperty('tokens')) {
                            sentence.tokens[index] = new MultiwordToken();
                            sentence.tokens[index].id = obj.id;
                            sentence.tokens[index].form = obj.form;
                        } else {
                            sentence.tokens[index] = new Token();
                            sentence.tokens[index].id = obj.id;
                            sentence.tokens[index].form = obj.form;
                        }
                    });
                    sentence.expand(test.token,test.index);
                });

                describe("tokens property after calling expand("+test.token+","+test.index+")", function () {


                    it("should be length "+test.after.length, function () {
                        assert.lengthOf(sentence.tokens,test.after);
                    });


                    test.after.forEach(function (gold,index) {
                        describe("Token in position "+index, function () {

                            it("should have form "+gold.form, function () {
                                assert.strictEqual(sentence.tokens[index].form,gold.form);
                            });

                            it("should be an instance of Token", function () {
                                assert.instanceOf(sentence.tokens[index],Token);
                            });

                            if(gold.hasOwnProperty('tokens')) {

                                it("should be an instance of MultiwordToken", function () {
                                    assert.instanceOf(sentence.tokens[index],MultiwordToken);
                                });

                                it("should have "+gold.tokens.length+" subtokens", function () {
                                    assert.lengthOf(sentence.tokens[index].tokens.length,gold.tokens.length);
                                });


                                for (var mindex in gold.tokens) {
                                    describe("Subtoken in position "+mindex, function () {
                                        it("should be an instance of Token", function () {
                                            assert.instanceOf(sentence.tokens[index].tokens[mindex],Token);
                                        });

                                        it("should have id "+gold.tokens[mindex].id, function () {
                                            assert.strictEqual(sentence.tokens[index].tokens[mindex].id,gold.tokens[mindex].id)
                                        });

                                        it("should have form "+gold.tokens[mindex].form, function () {
                                            assert.strictEqual(sentence.tokens[index].tokens[mindex].form,gold.tokens[mindex].form);
                                        });
                                    });
                                };

                            } else {
                                it("should not be an instance of MultiwordToken", function () {
                                    assert.notInstanceOf(sentence.tokens[index],MultiwordToken);
                                });

                                // We do not check the id of MultiwordTokens because it is a computed field,
                                // and this is just meant to test that all id and form values are set properly.
                                it("should have id "+gold.id, function () {
                                    assert.strictEqual(sentence.tokens[index].id,gold.id)
                                });
                            }
                        });
                    });
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
                    test.before.forEach(function (obj, index) {
                        if(obj.hasOwnProperty('tokens')) {
                            sentence.tokens[index] = new MultiwordToken();
                            sentence.tokens[index].id = obj.id;
                            sentence.tokens[index].form = obj.form;
                        } else {
                            sentence.tokens[index] = new Token();
                            sentence.tokens[index].id = obj.id;
                            sentence.tokens[index].form = obj.form;
                        }
                    });
                    sentence.collapse(test.token);
                });

                describe("tokens property after calling collapse("+test.token+")", function () {


                    it("should be length "+test.after.length, function () {
                        assert.lengthOf(sentence.tokens,test.after);
                    });


                    test.after.forEach(function (gold,index) {
                        describe("Token in position "+index, function () {

                            it("should have form "+gold.form, function () {
                                assert.strictEqual(sentence.tokens[index].form,gold.form);
                            });

                            it("should be an instance of Token", function () {
                                assert.instanceOf(sentence.tokens[index],Token);
                            });

                            if(gold.hasOwnProperty('tokens')) {

                                it("should be an instance of MultiwordToken", function () {
                                    assert.instanceOf(sentence.tokens[index],MultiwordToken);
                                });

                                it("should have "+gold.tokens.length+" subtokens", function () {
                                    assert.lengthOf(sentence.tokens[index].tokens.length,gold.tokens.length);
                                });


                                for (var mindex in gold.tokens) {
                                    describe("Subtoken in position "+mindex, function () {
                                        it("should be an instance of Token", function () {
                                            assert.instanceOf(sentence.tokens[index].tokens[mindex],Token);
                                        });

                                        it("should have id "+gold.tokens[mindex].id, function () {
                                            assert.strictEqual(sentence.tokens[index].tokens[mindex].id,gold.tokens[mindex].id)
                                        });

                                        it("should have form "+gold.tokens[mindex].form, function () {
                                            assert.strictEqual(sentence.tokens[index].tokens[mindex].form,gold.tokens[mindex].form);
                                        });
                                    });
                                };

                            } else {
                                it("should not be an instance of MultiwordToken", function () {
                                    assert.notInstanceOf(sentence.tokens[index],MultiwordToken);
                                });

                                // We do not check the id of MultiwordTokens because it is a computed field,
                                // and this is just meant to test that all id and form values are set properly.
                                it("should have id "+gold.id, function () {
                                    assert.strictEqual(sentence.tokens[index].id,gold.id)
                                });
                            }
                        });
                    });
                });
            });
        });
    });

});