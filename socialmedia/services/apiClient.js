const axios = require('axios');
const { BASE_URL, TIMEOUT } = require('../config/constants');

async function fetchUsers() {
  const res = await axios.get(`${BASE_URL}/users`, { timeout: TIMEOUT });
  return res.data.users;
}

async function fetchPosts(userId) {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, { timeout: TIMEOUT });
  return res.data.posts;
}

async function fetchComments(postId) {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, { timeout: TIMEOUT });
  return res.data.comments;
}

module.exports = { fetchUsers, fetchPosts, fetchComments };
