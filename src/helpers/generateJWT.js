const jwt = require('jsonwebtoken')

const generateJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h'
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('Error generating token')
        }
        resolve(token)
      }
    )
  })
}

module.exports = {
  generateJWT
}
