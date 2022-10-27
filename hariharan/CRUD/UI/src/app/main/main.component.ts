import { Component, OnInit } from '@angular/core';
import { ApiconnectService } from '../apiconnect.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  page: number = 1;
  limit: number = 5;
  empDetails = { name: '', phone: '', id: 0, email: '' };
  employee: Array<any> = [];

  constructor(private api: ApiconnectService) { }

  ngOnInit(): void {
    this.api.calling().subscribe((point) => {
      this.employee = point;
    });
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure to Delete this ID?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteDetails(id).subscribe((response) => {
          console.log(response);
        });
        this.api.calling().subscribe((point) => {
          this.employee = point;
        });
        Swal.fire({
          title: 'Requested Id Deleted',
          confirmButtonText: 'OK'
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
        // window.location.reload();
      } else if (result.isDenied) {
        Swal.fire('Cancelled')
      }
    })

  }

  transfer(name: string, email: string, phone: string, id: number) {
    this.api.updetails(name, email, phone, id);
  }
}
