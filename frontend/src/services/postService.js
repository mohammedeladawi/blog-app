import axiosInstance from "./axiosConfig";

const getLatestPosts = async () => {
  const response = await axiosInstance.get("post/top");
  return response.data;
};

const getPaginatedPosts = async (offset, limit) => {
  const response = await axiosInstance.get("post", {
    params: { offset, limit },
  });
  return response.data;
};

const getPostBySlug = async (slug) => {
  const response = await axiosInstance.get(`post/${slug}`);
  return response.data;
};

const createPost = async (postData) => {
  const response = await axiosInstance.post("post", postData);
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`post/${postId}`);
  return response.data;
};

const updatePost = async (postId, updatedPost) => {
  const response = await axiosInstance.put(`post/${postId}`, updatedPost);
  return response.data;
};

export {
  getLatestPosts,
  getPaginatedPosts,
  getPostBySlug,
  createPost,
  deletePost,
  updatePost,
};
