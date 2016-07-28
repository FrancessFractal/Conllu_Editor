
// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    var Token = require("../scripts/Token.js").Token;
    var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;
}

/**
 * A MultiwordToken is any token which consists of subtokens
 * For example, a MultiwordToken may represent the following lines in a Conllu file:
 *
 * 2-3  haven't ...
 * 2    have    ...
 * 3    n't     ...
 *
 * @property tokens {Array}
 * The tokens property is the list of subtokens this MultiwordToken is responsible for.
 *
 * @extends Token
 * @inherits TokenAggregate
 *
 * @constructor
 */
var MultiwordToken = function() { //constructor for Multiword Tokens
    Token.call(this); // gives the MWT all the properties created in the Token constructor (note: not token prototype)
    this.tokens = []; // creates the array that contains the children of the MWT
    TokenAggregate.call(this,'tokens'); //gives the MWT all the properties created in the TA constructor
};
MultiwordToken.prototype = new Token(); // gives new instance of MWT the properties of a new instance of Token
//note: still working this out.

/**
 * The id in a MultiwordToken is based on the MultiwordToken's subtokens.
 * The id will be: smallestid-largestid
 * The id cannot be updated here.
 * @type {String}
 */
Object.defineProperty(MultiwordToken.prototype,'id',{ //to prototype or not to prototype...
    get: function() {
        if (this.tokens.length < 1){
            return "?-?"; // if the multi-word token doesn't have any children (tokens length is 0), alert. Do not allow to save.
        }
        var first = this.tokens[0];
        var last = this.tokens[this.tokens.length-1];
        id = first.id + "-" + last.id; // assign mwt id to be "smallestID-largestID"
        return String(id); //return in string version
    },

    set: function(value) {
        throw new Error("Ignoring attempt to set multiword token id to " + value);
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
