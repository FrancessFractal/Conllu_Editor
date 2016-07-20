
var MultiwordToken = require("../scripts/MultiwordToken.js").MultiwordToken;
var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;
var Token = require("../scripts/Token.js").Token;

chai = require("chai");
var assert = chai.assert;

describe("A multiword token created by an empty construcor", function() {
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

});

