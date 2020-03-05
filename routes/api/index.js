const router = require('express').Router();

router.use('/story', require('./story'))
router.use('/segment', require('./segment'))
router.use('/user', require('./user'))

module.exports = router