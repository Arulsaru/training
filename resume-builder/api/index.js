const express = require('express')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const fs = require('fs');
const port = 3000

var cors = require('cors');
const app = express();
app.use(cors());

function parseJSON() {
  const data = fs.readFileSync('user-details.json');
  console.log(typeof data);
  return JSON.parse(data);
}

app.get('/', (req, res) => {
  const details = parseJSON();
  res.json(details)
  return false;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/create', jsonParser, (req, res) => {

  let number = 10;
  console.log(number);
  number = 'Arulmozhi';
  console.log(number);

  fs.writeFileSync('user-details.json', JSON.stringify(req.body));
  res.json({ msg: 'User created', data: req.body });
  return false;
})

// function parseJSON() {
//   const data = fs.readFileSync('employee-details.json');
//   return JSON.parse(data);
// }