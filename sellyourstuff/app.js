
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const path = require('path')
const bodyParser = require('body-parser')
const models = require('./models')
const bcrypt = require('bcrypt');
const session = require('express-session');
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/users')

global.__basdir = __dirname

app.use(session({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: false

}))

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoutes)
app.use('/users', userRoutes)

//static
app.use('/uploads', express.static('uploads'));

const PORT = 5000
const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')





 

app.listen(PORT,() => console.log('Server is running...'))


