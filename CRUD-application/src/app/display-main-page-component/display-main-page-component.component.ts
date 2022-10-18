import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RedirectService } from '../services/redirect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-main-page-component',
  templateUrl: './display-main-page-component.component.html',
  styleUrls: ['./display-main-page-component.component.scss']
})
export class DisplayMainPageComponentComponent implements OnInit {

  detailsData:Array<any> = [];

  page: number = 1;
  limit: number = 10;

  userId:number = 0;

  constructor(private allDetails:RedirectService, private router:Router) {
    this.allDetails.getAllDetails().subscribe((response) => {
        this.detailsData = response;
u      showCancelButton: true,
      confirmButtonColor: '#16a085',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'User Data has been deleted.',
          'success'
        ).then((result) => {
          if(result.value) {
            window.location.reload();
          }
        })
      }
    })
      return this.allDetails.deleteDataSend(data).subscribe();    
   }

   editUser(userId: number, name: string, phoneNumber: string, email: string) {
    this.userId = userId;
    this.navigation();
    return this.allDetails.setUser(userId, name, phoneNumber, email);
   }

   navigation() {
    this.router.navigateByUrl('edit/'+this.userId);
   }

  ngOnInit(): void {
    
  }

}