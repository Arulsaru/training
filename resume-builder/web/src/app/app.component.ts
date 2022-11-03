import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ApiService} from 'src/service/api.service';
import ts from 'src/app/type/types';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import {identifierName} from '@angular/compiler';

// import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    }
  ]
})

export class AppComponent {
  title = 'resume-builder';

  @ViewChild("techSkillList") techSkillList: any;
  @ViewChild("nonTechSkillList") nonTechSkillList: any;
  @ViewChild("hobbyList") hobbyList: any;

  ngOnInit(): void {
  }

  get personalDetailsControl() {
    return this.personalDetails.controls;
  }

  get academicDetailsControl() {
    return this.academicDetails.controls;
  }

  get experienceDetailsControl() {
    return this.experienceDetails.controls;
  }

  get skillDetailsControl() {
    return this.skillDetails.controls;
  }

  get additionalDetailsControl() {
    return this.additionalDetails.controls;
  }

  userDetails: ts = {
    first_name: '',
    last_name: '',
    phone_number: null,
    email: '',
    birthday: '',
    gender: '',
    languages_known: null,
    state: '',
    city: '',
    pin_code: null,
    college_name: '',
    college_location: '',
    college_start_period: null,
    college_end_period: null,
    college_cgpa: null,
    school_name: '',
    school_location: '',
    hsc_percentage: null,
    sslc_percentage: null,
    company_name: '',
    company_location: '',
    technical_skills: null,
    non_technical_skills: null,
    hobbies: null,
    user_profiles: null,
    github_url: '',
    linikedIn_url: '',
    description: '',
    profile_picture: null,
    field_of_study: undefined,
  }

  apiDetails: ts = {
    first_name: '',
    last_name: '',
    phone_number: null,
    email: '',
    birthday: '',
    gender: '',
    languages_known: null,
    state: '',
    city: '',
    pin_code: null,
    college_name: '',
    college_location: '',
    college_start_period: null,
    college_end_period: null,
    college_cgpa: null,
    school_name: '',
    school_location: '',
    hsc_percentage: null,
    sslc_percentage: null,
    company_name: '',
    company_location: '',
    technical_skills: null,
    non_technical_skills: null,
    hobbies: null,
    user_profiles: null,
    github_url: '',
    linikedIn_url: '',
    description: '',
    profile_picture: null,
    field_of_study: null
  }

  personalDetails = this._formBuilder.group({
    firstName: ['Arulmozhi', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    lastName: ['Karunagaran', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    phoneNumber: [6374553281, (Validators.required, Validators.min(10000000000), Validators.max(999999999999), Validators.pattern(/[0-9]/))],
    birthday: ['12/2/2222', Validators.required],
    gender: '1',
    email: ['arulmozhi.ec19@bitsathy.ac.in', [Validators.required, Validators.email]],
    state: ['Dharmapuri', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    city: ['Tamil Nadu', Validators.required],
    pinCode: [636701, (Validators.required, Validators.pattern(/[0-9]{6}/))],
    languagesKnown: [null, Validators.required]
  })

  academicDetails = this._formBuilder.group({
    collegeName: ['Bannari Amman Institute Of Technology', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStudy: ['B.E ECE', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    collegeLocation: ['Sathyamangalam', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStartYear: [2019, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeEndYear: [2023, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeCGPA: [8.84, Validators.required],
    schoolName: ['Kamalam International School', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    schoolLocation: ['Dharmapuri', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    sslcPercentage: [90, [Validators.required]],
    hscPercentage: [90, [Validators.required]]
  })

  experienceDetails = this._formBuilder.group({
    companyName: ['TrusTrace', Validators.required],
    companyLocation: ['Coimbatore', Validators.required],
  })

  skillDetails = this._formBuilder.group({
    technicalSkill: [null, Validators.required],
    nonTechnicalSkill: [null, Validators.required]
  })

  additionalDetails = this._formBuilder.group({
    description: [`I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. I am able to work well both in a team environment as well as using own initiative. I am able to work well under pressure and adhere to strict deadlines.`,
      Validators.required],
    hobbies: ['', Validators.required],
    githubURL: ['https://github.com/Arulmozhi-Karunagaran/TrusTrace-Training', Validators.required],
    linkedInURL: ['https://www.linkedin.com/in/preethiuthayakumar/', Validators.required],
    profilePicture: ['Click Here', Validators.required]
  })

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  technicalSkills: string[] = [];
  nonTechnicalSkills: string[] = [];
  hobbies: string[] = [];
  flag = true;

  addTechSkills(event: MatChipInputEvent): boolean {
    const value = (event.value || '').trim();

    const duplicateIdx = this.technicalSkills.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (duplicateIdx !== -1) {
      this.techSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.technicalSkills.push(value);
      this.techSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeTechSkill(skill: string): void {
    const index = this.technicalSkills.indexOf(skill);

    if (index >= 0) {
      this.technicalSkills.splice(index, 1);
    }

  }

  addNonTechSkills(event: MatChipInputEvent): boolean {
    const value = (event.value || '').trim();

    const duplicateIdx = this.nonTechnicalSkills.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (duplicateIdx !== -1) {
      this.nonTechSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.nonTechnicalSkills.push(value);
      this.nonTechSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeNonTechSkill(skill: string): void {
    const index = this.nonTechnicalSkills.indexOf(skill);

    if (index >= 0) {
      this.nonTechnicalSkills.splice(index, 1);
    }
  }

  addHobbies(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    const duplicateIdx = this.hobbies.findIndex(
      hobby => value.toLowerCase() === hobby.toLowerCase()
    );

    if (duplicateIdx !== -1) {
      this.hobbyList.errorState = true;
      return false;
    }

    if (value) {
      this.hobbies.push(value);
      this.hobbyList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeHobbies(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }

  }

  languages: string[] = ['Tamil', 'English', 'Hindi', 'Telungu', 'Malayalam'];

  setDetails() {

    this.userDetails.first_name = this.personalDetails.value.firstName;
    this.userDetails.last_name = this.personalDetails.value.lastName;
    this.userDetails.phone_number = this.personalDetails.value.phoneNumber;
    this.userDetails.email = this.personalDetails.value.email;
    this.userDetails.birthday = this.personalDetails.value.birthday;

    // const temp = this.personalDetails.value.birthday;
    // const bday: Date = new Date(this.personalDetails.value.birthday);
    // console.log(bday);

    this.personalDetails.value.gender === '1' ? this.userDetails.gender = 'Male' : this.userDetails.gender = 'Female';


    this.userDetails.languages_known = this.personalDetails.value.languagesKnown;
    this.userDetails.state = this.personalDetails.value.state;
    this.userDetails.city = this.personalDetails.value.city;

    this.userDetails.pin_code = this.personalDetails.value.pinCode;
    this.userDetails.college_name = this.academicDetails.value.collegeName;
    this.userDetails.college_location = this.academicDetails.value.collegeLocation;
    this.userDetails.field_of_study = this.academicDetails.value.collegeStudy;
    this.userDetails.college_start_period = this.academicDetails.value.collegeStartYear;
    this.userDetails.college_end_period = this.academicDetails.value.collegeEndYear;
    this.userDetails.college_cgpa = this.academicDetails.value.collegeCGPA;
    this.userDetails.school_name = this.academicDetails.value.schoolName;
    this.userDetails.school_location = this.academicDetails.value.schoolLocation;
    this.userDetails.sslc_percentage = this.academicDetails.value.sslcPercentage
    this.userDetails.hsc_percentage = this.academicDetails.value.hscPercentage
    this.userDetails.company_name = this.experienceDetails.value.companyName;
    this.userDetails.company_location = this.experienceDetails.value.companyLocation;

    this.userDetails.technical_skills = this.technicalSkills;
    this.userDetails.non_technical_skills = this.nonTechnicalSkills;
    this.userDetails.hobbies = this.hobbies;
    this.userDetails.github_url = this.additionalDetails.value.githubURL;
    this.userDetails.linikedIn_url = this.additionalDetails.value.linkedInURL;
    this.userDetails.description = this.additionalDetails.value.description;

    this.apiService.createUser(this.userDetails).subscribe();
    this.getDetailsFromApi();
  }

  showSwalFire() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Congrats..',
      text: "Yeew have completed the entire process, Click below to download the pdf",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Download the PDF',
      cancelButtonText: 'Go Back',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Success!',
          'Your pdf file has been downloaded, Check your downloads',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Are yeew sure',
          'This wont delete any of your details',
          'error'
        )
      }
    })

  }

  getDetailsFromApi() {

    this.apiService.fetchDetails().subscribe(response => {
      this.apiDetails = response;
      console.log(this.apiDetails);
    })

  }

  imageUrl: string | null | ArrayBuffer = '';

  tempUrl: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQBAMAAABykSv/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAD1BMVEUALpQIOqnhzrX/58z///92mAD2AAAAAWJLR0QEj2jZUQAAAAd0SU1FB+YLAgU2CScbQJ8AAAEvSURBVHja7c8BDcAwAAShWqiFWph/b7Nx+YADzgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJtwRIjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1IjUiNSI1O5E3QqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpGYn8o0QqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpEakRqRGpmYn8YHc1q1g8ca4AAAAASUVORK5CYII='
  projectDescription: string = 'Projects can be listed on a resume below a job description as accomplishments. You can also list them in a separate section titled Projects, Personal Projects, and Academic Projects. Academic projects can be included in the education resume section. You can also create a project-oriented resume.';

  xAxisDown = 0;
  yAxisDown = 0;

  generatePDF() {

    let splittedText;
    let yAxisTop = 0;
    let xAxisTop = 0;

    const doc = new jsPDF();

    doc.setFillColor(24, 24, 24);
    doc.rect(0, 0, 320, 75, 'F');

    doc.setFillColor(234, 234, 234);
    doc.rect(0, 75, 300, 240, 'F');

    // doc.setFillColor(242, 242, 242);
    // doc.rect(0, 60, 55, 240, 'F');

    doc.setFont('Times', 'bold').setFontSize(15);
    doc.setTextColor(255, 255, 255).text(`${this.apiDetails.first_name?.toUpperCase()} ${this.apiDetails.last_name?.toUpperCase()}`, xAxisTop += 55, yAxisTop += 15);

    doc.setFontSize(13).setFont('', 'bold').text('Front End Developer', xAxisTop, yAxisTop += 10);

    if (this.apiDetails.description) {
      splittedText = doc.splitTextToSize(this.apiDetails.description, 170);
      doc.setFontSize(12).setLineHeightFactor(1.5).setFont('default', 'normal').text(splittedText, xAxisTop, yAxisTop += 10);
    }

    doc.setLineWidth(2).setDrawColor(24, 24, 24);
    doc.line(0, 75, 300, 75);
    doc.line(0, 296.5, 300, 296.5);
    // doc.setDrawColor(255, 255, 255).line(75, 1, 296.5, 1);
    doc.line(0.6, 75, 0.6, 296.5);
    doc.line(209.5, 75, 209.5, 296.5);

    doc.setLineWidth(1);
    doc.line(125, 75, 125, 296.5);  // center vertical line


    // this.addTechnicalSkills(doc);
    // this.addTempSkills(doc);
    xAxisTop = 5;

    doc.setFont('times', 'normal').text(`+91 ${this.apiDetails.phone_number} `, xAxisTop, yAxisTop += 30);

    this.apiDetails.email ? doc.text(this.apiDetails.email, xAxisTop += 40, yAxisTop) : null;
    this.apiDetails.state ? doc.text(this.apiDetails.state, xAxisTop += 70, yAxisTop -= 3) : null
    this.apiDetails.city ? doc.text(this.apiDetails.city, xAxisTop, yAxisTop += 5) : null;

    if (this.apiDetails.linikedIn_url) {
      splittedText = doc.splitTextToSize(this.apiDetails.linikedIn_url, 50);
      doc.text(splittedText, xAxisTop += 40, yAxisTop -= 5);
    }

    doc.setFontSize(13).setFont('Times', 'bold');
    doc.setTextColor(24, 24, 24).text('ACADEMIC DETAILS', this.xAxisDown += 5, this.yAxisDown += 85);
    // doc.setLineWidth(0.5).setDrawColor( 24, 24, 24);
    // doc.line(17, 88, this.xAxisDown + 30, this.yAxisDown += 3);

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`${'\u2022'}   ${this.apiDetails.college_name} (${this.apiDetails.college_start_period} - ${this.apiDetails.college_end_period} batch)`, this.xAxisDown += 5, this.yAxisDown += 10);
    doc.text(`${this.apiDetails.field_of_study} - ${this.apiDetails.college_cgpa} - CGPA`, this.xAxisDown += 5, this.yAxisDown += 8);
    this.apiDetails.college_location ? doc.text(this.apiDetails.college_location, this.xAxisDown, this.yAxisDown += 8) : null;

    doc.text(`${'\u2022'}   ${this.apiDetails.school_name}, ${this.apiDetails.school_location}`, this.xAxisDown -= 5, this.yAxisDown += 10);
    doc.text(`HSC Percentage - ${this.apiDetails.hsc_percentage}`, this.xAxisDown += 5, this.yAxisDown += 8);
    doc.text(`SSLC Percentage - ${this.apiDetails.sslc_percentage}`, this.xAxisDown, this.yAxisDown += 8);


    doc.setFontSize(13).setFont('Times', 'bold');
    doc.setTextColor(24, 24, 24).text('EXPERIENCE', this.xAxisDown -= 10, this.yAxisDown += 15);
    // doc.setLineWidth(0.5).setDrawColor( 24, 24, 24);
    // doc.line(this.xAxisDown += 10, this.yAxisDown + 3, this.xAxisDown + 10, this.yAxisDown += 3);

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`${'\u2022'}   ${this.apiDetails.company_name} - (Jan 2020 - May 2023)`, this.xAxisDown += 5, this.yAxisDown += 10);
    doc.text(`Front End Developer`, this.xAxisDown += 5, this.yAxisDown += 10);
    doc.text(`${this.apiDetails.company_location}`, this.xAxisDown, this.yAxisDown += 10);

    if (this.imageUrl && typeof this.imageUrl === 'string') {
      doc.addImage(this.imageUrl, 'JPEG', 7, 10, 40, 45, 'profile-picture');
    }
    doc.save(`${this.apiDetails.first_name} ${this.apiDetails.last_name}`);
  }

  addTempSkills(doc: jsPDF) {

    let xAxis = 16;
    let yAxis = 85;

    if (this.apiDetails.technical_skills) {

      doc.text('TECHNICAL SKILLS', xAxis, yAxis)

      doc.setFontSize(12);
      xAxis += 10;
      yAxis += 10;
      let maxLength = 2;
      let nextTime = 0;
      let ctr = 0;

      while (ctr < this.apiDetails.technical_skills.length) {

        if (maxLength === ctr) {
          xAxis = 60 + nextTime;
          yAxis = 85;
          maxLength += 3;
          nextTime = 40;
        }

        doc.text('\u2022   ' + this.apiDetails.technical_skills[ctr], xAxis, yAxis);
        ctr += 1;
        yAxis += 10;
      }
    }
  }

  addTechnicalSkills(doc: jsPDF) {
    doc.setFontSize(13).setFont('Times', 'bold');
    doc.text('TECHNICAL SKILLS', this.xAxisDown += 5, this.yAxisDown += 70);
    doc.setLineWidth(0.5).setDrawColor(255, 255, 255);
    doc.line(17, 75, this.xAxisDown += 30, this.yAxisDown += 5);

    this.xAxisDown = 5;
    this.yAxisDown += 10;
    doc.setFont('normal');

    if (this.apiDetails.technical_skills) {
      let idx = 0;
      const maxChar = 13;
      let currentLength: number = 0;
      let previousSkillLength = 0;
      let skill;

      while (idx < this.apiDetails.technical_skills.length) {

        skill = this.apiDetails.technical_skills[idx];

        if ((skill.length + currentLength) < maxChar && currentLength < maxChar) {

          this.xAxisDown += currentLength + previousSkillLength;
          currentLength += skill.length;
          doc.text(`\u2022  ${skill}`, this.xAxisDown, this.yAxisDown);
          console.log(skill, this.xAxisDown, currentLength);
          idx += 1;

          previousSkillLength = skill.length + 9;

          console.log('current length', currentLength);
        } else {
          currentLength = 0;
          this.yAxisDown += 10;
          this.xAxisDown = 5;
          previousSkillLength = 0;
        }

      }

    }

  }

  convertedString: string | FileReader | null | undefined = '';

  load(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onloadend = (event) => { // called once readAsDataURL is completed
        if (event.target) {
          this.imageUrl = event.target.result;
        }
        console.log(this.imageUrl);
      }
      console.log(this.imageUrl);
    }
  }

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService) {
  }

}
