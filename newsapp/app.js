const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
const PORT = 3000
const CONNECTION_STRING = "postgres://localhost:5432/newsdb"
const SALT_ROUND = 10 

const VIEWS_PATH = path.join(__dirname, '/views')


// configuring your view engine
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')

app.use(session({
  secret:'lsdjhgiauhgerih;;oliujoih',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))

const db = pgp(CONNECTION_STRING)

app.get('/users/articles', (req,res) => {
  res.render('articles', {username: req.session.user.username})
})

app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  db.oneOrNone('SELECT userid,username,password FROM users WHERE username = $1',[username])
  .then((user)=>{
    if(user){
      bcrypt.compare(password,user.password, function(error,result){
        if(result){
          if(req.session){
            req.session.user = {userId: user.userid, username: user.username}
          }

          res.redirect('/users/articles')
        } else {
          res.render('login', {message: "Invalid username or password!"})
        }
      })

    } else {
      res.render('login', {message: "Invalid username or password!"})
    }
  })
  
})

app.get('/login', (req,res) => {
  res.render('login')
})

app.post('/register',(req,res) => {

  let username = req.body.username
  let password = req.body.password

  db.oneOrNone('SELECT userid FROM users WHERE username = $1',[username])
  .then((user) => {
    if(user) {
      res.render('register',{message: "User name already exists!"})
    } else {
      // insert user into the users table
        bcrypt.hash(password,SALT_ROUND, function(error,hash){
            if (error ==null ){
                db.none('INSERT INTO users(username,password) VALUES($1,$2)',[username,hash])
                .then(()=>{
                    res.send('SUCCESS')
                })
            }
        })
    }
  })

})

app.get('/register',(req,res) => {
  res.render('register')
})

app.listen(PORT,() => {
  console.log(`Server has started on ${PORT}`)
})


