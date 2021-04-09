
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
const authorization = require('./auth/authorization')

const userRoutes = require('./routes/users')
const indexRoutes = require('./routes/')

const PORT = 5000
const CONNECTION_STRING = "postgres://localhost:5432/newsdb"


const VIEWS_PATH = path.join(__dirname,'/views')



// configuring your view engine
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')

app.use('/css',express.static('css')) // localhost:3000/css/site.css

app.use(session({
  secret: 'lhadhlsdalh',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next)=>{
  res.locals.authenticated = req.session.user == null ? false : true
  next()
})

db = pgp(CONNECTION_STRING)

app.use('/', indexRoutes)
app.use('/users', authorization,userRoutes)


app.listen(PORT,() => {
  console.log(`Server has started on ${PORT}`)
})
