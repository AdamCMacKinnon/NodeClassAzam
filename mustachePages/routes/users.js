const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {

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

router.get('/add-user', (req,res) => {
    res.render('add-user')
  })

router.post('/add-user', (req, res) => {
let name = req.body.name
let age = req.body.age
console.log(name)
console.log(age)
res.status(200).send()
})


router.get('/users', (req, res) => {
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
  
module.exports = router