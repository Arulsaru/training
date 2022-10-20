import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  title = 'test-app';
  page: number = 1;
  limit: number = 5;
  displayElement = false;
  employeeId = true;
  employeeData: Array<any> = [];

  constructor(private service: EmployeesService, private router: Router) {

    this.service.getAllEmployees().subscribe((response) => {
      this.employeeData = response;
      console.log(this.employeeData)
     })
    }

  viewEmployee(id: any) {

    this.employeeId = false;
    this.displayElement = true;
     return this.service.viewData(id.id);
  }

  deleteEmployee(id: number) {

    return this.service.removeData(id).subscribe();
  }

  editEmployee(edit: string, id: number) {
    this.editId(id);
    this.router.navigate([`${edit}`]);
    return this.displayElement = false;
  }

  editId(id: number) {

    return this.service.updateData(id);
  }

  ngOnInit(): void {
  }

}
