import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private router: Router, private service: ResumeService) { }

  ngOnInit(): void { }

  educationForm = this.formbuilder.group({
    institute_name: ['Sri Shakthi', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    institute_location: ['Coimbatore', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    qualification: ['B.E', [Validators.required, Validators.pattern("[a-z.A-Z][a-z.A-Z ]+")]],
    field_of_study: ['Computer Science Engineering', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    year_of_graduation: ['2023', Validators.required]
  });

  education(educationData: object) {
    this.service.shareEducationData(educationData);  
    this.router.navigate(['experience']);
  }

  toPersonal() {    
    this.router.navigate(['personal-details']);
  }

}
