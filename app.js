const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')

const app = express();

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));
//BodyParser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log(`listening on port: ${PORT}`));

