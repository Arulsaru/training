import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private router: Router, private service: ResumeService) { }

  ngOnInit(): void { }

  experienceForm = this.formbuilder.group({
    company_name: ['TrusTrace', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    job_title: ['Software Developer', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    comapany_location: ['Coimbatore', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    years_of_experience: ['1', Validators.required]
  });

  experience(experienceData: object) {
    this.service.shareExperienceData(experienceData);  
    this.router.navigate(['skills']);
  }

  toEducation() {
    this.router.navigate(['education']);
  }

}
