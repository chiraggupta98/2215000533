const { fetchUsers, fetchPosts, fetchComments } = require('./apiClient');

let latestPosts = []; // to maintain cache of latest posts

const getTopUsersWithMostCommentedPosts = async () => {
  const users = await fetchUsers();
  const userCommentCounts = {};

  for (const userId of Object.keys(users)) {
    const posts = await fetchPosts(userId);
    let commentCount = 0;

    for (const post of posts) {
      const comments = await fetchComments(post.id);
      commentCount += comments.length;
    }

    userCommentCounts[userId] = commentCount;
  }

  const sorted = Object.entries(userCommentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({ id, name: users[id], totalComments: count }));

  return sorted;
};

const getTopPosts = async () => {
  const users = await fetchUsers();
  const allPosts = [];

  for (const userId of Object.keys(users)) {
    const posts = await fetchPosts(userId);

    for (const post of posts) {
      const comments = await fetchComments(post.id);
      post.commentCount = comments.length;
      allPosts.push(post);
    }
  }

  const maxCount = Math.max(...allPosts.map(p => p.commentCount));
  return allPosts.filter(p => p.commentCount === maxCount);
};

const getLatestPosts = async () => {
  const users = await fetchUsers();
  const allPosts = [];

  for (const userId of Object.keys(users)) {
    const posts = await fetchPosts(userId);
    allPosts.push(...posts);
  }

  const sorted = allPosts.sort((a, b) => b.id - a.id); // Assuming higher id means newer
  return sorted.slice(0, 5);
};

module.exports = {
  getTopUsersWithMostCommentedPosts,
  getTopPosts,
  getLatestPosts
};
