'use strict';

function updateInfo() {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");

    let postsCount = 0;
    apiClient.getMyPostsCount((resp) => {
        if (resp && resp.result) {
            postsCount = JSON.parse(resp.result);
        }
        document.querySelector("#postsCount").innerHTML = postsCount;
    });

    let donationsCount = 0;
    apiClient.getMyDonatsCount((resp) => {
        if (resp && resp.result) {
            donationsCount = JSON.parse(resp.result);
        }
        document.querySelector("#donationsCount").innerHTML = donationsCount;
    });

}

function loadPosts(startFrom, count) {
    apiClient.getPosts(startFrom, count, function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Posts not found :(</div>";
            }
        }
    });
}

function loadTopPosts() {
    apiClient.getTopPosts(function (resp) {
        if (resp && resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Posts not found :(</div>";
            }
        }
    });
}

function loadMyPosts() {
    apiClient.getMyPosts(function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Posts not found :(</div>";
            }
        }
    });
}

function loadMyVotes() {
    apiClient.getPostsVotedFromMe(function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Posts not found :(</div>";
            }
        }
    });
}

function showPost(post) {
    let innerHtml = `<div class="post d-flex justify-content-between ml-auto mr-auto">
            <div id="postId" hidden>${post.id}</div>

            <div class="votes d-flex flex-column align-items-center">
                <div class="vote-up" title="Vote up">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-vote-up">
                        <use xlink:href="#vote-up-${post.id}">
                            <svg id="vote-up-${post.id}" viewBox="0 0 18 10" width="100%" height="100%">
                                <path d="M17.85 9.65c.1-.1.15-.25.15-.35 0-.15-.05-.25-.15-.35L9.8.4C9.65.2 9.35.05 9 .05c-.35 0-.65.15-.8.35L.15 8.95a.6.6 0 0 0 0 .7c.15.2.5.35.8.35h16.1c.35 0 .65-.15.8-.35z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </use>
                    </svg>
                </div>
                <div>${post.votes}</div>
                <div class="vote-down" title="Vote down">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-vote-down">
                        <use xlink:href="#vote-down-${post.id}">
                            <svg id="vote-down-${post.id}" viewBox="0 0 18 10" width="100%" height="100%">
                                <path d="M17.85.35c.1.1.15.25.15.35 0 .15-.05.25-.15.35L9.8 9.6c-.15.2-.45.35-.8.35-.35 0-.65-.15-.8-.35L.15 1.05a.6.6 0 0 1 0-.7C.3.15.65 0 .95 0h16.1c.35 0 .65.15.8.35z"></path>
                            </svg>
                        </use>
                    </svg>
                </div>
            </div>

            <div class="data">
                <div class="post-container">
                    <div class="message">
                        <div class="title">${post.title}</div>
                        <p>
                            ${post.text}
                        </p>
                    </div>
                    <div class="post-footer d-flex justify-content-between">
                        <div>
                            <div class="from">${post.wallet}</div>
                            <div class="created">${convertUnixStampToScreenDate(post.added)}</div>
                        </div>
                        <div class="donate-icon" title="Make donation">
                            <svg xmlns="http://www.w3.org/2000/svg" class="donate-icon">
                                <use xlink:href="#donate-icon-${post.id}">
                                    <svg id="donate-icon-${post.id}" viewBox="0 0 512 512" width="20px" height="100%">
                                        <path d="M362.158,21.082c-38.791,0-77.1,14.983-106.148,40.855c-29.059-25.869-67.374-40.855-106.151-40.855
                                    C65.824,21.082,0,86.906,0,170.935C0,273.262,71.857,336.34,180.626,431.82c9.359,8.216,19.018,16.697,28.958,25.484
                                    c0.058,0.051,0.117,0.102,0.176,0.154l33.042,28.545c3.793,3.278,8.502,4.915,13.212,4.915c4.709,0,9.418-1.638,13.212-4.915
                                    l33.042-28.545c0.059-0.051,0.119-0.102,0.178-0.155c65.298-57.75,114.249-101.953,149.574-144.954
                                    C492.94,262.535,512,217.598,512,170.935C512,86.906,446.181,21.082,362.158,21.082z"
                                        />
                                        <path d="M362.158,21.082c-38.791,0-77.1,14.983-106.148,40.855c-0.004-0.003-0.007-0.005-0.009-0.008v428.99
                                    c0.005,0,0.008,0,0.013,0c4.709,0,9.418-1.638,13.212-4.915l33.042-28.545c0.059-0.051,0.119-0.102,0.178-0.155
                                    c65.298-57.75,114.249-101.953,149.574-144.954C492.94,262.535,512,217.598,512,170.935C512,86.906,446.181,21.082,362.158,21.082z"
                                        />
                                        <polygon style="fill:#FFFFFF;" points="289.684,208.843 289.684,141.474 222.316,141.474 222.316,208.843 154.947,208.843 
                            154.947,276.211 222.316,276.211 222.316,343.58 289.684,343.58 289.684,276.211 357.053,276.211 357.053,208.843 " />
                                    </svg>
                                </use>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>`;

    let container = document.querySelector(".posts");
    let div = document.createElement('div');
    div.innerHTML = innerHtml;
    div.firstChild.querySelector(".vote-up").onclick = () => addVoteHandler(post.id);
    div.firstChild.querySelector(".vote-down").onclick = () => addUnvoteHandler(post.id);
    div.firstChild.querySelector(".donate-icon").onclick = () => addDonateHandler(post.id);

    container.append(div.firstChild);
}

/* ------------------------------ */

function showLoaders() {
    let loader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = loader;
    }
}

function hideLoaders() {
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = "";
    }
}