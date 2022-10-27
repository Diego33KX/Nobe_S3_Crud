const express = require('express')
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const app = express();

const db = require('./db')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static('public'))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    debug:true
}));

const contactos = require('./routes/contactos')
app.use(contactos)

app.get('/',(req,res)=>{
    res.send('hola mundo')
})
app.listen(3000,() => {
    console.log("Server UP! en http://localhost:3000")
})