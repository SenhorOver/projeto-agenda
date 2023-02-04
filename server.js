require('dotenv').config()

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const mongoose = require('mongoose')
const csurf = require('tiny-csrf')
const cookieParser = require('cookie-parser')
const { middlewareGlobal, erroCSRF } = require('./src/middlewares/middleware')
const route = require('./router')

const app = express()
const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connectado na DB')
        app.emit('pronto')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')


//Permitir receber dados via post (formulário)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(cookieParser("cookie-parser-secret"))

const sessionOptions = session({
    secret: 'ljkhfsalfhjdslkfjsd sdflkj sflsdkjçfsldkç fsdlkjfsd ksdlkjfsalkf sdlkf d(dsalkfjsdf0)(()ddsajfja',
    store: MongoStore.create( { mongoUrl: process.env.CONNECTIONSTRING } ),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csurf("123456789iamasecret987654321look"))
app.use(middlewareGlobal)
app.use(erroCSRF)
app.use(route)

app.use('/', function(req, res){
    res.render('erro404',{
        pageTitle: '404 - Not Found',
    })
})

app.on('pronto', () => {
    const port = process.env.PORT || 8080
    app.listen(port, () => console.log('Servidor executando na porta', port))
})