const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')

const login = async (req, res) => {
  try {
    const { password, email } = req.body
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email and password are incorrect'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrect'
      })

    const token = await generateJWT(user._id)

    res.status(200).json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const register = async (req, res) => {
  try {
    const { name, password, email, role } = req.body
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `user whit email ${email} exists`
      })
    }

    user = new User({
      name,
      email,
      role
    })

    //encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const token = await generateJWT(user._id)

    res.status(201).json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const renewToken = async (req, res) => {
  const { userId, user } = req

  const token = await generateJWT(userId)
  res.json({
    ok: true,
    user,
    token
  })
}

module.exports = { login, register, renewToken }
