
var Conllu = require("../scripts/Conllu.js").Conllu;

chai = require("chai");
var assert = chai.assert;

describe("A Conllu object created with an empty constructor", function () {
    var conllu;
    beforeEach(function () {
        conllu = new Conllu();
    });

    describe("object inheritance", function () {
        it("should be an instance of Conllu", function () {
            assert.instanceOf(conllu, Conllu);
        });
    });

    describe("property 'sentences'", function () {
        it("should be a property", function () {
            assert.property(conllu, 'sentences');
        });

        // The sentences should not be shared with other instances of Conllu
        it("should be a direct property", function () {
            assert(conllu.hasOwnProperty('sentences'));
        });

        it("should be an array", function () {
            assert.typeOf(conllu.sentences, 'array');
        });

        it("should be empty", function () {
            assert.lengthOf(conllu.sentences, 0);
        });
    });

});