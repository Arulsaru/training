import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RedirectService } from '../services/redirect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

export class FormComponentComponent implements OnInit {

  name:string = '';
  phoneNumber:string= '';
  email:string='';

  editUserData:object = {};

  constructor(private service: RedirectService, private router: Router) {
    
  }

  ngOnInit(): void {
  
  }

  onSubmit(data:  object) {
    if(this.name && this.email && this.phoneNumber) {
      Swal.fire({
        icon: 'success',
        text: 'Successfully Added !!',
      })
      this.service.createDataSend(data).subscribe((response) => {
        console.log(response);
      });
    } 
  }

  previousPage() {
    this.router.navigateByUrl('/');
  }
}

function subscribe(arg0: (result: string) => void) {
  throw new Error('Function not implemented.');
}

