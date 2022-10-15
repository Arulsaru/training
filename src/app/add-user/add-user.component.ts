import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FetchDataService } from '../fetch-data.service';
// import * as _ from 'lodash';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  ngOnInit(): void {
  }

  // firstName = new FormControl('', [Validators.required, Validators.nullValidator]);
  // lastName = new FormControl('', [Validators.required, Validators.nullValidator]);
  // phoneNumber = new FormControl('', [Validators.required, Validators.nullValidator]);
  firstName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  lastName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}')]);

  datas: Array<any> = [];
  isCreated: boolean = false;

  getErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.firstName.hasError('firstName') ? 'Not a valid First Name' : '';
  }

  createUser() {

    const newUserData = {
      // 'user_id': this.datas.length + 100,
      'first_name': this.firstName.value,
      'last_name': this.lastName.value,
      'phone_number': this.phoneNumber.value
    }

    if (!this.firstName.invalid) {
      this.isCreated = true;
    }

    this.create.createData(newUserData).subscribe();
  }



  constructor(private create: FetchDataService) {
    this.create.fetchData().subscribe(response => {
      this.datas = response;
    })
  }

}


