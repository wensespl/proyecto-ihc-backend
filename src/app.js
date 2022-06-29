const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')


//Instancias de rutas
const AuthRouter = require('./routes/AuthRouter')
const UserRouter = require('./routes/UserRouter')
const CourseRouter = require('./routes/CourseRouter')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())

//Rutas
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/course', CourseRouter)

module.exports = app
