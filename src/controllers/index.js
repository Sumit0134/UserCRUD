module.exports = {
  createUser: require("./createUserController"),
  loginUser: require("./loginUserController"),
  logout: require("./logoutController"),
  profile: require("./profileController"),
  createPost: require("./createPostController"),
  likePost: require("./likePostController"),
  editPost: require("./editPostController"),
  updatePost: require("./updatePostController"),
  deletePost: require("./deletePostController"),
  uploadImage: require("./uploadImageController"),
  uploadProfile: require("./uploadProfileController"),
};
