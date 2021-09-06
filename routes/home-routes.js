const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id','title','body','created_date'],
      include: [{
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id'],
      },
        { model: User, attributes: ['name']}]
    })

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});   



/*
router.get('/', withAuth, async (req, res) => { // Prevent non logged in users from viewing the homepage
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    const users = userData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,      // Pass the logged in flag to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); */


router.get('/login', (req, res) => { // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
