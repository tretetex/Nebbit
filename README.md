# Nebbit

This application allows you to share posts, view and vote for existing posts and send donates.

## Smart contract provides methods:
- getMyPostsCount() - returns count of your posts
- getMyDonatsCount() - returns the number of posts you have donated for
- getPost(id) - returns post by ID
- getPosts(startFrom, count) - returns the specified number of records (count), starting from the post with the ID equal to startFrom
- getTopPosts() - returns the posts sorted by votes
- getMyPosts() - returns posts created by you
- getUserPosts(wallet) - returns posts created by user
- addOrUpdatePost(postJson) - adds a new post or updates an existing
- removePost(id) - deletes a post by ID
- vote(postId) - adds voice to post
- unvote(postId) - minus the voice of the post
- canVote(postId) - checks the possibility of voting for the post
- getPostsVotedFromMe() - returns the posts you voted for
- donate() - transfers money to the author of the post
