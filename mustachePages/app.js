const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
app.use(express.json()) // THIS IS TO REPLACE BODY PARSER, WHICH IS DEPRECATED
app.use(express.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine','mustache')

app.get('/add-user', (req,res) => {
  res.render('add-user')
})

app.post('/add-user', (req, res) => {
  let name = req.body.name
  let age = req.body.age
  console.log(name)
  console.log(age)
  res.status(200).send()
}
)

app.get('/users', (req, res) => {
  let users = [
      {
          name: "John Doe",
          age: 34
      },
      {
          name: "Adam Mack",
          age: 29
      },
      {
          name: "Jane Doe",
          age: 40
      }
  ]
  users = []
  res.render('users', {users: users})
})


app.get('/', (req,res) => {

    let user = {
        name: "John Doe",
        address: {
            street: "789 street",
            city: "Houston",
            state: "TX"
        }
    }

  res.render('index', user)
})

app.listen(5000, () => {
 console.log('server is running')
})