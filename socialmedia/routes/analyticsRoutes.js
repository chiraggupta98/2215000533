
const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();

router.get('/posts',
  query('type')
    .exists().withMessage('type query parameter is required')
    .isIn(['popular', 'latest']).withMessage('type must be either popular or latest'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { type } = req.query;
    res.json({ message: `Fetching ${type} posts` });
  }
);

module.exports = router;
