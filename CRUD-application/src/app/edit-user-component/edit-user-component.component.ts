import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../services/redirect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.scss']
})
export class EditUserComponentComponent implements OnInit {

  detailsData:Array<any> = [];

  id = this.api.getUserId();

  name:string = this.api.getUserName();
  email:string = this.api.getUserEmail();
  phoneNumber:string = this.api.getUserPhoneNumber();
  
  constructor(private api:RedirectService) { 
    this.api.getAllDetails().subscribe((response) => {
      this.detailsData = response;
    })
  }

  ngOnInit(): void {

  }

  onSubmit(value: object){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    return this.api.updateDataSend(value).subscribe();
  }



}
