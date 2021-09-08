const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//(req.headers['Referer'].slice(-2))
router.post('/', withAuth, async (req, res) => {   // Create a new post
  postid = req.get('Referrer').slice(-2);
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
