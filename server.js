require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const userRouter = require('./router/user')
const destinationRouter = require('./router/destination')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))
app.use(cors())

const connectDB = require('./config/database')
connectDB()

app.use('/user', userRouter)
app.use('/destination', destinationRouter)


const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))