const app = require('./app')
const connectDB = require('./db')

require('dotenv').config()
const port = process.env.PORT
const url = process.env.MONGO_URI

try {
  connectDB(url)
  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
  })
} catch (error) {
  console.error(error)
}
