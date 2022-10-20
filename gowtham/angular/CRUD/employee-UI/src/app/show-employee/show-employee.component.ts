import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

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

    let resultMessage: string = '';

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the Employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.service.removeData(id).subscribe(res => {
          resultMessage = Object.values(res)[0];
          Swal.fire(resultMessage, '', 'success').then(result => {
            if (result.value) {
              this.router.navigate(['employees']);
              window.location.reload();
            }
          });
        },);
        // Swal.fire(
        //   'Deleted!',
        //   'Employee deleted successfully.',
        //   'success').then(result => {
        //     if (result.value) {
        //       window.location.reload();
        //     }
        //      return this.service.removeData(id).subscribe();
        //   })
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled!', 'Unable to delete Employee.', 'error');
      }
    });
  }

  viewEmployee(get: string) {
    this.router.navigate([`${get}`]);
    return this.element = false;
  }

  // editEmployee(edit: string, id: number) {
  //   this.editId(id);
  //   this.router.navigateByUrl('employees/update/' + id);
  //   return this.element = false;
  // }

  editEmployee(edit: string, data: any) {

    this.editId(data.id);
    let url = 'employees/update/' + data.id;
    this.router.navigateByUrl(url);
    // this.service.shareDetails(data);
    return this.element = false;
  }

  editId(id: number) {

    // return this.service.updateData(id);
  }

  ngOnInit(): void;

  ngOnInit() { }
}
