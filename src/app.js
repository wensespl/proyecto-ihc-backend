const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')

//Instancias de rutas
const AuthRouter = require('./routes/AuthRouter')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())

//Rutas
app.use('/api/v1/auth', AuthRouter)

module.exports = app
