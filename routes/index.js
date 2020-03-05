const router = require('express').Router();

router.use('/admin', require('./admin'));
router.use('/api', require('./api'))

module.exports = router;