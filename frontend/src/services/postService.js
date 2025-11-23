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

export { getLatestPosts, getPaginatedPosts, getPostBySlug, createPost };
