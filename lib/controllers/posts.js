const { Router } = require('express');

module.exports = Router() 
  .get('/', (req, res, next) => {
    try {
        const posts = await Post.getAll()
        res.json(posts);
    } catch (e) {
        next(e);
    }
  })