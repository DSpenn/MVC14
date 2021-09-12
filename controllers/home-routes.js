const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const dbPostData = await Post.findAll({
			attributes: [ 'id', 'title', 'body', 'created_date' ],
			include: [
				{
					model: Comment,
					attributes: [ 'id', 'content', 'post_id', 'user_id' ],
					include: {
						model: User,
						attributes: ['name']
					}
				},
				{
					model: User,
					attributes: ['name']
				}
			]
		});
		const posts = dbPostData.map(post => post.get({ plain: true }));
		res.render('homepage', {
			posts,
			loggedin: req.session.loggedin
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Post }]
		});
		const user = userData.get({ plain: true });
		res.render('dashboard', {
			...user,
			loggedin: req.session.loggedin
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/comment/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			attributes: [ 'id', 'title', 'body', 'created_date' ],
			include: [
				{
					model: Comment,
					attributes: [ 'id', 'content', 'post_id', 'user_id' ],
					include: {
						model: User,
						attributes: ['name']
					}
				},
				{
					model: User,
					attributes: ['name']
				}
			]
		});
		const sesUId = req.session.user_id;
		const post = postData.get({ plain: true });
		res.render('onepost', {
			...post,
			loggedin: req.session.loggedin,
			sesUId: req.session.user_id
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => { 	// If a session exists, redirect the request to the homepage
	if (req.session.loggedin) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

router.get('/signup', (req, res) => {
	if (req.session.loggedin) {
		res.redirect('/');
		return;
	}
	res.render('signup');
});



router.get('/otherview', async (req, res) => {
try {
	const dbPostData = await Post.findAll({
		attributes: [ 'id', 'title', 'body', 'created_date' ],
		include: [
			{
				model: Comment,
				attributes: [ 'id', 'content', 'post_id', 'user_id' ],
				include: {
					model: User,
					attributes: ['name']
				}
			},
			{
				model: User,
				attributes: ['name']
			}
		]
	});
	const posts = dbPostData.map(post => post.get({ plain: true }));
	res.render('otherview', {
		posts,
		loggedin: req.session.loggedin
	});
} catch (err) {
	res.status(500).json(err);
}
});







module.exports = router;
