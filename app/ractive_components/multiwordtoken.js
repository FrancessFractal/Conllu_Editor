var Ractive = require('ractive');
var MultiwordToken = require('conllu').MultiwordToken;

module.exports = Ractive.extend({
    template: require('./multiwordtoken.html'),
    isolated: true,
    onconstruct: function () {

        /**
         * nextLine is the div containing the next token line in the sentence.
         */
        Object.defineProperty(this, 'nextLine', {
            get: function () {
                return this.nodes.multiwordtoken.getElementsByClassName('subtoken')[0];
            }
        });

        /**
         * previousLine is the div containing the previous token line in the sentence
         */
        Object.defineProperty(this, 'previousLine', {
            get: function () {
                return this.nodes.multiwordtoken.previousElementSibling;
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
            this.nextLine.childNodes[2].setSelectionRange(0,0);

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

        this.on('collapse', function (event, token) {
            console.log('collapse('+token+')');
            this.parent.get('object').collapse(token);
            this.parent.updateModel();
        });

        this.on('downarrow', function (event){
            var nextToken = event.node.parentNode.childNodes[20].childNodes[0].childNodes[2];
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
    },
    data: function () {
        return {
            object: new MultiwordToken()
        }
    },
    components: {
        subtoken: require('./subtoken.js')
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
