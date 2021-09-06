const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => { 
  //**********************find out if needed!*
    res.status(404).end();
  });

module.exports = router;
