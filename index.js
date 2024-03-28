require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser');
const URL = require("url").URL;
const dns = require('node:dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const findUrl = require('./myapp.js').findFullUrl



const createUrl = require('./myapp.js').createShortUrl

app.post('/api/:shorturl', function(req, res) {
  
 const  url =  new URL(req.body.url);
 dns.lookup (url.hostname , (err, address, family)=>{
  if(err){
      return res.json({ error: 'invalid url'});
  }else{
       createUrl(req.body.url, (err, data)=>{
        if(err){
          return res.json({ error: 'invalid url'});
        }else{
          res.json({ original_url: data.original_url , short_url : data.short_url});
        }

       } )
       
  } 
  });
 
});

app.get('/api/shorturl/:short_url', function(req, res) {
  findUrl(req.params.short_url, (err, data)=>{
    console.log("data:"+data.original_url)
   
    if(err){
      return res.json({ error: 'invalid url'});
    }else{
          return res.redirect(data.original_url);
    }
  })
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
