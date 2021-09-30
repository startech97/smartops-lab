const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const multer  = require("multer")
const flash = require('connect-flash')
const session = require('express-session')
var bodyParser = require('body-parser')
const AuthVariableForHbs = require('./middleware/variables')
require('dotenv').config()
const app = express()
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(session({
    secret: 'some string',
    resave: false,
    saveUninitialized: false
}))
app.disable('x-powered-by');
app.use(multer({storage:storageConfig}).single("filedata"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash())
app.use(AuthVariableForHbs)
app.use('/', router)



module.exports = app