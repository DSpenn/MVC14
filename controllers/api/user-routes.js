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

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("userData.id",userData.id);

    req.session.save(() => {
      req.session.loggedin = true;
      req.session.user_id = userData.id;
      req.session.name = userData.name;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedin) {
    req.session.destroy(() => {     // Remove the session variables
      res.status(204).end();
      document.location.replace('/login');
    });
  } else {
    res.status(404).end();
    document.location.replace('/login');
  }
});


router.post('/', (req, res) => {
  User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
  })

  .then(dbUserData => {
          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.name = dbUserData.name;
              req.session.email= dbUserData.email;
              req.session.loggedin = true;

              res.json(dbUserData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


module.exports = router;
