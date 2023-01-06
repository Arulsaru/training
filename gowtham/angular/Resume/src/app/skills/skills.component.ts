import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @ViewChild("chipList") chipList: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private service: ResumeService) { }

  ngOnInit(): void { }

  skillsForm = this.formbuilder.group({
    skills: [null],
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: string[] = ['JavaScript', 'Angular'];

  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = value.charAt(0).toUpperCase() + value.slice(1);

    if (value && !this.skills.includes(value)) { 
      this.skills.push(value);
    }

    if(this.skills.length === 0) {
      this.chipList.errorState = true;
    }
    else this.chipList.errorState = false;

    event.chipInput!.clear();
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  skillsData() {
    this.service.shareSkillsData(this.skills); 
    this.router.navigate(['summary']);
  }

  toExperience() {
    this.router.navigate(['experience']);
  }
}
