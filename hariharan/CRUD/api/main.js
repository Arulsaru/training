const express = require('express');
const body = require('body-parser');
const _ = require('lodash');
const fd = require('fs');
const app = express();
const PORT = 3001;
const { maxLimit } = require('./limit');
const { parseInt } = require('lodash');
app.use(body.json());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
   next();
});

app.get('/', (req, res) => {
   res.status(404).send(' Page Not found');
   return false;
});

app.get('/page1', (req, res) => {
   res.send('hai killer');
   return false;
});

app.get('/page2', (req, res) => {
   res.send('hai Devil');
   return false;
});

app.get('/page3', (req, res) => {
   res.send('hell world');
   return false;
});

app.get('/employees/list', (req, res) => {
   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);

   res.json(employees);
   return true;
});

app.get('/json', (req, res) => {
   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);

   let page = parseInt(req.query.page);
   let limit = parseInt(req.query.limit);

   if (!page) {
      page = 1;
   }

   if (!limit) {
      limit = 5;
   }
   else {

      if (limit > 20) {
         limit = maxLimit;
      }
   }

   const start = (page - 1) * limit;
   const end = page * limit;
   const result = employees.slice(start, end);

   const list = {
      listDetails: result,
      count: employees.length,
   };

   res.send(list);
   return false;
});

app.post('/employees/create', (req, res) => {
   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);
   const userId = _.find(employees, { email: req.body.email});
   const empPhone = _.find(employees, { phone: req.body.phone});
   if (userId) {
      res.status(400).json({ error: 'This id already exists' });
      return false;
   }
   if (empPhone) {
      res.status(400).json({ error: 'This id already exists' });
      return false;
   }
   const ids = employees.map(obj => {
      return obj.id;
   });
   console.log(req.body);
   const input = req.body;
   const idk = _.max(ids) + 1;
   console.log(idk);
   input.id = idk;
   employees.push(req.body);
   fd.writeFileSync('./emp.json', JSON.stringify(employees));
   res.status(200).json({ message: 'Employee Details Added' });
   return false;
});
app.delete('/employees/:id/delete', (req, res) => {

   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);
   const userId = _.find(employees, { id: parseInt(req.query.id) });

   if (userId) {
      _.remove(employees, userId);
      fd.writeFileSync('./emp.json', JSON.stringify(employees));
      res.status(200).json({ message: 'The requested Id is removed' });
      return false;
   }
   else {
      res.status(400).json({ error: 'The user id is not found ' });
      return false;
   }
})

app.put('/employees/:id/edit', (req, res) => {
   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);
   const index = _.findIndex(employees, { id: parseInt(req.body.id) });
   const identity = _.find(employees, { id: parseInt(req.body.id) });
   const tempEmployees = employees.map((employeeTemp, indexTemp) => {

      if (index !== indexTemp) {
         return employeeTemp;
      }
   });
   const dupEmployee = _.find(tempEmployees, { phone: req.body.phone });
   if (identity) {

      if (dupEmployee) {
         res.status(400).json({ error: 'This number is already taken' });
         return false;
      }

      if (!dupEmployee && req.body.phone) {
         identity.phone = req.body.phone;
      }

      if (req.body.name) {
         identity.name = req.body.name;
      }
      if (req.body.email) {
         identity.email = req.body.email;
      }
   }

   else {
      res.status(400).json({ error: 'Your Id is not found!!!' })
      return false;
   }

   fd.writeFileSync('./emp.json', JSON.stringify(employees));
   res.status(200).json({ message: 'Updated Sucessfully' });
   return false;
});

app.get('/employees/:id/view', (req, res) => {

   const file = fd.readFileSync('emp.json');
   const employees = JSON.parse(file);
   const idn = parseInt(req.query.id);
   const identity = _.find(employees, { id: idn });
   if (identity) {
      res.send(identity);
      return false;
   }
   else {
      if (!identity) {
         res.status(400).json({ error: 'The given Id is not Found' });
         return false;
      }
   }

});

app.get('/pdf', (req, res) => {
   res.sendFile('C:/Users/Home/Documents/training/node-js/files/mock-resume.pdf');
   return false;
});
app.get('/img', (req, res) => {

   res.sendFile('/act-diagram.jpg', { root: __dirname });
   return false;
});
app.get('/html', (req, res) => {
   res.sendFile('/index.html', { root: __dirname });
   return false;
});

app.listen(PORT, (error) => {
   if (!error)
      console.log("Server is Successfully Running,and App is listening on port " + PORT);
   else
      console.log("Error occurred, server can't start", error);
});