/**
 * A Sentence is a collection of comments, Tokens, and MultiwordTokens representing a sentence within a Conllu file.
 * For example, a Sentence may represent the following lines in a file:
 *
 * # sent_id 2
 * # ...
 * 1	I	I	PRON	PRP	Case=Nom|Number=Sing|Person=1	2	nsubj	_	_
 * 2-3	haven't	_	_	_	_	_	_	_	_
 * 2	have	have	VERB	VBP	Number=Sing|Person=1|Tense=Pres	0	root	_	_
 * 3	not	not	PART	RB	Negative=Neg	2	neg	_	_
 * 4	a	a	DET	DT	Definite=Ind|PronType=Art	4	det	_	_
 * 5	clue	clue	NOUN	NN	Number=Sing	2	dobj	_	SpaceAfter=No
 * 6	.	.	PUNCT	.	_	2	punct	_	_
 * 
 * @property comments {Array}
 * The comments property maintains an ordered list of all comments
 * 
 * @property tokens {Array}
 * The tokens property maintains an ordered list of all Tokens and Multiword tokens. 
 * In the example given above, a single MultiwordToken would be responsible for lines starting with ids 1-2, 2, and 3
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