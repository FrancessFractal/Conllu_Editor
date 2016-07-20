
var checkTokens =  function (aggregate, compare) {
    it("should be length "+compare.length, function () {
        assert.lengthOf(aggregate.tokens,compare);
    });

    for (var index in compare) {
        describe("Token in position "+index, function () {
            it("should have id "+compare[index].id, function () {
                assert.strictEqual(aggregate.tokens[index].id,compare[index].id)
            });

            it("should have form "+compare[index].form, function () {
                assert.strictEqual(aggregate.tokens[index].form,compare[index].form);
            });

            it("should be an instance of Token", function () {
                assert.instanceOf(aggregate.tokens[index],'Token');
            });

            if(compare[index].hasOwnProperty('tokens')) {

                it("should be an instance of MultiwordToken", function () {
                    assert.instanceOf(aggregate.tokens[index],'MultiwordToken');
                });

                it("should have "+compare[index].tokens.length+" subtokens", function () {
                    assert.lengthOf(aggregate.tokens[index].tokens.length,compare[index].tokens.length);
                });


                for (var mindex in compare[index].tokens) {
                    describe("Subtoken in position "+mindex, function () {
                        it("should be an instance of Token", function () {
                            assert.instanceOf(aggregate.tokens[index].tokens[mindex],'Token');
                        });

                        it("should have id "+compare[index].tokens[mindex].id, function () {
                            assert.strictEqual(aggregate.tokens[index].tokens[mindex].id,compare[index].tokens[mindex].id)
                        });

                        it("should have form "+compare[index].tokens[mindex].form, function () {
                            assert.strictEqual(aggregate.tokens[index].tokens[mindex].form,compare[index].tokens[mindex].form);
                        });
                    });
                };

            } else {
                it("should not be an instance of MultiwordToken", function () {
                    assert.notInstanceOf(aggregate.tokens[index],'MultiwordToken');
                });
            }
        });
    };
};


// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.checkTokens = checkTokens;
}