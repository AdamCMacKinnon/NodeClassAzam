const express = require('express')
const app = express();

app.use(express.json()) // THIS IS TO REPLACE BODY PARSER, WHICH IS DEPRECATED
app.use(express.urlencoded({extended: true}));

//routes
// app.get('/', (req, res) => {
//   res.send('hello express!')
// })

// QUERY STRING PARAMATERS
// app.get('/movies', (req, res) => {
//   res.send('Movies')
//   console.log(req.query.sort)
//   console.log(req.query.page)
// })


// USING JSON AS DATA FORMAT
// app.get('/movies', (req,res) => {
//   let movies = [
//     { title: "Lord of the Rings", year: 2001 },
//     { title: "Spiderman", year: 2018 },
//     { title: "Black Sheep", year: 1997 }
//   ]

//   // let movie = { title: "Lord of the Rings", year: 2001 }

//   res.json(movies)


// })

//HTTP POST (USED POSTMAN/BODY PARSER)

// app.get('/movies', (req,res) => {
//   res.send("Movies!")
// })

// app.post('/movies', (req,res) => {
//   let title = req.body.title
//   let year = req.body.year
//   console.log(title)
//   console.log(year)
//   res.send("OK")
// })



app.listen(5000, () => {
  console.log("Sever is running on port 5000")
})
