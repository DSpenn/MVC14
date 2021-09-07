const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
      loggedin: req.session.loggedin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});   





router.get('/:id', async (req, res) => {
    try {
      const projectData = await Project.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const posts = dbPostData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        loggedin: req.session.loggedin
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.post('/', withAuth, (req, res) => {   // Create a new post
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
  