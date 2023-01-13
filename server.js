const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 8000;
const oldFile = require('./data.json');

app.use(cors());
app.use(express.json());

fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  app.get("/data", (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data)
  });
});

app.post("/form", (req, res) => {
    let oldData = JSON.stringify(oldFile);
    let parsedData = JSON.parse(oldData);
    parsedData.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(parsedData), (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("File updated adding: " + JSON.stringify(req.body)); //y esto solo sale una vez
      }
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
});