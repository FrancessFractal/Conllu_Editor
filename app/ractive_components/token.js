var Ractive = require('ractive');
var Token = require('../../scripts/Token.js').Token;

module.exports = Ractive.extend({
    template: require('./token.html'),
    isolated: true,
    oninit: function () {
        this.on('split', function (event) {

            // call split(token_id, index)
            console.log('split('+this.get('object').id+','+event.caretPosition+')');
            this.parent.get('object').split(this.get('object').id, event.caretPosition);

            // refresh the model
            this.parent.updateModel();

            // place the caret
            var nextForm = event.node.parentNode.nextSibling.childNodes[2];
            nextForm.focus();
            nextForm.setSelectionRange(0,0);
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
                var previousToken = event.node.parentNode.previousSibling;
                var previousForm = previousToken.childNodes[2].value;
                var previousId = previousToken.childNodes[0].textContent;

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
            console.log('expand('+this.get('object').id+','+event.caretPosition+')');
            this.parent.get('object').expand(this.get('object').id,event.caretPosition);
            this.parent.updateModel();
        });
        this.on('downarrow', function (event){
            var nextToken = event.node.parentNode.nextSibling.childNodes[2];
            nextToken.focus();
            nextToken.setSelectionRange(event.caretPosition, event.caretPosition);
        });
        this.on('leftarrow', function (event){
            console.log("leftarrow function");
        });
        this.on('rightarrow', function (event){
            console.log("rightarrow function");
        });
        this.on('uparrow', function (event){
            var nextToken = event.node.parentNode.previousSibling.childNodes[2];
            nextToken.focus();
            nextToken.setSelectionRange(event.caretPosition, event.caretPosition);
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

            // TODO: place caret
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
            if(token_index === 0) {
                console.log('mergeSentence('+(sent_index-1)+')');
                con.mergeSentence(sent_index-1);

                this.parent.parent.updateModel();
            }

        });
    },
    data: function () {
        return {
            object: new Token()
        }
    }
});
