import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  updateForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
  });

  public employee_id: number = 0;
  public employee: any = {
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: 0,
    email: ''
  }

  constructor(private formBuilder: FormBuilder, private service: EmployeesService, private router: Router, private activeRouter: ActivatedRoute) {

    activeRouter.params.subscribe((params) => {
      this.employee_id = params['id'];
    });

    // this.employee_id = this.service.getId();
    // this.employee.first_name = this.service.getFirstName();
    // this.employee.last_name = this.service.getLastName();
    // this.employee.phone_number = this.service.getPhoneNumber();
    // this.employee.email_id = this.service.getEmail();
  }

  ngOnInit(): void { 
    this.service.getData(this.employee_id).subscribe((response) => {
      this.employee = response;
    });
  }

  dataObject = {
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: 0,
    email: ''
  }

  updateData(employee: any) {


    let resultMessage: string = '';

    this.dataObject.id = this.employee_id;
    this.dataObject.first_name = employee.first_name;
    this.dataObject.last_name = employee.last_name;
    this.dataObject.phone_number = employee.phone_number;
    this.dataObject.email = employee.email;

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.update(this.dataObject, this.employee_id).subscribe( res => {
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
        Swal.fire('Changes are not saved', '', 'info');
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled!', 'Unable to update Employee.', 'error').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        });

      }
    })

    // return this.service.update(this.dataObject).subscribe((response) => {
    //   // results = response;
    //   console.log(response);
    // });
  }

  // update(employee: any) {

  //   let results = '';

  //   this.dataObject.id = this.id;
  //   this.dataObject.first_name = employee.first_name;
  //   this.dataObject.last_name = employee.last_name;
  //   this.dataObject.phone_number = employee.phone_number;
  //   this.dataObject.email = employee.email;

  //   Swal.fire({
  //     title: 'Do you want to save the changes?',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Save',
  //     denyButtonText: `Don't save`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire('saved', '', 'success').then(result => {
  //         if (result.value) {
  //           this.router.navigate(['employees']);
  //         }
  //       })
  //     }
  //     else if (result.isDenied) {
  //       Swal.fire('Changes are not saved', '', 'info');
  //     }
  //   })

  //   return this.service.update(this.dataObject).subscribe((response) => {
  //     // results = response;
  //     console.log(response);
  //   });

  // }

  updateFirstName(firstName: string) {

    // Swal.fire('Success',
    //   'First Name updated successfully!',
    //   'success').then(result => {
    //     if (result.value) {
    //       this.router.navigate(['employees']);
    //     }
    //   })

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    })

    return this.service.firstName(firstName).subscribe();
  }

  updateLastName(lastName: string) {

    // Swal.fire('Success',
    //   'Last Name updated successfully!',
    //   'success').then(result => {
    //     if (result.value) {
    //       this.router.navigate(['employees']);
    //     }
    //   })

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    })

    return this.service.lastName(lastName).subscribe();
  }

  updatePhoneNumber(phoneNumber: number) {

    // Swal.fire('Success',
    //   'Phone Number updated successfully!',
    //   'success').then(result => {
    //     if (result.value) {
    //       this.router.navigate(['employees']);
    //     }
    //   })

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    })

    return this.service.phoneNumber(phoneNumber).subscribe();
  }

  updateEmail(email: string) {

    // Swal.fire('Success',
    //   'Email updated successfully!',
    //   'success').then(result => {
    //     if (result.value) {
    //       this.router.navigate(['employees']);
    //     }
    //   })

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(result => {
          if (result.value) {
            this.router.navigate(['employees']);
          }
        })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    })

    return this.service.email(email).subscribe();
  }

  editPrev(perv: string) {
    this.router.navigate(['employees']);
  }
}