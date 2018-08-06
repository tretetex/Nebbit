let Stubs = require("../contractStubs.js");
var assert = require("assert")
let Contract = require("../contract.js");

var Blockchain = Stubs.Blockchain;
var LocalContractStorage = Stubs.LocalContractStorage;
Blockchain.changeTransactionAfterGet = false;

function createContract() {
    let contract = new Contract();
    contract.init();
    return contract;
};

let contract = createContract();
let post = {
    text: "test",
    labels: ["q", "w", "r", "t", "y"],
    added: new Date()
};

let id0 = contract.addOrUpdatePost(JSON.stringify(post));
let id1 = contract.addOrUpdatePost(JSON.stringify(post));
let id2 = contract.addOrUpdatePost(JSON.stringify(post));

describe('SmartContract test', function () {
    describe('getMyPosts()', function () {
        let items = contract.getMyPosts();
        console.log(contract.getMyPostsCount());
        it('items count is 3', function () {
            assert.equal(items.length, 3);
        });
    });

    describe('getUserPosts()', function () {
        describe('with added wallet', function () {
            let items = contract.getUserPosts(Blockchain.transaction.from);

            it('items count is 3', function () {
                assert.equal(items.length, 3);
            });
        });
        describe('with not added wallet', function () {
            let items = contract.getUserPosts("qqq");

            it('items count is 0', function () {
                assert.equal(items.length, 0);
            });
        });
    });

    describe('getPost()', function () {
        describe('if exists', function () {
            let item = contract.getPost(1);

            it('item getted', function () {
                assert.equal(item.id, 1);
            });
        });
        describe('if not exists', function () {
            let item = contract.getPost(777);

            it('items count is 0', function () {
                assert.equal(item, undefined);
            });
        });
    });

    describe('canVote()', function () {
        it('is true', function () {
            assert.equal(contract.canVote(0), true);
        });
        it('not found', function () {
            function makeTest() {
                contract.removePost(777)
            }
            assert.throws(makeTest);
        });
    });

    describe('vote()', function () {
        it('added', function () {
            function makeTest() {
                contract.vote(0);
                let post = contract.getPost(0);
                return post.votes;
            }
            assert.equal(makeTest(), 1);
        });
    });

    describe('unvote()', function () {
        it('removed', function () {
            function makeTest() {
                contract.vote(0);
                contract.unvote(0);
                let post = contract.getPost(0);
                return post.votes;
            }
            assert.equal(makeTest(), 2);
        });
    });

    describe('addOrUpdatePost()', function () {

        describe('add 3 items', function () {
            let id0 = contract.addOrUpdatePost(JSON.stringify(post));
            let id1 = contract.addOrUpdatePost(JSON.stringify(post));
            let id2 = contract.addOrUpdatePost(JSON.stringify(post));

            let items = contract.getMyPosts();

            it('return id', function () {
                assert.equal(id0, 3);
                assert.equal(id1, 4);
                assert.equal(id2, 5);
            });
            it('items count is 6', function () {
                assert.equal(items.length, 6);
            });
        });

        describe('update my post', function () {

            let items = contract.getMyPosts();
            let post = items[1];
            post.text = "new";

            let id1 = contract.addOrUpdatePost(JSON.stringify(post));
            post = contract.getPost(id1);

            it('return id', function () {
                assert.equal(id1, 1);
            });
            it('post updated', function () {
                assert.equal(post.text, "new");
            });
            it('items count is 6', function () {
                assert.equal(items.length, 6);
            });
        });

        describe('other post', function () {
            Blockchain.changeTransactionAfterGet = true;
            let post = contract.getPost(1);
            post.text = "new2";

            it('return id', function () {
                assert.equal(post.id, 1);
            });
            it('post updated', function () {
                function makeTest() {
                    contract.addOrUpdatePost(JSON.stringify(post))
                }
                assert.throws(makeTest);
            });
            it('post not updated', function () {
                post = contract.getPost(1);
                assert.equal(post.text, "new");
            });
            it('items count is 0', function () {
                let items = contract.getMyPosts();
                assert.equal(items.length, 0);
            });
        });
    });

    describe('getPosts()', function () {
        describe('last 10 posts', function () {
            let items = contract.getPosts();

            it('items count is 6', function () {
                assert.equal(items.length, 6);
            });
        });
        describe('from 2 to 4', function () {
            let items = contract.getPosts(2, 2);
            it('items count is 2', function () {
                assert.equal(items.length, 2);
            });
        });
    });

    describe('removePost()', function () {
        describe('other post', function () {
            it('can not remove', function () {
                function makeTest() {
                    contract.removePost(1)
                }
                assert.throws(makeTest);
            });
        });
    });

    describe('getTopPosts()', function () {
        contract.vote(3);
        contract.vote(4);
        contract.vote(4);
        let items = contract.getTopPosts();
        it('top post id is 4', function () {
            assert.equal(items[0].id, 4);
        });
    });
});