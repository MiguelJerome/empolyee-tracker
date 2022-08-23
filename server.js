var express = require("express");
const connection = require('./db');
const init = require("./index");
const main = require('./index');
const PORT = process.env.PORT || 3005;
var app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(PORT, function(){
  console.log(`App listening on port ${PORT}!`);
}
);

connection.connect((err) =>{

  if(!err)
  console.log('DB succeed');
  else
  console.log('DB failed');
});

init();