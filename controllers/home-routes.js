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
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      loggedin: req.session.loggedin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});   

router.get('/post/:id', async (req, res) => { // Single post server
  try {
    const PostData = await Post.findByPk(req.params.id, {
      attributes: ['id','title','body','created_date'],
      include: [{
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id'],
      },
        { model: User, attributes: ['name']}]
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      loggedin: req.session.loggedin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => { //shows only posts by this user
  try {     // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedin: req.session.loggedin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 

/*router.get('/dashboard', withAuth, async (req, res) => { // Prevent non logged in users from viewing the homepage
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    const users = userData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      ...user,
      loggedin: req.session.loggedin,      // Pass the logged in flag to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/login', (req, res) => { // If a session exists, redirect the request to the homepage
  if (req.session.loggedin) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
