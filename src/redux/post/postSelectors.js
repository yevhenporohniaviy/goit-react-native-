export const selectPostCreate = (state) => state.post.postCreate;
export const selectLastCreatedPost = (state) => state.post.postCreate.lastPost;
export const selectIsLoading = (state) => state.post.postCreate.isLoading;
export const selectError = (state) => state.post.postCreate.error;
export const selectPosts = (state) => state.post.posts;
export const selectPostsLoading = (state) => state.post.posts.isLoading;
export const selectPostsError = (state) => state.post.posts.error;
export const selectPostById = (state) => state.post.postById;
export const selectPostByIdLoading = (state) => state.post.postById.isLoading;
export const selectPostByIdError = (state) => state.post.postById.error;
export const selectComments = (state) => state.post.comments;
export const selectCommentsLoading = (state) => state.post.comments.isLoading;
export const selectCommentsError = (state) => state.post.comments.error;
export const selectCommentCreate = (state) => state.post.commentCreate;
export const selectCommentCreateLoading = (state) =>
  state.post.commentCreate.isLoading;
export const selectCommentCreateError = (state) =>
  state.post.commentCreate.error;
