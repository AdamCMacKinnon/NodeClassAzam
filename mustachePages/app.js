const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const path = require('path');
const userRoutes = require('./routes/users')

app.use(express.json()) // THIS IS TO REPLACE BODY PARSER, WHICH IS DEPRECATED
app.use(express.urlencoded({extended: false}));


const VIEWS_PATH = path.join(__dirname, '/views')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

function authenticate(req, res, next){
    if(req.session) {
        if(req.session.name){
            next()
        } else {
            res.redirect('/users/add-user')
        }
    } else {
        res.redirect('/users/add-user')
    }
}

app.use('/users',authenticate, userRoutes)


app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine','mustache')

app.use('/css',express.static("css"))


app.listen(5000, () => {
 console.log('server is running')
})