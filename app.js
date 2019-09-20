const express = require('express')
const expressLayouts = require('express-ejs-layouts');

const app = express();


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log(`listening on port: ${PORT}`));

