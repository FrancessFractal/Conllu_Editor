
var Conllu = require('../scripts/Conllu.js').Conllu;
var MultiwordToken = require('../scripts/MultiwordToken.js').MultiwordToken;
var Sentence = require('../scripts/Sentence.js').Sentence;
var Token = require('../scripts/Token.js').Token;
var TokenAggregate = require('../scripts/TokenAggregate.js').TokenAggregate;
var events = require('../app/events.js');
Ractive.events.enter = events.enter;
Ractive.events.shiftenter = events.shiftenter;
Ractive.events.del = events.del;
Ractive.events.shiftdel = events.shiftdel;
Ractive.events.backspace = events.backspace;
Ractive.events.shiftbackspace = events.shiftbackspace;

var Tokenizer = require('sentence-tokenizer');


// there seems to be a bug in Ractive's this.updateModel, so when updating token ids, run this instead
var updateTokens = function() {
    for (var index in this.get('object').tokens) {
        this.set('object.tokens['+index+'].id',this.get('object').tokens[index].id);
        this.set('object.tokens['+index+'].form',this.get('object').tokens[index].form);
        if(this.get('object').tokens.hasOwnProperty('tokens')) {
            for (var index2 in this.get('object').tokens[index].tokens) {
                this.set('object.tokens[' + index + '].tokens[' + index2 + '].id', this.get('object').tokens[index].tokens[index2].id);
                this.set('object.tokens[' + index + '].tokens[' + index2 + '].form', this.get('object').tokens[index].tokens[index2].form);
            }
        }

    }
};

var tokenizer = new Tokenizer('text');

var createConlluFromText = function (text) {
    tokenizer.setEntry(text)
    textSentences = tokenizer.getSentences();
    var conllu = new Conllu();

    for (i = 0; i < textSentences.length; i++){
        conllu.sentences[i] = new Sentence();
        conllu.sentences[i].comments[0] = "sent_id " + Number(i+1);
        var sentenceText = tokenizer.getTokens(i);
        var sentenceTokens = []
        for (j = 0; j < sentenceText.length; j++){
            var addToken = new Token()
            addToken.form = sentenceText[j];
            addToken.id = j+1
            sentenceTokens.push(addToken)
        }
        conllu.sentences[i].tokens = sentenceTokens
    }


    return conllu;
};


var conllu_object = createConlluFromText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

var sentence = Ractive.extend({
    template:'#sentence',
    isolated: true,
    oninit: function () {
        this.on('split', function (event, token) {

            // call split(token_id, index)
            console.log('split('+token+','+event.caretPosition+')');
            this.get('object').split(token, event.caretPosition);

            // refresh the model
            updateTokens.call(this);

            // place the caret
            var nextForm = event.node.parentNode.nextSibling.childNodes[2];
            nextForm.focus();
            nextForm.setSelectionRange(0,0);

        });


        this.on('merge', function (event, token) {
            if(event.caretPosition===event.textLength) {

                // call merge(token_id)
                console.log("merge("+token+")");
                this.get('object').merge(token);

                // refresh the model
                updateTokens.call(this);

                //place the caret
                event.node.setSelectionRange(event.caretPosition,event.caretPosition);
            }
        });

        this.on('backmerge', function (event, token) {
            if(event.caretPosition===0) {
                // find the token before the current token
                var previousToken = event.node.parentNode.previousSibling;
                var previousForm = previousToken.childNodes[2].value;
                var previousId = previousToken.childNodes[0].textContent;

                // if the id is a number, convert it to a number
                if( !isNaN(+previousId )) {
                    previousId = +previousId;
                }

                // call merge(previous_token_id)
                console.log("merge("+previousId+")");
                this.get('object').merge(previousId);

                // refresh the model
                updateTokens.call(this);

                // place the caret
                previousToken.childNodes[2].focus();
                previousToken.childNodes[2].setSelectionRange(previousForm.length,previousForm.length);
            }
        });

        this.on('expand', function (event, token) {
            console.log('expand('+token+','+event.caretPosition+')');
            this.get('object').expand(token,event.caretPosition);
            updateTokens.call(this);
        });

        this.on('collapse', function (event, token) {
            console.log('collapse('+token+')');
            this.get('object').collapse(token);
            updateTokens.call(this);
        });

        this.on('splitComment', function (event, index) {

            // call split(token_id, index)
            console.log('splitComment('+index+')');
//                this.get('object').splitComment(token, event.caretPosition);

            // refresh the model
//                updateTokens.call(this);
            console.log(this.get('object'));

            // place the caret
//                var nextForm = event.node.parentNode.nextSibling.childNodes[2];
//                nextForm.focus();
//                nextForm.setSelectionRange(0,0);
        });

        this.on('mergeComment', function (event, index) {

        });

        this.on('backmergeComment', function (event, index) {

        });
    },
    data: function () {
        return {
            object: new Sentence()
        }
    }
});

Ractive.components.sentence = sentence;

var conllu = new Ractive({
    el: 'conllu_editor',
    template: '#conllu',
    data: {
        object: conllu_object
    },
    components: {
        sentence: sentence
    },
    download: function () {
        var blob = new Blob([this.get('object').serial],{type: 'text/plain'});
        var path = window.URL.createObjectURL(blob);
        var link = document.createElement('A');
        link.setAttribute('href',path);
        link.setAttribute('download','file.conllu');
        link.click();
        link.remove();
    }
});