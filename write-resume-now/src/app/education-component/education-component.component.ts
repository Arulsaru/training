import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-education-component',
  templateUrl: './education-component.component.html',
  styleUrls: ['./education-component.component.scss']
})
export class EducationComponentComponent implements OnInit {

  education = this.formBulider.group({
    qualification: ['', Validators.required],
    college_name: ['', Validators.required],
    year_of_passing: ['', [Validators.required]],
    field_of_study: ['', Validators.required],
    cgpa: ['', [Validators.required]],
    hsc_percentage: ['', Validators.required],
    sslc_percentage: ['', Validators.required],
    school_name: ['', Validators.required],
  })

  constructor(private formBulider: FormBuilder) { }

  ngOnInit(): void {
  }

}
