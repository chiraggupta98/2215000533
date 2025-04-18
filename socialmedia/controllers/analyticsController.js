const {
    getTopUsersWithMostCommentedPosts,
    getTopPosts,
    getLatestPosts
  } = require('../services/analyticsService');
  
  exports.getTopUsers = async (req, res) => {
    try {
      const data = await getTopUsersWithMostCommentedPosts();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getPosts = async (req, res) => {
    try {
      const type = req.query.type;
      if (type === 'popular') {
        res.json(await getTopPosts());
      } else if (type === 'latest') {
        res.json(await getLatestPosts());
      } else {
        res.status(400).json({ error: 'Invalid query param. Use type=popular or type=latest' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  