/**
 * This function is meant to be called on an existing object in order to give it TokenAggregate capabilities.
 * For example:
 * 
 * var obj = { tokens: [{id: 1, form: 'token1'}, {id: 2, form:'token2'}] };
 * TokenAggregate.call(obj,'tokens');
 * obj.split(1,3);
 * obj.merge(1); * 
 * 
 * @param token_array
 * @constructor
 */
var TokenAggregate = function(token_array) {
    // Note: access the token array using: this[token_array]

    /**
     * split splits a token into two tokens.
     * This function finds the token with the given id, and splits it at that index.
     * For example, if we have tokens ["token1","token2"], calling split(1,2) would result in ["to","ken1","token2"]
     * @param token_id
     * @param index
     */
    this.split = function(token_id, index) {
        // throw new Error("Not Implemented");
        // TODO: implement
    };

    /**
     * merge undoes a split when called on the same token_id.
     * @param token_id
     */
    this.merge = function(token_id) {
        throw new Error("Not Implemented");
        // TODO: implement
    };
};


// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.TokenAggregate = TokenAggregate;
}
