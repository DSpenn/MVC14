const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


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
  
      res.render('homepage', {
        posts,
        loggedin: req.session.loggedin
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  