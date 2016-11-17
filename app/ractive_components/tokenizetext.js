var Ractive = require('ractive');
var Conllu = require('../../scripts/Conllu.js').Conllu;
var Sentence = require('../../scripts/Sentence.js').Sentence;
var Token = require('../../scripts/Token.js').Token;
var Tokenizer = require('sentence-tokenizer');

module.exports = Ractive.extend({
    template: require('./tokenizetext.html'),
    data: {
        conllu: undefined,
        text: ""
    },
    components: {
        conllu: require('./conllu.js'),
        fileopen: require('./fileopen.js')
    },
    oninit: function () {
        this.on('tokenize', function (event, text) {
            var tokenizer = new Tokenizer('');
            tokenizer.setEntry(text);
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

            this.parent.set('conllu',conllu);

        });
    }

});
