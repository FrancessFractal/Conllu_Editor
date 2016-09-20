var Ractive = require('ractive');
var Token = require('../../scripts/Token.js').Token;

module.exports = Ractive.extend({
    template: require('./subtoken.html'),
    isolated: true,
    onconstruct: function () {
        Object.defineProperty(this, 'nextLine', {
            get: function () {
                if ( this.nodes.subtoken.nextElementSibling !== null) {
                    return this.nodes.subtoken.nextElementSibling
                } else {
                    return this.parent.nodes.multiwordtoken.nextElementSibling
                }
            }
        });

        Object.defineProperty(this, 'previousLine', {
            get: function () {
                if ( this.nodes.subtoken.previousElementSibling !== null) {
                    return this.nodes.subtoken.previousElementSibling
                } else {
                    return this.parent.nodes.multiwordtoken
                }
            }
        });
    },
    oninit: function () {

        this.on('split', function (event) {

            // call split(token_id, index)
            console.log('split('+this.get('object').id+','+event.caretPosition+')');
            this.parent.parent.get('object').split(this.get('object').id, event.caretPosition);

            // refresh the model
            this.parent.parent.updateModel();

            // place the caret
            this.nextLine.childNodes[2].focus();
            this.nextLine.childNodes[2].setSelectionRange(0,0);
        });

        this.on('merge', function (event) {
            if(event.caretPosition===event.textLength) {

                // call merge(token_id)
                console.log("merge("+this.get('object').id+")");
                this.parent.parent.get('object').merge(this.get('object').id);

                // refresh the model
                this.parent.parent.updateModel();

                //place the caret
                event.node.setSelectionRange(event.caretPosition,event.caretPosition);
            }
        });

        this.on('backmerge', function (event) {
            if(event.caretPosition===0) {
                // find the token id from before the current token
                var previousId = this.previousLine.childNodes[0].textContent;
                var previousForm = this.previousLine.childNodes[2];
                var formLength = previousForm.value.length;

                // if the id is a number, convert it to a number
                if( !isNaN(+previousId )) {
                    previousId = +previousId;
                }

                // call merge(previous_token_id)
                console.log("merge("+previousId+")");
                this.parent.parent.get('object').merge(previousId);

                // refresh the model
                this.parent.parent.updateModel();

                // place the caret
                previousForm.focus();
                previousForm.setSelectionRange(formLength,formLength);
            }
        });

        this.on('expand', function (event) {
            console.log('expand('+this.get('object').id+','+event.caretPosition+')');
            this.parent.get('object').expand(this.get('object').id,event.caretPosition);
            this.parent.updateModel();
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
    },
    data: function () {
        return {
            object: new Token()
        }
    }
});
