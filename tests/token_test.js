
var Token = require("../scripts/Token.js").Token;

chai = require("chai");
var assert = chai.assert;

describe("A Token object created by an empty constructor", function () {
    var token;
    beforeEach(function () {
        token = new Token();
    });

    it("should be an instance of Token", function () {
        assert.instanceOf(token, Token);
    });

    it("should have ID field undefined", function() {
        assert.property(token,'id', "The Token does not have a property called 'id'.");
        assert.isUndefined(token.id, "The 'id' property is not undefined.");
    });

    it("should have FORM property be an empty string", function() {
        assert.property(token, 'form', "The Token does not have a property called 'form'");
        assert.isString(token.form,"The 'form' property is not a string");
        assert.strictEqual(token.form,'',"The 'form' property is not empty");
    });
    
    it("should have LEMMA property undefined", function() {
        assert.property(token,'lemma', "The Token does not have a property called 'lemma'.");
        assert.isUndefined(token.lemma, "The 'lemma' property is not undefined.");
    });

    it("should have UPOSTAG property undefined", function() {
        assert.property(token,'upostag', "The Token does not have a property called 'upostag'.");
        assert.isUndefined(token.upostag, "The 'upostag' property is not undefined.");
    });

    it("should have XPOSTAG property undefined", function() {
        assert.property(token,'xpostag', "The Token does not have a property called 'xpostag'.");
        assert.isUndefined(token.xpostag, "The 'xpostag' property is not undefined.");
    });

    it("should have FEATS property undefined", function() {
        assert.property(token,'feats', "The Token does not have a property called 'feats'.");
        assert.isUndefined(token.feats, "The 'feats' property is not undefined.");
    });

    it("should have HEAD property undefined", function() {
        assert.property(token,'head', "The Token does not have a property called 'head'.");
        assert.isUndefined(token.head, "The 'head' property is not undefined.");
    });

    it("should have DEPREL property undefined", function() {
        assert.property(token,'deprel', "The Token does not have a property called 'deprel'.");
        assert.isUndefined(token.deprel, "The 'deprel' property is not undefined.");
    });

    it("should have DEPS property undefined", function() {
        assert.property(token,'deps', "The Token does not have a property called 'deps'.");
        assert.isUndefined(token.deps, "The 'deps' property is not undefined.");
    });

    it("should have MISC property undefined", function() {
        assert.property(token,'misc', "The Token does not have a property called 'misc'.");
        assert.isUndefined(token.misc, "The 'misc' property is not undefined.");
    });

});


