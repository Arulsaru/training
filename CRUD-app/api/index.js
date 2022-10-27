const express = require('express')
const fs = require('fs');
const body = require('body-parser');
const _ = require('lodash');
const {MAX_LIMIT} = require('./constant-var');
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

app.get('/employees', (req, res) => {
    res.json(parseJson());
    // res.status(400).json({message: 'This Phone Number is already taken'});
    return false;
})

app.get('/employees/:page', (req, res) => {

    const getDetails = parseJson();
    let page = parseInt(req.params['page']);
    const limit = 10;

    if (!page) {
        page = 1;
    }

    const start = (page - 1) * limit;
    const end = page * limit;

    const result = getDetails.slice(start, end);
    const data = result;
    res.json(data);
    return false;
})

app.post('/create', (req, res) => {
    const employees = parseJson();
    const phoneNo = _.find(employees, {phone_number: parseInt(req.body.phone_number)});

    const ids = employees.map(object => {
        return object.user_id;
    })

    if (phoneNo) {
        res.status(400).json({message: 'This Phone Number is already taken'});
        return false;
    }

    const input = req.body;
    const maxId = _.max(ids) + 1;
    input.user_id = maxId;
    employees.push(input);
    fs.writeFileSync('details.json', JSON.stringify(employees));
    res.status(200).json({message: 'User Detail is successfully added'});
    return false;
})

app.put('/employees/:id', (req, res) => {
    const employees = parseJson();
    const employee = _.find(employees, {user_id: parseInt(req.params['id'])});
    const index = _.findIndex(employees, {'user_id': parseInt(req.params['id'])});
    let flag = false;

    if (index === -1) {
        res.status(400).json({message: 'Invalid User ID'});
        return false;
    }

    const employeesTemp = employees.map((employeeTemp, indexTemp) => {

        if (index !== indexTemp) {
            return employeeTemp;
        }
    })

    if (req.body.name) {
        employee.name = req.body.name;
        flag = true;
    }

    if (req.body.phone_number) {
        const employeeNumber = _.find(employeesTemp, {'phone_number': parseInt(req.body.phone_number)});
        if (employeeNumber) {
            res.status(400).json({message: 'This Phone Number is already taken'});
            return false;
        }
        employees[index].phone_number = req.body.phone_number;
        flag = true;
    }

    if (req.body.email) {
        const employeeEmail = _.find(employeesTemp, {email: req.body.email});

        if (employeeEmail) {
            res.json({message: 'This Email is already taken'});
            return false;
        }
        employees[index].email = req.body.email;
        flag = true;
    }

    if (flag) {
        fs.writeFileSync('details.json', JSON.stringify(employees));
        res.json({message: 'Updated Successfully'});
        return false;
    }

})

app.delete('/delete/:user_id', (req, res) => {

    const employees = parseJson();
    const employee = _.find(employees, {user_id: parseInt(req.params['user_id'])});

    if (!employee) {
        res.json({message: 'Invalid User ID'});
        return false;
    }

    _.remove(employees, {user_id: employee.user_id});
    fs.writeFileSync('details.json', JSON.stringify(employees));
    res.json({message: 'Deleted Successfully'});
    return false;
})

app.get('/employee/:id', (req, res) => {
    const employees = parseJson();
    const employee = _.find(employees, {user_id: parseInt(req.params.id)});

    if (!employee) {
        res.json({message: 'Invalid User ID'});
        return false;
    }

    res.json(employee);
    return false;
});


function parseJson() {
    const datas = fs.readFileSync('details.json');
    const getDetails = JSON.parse(datas);
    return getDetails;
}

app.listen(8000, () => {
    console.log('8000');
})