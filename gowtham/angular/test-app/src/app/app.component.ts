import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from './employees.service';
import { HttpClient } from '@angular/common/http';
// import employee from 'employee-details/employee.json';

// interface employees {
//   id: string;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   email: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'test-app';
  page: number = 1;
  limit: number = 5;
  element = true;
  employeeData: Array<any> = [];
  
  constructor(private router: Router, private service: EmployeesService) {

   this.service.getAllEmployees().subscribe((response) => {
    this.employeeData = response;
    console.log(this.employeeData)
   })
  } 

  addEmployee(add: string) {
    this.router.navigate([`${add}`]);
    return this.element = false;
  }

  deleteEmployee(id: number) {

    return this.service.removeData(id).subscribe();
  }

  viewEmployee(get: string) {
    this.router.navigate([`${get}`]);
    return this.element = false;
  }

  editEmployee(edit: string, id: number) {
    this.editId(id);
    this.router.navigate([`${edit}`]);
    return this.element = false;
  }

  editId(id: number) {

    return this.service.updateData(id);
  }


  ngOnInit(): void;

  ngOnInit() {}

  // Employees: { id: String, first_name: string, last_name: string, phone_number: string, email: string }[] = employee;

  
  
 // D: Date = new Date();
  // seconds = this.D.getSeconds();

  // images = [
  //   'https://s3.srkeglobalenergyworld.com/production/energy-type-image/1626031617-60eb460185978.jpg',
  //   'https://s3.srkeglobalenergyworld.com/production/energy-type-image/1626033139-60eb4bf3b8510.jpg',
  //   'https://s3.srkeglobalenergyworld.com/production/energy-type-image/1626031000-60eb4398421c3.jpg'
  // ]
  
  // constructor() {
    
  //   if(this.seconds%2==0) {
  //     console.log("even");
  //   }
  //   else {
  //     console.log("odd");
  //   }
  // }

  // changeColor() {
    
  // }

  // showLifeCycle: boolean = false;

  // value: string = 'friday';

  // constructor(private router: Router){

  // }

  // display(): void {
  //   this.showLifeCycle = !this.showLifeCycle;
  // }
}
