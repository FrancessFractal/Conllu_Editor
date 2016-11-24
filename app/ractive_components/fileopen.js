var Ractive = require('ractive');
var Conllu = require('conllu').Conllu;

module.exports = Ractive.extend({
    template: require('./fileopen.html'),
    data: {
        conllu: undefined
    },
    oninit: function () {
        this.on('open', function (event) {
            var component = this;
            var reader = new FileReader ();
            reader.onload = function(e) {
                var conllu_editor = component.parent;
                var conllu_obj = new Conllu();
                conllu_obj.serial = reader.result;
                conllu_editor.set('conllu',conllu_obj);
            };
            reader.readAsText (event.node.previousElementSibling.files[0]);

        });
    }
});
