const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
	//postid = req.get('Referrer').slice(30);
	Comment.create({
		content: req.body.content,
		user_id: req.session.user_id,
		//post_id: postid
		post_id: req.body.tempId
	}).then(dbCommentData => res.json(dbCommentData)).catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.destroy({ where: { id: req.params.id } });
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with this id!' });
			return;
		}
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', withAuth, async (req, res) => {
	try {
		const comment = await Comment.update({ content: req.body.content }, { where: { id: req.params.id } });
		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
