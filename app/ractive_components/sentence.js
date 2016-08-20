var Ractive = require('ractive');
var Sentence = require('../../scripts/Sentence.js').Sentence;

module.exports = Ractive.extend({
    template: require('./sentence.html'),
    isolated: true,
    oninit: function () {

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
        multiwordtoken: require('./multiwordtoken.js'),
        token: require('./token.js')
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
