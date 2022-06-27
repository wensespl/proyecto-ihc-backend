const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DataBase is connected!')
    })
    .catch((error) => console.error(error))
}

module.exports = connectDB
