const express = require('express')
const fs = require('fs');
const body = require('body-parser');
const app = express()
const cors = require('cors');
app.use(cors());
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(body.json());

app.get('/details', (req, res) => {
    res.json(parseJson());
    return false;
})

app.post('/create', (req, res) => {     
    fs.writeFileSync('details.json', JSON.stringify(req.body));
    res.status(200).json({message: 'User Detail is successfully added'});
    return false;
})

function parseJson() {
    const datas = fs.readFileSync('details.json');
    const getDetails = JSON.parse(datas);
    return getDetails;
}

app.listen(8000, () => {
    console.log('8000');
})