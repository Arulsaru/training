import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit { 

  tempUserId: number = this.service.getId();
  tempFirstName: string = this.service.getFirstName();
  tempLastName: string = this.service.getLastName();
  tempPhoneNumber: number = this.service.getPhoneNumber();

  firstName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  lastName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}')]);

  datas: Array<any> = [];
  // isUpdated: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  editUser() {
    if (this.firstName.valid && this.lastName.valid && this.phoneNumber.valid) {
      const id = this.service.getId() - 101;
      this.datas[id].first_name = this.firstName.value;
      this.datas[id].last_name = this.lastName.value;
      this.datas[id].phone_number = this.phoneNumber.value;
      // this.service.updateUser(this.datas[id], this.datas[id].user_id, this.datas[id].first_name, this.datas[id].last_name, this.datas[id].phone_number).subscribe();

      this.service.updateUser(this.datas[id], this.datas[id].user_id).subscribe(
        result => {
          this.successMsg = Object.values(result)[0];
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.successMsg,
            showConfirmButton: true,
          }).then(result => {
            if (result.value) {
              const tempRouter = this.router;
              tempRouter.navigate(['employees']);
            }
          })
        },
        errorMsg => {
          errorMsg = errorMsg.error.err;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMsg,
          })
        }
      );
    }
  }

  backToMainPage() {
    const tempRouter = this.router;
    tempRouter.navigate(['employees']);
  }

  constructor(private service: FetchDataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.service.fetchData().subscribe(response => {
      this.datas = response;
    })
  }

  // userId: number = this.service.getId();

  ngOnInit() {
    // this.activatedRoute.params.subscribe((params: Params) => this.userId = params['caller']);
   }

}
