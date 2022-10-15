import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  ngOnInit(): void {
  }

  firstName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  lastName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}')]);

  getErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.firstName.hasError('firstName') ? 'Not a valid First Name' : '';
  }

  datas: Array<any> = [];

  editUser() {  

    const id = this.service.getId();
    
    // const editedData = JSON.parse(this.datas[id]);
    // console.log(typeof editedData);

    console.log(id);
    console.log(this.datas[id]);
    
    // console.log(this.datas[id].first_name);

    this.datas[id].first_name = this.firstName.value;
    this.datas[id].last_name = this.lastName.value;
    this.datas[id].phone_number = this.phoneNumber.value;

    console.log(this.datas);


    // console.log(this.datas[id].first_name);


    // this.service.createData(this.datas).subscribe();  
  }

  constructor(private service: FetchDataService) {
    this.service.fetchData().subscribe(response => {
      this.datas = response;
    })
   }


}
