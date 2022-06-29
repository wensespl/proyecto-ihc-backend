const jwt = require('jsonwebtoken')
const User = require('../models/User')

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token received'
    })
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_JWT)

    const user = await User.findById(userId)

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token'
      })
    }

    req.userId = userId
    req.user = user
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }

  next()
}

module.exports = {
  validateJWT
}
