import { Component, OnInit } from '@angular/core';
import { ApiconnectService } from '../apiconnect.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
  // name: string = '';
  // phone: string = '';
  // email: string = '';
  createForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });
  phone: any;

  constructor(private api: ApiconnectService) {

  }


  create(data: any) {

    Swal.fire({
      title: 'Are You Sure to Add Details ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Add',
      denyButtonText: `Cancel`,
      timer : 5000
    }).then((receive) => {

      if (receive.isConfirmed) {
        this.api.onSubmit(data).subscribe((response:any) => {
          console.log(response);
          Swal.fire({title:'Added!',text:response.message, icon:'success',confirmButtonText: 'OK'}).then((res) =>{
            if(res.isConfirmed)
            {
              window.location.reload();
            }
          });
         
        },
          (error) => {
            Swal.fire('Error!', error.error.error, 'error');
        })
      }
      else{
        if (receive.isDenied) {
          Swal.fire('Details are not Added', '','info')
        }
      }
    });

    
  }

  ngOnInit(): void {

  }
}


