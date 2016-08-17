
var textFire = function (node, event) {
    return {
        node: node,
        original: event,
        caretPosition: node.selectionStart,
        textLength: node.value.length
    }
};

// Enter
enter = function ( node, fire ) {

    var enterKeyHandler = function ( event ) {
        // If we are currently in a text box, and have hit enter
        if(document.activeElement.type === 'text'
            && event.key === 'Enter'
            && !event.shiftKey) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', enterKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', enterKeyHandler );
        }
    };
};

// Shift Enter
shiftenter = function ( node, fire ) {

    var shiftEnterKeyHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+enter
        if(document.activeElement.type === 'text'
            && event.key === 'Enter'
            && event.shiftKey) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', shiftEnterKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', shiftEnterKeyHandler );
        }
    };
};

// Delete
del = function ( node, fire ) {

    var deleteKeyHandler = function ( event ) {
        // If we are currently in a text box and have hit delete at the end of the text box
        if(document.activeElement.type === 'text'
            && (event.key === 'Delete'
            || event.key === 'Del') // because Microsoft is being Microsoft
            && !event.shiftKey
            && node.selectionStart === node.value.length ) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', deleteKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', deleteKeyHandler );
        }
    };
};

// Shift Delete
shiftdel = function ( node, fire ) {

    var shiftDeleteKeyHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+delete
        if(document.activeElement.type === 'text'
            && (event.key === 'Delete'
            || event.key === 'Del') // because Microsoft is being stupid
            && event.shiftKey) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', shiftDeleteKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', shiftDeleteKeyHandler );
        }
    };
};

// Backspace
backspace = function ( node, fire ) {

    var backspaceKeyHandler = function ( event ) {
        // If we are currently in a text box and have hit backspace at the start of the textbox
        if(document.activeElement.type === 'text'
            && event.key === 'Backspace'
            && !event.shiftKey
            && node.selectionStart === 0) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', backspaceKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', backspaceKeyHandler );
        }
    };
};

// Shift Backspace
shiftbackspace = function ( node, fire ) {

    var shiftBackspaceKeyHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+backspace
        if(document.activeElement.type === 'text'
            && event.key === 'Enter'
            && event.shiftKey) {
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', shiftBackspaceKeyHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', shiftBackspaceKeyHandler );
        }
    };
};

downarrow = function ( node, fire ) {

    var downarrowHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+backspace
        if(document.activeElement.type === 'text'
            && event.key === 'ArrowDown'
        ){
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', downarrowHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', downarrowHandler );
        }
    };
};
leftarrow = function ( node, fire ) {

    var leftarrowHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+backspace
        if(document.activeElement.type === 'text'
            && event.key === 'LeftDown'
        ){
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', leftarrowHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', leftarrowHandler );
        }
    };
};

rightarrow = function ( node, fire ) {

    var rightarrowHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+backspace
        if(document.activeElement.type === 'text'
            && event.key === 'RightDown'
        ){
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', rightarrowHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', rightarrowHandler );
        }
    };
};

uparrow = function ( node, fire ) {

    var uparrowHandler = function ( event ) {
        // If we are currently in a text box and have hit shift+backspace
        if(document.activeElement.type === 'text'
            && event.key === 'ArrowUp'
        ){
            event.preventDefault();
            fire(textFire(node, event));
        }
    };

    node.addEventListener( 'keydown', uparrowHandler );
    return {
        teardown: function () {
            node.removeEventListener( 'keydown', uparrowHandler );
        }
    };
};

// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.enter = enter;
    exports.shiftenter = shiftenter;
    exports.del = del;
    exports.shiftdel = shiftdel;
    exports.backspace = backspace;
    exports.shiftbackspace = shiftbackspace;
    exports.downarrow = downarrow;
    exports.leftarrow = leftarrow;
    exports.rightarrow = rightarrow;
    exports.uparrow = uparrow;
}
