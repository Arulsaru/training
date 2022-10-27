import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RedirectService } from '../services/redirect.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validator, Validators} from '@angular/forms' 

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

export class FormComponentComponent implements OnInit {
  
  addUserForm = this.formBulider.group( {
    name: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]]
  })

  name:string = '';
  phoneNumber:string= '';
  email:string='';

  editUserData:object = {};

  constructor(private service: RedirectService, private router: Router, private formBulider: FormBuilder) {
    
  }

  ngOnInit(): void {
  
  }

  onSubmit() {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createDataSend(this.addUserForm.value)
          .subscribe(
              (response: any) => {
                Swal.fire(response.message, '', 'success')
              },
              (error: any) => {
                Swal.fire(error.error.message, '', 'error')
              },
            );

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })       
    }

  previousPage() {
    this.router.navigateByUrl('/');
  }
}

function subscribe(arg0: (result: string) => void) {
  throw new Error('Function not implemented.');
}

