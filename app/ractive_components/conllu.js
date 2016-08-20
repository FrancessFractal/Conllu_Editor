var Ractive = require('ractive');
var Conllu = require('../../scripts/Conllu.js').Conllu;

module.exports = Ractive.extend({
    isolated: true,
    template: require('./conllu.html'),
    data: function() {
        return {
            object: new Conllu(),
            filename: 'file.conllu'
        };
    },
    components: {
        sentence: require('./sentence.js')
    },
    download: function () {
        var blob = new Blob([this.get('object').serial],{type: 'text/plain'});
        var path = window.URL.createObjectURL(blob);
        var link = document.createElement('A');
        link.setAttribute('href',path);
        link.setAttribute('download',this.get('filename'));
        link.click();
        link.remove();
    }
});