var Ractive = require('ractive');

module.exports = Ractive.extend({
    template: require('./conllueditor.html'),
    components: {
        conllu: require('./conllu.js'),
        fileopen: require('./fileopen.js'),
        tokenizetext: require('./tokenizetext.js')
    }
});
