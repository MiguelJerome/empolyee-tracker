var express = require("express");
const connection = require('./db');
const init = require("./index");
const main = require('./index');

var app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(3005, function(){
  console.log('App listening on port 3005');
}
);

connection.connect((err) =>{

  if(!err)
  console.log('DB succeed');
  else
  console.log('DB failed');
});

init();