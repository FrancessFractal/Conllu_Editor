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
            }

        }
);

// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.Conllu = Conllu;
}
