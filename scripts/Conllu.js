// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    var Sentence = require("../scripts/Sentence.js").Sentence;
}
/**
 * Conllu
 * A Conllu represents the contents of a Conllu file.
 * It is, in essence, a list of the sentences found in the file.
 * 
 * @constructor
 */
var Conllu = function() {
    this.sentences = [];
};

Conllu.prototype = {


    split : function (sentence_index, token_id) {

        for (var i = 0; i < this.sentences.length; i++) {

            if (i === sentence_index) {
                var newSentence = new Sentence;
                currentId = 0;
                newId = 1;
                removeIds = [];
                for (var j = token_id; j < this.sentences[i].tokens.length; j++) {
                    if (!(this.sentences[i].tokens[j] instanceof MultiwordToken)) {
                        newSentence.tokens.push(this.sentences[i].tokens[j]);
                        console.log(newSentence.tokens[currentId])
                        newSentence.tokens[currentId].id = newId;
                        newId = newId + 1;
                        currentId = currentId + 1;
                        removeIds.push(j)
                    } else {
                        newSentence.tokens.push(this.sentences[i].tokens[j]);
                        newSentence.tokens[currentId].tokens.forEach (function (child) {
                            child.id = newId;
                            newId = newId + 1;
                            removeIds.push(j);
                        });
                        currentId = currentId + 1
                    }
                }
                console.log(removeIds);
                for (var h = removeIds.length-1; h >= 0; h--) {
                    var id = removeIds[h];
                    this.sentences[i].tokens.splice(id,1);
                }
            }


        }
        this.sentences.splice(sentence_index+1, 0, newSentence);
    }
    //merge : function (sentence_index) {

    //}
},




/**
 * serial 
 * The serial property is the string representation of the file.
 * The contents of the Conllu object may be updated by modifying this string. However, for better
 * performance, it is recommended to modify the object itself.
 * @type {String}
 */

Object.defineProperty(Conllu.prototype,'serial',
    {
        get: function() {
            var serialArray = [];

            for (var i= 0; i < this.sentences.length; i++) {
                serialArray.push(this.sentences[i].serial);
            }

            return serialArray.join("\n");


        },
        set: function(arg) {
            var lines = arg.split("\n");
            var sent = [];

            for (var i = 0; i < lines.length; i ++){
                if (lines[i] === ""){
                    sent.push(lines[i]);
                    var sentCat = sent.join("\n");
                    setSentence = new Sentence();
                    setSentence.serial = sentCat;
                    this.sentences.push(setSentence);
                    sent = []
                } else {
                    sent.push(lines[i]);
                }
            }
            return sent
        }

    }
);

// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.Conllu = Conllu;
}
