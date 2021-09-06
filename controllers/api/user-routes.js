const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try { // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);     // Verify the posted password with the password store in the database

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
    req.session.save(() => {     // Create session variables based on the logged in user
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {     // Remove the session variables
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
