const CONTRACT_ADDRESS = "n1vHw2PCd2D7EiRLus7cuEGcRUQMhYzbpAh";

class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({
        value = "0",
        callArgs = "[]",
        callFunction,
        callback
    }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }

    _call({
        value = "0",
        callArgs = "[]",
        callFunction,
        callback
    }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }
}

class SocialContractApi extends SmartContractApi {
    getMyPostsCount(cb) {
        this._simulateCall({
            callFunction: "getMyPostsCount",
            callback: cb
        });
    }

    getPost(id, cb) {
        this._simulateCall({
            callArgs: `[${id}]`,
            callFunction: "getPost",
            callback: cb
        });
    }

    getPosts(startFrom, count, cb) {
        count = count || 100;

        this._simulateCall({
            callArgs: `["${startFrom}", "${count}"]`,
            callFunction: "getPosts",
            callback: cb
        });
    }

    getTopPosts(cb) {
        this._simulateCall({
            callFunction: "getTopPosts",
            callback: cb
        });
    }

    getMyPosts(cb) {
        this._simulateCall({
            callFunction: "getMyPosts",
            callback: cb
        });
    }

    getUserPosts(wallet, cb) {
        this._simulateCall({
            callArgs: `["${wallet}"]`,
            callFunction: "getUserPosts",
            callback: cb
        });;
    }

    addOrUpdatePost(post, cb) {
        this._call({
            callArgs: JSON.stringify([JSON.stringify(post)]),
            callFunction: "addOrUpdatePost",
            callback: cb
        });
    }

    removePost(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "removePost",
            callback: cb
        });
    }

    vote(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "vote",
            callback: cb
        });
    }

    unvote(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "unvote",
            callback: cb
        });
    }

    getPostsVotedFromMe(cb) {
        this._simulateCall({
            callFunction: "getPostsVotedFromMe",
            callback: cb
        });
    }

    donate(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "donate",
            callback: cb
        });
    }

    getMyDonatsCount(cb) {
        this._simulateCall({
            callFunction: "getMyDonatsCount",
            callback: cb
        });
    }
}