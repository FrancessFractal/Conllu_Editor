var Ractive = require('ractive');
Ractive.events = require('../app/events.js');

var Conllu_Editor = require('./ractive_components/conllueditor.js');

var app = new Conllu_Editor({
    el: '#conllu_editor'
});
