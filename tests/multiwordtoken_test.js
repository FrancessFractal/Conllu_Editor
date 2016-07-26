
var MultiwordToken = require("../scripts/MultiwordToken.js").MultiwordToken;
var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;
var Token = require("../scripts/Token.js").Token;

chai = require("chai");
var assert = chai.assert;
var conllu_gold = require("../tests/example1/conllu_obj.js").conllu;

describe("A MultiwordToken created by an empty construcor", function() {
    var mwt;
    beforeEach(function () {
        mwt = new MultiwordToken();
    });

    describe("object inheritance", function () {
        it("should be an instance of MultiwordToken", function () {
            assert.instanceOf(mwt, MultiwordToken);
        });

        it("should be an instance of Token", function () {
            assert.instanceOf(mwt, Token);
        });
    });

    describe("property 'id'", function () {
        it("should be a property", function () {
            assert.property(mwt, 'id');
        });
        
        var tests = [
            {
                text: '1, 2, 3',
                tokens: [{id: 1}, {id: 2}, {id: 3}],
                id: '1-3'
            },
            {
                text: '3, 4',
                tokens: [{id: 3}, {id: 4}],
                id: '3-4'
            }
        ];

        describe("should be based on its subtokens", function () {
            tests.forEach(function (test) {
                beforeEach(function () {
                    mwt.tokens = tests.tokens;
                });

                context("with subtokens "+test.text, function () {
                    it("should have id '"+test.id+"'", function () {
                        assert.strictEqual(mwt.id,test.id);
                    })
                })
            })
        });        
    });

    describe("property 'serial'", function () {
        it("should be a property", function () {
            assert.property(mwt, 'serial');
        });

        describe("get", function () {
            conllu_gold.sentences.forEach(function (sent_gold) {
                sent_gold.tokens.forEach(function (mwt_gold) {
                    if(mwt_gold.hasOwnProperty('tokens')) {
                        beforeEach(function () {
                            mwt_gold.tokens.forEach(function (token_gold) {
                                var token = new Token();
                                token.id = token_gold.id;
                                token.form = token_gold.form;
                                token.lemma = token_gold.lemma;
                                token.upostag = token_gold.upostag;
                                token.xpostag = token_gold.xpostag;
                                token.feats = token_gold.feats;
                                token.head = token_gold.head;
                                token.deprel = token_gold.deprel;
                                token.deps = token_gold.deps;
                                token.misc = token_gold.misc;
                                mwt.tokens.push(token);
                            });
                        });

                        it("Token " + mwt_gold.form, function () {
                            assert.strictEqual(mwt.serial, mwt_gold.serial);
                        });
                    }
                });
            });
        });
    });

});

