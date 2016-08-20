
var Conllu = require('../scripts/Conllu.js').Conllu;
var MultiwordToken = require('../scripts/MultiwordToken.js').MultiwordToken;
var Sentence = require('../scripts/Sentence.js').Sentence;
var Token = require('../scripts/Token.js').Token;
var TokenAggregate = require('../scripts/TokenAggregate.js').TokenAggregate;
var events = require('../app/events.js');
var Ractive = require('ractive');

Ractive.events.enter = events.enter;
Ractive.events.shiftenter = events.shiftenter;
Ractive.events.del = events.del;
Ractive.events.shiftdel = events.shiftdel;
Ractive.events.backspace = events.backspace;
Ractive.events.shiftbackspace = events.shiftbackspace;
Ractive.events.downarrow = events.downarrow;
Ractive.events.leftarrow = events.leftarrow;
Ractive.events.rightarrow = events.rightarrow;
Ractive.events.uparrow = events.uparrow;


var Tokenizer = require('sentence-tokenizer');



var tokenizer = new Tokenizer('text');

var createConlluFromText = function (text) {
    tokenizer.setEntry(text);
    var textSentences = tokenizer.getSentences();
    var conllu = new Conllu();

    for (var i = 0; i < textSentences.length; i++){
        conllu.sentences[i] = new Sentence();
        conllu.sentences[i].comments[0] = " sent_id " + Number(i+1);
        var sentenceText = tokenizer.getTokens(i);
        var sentenceTokens = [];
        for (var j = 0; j < sentenceText.length; j++){
            var addToken = new Token();
            addToken.form = sentenceText[j];
            addToken.id = j+1;
            sentenceTokens.push(addToken);
        }
        conllu.sentences[i].tokens = sentenceTokens;
    }


    return conllu;
};


var conllu_object = createConlluFromText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

// var conllu_object = createConlluFromText("I haven't a clue. They buy and sell books.");

// var conllu = require('./ractive_components/conllu.js').conllu;

var app = new Ractive({
    el: '#conllu_editor',
    template: '<conllu object="{{this.conllu}}"/>',
    data: {
        conllu: new Conllu()
    },
    components: {
        conllu: require('./ractive_components/conllu.js')
    }
});
app.set('conllu',conllu_object);