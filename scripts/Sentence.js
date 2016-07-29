// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    var Token = require("../scripts/Token.js").Token;
    var MultiwordToken = require("../scripts/MultiwordToken.js").MultiwordToken;
    var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;

}
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

    TokenAggregate.call(this,'tokens');
};

Sentence.prototype = {

    expand : function (token_id, index) {
        var found = false;
        for (var i=0; i < this.tokens.length; i++) {
            if (found === true) {

                if (!(this.tokens[i] instanceof MultiwordToken)) {
                    this.tokens[i].id++; //increases id's by 1 after expansion
                    //console.log(this.tokens[i]);
                }
                else {

                    this.tokens[i].tokens.forEach(function (child) {
                        child.id++; //updates the id's of the children in every multi-word token.
                        //the parent in a multi-word token updates automatically based on the children.
                    });
                }
            }
            else if (this.tokens[i].id === token_id && !(this.tokens[i] instanceof MultiwordToken)) {
                var initial = new Token(); //variable to store first half of expanded token
                var second = new Token(); //variable to store second half of expanded token
                var expandToken = new MultiwordToken(); //create new instance of mwt for expanded token//

                expandToken.form = this.tokens[i].form; // only duplicate form; id depends on id's of sub-tokens; other properties should be undefined
                initial.form = this.tokens[i].form.slice(0, index);
                initial.id = this.tokens[i].id; //update id of first sub-token
                second.form = this.tokens[i].form.slice(index);
                second.id = Number(this.tokens[i].id) + 1; //update id of second sub-token
                expandToken.tokens.push(initial);
                expandToken.tokens.push(second);
                this.tokens.splice((i), 1, expandToken);// inserts new word at the correct index in the array, removes original token
                //note: all information stored in initial token is lost. To be confirmed.
                found = true;
                //console.log(this.tokens[1]);
            }

        }
    },

    collapse: function(token_id) {

        var found = false;
        for (var i=0; i < this.tokens.length; i++) {

            if (found === true) {
                if (!(this.tokens[i] instanceof MultiwordToken)) {
                    this.tokens[i].id = Number(this.tokens[i].id - mwt_length-1); //updates the id's of every token after collapse
                    //note: also valid if mwt has more than 2 sub-tokens
                }
                else {
                    this.tokens[i].tokens.forEach(function (child) {
                        child.id = Number(child.id - mwt_length-1);//updates the id's of the children in every multi-word token.
                        //the parent in a multi-word token updates automatically based on the children.
                    });
                }
            }
            else if (this.tokens[i].id === token_id) { // note: must be a string, since the id of a mwt is a string
                if (this.tokens[i] instanceof MultiwordToken) { //collapse only applies to mwt
                    var mwt_length = this.tokens[i].tokens.length;// find the length of the mwt sub-tokens array, for updating other values
                    var collapsed = new Token(); // note: is not a mwt
                    //collapsed.id = Number(this.tokens[i].id.slice(0,1)); // wouldn't work for mwt token 34-35, for example.
                    collapsed.id = Number(this.tokens[i].tokens[0].id);// token "collapsed" can be assigned an id: takes the id of the first child of the mwt
                    collapsed.form = this.tokens[i].form;
                    this.tokens.splice((i), 1, collapsed);
                    found = true;
                }
                //if this.tokens[i] isn't an instance of a MultiwordToken, do nothing.
            }
        }
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