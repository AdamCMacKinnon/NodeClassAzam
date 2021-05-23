
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const path = require('path')
const bodyParser = require('body-parser')
const models = require('./models')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3000
const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')

app.get('/register',(req,res) => {
  res.render('register')
})

app.post('/register', async (req,res) => {

  let username = req.body.username
  let password = req.body.password

  let persistedUser = await models.User.findOne({
    where: {
      username: username
    }
  })
  if(persistedUser == null){

    bcrypt.hash(password, SALT_ROUNDS, async (error, hash)=>{
      if(error){
        res.render('/register', {message: 'There was an error'})
      } else {
        let user = models.User.build({
          username: username,
          password: hash
        })
        let savedUser = await user.save()
        if(savedUser != null){
          res.redirect('/login')
        } else {
          res.render('/register', {message: "User Already Exists"})
        }
      }
    
    })
      }
    })

 

app.listen(PORT,() => console.log('Server is running...'))

app.get('/login', (req,res) => {
  res.render('login')
})