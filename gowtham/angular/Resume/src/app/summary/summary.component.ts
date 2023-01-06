import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private router: Router, private service: ResumeService) { }

  ngOnInit(): void { }

  summaryForm = this.formbuilder.group({
    career_objectives: ['To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills.', Validators.required],
  });

  summary() {    
    this.service.shareSummaryData(this.summaryForm.value.career_objectives);
    this.router.navigate(['preview']);
  }

  toSkills() {
    this.router.navigate(['skills']);
  }
}
