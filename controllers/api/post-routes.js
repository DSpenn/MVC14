const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/post/:id', async (req, res) => {
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


  router.delete('/post/:id', withAuth, async (req, res) => {
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

  