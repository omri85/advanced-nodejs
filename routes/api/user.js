const router = require('express').Router();
const userController = require('../../controllers/userController')

router.post('/', userController.addUser)

router.get('/:id', userController.getUser)

router.delete('/:id', userController.deleteUser)

module.exports = router