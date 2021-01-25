const express = require('express');
const app = express();
const http = require('http');
const createDb = require('./model/dbsetup');
const apiRouter = require('./routes/apiRoutes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(fileUpload());
//To upload the CSV
app.use('/api', apiRouter);
//To create the sample DB structure with dummy data
app.get('/setupdb', (req, res, next)=>{
    createDb.setupDb().then( data=>{
        res.send(data);
    }).catch( err=>{
        next(err);
    })
});

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log('Server started on port 3000..');
});