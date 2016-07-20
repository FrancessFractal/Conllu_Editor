/**
 * 
 * @constructor
 */
var Sentence = function() {
    /**
     * comments should be an ordered list of strings representing the comments of this sentence.
     * The strings should not include the initial '#' character - only the content of the comment.
     * @type {Array}
     */
    this.comments = [];
    
    /**
     * tokens should be an ordered list of tokens and multiword tokens.
     * We will rely on the ordering of this list to display the tokens in the correct order - not the ids
     * of the tokens. Note, however, that the ids of the tokens/multiwordtokens and subtokens should be
     * maintained by the sentence.
     * @type {Array}
     */
    this.tokens = [];
};

Sentence.prototype = {
    expand: function (token_id, index) {
        throw new Error("Not Implemented");
        // TODO: implement
    },
    collapse: function(token_id) {
        throw new Error("Not Implemented");
        // TODO: implement
    }
};

Object.defineProperty(Sentence.prototype,'serial',
    {
        get: function() {
            throw new Error("Not Implemented");
            // TODO: implement
        },
        set: function() {
            throw new Error("Not Implemented");
            //TODO: implement
        }
    }
);

// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.Sentence = Sentence;
}