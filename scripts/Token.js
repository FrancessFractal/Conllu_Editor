/**
 * A Token represents a single token represented in a Conllu file
 * For example, a Token may represent the following line:
 *
 * 1	I	I	PRON	PRP	Case=Nom|Number=Sing|Person=1	2	nsubj	_	_
 *
 * @constructor
 */
var Token = function() {};

Token.prototype = {
    // note: id is generally managed by Sentence
    id: undefined,
    form: '',
    lemma: undefined,
    upostag: undefined,
    xpostag: undefined,
    feats: undefined,
    head: undefined,
    deprel: undefined,
    deps: undefined,
    misc: undefined
};

Object.defineProperty(Token.prototype,'serial',
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
    exports.Token = Token;
}

