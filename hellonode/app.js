/*
This is an example of "pure node" routing without express.  It is cumbersome but shows how to use a switch statement when setting routes and paths.  It's not efficient and isn't scalable but at least shows the "theory" behind a basic node app.
*/

const http = require('http')
const fs = require('fs')
const PORT = 5000;

const server = http.createServer((req, res) =>{

    switch(req.url) {
        case '/':
            fs.readFile('./index.html',(error,data)=>{
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(data)
            })
            break
        case '/hello':
            fs.readFile('./hello.html',(error,data)=>{
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(data)
            })
            break
        default:
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('Not found!')

    }
})

server.listen(PORT, ()=>{
    console.log('Server is running on port 5000')
})