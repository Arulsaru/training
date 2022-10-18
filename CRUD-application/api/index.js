const express = require('express');
const body = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const {MAX_LIMIT} = require('./constant.js');
var cors = require('cors');

const app = express();
app.use(body.json());
app.use(cors());

const port = 8000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function parseJSON() {
    const data = fs.readFileSync('employee-details.json');
    return JSON.parse(data);
}

app.get('/', (req, res) => {
    const employees = parseJSON();
    res.json(employees)
    return false;
})

app.get('/employee', (req, res) => {
    const employees = parseJSON();
    let pageNumber = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    !pageNumber ? pageNumber = 1 : null;
    !limit ? limit = 30 : null;
    MAX_LIMIT < limit ? limit = MAX_LIMIT : null;

    const startIdx = (pageNumber - 1) * limit;
    const endIdx = pageNumber * limit;
    const result = employees.slice(startIdx, endIdx);

    const data = {
        details: result,
        count: employees.length
    }

    res.send(data);
    return false;
})

app.post('/create', (req, res) => {
    const employees = parseJSON();
    const employee = _.find(employees, {phone_number: req.body.phone_number});

    // console.log(employees, employee);
    // return false;

    if (employee) {
        res.status(400).json({error: 'This phone number is already in use'});
        return false;
    }

    const ids = employees.map(object => {
        return object.user_id;
    })
    const input = req.body;
    const maxId = _.max(ids) + 1;
    input.user_id = maxId;
    employees.push(input);
    fs.writeFileSync('./employee-details.json', JSON.stringify(employees));
    res.json({msg: 'New Employee has been created and updated successfully'});
    return false;
})

app.put('/update', (req, res) => {
    const employees = parseJSON();
    let flag = 1;
    // let employee = _.find(employees, { user_id: parseInt(req.query.user_id) });

    let idx = _.findIndex(employees, {'user_id': parseInt(req.query.user_id)});

    if (idx === -1) {
        res.status(400).json({error: 'No user id found'});
        return false;
    }

    const tempEmployees = employees.map((tempEmployee, tempIdx) => {

        if (idx !== tempIdx) {
            return tempEmployee;
        }

    });

    if (req.query.first_name) {
        employees[idx].first_name = req.query.first_name;
        flag = 0;
    }

    if (req.query.last_name) {
        employees[idx].last_name = req.query.last_name;
        flag = 0;
    }

    if (req.query.phone_number) {
        flag = 0;
        const numberCheck = _.find(tempEmployees, {phone_number: req.query.phone_number});

        if (numberCheck) {
            res.status(400).json({error: 'This phone number is already in use'});
            return false;
        }

        employees[idx].phone_number = parseInt(req.query.phone_number);
    }

    if (flag) {
        res.status(400).json({error: 'No operations donee'});
        return false;
    }

    fs.writeFileSync('employee-details.json', JSON.stringify(employees));
    res.json({msg: 'Employee updated successfully'});
    return false;
})

app.delete('/delete', (req, res) => {
    const employees = parseJSON();
    let employee = _.find(employees, {user_id: parseInt(req.query.user_id)});

    let idx = _.findIndex(employees, {'user_id': parseInt(req.query.user_id)});

    if (idx === -1) {
        res.status(400).json({error: 'No user id found'});
        return false;
    }

    _.remove(employees, employee);

    fs.writeFileSync('employee-details.json', JSON.stringify(employees));
    res.json({msg: 'Employee deleted successfully'});
    return false;
});

app.get('/getone', (req, res) => {
    const employees = parseJSON();
    let idx = _.findIndex(employees, {'user_id': parseInt(req.query.user_id)});

    if (idx === -1) {
        res.status(400).json({error: 'No user id found'});
        return false;
    }

    res.json(employees[idx]);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.get('/page1', (req, res) => {
//   res.send('Page One')
// })

// app.get('/page2', (req, res) => {
//   res.send('Page Two')
// })

// app.get('/page3', (req, res) => {
//   res.send('Page Three')
// })

// app.get('/json', (req, res) => {
//   res.json({ namee: 'Arulmozhi Karunagaran', number: 6374553281, roll_no: '191EC112' })
// })

// app.get('/html', function (req, res) {
//   // res.sendFile(path.join(__dirname, '/index.html'));
//   res.sendFile('/index.html', { root: __dirname });
// });

// app.get('/xml', function (req, res) {
//   res.sendFile('/index.xml', { root: __dirname });
// });

// app.get('/image', function (req, res) {
//   res.sendFile('/my-pic.jpg', { root: __dirname });
// });

// app.get('/pdf', function (req, res) {
//   res.sendFile('/port-tutorial.pdf', { root: __dirname });
// });

// app.get('/gif', function (req, res) {
//   res.sendFile('/gif-image.gif', { root: __dirname });
// });

// app.get('/video', function (req, res) {
//   res.sendFile('/Network Ports Explained.mp4', { root: __dirname });
// });

// app.get('/', (req, res) => {
//   res.redirect('/page1');
// })

// app.use((req, res) => {
//   res.status(404);
//   res.send('Page Not Found')
// })
