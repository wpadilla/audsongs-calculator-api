const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('file-system');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const dataFile = `${__dirname}/../model/data.json`;
const backupDir = `${__dirname}/../model/backup/data.json`;

app.get('/get-sales-data', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        res.status(200).json(JSON.parse(data.toString()));
    });
});


app.post('/save-sales-data', (req, res) => {
    // backing up
    fs.copyFile(dataFile, backupDir);
   fs.writeFile(dataFile, JSON.stringify(req.body), () => {
       res.status(200).json({ status: 'success' });
   })
});
server.listen(80, () => {
    console.log('Server running');
});

