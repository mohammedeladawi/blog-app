import axiosInstance from "./axiosConfig";

const getTopPosts = async () => {
  const response = await axiosInstance.get("post/top");
  return response.data;
};

const getPosts = async (offset, limit) => {
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

export { getTopPosts, getPosts, getPostBySlug, createPost };
