
// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    var Token = require("../scripts/Token.js").Token;
    var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;
}

/**
 * A MultiwordToken is any token which consists of subtokens
 * @constructor
 */
var MultiwordToken = function() {
    Token.call(this);
    this.tokens = [];
    TokenAggregate.call(this,'tokens');
};
MultiwordToken.prototype = new Token();

/**
 * The id in a MultiwordToken is based on the MultiwordToken's subtokens.
 * The id will be: smallestid-largestid
 * The id cannot be updated here.
 * @type {String}
 */
Object.defineProperty(MultiwordToken,'id',{
    get: function() {
        throw new Error("Not Implemented");
        // TODO: implement
    },
    set: function(value) {
        throw new Error("Not Implemented");
        // TODO: implement
    }
});

Object.defineProperty(MultiwordToken,'serial',{
    get: function() {
        throw new Error("Not Implemented");
        // TODO: implement
    },
    set: function() {
        throw new Error("Not Implemented");
        //TODO: implement
    }
});


// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.MultiwordToken = MultiwordToken;
}
