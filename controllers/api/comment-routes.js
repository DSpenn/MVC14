const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {   // Create a new post

postid = req.get('Referrer').slice(30); // there was probably better ways to get this.

  console.log("postid", postid);
    Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: postid
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
