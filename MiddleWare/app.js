const express = require('express')
const app = express()

//CUSTOM MIDDLEWARE

// app.use(log)


// function log(req,res,next) {
//     console.log("[logged]")
//     console.log("[logged]")
//     console.log("[logged]")
//     next()
// }

// app.get('/', log, (req, res) => {
//   res.send('ROOT')
// })
// app.get('/login', log, (req, res) => {
//   res.send('login')
// })

app.listen(5000, () => {
  console.log('server is running')
})