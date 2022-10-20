const express = require('express');
const fs = require('fs');
const body = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const { MAX_LIMIT } = require('./constant');
const app = express();

// const page1route = require('./page1');
// const page2route = require('./page2');
// const page3route = require('./page3');



app.use(cors());
app.use(body.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('CRUD Application!!')
});

// app.use('/page1', page1route);
// app.use('/page2', page2route);
// app.use('/page3', page3route);

app.listen((4000), () => {
    console.log('Server is Running at 4000')
});

// app.get('/html', (req, res) => {
//     console.log(__dirname)
//     res.sendFile('/ind.html', { root: __dirname })
// });

// app.get('/xml', (req, res) => {
//     res.sendFile('/indXml.xml', { root: __dirname })
// });

// app.get('/img', (req, res) => {
//     res.sendFile('/resume.jpg', { root: __dirname })
// });

// app.get('/video', (req, res) => {
//     res.sendFile('/ponninadhi.mp4', { root: __dirname })
// });

app.get('/employees', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    res.json(employees);
});

app.get('/', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    res.json(employees);
});

app.get('/employee', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (!page) {
        page = 1;
    }
    else if (!limit) {
        limit = 10;
    }
    else if (!page && !limit) {
        page = 1;
        limit = 10;
    }

    if (limit > 20) {
        limit = MAX_LIMIT;
    }

    const start = (page - 1) * limit;
    const end = page * limit;
    const results = employees.slice(start, end);

    const details = {
        details: results,
        count: employees.length,
    }

    res.send(details);
    return false;
});

// app.post('/create', (req, res) => {
//     const employees = parseJSON();
//     let employee = _.find(employees, { phone_number: req.body.phone_number });

//     if (employee) {
//         res.status(400).json({ error: 'This phone number is already in use' });
//         return false;
//     }

//     const ids = employees.map(object => {
//         return object.user_id;
//     })
//     const input = req.body;
//     const maxId = _.max(ids) + 1;
//     input.user_id = maxId;

//     employees.push(input);
//     fs.writeFileSync('./employee-details.json', JSON.stringify(employees));
//     res.json({ msg: 'New Employee has been created successfully' });
//     return false;
// })

app.post('/employees/:create', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    const info = _.find(employees, { phone_number: req.body.phone_number });
    const infoEmail =  _.find(employees, { email: req.body.email });
    if (info) {
        res.status(400).json({ error: 'This Phone Number is already taken' });
        return false;
    }
    if (infoEmail) {
        res.status(400).json({ error: 'This Email is already taken' });
        return false;
    }


    const ids = employees.map(object => {
        return object.id;
    });

    const input = req.body;
    const maxId = _.max(ids);

    input.id = maxId + 1;

    employees.push(req.body);

    const addData = JSON.stringify(employees);

    fs.writeFileSync('employee.json', JSON.stringify(employees));

    if (addData) {
        res.status(200).json({ message: 'Employee added successfully' });
        return false;
    }
});

app.put('/employees/update/:id', (req, res) => {

    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    const index = _.findIndex(employees, { id: parseInt(req.body.id) });
    const info = _.find(employees, { id: parseInt(req.body.id) });

    const tempEmployees = employees.map((employeeTemp, indexTemp) => {

        if (index !== indexTemp) {
            return employeeTemp;
        }
    });

    const employee = _.find(tempEmployees, { phone_number: req.body.phone_number });
    const emailEmployee = _.find(tempEmployees, { email: req.body.email });

    if (info) {
        if (employee) {
            res.status(400).json({ error: 'This Phone Number is already taken' });
            return false;
        }
        if(emailEmployee) {
            res.status(400).json({ error: 'This Email is already taken' });
            return false;
        }

        if (!employee && req.body.phone_number) {
            info.phone_number = req.body.phone_number;
        }

        if (req.body.first_name) {
            info.first_name = req.body.first_name;
        }

        if (req.body.last_name) {
            info.last_name = req.body.last_name;
        }

        if (req.body.email) {
            info.email = req.body.email;
        }
    }

    else {
        res.status(400).json({ error: 'Employee not found!' })
        return false;
    }

    fs.writeFileSync('employee.json', JSON.stringify(employees));
    res.status(200).json({ message: 'Employee Updated Sucessfully' });
    return false;
});

// app.put('/employees/:id/update', (req, res) => {
//     const data = fs.readFileSync('employee.json');
//     const employees = JSON.parse(data);


//     let flag = false;

//     for(let i = 0; i < employees.length; i++) {

//         if(employees[i].id == req.query.id) {
//             flag = true;

//             if(req.query.phone_number) {
//                 const info = _.find(employees, { phone_number: req.query.phone_number });

//                 if(info) {
//                     res.status(400).json({ error: 'This Phone Number is already taken' });
//                     return false;
//                 }
//                 else {
//                     employees[i].phone_number = req.query.phone_number;
//                     const updateData = JSON.stringify(employees);

//                     fs.writeFileSync('employee.json', JSON.stringify(employees));

//                     if(updateData) {
//                         res.status(200).json({ message: 'Employee\'s Phone Number updated successfully' });
//                         return false;
//                     } 
//                 }
//             }
//             else if(req.query.first_name) {
//                 employees[i].first_name = req.query.first_name;
//                 const updateData = JSON.stringify(employees);

//                 fs.writeFileSync('employee.json', JSON.stringify(employees));

//                 if(updateData) {
//                     res.status(200).json({ message: 'Employee\'s First Name updated successfully' });
//                     return false;
//                 } 
//             }
//             else if(req.query.last_name) {
//                 employees[i].last_name = req.query.last_name;
//                 const updateData = JSON.stringify(employees);

//                 fs.writeFileSync('employee.json', JSON.stringify(employees));

//                 if(updateData) {
//                     res.status(200).json({ message: 'Employee\'s Last Name updated successfully' });
//                     return false;
//                 } 
//             }
//             else if(req.query.email) {
//                 const info = _.find(employees, { email: req.query.email });

//                 if(info) {
//                     res.status(400).json({ error: 'This email is already taken' });
//                     return false;
//                 }
//                 else {
//                     employees[i].email = req.query.email;
//                     const updateData = JSON.stringify(employees);

//                     fs.writeFileSync('employee.json', JSON.stringify(employees));

//                     if(updateData) {
//                         res.status(200).json({ message: 'Employee\'s email updated successfully' });
//                         return false;
//                     }  
//                 }                
//             }
//         } 
//     }    

//     if(flag == false) {
//         res.status(400).json({ error: 'The given id is not present' });
//         return false;
//     }  
// });

app.delete('/employees/:delete', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    const info = _.find(employees, { id: parseInt(req.query.id) });

    if (info) {
        _.remove(employees, info);
        fs.writeFileSync('employee.json', JSON.stringify(employees));
        res.status(200).json({ msg: 'Employee has been deleted successfully' });
        return false;
    }
    else {
        res.status(400).json({ error: 'Employee is not found!' });
        return false;
    }
});

app.get('/employees/:id', (req, res) => {
    const data = fs.readFileSync('employee.json');
    const employees = JSON.parse(data);

    const info = _.find(employees, { id: parseInt(req.params[('id')]) });

    if (info) {
        res.status(200).json(info);
        return false;
    }
    else {
        res.status(400).json({ error: 'Employee not found!' });
        return false;
    }
});
