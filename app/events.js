(function () {

    var textFire = function (node, event) {
        return {
            node: node,
            original: event,
            caretPosition: node.selectionStart,
            textLength: node.value.length
        }
    };

    // this keeps track of whether or not the space is currently down
    var space = false;
    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            space = true;
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.key === ' ') {
            space = false;
        }
    });

    // Space
    module.exports.space = function(node, fire) {

        var spaceKeyHandler = function (event) {
            // If we are currently in a text box, and have hit space
            if (document.activeElement.type === 'text'
                && event.key === ' ') {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', spaceKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', spaceKeyHandler);
            }
        };

    };

    // Enter
    module.exports.enter = function (node, fire) {

        var enterKeyHandler = function (event) {
            // If we are currently in a text box, and have hit enter
            if (document.activeElement.type === 'text'
                    && event.key === 'Enter'
                    && !event.shiftKey
                    && !space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', enterKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', enterKeyHandler);
            }
        };
    };

    // Shift Enter
    module.exports.shiftenter = function (node, fire) {

        var shiftEnterKeyHandler = function (event) {
            // If we are currently in a text box and have hit shift+enter
            if (document.activeElement.type === 'text'
                    && event.key === 'Enter'
                    && event.shiftKey
                    && !space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', shiftEnterKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', shiftEnterKeyHandler);
            }
        };
    };

    // Space Enter
    module.exports.spaceenter = function (node, fire) {

        var enterhandler = function (event) {
            // If we are currently in a text box and hit space+enter
            if (document.activeElement.type === 'text'
                    && event.key === 'Enter'
                    && !event.shiftKey
                    && space === true) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', enterhandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', enterhandler);
            }
        };

    };

    // Delete
    module.exports.del = function (node, fire) {

        var deleteKeyHandler = function (event) {
            // If we are currently in a text box and have hit delete
            if (document.activeElement.type === 'text'
                    && (event.key === 'Delete'
                    || event.key === 'Del') // because Microsoft is being Microsoft
                    && !event.shiftKey
                    && !space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', deleteKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', deleteKeyHandler);
            }
        };
    };

    // Shift Delete
    module.exports.shiftdel = function (node, fire) {

        var shiftDeleteKeyHandler = function (event) {
            // If we are currently in a text box and have hit shift+delete
            if (document.activeElement.type === 'text'
                    && (event.key === 'Delete'
                    || event.key === 'Del') // because Microsoft is being stupid
                    && event.shiftKey
                    && !space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', shiftDeleteKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', shiftDeleteKeyHandler);
            }
        };
    };

    // Space Delete
    module.exports.spacedel = function (node, fire) {

        var shiftDeleteKeyHandler = function (event) {
            // If we are currently in a text box and have hit shift+delete
            if (document.activeElement.type === 'text'
                    && (event.key === 'Delete'
                    || event.key === 'Del') // because Microsoft is being stupid
                    && !event.shiftKey
                    && space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', shiftDeleteKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', shiftDeleteKeyHandler);
            }
        };
    };

    // Forward Delete
    module.exports.forwarddel = function (node, fire) {

        var forwardel = function (event) {
            if(document.activeElement.type === 'text'
                && (event.key === 'Delete'
                || event.key === 'Del') // because Microsoft is being Microsoft
                && !event.shiftKey
                && !space
                && node.selectionStart === node.value.length) {
                event.preventDefault();
                fire(textFire(node,event));
            }
        };

        node.addEventListener('keydown', forwardel);
        return {
            teardown: function () {
                node.removeEventListener('keydown', forwardel);
            }
        }
    };

    // Backspace
    module.exports.backspace = function (node, fire) {

        var backspaceKeyHandler = function (event) {
            // If we are currently in a text box and have hit backspace
            if (document.activeElement.type === 'text'
                    && event.key === 'Backspace'
                    && !event.shiftKey
                    && !space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', backspaceKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', backspaceKeyHandler);
            }
        };
    };

    // Shift Backspace
    module.exports.shiftbackspace = function (node, fire) {

        var shiftBackspaceKeyHandler = function (event) {
            // If we are currently in a text box and have hit shift+backspace
            if (document.activeElement.type === 'text'
                    && event.key === 'Enter'
                    && event.shiftKey
                    && space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', shiftBackspaceKeyHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', shiftBackspaceKeyHandler);
            }
        };
    };


    module.exports.spacebackspace = function (node, fire) {

        var backspacehandler = function (event) {
            if (document.activeElement.type === 'text'
                    && event.key === 'Backspace'
                    && !event.shiftKey
                    && space) {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', backspacehandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', backspacehandler);
            }
        };

    };

    module.exports.backbackspace = function (node, fire) {

        var backbackspaceHandler = function (event) {
            if(document.activeElement.type === 'text'
                && event.key === 'Backspace'
                && !event.shiftKey
                && !space
                && node.selectionEnd === 0) {
                event.preventDefault();
                fire(textFire(node,event));
            }
        };

        node.addEventListener('keydown',backbackspaceHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', backbackspaceHandler);
            }
        }
    };

    module.exports.downarrow = function (node, fire) {

        var downarrowHandler = function (event) {
            // If we are currently in a text box and have hit the down arrow
            if (document.activeElement.type === 'text'
                && event.key === 'ArrowDown') {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', downarrowHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', downarrowHandler);
            }
        };
    };

    module.exports.leftarrow = function (node, fire) {

        var leftarrowHandler = function (event) {
            // If we are currently in a text box and have hit the left arrow
            if (document.activeElement.type === 'text'
                && event.key === 'LeftDown') {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', leftarrowHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', leftarrowHandler);
            }
        };
    };

    module.exports.rightarrow = function (node, fire) {

        var rightarrowHandler = function (event) {
            // If we are currently in a text box and have hit the right arrow
            if (document.activeElement.type === 'text'
                && event.key === 'RightDown') {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', rightarrowHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', rightarrowHandler);
            }
        };
    };

    module.exports.uparrow = function (node, fire) {

        var uparrowHandler = function (event) {
            // If we are currently in a text box and have hit the up arrow
            if (document.activeElement.type === 'text'
                && event.key === 'ArrowUp') {
                event.preventDefault();
                fire(textFire(node, event));
            }
        };

        node.addEventListener('keydown', uparrowHandler);
        return {
            teardown: function () {
                node.removeEventListener('keydown', uparrowHandler);
            }
        };
    };

})();