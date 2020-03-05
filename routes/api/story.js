const router = require('express').Router();
const storyController = require('../../controllers/storyController')

router.get('/:id', storyController.getStory)

router.post('/', storyController.creatStory)

module.exports = router