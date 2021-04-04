const express = require('express')
const app = express();


//routes
app.get('/', (req, res) => {
  res.send('hello express!')
})

app.get('/movies/comedy', (req, res) => {
  res.send('Comedy Movies')
})
app.get('/movies/romance', (req, res) => {
  res.send('Romance Movies')
})
app.get('/movies/action', (req, res) => {
  res.send('Action Movies')
})




// app.get('/movies/year', (req, res) => {
//   res.send('movies/year')
// })




app.listen(5000, () => {
  console.log("Sever is running on port 5000")
})
