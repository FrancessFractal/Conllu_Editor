var Ractive = require('ractive');
var Conllu = require('conllu').Conllu;
var Sentence = require('conllu').Sentence;
var Token = require('conllu').Token;
var Tokenizer = require('sentence-tokenizer');

module.exports = Ractive.extend({
    template: require('./uploadtext.html'),
    data: {
        conllu: undefined
    },
    oninit: function () {
        this.on('open', function (event) {
            var component = this;
            var reader = new FileReader ();
            reader.onload = function(e) {
                var conllu_editor = component.parent;

                var tokenizer = new Tokenizer('');
                tokenizer.setEntry(reader.result);
                var textSentences = tokenizer.getSentences();
                var conllu = new Conllu();

                for (var i = 0; i < textSentences.length; i++) {
                    conllu.sentences[i] = new Sentence();
                    conllu.sentences[i].comments[0] = " sent_id " + Number(i + 1);
                    var sentenceText = tokenizer.getTokens(i);
                    var sentenceTokens = [];
                    for (var j = 0; j < sentenceText.length; j++) {
                        var addToken = new Token();
                        addToken.form = sentenceText[j];
                        addToken.id = j + 1;
                        sentenceTokens.push(addToken);
                    }
                    conllu.sentences[i].tokens = sentenceTokens;
                }

                conllu_editor.set('conllu',conllu);
            };
            reader.readAsText (event.node.previousElementSibling.files[0]);

        });
    }
});
