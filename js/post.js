let timeout = setTimeout(function it() {
    if (isExtensionExist !== undefined) {
        addPostHandler();
        document.querySelector("#loadMyPosts").addEventListener("click", () => loadMyPosts());
        document.querySelector("#loadMyVotes").addEventListener("click", () => loadMyVotes());
        document.querySelector("#loadTopPosts").addEventListener("click", () => loadTopPosts());
    } else {
        timeout = setTimeout(it, 200);
    }
}, 200);

function setFields(postId) {
    api.getPost(postId, (resp) => {
        if (!resp || !resp.result) {
            return;
        }

        let post;
        try {
            post = JSON.parse(resp.result);
        } catch (e) {}

        if (!post) {
            return;
        }

        document.querySelector("#title").value = post.name;
        document.querySelector("#message").value = post.about;
    });
}

function addPostHandler() {
    let form = document.querySelector("#createPost");
    form.onsubmit = function (event) {
        event.preventDefault();
        let post = {};
        post.added = Date.now();
        post.title = document.querySelector("#title").value;
        post.text = document.querySelector("#message").value;

        apiClient.addOrUpdatePost(post, (resp) => {});

        $("#createPostModal").modal('hide');
    }
}

function addVoteHandler(postId) {
    apiClient.vote(postId, (resp) => {
        if (resp) {
            loadPosts();
        }
    });
}

function addUnvoteHandler(postId) {
    apiClient.unvote(postId, (resp) => {
        if (resp) {
            loadPosts();
        }
    });
}

function addDonateHandler(postId) {
    apiClient.donate(postId, (resp) => {
        if (resp) {}
    });
}