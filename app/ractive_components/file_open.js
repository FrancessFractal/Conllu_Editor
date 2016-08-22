var Ractive = require('ractive');
var Conllu = require('../../scripts/Conllu.js').Conllu;

module.exports = Ractive.extend({
    template: require('./file_open.html'),
    data: {
        conllu: undefined
    },
    components: {
        conllu: require('./conllu.js')
    },
    oninit: function () {
        this.on('open', function (event) {
            var conllu_editor = this;
            var reader = new FileReader ();
            reader.onload = function(e) {
                var conllu_obj = new Conllu();
                conllu_obj.serial = reader.result;
                conllu_editor.set('conllu',conllu_obj)
            };
            reader.readAsText (event.node.previousElementSibling.files[0]);


        });
    }
});
