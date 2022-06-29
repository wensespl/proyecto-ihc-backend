const { Router } = require('express')

const router = Router()

const { getAllUsers, getUser } = require('../controllers/UserControllers')

router.route('/').get(getAllUsers)
router.route('/:userId').get(getUser)

module.exports = router
