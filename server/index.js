const fs = require('fs');
const express = require("express");
const { nextTick } = require('process');

const app = express();

const PORT = "3000";

const DB = './db/db2.json'


function readFiles(){
    fs.readFile(DB, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        // data is coming as string, tested with data[0]
        console.log(data);
      });
      
}

function appendFiles(){
  fs.readFile(DB, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let parsed = JSON.parse(data);
    console.log(parsed);
    let mockData = {
      "title": "Mock Title",
      "text": "Mock Text"
    }
    
    parsed.push(mockData);
    
    let stringified = JSON.stringify(parsed);
    
    console.log(stringified);

    writeFiles(parsed);
  });
}

function writeFiles(contentInJSON){
  var jsonString = JSON.stringify(contentInJSON)
  fs.writeFile(DB, jsonString, err => {
    if (err) {
      console.error(err)
      return
    }

    console.log("File written");
  });
}



appendFiles();


app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, ()=> {
  console.log(`Note taker app listening at http://localhost:${PORT}`)
})