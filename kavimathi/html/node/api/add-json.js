const express = require('express');
const body = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const app = express();
app.use(body.json());
const PORT = 3700;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/data', (req, res) => {
    const rawData = fs.readFileSync('json-employee.json');
    const data = JSON.parse(rawData);
    let page = req.query.page;
    let limit = req.query.limit;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 100;
    }

    // if (limit > 20) {
    //     limit = 20;
    // }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const resultData = data.slice(startIndex, endIndex);
    const Data = {
        Data: resultData,
        count: data.length
    }
    res.send(Data);
})

app.post('/create', (req, res) => {
    const rawData = fs.readFileSync('json-employee.json');
    const employees = JSON.parse(rawData);
    let user = _.find(employees, { email: req.body.email });
    console.log(user);
    let maxVal = employees[employees.length - 1].user_id;
    console.log(maxVal);
    if (req.body.user_name === '' || req.body.name === '' || req.body.email === '' || req.body.job_title === '') {
        res.status(400).json({ error: 'Enter all fields' });
        return false;
    }
    if (user) {
        res.status(400).json({ error: 'This email has already been taken' });
        return false;
    }

    employees.push(req.body);
    employees.count += 1;

    fs.writeFile('./json-employee.json', JSON.stringify(employees), err => {

        if (err) {
            console.log('Error writing file:', err);
        }

    });

    res.json({ msg: 'Employee details added successfully!' });
    return false;
})

app.get('/get1', (req, res) => {
    const rawData = fs.readFileSync('json-employee.json');
    const employees = JSON.parse(rawData);
    let user = _.find(employees, { user_id: req.body.user_id });
    res.send(user);
})

app.put('/update', (req, res) => {
    const rawData = fs.readFileSync('json-employee.json');
    const employees = JSON.parse(rawData);
    let user = _.find(employees, { user_id: req.body.user_id });
    console.log(user, 'user');

    if (!user) {
        res.status(400).json({ error: 'There is no user for the given user id' });
        return false;
    }

    if (req.body.name) {
        user.name = req.body.name;
    }

    let emailCheck = _.find(employees, { email: req.body.email });
    console.log(emailCheck, 'emil check');

    if (!emailCheck || req.body.email === user.email) {
        if (req.body.email) {
            user.email = req.body.email;
        }
    }
    else {
        res.status(400).json({ error: 'This email is already taken' });
        return false;
    }

    if (req.body.job_title) {
        user.job_title = req.body.job_title;
    }

    fs.writeFile('./json-employee.json', JSON.stringify(employees), err => {

        if (err) {
            console.log('Error writing file:', err);
        }

    });

    res.json({ msg: 'Employee details updated successfully!' });
    return false;
})

app.delete('/delete', (req, res) => {
    const rawData = fs.readFileSync('json-employee.json');
    const employees = JSON.parse(rawData);
    let user = _.find(employees, { user_id: req.body.user_id });
    const index = _.findIndex(employees, { user_id: req.body.user_id });

    if (!user) {
        res.status(400).json({ error: 'There is no user for the given user id' });
        return false;
    }

    result = _.remove(employees, employees[index]);
    console.log(result);

    fs.writeFile('./json-employee.json', JSON.stringify(employees), err => {

        if (err) {
            console.log('Error writing file:', err);
        }

    });
    res.json({ msg: 'Employee details deleted successfully!' });
    return false;

})

app.get('/form', (req, res) => {
    res.sendFile('/form-emp.html', { root: __dirname });
})

app.listen(PORT)