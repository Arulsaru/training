import { Component, OnInit } from '@angular/core';
import { ApiconnectService } from '../apiconnect.service';
import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


 
  id: number = 0;

  employee = {
    name: '',
    phone: '',
    email: '',
    id: 0
  }

  constructor(private api: ApiconnectService , route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
   }
  ngOnInit(): void {
    this.api.getdetails(this.id).subscribe((response) => {
      this.employee = response;
    })
  }

  update(data) {

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      timer: 5000
    }).then((result) => {

      if (result.isConfirmed) {
        this.api.onUpdate(this.employee).subscribe((response:any) => {
          console.log(response);
          Swal.fire({title:'Added!',text:response.message, icon:'success',confirmButtonText: 'OK'}).then((res) =>{
            if(res.isConfirmed)
            {
              window.location.reload();
            }
          });
        },
          (err) => {
            console.log(err);
            console.log(err.error);
            console.log(err.error.error);
            Swal.fire('Error!', err.error.error, 'error');
          });

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
        
  } 
}
