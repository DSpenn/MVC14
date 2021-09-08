const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, (req, res) => {   // Create a new post
    Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: this.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
