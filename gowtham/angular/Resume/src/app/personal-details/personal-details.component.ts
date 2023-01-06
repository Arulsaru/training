import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})

export class PersonalDetailsComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private router: Router, private service: ResumeService) { }

  ngOnInit(): void { }

  Gender: Gender[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Others', viewValue: 'Others'}
  ];

  fixedGender = 'Male';
  fixedDate = '2001-07-21';

  personalForm = this.formbuilder.group({
    first_name: ['Gowtham', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    last_name: ['N B', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    date_of_birth: [this.fixedDate, Validators.required],
    gender: [this.fixedGender, Validators.required],
    contact_number: ['6385382242', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['gowthamnb21@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    location: ['Coimbatore', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    pin_code: ['641062', [Validators.required, Validators.pattern("[0-9]{6}$")]]
  });

  personalDetails(personalData: object) {
    this.service.sharePersonalData(personalData);  
    this.router.navigate(['education']);
  }
}
