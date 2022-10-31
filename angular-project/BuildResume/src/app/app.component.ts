import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
import { Resume } from "./resume.model";
import { Subscription } from 'rxjs';
import { CountService } from 'src/service/count-service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private countService: CountService) { }
  ngOnInit() {
    this.countService.currentValue.subscribe(value => {
      this.count = value;
    })
  }
  countItem: Subscription = new Subscription;
  title = 'BuildResume';
  personalDetails = this._formBuilder.group({
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    phoneNumCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    tenthCtrl: ['', Validators.required],
    tenthMarkCtrl: ['', Validators.required],
    twelfthCtrl: ['', Validators.required],
    twelfthMarkCtrl: ['', Validators.required],
    collegeCtrl: ['', Validators.required],
    collegeMarkCtrl: ['', Validators.required]
  });

  skillsDetails = this._formBuilder.group({
    // skillsDetails: ['', Validators.required],
    skillCtrl: ['', Validators.required],
    // skillCtrl: ['', Validators.required]
  });

  projectDetails = this._formBuilder.group({
    projectCtrl: ['', Validators.required],
  });
  certificationDetails = this._formBuilder.group({
    certificationCtrl: ['', Validators.required],
  });
  profileDetails = this._formBuilder.group({
    profileCtrl1: ['', Validators.required],
    profileCtrl2: ['', Validators.required],
    profileCtrl3: ['', Validators.required]
  });
  isLinear = true;

  count: number = 0;
  

  // public skills: any[] = [ {
  //   // nanme:''
  // }
  // ]
  resume: Resume = {
    first_name: 'Kavi',
    last_name: 'Mathi',
    email: 'fboibbnvov@gmail.com',
    mobile_no: 9874561230,
    address: 'volhehnclbfr',
    tenth_school_name: 'Nagini Vidyalaya',
    sslc_percent: 96,
    twelfth_school_name: 'Nagini Vidyalaya',
    hsc_percent: 98,
    college: 'BIT',
    college_percent: 97,
    skills: [
      {
        id: 1,
        name: 'oh'
      }
    ],
    projects: [
      {
        name: ''
      }
    ],
    certifications: [
      {
        name: ''
      }
    ],
    linkedIn_profile: '1213',
    hackerRank_profile: '7896',
    gitHub_profile: '46532'
  }
  skills_length: number = this.resume.skills.length;
  onSubmit() {
    console.log(this.resume);
  }

  newSkill() {
    
  }
  addSkill() {
    this.resume.skills.push({
      id: this.skills_length + 1,
      name: ''
    });
    console.log(this.resume.skills);
  }

  addProject() {
    this.resume.projects.push({
      name: ''
    })
    console.log(this.resume.projects);
  }

  addCertification() {
    this.resume.certifications.push({
      name: ''
    })
    console.log(this.resume.certifications);
  }

  onButtonClick() {
    console.log('clicked');
    this.countService.changeValue(this.count + 1);
  }

  removeSkill(uId: number) {
    console.log(uId);
    this.resume.skills.splice(uId, 1);
    console.log(this.resume.skills);
  }

  removeProject(uId: number) {
    console.log(uId);
    this.resume.projects.splice(uId, 1);
    console.log(this.resume.projects);
  }

  removeCertification(uId: number) {
    console.log(uId);
    this.resume.certifications.splice(uId, 1);
    console.log(this.resume.certifications);
  }
}