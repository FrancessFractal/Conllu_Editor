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

            var serial = serialArray.join("\n");
            console.log(serial)
            return serial

        },
        set: function() {
            throw new Error("Not Implemented");
            // TODO: implement
        }
    }
);

// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.Conllu = Conllu;
}
