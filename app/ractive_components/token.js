var Ractive = require('ractive');
var Token = require('conllu').Token;
var MultiwordToken = require('conllu').MultiwordToken;

module.exports = Ractive.extend({
    template: require('./token.html'),
    isolated: true,
    onconstruct: function () {

        /**
         * nextLine is the div containing the next token line in the sentence.
         */
        Object.defineProperty(this, 'nextLine', {
            get: function () {
                return this.nodes.token.nextElementSibling
            }
        });

        /**
         * previousLine is the div containing the previous token line in the sentence
         */
        Object.defineProperty(this, 'previousLine', {
            get: function () {
                if ( this.nodes.token.previousElementSibling.classList.contains("multiwordtoken")) {
                    var mwt = this.nodes.token.previousElementSibling;
                    var subtokens = mwt.getElementsByClassName('tokens')[0].children;
                    return subtokens[subtokens.length - 1];
                } else {
                    return this.nodes.token.previousElementSibling
                }
            }
        });
    },
    oninit: function () {
        this.on('split', function (event) {

            // call split(token_id, index)
            console.log('split('+this.get('object').id+','+event.caretPosition+')');
            this.parent.get('object').split(this.get('object').id, event.caretPosition);

            // refresh the model
            this.parent.updateModel();

            // place the caret
            this.nextLine.childNodes[2].focus();
            this.nextLine.childNodes[2].setSelectionRange(0,0)
        });

        this.on('merge', function (event) {
            if(event.caretPosition===event.textLength) {

                // call merge(token_id)
                console.log("merge("+this.get('object').id+")");
                this.parent.get('object').merge(this.get('object').id);

                // refresh the model
                this.parent.updateModel();

                //place the caret
                event.node.setSelectionRange(event.caretPosition,event.caretPosition);
            }
        });

        this.on('backmerge', function (event) {
            if(event.caretPosition===0) {
                // find the token before the current token
                var previousId = this.previousLine.childNodes[0].textContent;

                // find the token line before this one
                // note that we don't use this.prevousLine because we need to move cursor to mwt head
                // also, we must do this here, before the merge instead of at the end where we use it
                //   because if we do it before calling merge, it will break
                var previousToken = event.node.parentNode.previousSibling;
                var previousForm = previousToken.childNodes[2].value;

                // if the id is a number, convert it to a number
                if( !isNaN(+previousId )) {
                    previousId = +previousId;
                }

                // call merge(previous_token_id)
                console.log("merge("+previousId+")");
                this.parent.get('object').merge(previousId);

                // refresh the model
                this.parent.updateModel();

                // place the caret
                previousToken.childNodes[2].focus();
                previousToken.childNodes[2].setSelectionRange(previousForm.length,previousForm.length);
            }
        });

        this.on('expand', function (event) {

            // index used for finding the replacement component
            var index = this.parent.findAllComponents().indexOf(this);


            console.log('expand('+this.get('object').id+','+event.caretPosition+')');
            this.parent.get('object').expand(this.get('object').id,event.caretPosition);

            this.parent.updateModel();

            var replacement = this.parent.findAllComponents()[index].nodes.multiwordtoken;
            replacement.childNodes[2].focus();
            replacement.childNodes[2].setSelectionRange(event.caretPosition,event.caretPosition);

        });

        this.on('downarrow', function (event){

            var start = event.node.selectionStart;
            var end = event.node.selectionEnd;

            this.nextLine.childNodes[2].focus();
            this.nextLine.childNodes[2].setSelectionRange(start, end);
        });

        this.on('leftarrow', function (event){
            var start = event.node.selectionStart;
            var end = event.node.selectionEnd;

            // if we are at the start of the text area, move caret to the end of the previous form field
            if(start === 0) {
                var formLength = this.previousLine.childNodes[2].value.length;
                this.previousLine.childNodes[2].focus();
                this.previousLine.childNodes[2].setSelectionRange(formLength, formLength);
            }
            // otherwise, move the caret left by one
            else {
                event.node.setSelectionRange(start - 1, end - 1);
            }
        });

        this.on('rightarrow', function (event){
            // if we are at the end of the text area, move caret to the start of the next form field
            if(event.node.selectionStart === event.node.value.length) {
                this.nextLine.childNodes[2].focus();
                this.nextLine.childNodes[2].setSelectionRange(0, 0);
            }
            // otherwise, move the caret right by one
            else {
                event.node.setSelectionRange(event.node.selectionStart + 1, event.node.selectionStart + 1);
            }
        });

        this.on('uparrow', function (event){
            var start = event.node.selectionStart;
            var end = event.node.selectionEnd;
            this.previousLine.childNodes[2].focus();
            this.previousLine.childNodes[2].setSelectionRange(start, end);
        });

        this.on('splitsentence', function (event) {
            var sent = this.parent.get('object');
            var con = this.parent.parent.get('object');
            var sent_index = con.sentences.indexOf(sent);
            var token_id = this.get('object').id;

            // If we are at the end of the text box, the current token goes in the next sentence
            if(event.caretPosition===event.textLength) {
                console.log('splitSentence('+sent_index+','+token_id+')');
                con.splitSentence(sent_index, token_id);
            } else {
                console.log('splitSentence('+sent_index+','+(token_id-1)+')');
                con.splitSentence(sent_index, token_id-1);
            }

            this.parent.parent.updateModel();

            // find the new sentence component
            var replacement = this.parent.parent.findAllComponents('sentence')[sent_index+1];
            // find the first token component in that new sentence
            replacement = replacement.findAllComponents('token')[0];
            // find that token's div
            replacement = replacement.nodes.token;

            replacement.childNodes[2].focus();
            replacement.childNodes[2].setSelectionRange(event.caretPosition,event.caretPosition);
        });

        this.on('mergesentence', function () {
            var sent = this.parent.get('object');
            var con = this.parent.parent.get('object');
            var sent_index = con.sentences.indexOf(sent);
            var token_index = sent.tokens.indexOf(this.get('object'));
            if(token_index === sent.tokens.length - 1) {
                console.log('mergeSentence('+(sent_index)+')');
                con.mergeSentence(sent_index);

                this.parent.parent.updateModel();
            }
        });

        this.on('backmergesentence', function () {
            var sent = this.parent.get('object');
            var con = this.parent.parent.get('object');
            var sent_index = con.sentences.indexOf(sent);
            var token_index = sent.tokens.indexOf(this.get('object'));


            // Find new caret position
            // This needs to be done before updating the model because we wish to use the length of the sentence prior
            // to modification.
            //
            // find the new sentence component
            var nextCaretLocation = this.parent.parent.findAllComponents('sentence')[sent_index-1];
            // find the first token component in that new sentence
            nextCaretLocation = nextCaretLocation.findAllComponents('token');
            nextCaretLocation = nextCaretLocation[nextCaretLocation.length -1]
            // find that token's div
            nextCaretLocation = nextCaretLocation.nodes.token;

            if(token_index === 0) {
                console.log('mergeSentence('+(sent_index-1)+')');
                con.mergeSentence(sent_index-1);

                this.parent.parent.updateModel();
            }

            nextCaretLocation.childNodes[2].focus();
            nextCaretLocation.childNodes[2].setSelectionRange(event.caretPosition,event.caretPosition);

        });
    },
    data: function () {
        return {
            object: new Token()
        }
    }
});
