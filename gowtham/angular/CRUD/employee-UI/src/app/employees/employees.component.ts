import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  createForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]]
  });

  constructor(private formBuilder: FormBuilder, private service: EmployeesService, private router: Router) { }

  addNewData(newData: any){

    let resultMessage: string = '';  

    Swal.fire({
      title: 'Do you want to create?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Create',
      denyButtonText: `Don't Create`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.sendData(newData).subscribe( res => {
          resultMessage = Object.values(res)[0];
          Swal.fire(resultMessage, '', 'success').then(result => {
            if (result.value) {
              this.router.navigate(['employees']);
            }
          });
        },
        err => {          
          resultMessage = err.error.error;
          Swal.fire(resultMessage, '', 'error').then(result => {
        });
        });
      }
      else if (result.isDenied) {
        Swal.fire('Details are not saved', '', 'info');
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled!', 'Unable to Create Employee.', 'error').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        });
      }
    })

    // Swal.fire('Success',
    //   'Employee created successfully!',
    //   'success').then(result => {
    //     if (result.value) {
    //       this.router.navigate(['employees']);
    //     }
    //   });
    //   return this.service.sendData(newData).subscribe();
  }

  // addData(newData: any) {

  //   Swal.fire('Success',
  //     'Employee created successfully!',
  //     'success').then(result => {
  //       if (result.value) {
  //         this.router.navigate(['employees']);
  //       }
  //     })
      
  //   return this.service.sendData(newData).subscribe();
  // }

 editPrev(perv: string){
  this.router.navigate(['employees']);                                                                                                                                                                                                                                                                                                                                          
 }
  
  ngOnInit(): void { }
}
