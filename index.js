const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors('*'))

app.use('/upload', express.static('./upload'))

// auth
app.use('/auth', require('./src/routes/auth'))
// user
app.use('/user', require('./src/routes/profile'))
// cinema
app.use('/cinema', require('./src/routes/cinema'))
// location
app.use('/location', require('./src/routes/location'))
// time
app.use('/time', require('./src/routes/time'))
// date
app.use('/date', require('./src/routes/date'))
// genre
app.use('/genre', require('./src/routes/genre'))

app.listen(APP_PORT, () => {
  console.log(`App is running on port 8080 ${APP_PORT}`)
})
