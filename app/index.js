
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

var conllu_object = createConlluFromText("I haven't a clue. They buy and sell books.");

var multiwordtoken = Ractive.extend({
    template: '#multiwordtoken',
    isolated: true,
    oninit: function () {
        this.on('split', function (event, token) {

            // call split(token_id, index)
            console.log('split('+token+','+event.caretPosition+')');
            this.get('object').split(token, event.caretPosition);

            // refresh the model
            this.updateModel();

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
                this.updateModel();

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
                this.updateModel();

                // place the caret
                previousToken.childNodes[2].focus();
                previousToken.childNodes[2].setSelectionRange(previousForm.length,previousForm.length);
            }
        });

        this.on('collapse', function (event) {
            this.parent.get('object').collapse(this.get('object').id);
            this.parent.updateModel();
        });
    },
    data: function () {
        return {
            object: new Sentence()
        }
    },
    // Ractive's updateModel appears to have a bug in it. Until they fix it, we override their function with this
    updateModel: function() {
        this.set('object.id',this.get('object').id);
        for (var index in this.get('object').tokens) {
            this.set('object.tokens['+index+'].id',this.get('object').tokens[index].id);
            this.set('object.tokens['+index+'].form',this.get('object').tokens[index].form);
        }
    }

});
Ractive.components.multiwordtoken = multiwordtoken;

var sentence = Ractive.extend({
    template:'#sentence',
    isolated: true,
    oninit: function () {
        this.on('split', function (event, token) {

            // call split(token_id, index)
            console.log('split('+token+','+event.caretPosition+')');
            this.get('object').split(token, event.caretPosition);

            // refresh the model
            this.updateModel();

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
                this.updateModel();

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
                this.updateModel();

                // place the caret
                previousToken.childNodes[2].focus();
                previousToken.childNodes[2].setSelectionRange(previousForm.length,previousForm.length);
            }
        });

        this.on('expand', function (event, token) {
            console.log('expand('+token+','+event.caretPosition+')');
            this.get('object').expand(token,event.caretPosition);
            this.updateModel();
        });

        this.on('collapse', function (event, token) {
            console.log('collapse('+token+')');
            this.get('object').collapse(token);
            this.updateModel();
        });

        this.on('splitComment', function (event, index) {

            // call split(token_id, index)
            console.log('splitComment('+index+','+event.caretPosition+')');
            this.get('object').splitComment(index, event.caretPosition);

            // refresh the model
            this.updateModel();

            // place the caret
            var nextForm = event.node.parentNode.nextSibling.childNodes[1];
            nextForm.focus();
            nextForm.setSelectionRange(0,0);
        });

        this.on('mergeComment', function (event, index) {

            // call split(token_id, index)
            console.log('mergeComment('+index+')');
            this.get('object').mergeComment(index);

            // refresh the model
            this.updateModel();

            // place the caret
            event.node.setSelectionRange(event.caretPosition,event.caretPosition);

        });

        this.on('backmergeComment', function (event, index) {
            if(event.caretPosition===0) {
                var previousForm = event.node.parentNode.previousSibling.childNodes[1];
                var newCaretIndex = previousForm.value.length;

                // call merge(previous_token_id)
                console.log("mergeComment("+(index-1)+")");
                this.get('object').mergeComment(index-1);

                // refresh the model
                this.updateModel();

                // place the caret
                previousForm.focus();
                previousForm.setSelectionRange(newCaretIndex,newCaretIndex);
            }
        });
    },
    data: function () {
        return {
            object: new Sentence()
        }
    },
    components: {
        multiwordtoken: multiwordtoken
    },
    // Ractive's updateModel appears to have a bug in it. Until they fix it, we override their function with this
    updateModel: function() {
        for (var index in this.get('object').tokens) {
            this.set('object.tokens['+index+'].id',this.get('object').tokens[index].id);
            this.set('object.tokens['+index+'].form',this.get('object').tokens[index].form);
            if(this.get('object').tokens[index].hasOwnProperty('tokens')) {
                for (var index2 in this.get('object').tokens[index].tokens) {
                    this.set('object.tokens[' + index + '].tokens[' + index2 + '].id', this.get('object').tokens[index].tokens[index2].id);
                    this.set('object.tokens[' + index + '].tokens[' + index2 + '].form', this.get('object').tokens[index].tokens[index2].form);
                }
            }
        }

        for (var index in this.get('object').comments) {
            this.set('object.comments['+index+']',this.get('object').comments[index]);
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