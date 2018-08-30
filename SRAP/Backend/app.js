const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database,{useMongoClient: true});

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database')
});

mongoose.connection.on('error', (err)=>{
    console.log('Database Error: '+err)
});

const api = require('./routes/router');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res)=>{
    res.json({msg:'Connected to /'})
})

app.listen(port, ()=>{
    console.log('Server started on port '+port);
})