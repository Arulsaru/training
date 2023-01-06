const express = require('express');
const fs = require('fs');
const body = require('body-parser');
const cors = require('cors');

const app = express();

app.use(body.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen((4000), () => {
    console.log('Server is Running at 4000')
});

app.get('/resume-data', (req, res) => {
    const data = fs.readFileSync('resume.json');
    const resumeData = JSON.parse(data);

    res.json(resumeData);
});

app.post('/download', (req, res) => {
    fs.writeFileSync('resume.json', JSON.stringify(req.body));
    
    res.status(200).json({ message: 'Resume Created' });
    return false;

});

app.get('/', (req, res) => {
    const data = fs.readFileSync('resume.json');
    const resumeData = JSON.parse(data);

    res.json(resumeData);
});