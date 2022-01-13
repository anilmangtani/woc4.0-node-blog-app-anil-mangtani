const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));

//pass request to body parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine as ejs
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

//load routers
app.use('/',require('./server/routes/router'));

//listening app on port 8080 if we dont have .env file
app.listen(PORT,()=>{
    console.log(`App listen on port http://localhost:${PORT}`)
})



