const { Router } = require('express')
const { check } = require('express-validator')

const {
  login,
  register,
  renewToken
} = require('../controllers/AuthControllers')
const { fieldValidator } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.route('/login').post(
  [
    check('email', 'El email es obligatorio').isEmail(),
    check(
      'password',
      'El password debe de ser de 6 caracteres como minimo'
    ).isLength({
      min: 6
    }),
    fieldValidator
  ],
  login
)

router.route('/register').post(
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6
    }),
    fieldValidator
  ],
  register
)

router.get('/renew', validateJWT, renewToken)

module.exports = router
